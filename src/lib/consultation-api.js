// Client for the wellness-consultation booking API on the BetterHealth app
// (server/routes/wellness-consultations.ts). Deliberately first-party rather
// than an embedded scheduling widget: a widget completes the booking inside an
// iframe where the Meta Pixel can't see it, so `Schedule` could only fire on
// widget *open* — which would train ad delivery toward people who open a
// calendar and leave.

const DEFAULT_BASE = "https://app.betterhealth.africa/api/public";
const BASE = (
  import.meta.env.VITE_PUBLIC_CATALOGUE_API_BASE ||
  (import.meta.env.DEV ? "/api/public" : DEFAULT_BASE)
).replace(/\/$/, "");

const TIMEOUT_MS = 10000;

// Attribution params worth carrying into the booking row. Without these a
// booking can't be traced back to the ad that bought it.
const ATTRIBUTION = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  fbclid: "fbclid",
  referralCode: "ref",
};

// Attribution arrives on the landing URL but is submitted from wherever the
// visitor ends up, which on an SPA is usually a different path with a clean
// query string. Reading window.location.search only at submit time therefore
// loses it, and the loss is permanent: once a lead or booking row is written
// without utm_source, nothing downstream can recover which ad produced it.
//
// Same session-scoped approach as the referral code in partner-signup.js:
// survives in-site navigation away from the ad's landing URL, does not survive
// closing the tab. Someone returning in a fresh tab is attributed to whatever
// their new URL carries, which is also the click Meta would credit.
const ATTRIBUTION_STORAGE_KEY = "bh:attribution";

function readFromSearch(search) {
  const params = new URLSearchParams(search);
  const out = {};
  for (const [key, param] of Object.entries(ATTRIBUTION)) {
    const value = params.get(param);
    if (value) out[key] = value.slice(0, 120);
  }
  return out;
}

function readStoredAttribution() {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    // sessionStorage unavailable (SSR, private browsing) or a malformed entry.
    // Attribution is reporting data — never let it break a booking.
    return {};
  }
}

/**
 * Remember any attribution params on the given URL for the rest of the session.
 * Call on every navigation, so the landing URL's params survive the walk to
 * whichever page the visitor finally submits from. Merged per key, so a param
 * seen on a later URL wins without discarding the ones it doesn't carry.
 */
export function rememberAttribution(
  search = typeof window !== "undefined" ? window.location.search : "",
) {
  const fromUrl = readFromSearch(search);
  if (Object.keys(fromUrl).length === 0) return;
  try {
    sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify({ ...readStoredAttribution(), ...fromUrl }),
    );
  } catch {
    /* storage unavailable — captureAttribution still reads the live URL */
  }
}

/**
 * Attribution to submit with a booking or lead: everything this session has
 * seen, with anything on the current URL taking precedence.
 */
export function captureAttribution(
  search = typeof window !== "undefined" ? window.location.search : "",
) {
  return { ...readStoredAttribution(), ...readFromSearch(search) };
}

async function request(path, init) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE}${path}`, { ...init, signal: controller.signal });
    // Parse before checking status — the 409 slot-taken response carries a body
    // the caller needs in order to show the right message.
    const body = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, body };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Available 20-minute slots for a date.
 * @param {string} date YYYY-MM-DD
 * @returns {Promise<{time: string, available: boolean}[]>}
 */
export async function fetchSlots(date) {
  const { ok, body } = await request(
    `/wellness-consultations/slots?date=${encodeURIComponent(date)}`,
  );
  if (!ok || !Array.isArray(body?.slots)) {
    throw new Error(body?.error || "Could not load available times");
  }
  return body.slots;
}

/**
 * Book a consultation.
 * Resolves with { refCode, scheduledAt } on success. Throws an Error carrying
 * `.code === 'slot_unavailable'` when the slot went while the form was open, so
 * the caller can refresh the grid rather than showing a dead end.
 */
export async function bookConsultation(payload) {
  const { ok, status, body } = await request("/wellness-consultations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (ok) return body;

  const err = new Error(body?.error || "Could not complete the booking");
  if (status === 409) err.code = body?.code || "slot_unavailable";
  throw err;
}

/**
 * Post-booking intake answers for an existing consultation.
 *
 * Post-booking half only. The three qualifying answers do NOT come through here
 * — they ride in the booking POST as `intake`, so they are saved the instant the
 * slot is taken. See ConsultationBooking.
 *
 * BACKEND NOT BUILT YET. This posts to
 *   POST /wellness-consultations/:refCode/intake   { answers: {id: value} }
 * which does not exist in BetterHealth-Africa at the time of writing — the
 * public booking API from migration 166 accepts only the booking fields, and its
 * Zod schema will strip anything else rather than error, so piggybacking these
 * onto `bookConsultation` would drop them silently. That is the failure mode
 * worth avoiding: the form would look like it worked and consultants would open
 * calls with nothing.
 *
 * Until the route exists this resolves `{ stored: false }` and the caller keeps
 * the booking confirmed regardless. A failed intake must never look to the
 * visitor like a failed booking — they have the slot either way.
 */
export async function submitIntake(refCode, answers) {
  try {
    const { ok } = await request(
      `/wellness-consultations/${encodeURIComponent(refCode)}/intake`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      },
    );
    return { stored: ok };
  } catch {
    return { stored: false };
  }
}

/** Next `count` selectable dates, skipping Sunday (nobody is rostered). */
export function upcomingDates(count = 14, from = new Date()) {
  const out = [];
  const cursor = new Date(from);
  while (out.length < count) {
    if (cursor.getDay() !== 0) out.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/** YYYY-MM-DD in Accra time. Ghana is UTC+0 year-round, so UTC parts are local. */
export function toDateParam(date) {
  return date.toISOString().slice(0, 10);
}

export function formatSlot(time) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

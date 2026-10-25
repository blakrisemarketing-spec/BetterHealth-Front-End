// Client for the wellness-consultation booking API on the BetterHealth app
// (server/routes/wellness-consultations.ts). Deliberately first-party rather
// than an embedded scheduling widget: a widget completes the booking inside an
// iframe where the Meta Pixel can't see it, so `Schedule` could only fire on
// widget *open* — which would train ad delivery toward people who open a
// calendar and leave.

import { getStoredAttribution } from "./attribution";
import { getStoredReferralCode } from "./partner-signup";

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

/**
 * Read the utm params, fbclid and ref for this booking, omitting absent ones.
 * The current URL wins; anything missing falls back to the touch stored earlier
 * this session, so a booking made after browsing still names the ad that bought
 * it. ?ref= keeps its own store, so it is read separately.
 */
export function captureAttribution(search = typeof window !== "undefined" ? window.location.search : "") {
  const params = new URLSearchParams(search);
  const stored = getStoredAttribution();
  const out = {};
  for (const [key, param] of Object.entries(ATTRIBUTION)) {
    const value = params.get(param) || stored[param];
    if (value) out[key] = String(value).slice(0, 120);
  }
  // ?ref= lives in its own session store, owned by partner-signup.js.
  if (!out.referralCode) {
    const storedRef = getStoredReferralCode();
    if (storedRef) out.referralCode = storedRef.slice(0, 120);
  }
  return out;
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

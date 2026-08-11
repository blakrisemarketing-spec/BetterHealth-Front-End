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

/** Read the utm params, fbclid and ref off the current URL, omitting absent ones. */
export function captureAttribution(search = typeof window !== "undefined" ? window.location.search : "") {
  const params = new URLSearchParams(search);
  const out = {};
  for (const [key, param] of Object.entries(ATTRIBUTION)) {
    const value = params.get(param);
    if (value) out[key] = value.slice(0, 120);
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

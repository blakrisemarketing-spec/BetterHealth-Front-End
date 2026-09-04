// Client for the marketing-leads endpoint on the BetterHealth app
// (POST /api/public/marketing-leads). Used by the free-guide lead magnets under
// /guides/<slug>: a visitor hands over a first name + WhatsApp number, the row
// lands in the app's database, and the page unlocks the guide.
//
// Mirrors the BASE / timeout logic in consultation-api.js so the two public
// clients can never disagree about which backend they talk to. In dev the
// Vite proxy forwards /api/public to app.betterhealth.africa.

import { captureAttribution } from "./consultation-api";

const DEFAULT_BASE = "https://app.betterhealth.africa/api/public";
const BASE = (
  import.meta.env.VITE_PUBLIC_CATALOGUE_API_BASE ||
  (import.meta.env.DEV ? "/api/public" : DEFAULT_BASE)
).replace(/\/$/, "");

const TIMEOUT_MS = 10000;

/**
 * Current page URL with the query string dropped: origin + path only.
 * The backend rejects any pageUrl that does not start with https://, so on
 * localhost / http dev servers this returns undefined and the field is left
 * out rather than failing the whole submission.
 */
export function currentPageUrl() {
  if (typeof window === "undefined") return undefined;
  const { origin, pathname } = window.location;
  if (!origin.startsWith("https://")) return undefined;
  return `${origin}${pathname}`;
}

// Backend limits on `answers`: at most 16 keys, keys ^[a-zA-Z][a-zA-Z0-9_]{0,39}$,
// values up to 200 characters. Anything outside that is dropped or trimmed
// here so a long quiz label can never 400 the lead.
const ANSWER_KEY_RE = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;
const ANSWER_MAX_KEYS = 16;
const ANSWER_MAX_LEN = 200;

function cleanAnswers(answers) {
  if (!answers || typeof answers !== "object") return undefined;
  const out = {};
  let n = 0;
  for (const [key, value] of Object.entries(answers)) {
    if (n >= ANSWER_MAX_KEYS) break;
    if (!ANSWER_KEY_RE.test(key)) continue;
    if (value === undefined || value === null) continue;
    out[key] = String(value).slice(0, ANSWER_MAX_LEN);
    n += 1;
  }
  return n > 0 ? out : undefined;
}

/** Drop undefined / empty-string fields so the JSON body never carries `email: ""`. */
function compact(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  );
}

/**
 * Submit a lead-magnet form.
 *
 * @param {{
 *   leadMagnet: string,
 *   fullName: string,
 *   whatsapp: string,
 *   email?: string,
 *   healthInterest?: string,
 *   answers?: Record<string, string>,
 *   source: string,
 * }} payload
 * @returns {Promise<{ ok: true, id: string }>}
 *
 * Resolves with the 201 body on success. Throws an Error carrying `.status`
 * (HTTP status, or 0 for a network failure / timeout) and `.code`
 * ("timeout" | "network" | "rejected" | "forbidden" | "rate_limited") so the
 * caller can pick a message without parsing server text.
 *
 * Server contract: 201 {ok:true,id}; 400 {ok:false,error} naming the field;
 * 403 disallowed origin; 429 rate limit (10/min); 500 {ok:false,error}.
 */
export async function submitLead(payload) {
  const body = compact({
    ...payload,
    email: payload.email ? String(payload.email).trim() : undefined,
    answers: cleanAnswers(payload.answers),
    ...captureAttribution(),
    pageUrl: currentPageUrl(),
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(`${BASE}/marketing-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (cause) {
    const err = new Error("Could not reach the server");
    err.status = 0;
    err.code = cause?.name === "AbortError" ? "timeout" : "network";
    throw err;
  } finally {
    clearTimeout(timer);
  }

  const data = await res.json().catch(() => ({}));

  if (res.ok && data?.ok) return data;

  const err = new Error(data?.error || "Could not save your details");
  err.status = res.status;
  err.code =
    res.status === 403 ? "forbidden" : res.status === 429 ? "rate_limited" : "rejected";
  throw err;
}

const UNLOCK_PREFIX = "bh_guide_unlocked:";

/** First name stored at unlock time, "1" if none, or null when not unlocked. */
export function readGuideUnlock(slug) {
  try {
    return window.localStorage.getItem(`${UNLOCK_PREFIX}${slug}`);
  } catch {
    return null;
  }
}

/** Remember that this browser has unlocked a guide. Storage failures are silent. */
export function writeGuideUnlock(slug, firstName) {
  try {
    window.localStorage.setItem(`${UNLOCK_PREFIX}${slug}`, firstName || "1");
  } catch {
    // Private mode / blocked storage: the guide is still unlocked for this visit.
  }
}

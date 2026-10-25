// Ad attribution that survives in-site navigation.
//
// The utm params and click ids only exist on the URL of the page the ad landed
// on. Anyone who browses to a second page before converting used to arrive at
// the form with nothing, so the signup looked organic and the ad that paid for
// it got no credit. ?ref= already solved this with sessionStorage
// (partner-signup.js); this is the same trick for the rest.
//
// Stored and replaced AS A GROUP: a visitor who clicks a second ad mid-session
// must not end up with campaign A's source next to campaign B's campaign name.

const STORAGE_KEY = "bh_attribution";
const MAX_VALUE_LEN = 120;

// ?ref= is deliberately absent — partner-signup.js owns it, under its own key.
export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

function readSearch(search) {
  if (typeof search === "string") return search;
  return typeof window !== "undefined" ? window.location.search : "";
}

/**
 * Persist any attribution params on the given URL for the rest of the session.
 * A URL carrying none of them leaves the stored set alone, so navigating on
 * does not wipe the landing touch. A URL carrying at least one replaces the
 * whole set, so a later ad click wins cleanly rather than blending.
 */
export function captureAttributionFromUrl(search) {
  try {
    const params = new URLSearchParams(readSearch(search));
    const found = {};
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value && value.trim()) found[key] = value.trim().slice(0, MAX_VALUE_LEN);
    }
    if (Object.keys(found).length === 0) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    /* sessionStorage unavailable (private mode, embedded contexts) — ignore */
  }
}

/** The attribution captured earlier this session, or {} if there is none. */
export function getStoredAttribution() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    // Re-filter on read: never trust whatever ended up under our key.
    return Object.fromEntries(
      ATTRIBUTION_PARAMS.filter(
        (k) => typeof parsed[k] === "string" && parsed[k]
      ).map((k) => [k, String(parsed[k]).slice(0, MAX_VALUE_LEN)])
    );
  } catch {
    return {};
  }
}

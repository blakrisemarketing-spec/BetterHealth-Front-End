// Centralized entry points into the BetterHealth patient app (app.betterhealth.africa).
// Use these instead of hardcoding URLs so the marketing site's CTAs stay consistent
// as the funnel evolves (single-test-first → bundles → disease programs).

import { getStoredReferralCode } from "./partner-signup";

export const APP_BASE = "https://app.betterhealth.africa";

// Primary conversion CTA: internal Book a Test page where users pick a panel.
// Individual panel cards then link out to the app for sign-up/booking.
export const BOOK_TEST_URL = "/book";

// Open registration / onboarding entry (no invite code required).
export const SIGN_UP_URL = `${APP_BASE}/join`;

export const LOGIN_URL = `${APP_BASE}/login`;

// Attribution params we carry through from the current visit into onboarding, so
// ad tracking and ?ref= codes survive the hop to the app.
const PRESERVED_PARAMS = [
  "ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
];

/**
 * Build a deep link into App onboarding that pre-selects a panel or test.
 *
 * The App parses these params literally and case-insensitively, `panel` wins
 * over `test`/`tests`, and unknown/empty codes are silently ignored (a stale
 * link just degrades to the normal chooser), so passing a null/undefined code
 * safely yields a plain /join link.
 *
 *   joinUrl({ panel: "dialics" })        → /join?panel=dialics
 *   joinUrl({ test: "MALARIA_RDT" })     → /join?test=MALARIA_RDT
 *   joinUrl({ tests: ["CRP", "ESR"] })   → /join?tests=CRP%2CESR
 *
 * Any ?ref= / utm_* / click-id on the current page (or a ref captured earlier
 * this session) is appended, never overwriting an explicit value.
 */
export function joinUrl({ panel, test, tests } = {}) {
  const url = new URL(SIGN_UP_URL);

  if (panel) {
    url.searchParams.set("panel", String(panel));
  } else if (tests && tests.length) {
    url.searchParams.set("tests", tests.map((t) => String(t)).join(","));
  } else if (test) {
    url.searchParams.set("test", String(test));
  }

  const current =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  for (const key of PRESERVED_PARAMS) {
    const val = current.get(key);
    if (val && !url.searchParams.has(key)) url.searchParams.set(key, val);
  }
  // ?ref= survives in-site navigation via sessionStorage even after the URL
  // param is gone, so fall back to it when the current URL has none.
  if (!url.searchParams.has("ref")) {
    const storedRef = getStoredReferralCode();
    if (storedRef) url.searchParams.set("ref", storedRef);
  }

  return url.toString();
}

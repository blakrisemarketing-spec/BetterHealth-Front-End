// Centralized entry points into the BetterHealth patient app (app.betterhealth.africa).
// Use these instead of hardcoding URLs so the marketing site's CTAs stay consistent
// as the funnel evolves (single-test-first → bundles → disease programs).

export const APP_BASE = "https://app.betterhealth.africa";

// Primary conversion CTA: deep-link into single-test booking. The app gates this
// behind auth, so a logged-out visitor is routed through sign-up first and (ideally)
// returned to booking afterwards.
export const BOOK_TEST_URL = `${APP_BASE}/book-test`;

// Open registration / onboarding entry (no invite code required).
export const SIGN_UP_URL = `${APP_BASE}/join`;

export const LOGIN_URL = `${APP_BASE}/login`;

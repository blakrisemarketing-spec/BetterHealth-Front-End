// Centralized entry points into the BetterHealth patient app (app.betterhealth.africa).
// Use these instead of hardcoding URLs so the marketing site's CTAs stay consistent
// as the funnel evolves (single-test-first → bundles → disease programs).

export const APP_BASE = "https://app.betterhealth.africa";

// Primary conversion CTA: internal Book a Test page where users pick a panel.
// Individual panel cards then link out to the app for sign-up/booking.
export const BOOK_TEST_URL = "/book";

// Open registration / onboarding entry (no invite code required).
export const SIGN_UP_URL = `${APP_BASE}/join`;

export const LOGIN_URL = `${APP_BASE}/login`;

// Thin analytics layer shared by every conversion touchpoint on the marketing
// site. One call fans out to BOTH ad/measurement stacks:
//   - Meta Pixel  (window.fbq)  — base code lives in index.html
//   - Google      (window.dataLayer) — GTM (GTM-MS22RHNF) + GA4 (G-1KTCH9TZLV)
//
// The dataLayer pushes below only reach GA4 if a GTM tag forwards them. Until
// 2026-08-30 index.html loaded GTM-KMH4QTML, which is a *server* container:
// googletagmanager.com/gtm.js returns 403 for those, so no container ran here at
// all and every custom event was silently discarded. GTM-MS22RHNF is the web
// container that replaced it. If a custom event stops appearing in GA4, check
// that container has a tag for it before suspecting this file.
//
// GA4 event names are used for the dataLayer push (begin_checkout,
// generate_lead) so they map 1:1 to GA4 / Google Ads conversions in the GTM UI
// with no extra transformation. Meta standard event names (InitiateCheckout,
// Lead) are used for fbq.
//
// Everything is guarded for the no-JS prerender / SSR context (no window) and
// for the case where an ad blocker has prevented the pixels from loading, so a
// missing fbq/dataLayer is a silent no-op, never a thrown error.

// Tracking is production-only. Staging (bha-devon.vercel.app) and local builds
// serve the same index.html and therefore the same GA4 / GTM / Pixel IDs, so an
// event fired anywhere else lands in the dataset the ad campaigns are optimised
// on. index.html gates the loaders; this gates the sinks, so both halves have to
// fail before anything leaks — and a new event helper added later inherits the
// guard for free rather than having to remember it.
//
// Set by the gate in index.html. Treated as false when absent, so the safe
// default survives someone rendering this module outside that document.
function trackingEnabled() {
  return typeof window !== "undefined" && window.__BH_TRACKING_ENABLED__ === true;
}

function fbq(...args) {
  if (!trackingEnabled()) return;
  if (typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

function dataLayerPush(payload) {
  if (!trackingEnabled()) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * SPA page view. The Meta base code and GTM already fire once on the initial
 * document load, so callers must only invoke this on subsequent client-side
 * route changes to avoid double-counting the first view.
 */
export function trackPageView(path) {
  fbq("track", "PageView");
  dataLayerPush({ event: "page_view_spa", page_path: path });
}

/**
 * Booking intent — someone clicked through to the app's /join onboarding.
 * This is the strongest on-site conversion signal the marketing site can emit
 * (the actual purchase completes on app.betterhealth.africa and must be tracked
 * there, ideally via Meta CAPI + Google Enhanced Conversions).
 *
 * @param {{ content?: string, contentType?: 'panel'|'test'|'tests' }} [opts]
 */
export function trackBookingIntent({ content, contentType } = {}) {
  const contents = content
    ? { content_name: content, content_category: contentType || "lab_test" }
    : {};

  fbq("track", "InitiateCheckout", { currency: "GHS", ...contents });
  dataLayerPush({
    event: "begin_checkout",
    currency: "GHS",
    content_name: content || null,
    content_type: contentType || null,
  });
}

/**
 * Lead capture — a marketing-site form (waitlist, partner/doctor/nutritionist/
 * lab/foundation) submitted successfully.
 *
 * @param {{ source?: string }} [opts] source label, e.g. 'waitlist', 'partner:doctor'
 */
export function trackLead({ source } = {}) {
  fbq("track", "Lead", source ? { content_category: source } : {});
  dataLayerPush({ event: "generate_lead", lead_source: source || null });
}

/**
 * Wellness consultation booked — someone requested a call with a Wellness
 * Consultant, either by submitting the booking form or by opening the prefilled
 * WhatsApp thread.
 *
 * This is the optimisation event for the wellness-consultation paid campaign,
 * and unlike a test purchase (which completes on app.betterhealth.africa, where
 * this pixel does not run) it happens on the marketing site — so the ad
 * platforms can actually see and optimise toward it.
 *
 * `Schedule` is a Meta *standard* event on purpose: standard events can be
 * selected directly as an optimisation goal and are eligible for the custom
 * conversion built on top of them. Do not swap it for a custom event.
 *
 * Callers must fire this once per booking, on success only — never on form
 * render or on a failed submit — or the campaign will optimise toward noise.
 *
 * @param {{ channel?: 'form'|'whatsapp', concern?: string }} [opts]
 *   channel — which path the person took, so we can compare form vs WhatsApp
 *   concern — the health concern they selected, for creative/audience feedback
 */
export function trackConsultationBooked({ channel, concern } = {}) {
  fbq("track", "Schedule", {
    content_category: "wellness_consultation",
    ...(channel ? { content_name: channel } : {}),
  });
  dataLayerPush({
    event: "schedule_consultation",
    booking_channel: channel || null,
    health_concern: concern || null,
  });
}

/**
 * Steps between landing on the consultation page and booking.
 *
 * WHY THIS EXISTS
 *   The page fired `Schedule` on success and nothing else, so a day that
 *   produced 132 landing page views and zero bookings was unreadable: there was
 *   no way to tell somebody who never scrolled to the picker from somebody who
 *   chose a time and balked at handing over their number. Those two have
 *   opposite fixes, and without this we would have spent another day guessing.
 *
 * A custom event, not a standard one. Meta's standard events are a small fixed
 * vocabulary and none of them mean "reached the picker"; forcing a funnel step
 * into `Lead` or `AddToCart` would corrupt a name the campaign may later want to
 * optimise on. `trackCustom` keeps the diagnostic separate from the optimisation
 * surface — these are for reading, not for bidding.
 *
 * @param {'picker_viewed'|'day_selected'|'time_selected'|'details_started'|'submit_failed'} step
 * @param {{ concern?: string, variant?: string, detail?: string }} [meta]
 */
export function trackBookingStep(step, meta = {}) {
  fbq("trackCustom", "BookingStep", { step, ...meta });
  dataLayerPush({ event: "booking_step", booking_step: step, ...meta });
}

/**
 * Genuine booking intent: a specific time has been chosen and the details form
 * is now in front of them.
 *
 * Separate from trackBookingStep because `InitiateCheckout` IS a standard Meta
 * event, so it can be selected as an optimisation goal. That matters: `Schedule`
 * will stay too rare to optimise on for a long time at this budget, whereas this
 * fires for everyone who gets as far as choosing a slot, and it is the closest
 * upstream signal to a booking that we have.
 *
 * Fire once per booking attempt, on time selection only.
 */
export function trackBookingIntentConsultation({ concern, variant } = {}) {
  fbq("track", "InitiateCheckout", {
    content_category: "wellness_consultation",
    ...(concern ? { content_name: concern } : {}),
  });
  dataLayerPush({
    event: "begin_checkout",
    content_type: "wellness_consultation",
    health_concern: concern || null,
    landing_variant: variant || null,
  });
}

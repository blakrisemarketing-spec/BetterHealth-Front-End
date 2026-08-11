// Thin analytics layer shared by every conversion touchpoint on the marketing
// site. One call fans out to BOTH ad/measurement stacks:
//   - Meta Pixel  (window.fbq)  — base code lives in index.html
//   - Google      (window.dataLayer) — GTM (GTM-KMH4QTML) + GA4 (G-1KTCH9TZLV)
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

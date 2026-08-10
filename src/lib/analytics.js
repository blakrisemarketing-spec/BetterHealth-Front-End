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

function fbq(...args) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

function dataLayerPush(payload) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }
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

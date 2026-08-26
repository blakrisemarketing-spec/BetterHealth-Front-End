// Per-route SEO for the wellness-consultation landing variants.
//
// Deliberately separate from wellness-consultation.js: this module is pulled
// into src/data/seo.js, which vite.config.js imports in a plain Node context at
// build time. wellness-consultation.js imports .webp/.jpg assets, which Node
// cannot parse — so the SEO strings live here, free of any asset import.
//
// All four are `noindex`: four near-identical pages targeting one intent is the
// textbook doorway-page pattern, and they would compete with each other. They
// still get full Open Graph tags so the ad's link preview renders correctly.
// When a winner emerges, promote it to an indexed page at /wellness-consultation.

export const WELLNESS_CONSULTATION_SEO = {
  // Slug stays `blood-sugar` although the cell is now diagnosed diabetes: the
  // value is written to `wellness_consultations.landing_variant`, and renaming it
  // without confirming the booking API accepts the new string would 400 every
  // booking from this page. Cosmetic rename, real blast radius.
  "blood-sugar": {
    title: "Diabetes Health Plan — Free Consultation | BetterHealth Africa",
    description:
      "Diabetes is not a death sentence. A free 20-minute call with a BetterHealth Wellness Consultant, and a customised written plan within 24 hours — what to track, what to change, and a 90-day checkpoint.",
    imageAlt:
      "A man smiling during a free blood sugar screening at a BetterHealth community event in Ghana.",
  },
  // NB: these strings render in the Meta ad's link preview, which makes them ad
  // content — so they follow the same personal-attributes rule as the ad copy
  // itself. State the fact about the condition, never about the reader. "People
  // living with high blood pressure" runs; "Diagnosed with high blood pressure?"
  // is the exact construction that gets an ad account restricted.
  "blood-pressure": {
    title: "High Blood Pressure Health Plan — Free Consultation | BetterHealth Africa",
    description:
      "High blood pressure is not a death sentence. A free 20-minute call with a BetterHealth Wellness Consultant, and a customised written plan within 24 hours — what to track, what to change, and a 90-day checkpoint.",
    imageAlt:
      "A BetterHealth nurse running a free health screening for a woman at a community event in Ghana.",
  },
  wellness: {
    title: "Constant Tiredness — Free Health Consultation | BetterHealth Africa",
    description:
      "Being tired all the time is not normal, and it usually has causes that can be measured. A free 20-minute call with a BetterHealth Wellness Consultant, and a customised written plan within 24 hours.",
    imageAlt: "A woman in Ghana booking a health consultation on her phone at home.",
  },
  fertility: {
    title: "Free Fertility Wellness Consultation | BetterHealth Africa",
    description:
      "A free 20-minute call with a BetterHealth Wellness Consultant for couples in Ghana, and a written plan within 24 hours — what's worth checking, in what order, and what it costs.",
    imageAlt:
      "A BetterHealth consultant going through a health plan with a member on a tablet in Ghana.",
  },
};

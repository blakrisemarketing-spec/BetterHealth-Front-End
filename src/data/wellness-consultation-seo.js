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
  "blood-sugar": {
    title: "Free Wellness Consultation — Blood Sugar | BetterHealth Africa",
    description:
      "A free 20-minute call with a BetterHealth Wellness Consultant, and a written wellness plan within 24 hours. Find out what's worth checking about your blood sugar, and what to do next.",
    imageAlt:
      "A man smiling during a free blood sugar screening at a BetterHealth community event in Ghana.",
  },
  "blood-pressure": {
    title: "Free Wellness Consultation — Blood Pressure | BetterHealth Africa",
    description:
      "A free 20-minute call with a BetterHealth Wellness Consultant, and a written wellness plan within 24 hours. Understand your blood pressure and heart risk, and what's worth checking.",
    imageAlt:
      "A BetterHealth nurse running a free health screening for a woman at a community event in Ghana.",
  },
  wellness: {
    title: "Free Wellness Consultation | BetterHealth Africa",
    description:
      "A free 20-minute call with a BetterHealth Wellness Consultant, and a written wellness plan within 24 hours. Get a health baseline while you're well, and a plan you can actually follow.",
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

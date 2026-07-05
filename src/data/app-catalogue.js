// Maps the marketing site's panels / single tests / disease programs to the
// deep-link codes the App reads on /join (see src/lib/app-links.js#joinUrl).
//
// SOURCE OF TRUTH: the App's public catalogue —
//   GET https://app.betterhealth.africa/api/public/disease-panels?country=Ghana
//   GET https://app.betterhealth.africa/api/public/diagnostic-tests?country=Ghana
// As of 2026-07-05 those endpoints return HTTP 404 (not deployed yet), so the
// codes below are maintained by hand against the App team's reference list.
// Once the endpoints are live, run `node scripts/sync-app-catalogue.mjs` to
// verify/refresh them (it flags any code here that no longer exists upstream).
//
// The App matches codes case-insensitively and silently ignores unknown codes,
// so a wrong/missing code degrades to the normal chooser — it never errors.

// Panel slug === App panelCode (1:1). Listed explicitly so a future slug rename
// on the marketing side can't silently break the deep link.
export const PANEL_CODES = {
  panorama: "panorama",
  dialics: "dialics",
  cardion: "cardion",
  metabolix: "metabolix",
  privara: "privara",
  alpha: "alpha",
  empress: "empress",
  spark: "spark",
  shield: "shield",
};

// Disease/program slug (src/data/content.js#diseasePrograms) → panel code.
// Mapping confirmed by product.
export const PROGRAM_TO_PANEL = {
  diabetes: "dialics",
  hypertension: "cardion",
  kidney: "metabolix",
  heart: "cardion",
  liver: "metabolix",
  fertility: "spark",
  pcos: "empress",
};

// Marketing single-test slug (src/data/content.js#singleTests) → App test code
// (from /api/public/diagnostic-tests). Only codes confirmed against the App are
// filled; the rest stay null until the catalogue endpoint is live and fall back
// to the plain chooser (no ?test=) rather than shipping a guessed code.
// TODO(app-catalogue): fill the nulls from /api/public/diagnostic-tests.
export const SINGLE_TEST_CODES = {
  "malaria-rdt": "MALARIA_RDT", // confirmed
  fbc: null,
  "fasting-blood-sugar": null,
  hba1c: null,
  "lipid-panel": null,
  "liver-function": null,
  "kidney-function": null,
  "thyroid-function": null,
  "urine-re": null,
  hiv: null,
  "hepatitis-b": null,
  "uric-acid": null,
};

// Panel code for a marketing panel slug (falls back to the slug itself).
export const panelCode = (slug) => PANEL_CODES[slug] || slug;

// Panel code a disease program deep-links to (null if unmapped → plain chooser).
export const programPanelCode = (slug) => PROGRAM_TO_PANEL[slug] || null;

// App test code for a marketing single-test slug (null until confirmed).
export const testCode = (slug) => SINGLE_TEST_CODES[slug] || null;

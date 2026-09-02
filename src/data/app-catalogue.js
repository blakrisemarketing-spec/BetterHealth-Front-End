// Maps the marketing site's panels / single tests / disease programs to the
// deep-link codes the App reads on /join (see src/lib/app-links.js#joinUrl).
//
// SOURCE OF TRUTH: the App's public catalogue —
//   GET https://app.betterhealth.africa/api/public/disease-panels?country=Ghana
//   GET https://app.betterhealth.africa/api/public/diagnostic-tests?country=Ghana
// The marketing site also reads those endpoints at runtime for prices, with a
// localStorage fallback so rendering never depends on the App being reachable.
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
// from /api/public/diagnostic-tests.
export const SINGLE_TEST_CODES = {
  fbc: "FBC",
  "fasting-blood-sugar": "BG_FASTING",
  hba1c: "HBA1C",
  "lipid-panel": "LIPID",
  "liver-function": "LFT",
  "kidney-function": "RFT",
  "thyroid-function": "TFT",
  "urine-re": "URINE_RE",
  "malaria-rdt": "MALARIA_RDT",
  hiv: "RETROSCREEN",
  "hepatitis-b": "HBSAG",
  "uric-acid": "URIC_ACID",
  // Verified against the Ghana catalogue on 2026-09-02 for the /tools
  // calculators: HB Electrophoresis (Sickling Included) GHS 170, Blood
  // Grouping GHS 75, Sickling Test GHS 75. These have no marketing card in
  // content.js#singleTests yet; they exist here so joinUrl({ test }) can
  // deep-link a tool's result straight into onboarding.
  "hb-electrophoresis": "HB_ELECTRO",
  "blood-group": "BLOOD_GROUP",
  sickling: "SICKLING",
};

// Panel code for a marketing panel slug (falls back to the slug itself).
export const panelCode = (slug) => PANEL_CODES[slug] || slug;

// Panel code a disease program deep-links to (null if unmapped → plain chooser).
export const programPanelCode = (slug) => PROGRAM_TO_PANEL[slug] || null;

// App test code for a marketing single-test slug (null until confirmed).
export const testCode = (slug) => SINGLE_TEST_CODES[slug] || null;

// Registry for the free lead-magnet guides served at /guides/<slug>.
//
// Each guide is a plain data module (no JSX, no browser globals) because this
// file is imported by BOTH the client (pages/Guide.jsx) and the Node-side
// build: src/data/seo.js reads it to prerender a <head> per guide, and
// scripts/build-guide-pdfs.mjs renders the same sections to PDF. Keep it pure.
//
// Shape per guide:
//   { slug, kind: "guide" | "quiz", title, shortTitle, eyebrow, promise,
//     description (meta, <=155 chars), stage: "top" | "middle", panelSlugs,
//     format, pdf? ("/guides/<slug>.pdf"; omitted for a quiz), bullets,
//     sections: [{ heading, paragraphs, table?, tables?, list?, ordered?,
//                  after?, callout? }],
//     sources: [{ label, url? }], cta: { panelSlug, label },
//     quiz? ({ intro, questions, results }) }
//
// Section render order everywhere: paragraphs -> table(s) -> list -> after
// -> callout. `table.fillIn: true` marks a worksheet grid whose empty cells
// get ruled, taller rows on the page and in the PDF.
//
// Medical thresholds in these files are copied from the vetted blog articles
// under src/data/blog/posts/ (and cite the same sources). Do not add a number
// here that is not in one of those articles.

import knowYourNumbers from "./know-your-numbers.js";
import whichTest from "./which-test.js";
import familyHealthMap from "./family-health-map.js";
import bloodSugarLog from "./blood-sugar-log.js";
import homeBloodPressureGuide from "./home-blood-pressure-guide.js";
import readYourResults from "./read-your-results.js";

export const GUIDE_DISCLAIMER =
  "General education only. For severe or urgent symptoms, seek medical care.";

export const GUIDE_TRUST_LINE =
  "Written by the BetterHealth Africa editorial team. Reviewed against WHO / ADA / AHA thresholds.";

export const GUIDES = [
  knowYourNumbers,
  whichTest,
  familyHealthMap,
  bloodSugarLog,
  homeBloodPressureGuide,
  readYourResults,
];

export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug) || null;
}

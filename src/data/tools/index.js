// Registry for the free interactive tools served at /tools/<slug>.
//
// Same rules as src/data/guides/index.js: each tool is a plain data module
// (no JSX, no browser globals) because this file is imported by BOTH the
// client (pages/Tool.jsx) and the Node-side build, where src/data/seo.js reads
// it to prerender a <head> per tool. Keep it pure.
//
// Shape per tool:
//   { slug, title, shortTitle, eyebrow, promise, description (meta, <=155
//     chars), format, bullets, intro,
//     sections: [{ heading, paragraphs, list?, ordered?, after?, callout? }],
//     sources: [{ label, url? }],
//     cta:          { kind: "panel", panelSlug, label, body }
//                 | { kind: "test", testCode, slug, name, price, label, body },
//     secondaryCta? (same shape as cta) }
//
// Each module also exports its own pure scoring functions, which is what the
// unit tests in scripts/test-tools.mjs exercise.
//
// Medical thresholds in these files are copied from the vetted blog articles
// under src/data/blog/posts/ (and cite the same sources), or from the named
// published instrument in the file's own source comment. Do not add a number
// here that is not in one of those.

import genotypeCompatibility from "./genotype-compatibility.js";
import diabetesRisk from "./diabetes-risk.js";
import heartAge from "./heart-age.js";
import bmiWaist from "./bmi-waist.js";

export const TOOL_DISCLAIMER =
  "General education only. For severe or urgent symptoms, seek medical care.";

export const TOOL_TRUST_LINE =
  "Built by the BetterHealth Africa editorial team from published instruments. Every number on the result screen is worked out on your device.";

export const TOOLS = [genotypeCompatibility, diabetesRisk, heartAge, bmiWaist];

export function getTool(slug) {
  return TOOLS.find((t) => t.slug === slug) || null;
}

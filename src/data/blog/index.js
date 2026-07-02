// Blog article registry. This is the single append point for new content: the
// nightly SEO routine adds one `import` + one array entry per published article.
// Everything else — the /blog/<slug> route, the prerendered HTML, the Article +
// Breadcrumb + FAQ schema, the sitemap entry, the llms.txt listing and the blog
// index card — is derived from this list automatically.
import hba1cExplained from "./posts/hba1c-explained.js";
import preventiveHealthScreeningGhana from "./posts/preventive-health-screening-ghana.js";
import preventableDiseasesGhana from "./posts/preventable-diseases-preventive-healthcare-ghana.js";
import fattyLiverDiseaseExplained from "./posts/fatty-liver-disease-explained.js";
import fastingBloodSugarExplained from "./posts/fasting-blood-sugar-explained.js";
import lipidProfileCholesterolTest from "./posts/lipid-profile-cholesterol-test.js";
import fullBloodCountExplained from "./posts/full-blood-count-explained.js";
import highBloodPressureSilentKiller from "./posts/high-blood-pressure-silent-killer.js";
import prediabetesWarningSigns from "./posts/prediabetes-warning-signs.js";
import ferritinIronAnaemia from "./posts/ferritin-iron-anaemia.js";
import vitaminDDeficiency from "./posts/vitamin-d-deficiency.js";
import sickleCellTraitTesting from "./posts/sickle-cell-trait-testing.js";
import creatinineEgfrKidneyFunction from "./posts/creatinine-egfr-kidney-function.js";

const ALL = [
  hba1cExplained,
  preventiveHealthScreeningGhana,
  preventableDiseasesGhana,
  fattyLiverDiseaseExplained,
  fastingBloodSugarExplained,
  lipidProfileCholesterolTest,
  fullBloodCountExplained,
  highBloodPressureSilentKiller,
  prediabetesWarningSigns,
  ferritinIronAnaemia,
  vitaminDDeficiency,
  sickleCellTraitTesting,
  creatinineEgfrKidneyFunction,
];

// Newest first. localeCompare on ISO dates (YYYY-MM-DD) sorts chronologically
// without Date.now()/new Date(), keeping this module pure and build-safe.
export const ARTICLES = [...ALL].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished)
);

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

// Plain-text rendering of an article body, used by the build to generate
// llms-full.txt. Mirrors the block types the React renderer understands.
export function articleToPlainText(article) {
  const lines = [`# ${article.title}`, "", article.description, ""];
  for (const block of article.body) {
    switch (block.type) {
      case "h2":
        lines.push("", `## ${block.text}`, "");
        break;
      case "h3":
        lines.push("", `### ${block.text}`, "");
        break;
      case "image":
        if (block.caption) lines.push(`[Figure: ${block.caption}]`, "");
        break;
      case "p":
        lines.push(block.text, "");
        break;
      case "callout":
        lines.push(`${block.title ? block.title + ": " : ""}${block.text}`, "");
        break;
      case "list":
        for (const item of block.items) lines.push(`- ${item}`);
        lines.push("");
        break;
      case "link-internal":
        lines.push(`${block.label}: ${block.to}`, "");
        break;
      case "faq":
        for (const item of block.items) {
          lines.push(`Q: ${item.q}`, `A: ${item.a}`, "");
        }
        break;
      case "disclaimer":
        lines.push(block.text, "");
        break;
      default:
        break;
    }
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// FAQ pairs extracted from an article's faq blocks (for FAQPage schema).
export function articleFaqItems(article) {
  return article.body
    .filter((b) => b.type === "faq")
    .flatMap((b) => b.items);
}

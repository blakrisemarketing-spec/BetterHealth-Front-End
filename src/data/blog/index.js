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
import thyroidTshTestExplained from "./posts/thyroid-tsh-test-explained.js";
import liverFunctionTestsExplained from "./posts/liver-function-tests-explained.js";
import malariaTestExplained from "./posts/malaria-test-explained.js";
import typhoidWidalTest from "./posts/typhoid-widal-test.js";
import hepatitisBTest from "./posts/hepatitis-b-test.js";
import hivTestExplained from "./posts/hiv-test-explained.js";
import hepatitisCTest from "./posts/hepatitis-c-test.js";
import genotypeTestAaAsSs from "./posts/genotype-test-aa-as-ss.js";
import premaritalScreening from "./posts/premarital-screening.js";
import bloodGroupTest from "./posts/blood-group-test.js";
import psaProstateTest from "./posts/psa-prostate-test.js";
import papSmearCervicalScreening from "./posts/pap-smear-cervical-screening.js";
import uricAcidGoutTest from "./posts/uric-acid-gout-test.js";
import crpInflammationTest from "./posts/crp-inflammation-test.js";
import hPyloriTest from "./posts/h-pylori-test.js";
import stoolTestExplained from "./posts/stool-test-explained.js";
import urinalysisExplained from "./posts/urinalysis-explained.js";
import vitaminB12FolateTest from "./posts/vitamin-b12-folate-test.js";
import g6pdDeficiencyTest from "./posts/g6pd-deficiency-test.js";
import antenatalBloodTests from "./posts/antenatal-blood-tests.js";
import healthScreeningNigeria from "./posts/health-screening-nigeria.js";
import healthScreeningKenya from "./posts/health-screening-kenya.js";
import bloodTestLagos from "./posts/blood-test-lagos.js";
import bloodTestNairobi from "./posts/blood-test-nairobi.js";
import costOfHealthScreeningGhana from "./posts/cost-of-health-screening-ghana.js";
import fullBodyCheckupGuide from "./posts/full-body-checkup-guide.js";
import homeVsLabBloodTest from "./posts/home-vs-lab-blood-test.js";
import bloodTestAccra from "./posts/blood-test-accra.js";
import bloodTestKumasi from "./posts/blood-test-kumasi.js";

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
  thyroidTshTestExplained,
  liverFunctionTestsExplained,
  malariaTestExplained,
  typhoidWidalTest,
  hepatitisBTest,
  hivTestExplained,
  hepatitisCTest,
  genotypeTestAaAsSs,
  premaritalScreening,
  bloodGroupTest,
  psaProstateTest,
  papSmearCervicalScreening,
  uricAcidGoutTest,
  crpInflammationTest,
  hPyloriTest,
  stoolTestExplained,
  urinalysisExplained,
  vitaminB12FolateTest,
  g6pdDeficiencyTest,
  antenatalBloodTests,
  healthScreeningNigeria,
  healthScreeningKenya,
  bloodTestLagos,
  bloodTestNairobi,
  costOfHealthScreeningGhana,
  fullBodyCheckupGuide,
  homeVsLabBloodTest,
  bloodTestAccra,
  bloodTestKumasi,
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

// HTML escaping for build-time body prerender (see articleToHtml).
const htmlEsc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const formatDate = (iso) => {
  const [y, m, d] = String(iso).split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

// Semantic HTML rendering of an article, injected into <div id="root"> at build
// time so crawlers, AI engines, and the first paint see the full article without
// executing JavaScript. The class names mirror BlogPost.jsx's <Block> renderer so
// the static markup is visually consistent with what React later renders (the app
// uses createRoot, which replaces #root on mount — no hydration mismatch). Mirrors
// the block types the React renderer understands.
export function articleToHtml(article) {
  const parts = [];
  for (const block of article.body) {
    switch (block.type) {
      case "p":
        parts.push(
          `<p class="text-[1.05rem] leading-[1.85] text-text-secondary font-body mb-6">${htmlEsc(block.text)}</p>`
        );
        break;
      case "h2":
        parts.push(
          `<h2${block.id ? ` id="${htmlEsc(block.id)}"` : ""} class="scroll-mt-28 text-[1.55rem] font-extrabold font-heading text-text-primary mt-12 mb-4 leading-tight">${htmlEsc(block.text)}</h2>`
        );
        break;
      case "h3":
        parts.push(
          `<h3${block.id ? ` id="${htmlEsc(block.id)}"` : ""} class="scroll-mt-28 text-[1.2rem] font-bold font-heading text-text-primary mt-9 mb-3 leading-tight">${htmlEsc(block.text)}</h3>`
        );
        break;
      case "image":
        parts.push(
          `<figure class="my-8"><img src="${htmlEsc(block.src)}" alt="${htmlEsc(block.alt || "")}" loading="lazy" class="w-full rounded-card border border-border bg-white" />${block.caption ? `<figcaption class="mt-2.5 text-[13px] text-text-secondary/80 font-body text-center italic">${htmlEsc(block.caption)}</figcaption>` : ""}</figure>`
        );
        break;
      case "list": {
        const items = block.items.map((i) => `<li>${htmlEsc(i)}</li>`).join("");
        parts.push(
          block.ordered
            ? `<ol class="list-decimal pl-6 mb-6 space-y-2 text-[1.05rem] leading-[1.7] text-text-secondary font-body marker:text-primary marker:font-bold">${items}</ol>`
            : `<ul class="list-disc pl-6 mb-6 space-y-2 text-[1.05rem] leading-[1.7] text-text-secondary font-body marker:text-primary">${items}</ul>`
        );
        break;
      }
      case "callout":
        parts.push(
          `<div class="my-8 rounded-card border border-primary/20 bg-primary-bg px-6 py-5">${block.title ? `<p class="font-heading font-bold text-text-primary mb-1.5">${htmlEsc(block.title)}</p>` : ""}<p class="text-[0.98rem] leading-relaxed text-text-secondary font-body m-0">${htmlEsc(block.text)}</p></div>`
        );
        break;
      case "link-internal":
        parts.push(
          `<p class="my-7"><a href="${htmlEsc(block.to)}" class="inline-flex items-center gap-2 font-heading font-bold text-primary hover:text-primary-dark transition-colors">${htmlEsc(block.label)} <span aria-hidden="true">&rarr;</span></a></p>`
        );
        break;
      case "faq": {
        const items = block.items
          .map(
            (item) =>
              `<details class="group rounded-card border border-border bg-white px-5 py-4"><summary class="cursor-pointer list-none font-heading font-bold text-text-primary flex justify-between items-center gap-4">${htmlEsc(item.q)}<span class="text-primary text-xl leading-none">+</span></summary><p class="mt-3 text-[0.98rem] leading-relaxed text-text-secondary font-body m-0">${htmlEsc(item.a)}</p></details>`
          )
          .join("");
        parts.push(
          `<div class="mt-10"><h2 class="text-[1.55rem] font-extrabold font-heading text-text-primary mb-5">Frequently asked questions</h2><div class="space-y-4">${items}</div></div>`
        );
        break;
      }
      case "disclaimer":
        parts.push(
          `<p class="mt-10 pt-6 border-t border-border text-[0.85rem] leading-relaxed text-text-secondary/80 font-body italic">${htmlEsc(block.text)}</p>`
        );
        break;
      default:
        break;
    }
  }

  const tags = (article.tags || [])
    .map(
      (tag) =>
        `<span class="px-3 py-1 rounded-pill bg-primary-bg border border-primary/20 text-primary text-[11px] font-bold font-heading tracking-wide uppercase">${htmlEsc(tag)}</span>`
    )
    .join("");

  return [
    '<div class="bg-base min-h-screen overflow-x-hidden"><main><article>',
    '<header class="pt-[120px] pb-10 px-6 bg-base relative overflow-hidden"><div class="max-w-[720px] mx-auto relative z-10">',
    '<nav class="text-[13px] font-body text-text-secondary mb-5" aria-label="Breadcrumb"><a href="/">Home</a> <span class="mx-2">/</span> <a href="/blog">Blog</a></nav>',
    tags ? `<div class="flex flex-wrap gap-2 mb-5">${tags}</div>` : "",
    `<h1 class="text-[2rem] sm:text-[2.5rem] font-extrabold font-heading leading-[1.1] text-text-primary mb-5">${htmlEsc(article.title)}</h1>`,
    `<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-text-secondary font-body"><span class="font-semibold text-text-primary">${htmlEsc(article.author?.name || "BetterHealth Africa")}</span> <span aria-hidden="true">&middot;</span> <time datetime="${htmlEsc(article.datePublished)}">${htmlEsc(formatDate(article.datePublished))}</time>${article.readingMinutes ? ` <span aria-hidden="true">&middot;</span> <span>${htmlEsc(article.readingMinutes)} min read</span>` : ""}</div>`,
    "</div></header>",
    `<div class="px-6 pb-16 bg-base"><div class="max-w-[720px] mx-auto">${parts.join("")}</div></div>`,
    "</article></main></div>",
  ]
    .filter(Boolean)
    .join("");
}

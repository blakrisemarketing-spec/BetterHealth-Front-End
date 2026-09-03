#!/usr/bin/env node
/**
 * Builds the September 2026 Meta creatives for BetterHealth Africa.
 *
 *   node build.mjs                      all 36 creatives x 2 sizes (72 files)
 *   node build.mjs --only panorama-a,shield-b
 *   node build.mjs --size 4x5           one size only (4x5 | 9x16)
 *   node build.mjs --html-only          write the HTML sources, skip rendering
 *
 * Feed (4:5) renders land in public/ads/2026-09/, story (9:16) renders in ./story/,
 * HTML sources in ./src/. Flat cream/dark canvases render as PNG and fall back to
 * JPEG (q88) if the PNG is over 600 KB; photo variants always render as JPEG.
 *
 * Copy comes from ../ad-copy.md (approved). Do not edit the strings below without
 * updating that file first.
 */
import { mkdir, readFile, writeFile, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "../../..");
const MEDIA = "/Users/greatdamzi/Documents/01. GitHub/BetterHealth-Media";
const PUPPETEER = path.join(
  MEDIA,
  "node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js",
);
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const SRC_DIR = path.join(HERE, "src");
const OUT_FEED = path.join(REPO, "public/ads/2026-09");
const OUT_STORY = path.join(HERE, "story");
const MAX_BYTES = 600 * 1024;
const JPEG_QUALITY = 88;

// ---------------------------------------------------------------------------
// Sizes. 9:16 keeps the whole composition inside the middle ~1180px band so the
// story UI (top/bottom ~250px) never covers key copy.
// ---------------------------------------------------------------------------
const SIZES = {
  "4x5": {
    w: 1080,
    h: 1350,
    outDir: OUT_FEED,
    vars: { "--pad-top": "84px", "--pad-bottom": "84px" },
    hero: {
      "--logo-w": "280px",
      "--pill-pad-y": "16px",
      "--pill-pad-x": "28px",
      "--hero-justify": "center",
      statementFit: "124,92,4",
    },
    heroPhoto: {
      // Smaller, higher pill so it clears the woman's hand and the tablet edge.
      "--pad-top": "62px",
      "--logo-w": "222px",
      "--pill-pad-y": "13px",
      "--pill-pad-x": "24px",
      "--hero-justify": "flex-end",
      "--photo-h": "780px",
      "--photo-pos": "center top",
      "--fade-start": "64%",
      "--fade-mid": "91%",
      statementFit: "84,64,4",
    },
  },
  "9x16": {
    w: 1080,
    h: 1920,
    outDir: OUT_STORY,
    vars: { "--pad-top": "370px", "--pad-bottom": "370px" },
    hero: {
      "--logo-w": "280px",
      "--pill-pad-y": "16px",
      "--pill-pad-x": "28px",
      "--hero-justify": "center",
      statementFit: "124,92,4",
    },
    heroPhoto: {
      "--pad-top": "930px",
      "--pad-bottom": "290px",
      "--logo-w": "236px",
      "--pill-pad-y": "14px",
      "--pill-pad-x": "26px",
      "--hero-justify": "center",
      "--photo-h": "900px",
      "--photo-pos": "left top",
      "--fade-start": "62%",
      "--fade-mid": "92%",
      statementFit: "100,72,4",
    },
  },
};

// ---------------------------------------------------------------------------
// Data table. Ids match the ad-copy utm_content values.
// Statement markup: *phrase* = sage accent, | = forced line break.
// ---------------------------------------------------------------------------
const DEFAULT_BADGE = "Home or lab collection";
const TURN_48 = "Results in 48 to 72 hours";
const TURN_24 = "Results in 24 to 48 hours";

const CREATIVES = [
  // --- P-CARD: panel cards -------------------------------------------------
  {
    id: "panorama-a",
    mode: "P-CARD",
    eyebrow: "Panorama",
    headline: "Complete Health Check",
    tests: [
      "Full Blood Count",
      "HbA1c",
      "Fasting/Random Blood Sugar",
      "Kidney Function",
      "Liver Function",
      "Urine R/E",
      "Lipid Profile",
      "Uric Acid",
    ],
    price: "1,100",
    turnaround: TURN_48,
  },
  {
    id: "dialics-a",
    mode: "P-CARD",
    eyebrow: "Dialics",
    headline: "Blood Sugar Check",
    tests: ["HbA1c (3-month average)", "Fasting/Random Blood Sugar", "Urine R/E"],
    price: "350",
    turnaround: TURN_24,
  },
  {
    id: "cardion-a",
    mode: "P-CARD",
    eyebrow: "Cardion",
    headline: "Heart Health Check",
    tests: [
      "Blood Pressure (at your visit)",
      "Lipid Profile (cholesterol)",
      "Fasting/Random Blood Sugar",
      "Full Blood Count",
      "Uric Acid",
      "CRP (inflammation)",
    ],
    price: "475",
    turnaround: TURN_48,
  },
  {
    id: "metabolix-a",
    mode: "P-CARD",
    eyebrow: "Metabolix",
    headline: "Core Health Check",
    tests: ["Kidney Function", "Liver Function", "Full Blood Count", "HbA1c"],
    price: "697",
    turnaround: TURN_48,
  },
  {
    id: "alpha-a",
    mode: "P-CARD",
    eyebrow: "Alpha",
    headline: "Men’s Health Check",
    tests: [
      "PSA (prostate)",
      "Testosterone",
      "Lipid Profile",
      "Full Blood Count",
      "HbA1c",
      "Urine R/E",
      "ESR",
      "Calcium",
    ],
    price: "995",
    turnaround: TURN_48,
  },
  {
    id: "empress-a",
    mode: "P-CARD",
    eyebrow: "Empress",
    headline: "Women’s Health Check",
    badge: "Any time of the month",
    tests: [
      "Full Blood Count",
      "Thyroid Function (TSH, T3, T4)",
      "HbA1c",
      "Lipid Profile",
      "Calcium",
      "Urine R/E",
    ],
    price: "995",
    turnaround: TURN_48,
  },
  {
    id: "shield-a",
    mode: "P-CARD",
    eyebrow: "Shield",
    headline: "Wellness Check",
    subline: "Malaria + typhoid screen",
    tests: [
      "Malaria RDT + Blood Film",
      "Typhoid Antibodies (Widal)",
      "CRP",
      "Full Blood Count",
    ],
    price: "497",
    turnaround: "Same-day malaria result",
  },
  {
    id: "spark-a",
    mode: "P-CARD",
    eyebrow: "Spark",
    headline: "Him/Her Fertility Test",
    badge: "Partner lab visit",
    tests: [
      "Thyroid Function (TSH, T3, T4)",
      "Progesterone",
      "Pelvic Ultrasound",
      "Sperm Analysis",
      "Testosterone",
    ],
    price: "1,500",
    turnaround: TURN_48,
  },

  // --- P-STATE: panel statements -------------------------------------------
  {
    id: "panorama-b",
    mode: "P-STATE",
    photo: true,
    statement: "One visit.|Eight results.|*Every number|explained.*",
    chips: [["Complete Health Check"], ["GHS 1,100 excl. VAT", "fill"]],
  },
  {
    id: "cardion-b",
    mode: "P-STATE",
    statement: "1 in 3 adults in Ghana has high blood pressure.",
    sub: "Fewer than half know.",
    source: "Ghana Health Service surveys",
    chips: [["Heart Health Check"], ["GHS 475 excl. VAT", "fill"]],
  },
  {
    id: "shield-b",
    mode: "P-STATE",
    statement: "Malaria and typhoid share *the same fever.*",
    chips: [["Wellness Check"], ["GHS 497 excl. VAT", "fill"]],
  },
  {
    id: "spark-b",
    mode: "P-STATE",
    statement: "Fertility testing usually starts with the woman. *It doesn't have to.*",
    chips: [["Him/Her Fertility Test"], ["GHS 1,500 excl. VAT", "fill"]],
  },
  {
    id: "dialics-b",
    mode: "P-STATE",
    statement: "One reading shows today. *HbA1c shows three months.*",
    chips: [["Blood Sugar Check"], ["GHS 350 excl. VAT", "fill"]],
  },
  {
    id: "metabolix-b",
    mode: "P-STATE",
    statement: "Kidneys and liver rarely give early warnings. *The numbers do.*",
    chips: [["Core Health Check"], ["GHS 697 excl. VAT", "fill"]],
  },
  {
    id: "alpha-b",
    mode: "P-STATE",
    statement: "From 40, two checks clinicians recommend: *PSA and cholesterol.*",
    chips: [["Men's Health Check"], ["GHS 995 excl. VAT", "fill"]],
  },
  {
    id: "empress-b",
    mode: "P-STATE",
    statement: "Thyroid and anaemia can only be checked *with a blood test.*",
    chips: [["Women's Health Check"], ["GHS 995 excl. VAT", "fill"]],
  },

  // --- G-CARD: lead-magnet cards -------------------------------------------
  {
    id: "know-your-numbers-a",
    mode: "G-CARD",
    headline: "The 8 Numbers Every Adult in Ghana Should Know",
    bullets: [
      "What each number is a clue for",
      "The ranges clinicians use (WHO, ADA, AHA)",
      "How often to check, by age",
    ],
    mock: "numbers",
  },
  {
    id: "which-test-a",
    mode: "G-CARD",
    badge: "Free quiz",
    button: "Start the quiz",
    bar: "Two minutes, free, no account needed.",
    headline: "Which Health Test Do I Actually Need?",
    bullets: [
      "7 quick questions, 2 minutes",
      "A straight recommendation: which panel, what it costs",
      "No account, no sales call",
    ],
    mock: "quiz",
  },
  {
    id: "family-health-map-a",
    mode: "G-CARD",
    headline: "Your Family Health Map",
    bullets: [
      "A three-generation worksheet",
      "Which tests each history points to",
      "5 questions to ask an older relative",
    ],
    mock: "family",
  },
  {
    id: "blood-sugar-log-a",
    mode: "G-CARD",
    headline: "The 90-Day Blood Sugar Log",
    bullets: [
      "12-week fasting + after-meal grid",
      "The ranges clinicians use (ADA, WHO)",
      "A bring-to-your-review checklist",
    ],
    mock: "sugar",
  },
  {
    id: "home-blood-pressure-guide-a",
    mode: "G-CARD",
    headline: "Home Blood Pressure: The 7-Day Reading Guide",
    bullets: [
      "How to take a reading properly",
      "7-day AM/PM log sheet",
      "WHO and AHA categories, and when to seek care",
    ],
    mock: "bp",
  },
  {
    id: "read-your-results-a",
    mode: "G-CARD",
    headline: "How to Read Your Lab Results",
    bullets: [
      "20 lab terms in plain English",
      "What an H or L flag means, and does not",
      "5 questions to ask your doctor",
    ],
    mock: "results",
  },

  // --- G-STATE: lead-magnet statements -------------------------------------
  {
    id: "know-your-numbers-b",
    mode: "G-STATE",
    statement: "Everyone knows their weight. *Fewer know their HbA1c.*",
    chips: [["Free guide · 3 pages"], ["Get it free", "sage"]],
  },
  {
    id: "which-test-b",
    mode: "G-STATE",
    statement: "A full body check-up is *not always the answer.*",
    chips: [["Free quiz · 2 minutes"], ["Start the quiz", "sage"]],
  },
  {
    id: "family-health-map-b",
    mode: "G-STATE",
    statement:
      "‘It runs in the family’ only helps if it is *written down.*",
    chips: [["Free guide · 2 pages"], ["Get it free", "sage"]],
  },
  {
    id: "blood-sugar-log-b",
    mode: "G-STATE",
    statement: "‘How has your sugar been?’ *Answer it at a glance.*",
    chips: [["Free guide · 4 pages"], ["Get it free", "sage"]],
  },
  {
    id: "home-blood-pressure-guide-b",
    mode: "G-STATE",
    statement: "One raised reading is not a diagnosis.",
    sub: "Seven days is a pattern.",
    chips: [["Free guide · 2 pages"], ["Get it free", "sage"]],
  },
  {
    id: "read-your-results-b",
    mode: "G-STATE",
    photo: true,
    statement: "H does not mean|emergency.|*L does not mean|fine.*",
    chips: [["Free guide · 3 pages"], ["Get it free", "sage"]],
  },

  // --- Calculators (ad sets 7 to 9). Cards reuse G-CARD with a tool mock, ---
  // --- statements reuse the dark hero. Copy from ../ad-copy.md. ------------
  {
    id: "genotype-compatibility-a",
    mode: "G-CARD",
    badge: "Free calculator",
    button: "Try the calculator",
    bar: "Free. About 30 seconds.",
    headline: "Genotype Compatibility Calculator",
    bullets: [
      "Choose both genotypes, see the odds",
      "What AA, AS, SS, SC and AC mean",
      "About 30 seconds, no account",
    ],
    mock: "genotype",
  },
  {
    id: "genotype-compatibility-b",
    mode: "G-STATE",
    statement: "A sickling test cannot tell *AS from SS.*",
    chips: [["Free calculator"], ["Try it free", "sage"]],
  },
  {
    id: "diabetes-risk-a",
    mode: "G-CARD",
    badge: "Free score",
    button: "Get your score",
    bar: "Free. No blood test needed.",
    headline: "Diabetes Risk Score",
    bullets: [
      "8 questions, no blood test",
      "Age, waist, activity, family history",
      "About 2 minutes",
    ],
    mock: "risk",
  },
  {
    id: "diabetes-risk-b",
    mode: "G-STATE",
    statement: "Eight questions. *No blood test.*",
    chips: [["Free score · 2 minutes"], ["Get your score", "sage"]],
  },
  {
    id: "heart-age-a",
    mode: "G-CARD",
    badge: "Free check",
    button: "Check heart age",
    bar: "Free. About one minute.",
    headline: "Heart Age Check",
    bullets: [
      "5 questions, about a minute",
      "No cholesterol result needed",
      "See what is moving it most",
    ],
    mock: "heartage",
  },
  {
    id: "heart-age-b",
    mode: "G-STATE",
    statement: "A heart has an age of its own. *It isn't always yours.*",
    chips: [["Free check · 1 minute"], ["Check heart age", "sage"]],
  },

  // --- Ad set 10: BMI and waist calculator (top of funnel) -----------------
  {
    id: "bmi-waist-a",
    mode: "G-CARD",
    badge: "Free calculator",
    button: "Run the numbers",
    bar: "Free. About one minute.",
    headline: "BMI and Waist Calculator",
    bullets: [
      "Height, weight, waist. One minute.",
      "BMI, waist range and waist-to-height",
      "What BMI cannot tell you",
    ],
    mock: "bmiwaist",
  },
  {
    id: "bmi-waist-b",
    mode: "G-STATE",
    statement: "Your waist should measure *less than half your height.*",
    chips: [["Free calculator · 1 minute"], ["Run the numbers", "sage"]],
  },
];

// ---------------------------------------------------------------------------
// Markup helpers
// ---------------------------------------------------------------------------
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TICK =
  '<span class="tick"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

// Hyphenated tokens ("waist-to-height", "7-day") never break at the hyphen.
const nowrapHyphens = (html) => html.replace(/(\S+-\S+)/g, '<span class="nowrap">$1</span>');

const listItems = (items) =>
  items
    .map((t) => `            <li>${TICK}<span>${nowrapHyphens(esc(t))}</span></li>`)
    .join("\n");

// *accent* -> sage span, | -> <br>
function statementHtml(text) {
  let html = nowrapHyphens(esc(text));
  html = html.replace(/\*([^*]+)\*/g, '<span class="accent">$1</span>');
  html = html.replace(/\|/g, "<br />");
  return html;
}

const chipsHtml = (chips) =>
  chips
    .map(([label, kind]) => `        <span class="chip${kind ? " " + kind : ""}">${esc(label)}</span>`)
    .join("\n");

// PDF first-page mocks for the G-CARD template.
const PH = (w) => `<span class="ph" style="width:${w}"></span>`;
const MOCKS = {
  numbers: () => `
<table class="mtable">
  <colgroup><col style="width:44%"><col style="width:33%"><col style="width:23%"></colgroup>
  <tr><th>Number</th><th>Range</th><th>Mine</th></tr>
  ${["Blood pressure", "HbA1c", "LDL cholesterol", "Creatinine"]
    .map((n) => `<tr><td>${n}</td><td>${PH("82%")}</td><td><span class="box"></span></td></tr>`)
    .join("\n  ")}
</table>`,
  quiz: () => `
<div class="q-label">Question 1 of 7</div>
<div class="q-bar"><span></span></div>
<div class="q-text">${PH("92%")}${PH("64%")}</div>
${["A", "B", "C"]
  .map((l, i) => `<div class="q-opt"><b>${l}</b>${PH(["70%", "54%", "62%"][i])}</div>`)
  .join("\n")}`,
  family: () => `
<table class="mtable center">
  <colgroup><col style="width:36%"><col><col><col><col></colgroup>
  <tr><th></th><th>BP</th><th>Sugar</th><th>Stroke</th><th>Kidney</th></tr>
  ${["Mother", "Father", "Siblings", "Grandparents"]
    .map(
      (n) =>
        `<tr><td>${n}</td><td><span class="box"></span></td><td><span class="box"></span></td><td><span class="box"></span></td><td><span class="box"></span></td></tr>`,
    )
    .join("\n  ")}
</table>`,
  sugar: () => `
<table class="mtable">
  <colgroup><col style="width:24%"><col style="width:24%"><col style="width:24%"><col style="width:28%"></colgroup>
  <tr><th>Date</th><th>Fasting</th><th>2h after</th><th>Notes</th></tr>
  ${[1, 2, 3, 4, 5, 6]
    .map(() => `<tr><td>${PH("70%")}</td><td>${PH("55%")}</td><td>${PH("55%")}</td><td>${PH("80%")}</td></tr>`)
    .join("\n  ")}
</table>`,
  bp: () => `
<table class="mtable center">
  <colgroup><col style="width:34%"><col><col></colgroup>
  <tr><th>Day</th><th>AM</th><th>PM</th></tr>
  ${[1, 2, 3, 4, 5, 6, 7]
    .map((d) => `<tr><td>Day ${d}</td><td>${PH("62%")}</td><td>${PH("62%")}</td></tr>`)
    .join("\n  ")}
</table>`,
  results: () => `
<table class="mtable">
  <colgroup><col style="width:34%"><col style="width:44%"><col style="width:22%"></colgroup>
  <tr><th>Test</th><th>Result</th><th>Flag</th></tr>
  <tr><td>HbA1c</td><td>${PH("64%")}</td><td><span class="flag h">H</span></td></tr>
  <tr><td>LDL</td><td>${PH("58%")}</td><td><span class="flag h">H</span></td></tr>
  <tr><td>ALT</td><td>${PH("50%")}</td><td></td></tr>
  <tr><td>eGFR</td><td>${PH("60%")}</td><td><span class="flag l">L</span></td></tr>
</table>`,

  // --- tool-interface mocks (calculators) ----------------------------------
  // Every number below is interface furniture at mock scale, not a claim: the
  // genotype split is Mendelian, the score and the heart age are placeholders
  // sitting inside a drawn screen. No reference range or threshold appears.
  genotype: () => `
<div class="t-fields">
  <div class="t-field">
    <span class="t-flabel">You</span>
    <span class="t-sel">AS<i class="t-chev"></i></span>
  </div>
  <div class="t-field">
    <span class="t-flabel">Partner</span>
    <span class="t-sel">AS<i class="t-chev"></i></span>
  </div>
</div>
<div class="t-rule"></div>
<div class="t-group">
  <div class="t-cap">Result</div>
  <div class="t-seg">
    <span class="s1" style="flex:1">25%</span>
    <span class="s2" style="flex:2">50%</span>
    <span class="s3" style="flex:1">25%</span>
  </div>
  <div class="t-segcap">
    <span style="flex:1">AA</span>
    <span style="flex:2">AS</span>
    <span style="flex:1">SS</span>
  </div>
</div>`,

  risk: () => `
<div class="t-score">Your score: <b>13</b> of 26</div>
<div class="t-rule"></div>
<div class="t-group band">
  <div class="t-band">
    <span></span><span></span><span class="on"></span><span></span><span></span>
    <i class="t-pin"></i>
  </div>
  <div class="t-bandcap">
    <span>Low</span>
    <span>Slightly<br />raised</span>
    <span class="on">Moderate</span>
    <span>High</span>
    <span>Very<br />high</span>
  </div>
</div>`,

  heartage: () => `
<div class="t-group">
  <div class="t-cap">Estimated heart age</div>
  <div class="t-big">52</div>
  <div class="t-muted">Your age 44</div>
</div>
<div class="t-rule"></div>
<div class="t-group">
  <div class="t-frow"><span class="t-fname">Blood pressure</span><span class="t-fbar"><i style="width:74%"></i></span></div>
  <div class="t-frow"><span class="t-fname">Smoking</span><span class="t-fbar"><i style="width:52%"></i></span></div>
</div>`,

  bmiwaist: () => `
<div class="t-group">
  <div class="t-cap">Your results</div>
  <div class="t-reslist">
    <div class="t-res"><span class="t-rname">BMI</span><span class="t-rval">26.4</span><span class="t-fbar"><i style="width:62%"></i></span></div>
    <div class="t-res"><span class="t-rname">Waist</span><span class="t-rval">96 cm</span><span class="t-fbar"><i style="width:70%"></i></span></div>
    <div class="t-res"><span class="t-rname">Waist to height</span><span class="t-rval">0.52</span><span class="t-fbar"><i style="width:52%"></i></span></div>
    <div class="t-note">Aim under 0.50</div>
  </div>
</div>`,
};

// Mocks that draw a tool screen rather than a PDF page: wider card, and the
// footer says "Free tool" instead of "Page 1".
const TOOL_MOCKS = new Set(["genotype", "risk", "heartage", "bmiwaist"]);

// In-page fitter: shrinks [data-fit="max,min,maxLines"] elements until they fit their
// line budget and their box ([data-fit-box] or .frame) stops overflowing.
const FIT_SCRIPT = `
    <script>
      window.__fit = function () {
        var out = [];
        var els = document.querySelectorAll("[data-fit]");
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          var spec = el.getAttribute("data-fit").split(",").map(Number);
          var max = spec[0], min = spec[1], maxLines = spec[2] || 4;
          var box = el.closest("[data-fit-box]") || document.querySelector(".frame");
          var size = max, lines = 0;
          for (;;) {
            el.style.fontSize = size + "px";
            var lh = parseFloat(getComputedStyle(el).lineHeight);
            lines = Math.round(el.getBoundingClientRect().height / lh);
            var ok =
              lines <= maxLines &&
              box.scrollHeight <= box.clientHeight + 1 &&
              el.scrollWidth <= el.clientWidth + 1;
            if (ok || size <= min) break;
            size -= 2;
          }
          el.setAttribute("data-fit-size", String(size));
          el.setAttribute("data-fit-lines", String(lines));
          out.push({ el: el.className || el.tagName.toLowerCase(), size: size, lines: lines, overflow: box.scrollHeight > box.clientHeight + 1 });
        }
        return out;
      };
      document.fonts.ready.then(function () { window.__fit(); });
    </script>`;

function fill(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    data[key] === undefined || data[key] === null ? "" : String(data[key]),
  );
}

const varsToStyle = (obj) =>
  Object.entries(obj)
    .filter(([k]) => k.startsWith("--"))
    .map(([k, v]) => `${k}:${v}`)
    .join(";");

// ---------------------------------------------------------------------------
// Build one HTML source
// ---------------------------------------------------------------------------
function buildHtml(c, sizeKey, templates, baseCss) {
  const size = SIZES[sizeKey];
  const common = {
    size: sizeKey,
    baseCss,
    fitScript: FIT_SCRIPT,
    title: `BetterHealth Africa ${c.id} ${sizeKey}`,
  };
  const baseVars = { "--W": `${size.w}px`, "--H": `${size.h}px`, ...size.vars };

  if (c.mode === "P-CARD") {
    return fill(templates["p-card"], {
      ...common,
      sizeVars: varsToStyle(baseVars),
      badge: esc(c.badge || DEFAULT_BADGE),
      eyebrow: esc(c.eyebrow),
      headline: statementHtml(c.headline),
      subline: c.subline ? `<div class="subline">${esc(c.subline)}</div>` : "",
      tests: listItems(c.tests),
      price: esc(c.price),
      turnaround: esc(c.turnaround),
    });
  }

  if (c.mode === "G-CARD") {
    const isTool = TOOL_MOCKS.has(c.mock);
    const badge = c.badge || "Free guide";
    return fill(templates["g-card"], {
      ...common,
      sizeVars: varsToStyle(baseVars),
      badge: esc(badge),
      button: esc(c.button || "Get it free"),
      bar: esc(c.bar || "Yours on WhatsApp in 30 seconds. No sales call."),
      headline: statementHtml(c.headline),
      bullets: listItems(c.bullets),
      mockClass: isTool ? " tool" : "",
      mockTag: esc(c.mockTag || badge),
      mockFoot: isTool ? "Free tool" : "Page 1",
      mockTitle: esc(c.headline),
      mock: MOCKS[c.mock](),
    });
  }

  // P-STATE / G-STATE share the hero template.
  const heroVars = c.photo ? size.heroPhoto : size.hero;
  return fill(templates.hero, {
    ...common,
    mode: c.mode.toLowerCase(),
    photo: c.photo ? "1" : "0",
    sizeVars: varsToStyle({ ...baseVars, ...heroVars }),
    photoEl: c.photo ? '      <div class="photo" aria-hidden="true"></div>' : "",
    statement: statementHtml(c.statement),
    statementFit: heroVars.statementFit,
    sub: c.sub ? `        <div class="sub">${esc(c.sub)}</div>` : "",
    source: c.source ? `        <div class="source">${esc(c.source)}</div>` : "",
    chips: chipsHtml(c.chips),
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const argVal = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};
const only = argVal("--only")?.split(",").map((s) => s.trim()).filter(Boolean);
const sizeFilter = argVal("--size");
const htmlOnly = args.includes("--html-only");

const sizeKeys = Object.keys(SIZES).filter((k) => !sizeFilter || k === sizeFilter);
const selected = CREATIVES.filter((c) => !only || only.includes(c.id));
if (only) {
  const missing = only.filter((id) => !CREATIVES.some((c) => c.id === id));
  if (missing.length) throw new Error(`Unknown ids: ${missing.join(", ")}`);
}
if (sizeFilter && !SIZES[sizeFilter]) throw new Error(`Unknown size: ${sizeFilter}`);

const baseCss = await readFile(path.join(HERE, "templates/base.css"), "utf8");
const templates = {};
for (const name of ["p-card", "g-card", "hero"]) {
  templates[name] = await readFile(path.join(HERE, `templates/${name}.html`), "utf8");
}

await mkdir(SRC_DIR, { recursive: true });
for (const s of sizeKeys) await mkdir(SIZES[s].outDir, { recursive: true });

const jobs = [];
for (const c of selected) {
  for (const sizeKey of sizeKeys) {
    const html = buildHtml(c, sizeKey, templates, baseCss);
    const srcPath = path.join(SRC_DIR, `${c.id}-${sizeKey}.html`);
    await writeFile(srcPath, html, "utf8");
    jobs.push({ c, sizeKey, srcPath });
  }
}
console.log(`Wrote ${jobs.length} HTML sources to ${path.relative(REPO, SRC_DIR)}/`);

if (htmlOnly) process.exit(0);

const { default: puppeteer } = await import(pathToFileURL(PUPPETEER).href);
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const rm = async (p) => {
  try {
    await unlink(p);
  } catch {}
};

const manifest = [];
try {
  const page = await browser.newPage();
  for (const job of jobs) {
    const size = SIZES[job.sizeKey];
    await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(job.srcPath).href, { waitUntil: "networkidle0" });
    const fit = await page.evaluate(async () => {
      await document.fonts.ready;
      return typeof window.__fit === "function" ? window.__fit() : [];
    });

    const base = path.join(size.outDir, `${job.c.id}-${job.sizeKey}`);
    const pngPath = `${base}.png`;
    const jpgPath = `${base}.jpg`;
    let outPath;
    if (job.c.photo) {
      await page.screenshot({ path: jpgPath, type: "jpeg", quality: JPEG_QUALITY });
      await rm(pngPath);
      outPath = jpgPath;
    } else {
      await page.screenshot({ path: pngPath, type: "png" });
      const { size: bytes } = await stat(pngPath);
      if (bytes > MAX_BYTES) {
        await page.screenshot({ path: jpgPath, type: "jpeg", quality: JPEG_QUALITY });
        await rm(pngPath);
        outPath = jpgPath;
      } else {
        await rm(jpgPath);
        outPath = pngPath;
      }
    }
    const { size: bytes } = await stat(outPath);
    const kb = Math.round(bytes / 1024);
    const fitNote = fit
      .map((f) => `${f.el}@${f.size}px/${f.lines}l${f.overflow ? " OVERFLOW" : ""}`)
      .join(" ");
    const flag = bytes > MAX_BYTES ? "  !! OVER 600 KB" : "";
    console.log(
      `${job.c.id.padEnd(28)} ${job.sizeKey.padEnd(5)} ${path.relative(REPO, outPath).padEnd(62)} ${String(kb).padStart(4)} KB  ${fitNote}${flag}`,
    );
    manifest.push({
      id: job.c.id,
      mode: job.c.mode,
      size: job.sizeKey,
      file: path.relative(REPO, outPath),
      kb,
      fit,
    });
  }
} finally {
  await browser.close();
}

const manifestPath = path.join(HERE, "manifest.json");
let previous = [];
try {
  previous = JSON.parse(await readFile(manifestPath, "utf8"));
} catch {}
const key = (m) => `${m.id}:${m.size}`;
const fresh = new Set(manifest.map(key));
const merged = [...previous.filter((m) => !fresh.has(key(m))), ...manifest];
const order = new Map(CREATIVES.map((c, i) => [c.id, i]));
merged.sort((a, b) => order.get(a.id) - order.get(b.id) || a.size.localeCompare(b.size));
await writeFile(manifestPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
console.log(`Rendered ${manifest.length} files. Manifest: ${path.relative(REPO, path.join(HERE, "manifest.json"))}`);

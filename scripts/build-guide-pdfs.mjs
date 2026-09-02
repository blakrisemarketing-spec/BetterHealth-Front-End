#!/usr/bin/env node
// Renders every `kind: "guide"` entry in src/data/guides to
// public/guides/<slug>.pdf (A4, print stylesheet, Quicksand, cream header
// band with the logo, footer with the disclaimer and page numbers).
//
//   node scripts/build-guide-pdfs.mjs            # all guides
//   node scripts/build-guide-pdfs.mjs blood-sugar-log home-blood-pressure-guide
//
// Uses puppeteer-core from a sibling checkout (BetterHealth-Media) so this
// repo's package.json stays dependency-free. Override the locations with
// PUPPETEER_CORE_PATH and CHROME_PATH. Each guide has a target page count; if
// a render overshoots, the type scale is nudged down and the guide re-rendered
// so a small copy edit never silently turns a 2-page guide into 3.

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { GUIDES, GUIDE_DISCLAIMER } from "../src/data/guides/index.js";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "guides");

const PUPPETEER_CORE_PATH =
  process.env.PUPPETEER_CORE_PATH ||
  "/Users/greatdamzi/Documents/01. GitHub/BetterHealth-Media/node_modules/puppeteer-core";
const CHROME_PATH =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Font preference, in order:
//   1. the static Quicksand instances (Regular / SemiBold / Bold). Chrome
//      embeds these as small TrueType subsets; from the *variable* font it
//      emits Type 3 outline fonts instead, which made a 2-page PDF ~560 KB.
//   2. the variable font (real bold, bigger file),
//   3. the Light-only woff2 shipped in public/fonts, then system-ui.
const QUICKSAND_DIR =
  process.env.QUICKSAND_DIR ||
  "/Users/greatdamzi/Documents/01. GitHub/BetterHealth-Media/Brand/Fonts/Quicksand";
const FONT_SETS = [
  [
    { file: path.join(QUICKSAND_DIR, "static/Quicksand-Regular.ttf"), format: "truetype", weight: "400" },
    { file: path.join(QUICKSAND_DIR, "static/Quicksand-SemiBold.ttf"), format: "truetype", weight: "600" },
    { file: path.join(QUICKSAND_DIR, "static/Quicksand-Bold.ttf"), format: "truetype", weight: "700" },
  ],
  [
    {
      file: process.env.QUICKSAND_TTF || path.join(QUICKSAND_DIR, "Quicksand-VariableFont_wght.ttf"),
      format: "truetype",
      weight: "300 700",
    },
  ],
  [{ file: path.join(ROOT, "public/fonts/Quicksand.woff2"), format: "woff2", weight: "300" }],
];
const LOGO_PATH = path.join(ROOT, "src/assets/logo.png");

// Target page counts per guide (the brief) and layout hints. `floatTables`
// puts each numbered section's reference table beside its text so eight
// bands use the page width; `weeksPerRow` lays the log weeks side by side.
// `minScale` is the readability floor: below it the script stops shrinking
// and reports the overshoot instead of shipping unreadable type.
const LAYOUT = {
  "know-your-numbers": { pages: 3, floatTables: true, scale: 0.86, minScale: 0.78 },
  "family-health-map": { pages: 2, scale: 0.94, minScale: 0.8 },
  "blood-sugar-log": { pages: 4, scale: 1, weeksPerRow: 2, minScale: 0.85 },
  "home-blood-pressure-guide": { pages: 2, scale: 1, minScale: 0.85 },
  "read-your-results": { pages: 3, scale: 0.94, minScale: 0.8 },
};

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function loadFontFace() {
  for (const set of FONT_SETS) {
    if (!set.every((c) => fs.existsSync(c.file))) continue;
    return set
      .map((c) => {
        const b64 = fs.readFileSync(c.file).toString("base64");
        const mime = c.format === "woff2" ? "font/woff2" : "font/ttf";
        return `@font-face { font-family: "Quicksand"; src: url(data:${mime};base64,${b64}) format("${c.format}"); font-weight: ${c.weight}; font-style: normal; }`;
      })
      .join("\n");
  }
  console.warn("Quicksand not found; falling back to system fonts");
  return "";
}

function loadLogo() {
  if (!fs.existsSync(LOGO_PATH)) return "";
  return `data:image/png;base64,${fs.readFileSync(LOGO_PATH).toString("base64")}`;
}

function renderTable(t) {
  const fill = t.fillIn ? " fill" : "";
  const head = t.headers.map((h) => `<th>${esc(h)}</th>`).join("");
  const body = t.rows
    .map(
      (r) =>
        `<tr>${r
          .map((c, i) => `<td class="${i === 0 ? "first" : ""}">${esc(c)}</td>`)
          .join("")}</tr>`,
    )
    .join("");
  return `<table class="tbl${fill}">${
    t.caption ? `<caption>${esc(t.caption)}</caption>` : ""
  }<thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderSection(s, opts = {}) {
  const tables = s.tables || (s.table ? [s.table] : []);
  const list = s.list
    ? `<${s.ordered ? "ol" : "ul"}>${s.list.map((i) => `<li>${esc(i)}</li>`).join("")}</${s.ordered ? "ol" : "ul"}>`
    : "";
  const tablesHtml =
    tables.length > 1 && opts.weeksPerRow
      ? `<div class="weeks cols-${opts.weeksPerRow}">${tables.map(renderTable).join("")}</div>`
      : tables.map(renderTable).join("");
  return `<section class="sec${opts.floatTable ? " float-table" : ""}">
    <h2>${esc(s.heading)}</h2>
    ${(s.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("")}
    ${tablesHtml}
    ${list}
    ${(s.after || []).map((p) => `<p>${esc(p)}</p>`).join("")}
    ${s.callout ? `<div class="callout">${esc(s.callout)}</div>` : ""}
  </section>`;
}

function buildHtml(guide, layout, scale, fontFace, logo) {
  // Chrome will not fragment a CSS grid or a flex row across a page break, so
  // two-column card layouts either jump wholesale to the next page or leave
  // the space under the shorter card empty. A floated table inside a normal
  // block fragments cleanly, so that is how the numbered sections are set.
  const numbered = (s) => /^\d+\./.test(s.heading);
  const body = guide.sections
    .map((s) =>
      renderSection(s, {
        floatTable: Boolean(layout.floatTables && numbered(s)),
        weeksPerRow: layout.weeksPerRow,
      }),
    )
    .join("");

  const sources = guide.sources?.length
    ? `<section class="sec sources"><h2>Sources</h2><ul>${guide.sources
        .map((s) => `<li>${esc(s.label)}${s.url ? ` <span class="url">betterhealth.africa${esc(s.url)}</span>` : ""}</li>`)
        .join("")}</ul></section>`
    : "";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(guide.title)}</title>
<style>
${fontFace}
:root { --ink:#2B3A3A; --muted:#6B7979; --faint:#9CA3AF; --primary:#6B8E7F; --primary-dark:#5F8070; --cream:#F5F3EE; --alt:#EBE9E3; --border:#E0DCD5; }
/* No @page margin here: a CSS page margin overrides the margins passed to
   page.pdf(), and the header/footer templates then print on top of the body. */
@page { size: A4; }
* { box-sizing: border-box; }
html { font-size: ${(10.5 * scale).toFixed(2)}pt; }
body { margin: 0; font-family: "Quicksand", system-ui, -apple-system, "Segoe UI", sans-serif; color: var(--ink); line-height: 1.45; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.cover { background: var(--cream); border-radius: 10px; padding: 11px 16px 12px; margin: 0 0 12px; break-inside: avoid; }
.cover .eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--primary); margin: 0 0 4px; }
.cover h1 { font-size: 1.95rem; line-height: 1.1; margin: 0 0 6px; font-weight: 700; letter-spacing: -0.01em; }
.cover .promise { font-size: 0.98rem; color: var(--muted); margin: 0 0 8px; }
.cover .meta { font-size: 0.72rem; color: var(--muted); }
.cover .chip { display: inline-block; background: #fff; border: 1px solid var(--border); border-radius: 999px; padding: 2px 9px; font-weight: 600; color: var(--muted); margin-right: 6px; }
.sec { margin: 0 0 10px; }
.sec h2 { font-size: 1.15rem; font-weight: 700; margin: 0 0 5px; color: var(--ink); break-after: avoid; letter-spacing: -0.01em; }
.sec p { margin: 0 0 6px; color: var(--ink); }
.sec ul, .sec ol { margin: 0 0 6px; padding-left: 1.2em; }
.sec li { margin: 0 0 3px; }
.callout { border-left: 3px solid var(--primary); background: rgba(107,142,127,0.10); padding: 7px 10px; border-radius: 0 6px 6px 0; margin: 6px 0 6px; font-size: 0.93rem; break-inside: avoid; }
.float-table { border-top: 1px solid var(--border); padding-top: 4px; }
.float-table::after { content: ""; display: block; clear: both; }
.float-table .tbl { float: right; width: 47%; margin: 0 0 6px 12px; break-inside: avoid; page-break-inside: avoid; font-size: 0.84rem; }
.float-table .tbl th, .float-table .tbl td { padding: 2px 5px; }
.float-table p, .float-table .callout { font-size: 0.95rem; }
.float-table .callout { clear: none; }
.tbl { width: 100%; border-collapse: collapse; margin: 4px 0 8px; font-size: 0.88rem; }
.tbl caption { caption-side: top; text-align: left; font-weight: 700; color: var(--muted); font-size: 0.78rem; padding: 0 0 3px; }
.tbl th, .tbl td { border: 1px solid var(--border); padding: 3px 6px; text-align: left; vertical-align: top; }
.tbl th { background: var(--alt); font-weight: 700; font-size: 0.8rem; }
.tbl td.first { font-weight: 600; }
.tbl tr { break-inside: avoid; page-break-inside: avoid; }
.tbl thead { display: table-header-group; }
.tbl.fill td { height: 8.2mm; }
.tbl.fill td:not(.first) { background: #fff; }
.weeks { display: grid; grid-template-columns: 1fr; gap: 6px 14px; }
.weeks.cols-2 { grid-template-columns: 1fr 1fr; }
.weeks .tbl { break-inside: avoid; margin: 0 0 4px; }
.weeks .tbl.fill td { height: 8.6mm; font-size: 0.82rem; padding: 2px 5px; }
.weeks .tbl th { font-size: 0.74rem; padding: 2px 5px; }
.sources { margin-top: 6px; padding-top: 6px; border-top: 1px solid var(--border); }
.sources h2 { font-size: 0.95rem; }
.sources ul { columns: 3; column-gap: 16px; font-size: 0.74rem; color: var(--muted); padding-left: 1.1em; }
.sources li { break-inside: avoid; margin-bottom: 2px; }
.sources .url { color: var(--faint); }
</style></head>
<body>
<div class="cover">
  <p class="eyebrow">${esc(guide.eyebrow)} · BetterHealth Africa</p>
  <h1>${esc(guide.title)}</h1>
  <p class="promise">${esc(guide.promise)}</p>
  <p class="meta"><span class="chip">${esc(guide.format)}</span> Written by the BetterHealth Africa editorial team. Reviewed against WHO / ADA / AHA thresholds.</p>
</div>
${body}
${sources}
</body></html>`;
}

function headerTemplate(guide, logo) {
  return `<div style="width:100%; margin:0 13mm; padding:6px 0 5px; border-bottom:1px solid #E0DCD5; display:flex; align-items:center; justify-content:space-between; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; font-size:8px; color:#6B7979; -webkit-print-color-adjust:exact;">
    ${logo ? `<img src="${logo}" style="height:16px;" />` : `<span style="font-weight:700;color:#6B8E7F">BetterHealth Africa</span>`}
    <span style="font-weight:600;">${esc(guide.shortTitle)}</span>
  </div>`;
}

function footerTemplate() {
  return `<div style="width:100%; margin:0 13mm; padding:4px 0 0; border-top:1px solid #E0DCD5; display:flex; align-items:center; justify-content:space-between; font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; font-size:7.5px; color:#6B7979; -webkit-print-color-adjust:exact;">
    <span style="font-style:italic;">${esc(GUIDE_DISCLAIMER)} betterhealth.africa/guides</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;
}

function pageCount(file) {
  try {
    const out = execFileSync("pdfinfo", [file], { encoding: "utf8" });
    const m = out.match(/Pages:\s+(\d+)/);
    if (m) return Number(m[1]);
  } catch {
    // pdfinfo missing: fall back to counting page objects in the file.
  }
  const buf = fs.readFileSync(file, "latin1");
  return (buf.match(/\/Type\s*\/Page[^s]/g) || []).length;
}

async function renderGuide(browser, guide, fontFace, logo) {
  const layout = LAYOUT[guide.slug] || { pages: 4, scale: 1, minScale: 0.8 };
  const out = path.join(OUT_DIR, `${guide.slug}.pdf`);
  let scale = layout.scale ?? 1;
  const minScale = layout.minScale ?? 0.8;

  for (let attempt = 0; attempt < 8; attempt++) {
    const page = await browser.newPage();
    await page.setContent(buildHtml(guide, layout, scale, fontFace, logo), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate(guide, logo),
      footerTemplate: footerTemplate(),
      margin: { top: "15mm", bottom: "13mm", left: "13mm", right: "13mm" },
    });
    await page.close();

    const pages = pageCount(out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    if (pages <= layout.pages) {
      console.log(`  ${guide.slug}.pdf  ${pages} page(s)  ${kb} KB  (scale ${scale.toFixed(2)})`);
      return { pages, kb, scale };
    }
    const next = scale * 0.95;
    if (next < minScale) {
      console.warn(
        `  ${guide.slug}.pdf  ${pages} page(s)  ${kb} KB  (scale ${scale.toFixed(2)}): over the ${layout.pages}-page target at the readability floor; trim copy or raise the target`,
      );
      return { pages, kb, scale, over: true };
    }
    console.log(`  ${guide.slug}: ${pages} pages > target ${layout.pages}, shrinking type (scale ${scale.toFixed(2)} -> ${next.toFixed(2)})`);
    scale = next;
  }
  return null;
}

async function main() {
  const only = process.argv.slice(2);
  const guides = GUIDES.filter((g) => g.kind === "guide" && (only.length === 0 || only.includes(g.slug)));
  if (guides.length === 0) {
    console.error("No matching guides. Known:", GUIDES.filter((g) => g.kind === "guide").map((g) => g.slug).join(", "));
    process.exit(1);
  }
  if (!fs.existsSync(CHROME_PATH)) {
    console.error(`Chrome not found at ${CHROME_PATH} (set CHROME_PATH)`);
    process.exit(1);
  }

  const puppeteer = require(PUPPETEER_CORE_PATH);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const fontFace = loadFontFace();
  const logo = loadLogo();

  const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
  try {
    console.log(`Building ${guides.length} guide PDF(s) into public/guides/`);
    for (const g of guides) await renderGuide(browser, g, fontFace, logo);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

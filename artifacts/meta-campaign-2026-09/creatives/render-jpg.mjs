#!/usr/bin/env node
/**
 * JPEG sibling of the BetterHealth-Media renderer.
 *
 *   node render-jpg.mjs <abs-input-html> <abs-output-jpg> [width=1080] [height=1350] [quality=88]
 *
 * Screenshots the viewport as JPEG (quality 88 by default). Used for the photo-background
 * creatives and for any flat render that lands over the 600 KB Meta budget as a PNG.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const MEDIA = "/Users/greatdamzi/Documents/01. GitHub/BetterHealth-Media";
const PUPPETEER = path.join(
  MEDIA,
  "node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js",
);
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const [, , inputArg, outputArg, widthArg, heightArg, qualityArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error(
    "Usage: node render-jpg.mjs <input-html> <output-jpg> [width] [height] [quality]",
  );
  process.exit(1);
}

const inputPath = path.resolve(process.cwd(), inputArg);
const outputPath = path.resolve(process.cwd(), outputArg);
const width = Number.parseInt(widthArg || "1080", 10);
const height = Number.parseInt(heightArg || "1350", 10);
const quality = Number.parseInt(qualityArg || "88", 10);

const { default: puppeteer } = await import(pathToFileURL(PUPPETEER).href);

await mkdir(path.dirname(outputPath), { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(inputPath).href, { waitUntil: "networkidle0" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    if (typeof window.__fit === "function") window.__fit();
  });
  await page.screenshot({
    path: outputPath,
    type: "jpeg",
    quality,
    fullPage: false,
  });
  console.log(outputPath);
} finally {
  await browser.close();
}

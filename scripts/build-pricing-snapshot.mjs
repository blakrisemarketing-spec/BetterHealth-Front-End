#!/usr/bin/env node
// Nightly price-snapshot builder. Fetches the App's public catalogue and writes
// a normalised price cache to src/data/pricing-snapshot.json, which the frontend
// bakes into the bundle (src/lib/pricing-catalogue.js) for instant first-paint
// prices with no runtime API round-trip.
//
//   node scripts/build-pricing-snapshot.mjs [--country=Ghana]
//
// Run nightly by .github/workflows/refresh-prices.yml. On API failure it exits
// non-zero WITHOUT touching the existing file, so a backend outage never wipes
// good prices (same philosophy as scripts/sync-app-catalogue.mjs). Output is
// key-sorted and timestamp-free, so unchanged prices produce a byte-identical
// file and the job commits (and redeploys) only when a price actually changes.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  normalisePanelPrices,
  normaliseTestPrices,
} from "../src/lib/pricing-normalize.js";

const country = (
  process.argv.find((a) => a.startsWith("--country=")) || "--country=Ghana"
).split("=")[1];
const BASE = (
  process.env.VITE_PUBLIC_CATALOGUE_API_BASE ||
  "https://app.betterhealth.africa/api/public"
).replace(/\/$/, "");
const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/data/pricing-snapshot.json",
);

async function getJson(path) {
  const res = await fetch(`${BASE}/${path}?country=${encodeURIComponent(country)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
  return res.json();
}

// Stable, recursive key ordering so the serialised output is deterministic
// regardless of the order the API returns panels/tests in.
function sortKeys(_key, value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.fromEntries(
      Object.entries(value).sort(([a], [b]) => a.localeCompare(b)),
    );
  }
  return value;
}

async function main() {
  let panelsData, testsData;
  try {
    [panelsData, testsData] = await Promise.all([
      getJson("disease-panels"),
      getJson("diagnostic-tests"),
    ]);
  } catch (err) {
    console.error(`✖ Catalogue not reachable: ${err.message}`);
    console.error("  Existing src/data/pricing-snapshot.json left untouched.");
    process.exit(1);
  }

  const panelsByCode = normalisePanelPrices(panelsData);
  const testsByCode = normaliseTestPrices(testsData);

  if (!Object.keys(panelsByCode).length && !Object.keys(testsByCode).length) {
    console.error("✖ Catalogue returned no usable prices — leaving snapshot untouched.");
    process.exit(1);
  }

  const serialised = JSON.stringify({ panelsByCode, testsByCode }, sortKeys, 2) + "\n";

  let current = "";
  try {
    current = readFileSync(OUT, "utf8");
  } catch {
    // First run — file does not exist yet.
  }

  if (current === serialised) {
    console.log("✔ Prices unchanged — snapshot already up to date.");
    return;
  }

  writeFileSync(OUT, serialised);
  console.log(
    `✔ Wrote ${Object.keys(panelsByCode).length} panel + ${Object.keys(testsByCode).length} test prices to src/data/pricing-snapshot.json`,
  );
}

main();

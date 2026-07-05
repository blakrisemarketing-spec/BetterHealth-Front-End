#!/usr/bin/env node
// Verify/refresh the App deep-link codes in src/data/app-catalogue.js against
// the App's live public catalogue. Run manually — it is NOT part of the build,
// so the build never depends on the App being reachable.
//
//   node scripts/sync-app-catalogue.mjs [--country=Ghana]
//
// Exits non-zero if the catalogue is unreachable or drift is detected, so it can
// gate a periodic CI check once the endpoints are live.

import { PANEL_CODES, SINGLE_TEST_CODES } from "../src/data/app-catalogue.js";

const country =
  (process.argv.find((a) => a.startsWith("--country=")) || "--country=Ghana").split("=")[1];
const BASE = "https://app.betterhealth.africa/api/public";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function main() {
  let panelsData, testsData;
  try {
    [panelsData, testsData] = await Promise.all([
      getJson(`${BASE}/disease-panels?country=${encodeURIComponent(country)}`),
      getJson(`${BASE}/diagnostic-tests?country=${encodeURIComponent(country)}`),
    ]);
  } catch (err) {
    console.error(`✖ Catalogue not reachable yet: ${err.message}`);
    console.error("  (As of 2026-07-05 these endpoints return 404. Re-run once the App team deploys them.)");
    process.exit(1);
  }

  const upstreamPanels = new Set(
    (panelsData.panels || []).map((p) => String(p.panelCode).toLowerCase()),
  );
  const upstreamTests = new Set(
    (testsData.categories || []).flatMap((c) =>
      (c.tests || []).map((t) => String(t.code).toUpperCase()),
    ),
  );

  let problems = 0;

  for (const code of Object.values(PANEL_CODES)) {
    if (!upstreamPanels.has(String(code).toLowerCase())) {
      console.warn(`⚠ panel code not in catalogue: ${code}`);
      problems++;
    }
  }
  for (const [slug, code] of Object.entries(SINGLE_TEST_CODES)) {
    if (code && !upstreamTests.has(String(code).toUpperCase())) {
      console.warn(`⚠ test code not in catalogue: ${slug} → ${code}`);
      problems++;
    }
  }

  const missing = Object.entries(SINGLE_TEST_CODES)
    .filter(([, c]) => !c)
    .map(([s]) => s);
  if (missing.length) {
    console.log(`ℹ ${missing.length} single test(s) still need a code: ${missing.join(", ")}`);
    console.log(`  Upstream test codes (${upstreamTests.size}): ${[...upstreamTests].sort().join(", ")}`);
  }

  console.log(
    `\n${problems ? "✖" : "✔"} ${upstreamPanels.size} panels, ${upstreamTests.size} tests upstream. ${problems} drift issue(s).`,
  );
  process.exit(problems ? 1 : 0);
}

main();

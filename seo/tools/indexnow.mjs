#!/usr/bin/env node
// IndexNow submitter — headless, zero deps. Pings the IndexNow aggregator so
// Bing, Yandex, Seznam, Naver and Yep re-crawl changed URLs within minutes
// instead of waiting on organic discovery. Bing's index also feeds ChatGPT and
// Copilot, so this is a GEO signal too. (Google does not participate in
// IndexNow; it discovers via the sitemap + crawl.)
//
// Key ownership is proven by a key file served at the site root:
//   https://www.betterhealth.africa/<key>.txt   (contents === <key>)
// This script auto-discovers that file under public/, so the key never drifts.
//
// Usage:
//   node seo/tools/indexnow.mjs                       submit every sitemap URL
//   node seo/tools/indexnow.mjs <url> [<url> ...]     submit specific URLs (nightly: just the new posts)
//   node seo/tools/indexnow.mjs --dry-run [urls...]   print the payload, don't send
//
// Exit code is non-zero on failure so CI / the nightly routine can gate on it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOST = "www.betterhealth.africa";
const SITE_URL = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Find the IndexNow key file: a public/*.txt whose basename equals its contents.
function findKey() {
  const publicDir = path.join(root, "public");
  for (const name of fs.readdirSync(publicDir)) {
    if (!name.endsWith(".txt")) continue;
    const base = name.slice(0, -4);
    if (!/^[a-zA-Z0-9-]{8,128}$/.test(base)) continue;
    const contents = fs.readFileSync(path.join(publicDir, name), "utf8").trim();
    if (contents === base) return base;
  }
  console.error(
    "[indexnow] No key file found. Expected public/<key>.txt whose contents equal <key>."
  );
  process.exit(1);
}

// All URLs from the live sitemap (always current — no local build needed).
async function sitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) {
    console.error(`[indexnow] Could not fetch sitemap: HTTP ${res.status}`);
    process.exit(1);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const urlArgs = args.filter((a) => !a.startsWith("--"));

  const key = findKey();
  const urlList = urlArgs.length ? urlArgs : await sitemapUrls();

  // IndexNow rejects the whole batch if any URL is off-host.
  const offHost = urlList.filter((u) => {
    try {
      return new URL(u).host !== HOST;
    } catch {
      return true;
    }
  });
  if (offHost.length) {
    console.error(`[indexnow] Refusing: ${offHost.length} URL(s) not on ${HOST}:`);
    offHost.forEach((u) => console.error(`  ${u}`));
    process.exit(1);
  }
  if (!urlList.length) {
    console.error("[indexnow] No URLs to submit.");
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList,
  };

  console.log(`[indexnow] ${urlList.length} URL(s), key ${key.slice(0, 6)}…`);
  urlList.forEach((u) => console.log(`  ${u}`));

  if (dryRun) {
    console.log("[indexnow] --dry-run: not submitting.");
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  // IndexNow returns 200 (accepted) or 202 (accepted, pending validation).
  if (res.status === 200 || res.status === 202) {
    console.log(`[indexnow] OK — HTTP ${res.status} (${res.statusText || "accepted"}).`);
  } else {
    console.error(`[indexnow] FAILED — HTTP ${res.status}. ${body}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`[indexnow] ${err.message}`);
  process.exit(1);
});

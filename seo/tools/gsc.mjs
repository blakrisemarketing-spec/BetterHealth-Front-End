#!/usr/bin/env node
// Google Search Console (Search Analytics API) wrapper — headless, zero deps.
// Uses a SERVICE ACCOUNT (not interactive OAuth) so it runs in a cron/cloud agent:
// it mints an RS256 JWT with Node's built-in crypto, exchanges it for an access
// token, and queries the Search Analytics API. Grant the service account
// "read" access to the GSC property first.
//
// Env:
//   GSC_SERVICE_ACCOUNT_JSON  the service-account key, in ANY of three forms:
//                               1. base64 of the JSON  (RECOMMENDED for env vars —
//                                  single line, nothing for the UI to truncate/mangle)
//                               2. inline raw JSON      (must be single-line/minified;
//                                  pretty-printed JSON breaks single-line env fields)
//                               3. a filesystem path to the JSON key file (local runs)
//   GSC_SITE_URL              the GSC property, e.g. "https://www.betterhealth.africa/"
//                             or domain property "sc-domain:betterhealth.africa"
//
// Usage:
//   node seo/tools/gsc.mjs queries [days]        # top queries (default 28 days)
//   node seo/tools/gsc.mjs pages   [days]        # top pages
//   node seo/tools/gsc.mjs sitemap-status        # list submitted sitemaps + their status
//   node seo/tools/gsc.mjs sitemap-submit <path> # submit a sitemap, e.g. "sitemap.xml"
//   node seo/tools/gsc.mjs inspect <url>         # URL Inspection: index status for one URL

import crypto from "node:crypto";
import fs from "node:fs";

const KEY = process.env.GSC_SERVICE_ACCOUNT_JSON;
const SITE = process.env.GSC_SITE_URL;
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE_READONLY = "https://www.googleapis.com/auth/webmasters.readonly";
const SCOPE_FULL = "https://www.googleapis.com/auth/webmasters";

function requireConfig() {
  if (!KEY || !SITE) {
    console.error(
      "[gsc] Missing config. Set GSC_SERVICE_ACCOUNT_JSON (key file path or inline JSON)\n" +
        "and GSC_SITE_URL (the property). See seo/tools/README.md and .env.example."
    );
    process.exit(1);
  }
}

// Accept the service account in three shapes so it survives env-var UIs that
// mangle multi-line values: inline JSON, base64-of-JSON, or a key-file path.
function loadServiceAccount() {
  const v = KEY.trim();

  // 1. Inline JSON (raw). Pretty-printed JSON only reaches here intact on local
  //    runs; in env vars it must be minified to a single line.
  if (v.startsWith("{")) return parseOrDie(v, "inline JSON");

  // 2. Base64 of the JSON. The robust env-var form: only [A-Za-z0-9+/=], so a
  //    single-line field cannot truncate or re-quote it. Detect by charset and
  //    confirm it decodes to a JSON object before committing to this branch.
  if (/^[A-Za-z0-9+/=\s]+$/.test(v)) {
    const decoded = Buffer.from(v, "base64").toString("utf8").trim();
    if (decoded.startsWith("{")) return parseOrDie(decoded, "base64-encoded JSON");
  }

  // 3. Path to a key file (local/manual runs).
  let fileContents;
  try {
    fileContents = fs.readFileSync(v, "utf8");
  } catch {
    console.error(
      "[gsc] GSC_SERVICE_ACCOUNT_JSON is set but is not valid inline JSON, not valid\n" +
        "base64-of-JSON, and not a readable file path. If you pasted the key into an\n" +
        "env var, base64-encode it first: base64 -i key.json | tr -d '\\n'\n" +
        "(pretty-printed multi-line JSON gets truncated by single-line env fields)."
    );
    process.exit(1);
  }
  return parseOrDie(fileContents, "key file");
}

function parseOrDie(raw, source) {
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`[gsc] GSC_SERVICE_ACCOUNT_JSON (${source}) is not valid JSON: ${e.message}`);
    process.exit(1);
  }
}

const b64url = (input) =>
  Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

async function getAccessToken(sa, scope) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(sa.private_key).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const assertion = `${header}.${claim}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    console.error(`[gsc] Token exchange failed: HTTP ${res.status}`);
    process.exit(1);
  }
  return (await res.json()).access_token;
}

function dateRange(days) {
  const d = new Date();
  const end = new Date(d.getTime() - 2 * 86400000); // GSC data lags ~2 days
  const start = new Date(end.getTime() - days * 86400000);
  const iso = (x) => x.toISOString().slice(0, 10);
  return { startDate: iso(start), endDate: iso(end) };
}

async function query(dimension, days) {
  requireConfig();
  const sa = loadServiceAccount();
  const token = await getAccessToken(sa, SCOPE_READONLY);
  const { startDate, endDate } = dateRange(days);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ startDate, endDate, dimensions: [dimension], rowLimit: 100 }),
  });
  if (!res.ok) {
    console.error(`[gsc] Query failed: HTTP ${res.status} — ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  return {
    range: { startDate, endDate },
    rows: (data.rows || []).map((r) => ({
      key: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    })),
  };
}

async function sitemapStatus() {
  requireConfig();
  const sa = loadServiceAccount();
  const token = await getAccessToken(sa, SCOPE_READONLY);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    console.error(`[gsc] Sitemap status failed: HTTP ${res.status} — ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  return {
    sitemaps: (data.sitemap || []).map((s) => ({
      path: s.path,
      lastSubmitted: s.lastSubmitted,
      lastDownloaded: s.lastDownloaded,
      isPending: s.isPending,
      isSitemapsIndex: s.isSitemapsIndex,
      errors: s.errors,
      warnings: s.warnings,
      contents: s.contents,
    })),
  };
}

async function sitemapSubmit(path) {
  requireConfig();
  if (!path) {
    console.error('[gsc] Usage: gsc.mjs sitemap-submit <path>  (e.g. "sitemap.xml")');
    process.exit(1);
  }
  const sa = loadServiceAccount();
  const token = await getAccessToken(sa, SCOPE_FULL);
  // Resolve the sitemap feed URL. A URL-prefix property (https://host/) can serve
  // as the base for a relative path, but a domain property (sc-domain:host) has no
  // scheme to resolve against — `new URL("sitemap.xml", "sc-domain:host")` throws.
  // Accept an already-absolute URL as-is; otherwise derive https://<host>/<path>
  // for a domain property, or resolve against the property URL for a prefix one.
  let feedUrl;
  if (/^https?:\/\//i.test(path)) {
    feedUrl = path;
  } else if (SITE.startsWith("sc-domain:")) {
    feedUrl = new URL(path.replace(/^\//, ""), `https://${SITE.slice("sc-domain:".length)}/`).toString();
  } else {
    feedUrl = new URL(path, SITE).toString();
  }
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/sitemaps/${encodeURIComponent(feedUrl)}`;
  const res = await fetch(url, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    console.error(`[gsc] Sitemap submit failed: HTTP ${res.status} — ${await res.text()}`);
    process.exit(1);
  }
  return { submitted: feedUrl };
}

async function inspect(inspectionUrl) {
  requireConfig();
  if (!inspectionUrl) {
    console.error("[gsc] Usage: gsc.mjs inspect <url>");
    process.exit(1);
  }
  const sa = loadServiceAccount();
  const token = await getAccessToken(sa, SCOPE_READONLY);
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl, siteUrl: SITE }),
  });
  if (!res.ok) {
    console.error(`[gsc] Inspect failed: HTTP ${res.status} — ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  const result = data.inspectionResult?.indexStatusResult || {};
  return {
    url: inspectionUrl,
    verdict: result.verdict,
    coverageState: result.coverageState,
    lastCrawlTime: result.lastCrawlTime,
    pageFetchState: result.pageFetchState,
    indexingState: result.indexingState,
    robotsTxtState: result.robotsTxtState,
    sitemap: result.sitemap,
  };
}

const [cmd, arg] = process.argv.slice(2);

const run = async () => {
  switch (cmd) {
    case "queries":
      return query("query", Number(arg) || 28);
    case "pages":
      return query("page", Number(arg) || 28);
    case "sitemap-status":
      return sitemapStatus();
    case "sitemap-submit":
      return sitemapSubmit(arg);
    case "inspect":
      return inspect(arg);
    default:
      console.error("Usage: gsc.mjs <queries|pages> [days] | sitemap-status | sitemap-submit <path> | inspect <url>");
      process.exit(1);
  }
};
run().then((out) => console.log(JSON.stringify(out, null, 2)));

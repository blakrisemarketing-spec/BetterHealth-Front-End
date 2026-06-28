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
//   node seo/tools/gsc.mjs queries [days]   # top queries (default 28 days)
//   node seo/tools/gsc.mjs pages   [days]   # top pages

import crypto from "node:crypto";
import fs from "node:fs";

const KEY = process.env.GSC_SERVICE_ACCOUNT_JSON;
const SITE = process.env.GSC_SITE_URL;
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

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

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
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
  const token = await getAccessToken(sa);
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

const [cmd, daysArg] = process.argv.slice(2);
const days = Number(daysArg) || 28;
const dimension = cmd === "pages" ? "page" : cmd === "queries" ? "query" : null;
if (!dimension) {
  console.error("Usage: gsc.mjs <queries|pages> [days]");
  process.exit(1);
}
query(dimension, days).then((out) => console.log(JSON.stringify(out, null, 2)));

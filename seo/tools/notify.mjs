#!/usr/bin/env node
// Email a report via Resend — headless, API-key auth, zero dependencies.
// Used by the weekly routine to send the SEO report to the team. BetterHealth
// already uses Resend (betterhealth.africa is a verified sending domain), so this
// reuses that.
//
// Env:
//   RESEND_API_KEY     your Resend API key (required)
//   REPORT_EMAIL_TO    recipient(s), comma-separated (required), e.g. appleworlu@gmail.com
//   REPORT_EMAIL_FROM  sender on a verified Resend domain
//                      (default "BetterHealth SEO <seo@betterhealth.africa>")
//
// Usage:
//   node seo/tools/notify.mjs "<subject>" <path/to/report.md>   # emails the file
//   echo "body" | node seo/tools/notify.mjs "<subject>"          # emails stdin

import fs from "node:fs";

const KEY = process.env.RESEND_API_KEY;
const TO = process.env.REPORT_EMAIL_TO;
const FROM = process.env.REPORT_EMAIL_FROM || "BetterHealth SEO <seo@betterhealth.africa>";

function requireConfig() {
  if (!KEY || !TO) {
    console.error(
      "[notify] Missing config. Set RESEND_API_KEY and REPORT_EMAIL_TO to email the report.\n" +
        "Skipping email (the report is still committed to the PR). See seo/tools/README.md."
    );
    process.exit(1);
  }
}

function readBody(fileArg) {
  if (fileArg) return fs.readFileSync(fileArg, "utf8");
  return fs.readFileSync(0, "utf8"); // stdin
}

async function main() {
  const [subject, fileArg] = process.argv.slice(2);
  if (!subject) {
    console.error('Usage: notify.mjs "<subject>" <path/to/report.md>');
    process.exit(1);
  }
  requireConfig();
  const body = readBody(fileArg).trim();
  if (!body) {
    console.error("[notify] Empty body, nothing to send.");
    process.exit(1);
  }
  // Send as plain text plus a minimal monospace HTML wrapper so it's readable in
  // any client without a markdown renderer.
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `<pre style="font:14px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre-wrap">${esc(body)}</pre>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: TO.split(",").map((s) => s.trim()).filter(Boolean),
      subject,
      text: body,
      html,
    }),
  });
  if (!res.ok) {
    console.error(`[notify] Resend HTTP ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const data = await res.json();
  console.log(`[notify] Sent to ${TO} (id ${data.id || "?"})`);
}

main();

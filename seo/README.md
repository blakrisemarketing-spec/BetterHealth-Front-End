# SEO / GEO Control Plane

This directory is the **control plane** for BetterHealth Africa's SEO & GEO program.
It is the source of truth that the nightly automation reads and writes, so the work
is deterministic, resumable, and auditable through git history.

## Goal

Rank BetterHealth Africa #1 on Google Search and in AI chatbots (ChatGPT,
Perplexity, Google AI Overviews, Bing Copilot) for relevant Ghana health-screening
keywords. See the full plan in the approved program document.

## How it works

```
seo/
  roadmap.yml      # ordered, prioritized content/technical backlog (the "what")
  progress.json    # machine cursor: what's done, last run, open PRs (the "where we are")
  playbook.md      # the nightly procedure in plain English (the "how")
  briefs/          # per-article content briefs (target query, angle, outline)
  reports/         # baseline + weekly analytics/rank/GEO reports
  offsite/         # off-site authority queue (directories, PR angles, outreach)
  tools/           # headless data wrappers (DataForSEO, GSC, Bing) — env-key auth
```

The nightly routine (`.claude/skills/seo-nightly/`) reads `roadmap.yml`, picks the
first `status: todo` item, executes it (usually: publish one article or programmatic
page), flips it to `done`, advances `progress.json`, and opens a PR for human review.

## Single source of truth

New content is added by appending **one** article file under
`src/data/blog/posts/` and **one** line to `src/data/blog/index.js`. Everything else
— the `/blog/<slug>` route, prerendered HTML, Article/Breadcrumb/FAQ schema, the
sitemap entry, `llms.txt`, and the blog index card — is derived automatically at
build time (`vite.config.js`). Build artifacts (`dist/`, `sitemap.xml`, `llms.txt`)
are **never committed**; Hostinger regenerates them on every deploy.

## Data tools (require credentials)

The `tools/*.mjs` wrappers use API-key / service-account auth so they run headless
(no interactive login). They read secrets from environment variables only — never
commit keys. See `.env.example` and `tools/README.md`. Until credentials are
configured, the content pipeline still runs fully; only live rank/traffic data is
gated.

---
name: seo-nightly
description: >
  Execute one cycle of the BetterHealth Africa SEO/GEO program. Use this when
  running the nightly content routine, a scheduled SEO run, or when asked to
  "publish the next SEO article", "run the nightly SEO job", "do the next item on
  the SEO roadmap", or "advance the SEO program". Reads seo/roadmap.yml +
  seo/progress.json, executes the next todo item (usually publishing one
  patients-led article), verifies the build, and opens a PR for review. Composes
  the seo-* skills and enforces the clinical-safety gate. Ghana-first, patients-led.
---

# SEO Nightly Routine

You are advancing BetterHealth Africa toward #1 rankings on Google and AI chatbots
for Ghana health-screening keywords. One invocation = one unit of progress, shipped
as a reviewable PR. Be rigorous: this is a health brand, and every change is public.

Read `seo/playbook.md` and `seo/README.md` first — they are the source of truth.
This skill is the executable checklist.

## Hard rules (never break)

1. **PR for review only.** Never commit to `main`. Open a PR; a human merges.
2. **Clinical-safety gate.** Any health claim, reference range, symptom, or
   treatment statement must pass the `clinical-safety-review` skill before the PR
   opens. Cite an accepted source (WHO/ADA/etc.) for ranges. Always include the
   `disclaimer` block. **Never fabricate** a clinician's name or "medically
   reviewed by" claim — only set `medicallyReviewedBy` if a named advisory-board
   doctor actually signed off.
3. **Build must pass offline.** `npm run build` cannot depend on any API.
4. **Single source of truth.** New content = one file in `src/data/blog/posts/` +
   one line in `src/data/blog/index.js`. Never hand-edit `dist/`, `sitemap.xml`, or
   `llms.txt` — `vite.config.js` generates them.
5. **No secrets in the repo.** Tools read env vars only.

## Procedure

### 1. Sync and branch
- `git fetch origin && git switch -c seo/nightly-$(date +%Y-%m-%d) origin/main`
  (if the branch exists, append a short suffix). Work from latest `main` to keep
  the PR conflict-free.

### 2. Select the task
- Read `seo/progress.json` and `seo/roadmap.yml`.
- Pick the **first** `items` entry with `status: todo`. That is tonight's task.
- If none are `todo`, run the **maintenance pass** (see below) instead.

### 3. Refine the target (skip gracefully if creds absent)
- If DataForSEO creds are set: `node seo/tools/dataforseo.mjs volume "<keyword>"`
  and `... ideas "<keyword>"` to confirm volume and find secondary terms + real
  "questions people ask" for the FAQ block.
- If GSC creds are set: `node seo/tools/gsc.mjs queries 28` to see what the site is
  already surfacing for, and prioritize accordingly.
- Each tool exits cleanly with a message if its env vars are missing — never let
  that block the run.

### 4. Brief, then draft
- Write `seo/briefs/<slug>.md`: primary + secondary keywords, intent, the angle, an
  H2 outline, the internal links to include, and the one-sentence citable claim each
  H2 will open with.
- Create `src/data/blog/posts/<slug>.js` matching the shape of the existing posts
  (`hba1c-explained.js` is the reference). Requirements:
  - `body` is an array of typed blocks: `p`, `h2`/`h3` (with `id`), `callout`,
    `list`, `link-internal`, `image` (figure + caption), `faq`, `disclaimer`.
  - **Citability:** every `h2` section opens with a self-contained claim sentence an
    AI engine can lift as a standalone answer.
  - 2–4 `link-internal` blocks to related articles and to `/what-we-test` or
    `/pricing` (build the internal-link graph).
  - One `faq` block (answer-first sentences) and one `disclaimer` block.
  - Ghana-specific framing where it adds value (epidemiology, sickle-cell/Hb-variant
    caveats, mobile money, local labs, cities).
  - Use the `seo-content` and `seo-content-brief` skills for quality; `seo-schema`
    is already automatic via `seo.js` (Article + Breadcrumb + FAQ derive themselves).
- Register it: add the `import` + array entry in `src/data/blog/index.js`.
- **Images (required):** every article ships with at least one relevant image.
  Prefer on-brand SVG data-graphics or hero cards saved in `public/blog/` (crisp,
  tiny on 3G, no generic stock-photo look), referenced with `image` blocks.
- **Humanise (required):** run the `bh-humanizer` skill (it builds on `stop-slop`)
  over the draft before review. Zero em dashes in prose, no AI phrasing tells, but
  keep clinical caution, factual lists, numbers, and the disclaimer.

### 5. Clinical-safety gate
- Run the `clinical-safety-review` skill against the new article. Resolve every flag
  or stop and leave the item `in_progress` with a note. Do not ship unsafe content.

### 6. Build and verify
- `npm ci` if `node_modules` is missing, then `npm run build`.
- Confirm:
  - `dist/blog/<slug>/index.html` exists with the right `<title>`,
    `og:type=article`, canonical, and Article + BreadcrumbList (+ FAQPage) JSON-LD.
  - `dist/sitemap.xml` and `dist/llms.txt` include `/blog/<slug>`.
- `npm run lint` — your new files must not add errors (pre-existing errors in
  `scripts/google-apps-script.js` and `src/context/WaitlistContext.jsx` are not
  yours; ignore them).
- Humanise check: the article file must contain zero spaced em dashes in prose
  (`grep -n " — " src/data/blog/posts/<slug>.js` returns nothing).

### 7. Advance state
- Flip the roadmap item to `status: done` and add `completed: <YYYY-MM-DD>`.
- Update `seo/progress.json`: `lastRunDate`, append the id to `completed[]`,
  increment `publishedCount`, set a `notes` pointer to the next todo.

### 8. Open the PR
- Commit (`SEO: <article title>`), push, and open a PR with `gh pr create`.
- PR body: target keyword + intent, schema added, internal links added, and the
  build-verification output (the head tags + that sitemap/llms include the route).
- End the commit message with the required Co-Authored-By trailer.

## Maintenance pass (weekly, or when no todo content items remain)

- **Analytics & rank pulse:** pull GSC + DataForSEO + Bing; write
  `seo/reports/<YYYY>-W<ww>.md` with rank deltas for roadmap keywords and a GEO
  citation check (query ChatGPT / Perplexity / AI Overviews / Copilot for target
  terms; note whether BetterHealth is cited). Re-prioritize `roadmap.yml`.
- **Technical hygiene:** bump `dateModified` on refreshed articles, validate schema,
  confirm internal links resolve, review Core Web Vitals. Use `seo-audit`,
  `seo-technical`, `seo-geo`, `seo-drift`.
- **Off-site queue:** research and append concrete, live targets to
  `seo/offsite/directory-targets.md` and angles to `digital-pr-angles.md`.

## Scaling levers (when asked to go faster / be comprehensive)

- Build the programmatic `/biomarkers/<slug>` layer (roadmap id
  `tech-programmatic-biomarkers`) — same `ROUTE_SEO` mechanism as the blog, seeded
  from `src/data/content.js`. One registry + one template page unlocks ~155 pages.
- Generate per-article OG images (`tech-og-images-blog`) with `seo-image-gen`.

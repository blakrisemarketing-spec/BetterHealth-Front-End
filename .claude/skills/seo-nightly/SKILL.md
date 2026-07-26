---
name: seo-nightly
description: >
  Execute one cycle of the BetterHealth Africa SEO/GEO program. Use this when
  running the nightly content routine, a scheduled SEO run, or when asked to
  "publish the next SEO articles", "run the nightly SEO job", "do the next items on
  the SEO roadmap", or "advance the SEO program". Reads seo/roadmap.yml +
  seo/progress.json, publishes the next BATCH of up to five patients-led articles,
  verifies the build, and opens ONE PR for review. Composes the seo-* skills and
  enforces the clinical-safety gate. Africa-first (Ghana home market, pan-African
  expansion), patients-led.
---

# SEO Nightly Routine

## ⏸ PAUSED — 2026-07-26. Do not publish. Stop and exit.

**If you are a scheduled run, stop here.** Do not select a batch, draft articles,
refill the queue, or open a PR. Take no action and end the session quietly.

**Why:** GSC access opened on 2026-07-26 and reported **70 URLs submitted, 0
indexed**, with sampled articles at "Discovered — currently not indexed" (see
`seo/reports/weekly-2026-W31.md`). 67 articles are published and none are in
Google's index, so article #68 has no marginal value. Two causes were identified
and are being addressed instead:

1. `/blog` prerendered zero article links, leaving every article an orphan
   reachable only via sitemap.xml (fixed in PR #67).
2. No backlink profile — the actual authority constraint, now the active workstream.

**Resume condition:** the sitemap's indexed count moves off 0. Re-check with
`node seo/tools/gsc.mjs sitemap-status`. When it does, delete this block and the
routine resumes normally. Publishing more articles before then adds thin-corpus
pressure to a domain that is not yet indexing what it already has.

Note: the cloud Routine that invokes this skill may still be enabled and will keep
spawning sessions until it is disabled at https://claude.ai/code/routines. This
block is what stops the work; disabling the routine is what stops the compute.

---

You are advancing BetterHealth Africa toward #1 rankings on Google and AI chatbots
for African health-screening keywords. One invocation publishes a **batch of up to
five articles**, shipped as a **single reviewable PR**. Be rigorous: this is a
health brand, and every change is public.

Read `seo/playbook.md` and `seo/README.md` first — they are the source of truth.
This skill is the executable checklist.

## Batch size & quality floor

- **Target: 5 articles per run, in ONE PR.** Default `BATCH_SIZE = 5`.
- **Quality is the floor, not the count.** Five fully-gated articles beat five
  rushed ones. If any article cannot clear the clinical-safety gate or the build,
  **ship the ones that passed and leave the rest `todo`** — never lower the bar to
  hit five. Publishing four correct articles is a success; publishing five with one
  wrong reference range is a failure.
- If fewer than five `todo` article items exist, publish what remains, then run the
  **queue-refill pass** (below) so the next run has runway.

### The measurable quality floor (per article — enforce, don't eyeball)

Batching five articles into one drafting pass historically thinned the later ones
(fewer words, one image, two links, less citable structure) versus dedicated
single-topic runs. Two mechanisms prevent that regression:

1. **Draft each article in its own sub-agent** (see step 4) so every article gets a
   full, dedicated context budget instead of competing for attention inside one pass.
2. **Every shipped article must clear ALL of these before the PR opens.** If a draft
   misses any, send it back to its sub-agent to expand (cover the roadmap `secondary`
   keywords, add the missing image/link/FAQ), then re-check. If it still cannot clear
   the floor, **drop it from the batch** (leave `todo`) exactly as with the clinical
   gate — never ship a thin article to hit five.
   - **Depth:** ~1,100+ words of body prose. This is a signal, not a target to pad to
     — reach it by fully answering the query and covering the `secondary` keywords, not
     with filler. The `bh-humanizer`/`stop-slop` gate still applies; padding fails it.
   - **Images:** at least **2** body `image` blocks (a hero card + one data graphic),
     not just a hero.
   - **Internal links:** **3–4** `link-internal` blocks — at least **2 blog
     cross-links** (related articles, including tonight's batch mates where topical)
     plus `/what-we-test` and/or `/pricing`. Every blog `to:` must resolve in the
     merged set.
   - **Citability:** **every** `h2` opens with a self-contained claim sentence an AI
     engine can lift as a standalone answer.
   - **FAQ:** one `faq` block with **≥5** answer-first Q&As, seeded from real
     "questions people ask" (DataForSEO `ideas`) where creds exist.
   - **Local framing:** market-appropriate context present (not reflexively Ghana).

## Hard rules (never break)

1. **PR for review only.** Never commit to `main`. Open one PR; a human merges.
2. **Clinical-safety gate, per article.** Every article in the batch independently
   passes the `clinical-safety-review` skill before the PR opens. Any health claim,
   reference range, symptom, or treatment statement must cite an accepted source
   (WHO / ADA / national guideline / etc.) and include the `disclaimer` block.
   **Never fabricate** a clinician's name or "medically reviewed by" claim — only set
   `medicallyReviewedBy` if a named advisory-board doctor actually signed off.
3. **Build must pass offline.** `npm run build` cannot depend on any API.
4. **Single source of truth.** New content = one file in `src/data/blog/posts/` +
   one line in `src/data/blog/index.js` per article. Never hand-edit `dist/`,
   `sitemap.xml`, or `llms.txt` — `vite.config.js` generates them.
5. **No secrets in the repo.** Tools read env vars only.
6. **One combined state update.** All five articles share ONE `seo/progress.json`
   edit and ONE set of `roadmap.yml` flips, committed together in the single PR.
   This is what keeps the batch atomic and conflict-free (no inter-PR collision).

## Procedure

### 1. Sync and branch
- `git fetch origin && git switch -c seo/nightly-$(date +%Y-%m-%d) origin/main`
  (if the branch exists, append a short suffix). Work from latest `main`.

### 2. Select the batch
- Read `seo/progress.json` and `seo/roadmap.yml`.
- **Dedup against open PRs FIRST — this is the load-bearing step.** Because every run
  branches fresh from `origin/main`, `progress.json.inFlightPRs` written on a previous
  run's *unmerged* branch is invisible here (main still shows `[]`). So the only
  reliable claim signal is GitHub itself. Before selecting, list open SEO PRs and
  collect the slugs they already ship:
  ```
  gh pr list --state open --json number,headRefName,files \
    --jq '.[] | select(.headRefName|test("seo/|nightly")) | .files[].path' \
    | grep '^src/data/blog/posts/' | sed 's#.*/##; s#\.js$##' | sort -u
  ```
  Treat every slug printed as **already claimed**. (Equivalently: scan each open PR's
  `roadmap.yml` diff for items it flips to `done`.)
- Select the **first five** `items` entries with `status: todo` and `type: article`
  (or `type: local` location pages), top-to-bottom, **skipping any whose `slug` is
  already claimed by an open PR** and skipping pure tech tasks (`tech-*`). Walk further
  down the queue as needed to reach five unclaimed items — do not open a 2nd/3rd PR for
  a slug that already has one waiting for review. (This is exactly what the 2026-07-09
  run did correctly and the 2026-07-10 run failed to do, causing PRs #36–#40 to pile up
  five deep on the same seven articles.)
- If open PRs have grown to a backlog (roughly 3+ unmerged SEO PRs), **do not add more**:
  publish nothing new this run, and instead leave a `progress.json` note asking a human
  to merge or close the backlog first. More unreviewed drafts do not help the program.
- Track the selected ids **in memory for this run**, and record them in
  `progress.json.inFlightPRs` on this branch (belt-and-suspenders for a concurrent run
  in the same session — but the `gh pr list` scan above is the primary guard, since
  `inFlightPRs` does not survive to the next run's fresh branch).
- If fewer than five qualify after dedup, take what exists and flag the queue-refill pass.

### 3. Refine each target (skip gracefully if creds absent)
- If DataForSEO creds are set, for each target: `node seo/tools/dataforseo.mjs volume
  "<keyword>"` and `... ideas "<keyword>"` to confirm volume, find secondary terms,
  and pull real "questions people ask" for the FAQ block. Use the right market code
  per target (`DFS_LOCATION_CODE` — Ghana 2288, Nigeria 2566, Kenya 2404, South
  Africa 2710) so volumes reflect the article's intended market.
- If GSC creds are set: `node seo/tools/gsc.mjs queries 28` to see what the site is
  already surfacing for, and adjust.
- Each tool exits cleanly if its env vars are missing — never let that block the run.

### 4. For EACH article in the batch: brief, then draft

**Draft each article in its own sub-agent, in parallel — do NOT draft all five inline
in this one context.** Drafting five articles sequentially in a single pass is what
thinned the later ones (that is the exact regression the quality floor above targets).
Instead, spawn one `Task` sub-agent per selected target (send them in one message so
they run concurrently); each sub-agent owns a single article end-to-end and returns its
finished `src/data/blog/posts/<slug>.js` plus any `public/blog/*.svg` it created. Give
each sub-agent: the roadmap item (keyword, `secondary`, market, intent), the confirmed
DataForSEO volume/ideas, the slugs of the OTHER batch articles (for cross-links), the
quality floor above, and the instruction to self-check against it before returning. The
articles stay independent (separate files, separate slugs); they only converge here at
registration, the single state update, and the PR.

Each sub-agent performs this loop for its one article:

- Write `seo/briefs/<slug>.md`: primary + secondary keywords, intent, the angle, an
  H2 outline, the internal links to include, and the one-sentence citable claim each
  H2 will open with.
- Create `src/data/blog/posts/<slug>.js` matching the existing posts
  (`hba1c-explained.js` is the reference). Requirements:
  - `body` is an array of typed blocks: `p`, `h2`/`h3` (with `id`), `callout`,
    `list`, `link-internal`, `image` (figure + caption), `faq`, `disclaimer`.
  - **Citability:** every `h2` section opens with a self-contained claim sentence an
    AI engine can lift as a standalone answer.
  - 2–4 `link-internal` blocks to related articles and to `/what-we-test` or
    `/pricing` (build the internal-link graph — including cross-links to the OTHER
    articles in tonight's batch where topically related).
  - One `faq` block (answer-first sentences) and one `disclaimer` block.
  - **Market-appropriate local framing.** Add local relevance for the article's
    intended market, not reflexively Ghana. A Nigeria-targeted article uses Nigerian
    epidemiology, labs, NHIS/HMO context, naira; a Kenya article uses Kenyan context;
    a pan-African article stays continental. Ghana remains the home market and the
    default when a target is not market-specific. Keep universally-true clinical
    caveats (e.g. sickle-cell / Hb-variant effects on HbA1c) wherever relevant —
    those apply across much of sub-Saharan Africa, not just Ghana.
  - Use the `seo-content` and `seo-content-brief` skills for quality; `seo-schema`
    is automatic via `seo.js` (Article + Breadcrumb + FAQ derive themselves).
- Registration is done by the MAIN run, not the sub-agent: once all sub-agents return,
  add one `import` + one array entry per shipped article in `src/data/blog/index.js`
  (keeping the single-append-point invariant), then run the floor + build checks below.
- **Images (required):** every article ships with at least one relevant image.
  Prefer on-brand SVG data-graphics or hero cards saved in `public/blog/` (crisp,
  tiny on 3G, no generic stock-photo look), referenced with `body` `image` blocks.
  IMPORTANT: SVGs go in `image` blocks ONLY. The article's top-level `image` field is
  the OG/social-share image and MUST be a raster (PNG/JPG) — social platforms do not
  render SVG OG cards. Use `/og-image.png` for that field until a custom raster card
  exists. Never set the top-level `image` to an `.svg`.
- **Humanise (required):** run the `bh-humanizer` skill (it builds on `stop-slop`)
  over the draft before review. Zero em dashes in prose, no AI phrasing tells, but
  keep clinical caution, factual lists, numbers, and the disclaimer. Watch the
  excerpt/description fields — tells slip through there most.

### 5. Clinical-safety gate (per article)
- Run the `clinical-safety-review` skill against **each** new article. Resolve every
  flag. If an article cannot be made safe, **drop it from the batch**: leave its
  roadmap item `todo` (or `in_progress` with a note), exclude it from the state
  update and PR, and continue with the rest. Do not ship unsafe content, and do not
  let one bad article sink the batch.

### 6. Build and verify (once, for the whole batch)
- `npm ci` if `node_modules` is missing, then `npm run build`.
- For **each** shipped article confirm:
  - `dist/blog/<slug>/index.html` exists with the right `<title>`,
    `og:type=article`, canonical, and Article + BreadcrumbList (+ FAQPage) JSON-LD.
  - `dist/sitemap.xml` and `dist/llms.txt` include `/blog/<slug>`.
- `npm run lint` — your new files must not add errors (pre-existing errors in
  `scripts/google-apps-script.js` and `src/context/WaitlistContext.jsx` are not
  yours; ignore them).
- Humanise check per article: `grep -n " — " src/data/blog/posts/<slug>.js` returns
  nothing (zero spaced em dashes in prose).
- **Quality-floor check per article** (the anti-thinness gate — enforce, don't eyeball):
  ```
  f=src/data/blog/posts/<slug>.js
  echo "images:   $(grep -c 'type: "image"' $f)   (need >=2)"
  echo "links:    $(grep -c 'type: "link-internal"' $f)   (need 3-4)"
  echo "faq Qs:   $(grep -c '        q:' $f)   (need >=5)"
  echo "h2s:      $(grep -c 'type: "h2"' $f)"
  ```
  Confirm images >=2, link-internal 3-4 (>=2 of them blog cross-links that resolve),
  faq >=5, and that every `h2` opens a citable claim. Any shipped article that misses
  the floor after its sub-agent's expansion pass is **dropped from the batch** (left
  `todo`), never shipped thin — same disposition as a failed clinical gate.

### 7. Advance state (ONE combined edit)
- For every article that shipped: flip its roadmap item to `status: done` and add
  `completed: <YYYY-MM-DD>`.
- Update `seo/progress.json` **once**: set `lastRunDate`, append ALL shipped ids to
  `completed[]`, increment `publishedCount` by the number shipped, clear the batch
  from `inFlightPRs`, and set `notes` to point at the next todo(s).
- Keep the weekly's `lastWeeklyRun` field untouched (avoids colliding with a
  concurrent weekly PR).

### 8. Open ONE PR
- Commit (`SEO: nightly batch <YYYY-MM-DD> (<N> articles)`), push, open ONE PR with
  `gh pr create`.
- PR body: a short table of the N articles (slug, primary keyword, market, intent),
  the schema added, the internal links added, the per-article clinical-safety gate
  results, and the build-verification output (head tags + sitemap/llms include each
  route). Note any target dropped from the batch and why.
- Use a plain commit message. Do not add a Co-Authored-By trailer or any
  AI-attribution footer.
- **Mark the PR ready for review** right after creating it: `gh pr ready <number>`.
  Claude Routines open PRs as drafts by default; a draft that sits unmerged means the
  next run finds the same `status: todo` items and opens a duplicate PR.

## Queue-refill pass (keep the 5/day pipeline fed)

Trigger this when **fewer than 10 `todo` article items remain** after a batch (so the
queue never starves at five-per-night). The program scope is **all of Africa**, so
refill draws from the whole continent, not just Ghana.

- **Expand the keyword universe across markets.** For each priority market (Ghana,
  Nigeria, Kenya, South Africa, and add others as warranted), use
  `seo/tools/dataforseo.mjs ideas "<seed>"` with that market's `DFS_LOCATION_CODE` to
  surface real patient-led screening/biomarker/condition queries. Good seeds: malaria
  test, typhoid test, hepatitis B test, genotype test, premarital screening, PSA test,
  pap smear, HIV test, full body checkup, plus the existing biomarker seeds.
- **Append, don't reorder.** Add new `status: todo` items at the right priority below
  the current queue. Each gets a real DataForSEO-confirmed `volume` and the market in
  `notes` (or `volume: null` with a note if no data, still worth long-tail/AI value).
- **Prefer high-burden, low-competition African terms.** Conditions with high African
  disease burden and thin local editorial competition (malaria, typhoid, hepatitis B,
  sickle cell, genotype/premarital screening) are the strongest AI-citation and
  ranking opportunities.
- If DataForSEO creds are absent, still append curated pan-African targets from the
  seed list with `volume: null` and a "confirm volume" note, so the queue keeps
  moving; the next run with creds confirms volumes.

## Maintenance pass (handled by the weekly routine; run here only if asked)

- **Analytics & rank pulse:** pull GSC + DataForSEO + Bing per market; write
  `seo/reports/<YYYY>-W<ww>.md` with rank deltas and a GEO citation check (query
  ChatGPT / Perplexity / AI Overviews / Copilot for target terms; note whether
  BetterHealth is cited). Re-prioritize `roadmap.yml`.
- **Technical hygiene:** bump `dateModified` on refreshed articles, validate schema,
  confirm internal links resolve, review Core Web Vitals.
- **Off-site queue:** append concrete, live targets to
  `seo/offsite/directory-targets.md` and angles to `digital-pr-angles.md`.

## Scaling levers (when asked to go faster / be comprehensive)

- Build the programmatic `/biomarkers/<slug>` layer (roadmap id
  `tech-programmatic-biomarkers`) — same `ROUTE_SEO` mechanism as the blog, seeded
  from `src/data/content.js`. One registry + one template page unlocks ~127 pages.
- Generate per-article OG images (`tech-og-images-blog`) with `seo-image-gen`.
- Stand up per-market location pages (`local-*`) for the larger African cities.

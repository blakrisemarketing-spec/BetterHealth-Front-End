# Nightly SEO/GEO Playbook

This is the human-readable specification of what the nightly routine does. The
executable version lives in `.claude/skills/seo-nightly/SKILL.md`, which the
scheduled cloud agent invokes. Keep the two in sync.

**Scope: Africa-first.** Ghana is the home market, but the program now targets health
keywords across Africa (Nigeria, Kenya, South Africa, and beyond). Content carries
market-appropriate local framing, not reflexively Ghanaian.

**Cadence: 5 articles per night, one PR.** Each nightly run publishes a batch of up
to five patients-led articles in a single reviewable pull request.

## Invariants (never violate)

1. **PR for review.** Every change ships as one pull request. Nothing is committed to
   `main` directly. A human merges.
2. **Clinical safety gate, per article.** Every article in the batch independently
   passes the `clinical-safety-review` discipline before the PR opens. Wrong health
   information is worse than a delayed article. Ranges/thresholds cite an accepted
   source (WHO / ADA / national guideline) and include the educational disclaimer
   block. Never fabricate a clinician's review/byline.
3. **Quality is the floor, not the count.** Ship only the articles that fully clear
   the gate and the build. Four correct articles beat five with one wrong range.
4. **Build must pass offline.** `npm run build` must succeed without any API. The
   data tools inform *what* to write; they are never a build dependency.
5. **Single source of truth.** New content = one file in `src/data/blog/posts/` +
   one line in `src/data/blog/index.js` per article. Never hand-edit `dist/`,
   `sitemap.xml`, or `llms.txt` — they are generated.
6. **One combined state update.** All articles in a batch share ONE `progress.json`
   edit and ONE set of `roadmap.yml` flips, committed in the single PR. This keeps
   the batch atomic and avoids the inter-PR state collision.
7. **No secrets in the repo.** Tools read credentials from env only.

## Nightly procedure

1. **Sync.** Fetch `origin/main`; create branch `seo/nightly-YYYY-MM-DD`.
2. **Select the batch.** Read `seo/progress.json` and `seo/roadmap.yml`. Take the
   first **five** `status: todo` items of `type: article` (or `type: local`),
   top-to-bottom; skip `tech-*` tasks. Record the ids in `progress.json.inFlightPRs`.
   If fewer than five qualify, take what exists and run the queue-refill pass.
3. **Refine targets (if creds available).** For each target use
   `seo/tools/dataforseo.mjs` (with the market's `DFS_LOCATION_CODE`) and
   `seo/tools/gsc.mjs` to confirm volume / better variants and pull "questions people
   ask" for the FAQ. Skip gracefully if creds are absent.
4. **For each article — brief.** Write/update `seo/briefs/<slug>.md`: primary +
   secondary keywords, intent, angle, H2 outline, internal links, and the citable
   claim each H2 opens with.
5. **For each article — draft.** Create `src/data/blog/posts/<slug>.js` in the
   existing shape:
   - Each `h2` opens with a self-contained, citable claim sentence.
   - 2–4 internal links (`link-internal`) to related articles (including other
     articles in tonight's batch) and to `/what-we-test` or `/pricing`.
   - A `faq` block (answer-first) and a `disclaimer` block.
   - Market-appropriate local framing (epidemiology, labs, insurance, currency for
     the target market). Ghana is the default only when the target is not
     market-specific. Keep pan-African clinical caveats (sickle-cell / Hb variants).
   - At least one relevant `image` block (on-brand SVG data-graphic / hero card in
     `public/blog/`, not stock). Top-level `image` (OG card) must be a raster.
6. **Register.** Add the import + array entry in `src/data/blog/index.js` per article.
7. **Humanise.** Run `bh-humanizer` over each draft: zero em dashes, no AI tells,
   keep clinical caution, numbers, and the disclaimer. Check excerpt/description too.
8. **Clinical-safety gate.** Run `clinical-safety-review` on each article. Drop any
   article that cannot be made safe (leave it `todo`); ship the rest.
9. **Build & verify (once).** `npm run build`. For each shipped article confirm
   `dist/blog/<slug>/index.html` (title, `og:type=article`, canonical, Article +
   BreadcrumbList (+ FAQPage) JSON-LD) and that `sitemap.xml` + `llms.txt` include
   the route. Zero spaced em dashes in each post file.
10. **Update state (once).** Flip each shipped roadmap item to `status: done` with a
    `completed` date; bump `seo/progress.json` once (`lastRunDate`, append all ids to
    `completed[]`, `publishedCount += shipped`, clear `inFlightPRs`). Leave
    `lastWeeklyRun` untouched.
11. **One PR.** Commit (`SEO: nightly batch <date> (<N> articles)`) and open ONE PR
    summarizing the batch (article table, schema, internal links, per-article gate
    results, verification output, and anything dropped). `gh pr ready` it.

## Queue-refill pass (keep the 5/day pipeline fed)

Trigger when fewer than 10 `todo` article items remain. Scope is all of Africa.

- **Prefer long-tail over head terms (2026-08-09 direction change).** All 66
  published articles' primary keywords remain "not in top 20" after 7+ weeks (see
  `seo/reports/weekly-2026-W32.md`) — the domain has no authority yet to compete on
  broad 1-2 word terms like "fatty liver disease" or "lipid profile test". Long-tail,
  question-phrased, often Ghana-specific queries (3+ words, lower volume, far less
  competition) are the realistically winnable target now, and they double as GEO bait
  since AI Overviews/answer engines lift exactly this kind of self-contained phrasing.
  Ghana is the home market, so weight Ghana-specific long-tail queries first; still
  cover the other priority markets for the pan-African items already in the queue.
- For each priority market (Ghana, Nigeria, Kenya, South Africa, …) run
  `seo/tools/dataforseo.mjs ideas "<seed>"` with that market's `DFS_LOCATION_CODE` to
  surface real patient queries — **seed with a topic phrase (2-3 words: "diabetes
  test", "hepatitis b symptoms", "kidney disease symptoms"), not a single word**, and
  read the *ideas the tool returns* for long-tail candidates (question phrasing: "is
  X curable", "early warning signs of X", "N stages of X"; Ghana-specific: "cost of X
  in Ghana", "X price in Ghana") rather than defaulting to the shortest/highest-volume
  idea in the list. Seeds: malaria test, typhoid test, hepatitis B test, genotype
  test, premarital screening, PSA test, pap smear, HIV test, full body checkup, plus
  existing biomarker/condition seeds.
- Append new `status: todo` items at the right priority (never reorder `done`), each
  with a DataForSEO-confirmed `volume` and the market in `notes` (or `volume: null` +
  a "confirm" note if no data). Favour high-burden, low-competition African terms —
  and among those, favour the long-tail variant over the head term when both exist.
  Skip ideas that are treatment/medication-directive (e.g. "high blood pressure
  medication") — this is a patients-led testing/education brand, not a prescribing
  one; stay on symptoms, testing, and understanding-results ground.

## Maintenance pass (weekly routine; or when no `todo` content items remain)

- **Analytics & rank pulse:** pull GSC + DataForSEO + Bing per market; write
  `seo/reports/YYYY-Www.md` with rank deltas and GEO citation checks. Re-prioritize.
- **Technical hygiene:** refresh aging articles (`dateModified`), check links, schema,
  Core Web Vitals.
- **Off-site queue:** top up `seo/offsite/` with directory targets and PR angles.

## Cadence

| Routine | Schedule | Entry point |
|---|---|---|
| Content engine | Nightly | publish up to **5** items from `roadmap.yml` → one PR |
| Analytics & rank pulse | Weekly (Mon) | maintenance pass → report |
| Off-site authority | Weekly | top up `seo/offsite/` |
| Technical audit & drift | Monthly | full `seo-audit` + `seo-drift` |

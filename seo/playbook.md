# Nightly SEO/GEO Playbook

This is the human-readable specification of what the nightly routine does. The
executable version lives in `.claude/skills/seo-nightly/SKILL.md`, which the
scheduled cloud agent invokes. Keep the two in sync.

## Invariants (never violate)

1. **PR for review.** Every change ships as a pull request. Nothing is committed to
   `main` directly. A human merges.
2. **Clinical safety gate.** Any content touching a health claim, reference range,
   symptom, or treatment statement passes the `clinical-safety-review` discipline
   before the PR opens. Wrong health information is worse than a delayed article.
   Ranges/thresholds must cite an accepted source (WHO/ADA/etc.) and include the
   educational disclaimer block. Never fabricate a clinician's review/byline.
3. **Build must pass offline.** `npm run build` must succeed without any API. The
   data tools inform *what* to write; they are never a build dependency.
4. **Single source of truth.** New content = one file in `src/data/blog/posts/` +
   one line in `src/data/blog/index.js`. Never hand-edit `dist/`, `sitemap.xml`, or
   `llms.txt` — they are generated.
5. **No secrets in the repo.** Tools read credentials from env only.

## Nightly procedure

1. **Sync.** Fetch `origin/main`; create branch `seo/nightly-YYYY-MM-DD`.
2. **Select task.** Read `seo/progress.json` and `seo/roadmap.yml`. Pick the first
   item with `status: todo`. If none, run a maintenance pass instead (see below).
3. **Refine target (if creds available).** Use `seo/tools/dataforseo.mjs` and
   `seo/tools/gsc.mjs` to confirm the keyword still has volume / no better variant,
   and to pull "questions people ask" for the FAQ block. Skip gracefully if creds
   are absent.
4. **Brief.** Write/update `seo/briefs/<slug>.md`: primary + secondary keywords,
   search intent, the angle, an H2 outline, the internal links to include, and the
   citable claim each H2 should open with.
5. **Draft.** Create `src/data/blog/posts/<slug>.js` following the existing article
   shape. Requirements:
   - Each `h2` section opens with a self-contained claim sentence (passage-level
     citability for AI engines).
   - Include 2-4 internal links (`link-internal` blocks) to related articles and to
     `/what-we-test` or `/pricing`.
   - Include a `faq` block (answer-first) and a `disclaimer` block.
   - Ghana-specific framing where relevant (epidemiology, mobile money, local labs).
6. **Register.** Add the import + array entry in `src/data/blog/index.js`.
7. **Clinical-safety gate.** Run `clinical-safety-review` on the new content. Fix or
   stop if it flags anything.
8. **Build & verify.** `npm run build`. Confirm:
   - `dist/blog/<slug>/index.html` exists with the right `<title>`, `og:type=article`,
     canonical, and Article + BreadcrumbList (+ FAQPage) JSON-LD.
   - `dist/sitemap.xml` and `dist/llms.txt` include the new route.
9. **Update state.** Flip the roadmap item to `status: done` with `completed` date;
   bump `seo/progress.json` (`lastRunDate`, `completed[]`, `publishedCount`).
10. **PR.** Commit and open a PR titled `SEO: <article title>` summarizing the target
    keyword, the schema added, and the verification output.

## Maintenance pass (when no `todo` content items remain, or on the weekly run)

- **Analytics & rank pulse:** pull GSC + DataForSEO + Bing; write
  `seo/reports/YYYY-Www.md` with rank deltas for tracked keywords and GEO citation
  checks (is BetterHealth cited by AI engines for target queries?). Re-prioritize
  `roadmap.yml` based on what's gaining traction.
- **Technical hygiene:** refresh aging articles (`dateModified`), check internal
  links resolve, validate schema, and review Core Web Vitals.
- **Off-site queue:** top up `seo/offsite/` with directory targets and PR angles for
  human action.

## Cadence

| Routine | Schedule | Entry point |
|---|---|---|
| Content engine | Nightly | publish 1 item from `roadmap.yml` |
| Analytics & rank pulse | Weekly (Mon) | maintenance pass → report |
| Off-site authority | Weekly | top up `seo/offsite/` |
| Technical audit & drift | Monthly | full `seo-audit` + `seo-drift` |

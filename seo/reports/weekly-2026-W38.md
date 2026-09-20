# SEO Weekly: 2026-W38 (20 Sep 2026)

**Week-over-week vs `weekly-2026-W37`** (13 Sep 2026 — the most recent analysis
available, even though its PR is still unmerged; see the Headline below).

---

## Headline: 8 prior weekly-SEO PRs are sitting unreviewed — none of the last 2 months of analysis has reached `main`

This run pulled fresh data and it corroborates last week's, but a bigger problem
sits upstream of the data: **8 previous `SEO weekly` pull requests are open and
unmerged**, spanning 7 weeks (`main`'s `seo/roadmap.yml` and `seo/progress.json`
are still stamped 2026-07-26):

| PR | Title | Opened |
|---|---|---|
| #68 | SEO weekly: 2026-W32 | 2026-08-02 |
| #70 | SEO weekly: 2026-W32 (duplicate) | 2026-08-09 |
| #71 | SEO weekly: 2026-W33 | 2026-08-16 |
| #72 | SEO weekly: 2026-W34 | 2026-08-23 |
| #76 | SEO weekly: 2026-W35 | 2026-08-30 |
| #86 | SEO weekly: 2026-W36 | 2026-09-06 |
| #88 | SEO weekly: 2026-W37 | 2026-09-13 |

None of these have been merged or closed. This report's PR will be the 8th open SEO
PR. Practically: every one of those reports and roadmap edits only exists on its own
branch — the "previous weekly report" this run compared against had to be read
directly from PR #88's branch (`seo/weekly-2026-09-13`), not from `main`, because
`main` still only has `weekly-2026-W31.md` (26 Jul). **Recommend a human reviews and
merges (or closes, if superseded) this backlog before more pile up**, per the
seo-weekly playbook's own backlog-avoidance intent.

Substantively, the data itself is a quieter update than W37's: the indexation
breakthrough found last week (2 of 67 articles moving to "Submitted and indexed")
**held flat, not continuing to climb** — see below.

---

## Data Sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | Working | Queries (28d), pages (28d), sitemap-status, and URL Inspection on a 13-article sample |
| DataForSEO | Operational | SERP check (depth 20, per-article target market) for all 66 published articles' primary keywords |
| Bing Webmaster | Skipped | `BING_API_KEY` / `BING_SITE_URL` still not configured (9+ weeks) |

---

## GSC: Top Queries (28 days, 21 Aug – 18 Sep 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health | 0 | 1 | 0% | 67 |
| better health africa | 0 | 1 | 0% | 8 |

Only 2 distinct queries surfaced, both branded/navigational, both 0 clicks — same
pattern as W37. GSC still anonymizes low-volume queries out of this report even
though their impressions roll into the page-level totals below.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 5 | 21 | 23.8% | 5.6 |
| app.betterhealth.africa/ | 4 | 6 | 66.7% | 2.7 |
| app.betterhealth.africa/join | 0 | 5 | 0% | 6.2 |
| www.betterhealth.africa/contact/ | 0 | 8 | 0% | 2.6 |
| www.betterhealth.africa/about/ | 0 | 7 | 0% | 15.9 |
| www.betterhealth.africa/faq/ | 0 | 6 | 0% | 2.7 |
| **www.betterhealth.africa/blog/fasting-blood-sugar-explained/** | 0 | 5 | 0% | **7.2** |
| **www.betterhealth.africa/blog/lipid-profile-cholesterol-test/** | 0 | 5 | 0% | **7.0** |
| www.betterhealth.africa/how-it-works/ | 0 | 4 | 0% | 7 |
| www.betterhealth.africa/pricing/ | 0 | 4 | 0% | 3 |
| www.betterhealth.africa/what-we-test/ | 0 | 4 | 0% | 6 |
| www.betterhealth.africa/book-tests/ | 0 | 4 | 0% | 3.25 |
| (1 referral short-link, 2 impressions) | — | — | — | — |

13 rows. The two bolded blog pages are the same two W37 found — no new pages have
started earning impressions this week, but their impression count grew (3→5 each)
while clicks stayed at 0.

---

## Indexation status (GSC URL Inspection, 13-article sample)

| Article | Coverage state |
|---|---|
| fasting-blood-sugar-explained | **Submitted and indexed** |
| lipid-profile-cholesterol-test | **Submitted and indexed** |
| hba1c-explained (oldest, 2026-06-20) | Discovered — currently not indexed |
| preventive-health-screening-ghana | Discovered — currently not indexed |
| malaria-test-explained | Discovered — currently not indexed |
| hiv-test-explained | Discovered — currently not indexed |
| genotype-test-aa-as-ss | Discovered — currently not indexed *(was "unknown to Google" in W37)* |
| gestational-diabetes-test | Discovered — currently not indexed |
| testosterone-test-explained | Discovered — currently not indexed |
| yellow-fever-explained | Discovered — currently not indexed |
| cholera-symptoms-test | Discovered — currently not indexed |
| blood-test-eldoret (newest, 2026-07-25) | Discovered — currently not indexed |
| full-blood-count-explained | **URL is unknown to Google** *(was "Discovered — not indexed" in W37)* |

**2 of 13 sampled are indexed — unchanged from W37.** The only movement inside the
sample is a wash: `genotype-test-aa-as-ss` improved (unknown → discovered) while
`full-blood-count-explained` regressed (discovered → unknown to Google). Net: no
progress past the 2 pages found last week. `sitemap-status` still reports **113
submitted, 0 indexed** — the same stale/lagged figure flagged in W37; direct URL
Inspection remains the source of truth.

---

## SERP Positions — All 66 Published Articles (DataForSEO)

Every published article's primary keyword was checked against its target market
(Ghana 2288 / Nigeria 2566 / Kenya 2404 / South Africa 2710, depth 20).

**Result: 0 of 66 in the top 20 — unchanged from W37, 8th consecutive flat reading.**
Consistent with indexation being stalled at 2 pages: even those 2 aren't yet
ranking for their primary head keyword (their GSC positions above are for
long-tail queries too low-volume to surface in the query report). Full per-article
list omitted since nothing moved; see `seo/roadmap.yml` for keyword/market detail.

---

## AI Citation (GEO) Scoreboard

| Query | W31 | W37 | **W38** |
|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Present (homepage) | Present (homepage) |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | **Present (homepage)** |

`betterhealth.africa`'s homepage (not a specific article) now surfaces in organic
results for 2 of the 5 tracked queries — "fbc test meaning" is new this week. Both
are **organic listing presence, not a confirmed AI Overview citation**, and neither
is the article that actually targets the query (`full-blood-count-explained` and
`preventive-health-screening-ghana` respectively). The other 3 queries remain
dominated by MedlinePlus/Mayo Clinic/Cleveland Clinic/healthdirect and similar
international sources — no betterhealth.africa presence at all.

---

## Week-over-Week Movement (vs W37)

- **Indexed pages: 2 → 2 of 66/67 — flat.** First week since the breakthrough that
  the count didn't move; worth watching whether this is a plateau or just a slow
  week (see Action Items).
- **Blog-page GSC impressions: 3 → 5** for each of the 2 indexed pages — growing,
  but clicks are flat at 0 (0% CTR both weeks).
- **SERP positions: 0 movement**, 8th flat reading running.
- **Sitemap submitted URLs: 113 → 113** — unchanged; the "0 indexed" sitemap figure
  continues to understate reality by (at least) 2 URLs.
- **AI citations: 1 → 2 of 5** "present" (both homepage-only, unconfirmed as AI
  Overview cites).
- **Published article count: 67 → 67** — the nightly routine remains paused; this
  is now its 8th week paused (since 2026-07-26).
- **Unmerged SEO PR backlog: 7 → 8** (this run's own PR will make it 8, pending
  merge/close of the prior 7).

---

## Quick Wins

- Same two candidates as W37, now a week further along: **`fasting-blood-sugar-explained`**
  and **`lipid-profile-cholesterol-test`** are indexed, hold page-1 average
  positions (7.2 / 7.0) on whatever long-tail queries drive their impressions, and
  are still at **0% CTR** after a second week of impressions (0 clicks / 5
  impressions each). They remain the only 2 pages in the entire corpus visible in
  search at all — a title-tag / meta-description review of just these two is still
  the cheapest available test of whether a stronger headline converts impressions
  into clicks.
- No GSC query-level quick wins yet (position 5–20, high-impression/low-CTR
  queries) — query-dimension data is still too sparse (2 branded queries only).

## Gaps

- No new GSC-sourced keyword gaps this week — same constraint as every prior week:
  the query report has no health-topic queries to mine yet.
- **Todo queue: 8 `status: todo` article items** (dengue fever, prolactin test,
  PCOS, hepatitis A, and 4 local pages — Kano/Enugu/Nakuru/Bloemfontein) plus 2
  technical tasks, unchanged since the 2026-07-25 refill. Enough runway for ~2 more
  nightly batches once/if the nightly routine resumes.

---

## Roadmap Changes

**No reordering** — same rationale as W37: the todo queue is already volume-sorted
(dengue fever 4,400/mo → prolactin 720/mo → lower/unconfirmed-volume items), all 66
keyword checks came back unchanged, and GSC still has no content-query data to
justify retargeting any todo item. No `done` items were touched.

Updated `meta.updated` to 2026-09-20 and `meta.keyword_data` with this week's
findings: the flat 2-of-66 indexation reading, the 8th consecutive flat SERP
sweep, and — importantly — a note that 8 prior weekly-SEO PRs are still unmerged
on GitHub, so this file's history on `main` currently skips from 2026-07-26
straight to this run.

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Review and merge/close the 8 open `SEO weekly` PRs** (#68, #70, #71, #72, #76, #86, #88, plus this run's). They span 7 weeks of analysis and roadmap edits that never reached `main`; #68 and #70 are duplicate W32 reports and one is likely safe to close outright. | Human | Yes — this is now the single biggest blocker to the program having a usable, current `main` state |
| 2 | Decide on resuming the nightly article routine (paused 8 weeks, since 2026-07-26). `seo/backlinks.md`'s own stated condition — "if indexation starts moving after the internal-link fix alone" — was met in W37; this week's flat reading doesn't reverse that, but it does mean the decision shouldn't be deferred another 7 weeks waiting for a clearer trend. | Human | Not yet, but overdue |
| 3 | Watch whether the 2-page indexed count moves again next week, or whether it's plateaued — this is the key signal for whether backlink-building work is still needed or whether Google is just slow. | Weekly routine | No |
| 4 | Consider the title/meta-description review on the 2 indexed pages, flagged for 2 weeks running now with still 0% CTR. | Human / content pass | No |
| 5 | Set `BING_API_KEY` + `BING_SITE_URL` — still not configured, 9+ weeks. | Human | No |
| 6 | No roadmap reprioritization needed; todo queue (8 items) has runway for ~2 more nightly batches whenever/if that resumes. | Nightly routine | No |

---

*Generated by the seo-weekly routine · 2026-09-20*

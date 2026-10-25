# SEO Weekly: 2026-W37 (13 Sep 2026)

**First weekly pass in 7 weeks** — week-over-week comparison is vs `weekly-2026-W31`
(26 Jul 2026), the last report filed. No weekly report was produced for W32–W36.

---

## Headline: the first indexed blog content, and it happened without any backlinks

Two of the 67 published articles — **`fasting-blood-sugar-explained`** and
**`lipid-profile-cholesterol-test`** — now read **"Submitted and indexed"** on direct
GSC URL Inspection, and both are pulling real impressions at **page-1 average
positions (6.7 and 5.7)**. This is the first indexed blog content and the first
blog-page GSC impressions in the program's history.

That matters because of what happened in between reports: after W31 found 0/70
pages indexed, the nightly article-publishing routine was **deliberately paused
(2026-07-26)** in favor of a backlink-building program (`seo/backlinks.md`), on the
theory that a thin backlink profile — not content volume — was the binding
constraint on indexation. `seo/backlinks.md`'s own tracking table is still **empty
— no backlinks have been logged**. Yet indexation moved off zero anyway. That is the
exact condition the plan itself flagged as decision-relevant:

> "If indexation starts moving after the PR #67 internal-link fix alone, the
> authority constraint was weaker than thought and this programme can stay
> lightweight."

Two pages is a thin sample — not yet a confirmed trend — but it is evidence worth a
human looking at now, not in another month. See **Action Items** below.

---

## Data Sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | Working | Queries (28d), pages (28d), sitemap-status, and URL Inspection on a 17-article sample |
| DataForSEO | Operational | SERP check (depth 20, per-article target market) for all 66 published articles' primary keywords |
| Bing Webmaster | Skipped | `BING_API_KEY` / `BING_SITE_URL` still not configured |

---

## GSC: Top Queries (28 days, 14 Aug – 11 Sep 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health | 0 | 2 | 0% | 72.5 |
| better health africa | 0 | 1 | 0% | 8 |

Only 2 distinct queries surfaced, both branded/navigational, both with 0 clicks.
This is far thinner than even the query list looks: GSC anonymizes very-low-volume
queries out of the query-dimension report even though their impressions still roll
up into the page-dimension totals below — which is why the two indexed blog pages
show impressions here with no queries to match them to.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 5 | 21 | 23.8% | 9.3 |
| app.betterhealth.africa/ | 3 | 6 | 50% | 15.3 |
| app.betterhealth.africa/join | 0 | 5 | 0% | 6.2 |
| www.betterhealth.africa/contact/ | 0 | 6 | 0% | 2.5 |
| www.betterhealth.africa/about/ | 0 | 5 | 0% | 20.6 |
| www.betterhealth.africa/faq/ | 0 | 4 | 0% | 3 |
| www.betterhealth.africa/pricing/ | 0 | 4 | 0% | 3 |
| **www.betterhealth.africa/blog/fasting-blood-sugar-explained/** | 0 | 3 | 0% | **6.7** |
| **www.betterhealth.africa/blog/lipid-profile-cholesterol-test/** | 0 | 3 | 0% | **5.7** |
| www.betterhealth.africa/how-it-works/ | 0 | 2 | 0% | 7 |
| www.betterhealth.africa/book-tests/ | 0 | 2 | 0% | 1.5 |
| www.betterhealth.africa/what-we-test/ | 0 | 2 | 0% | 6 |
| (2 referral short-links, 1 impression each) | — | — | — | — |

14 total rows. The two bolded rows are new this week — the first `/blog/` pages
ever to appear in this report.

---

## Indexation status (GSC URL Inspection)

`sitemap-status`: **113 URLs submitted, 0 indexed** per the sitemap coverage
summary — up from 70 submitted at W31 (+43, from the September ad-campaign
lead-magnet/guide/panel pages added since). That "0 indexed" figure is **stale or
lagged**, not current: direct URL Inspection contradicts it for at least 2 URLs.

| Article | Coverage state |
|---|---|
| fasting-blood-sugar-explained | **Submitted and indexed** (last crawled 2026-08-31) |
| lipid-profile-cholesterol-test | **Submitted and indexed** (last crawled 2026-09-08) |
| hba1c-explained (oldest, 2026-06-20) | Discovered — currently not indexed |
| preventive-health-screening-ghana | Discovered — currently not indexed |
| fatty-liver-disease-explained | Discovered — currently not indexed |
| full-blood-count-explained | Discovered — currently not indexed |
| malaria-test-explained | Discovered — currently not indexed |
| hiv-test-explained | Discovered — currently not indexed |
| g6pd-deficiency-test | Discovered — currently not indexed |
| blood-test-kumasi | Discovered — currently not indexed |
| blood-test-pretoria | Discovered — currently not indexed |
| mammogram-breast-cancer-screening | Discovered — currently not indexed |
| yellow-fever-explained | Discovered — currently not indexed |
| cholera-symptoms-test | Discovered — currently not indexed |
| testosterone-test-explained | Discovered — currently not indexed |
| blood-test-eldoret (newest, 2026-07-25) | Discovered — currently not indexed |
| genotype-test-aa-as-ss | URL is unknown to Google |

17 articles sampled (spanning oldest to newest): **2 indexed, 14 discovered but not
indexed, 1 unknown to Google.** Indexation is real but still narrow — 2 of 67 (3%).

---

## SERP Positions — All 66 Published Articles (DataForSEO)

Every published article's primary keyword was checked against its target market
(Ghana 2288 / Nigeria 2566 / Kenya 2404 / South Africa 2710, depth 20).

**Result: 0 of 66 in the top 20 — unchanged from W31, 7th consecutive flat reading.**
This is consistent with the indexation data above: even the 2 newly-indexed pages
aren't yet ranking for their *primary* head keyword (their page-1 GSC positions
above are almost certainly for long-tail variants too low-volume to surface in the
query report, not "fasting blood sugar normal range" or "lipid profile test"
themselves). Full per-article list omitted since nothing moved; see `roadmap.yml`
for keyword/market detail per slug.

---

## AI Citation (GEO) Scoreboard

| Query | W29 | W30 | W31 | **W37** |
|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | **Present (homepage)** |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet |

`betterhealth.africa` (the homepage, not a specific article) now appears among the
organic results returned for "health screening Ghana" and was referenced directly
in a synthesized answer. This is **not** a confirmed AI Overview citation and it's
the homepage rather than the targeted `preventive-health-screening-ghana` article —
worth tracking, not celebrating yet. The other 4 queries remain dominated by
PMC/PubMed, Cleveland Clinic, and similar international sources, no
betterhealth.africa presence.

---

## Week-over-Week Movement (vs W31, 7 weeks prior)

- **Indexed pages: 0 → 2 of 67.** First movement off zero in the program's history.
- **Blog-page GSC impressions: 0 → 2 pages with impressions**, both at page-1
  average position. First-ever content-page organic footprint.
- **SERP positions: 0 movement**, 7th flat reading running — indexation moving
  hasn't yet translated into head-keyword ranking, as expected this early.
- **Sitemap submitted URLs: 70 → 113** (+43), from the September ad-campaign pages,
  unrelated to the blog corpus.
- **AI citations: 0 → 1 "present" (homepage, unconfirmed as an AI Overview cite)**
  out of 5 tracked queries.
- **Published article count: 67 → 67 (no change)** — the nightly routine has been
  paused since 2026-07-26; see Headline above.
- Branded query volumes are too thin (1–2 impressions) for the position shift on
  "better health africa" (3.3 → 8) to be meaningful either way.

---

## Quick Wins

- **`fasting-blood-sugar-explained` and `lipid-profile-cholesterol-test`** are now
  indexed, ranking page 1 (positions 6.7 / 5.7) on whatever long-tail query is
  driving their impressions, and getting **0% CTR** (0 clicks / 3 impressions each).
  With volume this low a CTR fix won't move much on its own, but these are the only
  two pages in the entire corpus currently visible in search at all, so a title-tag
  / meta-description pass on just these two is the cheapest possible test of
  whether a stronger headline captures clicks once impressions exist. Recommend a
  human or the next content pass review both.
- No GSC query-level quick wins (position 5–20, high-impression/low-CTR queries)
  are identifiable yet — query-dimension data is still too sparse (2 branded
  queries only).

## Gaps

- **No new GSC-sourced keyword gaps this week** — same constraint as every prior
  week: no health-topic queries in the query report yet to mine. Once more pages
  index and generate query-level data, re-run this analysis for real.
- **Todo queue**: 8 `status: todo` items remain (dengue fever, prolactin test,
  PCOS, hepatitis A, 4 local pages) plus 2 technical tasks — enough for roughly 2
  more nightly batches once/if the nightly routine resumes.

---

## Roadmap Changes

**No reordering.** The todo queue's existing order is already volume-sorted
(dengue fever 4,400/mo → prolactin 720/mo → lower/unconfirmed-volume items), and
nothing this week's data surfaced changes that ranking — all 66 keyword checks
came back unchanged, and GSC still has no content-query data to suggest a
stronger or different target for any todo item. No `done` items were touched.

Updated `meta.updated` to 2026-09-13 and `meta.keyword_data` to record: (a) the
nightly routine has been paused since 2026-07-26 (publishedCount flat at 67), (b)
this week's full 66-keyword DataForSEO re-check (all unchanged, "not in top 20"),
and (c) the indexation-breakthrough finding above, including the pointer back to
the exact decision condition `seo/backlinks.md` set out for it.

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Decide whether to resume the nightly article routine.** `seo/backlinks.md` explicitly conditioned this on whether indexation moves "after the PR #67 internal-link fix alone" — it just did, for 2 pages, with the backlink tracking table still empty. Thin sample, but it directly matches the condition the plan set for itself. | Human | Not yet — reasonable to watch one more week, but shouldn't be silently deferred another 7 |
| 2 | Watch the 2 newly-indexed pages next week: does indexation spread to more of the 67, or stall at 2? That answer settles whether #1 is a false start or a real trend. | Weekly routine | No |
| 3 | Consider a title/meta-description review on `fasting-blood-sugar-explained` and `lipid-profile-cholesterol-test` — the only 2 pages currently earning any impressions at all, both at 0% CTR. | Human / content pass | No |
| 4 | Re-run `gsc.mjs sitemap-status` and note that its "0 indexed" figure lagged reality by at least 2 URLs this week — treat URL Inspection as the source of truth over the sitemap summary count going forward. | Weekly routine | No |
| 5 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — still not configured, 8+ weeks running. | Human | No |
| 6 | No roadmap reprioritization needed this week; todo queue (8 items) has runway for ~2 more nightly batches whenever/if that resumes. | Nightly routine | No |

---

*Generated by the seo-weekly routine · 2026-09-13*

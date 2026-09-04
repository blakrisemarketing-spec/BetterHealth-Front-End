# SEO Weekly: 2026-W32 (2 Aug 2026)

**Week 7 of reporting — week-over-week vs 2026-W31 (26 Jul 2026)**

---

## Headline: Still 0 indexed, now on 85 submitted URLs — the queue also needs a refill

The core diagnosis is unchanged from last week: **0 of 85 sitemap URLs are indexed** (up
from 0/70 a week ago — 15 more articles shipped, all equally un-indexed). Every article
sampled for direct URL Inspection, old and new, still reads "Discovered — currently not
indexed." This is the same young-domain, no-backlinks-yet state flagged last week, now one
week further into the wait — not yet at the two-week-post-resubmission mark (2026-08-06)
that last week's report set as the point to escalate, but close to it.

Separately, the roadmap's `todo` queue has shrunk to **8 content items + 2 technical
tasks** — about 1.6 nightly batches of runway at 5 articles/night. Last week's queue (15
items) didn't need attention; this week's does.

---

## Data Sources

| Source | Status | Notes |
|--------|--------|-------|
| Google Search Console | **Working** | Queries/pages/sitemap-status/URL Inspection all returned data. |
| DataForSEO | **Operational** | SERP checked for all 15 newly-published articles + an 8-keyword cross-market spot-check of previously-published ones (see methodology note below). |
| Bing Webmaster | **Skipped** | `BING_API_KEY` / `BING_SITE_URL` not set in this environment. |

---

## GSC: Top Queries (28 days, 3 Jul – 31 Jul 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health africa | 0 | 1 | 0% | 4.0 |
| better health application | 0 | 1 | 0% | 75.0 |
| boohoo south africa | 0 | 1 | 0% | 33.0 |
| join better health | 0 | 1 | 0% | 41.0 |

Same four queries as last week, all branded/navigational, all still 1 impression apiece
("boohoo south africa" remains an unrelated stray). **Still zero blog/content queries.**
With 0 pages indexed, this is expected — there is nothing in the index for a health-topic
search to surface.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 5 | 10 | 50% | 2.1 |
| app.betterhealth.africa/ | 4 | 5 | 80% | 1.4 |
| app.betterhealth.africa/join | 0 | 3 | 0% | 40.7 |
| www.betterhealth.africa/pricing/ | 0 | 3 | 0% | 4.3 |
| www.betterhealth.africa/about(/) | 0 | 4 (2+2) | 0% | ~2.8 |
| www.betterhealth.africa/what-we-test/ | 0 | 2 | 0% | 4.0 |
| www.betterhealth.africa/how-it-works(/) | 0 | 2 (1+1) | 0% | ~2.5 |
| 10× `?be=...` referral short-links | 0 | 1 each | 0% | 3–80 |

20 rows total; **none are `/blog/` pages.** Every row is the marketing site, the app
shell, or referral short-links — exactly the surface Google already indexes. This matches
the 0/85-indexed sitemap figure precisely.

---

## Indexation Status (GSC URL Inspection, sampled 2 Aug 2026)

Re-checked the same 10-article sample as W31, plus confirmed the pattern holds:

| Article | Coverage state | vs. W31 |
|---|---|---|
| hba1c-explained | Discovered - currently not indexed | Unchanged |
| fatty-liver-disease-explained | Discovered - currently not indexed | Unchanged |
| preventable-diseases-preventive-healthcare-ghana | Discovered - currently not indexed | Unchanged |
| malaria-test-explained | Discovered - currently not indexed | Unchanged |
| hiv-test-explained | Discovered - currently not indexed | Unchanged |
| gestational-diabetes-test | Discovered - currently not indexed | Unchanged |
| perimenopause-menopause-test | Discovered - currently not indexed | Unchanged |
| blood-test-kumasi | Discovered - currently not indexed | Unchanged |
| blood-test-pretoria | Discovered - currently not indexed | Unchanged |
| blood-test-accra | Discovered - currently not indexed | **Changed** (was "URL is unknown to Google" in W31; now discovered) |

**Sitemap:** `https://betterhealth.africa/sitemap.xml`, last submitted 2026-07-23, last
downloaded by Google 2026-07-30, **85 URLs submitted, 0 indexed** (was 70/0 last week — the
15 articles published since W31 are already in the sitemap and already discovered, just not
yet crawled into the index).

One data-quality note: an early inspection attempt this run for `hba1c-explained` returned
a transient "URL is unknown to Google" / `HTTP 503 DNS resolution failure`, which cleared on
retry a few seconds later to the expected "Discovered - currently not indexed." Treat single
inspection calls as noisy; the retried/repeated reads above are the reliable signal.

---

## SERP Positions (DataForSEO)

**Methodology change this week:** with the index still at 0/85, a non-indexed page cannot
rank — re-querying all 66 published keywords every week reproduces "not in top 20" at real
API cost with no new information. This week checked:

1. **All 15 newly-published articles'** primary keywords (their first-ever SERP check), in
   their target market, depth 20.
2. **An 8-keyword spot-check** spanning all 4 markets, drawn from previously-published
   articles, to confirm the "not in top 20" pattern still holds and nothing has moved.

| Keyword | Market | Result |
|---|---|---|
| mammogram screening | South Africa | not in top 20 |
| colon cancer screening | South Africa | not in top 20 |
| allergy test | South Africa | not in top 20 |
| breast cancer screening | Pan-Africa (Ghana) | not in top 20 |
| tuberculosis test | Pan-Africa (Ghana) | not in top 20 |
| blood test Abuja | Nigeria | not in top 20 |
| blood test Port Harcourt | Nigeria | not in top 20 |
| blood test Mombasa | Kenya | not in top 20 |
| blood test Kisumu | Kenya | not in top 20 |
| how to increase testosterone | Ghana | not in top 20 |
| yellow fever | Nigeria | not in top 20 |
| cholera symptoms | Kenya | not in top 20 |
| blood test Cape Town | South Africa | not in top 20 |
| blood test Ibadan | Nigeria | not in top 20 |
| blood test Eldoret | Kenya | not in top 20 |
| *Spot-check:* hba1c test | Ghana | not in top 20 (unchanged) |
| *Spot-check:* health screening Ghana | Ghana | not in top 20 (unchanged) |
| *Spot-check:* malaria test | Pan-Africa (Ghana) | not in top 20 (unchanged) |
| *Spot-check:* blood test Lagos | Nigeria | not in top 20 (unchanged) |
| *Spot-check:* health screening Kenya | Kenya | not in top 20 (unchanged) |
| *Spot-check:* diabetes test | South Africa | not in top 20 (unchanged) |
| *Spot-check:* blood test Accra | Ghana | not in top 20 (unchanged) |
| *Spot-check:* genotype test | Nigeria | not in top 20 (unchanged) |

**23 of 23 checked this week: not in top 20.** No exceptions, no movement — fully
consistent with 0/85 indexed. Published-article count grew from 51 (W31) to 66 this week
(15 shipped: mammogram, colon-cancer, allergy, breast-cancer-screening, tuberculosis,
blood-test-abuja/port-harcourt/mombasa/kisumu, testosterone, yellow-fever, cholera,
blood-test-cape-town/ibadan/eldoret).

---

## AI Citation (GEO) Scoreboard

| Query | W28 | W29 | W30 | W31 | W32 |
|---|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet* |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet | Not yet* |

**Still no article-level AI citations after 7 weeks.** Results remain dominated by
PMC/PubMed, Cleveland Clinic, Healthline, healthdirect, and similar international sources.

\* Two queries now surface the **betterhealth.africa homepage** (not the specific
article) in the raw organic web-search results — a first low-level visibility signal, but
not an AI-answer citation of article content, so still scored "Not yet" here. Worth
watching: this is what usually precedes article-level indexation/citation.

---

## Week-over-Week Movement

- **SERP positions:** 0 movement, 7th week running — expected while the index sits at 0.
- **Indexed count:** still 0, now against 85 submitted URLs (was 70). One more full week
  post-resubmission (2026-07-23) with no movement; the escalation checkpoint set last week
  is 2026-08-06 (two weeks post-submission) — not yet reached, but only 4 days out.
- **GSC branded queries:** essentially flat; "better health africa" position drifted
  3.3 → 4.0 and its one click dropped to zero — not a meaningful signal at 1-4 impressions/
  query, just sampling noise.
- **GSC pages:** `www.betterhealth.africa/` CTR improved 25% → 50% (4→5 clicks on fewer
  impressions, 16→10); `app.betterhealth.africa/` unchanged (4 clicks/5 impressions/80%
  CTR/1.4 position in both windows, likely the same underlying sessions given the 28-day
  windows overlap by 3 weeks). New low-volume rows appeared for `/about`, `/how-it-works`,
  `/pricing/`, `/what-we-test/` — all 1-3 impressions, no material signal.
- **GEO citations:** no change in citation status; homepage's incidental appearance in 2 of
  5 raw searches is new this week (see above).

---

## Quick Wins

**None available yet** — same conclusion as every prior week. Quick-win detection (GSC
queries at position 5-20, or indexed pages with low CTR) requires indexed content
generating health-topic impressions; GSC's only impressions remain branded/navigational.

## Gaps

- **No new GSC-sourced keyword gaps this week** — no health-topic query data exists yet to
  mine for gaps.
- **Todo queue needs attention.** Only **8 content items** remain
  (`art-dengue-fever` 4,400/mo Kenya, `art-prolactin-test` 720/mo Nigeria, `art-pcos-test`,
  `art-hepatitis-a-test` 10/mo Ghana, `local-kano`, `local-enugu`, `local-nakuru`,
  `local-bloemfontein`) plus 2 technical tasks (OG images, programmatic biomarkers pages).
  At 5 articles/night that's roughly **1.6 nightly batches of runway** — comfortably fine
  for this week's run, tight for the one after. Flagged as a nightly-routine action item
  below rather than reordered now, since there's still no GSC gap data to drive new,
  data-justified additions this week.
- **PR backlog note:** the 2026-07-25 nightly run flagged a growing backlog of unmerged SEO
  PRs (#63, #64). As of this run there are **0 open pull requests** in the repository — the
  backlog has cleared. No action needed.

---

## Roadmap Changes

**No reordering.** With the index still at 0/85 and every checked keyword (old and new)
reading identically "not in top 20," there is no ranking or impression data this week that
differentiates one `todo` keyword from another. The existing order — set by DataForSEO
volume at the 2026-07-25 refill (dengue fever 4,400/mo leads, descending by volume/
confirmation) — already reflects the best available data and stands unchanged. No `done`
items were touched.

Updated `meta.updated` to 2026-08-02 and `meta.keyword_data` to record: (a) sitemap now at
85 submitted / 0 indexed (was 70/0), (b) this week's 23-keyword DataForSEO re-check
(15 new + 8-keyword cross-market spot-check, all "not in top 20," unchanged), (c) the
methodology shift to spot-checking previously-verified keywords rather than re-querying the
full published set every week while the index sits at 0, and (d) the queue-runway flag
(8 content items left).

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Escalation checkpoint on 2026-08-06** (two weeks after the 2026-07-23 sitemap resubmission): if the indexed count is still 0 at next week's run, escalate — check for thin-content/quality signals, build a first backlink or two, consider a Search Console "Request indexing" pass on the 5-10 oldest articles | Weekly routine, then human if it stalls | Not yet |
| 2 | **Refill the todo queue** — 8 content items left (~1.6 nightly batches). The nightly routine's own queue-refill logic handled this proactively last time (2026-07-25); flagging here so it isn't missed if that doesn't trigger again before the queue empties | Nightly routine / human | No — not urgent this week, will be next |
| 3 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — independent of Google's index status and worth having once available | Human | No |
| 4 | Once articles begin indexing, immediately re-run full GSC query/page reports for real quick-win and gap data, and resume checking all published keywords rather than spot-checking | Weekly routine | No (contingent on #1) |

---

*Generated by the seo-weekly routine · 2026-08-02*

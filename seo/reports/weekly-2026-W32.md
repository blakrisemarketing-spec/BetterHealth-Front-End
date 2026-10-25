# SEO Weekly: 2026-W32 (9 Aug 2026)

**Week 7 of reporting — week-over-week vs 2026-W31 (26 Jul 2026)**

---

## Headline: First confirmed indexation — 2 articles are now live in Google's index

After 7 weeks at 0, direct URL Inspection this week found **2 published articles now read
"Submitted and indexed"**: `fasting-blood-sugar-explained` and `lipid-profile-cholesterol-test`.
This is the first time any blog content has cleared indexation. Corroborating signals: the GSC
pages report shows the **first-ever blog page impression** (`fasting-blood-sugar-explained`,
1 impression, position 78), and the GSC queries report shows the **first-ever content-topic
query** ("fasting blood sugar how many hours fasting"), also position 78 — both are brand-new
this week, replacing last week's all-branded/navigational query set.

The `sitemap-status` report itself still shows **0/85 indexed**, which looks contradictory —
but this is a known GSC reporting lag: the sitemap coverage count updates on its own slower
cadence, while URL Inspection reflects live index state. Trust URL Inspection over the sitemap
figure when they disagree, as they do this week.

SERP rankings have not moved yet — expected, since ranking follows indexation with a delay, and
only 2 of 67 pages are indexed so far. The DataForSEO re-check on all 66 roadmap keywords (up
from 51 last week) came back unchanged: 0 in the top 20.

---

## Data Sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | Working | Queries/pages (28d), sitemap-status, and a 16-article URL Inspection sample |
| DataForSEO | Operational | SERP (Ghana/Nigeria/Kenya/South Africa, depth 20) for all 66 published articles' primary keywords |
| Bing Webmaster | **Skipped** | `BING_API_KEY` / `BING_SITE_URL` not configured — unchanged from every prior week |

---

## GSC: Top Queries (28 days, 10 Jul – 7 Aug 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health africa | 0 | 1 | 0% | 22 |
| better health application | 0 | 1 | 0% | 75 |
| ear hugs | 0 | 1 | 0% | 43 |
| **fasting blood sugar how many hours fasting** *(new)* | 0 | 1 | 0% | 78 |
| join better health | 0 | 1 | 0% | 41 |

5 distinct queries with any impressions (was 4 last week). "ear hugs" is an unrelated stray
impression (like last week's "boohoo south africa"). The notable change: for the first time, a
**content query** appears instead of only branded/navigational terms — direct evidence the
fasting-blood-sugar article is being crawled and served, even at a very weak position (78).

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 10 | 16 | 62.5% | 2.94 |
| app.betterhealth.africa/ | 2 | 4 | 50% | 2 |
| app.betterhealth.africa/join | 0 | 5 | 0% | 26.2 |
| www.betterhealth.africa/about/ | 0 | 4 | 0% | 5 |
| **www.betterhealth.africa/blog/fasting-blood-sugar-explained/** *(new)* | 0 | 1 | 0% | 78 |
| www.betterhealth.africa/how-it-works/ | 0 | 2 | 0% | 4 |
| www.betterhealth.africa/pricing/ | 0 | 2 | 0% | 5 |
| www.betterhealth.africa/what-we-test/ | 0 | 3 | 0% | 6.3 |
| (8 more rows: `?be=` referral short-links, 1 impression each) | — | — | — | — |

16 total rows (was 20). The homepage's clicks jumped 4 → 10 and CTR 25% → 62.5% week-over-week.
The headline change: **`/blog/fasting-blood-sugar-explained/` is the first blog article ever to
appear in this report**, matching the query-level finding above.

---

## Indexation Status (GSC, sampled 9 Aug 2026)

- **`sitemap-status`:** 85 URLs submitted (was 70), **0 indexed** per the sitemap report itself
  (this figure is known to lag — see headline).
- **URL Inspection, 16-article sample** (10 repeated from last week's sample + 6 new/recent):

| Article | Coverage state |
|---|---|
| fasting-blood-sugar-explained | **Submitted and indexed** *(new)* |
| lipid-profile-cholesterol-test | **Submitted and indexed** *(new)* |
| hba1c-explained | Discovered — currently not indexed |
| fatty-liver-disease-explained | Discovered — currently not indexed |
| preventive-health-screening-ghana | Discovered — currently not indexed |
| malaria-test-explained | Discovered — currently not indexed |
| hiv-test-explained | Discovered — currently not indexed |
| gestational-diabetes-test | Discovered — currently not indexed |
| perimenopause-menopause-test | Discovered — currently not indexed |
| blood-test-kumasi | Discovered — currently not indexed |
| blood-test-pretoria | Discovered — currently not indexed |
| blood-test-accra | Discovered — currently not indexed |
| full-blood-count-explained | Discovered — currently not indexed |
| high-blood-pressure-silent-killer | Discovered — currently not indexed |
| blood-test-eldoret | Discovered — currently not indexed |
| blood-test-cape-town | URL is unknown to Google |

2 of 16 sampled (12.5%) are indexed — up from 0 of 10 last week. `blood-test-cape-town` is one of
the most recently published articles and hasn't been discovered by Google's crawler yet, which is
normal for a brand-new URL.

**Reading this correctly:** this is early-stage but real progress, not yet a trend — 2 pages is a
small sample and there's no way yet to tell whether indexation continues at this pace or was a
one-off batch from the crawler working through the backlog. Next week's sample (repeating the
same 16 URLs plus new ones) will show whether the indexed count keeps growing.

---

## SERP Positions — All 66 Published Articles (DataForSEO)

All 66 published articles' primary keywords were checked against their target market
(Ghana/Nigeria/Kenya/South Africa, depth 20; pan-Africa items checked against Ghana). **Every
single one: not in top 20**, unchanged from W31. This is expected even with 2 pages now indexed —
freshly indexed pages typically take further weeks to accumulate enough ranking signal to enter
the top 20, especially for competitive high-volume terms like "fasting blood sugar normal range"
(1,300/mo) and "lipid profile test" (1,000/mo), which is exactly what got indexed first. No
errors on any of the 66 lookups.

Queue grew from 51 to 66 published articles since W31 (15 shipped, incl. breast-cancer-screening,
tuberculosis-test, blood-test-abuja/port-harcourt/mombasa/kisumu, bilharzia-schistosomiasis,
lassa-fever, perimenopause-menopause, gestational-diabetes, testosterone-test, yellow-fever,
cholera-symptoms, and local pages for Johannesburg, Durban, Pretoria, Cape Town, Ibadan, Eldoret).

---

## AI Citation (GEO) Scoreboard

| Query | W28 | W29 | W30 | W31 | W32 |
|---|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet | Not yet |

**Still no AI citations after 7 weeks of tracking.** Results for all five queries continue to be
dominated by PMC/PubMed, Frontiers, Cleveland Clinic, healthdirect, MedlinePlus, and similar
international authority sources — no betterhealth.africa presence in organic results or AI
summaries yet. Worth re-checking closely once more pages clear indexation and pick up any organic
ranking, since GEO citation requires organic visibility first.

---

## Week-over-Week Movement

- **Indexed count: 0 → 2 (of a 16-article sample).** The number to watch, per last week's action
  item #1 — it moved. Not yet a confirmed trend (see caveat above), but the first positive signal
  in 7 weeks of tracking.
- **SERP positions: 0 movement, 7th week running.** Consistent with only 2 pages being indexed —
  not enough signal yet to expect ranking movement.
- **GSC queries:** 4 → 5 distinct queries; first content-topic query appeared (was 100% branded/
  navigational + 1 stray). Total impressions still tiny (5 rows × 1 impression each).
- **GSC pages:** homepage clicks 4 → 10, CTR 25% → 62.5%; first blog page appeared in the report
  (fasting-blood-sugar-explained). Total distinct pages 20 → 16 (fewer stray `?be=` links this
  period, not a regression — those are one-off referral-link impressions).
- **Sitemap submitted count:** 70 → 85 URLs (tracks new articles published since W31).

---

## Quick Wins

**Still none available from GSC.** The one content query and one content page that now appear
both sit at position 78 with 1 impression — far outside the 5–20 "quick win" band, and with only
a single data point each, not yet a pattern to act on. Once indexed pages pick up enough impression
volume to show real positions in the 5–20 range, that becomes the first genuine quick-win signal;
worth re-running this check every week from here given indexation just started moving.

## Gaps

- **No new GSC-sourced keyword gaps this week** — same reasoning as prior weeks: impression volume
  is still too thin (5 queries, 1 impression each) to mine for un-targeted high-impression queries.
- **Todo queue is now low: 8 content items remain** (dengue fever, prolactin test, PCOS test,
  hepatitis A test, blood test Kano/Enugu/Nakuru/Bloemfontein) plus 2 technical tasks. This is
  **below the nightly routine's 10-item refill trigger** (`seo/playbook.md` §"Queue refill pass") —
  flagged as an action item below for the next nightly run to top up the queue before it runs dry.

---

## Roadmap Changes

**No reordering.** With only 2 pages indexed and every published keyword still "not in top 20,"
there still isn't ranking or impression data that differentiates one `todo` keyword from another
— the existing DataForSEO-volume-set order stands. No `done` items were touched.

Updated `meta.updated` to 2026-08-09 and `meta.keyword_data` to record: (a) the first confirmed
indexation (2 of 16 sampled articles), (b) the sitemap-status vs. URL-Inspection reporting-lag
discrepancy, (c) the first content query/page appearing in GSC, and (d) this week's full
66-keyword DataForSEO re-check (all unchanged, "not in top 20"), plus the low-queue flag.

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Keep watching the indexed count.** Repeat the URL Inspection sample next week (same 16 URLs + newest articles); if it climbs past 2, that confirms a real crawl-through-the-backlog trend worth calling out; if it stalls at 2, that's still fine at 7 weeks in, but worth a second look at 3+ weeks flat | Weekly routine | No |
| 2 | **Trigger the nightly's queue-refill pass.** Content `todo` items are down to 8, below the 10-item refill threshold in `seo/playbook.md` | Nightly routine | No — queue still has ~1.5 batches left, but should refill on the next run |
| 3 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — still unconfigured after 8+ weeks; Bing indexation is independent of Google's and feeds Copilot/GEO surfaces | Human | No |
| 4 | Once impression volume grows beyond single digits, re-run GSC quick-win/gap detection in full — the two new data points this week (fasting-blood-sugar query/page) are the first real signal but too thin to act on yet | Weekly routine | No (contingent on #1) |

---

*Generated by the seo-weekly routine · 2026-08-09*

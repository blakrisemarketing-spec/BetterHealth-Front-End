# SEO Weekly: 2026-W43 (25 Oct 2026)

**Previous report on file: 2026-W31 (26 Jul 2026). No weekly reports exist for W32 to W42, so deltas below are against W31 (a 12-week gap).**

## Headline

Nothing has moved in 12 weeks. Google still reports **0 of 113 sitemap URLs indexed**, no blog keyword ranks in the top 20, and GSC shows no health-topic queries. The one new signal is that Google has now crawled at least one article (lipid profile, last crawled 2026-09-08) and rejected it as "Crawled, currently not indexed". That is a quality/authority signal, not a discovery delay. Publishing more articles is unlikely to help until indexing is fixed.

## Data sources

| Source | Status |
|---|---|
| Google Search Console | Working |
| DataForSEO | Working. SERP checked for all 67 done items in their own market (Ghana/Nigeria/Kenya/South Africa; pan-africa checked as Ghana). Blood test Port Harcourt and Ibadan returned 0 results, so those two are unverified. |
| Bing Webmaster | Skipped, no creds |

## GSC top queries (28 days, 25 Sep to 23 Oct 2026)

| Query | Clicks | Impr. | CTR | Pos. |
|---|---|---|---|---|
| better health africa | 4 | 8 | 50% | 3.1 |
| better health | 0 | 19 | 0% | 26.8 |
| betterhealth | 0 | 5 | 0% | 5.6 |
| better health app | 0 | 1 | 0% | 30 |
| metabolic health check | 0 | 1 | 0% | 94 |

## GSC top pages (28 days)

| Page | Clicks | Impr. | CTR | Pos. |
|---|---|---|---|---|
| app.betterhealth.africa/ | 3 | 30 | 10% | 13.9 |
| www.betterhealth.africa/ | 3 | 25 | 12% | 18.5 |
| www.betterhealth.africa/about/ | 0 | 9 | 0% | 14.1 |
| app.betterhealth.africa/join | 0 | 3 | 0% | 5.7 |
| /blog/lipid-profile-cholesterol-test/ | 0 | 1 | 0% | 7.0 |

11 rows total; the lipid profile page is the only blog URL. It is the first blog impression in the report history.

## Indexation (GSC)

- Sitemap `sitemap.xml`: **113 submitted, 0 indexed**, 0 errors, last downloaded by Google 2026-10-22 (was 70 submitted / 0 indexed in W31).
- URL Inspection sample:

| URL | State |
|---|---|
| hba1c-explained | Discovered, not indexed |
| fatty-liver-disease-explained | Discovered, not indexed |
| cholera-symptoms-test | Discovered, not indexed |
| blood-test-accra | Unknown to Google (published about 14 Jul, still undiscovered) |
| lipid-profile-cholesterol-test | **Crawled, not indexed** (crawled 2026-09-08) |

## SERP positions (DataForSEO, depth 20)

All 67 published keywords: **not in top 20** (65 verified; Port Harcourt and Ibadan returned empty results). Same as every prior week. Keywords checked include fatty liver disease (1600/mo), fasting blood sugar normal range (1300), lipid profile test (1000), fbc test (1000), widal test (1000), lassa fever (4400), yellow fever (2400), gestational diabetes (2400).

## Week-over-week (vs W31)

| Metric | W31 | W43 | Change |
|---|---|---|---|
| Sitemap URLs submitted | 70 | 113 | +43 |
| Sitemap URLs indexed | 0 | 0 | 0 |
| Published articles | 51 | 67 (+1 manual) | +16 |
| Keywords in top 20 | 0 | 0 | 0 |
| Blog queries in GSC | 0 | 0 | 0 |
| Blog pages with impressions | 0 | 1 | +1 (1 impression) |
| Branded "better health africa" impr. | 4 | 8 | +4 |

## GEO / AI-citation scoreboard

| Query | Status |
|---|---|
| fatty liver disease Ghana | Not yet |
| fasting blood sugar normal range | Not yet |
| health screening Ghana | Not yet |
| hypertension symptoms Ghana | Not yet |
| fbc test meaning | Not yet |

Results were dominated by academic papers, Ghanaian news (GNA, Graphic) and international health sites. The FBC search surfaced betterhealth.vic.gov.au (Australia), a different site. I used web search only, so I could not see AI Overviews directly. This is the 12th straight "not yet".

## Quick wins and gaps

- **Quick wins:** none. The only content-relevant impression is lipid profile at position 7 on one impression, which is noise.
- **Gaps:** none from GSC, since there are no health-topic queries to mine. The existing todo queue already covers the highest-volume known terms.
- Brand query "better health" averages position 26.8 with 19 impressions. Other sites with similar names compete, so branded searches are a minor opportunity.

## Roadmap changes

Todo order unchanged (dengue fever 4400, prolactin 720, pcos, hepatitis A, 4 local pages, 2 technical tasks). With no ranking or query data there is no basis to reorder. No done items touched. Only `meta.updated` and `meta.keyword_data` were refreshed.

## Recommended actions (human)

| # | Action | 
|---|---|
| 1 | **Pause or slow nightly batches** until indexing starts. 16 more articles since W31 produced no index movement, and Google has crawled and declined at least one. |
| 2 | Build real authority: backlinks, partner/clinic mentions, Google Business Profile, links from app.betterhealth.africa and the main site into /blog/. |
| 3 | Audit crawled-not-indexed pages for thin or templated content (the 20+ "blood test <city>" pages are the likeliest quality risk). Add original data, local detail and clinician review. |
| 4 | Use "Request indexing" in Search Console on the 10 highest-value articles and check internal links to /blog/ from the homepage. |
| 5 | Set `BING_API_KEY` and `BING_SITE_URL` to get Bing data. |
| 6 | Weekly reports lapsed for W32 to W42; check the schedule. |

*Generated by the seo-weekly routine, 2026-10-25*

# SEO Weekly: 2026-W40 (4 Oct 2026)

Previous report in the repo is W31 (26 Jul). No W32-W39 reports exist, so deltas below are vs W31 (about 10 weeks).

## Headline

First content impressions and first indexed articles. Two blog pages are now "Submitted and indexed" and show up in GSC. No tracked keyword ranks in the top 20 yet and there are still no AI citations.

## Data sources

| Source | Status |
|---|---|
| Google Search Console | Working |
| DataForSEO | Working (66 published keywords checked, plus volume refresh) |
| Bing Webmaster | Skipped (BING_* creds not set) |

## GSC top queries (4 Sep - 2 Oct 2026)

| Query | Clicks | Impr. | Position |
|---|---|---|---|
| better health africa | 0 | 3 | 4.7 |
| better health app | 0 | 1 | 30 |

Still branded only. W31 had 4 queries, 1 click.

## GSC top pages

| Page | Clicks | Impr. | Position |
|---|---|---|---|
| app.betterhealth.africa/ | 5 | 7 | 5.4 |
| www.betterhealth.africa/ | 5 | 15 | 2.4 |
| app.betterhealth.africa/join | 0 | 5 | 5.0 |
| /about/ | 0 | 5 | 5.6 |
| /book-tests/ | 0 | 4 | 3.3 |
| /contact/ | 0 | 4 | 2.3 |
| **/blog/fasting-blood-sugar-explained/** | 0 | 3 | 6.0 |
| **/blog/lipid-profile-cholesterol-test/** | 0 | 3 | 6.3 |
| /faq/, /how-it-works/, /what-we-test/ | 0 | 2 each | 2.0 to 7.0 |

New vs W31: the first two `/blog/` pages appear. Marketing pages also now get impressions.

## Indexation (URL Inspection)

| URL | State | Last crawl |
|---|---|---|
| fasting-blood-sugar-explained | Submitted and indexed | 2026-09-21 |
| lipid-profile-cholesterol-test | Submitted and indexed | 2026-09-08 |
| hba1c-explained | URL is unknown to Google | n/a |

Sitemap: 113 URLs submitted, last downloaded 2026-10-01, 0 errors. The sitemap report still says 0 indexed even though URL Inspection shows two indexed, so that counter looks stale. Treat URL Inspection as the source of truth. hba1c-explained (the oldest article) being unknown to Google is worth a manual check.

## SERP positions (DataForSEO, depth 20)

All 66 published primary keywords across Ghana, Nigeria, Kenya and South Africa: **not in top 20**. Same as W31. The two pages with GSC impressions (fasting blood sugar, lipid profile) are at position 6 for some queries in GSC, but not for the tracked head keywords.

## AI citation (GEO) scoreboard

| Query | W31 | W40 |
|---|---|---|
| fatty liver disease Ghana | Not yet | Not yet |
| fasting blood sugar normal range | Not yet | Not yet |
| health screening Ghana | Not yet | Not yet |
| lipid profile cholesterol test Ghana | n/a | Not yet |

Results are dominated by PMC, MedlinePlus, Cleveland Clinic, Mayo and Ghanaian news. Web search is US-only, so this check is a rough proxy.

## Week-over-week

- Blog pages with impressions: 0 to 2.
- Indexed articles confirmed: 0 to at least 2 (of 3 inspected).
- Branded queries: 4 to 2; clicks on the domain stayed flat (about 10).
- Ranked keywords: 0 to 0.
- Published articles: 51 to 66.

## Quick wins

- **fasting-blood-sugar-explained**: position about 6 with impressions. DataForSEO shows "fasting blood sugar" at 480/mo in Ghana. Improve title and meta, add a normal range table up top, internal links from prediabetes and hba1c posts.
- **lipid-profile-cholesterol-test**: position about 6.3. "cholesterol test" is 140/mo Ghana and 720/mo South Africa. Same on-page treatment.
- Request indexing for hba1c-explained and the rest of the top-volume articles (fatty liver, FBC, hypertension) in Search Console.

## Gaps

- **hiv test, South Africa: 5,400/mo** (high competition) vs 320/mo in the market our existing HIV article targets. Added to the roadmap.
- cholesterol test, South Africa: 720/mo, candidate for a regional retarget of the lipid article.
- Local pages (Kano, Enugu, Nakuru, Bloemfontein) still return no volume.

## Roadmap changes

- Refreshed volumes: prolactin test 720 to 590 (Nigeria); pcos test null to 210 (Nigeria).
- Todo order is now: dengue fever, prolactin, pcos, **new: hiv test South Africa**, hepatitis A, then the four local pages.
- Added `art-hiv-test-south-africa`. No `done` items touched.
- Updated `meta.updated` and `lastWeeklyRun`.

## Actions

| # | Action | Owner |
|---|---|---|
| 1 | Check why hba1c-explained is unknown to Google; request indexing | Human |
| 2 | On-page refresh of the two articles at position about 6 | Nightly or human |
| 3 | Set BING_API_KEY and BING_SITE_URL | Human |
| 4 | Build first backlinks (seo/backlinks.md) | Human |

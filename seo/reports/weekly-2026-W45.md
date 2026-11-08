# SEO Weekly: 2026-W45 (8 Nov 2026)

Compared against the last report on file, 2026-W31 (26 Jul 2026). There are no reports for W32 to W44, so the movement below is a 15-week comparison, not week-over-week.

## Headline

Content pages are starting to appear in Google. In W31 every GSC query was branded and no blog page had impressions. This period GSC shows non-branded health queries (lipid panel, uric acid, KFT) and impressions on `/test/lipid-panel`, `/test/uric-acid`, `/test/hepatitis-b` and one blog page. No article keyword ranks in the top 20 yet, and there are still no AI citations.

## Data sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | Working | 28 days, 9 Oct to 6 Nov 2026 |
| DataForSEO | Working | SERP for 66 published article keywords, using each article's market (Ghana, Nigeria, Kenya, South Africa); volume for new keyword ideas |
| Bing Webmaster | Skipped | `BING_API_KEY` / `BING_SITE_URL` not configured |

## GSC top queries (28 days)

| Query | Clicks | Impr. | Position |
|---|---|---|---|
| better health | 0 | 14 | 35.3 |
| betterhealth | 0 | 11 | 5.2 |
| does kft show uric acid | 0 | 3 | 40.7 |
| better health africa | 2 | 2 | 3.0 |
| lipid profile test price | 0 | 1 | 48.0 |
| what is a cholesterol panel | 0 | 1 | 43.0 |
| lipid panel testing | 0 | 1 | 81.0 |
| lipid panel test cost | 0 | 1 | 80.0 |
| lipid panel test | 0 | 1 | 84.0 |
| metabolic health check | 0 | 1 | 94.0 |
| uric acid | 0 | 1 | 98.0 |
| better heath / better health cardiff | 0 | 1 each | 5.0 / 84.0 |

13 queries in total. 9 are non-branded health queries, up from 0 in W31.

## GSC top pages (28 days)

| Page | Clicks | Impr. | Position |
|---|---|---|---|
| www.betterhealth.africa/ | 3 | 39 | 17.2 |
| app.betterhealth.africa/ | 1 | 30 | 15.8 |
| /test/lipid-panel/ | 0 | 18 | 39.6 |
| /contact/ | 0 | 13 | 21.9 |
| /test/uric-acid/ | 0 | 13 | 29.2 |
| /about/ | 0 | 12 | 23.8 |
| /how-it-works/ | 0 | 9 | 3.1 |
| /test/uric-acid (no slash) | 0 | 8 | 7.5 |
| /test/hepatitis-b and /test/hepatitis-b/ | 0 | 7 each | 7.4 / 6.4 |
| /test/lipid-panel (no slash) | 0 | 7 | 5.4 |
| /blog/perimenopause-menopause-test | 0 | 2 | 79.5 |
| /blog | 0 | 1 | 2.0 |

30 rows in total. The rest are site pages, UTM-tagged links and app pages with 1 to 6 impressions each. Blog articles are almost absent (2 of 30 rows). The same `/test/` pages appear with and without a trailing slash, so Google is seeing duplicate URL variants. Check canonicals and redirects.

Indexation: the sitemap API reports 119 URLs submitted and 0 indexed (last downloaded 1 Nov). That counter contradicts the page impressions above, so treat it as unreliable and rely on page-level data. It was 70 submitted and 0 indexed in W31.

## SERP positions (DataForSEO)

All 66 published articles' primary keywords checked in their target market. Every one is "not in top 20", the same as every prior report. The full list is in `seo/roadmap.yml` (`status: done`). The corpus grew from 51 to 66 articles since W31.

## Movement vs W31

| Metric | W31 | W45 |
|---|---|---|
| Distinct GSC queries | 4 (all branded) | 13 (9 non-branded health) |
| Blog pages with impressions | 0 | 2 rows (perimenopause article, /blog) |
| `/test/` pages with impressions | 0 | 3 |
| Article keywords in top 20 | 0 of 51 | 0 of 66 |
| Branded clicks | 1 | 6 (home 3, app 1, "better health africa" 2) |

## GEO / AI-citation scoreboard

Checked by web search this run. No betterhealth.africa result appeared for any query.

| Query | W31 | W45 |
|---|---|---|
| fatty liver disease Ghana | Not yet | Not yet |
| health screening Ghana | Not yet | Not yet |
| fasting blood sugar normal range | Not yet | Not yet |
| does kft show uric acid | n/a | Not yet |
| lipid panel test cost Ghana | n/a | Not yet |

Web search here is US-only, so it is a rough proxy for Ghana results. The fasting blood sugar query mostly returned junk pages on unrelated domains.

## Quick wins

| Target | Evidence | Action |
|---|---|---|
| `/test/lipid-panel` and the lipid profile article | 18 impressions at 39.6 for the page; five lipid cost/price/testing queries at 43 to 84 | Add price-factor and "what is included" sections to the lipid article, link from `/test/lipid-panel`, tighten title and meta around "lipid panel test cost" |
| `/test/uric-acid` | 13 + 8 impressions, positions 29 and 7.5 | Cross-link to `uric-acid-gout-test`; add a normal-range section ("uric acid test normal range" is 90/mo in Nigeria) |
| `/test/hepatitis-b` | 14 impressions at 6 to 7 | Cross-link to the hepatitis B article. This is the closest to page 1 |
| Trailing-slash duplicates | `/test/*` pages appear in both forms | Confirm one canonical form and 301 the other |

## Gaps

- **KFT and uric acid.** "does kft show uric acid" gets impressions and no page targets it. `kft test` is 110/mo in Nigeria, 70 in Ghana, 30 in Kenya.
- **Lipid panel cost.** Nigeria 110/mo, Kenya 90, Ghana 40 for "price/cost", all LOW competition. `lipid panel test` itself is 2,400/mo in Nigeria and 1,300 in Kenya.
- **Metabolic health check.** 1 impression, 10/mo Nigeria. Low priority.

## Roadmap changes

- Added `art-kft-uric-acid` (kft test, Nigeria, 110/mo) and `art-lipid-panel-cost` (lipid panel test cost, Nigeria, 110/mo), both sourced from GSC.
- Placed them third and fourth in the todo queue, after dengue (4,400/mo) and prolactin (720/mo) and ahead of PCOS, hepatitis A and the local city pages.
- Left dengue and prolactin in place. No `done` items touched.
- Updated `meta.updated` and `meta.keyword_data`; set `lastWeeklyRun` in `progress.json`.

## Action items

| # | Action | Owner |
|---|---|---|
| 1 | Merge or close the open SEO PRs before the next nightly batch | Human |
| 2 | Fix trailing-slash duplicates on `/test/*` (canonical or redirect) | Human / dev |
| 3 | Improve the lipid and uric acid articles per Quick wins | Nightly or human |
| 4 | Set `BING_API_KEY` and `BING_SITE_URL` | Human |
| 5 | Weekly reports W32 to W44 are missing. Check that the routine ran | Human |

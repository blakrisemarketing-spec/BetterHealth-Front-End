# SEO Weekly: 2026-W44 (1 Nov 2026)

Note: the previous report is W31 (26 Jul 2026). There is a 13-week gap, so deltas below are vs W31, not week-over-week.

## Data sources

| Source | Status |
|---|---|
| Google Search Console | Working (28d window 2 Oct to 30 Oct 2026) |
| DataForSEO | Working. SERP depth 20 for 66 published items' primary keywords, in each item's market |
| Bing Webmaster | Skipped (no BING_* creds) |
| AI-citation check | 4 queries via web search |

## Headline

- Sitemap: 113 URLs submitted, **0 indexed** (last downloaded by Google 22 Oct 2026). Was 70 submitted / 0 indexed in W31.
- First blog URL to show in GSC: /blog/lipid-profile-cholesterol-test/ (1 impression, pos 7). URL Inspection says "Crawled - currently not indexed" (last crawl 8 Sep). Google has looked at it and declined, which is a quality/authority signal, not a discovery delay.
- hba1c-explained and blood-test-accra: still "Discovered - currently not indexed". uric-acid-test-gout: "URL is unknown to Google".
- All 66 tracked keywords: **not in top 20**, unchanged.

## GSC top queries (28d)

| Query | Clicks | Impr. | CTR | Pos |
|---|---|---|---|---|
| better health | 0 | 19 | 0% | 28.6 |
| betterhealth | 0 | 8 | 0% | 5.4 |
| better health africa | 4 | 6 | 67% | 3.2 |
| does kft show uric acid | 0 | 3 | 0% | 40.7 |
| better health cardiff | 0 | 1 | 0% | 84 |
| better heath | 0 | 1 | 0% | 5.0 |
| lipid panel test | 0 | 1 | 0% | 84 |
| lipid panel testing | 0 | 1 | 0% | 81 |
| metabolic health check | 0 | 1 | 0% | 94 |
| uric acid | 0 | 1 | 0% | 98 |

vs W31: 10 queries (was 4). Branded clicks 4 (was 1). First non-branded health queries appeared, all page 4+.

## GSC top pages (28d)

| Page | Clicks | Impr. | Pos |
|---|---|---|---|
| app.betterhealth.africa/ | 3 | 37 | 14.7 |
| www.betterhealth.africa/ | 4 | 36 | 18.4 |
| /test/uric-acid/ (+ no-slash variant 8 impr, pos 7.5) | 0 | 13 | 29.2 |
| /test/lipid-panel/ (+ variant 7 impr, pos 5.4) | 0 | 12 | 31.4 |
| /about/ | 0 | 11 | 25.1 |
| /how-it-works/ | 0 | 9 | 3.1 |
| /test/hepatitis-b (two variants) | 0 | 14 | 6.4 to 7.4 |
| /blog/lipid-profile-cholesterol-test/ | 0 | 1 | 7.0 |

27 page rows total. The non-blog /test/* pages are earning the health-topic impressions, not the blog. Note slash and no-slash variants of the same /test/ URLs both appear, so canonicalisation is worth checking.

## SERP positions (DataForSEO, 66 done items)

All 66 primary keywords: **not in top 20** in Ghana/Nigeria/Kenya/South Africa as per each item's market. Zero movement vs W31 (51 tracked then, 66 now). Expected given 0 indexed.

## AI-citation (GEO) scoreboard

| Query | W31 | W44 |
|---|---|---|
| fatty liver disease Ghana | Not yet | Not yet |
| fasting blood sugar normal range | Not yet | Not yet |
| health screening Ghana | Not yet | Not yet |
| does KFT show uric acid | n/a | Not yet |

Results are dominated by PMC/NCBI, Ghanaian news outlets, 1mg/Redcliffe (KFT) and low-quality spam domains. Hypertension and FBC queries were not re-run this week. I could not check Google AI Overviews directly; this is organic web search only.

## Quick wins

1. **"does kft show uric acid"**: 3 impressions at pos 40.7 with no matching page. Cheap to target, and the KFT topic itself has volume (kidney function test 1,000/mo Ghana).
2. **/test/uric-acid and /test/lipid-panel**: ~20 impressions each at pos 5 to 30 across variants. Strengthen internal links from the matching blog articles (uric-acid-gout, lipid-profile) to these pages and vice versa.
3. **lipid-profile-cholesterol-test**: the only blog page Google has crawled. It is the best test bed for what makes Google decline to index (thin content, duplicate of /test/lipid-panel, no inbound links). Worth a human content review.

## Gaps

- No health queries yet for any other article. Indexing is the bottleneck, not targeting.
- Kidney function / KFT has no dedicated article (creatinine-egfr only). Added to roadmap.
- Backlinks: the "Discovered/Crawled - not indexed" pattern on a domain with no inbound links points to off-site authority as the highest-leverage fix (see seo/backlinks.md).

## Roadmap changes

- Added `art-kidney-function-test-kft` at the top of the todo queue (1,000/mo Ghana, LOW competition; GSC impression evidence).
- Refreshed dengue fever volume note: 590/mo Ghana re-checked (4,400/mo Kenya from 2026-07-25 stands). Order unchanged.
- DataForSEO Ghana refresh: prolactin test 210, pcos test 50, uric acid test 210, lipid panel test 1,000, kft test 70.
- Done items untouched. Remaining todo order otherwise unchanged: no ranking data differentiates them yet.
- Recommend a human pause on publishing more articles until indexing is diagnosed: 113 URLs submitted, 0 indexed, and further volume risks reading as thin/programmatic content.

## Caveats

- GSC window is 2 to 30 Oct; impression counts are tiny, so treat patterns as directional only.
- Previous PR backlog status (#63, #64 etc.) was not re-checked this run.

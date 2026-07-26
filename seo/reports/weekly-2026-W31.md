# SEO Weekly: 2026-W31 (26 Jul 2026)

**Week 6 of reporting — week-over-week vs 2026-W30 (19 Jul 2026)**

---

## Headline: GSC access is unblocked, and it directly confirms the indexation hypothesis

After 5 straight weeks of `HTTP 403` on the Search Console API, **GSC access now works.** The
first real read confirms what 5 weeks of DataForSEO "not in top 20" results could only imply:

> **Sitemap coverage: 70 URLs submitted, 0 indexed.**

Direct URL Inspection on a 10-article sample (old and new) mostly returns **"Discovered —
currently not indexed"** rather than "unknown to Google" — meaning Google *has* found these
pages (via the sitemap, submitted 2026-07-23) but has not yet chosen to crawl/index them. That
is a materially different, less alarming diagnosis than last week's working theory of a
technical blocker: it is the ordinary, common state for a young, low-authority domain with no
inbound links yet, and it is expected to resolve as Google works through its crawl queue — not
evidence of a penalty, block, or ongoing bug.

---

## Data Sources

| Source | Status | Notes |
|--------|--------|-------|
| Google Search Console | **Working (first successful pull, 6th week of trying)** | Service account access resolved. Query/page reports return real (if still tiny) data; URL Inspection confirms indexation state directly. |
| DataForSEO | **Operational** | SERP (Ghana/Nigeria/Kenya/South Africa, depth 20) for all 51 published articles' primary keywords |
| Bing Webmaster | **Skipped** | `BING_API_KEY` / `BING_SITE_URL` not configured |

---

## GSC: Top Queries (28 days, 26 Jun – 24 Jul 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health africa | 1 | 4 | 25% | 3.3 |
| better health application | 0 | 1 | 0% | 75 |
| boohoo south africa | 0 | 1 | 0% | 33 |
| join better health | 0 | 1 | 0% | 41 |

Only 4 distinct queries with any impressions in 28 days, all branded/navigational (one — "boohoo
south africa" — is an unrelated stray impression). **Zero blog/content queries appear.** This is
the expected footprint of a site whose content pages aren't indexed yet: nothing to search for
means nothing to show impressions for.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| app.betterhealth.africa/ | 4 | 5 | 80% | 1.4 |
| www.betterhealth.africa/ | 4 | 16 | 25% | 2.3 |
| app.betterhealth.africa/join | 0 | 3 | 0% | 40.7 |
| (16 more rows, each 1 impression) | — | — | — | — |

20 total rows returned; **none are `/blog/` pages.** The remaining 17 rows are the app's referral
short-links (`?be=...`) and the homepage — i.e. exactly the pages Google already indexes. This
matches the sitemap's "0 indexed" figure precisely: the blog corpus has no impressions because it
isn't in the index yet, not because it's ranking poorly.

---

## Indexation status (GSC URL Inspection, sampled 26 Jul 2026)

| Article | Published | Coverage state |
|---|---|---|
| hba1c-explained | 2026-06-20 (oldest) | Discovered — currently not indexed |
| fatty-liver-disease-explained | 2026-06-21 | Discovered — currently not indexed |
| preventable-diseases-preventive-healthcare-ghana | (manual) | Discovered — currently not indexed |
| malaria-test-explained | 2026-06-?? | Discovered — currently not indexed |
| hiv-test-explained | 2026-06-?? | Discovered — currently not indexed |
| gestational-diabetes-test | 2026-07-17 | Discovered — currently not indexed |
| perimenopause-menopause-test | 2026-07-17 | Discovered — currently not indexed |
| blood-test-kumasi | recent | Discovered — currently not indexed |
| blood-test-pretoria | 2026-07-17 (newest) | Discovered — currently not indexed |
| blood-test-accra | 2026-07-14 | URL is unknown to Google |

9 of 10 sampled articles — spanning the oldest (5+ weeks old) to the newest — read
**"Discovered — currently not indexed."** Sitemap: `https://betterhealth.africa/sitemap.xml`,
last submitted 2026-07-23, last downloaded by Google 2026-07-25, 70 URLs submitted, **0 indexed**.

**Reading this correctly:** "Discovered — currently not indexed" is not an error state. Google
found the URL and is choosing not to spend crawl budget on it yet — typical for a domain with
no backlink profile. It is not the same finding as prior weeks' inference (which, before direct
GSC access, could not distinguish "not indexed" from "blocked/broken"). The sitemap was only
recently (re-)submitted (2026-07-23), so this week's 0-indexed count is an early read, not a
multi-week-confirmed stall.

---

## SERP Positions — All 51 Published Articles (DataForSEO)

All 51 published articles' primary keywords were checked against their target market
(Ghana/Nigeria/Kenya/South Africa, depth 20). **Every single one: not in top 20**, unchanged from
W30. Full list omitted here since none moved — see `seo/roadmap.yml` items for keyword/market
detail per slug. This is fully consistent with the "0 indexed" sitemap figure above: a page
outside Google's index cannot rank in Google's SERPs.

Queue grew from 41 to 51 published articles since W30 (10 shipped: diabetes-test-types,
bilharzia-schistosomiasis, lassa-fever, perimenopause-menopause, gestational-diabetes, plus
local pages for Johannesburg, Durban, Pretoria, and syphilis-test / sperm-count-fertility). All
newly-checked keywords also came back "not in top 20" on first read — the same pattern every
batch has shown since week 1.

---

## AI Citation (GEO) Scoreboard

| Query | W27 | W28 | W29 | W30 | W31 |
|---|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet | Not yet |

**Still no AI citations after 6 weeks of tracking.** Results for all five queries continue to be
dominated by PMC/PubMed, Cleveland Clinic, healthdirect, MedlinePlus, and similar international
authority sources — no betterhealth.africa presence in organic results or AI summaries. Expected,
given 0 pages are indexed: GEO citation requires organic indexation first.

---

## Week-over-Week Movement

- **SERP positions: 0 movement, 6th week running** — expected, now explained directly by the
  sitemap's 0-indexed count rather than inferred.
- **GSC data: first successful pull.** No prior week's GSC numbers exist to diff against; this
  report is the new baseline. Next week's report will be the first true GSC week-over-week
  comparison.
- **Indexed count:** 0 this week (first read). This is now the number to watch — if it stays at
  0 for multiple weeks after the 2026-07-23 sitemap submission, that would indicate a genuine
  stall worth escalating; a single week at 0 shortly after submission does not.

---

## Quick Wins

**None available yet.** GSC quick-win detection (queries at position 5–20, high-impression/
low-CTR pages) needs indexed content generating impressions on health topics. Right now GSC's
only impressions are branded/navigational. Once articles begin indexing, this becomes the
highest-value weekly check — flag it as the first thing to re-run once the indexed count moves
off 0.

## Gaps

- **No new GSC-sourced keyword gaps this week** — the query report has no health-topic queries
  to mine yet (0 indexed pages → 0 organic health-query impressions). Once indexation starts,
  re-run this analysis; today it would just reproduce the existing roadmap.
- **Todo queue is healthy** — 15 `status: todo` article items remain (mammogram, colon cancer,
  allergy, breast cancer, tuberculosis, blood test Abuja/Port Harcourt/Mombasa/Kisumu,
  testosterone, yellow fever, cholera, blood test Cape Town/Ibadan/Eldoret) plus 2 technical
  tasks. At 5 articles/night this covers 3 more nightly batches — no refill needed this week
  (unlike W30, when the queue was down to 1 item).

---

## Roadmap Changes

**No reordering.** With no ranking or impression data yet to differentiate one `todo` keyword
from another (every published keyword reads identically "not in top 20," and GSC has no
content-query data), there is no data-driven basis to re-prioritize the todo queue this week.
The existing order (set by DataForSEO volume at authoring time) stands. No `done` items were
touched.

Updated `meta.updated` to 2026-07-26 and `meta.keyword_data` to record: (a) GSC access is now
working after 6 weeks blocked, (b) the sitemap-level 0/70-indexed finding, and (c) this week's
full 51-keyword DataForSEO re-check (all unchanged, "not in top 20").

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Watch the indexed count.** Re-run `gsc.mjs sitemap-status` next week; if it's still 0 two weeks after the 2026-07-23 submission, escalate (check for thin-content/quality signals, build a first backlink or two, consider a Search Console "Request indexing" pass on the highest-priority URLs) | Weekly routine, then human if it stalls | Not yet — one week at 0 post-submission is normal |
| 2 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — Bing indexation is independent of Google's and feeds Copilot/GEO surfaces, so it's worth checking even while Google indexing catches up | Human | No |
| 3 | Once articles begin indexing, immediately re-run the GSC query/page reports for real quick-win and gap data — this has been blocked for the entire 6-week reporting history and is the highest-value analysis this program has never yet been able to do | Weekly routine | No (contingent on #1) |
| 4 | No roadmap reprioritization action needed this week — todo queue is healthy (15 items); next nightly run can proceed normally | Nightly routine | No |

---

*Generated by the seo-weekly routine · 2026-07-26*

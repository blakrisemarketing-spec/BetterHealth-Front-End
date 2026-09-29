# SEO Weekly: 2026-W36 (6 Sep 2026)

**First weekly run in 6 weeks** — the last report was W31 (26 Jul 2026). The nightly
content routine has been paused throughout this gap (since 2026-07-26); the backlink
programme (`seo/backlinks.md`) has been the nominal active workstream, but its own
outreach tracking table is still empty — no links have been logged as built. All
"week-over-week" comparisons below are therefore really **six-week-over-six-week**,
not a normal weekly delta.

---

## Headline: the site's own indexation dashboard is wrong — real progress is happening that it doesn't show

`gsc.mjs sitemap-status` still reads **0 of 85 indexed**, unchanged in aggregate
since W31. Taken at face value, that would mean the backlink programme's own
declared success measure ("the GSC indexed count moving off 0") has not moved in six
weeks, and per that document's own decision rule, "if it stays at 0, links are the
binding constraint."

But this run also pulled the GSC **pages** report and did direct **URL Inspection**
per article, and those tell a different story: two blog articles —
`fasting-blood-sugar-explained` and `lipid-profile-cholesterol-test` — return
**"Submitted and indexed"** (last crawled 2026-08-31 and 2026-09-04) and are
generating real search impressions at position 8–9. Neither has had any backlink
built (the outreach log is empty). That means:

1. **The sitemap-status aggregate "indexed" count is not a reliable metric** — it is
   understating real indexation by at least 2 pages that URL Inspection and live GSC
   impressions both confirm are indexed. It should not be used alone to judge whether
   indexation is moving.
2. **Indexation has started without any backlink work.** That's evidence for the
   backlinks.md's own stated alternative: "if indexation starts moving after the PR
   #67 internal-link fix alone, the authority constraint was weaker than thought and
   this programme can stay lightweight." Two indexed, impression-generating articles
   with zero logged backlinks is a data point in that direction — worth a human
   decision on whether to resume the nightly content routine now rather than wait on
   outreach that hasn't started (see Action Items).

---

## Data Sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | Working | Query + page reports (28d), sitemap-status, URL Inspection (12 URLs) |
| DataForSEO | Operational | SERP (Ghana/Nigeria/Kenya/South Africa, depth 20) for all 66 `status: done` roadmap items' primary keywords |
| Bing Webmaster | Skipped | `BING_API_KEY` / `BING_SITE_URL` still not configured |

---

## GSC: Top Queries (28 days, 7 Aug – 4 Sep 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health | 0 | 3 | 0% | 71 |

Only **one** distinct query returned this period (down from 4 in the W31 baseline),
and it's a branded query sitting at a strikingly poor position (71) for a brand
search. This is most likely GSC's low-volume query anonymization threshold rather
than a real regression — the page report (below) shows more granular activity than
the query report does this period, which is consistent with individual queries being
too sparse to clear GSC's reporting threshold while the URLs they land on still
count. **No health-topic query is visible yet at the query level**, which is why
quick-win and gap detection (below) still can't run on real keyword data.

## GSC: Top Pages (28 days, 7 Aug – 4 Sep 2026)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 8 | 24 | 33.3% | 10.7 |
| www.betterhealth.africa/about/ | 0 | 6 | 0% | 18 |
| www.betterhealth.africa/pricing/ | 0 | 5 | 0% | 3.2 |
| app.betterhealth.africa/ | 0 | 4 | 0% | 24 |
| www.betterhealth.africa/contact/ | 0 | 4 | 0% | 3 |
| www.betterhealth.africa/faq/ | 0 | 4 | 0% | 3 |
| **www.betterhealth.africa/blog/fasting-blood-sugar-explained/** | 0 | 2 | 0% | 9 |
| **www.betterhealth.africa/blog/lipid-profile-cholesterol-test/** | 0 | 2 | 0% | 8 |
| www.betterhealth.africa/how-it-works/ | 0 | 3 | 0% | 5 |
| www.betterhealth.africa/what-we-test/ | 0 | 3 | 0% | 6 |
| app.betterhealth.africa/join | 0 | 2 | 0% | 8.0 |
| betterhealth.africa/?be=98101720335 | 0 | 2 | 0% | 1 |
| betterhealth.africa/?be=9810112537113 | 0 | 1 | 0% | 82 |

**First time ever that `/blog/` article pages appear in this report.** Every prior
weekly report (W26–W31) found zero blog URLs here; the corpus's only footprint was
the homepage and app referral links. These two now sit at position 8–9 — inside page
1 — which is a materially different state than "not yet indexed."

---

## Indexation status (GSC URL Inspection)

**The two pages found above:**

| Article | Coverage state | Last crawled |
|---|---|---|
| fasting-blood-sugar-explained | **Submitted and indexed** | 2026-08-31 |
| lipid-profile-cholesterol-test | **Submitted and indexed** | 2026-09-04 |

**Repeat of the exact 10-article sample from W31** (for a like-for-like check):

| Article | W31 (26 Jul) | W36 (6 Sep) |
|---|---|---|
| hba1c-explained | Discovered — not indexed | Discovered — not indexed |
| fatty-liver-disease-explained | Discovered — not indexed | Discovered — not indexed |
| preventable-diseases-preventive-healthcare-ghana | Discovered — not indexed | Discovered — not indexed |
| malaria-test-explained | Discovered — not indexed | Discovered — not indexed |
| hiv-test-explained | Discovered — not indexed | Discovered — not indexed |
| gestational-diabetes-test | Discovered — not indexed | Discovered — not indexed |
| perimenopause-menopause-test | Discovered — not indexed | **URL is unknown to Google** (regressed) |
| blood-test-kumasi | Discovered — not indexed | Discovered — not indexed |
| blood-test-pretoria | Discovered — not indexed | Discovered — not indexed |
| blood-test-accra | URL is unknown to Google | **Discovered — not indexed** (improved) |

Net movement in this specific sample is a wash (8 unchanged, 1 better, 1 worse) —
the real progress this week is *outside* this sample, in the two pages the GSC pages
report surfaced. **Sitemap-status:** 85 URLs submitted (up from 70), lastDownloaded
2026-09-02, **still reads 0 indexed** — the discrepancy this report's headline is
about.

---

## SERP Positions — All 66 Published Articles (DataForSEO)

All `status: done` roadmap items' primary keywords were checked against their
target market (Ghana 2288 / Nigeria 2566 / Kenya 2404 / South Africa 2710; pan-africa
items checked against Ghana per existing convention), depth 20.

**Result: 0 of 66 in the top 20 for their primary target keyword** — including the
two articles confirmed indexed and drawing GSC impressions. That's not a
contradiction: GSC's position (8–9) is an *average across whatever queries actually
triggered an impression*, which are very likely longer-tail variants of "fasting
blood sugar normal range" / "lipid profile test" rather than exact matches — GSC
doesn't expose per-page query breakdown with the current tooling, so the exact terms
aren't visible this week. Unchanged from W31 (also 0 of 51 then) in the sense that
matters: no article ranks for its *primary* keyword yet.

---

## AI Citation (GEO) Scoreboard

| Query | W28 | W29 | W30 | W31 | W36 |
|---|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet | Not yet |

Still no citations after 8 weeks of tracking (across a 6-week gap). All five queries
continue to surface PMC/PubMed, Cleveland Clinic, healthdirect, MedlinePlus, and
similar international authority sources; betterhealth.africa does not appear in
organic results or AI summaries for any of them. Consistent with a site that has
only 2 indexed pages so far.

---

## Week-over-Week Movement

*(six weeks, not one — see the gap note above)*

- **Indexation: from 0 confirmed to 2 confirmed** (via URL Inspection + real GSC
  impressions), while the sitemap-status aggregate stayed at "0 indexed" throughout.
  This is the one number that actually moved, and the dashboard everyone's been
  watching didn't show it.
- **SERP positions (primary keywords): still 0 of published articles in top 20**,
  now checked against 66 articles instead of 51 (15 more published between W29–W31,
  none published since — nightly's been paused).
- **GSC query diversity: down** (1 branded query vs. 4 in W31), but **GSC page
  diversity: up and qualitatively different** (2 real blog pages vs. 0 previously).
  Read the page report, not the query report, for this site's current signal.
- **AI citations: unchanged, still 0/5.**

---

## Quick Wins

**Not yet in the classic sense** (GSC quick-win detection looks for queries at
position 5–20 with impressions to spare) — but flagging the two indexed pages as the
thing to watch weekly from here: `fasting-blood-sugar-explained` (pos 9, 2
impressions, 0 clicks) and `lipid-profile-cholesterol-test` (pos 8, 2 impressions, 0
clicks) are already inside page 1. Sample size is too small (2 impressions each) to
diagnose a CTR problem yet, but if next week's numbers grow without clicks
following, that's the first real, data-backed case for a title/meta-description
rewrite this program has had.

## Gaps

- **No GSC-sourced keyword gaps this week**, same reason as W31: the query report
  has no health-topic queries to mine (only 1 branded query cleared the reporting
  threshold). This is the highest-value analysis this program still hasn't been able
  to run — re-attempt once query diversity grows past branded terms.
- **Todo queue has shrunk to 8 article items** (dengue fever, prolactin, PCOS,
  hepatitis A, and local pages for Kano/Enugu/Nakuru/Bloemfontein) plus 2 technical
  tasks, down from 15 at W31. Not urgent while nightly is paused, but worth noting
  before nightly resumes — see Action Items.

---

## Roadmap Changes

**No reordering** — same basis as W31: no ranking or impression data yet
differentiates one `todo` keyword from another (every checked keyword reads
identically "not in top 20," and GSC still has no content-topic query data to mine
for new gaps). No `done` items were touched.

Updated `meta.updated` to 2026-09-06 and `meta.keyword_data` with: (a) the
sitemap-status vs. URL Inspection discrepancy, (b) this week's full 66-keyword
DataForSEO re-check (all unchanged, "not in top 20"), and (c) a note that the
backlink programme's outreach log is still empty while indexation has nonetheless
started moving. Also noted in `meta.cadence` that the nightly routine is paused and
why.

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Stop treating `sitemap-status`'s aggregate indexed count as the source of truth.** It reads 0/85 while URL Inspection + real GSC impressions confirm 2 pages are indexed. Use a periodic URL Inspection sample (or spot-check pages appearing in the GSC pages report) as the real signal instead. | Weekly routine / human | No, but affects how #2 gets decided |
| 2 | **Decide whether to resume the nightly content routine.** Indexation has started moving with zero logged backlink work — per `backlinks.md`'s own decision rule, that's evidence the internal-link fix (PR #67) may have been sufficient on its own, and the authority constraint may be weaker than assumed in July. Recommend reviewing this now rather than waiting on outreach that hasn't started (tracking table is still empty). | Human | No, but it's the highest-leverage open decision right now |
| 3 | **Re-run a broader URL Inspection sample next week** (more than 10 URLs, prioritizing pages that show up in the GSC pages report) to get a real read on how many of the 66 published articles are actually indexed, since the aggregate count can't be trusted. | Weekly routine | No |
| 4 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — independent of Google indexing and feeds Copilot/GEO surfaces. | Human | No |
| 5 | Todo queue is down to 8 article items; refill before resuming nightly at scale (not urgent while paused). | Nightly routine, if resumed | No |

---

*Generated by the seo-weekly routine · 2026-09-06*

# SEO Weekly: 2026-W34 (23 Aug 2026)

**Week-over-week vs 2026-W31 (26 Jul 2026)**, cross-referenced against two more-recent
reports that were produced on schedule but never merged (W32, 9 Aug — PR #68; and a
second W32-titled run, 16 Aug — PR #70 vs. W33 in PR #71). See the headline below: the
biggest finding this week is not a ranking change, it's that the program's own review
process has stalled.

---

## Headline: nothing has moved in the SEO data for 2+ weeks — because nothing has moved in the PR queue for 4

Direct comparison against 26 Jul (last **merged** report) plus the un-merged 9 Aug / 16
Aug runs shows the underlying SEO metrics have been **frozen since 2026-08-09**:

- **Indexed articles: still 2 of 67** (`fasting-blood-sugar-explained`,
  `lipid-profile-cholesterol-test`) — same two pages as the 9 Aug and 16 Aug reports.
  No new page has been indexed in two straight weekly checks.
- **SERP positions: 66 of 66 published keywords still "not in top 20."** Zero movement
  since tracking began 8+ weeks ago.
- **GEO citations: 0 of 5 tracked queries.** No change.
- **Published article count: still 67.** No new content has shipped since **2026-07-25**.

That last point explains the rest: **the nightly publishing routine has not run in
4 weeks**, and **three separate weekly reports (this makes a fourth) are sitting
unmerged** on GitHub:

| PR | Branch | Report | Opened | Status |
|---|---|---|---|---|
| #68 | `seo/weekly-2026-08-02` | weekly-2026-W32.md | 2 Aug | **Open, unmerged** |
| #70 | `seo/weekly-2026-08-09` | weekly-2026-W32.md (2nd) + a real playbook/skill update | 9 Aug | **Open, unmerged** |
| #71 | `seo/weekly-2026-08-16` | weekly-2026-W33.md | 16 Aug | **Open, unmerged** |

Each of these branched from the same stale `main` (still at the 26 Jul state), so they
conflict with each other on `seo/roadmap.yml` and `seo/progress.json`. **#70 is not just
a duplicate report** — it also carries a real, un-merged strategy change: a "prefer
long-tail over head-term keywords" pivot to `.claude/skills/seo-nightly/SKILL.md` and
`seo/playbook.md`, plus 3 new long-tail `todo` roadmap items
(`is-hepatitis-b-curable`, `kidney-disease-warning-signs`,
`typhoid-fever-stages-recovery`, all DataForSEO-confirmed volume). None of that has
reached `main`. Because nothing has merged, the nightly routine's `todo` queue is still
the same 10 items it was on 26 Jul, and every weekly run since has been re-deriving the
same "not in top 20 / 2 indexed" conclusion from a `main` that hasn't changed.

**Recommendation for the human reviewer:** merge #71 (the most current and complete of
the three, 16 Aug) or this run's PR, and close the other two as superseded — then the
nightly routine can resume and the next weekly run will finally show real week-over-week
movement instead of re-confirming a frozen state. Don't lose #70's playbook/SKILL.md
long-tail pivot in the process; it's real guidance, not just a report.

---

## Data Sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | Working | Queries/pages for 24 Jul – 21 Aug 2026 (28-day window); URL Inspection sampled on 13 articles; sitemap-status checked |
| DataForSEO | Operational | SERP checked for all 66 published-article primary keywords (`status: done` roadmap items), depth 20, market-correct location codes. Volume re-checked for the 4 still-null `todo` items. |
| Bing Webmaster | **Skipped** | `BING_API_KEY` / `BING_SITE_URL` still not configured — 10+ weeks running |

---

## GSC: Top Queries (28 days, 24 Jul – 21 Aug 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health | 0 | 2 | 0% | 73 |
| better health africa | 0 | 1 | 0% | 22 |
| ear hugs | 0 | 1 | 0% | 43 |
| fasting blood sugar how many hours fasting | 0 | 1 | 0% | 78 |

Same shape as every prior week: 4 distinct queries, all single-digit impressions. "ear
hugs" is an unrelated stray. The one content-topic query (tied to the indexed
`fasting-blood-sugar-explained` article) is unchanged at position 78 — no movement since
it first appeared 9 Aug.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 14 | 25 | 56% | 8.16 |
| app.betterhealth.africa/ | 1 | 5 | 20% | 18.2 |
| app.betterhealth.africa/join | 0 | 3 | 0% | 5.0 |
| www.betterhealth.africa/about/ | 0 | 4 | 0% | 5.0 |
| www.betterhealth.africa/what-we-test/ | 0 | 3 | 0% | 6.3 |
| www.betterhealth.africa/how-it-works/ | 0 | 2 | 0% | 3.0 |
| www.betterhealth.africa/pricing/ | 0 | 2 | 0% | 3.5 |
| www.betterhealth.africa/blog/fasting-blood-sugar-explained/ | 0 | 1 | 0% | 78 |
| 7 referral short-links (`?be=...`) | 0 | 1 each | 0% | 3–82 |

16 rows total. Homepage average position drifted worse (5.0 → 8.16) on more impressions
(16 → 25) — not a ranking regression signal at this volume, just a wider average as more
low-position impressions came in. Still only the one `/blog/` row, unchanged since it
first appeared.

---

## Indexation Status (GSC URL Inspection, sampled 23 Aug 2026, 13 articles)

| Article | Published | Coverage state |
|---|---|---|
| fasting-blood-sugar-explained | 2026-06-22 | **Submitted and indexed** |
| lipid-profile-cholesterol-test | 2026-06-23 | **Submitted and indexed** |
| hba1c-explained | 2026-06-20 (oldest) | Discovered — currently not indexed |
| preventive-health-screening-ghana | 2026-06-19 | Discovered — currently not indexed |
| fatty-liver-disease-explained | 2026-06-21 | Discovered — currently not indexed |
| crp-inflammation-test | 2026-07-11 | Discovered — currently not indexed |
| gestational-diabetes-test | 2026-07-17 | Discovered — currently not indexed |
| perimenopause-menopause-test | 2026-07-17 | Discovered — currently not indexed |
| tuberculosis-test-explained | 2026-07-23 | Discovered — currently not indexed |
| testosterone-test-explained | 2026-07-24 | Discovered — currently not indexed |
| yellow-fever-explained | 2026-07-25 | Discovered — currently not indexed |
| cholera-symptoms-test | 2026-07-25 | Discovered — currently not indexed |
| blood-test-cape-town / -ibadan / -eldoret | 2026-07-25 (newest) | Discovered — currently not indexed |

Sitemap: `https://betterhealth.africa/sitemap.xml`, last submitted 2026-07-23, last
downloaded by Google 2026-08-19, **85 URLs submitted, 0 indexed** (unchanged for a month
— this figure is a known slow-updating report; trust URL Inspection, which shows 2
indexed).

**Reading this correctly:** the indexed count moved from 0 → 2 on 9 Aug and has sat at
exactly 2 through two subsequent checks (16 Aug, 23 Aug) spanning two weeks. Both indexed
pages are from the oldest June batch. This is consistent with slow, authority-limited
crawl progress for a young domain, but two flat weeks is long enough that it's worth
watching closely rather than assuming continued organic growth — see Action Items.

---

## SERP Positions — All 66 Published Articles (DataForSEO)

Every `status: done` article's primary keyword was checked against its target market
(Ghana 2288 / Nigeria 2566 / Kenya 2404 / South Africa 2710, depth 20). **All 66: not in
top 20**, unchanged from every prior week. No errors on any lookup (5 initially returned
empty output on the first parallel pass and were successfully retried serially).

No new articles have published since W31 (26 Jul), so this is the same 66-keyword set
checked in W32/W33 — nothing new to report at the publish-count level either.

---

## AI Citation (GEO) Scoreboard

| Query | W30 | W31 | W32 | W33 | W34 |
|---|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet | Not yet |

**Still no AI citations after 9+ weeks of tracking.** All five queries continue to be
dominated by PMC/PubMed, Cleveland Clinic, MedlinePlus, healthdirect, and similar
international authority sources — no betterhealth.africa presence in organic results or
AI summaries. Expected while indexation sits at 2 of 67 articles.

---

## Week-over-Week Movement

- **SERP positions:** 0 movement — 9th+ straight week at "not in top 20" for every
  tracked keyword.
- **Indexed articles:** 2 → 2. First flat reading since indexation started (was 0 → 2 on
  9 Aug); two consecutive weeks with no further growth.
- **GSC content-topic impressions:** 1 → 1, same query, same position (78). No growth.
- **GSC homepage traffic:** clicks 15 (W33) → 14 this window; impressions 25 → 25 (flat);
  still branded/direct, not organic content discovery.
- **Published article count:** 67 → 67. **No new articles in 4 weeks** — the nightly
  routine has not produced a batch since the 2026-07-25 PR (#65).
- **GEO citations:** 0 → 0.

---

## Quick Wins

**None available yet.** The only content-topic query with any data (`fasting blood sugar
how many hours fasting`) sits at position 78, far outside the 5–20 quick-win band, and
hasn't moved in two weeks. Quick-win detection needs a broader base of indexed pages
generating impressions in that band — nothing to act on until indexation grows past 2
articles.

## Gaps

- **No new GSC-sourced keyword gaps this week** — impression volume is still too thin (4
  queries, ≤2 impressions each) to mine.
- **Todo queue: unchanged at 10 items** (dengue fever, prolactin test, PCOS test,
  hepatitis A test, blood test Kano/Enugu/Nakuru/Bloemfontein, plus 2 technical tasks) —
  exactly what it was on 26 Jul, because no nightly run has consumed any of it. This is
  not a content gap, it's the PR-backlog problem described in the headline: the queue
  isn't shrinking because nothing is being published, not because it lacks items.

---

## Roadmap Changes

- **Volume confirmed:** `pcos test` now **50/mo, Nigeria, LOW competition** (was `null`).
  Field updated in `seo/roadmap.yml`.
- **Re-checked, still no data:** `blood test Kano`, `blood test Enugu`, `blood test
  Nakuru` — all still return null volume from DataForSEO. Left as-is; still worth
  publishing per the existing local-page precedent.
- **No reordering.** SERP positions are unchanged across all 66 published keywords and
  GSC still has only one thin content-topic data point, so there's no data-driven basis
  to re-prioritize the `todo` queue this week. No `done` items were touched.
- **Not incorporated:** the 3 long-tail items and playbook/SKILL.md direction change
  sitting in unmerged PR #70 (`is-hepatitis-b-curable`, `kidney-disease-warning-signs`,
  `typhoid-fever-stages-recovery`) — those are real, reviewed-but-unmerged work from a
  prior run; re-adding them here would just create a second copy for the reviewer to
  reconcile. They should land by merging #70 (or cherry-picking its roadmap/SKILL.md
  diff), not by this report re-authoring them.
- Updated `meta.updated` to 2026-08-23 and `meta.keyword_data` with this week's findings
  (pcos test volume, the 66-keyword SERP re-check, the indexed-count-flat-at-2 finding,
  and the PR-backlog note).

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Clear the PR backlog.** Merge one of #68/#70/#71 (recommend #71, the most current) or this run's PR, and close the others as superseded — being careful not to lose PR #70's long-tail playbook/SKILL.md guidance and its 3 new roadmap items. Until this happens, the nightly routine's queue stays frozen at 10 items and every future weekly run keeps re-deriving the same flat numbers | **Human** | **Yes — this is now the single blocker on the whole program** |
| 2 | **Restart the nightly routine** once the PR queue is clear — no new articles have published in 4 weeks (last: 2026-07-25) | Human, then nightly routine | Yes (contingent on #1) |
| 3 | **Watch the indexed count.** It's been flat at 2 for two straight weeks (9 Aug, 16 Aug, 23 Aug) after the initial 0→2 jump — worth a closer look if it's still 2 next week | Weekly routine | No |
| 4 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — still not configured, 10+ weeks running | Human | No |
| 5 | Once more articles show "Submitted and indexed" and the queue starts moving again, re-run GSC quick-win/gap detection in full | Weekly routine | No (contingent on #1–#3) |

---

*Generated by the seo-weekly routine · 2026-08-23*

# SEO Weekly: 2026-W35 (30 Aug 2026)

**Week-over-week vs 2026-W34 (23 Aug 2026, unmerged PR #72)** — the last **merged**
report is still W31 (26 Jul); see the process headline below for why.

---

## Headline: the program has been stalled for five weeks, and the routines that were supposed to fix it haven't either

Nothing in the ranking or indexation data below is new this week — it's the same
frozen picture W34 reported on 23 Aug. What's new is confirmation of *why*, traced
through the repo's own guardrails:

1. **Four weekly-report PRs are sitting open and unmerged**, none reviewed in a
   month:

   | PR | Branch | Report | Opened |
   |---|---|---|---|
   | #68 | `seo/weekly-2026-08-02` | weekly-2026-W32.md | 2 Aug |
   | #70 | `seo/weekly-2026-08-09` | weekly-2026-W32.md (2nd) + a real playbook/SKILL.md long-tail pivot | 9 Aug |
   | #71 | `seo/weekly-2026-08-16` | weekly-2026-W33.md | 16 Aug |
   | #72 | `seo/weekly-2026-08-23` | weekly-2026-W34.md | 23 Aug |

   This run's PR makes a fifth. `main` is still on the 26-Jul `roadmap.yml` /
   `progress.json` state, so every one of these branched from the same stale base and
   conflicts with the others.

2. **The nightly publishing routine is deliberately paused**
   (`.claude/skills/seo-nightly/SKILL.md`, since 2026-07-26), and correctly so at the
   time: 67 articles were published and 0 were indexed. Its stated **resume
   condition** is "the sitemap's indexed count moves off 0, re-check with
   `node seo/tools/gsc.mjs sitemap-status`." That command still reports **85
   submitted, 0 indexed today** — but it has reported 0 every week since the pause
   began, including the three weeks where **URL Inspection has directly shown 2 of
   67 articles "Submitted and indexed"** (first appeared ~9 Aug, confirmed again
   16 Aug, 23 Aug, and today). `sitemap-status`'s indexed count is a known
   slow/stale GSC report field — W34 already flagged this — and **the resume
   condition as written may never fire**, because it's reading the wrong signal.
3. **The backlink programme that was supposed to replace nightly publishing has
   produced zero completed actions.** `seo/backlinks.md` (started 2026-07-26) has an
   empty **Tracking** table — no directory listing submitted, no partner link
   requested, nothing logged, five weeks in. Its own "success measure" also points at
   the same stale `sitemap-status` metric.

Put together: the program paused itself for a good reason, the metric it's watching
for permission to resume is arguably broken, the replacement workstream hasn't
started, and four weeks of weekly reports saying exactly this have not reached a
human. This is the thing to act on this week — not a ranking change.

---

## Data Sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | Working | Queries/pages for 31 Jul – 28 Aug 2026 (28-day window); URL Inspection spot-check; sitemap-status checked |
| DataForSEO | Operational | SERP checked for all 66 published-article primary keywords (`status: done` roadmap items), depth 20, market-correct location codes. Volume refreshed for the 5 still-null `todo` items. |
| Bing Webmaster | **Skipped** | `BING_API_KEY` / `BING_SITE_URL` not configured — 11+ weeks running |

---

## GSC: Top Queries (28 days, 31 Jul – 28 Aug 2026)

| Query | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| better health | 0 | 3 | 0% | 71 |
| better health africa | 0 | 1 | 0% | 22 |
| ear hugs | 0 | 1 | 0% | 43 |
| fasting blood sugar how many hours fasting | 0 | 1 | 0% | 78 |

Same shape as every week since GSC access opened: 4 distinct queries, all
single-digit impressions. "ear hugs" is an unrelated stray. The one content-topic
query is unchanged — same query, same position (78), 4th week running.

## GSC: Top Pages (28 days)

| Page | Clicks | Impressions | CTR | Avg. position |
|---|---|---|---|---|
| www.betterhealth.africa/ | 15 | 33 | 45.5% | 8.5 |
| app.betterhealth.africa/ | 1 | 5 | 20% | 18.2 |
| app.betterhealth.africa/join | 0 | 3 | 0% | 5.0 |
| www.betterhealth.africa/about/ | 0 | 5 | 0% | 5.8 |
| www.betterhealth.africa/what-we-test/ | 0 | 4 | 0% | 7.25 |
| www.betterhealth.africa/how-it-works/ | 0 | 4 | 0% | 5.0 |
| www.betterhealth.africa/pricing/ | 0 | 4 | 0% | 3.75 |
| **www.betterhealth.africa/blog/fasting-blood-sugar-explained/** | 0 | 3 | 0% | 32 |
| **www.betterhealth.africa/blog/lipid-profile-cholesterol-test/** | 0 | 2 | 0% | 8 |
| www.betterhealth.africa/contact/ | 0 | 2 | 0% | 3.0 |
| www.betterhealth.africa/faq/ | 0 | 2 | 0% | 2.0 |
| 6 referral short-links (`?be=...`) | 0 | 1 each | 0% | 6–82 |

18 rows total. **New this week:** `lipid-profile-cholesterol-test` — the second
indexed article — shows up in the pages report for the first time, at position 8
with 2 impressions. It didn't appear at all in W34. `fasting-blood-sugar-explained`
also improved from 1 impression (W34) to 3, still averaging position 32. Both are
still 0 clicks, and volumes are too thin to call a trend, but this is the first time
*both* indexed pages have shown any query-driven visibility in the same week.

---

## Indexation Status (GSC URL Inspection + sitemap-status, checked 30 Aug 2026)

| Article | Published | Coverage state |
|---|---|---|
| fasting-blood-sugar-explained | 2026-06-22 | **Submitted and indexed** |
| lipid-profile-cholesterol-test | 2026-06-23 | **Submitted and indexed** |
| hba1c-explained | 2026-06-20 (oldest) | Discovered — currently not indexed |

Sitemap: `https://betterhealth.africa/sitemap.xml`, 85 URLs submitted, sitemap-level
report still reads **0 indexed** — unchanged for 5+ weeks and, per the headline
above, not a reliable signal at this point; URL Inspection is ground truth and shows
**2 of 67 indexed**, flat for the third straight weekly check (9 Aug → 16 Aug → 23
Aug → 30 Aug, no further growth).

---

## SERP Positions — All 66 Published Articles (DataForSEO)

Every `status: done` article's primary keyword was checked against its target market
(Ghana 2288 / Nigeria 2566 / Kenya 2404 / South Africa 2710, depth 20).
**All 66: not in top 20**, unchanged from every prior week since tracking began. No
errors on any lookup.

No new articles have published since 25 Jul (67 total, nightly paused), so this is
the same 66-keyword set checked in every report since W32.

---

## AI Citation (GEO) Scoreboard

| Query | W32 | W33 | W34 | W35 |
|---|---|---|---|---|
| "fatty liver disease Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fasting blood sugar normal range" | Not yet | Not yet | Not yet | Not yet |
| "health screening Ghana" | Not yet | Not yet | Not yet | Not yet |
| "hypertension symptoms Ghana" | Not yet | Not yet | Not yet | Not yet |
| "fbc test meaning" | Not yet | Not yet | Not yet | Not yet |

**Still no AI citations after 10 straight weeks of tracking.** All five queries
continue to be dominated by PMC/PubMed, Cleveland Clinic, MedlinePlus, healthdirect,
diabetes.org.uk, and similar international authority sources — no
betterhealth.africa presence in organic results or AI summaries. Expected while
indexation sits at 2 of 67 articles.

---

## Week-over-Week Movement (vs W34, 23 Aug)

- **SERP positions:** 0 movement — every tracked keyword still "not in top 20."
- **Indexed articles:** 2 → 2. Third consecutive flat week after the initial 0 → 2
  jump around 9 Aug.
- **GSC content-topic impressions:** the tracked long-tail query held flat (1
  impression, position 78, 4th week), but the *page*-level picture improved
  slightly: a second indexed page (`lipid-profile-cholesterol-test`) picked up
  impressions for the first time, and the first page's impressions rose 1 → 3.
- **GSC homepage traffic:** clicks 14 → 15; impressions 25 → 33; CTR 56% → 45.5%
  (more impressions, similar clicks — a wider, not worse, funnel).
- **Published article count:** 67 → 67. No new articles in 5 weeks (nightly routine
  paused since 25 Jul).
- **GEO citations:** 0 → 0.

---

## Quick Wins

**One thin but real early signal:** `lipid-profile-cholesterol-test` at position 8
falls inside the 5–20 "quick win" band the playbook watches for — but on only 2
impressions, it's not yet a confirmed trend, just the first data point worth
watching. No action recommended yet beyond noting it; re-check next week before
prioritizing an on-page pass.

Otherwise: **none available.** Quick-win detection needs a broader base of indexed
pages generating impressions in that band — nothing else to act on until
indexation grows past 2 articles.

## Gaps

- **One long-tail phrasing gap on an existing article, not a new topic:** the
  tracked query "fasting blood sugar how many hours fasting" (1 impression,
  position 78, unchanged 4 weeks) is a real, if tiny, signal that people search this
  exact phrasing. `fasting-blood-sugar-explained` already covers the topic — worth
  checking next content pass whether its FAQ section explicitly answers "how many
  hours should I fast before the test," since that's cheaper than a new article and
  matches the query almost verbatim.
- **No new GSC-sourced keyword gaps this week** — impression volume is still too
  thin (4 distinct queries, ≤3 impressions each) to mine properly.
- **Todo queue: unchanged at 10 items** (dengue fever, prolactin test, PCOS test,
  hepatitis A test, blood test Kano/Enugu/Nakuru/Bloemfontein, plus 2 technical
  tasks) — same as every week since 25 Jul, because the nightly routine that would
  consume it is paused. Not a content gap; see the headline.

---

## Roadmap Changes

- **Volume confirmed:** `pcos test` now **210/mo, Nigeria, LOW competition** (was
  `null`). `blood test Bloemfontein` now **10/mo, LOW competition** (was `null`).
  Both fields updated in `seo/roadmap.yml`.
- **Re-checked, still no data:** `blood test Kano`, `blood test Enugu`, `blood test
  Nakuru` — all still return null volume from DataForSEO. Notes updated with the
  30-Aug re-check date; left in place, still worth publishing per the existing
  local-page precedent.
- **No reordering.** SERP positions are unchanged across all 66 published keywords
  and GSC still has only thin content-topic data, so there's no data-driven basis to
  re-prioritize the `todo` queue this week. No `done` items were touched.
- **Not incorporated (again):** the 3 long-tail items and playbook/SKILL.md
  direction change sitting in unmerged PR #70 (`is-hepatitis-b-curable`,
  `kidney-disease-warning-signs`, `typhoid-fever-stages-recovery`). That's real,
  reviewed-but-unmerged work — re-adding it here would just create a third copy for
  a reviewer to reconcile. It should land by merging #70 (or cherry-picking its
  roadmap/SKILL.md diff), not by another report re-authoring it.
- Updated `meta.updated` to 2026-08-30 and `meta.keyword_data` with this week's
  findings (pcos test and Bloemfontein volumes, the 66-keyword SERP re-check, the
  indexed-count-flat-at-2-for-3-weeks finding, and the PR-backlog / stale-metric
  process finding).

---

## Action Items

| # | Action | Owner | Blocking? |
|---|---|---|---|
| 1 | **Clear the PR backlog.** Merge the most current of #68/#70/#71/#72/this run (recommend #72 or this PR), and close the others as superseded — being careful not to lose PR #70's long-tail playbook/SKILL.md guidance and its 3 new roadmap items (cherry-pick that diff if #70 itself is closed). Until this happens, `main` stays frozen at 26 Jul and every future weekly run keeps re-deriving the same numbers | **Human** | **Yes — single biggest blocker on the whole program** |
| 2 | **Fix the nightly routine's resume condition.** `.claude/skills/seo-nightly/SKILL.md` checks `gsc.mjs sitemap-status`, which has read 0 indexed for 5+ straight weeks even while URL Inspection shows 2 of 67 actually indexed. Repoint the resume check at URL Inspection (or a small authoritative sample of it) so the pause can actually end when its own condition is met | Human | No, but it's why #3 hasn't happened |
| 3 | **Decide whether to resume nightly publishing now.** Real indexation moved off 0 three weeks ago and has held there; the backlink programme meant to be the interim workstream has zero completed actions in the same window. Worth a human call: resume a small batch, push harder on backlinks, or both | Human | No |
| 4 | **Restart the backlink programme.** `seo/backlinks.md`'s Tracking table is still empty 5 weeks after the plan was written — Priority 1 (self-serve directories: Wellfound, StartupBlink, Tracxn, etc.) requires no partnerships and could log a first entry this week | Human | No |
| 5 | Set `BING_API_KEY` + `BING_SITE_URL` for Bing Webmaster data — still not configured, 11+ weeks running | Human | No |
| 6 | Once more articles show indexed and the queue starts moving again, re-run GSC quick-win/gap detection in full, and follow up on the `lipid-profile-cholesterol-test` position-8 signal above | Weekly routine | No (contingent on #1–#3) |

---

*Generated by the seo-weekly routine · 2026-08-30*

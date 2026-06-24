# SEO Weekly: 2026-W26 (24 Jun 2026)

**Baseline week — no prior weekly report to compare against.**

---

## Data Sources

| Source | Status | Notes |
|--------|--------|-------|
| Google Search Console | **Skipped** | `GSC_SERVICE_ACCOUNT_JSON` / `GSC_SITE_URL` not configured |
| DataForSEO | **Operational** | SERP (Ghana, depth 20) + volume refresh |
| Bing Webmaster | **Skipped** | `BING_API_KEY` not configured |

---

## Indexation Alert

A `site:betterhealth.africa` query returns **only the homepage** (plus 3 tracking-param variants). None of the five published articles appear in Google's index yet. All articles were published within the past 5 days (2026-06-19 to 2026-06-22) so crawl lag is expected, but this will prevent any ranking movement until Googlebot indexes them.

**Blocking action:** Set up Google Search Console and submit each article URL for indexing — see Action Items below.

---

## SERP Positions — Published Articles (Ghana, 2026-06-24)

| Article | Primary Keyword | Volume (GH/mo) | Position |
|---------|-----------------|----------------|----------|
| hba1c-explained | hba1c test | 590 | Not in top 20 |
| preventive-health-screening-ghana | health screening Ghana | — | Not in top 20 |
| fatty-liver-disease-explained | fatty liver disease | 1,600 | Not in top 20 |
| fasting-blood-sugar-explained | fasting blood sugar normal range | 1,300 | Not in top 20 |
| preventable-diseases-preventive-healthcare-ghana | preventive healthcare Ghana | — | Not in top 20 |

All five articles are unranked. This is expected given they were published 2–5 days ago and have not yet been indexed. **No ranking movement to report; baseline is "not in top 20" for all targets.**

### Competitive landscape notes (from SERP data)

- **hba1c test**: Top 20 dominated by MedlinePlus, Diabetes UK, Mayo Clinic, NIH, HealthDirect. No Africa-specific result in top 20 — an opening for betterhealth.africa once indexed.
- **health screening Ghana**: SYNLAB Ghana, Trust Hospital, Ghana Ministry of Health, GlobalGiving events. Mostly service/directory pages; betterhealth.africa's editorial article is differentiated.
- **fatty liver disease**: NHS, Mayo Clinic, MedlinePlus, NCBI dominate. High-DA international competition; long tail (fatty liver symptoms Ghana, fatty liver diet) is more winnable near-term.
- **fasting blood sugar normal range**: Mayo, Cleveland Clinic, BHF, WHO PDF dominate. Again international — patient-friendly Ghana-specific content has no clear incumbent.

---

## Volume Refresh — Top Todo Items (DataForSEO, Ghana, June 2026)

| Keyword | Volume (GH/mo) | Competition | CPC | Roadmap Item |
|---------|----------------|-------------|-----|--------------|
| lipid profile test | 1,000 | LOW | $0.30 | art-cholesterol-lipids |
| fbc test | 1,000 | LOW | — | art-full-blood-count |
| hypertension symptoms | 480 | LOW | $0.17 | art-hypertension-silent |
| prediabetes symptoms | 70 | LOW | $1.11 | art-prediabetes |
| ferritin test | 50 | LOW | — | art-anaemia-iron |

All volumes confirmed consistent with the June 2026 DataForSEO pull. No changes to ordering warranted.

---

## AI Citation (GEO) Scoreboard

Checked 5 priority queries via web search for betterhealth.africa appearances.

| Query | betterhealth.africa cited? |
|-------|---------------------------|
| "fatty liver disease Ghana" | Not yet |
| "fasting blood sugar normal range" | Not yet |
| "hba1c test explained" | Not yet |
| "health screening preventive Ghana" | **Homepage indexed** (not a blog article) |
| "preventive healthcare Ghana" | Not yet |

**Summary:** The homepage is indexed and appears for branded / broad queries. No blog articles yet surface in AI-visible results. GEO citation requires indexation first — same blocker as organic ranking.

---

## Week-over-Week Movement

**Week 1 baseline — no prior report.** All positions start at "not in top 20"; next week's report will record the first deltas.

---

## Quick Wins (GSC-derived)

**Not available this week** — GSC credentials absent. Once connected, this section will highlight queries at positions 5–20 or with low CTR, flagging them for on-page improvement or a new supporting article.

---

## Gaps

Without GSC data, impression-based gap analysis is unavailable. From the competitive SERP landscape observed:

1. **"fatty liver symptoms Ghana"** — no Ghana-specific article in top 20 for the symptom long-tail. Our fatty-liver article covers this but isn't indexed yet; worth a push once indexed.
2. **"what is prediabetes Ghana"** / **"prediabetes test Ghana"** — no local result in top 20; strong fit for the upcoming `art-prediabetes` article.
3. **"cholesterol test Accra"** — not yet targeted; could be a secondary keyword for `art-cholesterol-lipids`.
4. **"blood test Accra"** / **"blood test Kumasi"** — local-intent pages (`local-accra`, `local-kumasi`) in the roadmap; not yet published and no competitors at all in top 20.

---

## Roadmap Changes

No reordering required — volume data confirms the current priority queue is correct:

1. **art-cholesterol-lipids** (1,000/mo) — next to publish
2. **art-full-blood-count** (1,000/mo) — tied volume, follows immediately
3. **art-hypertension-silent** (480/mo)
4. **art-prediabetes** (70/mo)
5. **art-anaemia-iron** (50/mo)

Updated `meta.updated` to 2026-06-24 and added volume-confirmed note in roadmap.yml.

---

## Action Items

Priority order for the coming week:

| # | Action | Owner | Blocking? |
|---|--------|-------|-----------|
| 1 | Set `GSC_SERVICE_ACCOUNT_JSON` + `GSC_SITE_URL` env vars; grant service account GSC read access | Human (Google account access required) | Yes — no traffic data without it |
| 2 | Submit all 5 blog article URLs to GSC URL Inspection for immediate indexing | Human (once GSC is set up) | Yes — no rankings until indexed |
| 3 | Set `BING_API_KEY` env var for Bing Webmaster data in future runs | Human | No |
| 4 | Publish next article: **art-cholesterol-lipids** (lipid profile test, 1,000/mo Ghana) | Nightly routine | No |
| 5 | Add internal links from fasting-blood-sugar article → hba1c article and vice versa (both cover diabetes markers) | Nightly / editorial | No |

---

*Generated by the seo-weekly routine · 2026-06-24*

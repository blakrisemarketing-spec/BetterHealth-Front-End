# Backlink Programme

Started 2026-07-26, after the W31 weekly established that indexation — not content
volume — is the binding constraint. The nightly article routine is paused
(`.claude/skills/seo-nightly/SKILL.md`); this is the workstream that replaces it.

## Why this is the priority

GSC on 2026-07-26: **70 URLs submitted, 0 indexed**, articles sitting at
"Discovered — currently not indexed" (see `reports/weekly-2026-W31.md`). That state
means Google has the URLs and is declining to spend crawl budget on them. Two inputs
drive that decision: internal link structure and external authority. The first is
fixed (PR #67 — `/blog` now prerenders all 67 article links, ending the orphan
problem). This file covers the second, which is the one we have never worked on.

## Verified baseline (2026-07-26)

| Signal | Value | How it was checked |
|---|---|---|
| Common Crawl captures | **0** | `index.commoncrawl.org` CC-MAIN-2026-25, with a control domain returning results |
| Third-party brand mentions | **none found** | web search for the brand + category returned only our own site |
| GSC indexed pages | **0 of 70** | `gsc.mjs sitemap-status` |
| Organic queries (28d) | 4, all branded | GSC query report |
| AI citations | 0 across 5 tracked queries, 6 weeks | weekly GEO scoreboard |

Zero Common Crawl captures is the striking one. Common Crawl's frontier is
link-driven, so a domain with real inbound links generally appears. Zero is
independent corroboration that the backlink profile is effectively empty — this is
not a Google-specific judgement.

**Do not treat "0 backlinks" as an assumption.** Re-verify with DataForSEO or Moz
once credentials are available; the checks above are free-source only.

## Technical prerequisites — verified clean, no action needed

- `betterhealth.africa` → `www.betterhealth.africa` via **301**, single hop, path
  preserved (`/blog/hba1c-explained` survives). Links to either host pass equity.
- `robots.txt` allows all crawlers; sitemap declared.
- Article pages serve full prerendered bodies to crawlers (fixed 2026-07-23).

So there is no technical reason a new link would fail to count. Outreach is unblocked.

## Priority 0 — fully in our control, no outreach required

Do these first. They need nobody's permission and nothing to be "earned".

1. **Link the app domain to the blog.** `app.betterhealth.africa` is **already
   indexed** and ranks ~1.4 for branded queries, but it is a pure client-side SPA:
   2,276 bytes, empty `#root`, **zero links in raw HTML**. It passes equity nowhere.
   Adding a prerendered footer link from the app to `www.betterhealth.africa/blog`
   creates a link from an already-crawled property to the corpus that is not being
   crawled. *(Lives in the `BetterHealth-Africa` repo, not this one.)*
2. **Claim and populate the obvious profiles** — LinkedIn company page, Crunchbase,
   Google Business Profile. These are `nofollow` or low-value individually, but they
   are how aggregators and journalists discover a company, and they seed the
   citation graph.
3. **Founder and team profiles** — personal LinkedIn/X bios linking to the site.
   Cheap, permanent, and they are often the first links a new domain ever gets.

## Priority 1 — self-serve directories

Real listings, free or cheap, mostly self-submit. Individually weak; collectively
they establish that the entity exists.

| Target | Notes |
|---|---|
| [Wellfound](https://wellfound.com/startups/location/ghana) | Lists Ghana tech startups incl. health tech |
| [StartupBlink](https://www.startupblink.com/top-startups/ghana) | 243 Ghana startups tracked |
| [Tracxn](https://tracxn.com/d/explore/healthtech-startups-in-ghana/__UgtM8DCyxBIMy700kVwhpLUWtXGROfC35JfZ2fp41I0/companies) | 155 Ghana healthtech startups already profiled — we should be one |
| [StartupMapAfrica](https://startupmapafrica.com/startups) | African startups by country/sector/stage |
| [DigestAfrica](https://digestafrica.com/african-healthcare-startups-raised-1m-venture-funding) | African healthcare startup database |

## Priority 2 — ecosystem and trade editorial

Warmer than cold press; these outlets actively profile African healthtech.

| Target | Angle |
|---|---|
| [HealthTech Hub Africa](https://thehealthtech.org/) | Publishes "African healthtech startups making a difference" features — we fit the format directly |
| [JBKlutse](https://www.jbklutse.com/ghana-startups/) | Ghana tech blog running "Ghanaian Startups to Watch" ecosystem profiles |
| TechCabal / Techpoint Africa | Pan-African tech press; pitch the pan-African expansion (GH → NG/KE/ZA) rather than a product launch |

## Priority 3 — partners and commercial relationships

The highest-conversion links we have, because the relationship already exists.

- **Lab Access Ghana** — our named partner lab for home/partner-lab collection.
  A partner or "where we operate" listing is a natural, non-promotional link and
  should be the single easiest real backlink available to us.
- **Payment and infrastructure partners** (Hubtel, Paystack) — vendors routinely
  publish merchant case studies; these carry a real link and a credibility signal.
- **Any investor, accelerator, or programme** we are part of — portfolio pages are
  durable, high-trust links.

## Priority 4 — health authority and earned coverage

Slowest, highest value, and the tier that actually moves a YMYL health domain.

- [Ghana News Agency health desk](https://gna.org.gh/health/), [Graphic Online
  health](https://www.graphic.com.gh/news/health.html), [Ghana Health
  Report](https://www.ghanahealthreport.com/) — pitch **data or expert commentary**,
  not the product. We hold anonymised screening data across 127 biomarkers; an
  aggregate finding about, say, undiagnosed hypertension or prediabetes rates among
  screened Ghanaians is a story a health desk will run, and it earns a link.
- `.edu.gh` / `.gov.gh` — public-health departments, medical schools, Ghana Health
  Service. Hardest to get, worth more than everything above combined. Realistic
  routes: sponsoring a screening drive, contributing to an awareness campaign, or
  supplying data to a research group.

## Guardrails

This is a **health brand on a YMYL domain**. The downside of a bad link is larger
here than for a generic site, and the whole point of the exercise is trust.

- **No paid links, link exchanges, PBNs, or bulk directory blasts.** These violate
  Google's link spam policy and risk a manual action on a domain that is already
  struggling to index.
- **No fabricated statistics in outreach.** Every figure we pitch must trace to real
  aggregate data we hold or a citable source — the same bar as the article pipeline.
- Prefer fewer, real, relationship-backed links over volume. On a domain with zero
  links, five genuine ones are transformative; five hundred junk ones are a liability.

## Tracking

| Date | Target | Tier | Status | Live URL |
|---|---|---|---|---|
| | | | | |

Log every attempt, including refusals — a "no" is information about which angles
work. Re-run the baseline checks monthly and record the trend here.

## Success measure

The metric is **not** link count. It is the GSC indexed count moving off 0.
Re-check with `node seo/tools/gsc.mjs sitemap-status`. If indexation starts moving
after the PR #67 internal-link fix alone, the authority constraint was weaker than
thought and this programme can stay lightweight. If it stays at 0, links are the
binding constraint and Priorities 0–3 become the whole job.

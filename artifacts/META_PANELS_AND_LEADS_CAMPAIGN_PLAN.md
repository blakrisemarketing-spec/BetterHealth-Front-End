# Meta campaign plan: Test panels + lead magnets (September 2026)

**Status:** Built, paused, awaiting activation approval. Written 2026-09-02.
**Owner:** Growth.
**Companion files:** [`meta-campaign-2026-09/council-review.md`](meta-campaign-2026-09/council-review.md), [`meta-campaign-2026-09/ad-copy.md`](meta-campaign-2026-09/ad-copy.md), [`meta-campaign-2026-09/creatives/`](meta-campaign-2026-09/creatives/), [`meta-campaign-2026-09/meta-objects.md`](meta-campaign-2026-09/meta-objects.md) (IDs and preview links).

---

## 1. Why this shape

The August campaign ("BHA — NCD Free Consultation") spent $28.60, bought 417 clicks at a 2.02% CTR, and produced zero bookings. Three things were wrong at once: the destination was a 403 for most of the flight, the offer asked a cold reader for 20 minutes before giving them anything, and the pixel never saw the optimisation event. The clicks were real, and nothing was there to catch them.

The new structure separates the two jobs the old campaign tried to do with one offer:

| | Who | What they see | What we get |
|---|---|---|---|
| **Campaign 1: Test panels** | People already deciding to get tested | The specific panel: tests included, price, turnaround, how it works | A landing-page view on the panel page, then a click to the app to book |
| **Campaign 2: Lead magnets** | People not shopping for a test today | A free, useful guide in exchange for a WhatsApp number | A lead in our own table, delivered instantly, nurtured to a booking |

Both campaigns point at pages the Meta Pixel runs on (www.betterhealth.africa), so Meta can optimise on something it can see. The app (app.betterhealth.africa) reports registrations and purchases back through the server-side Conversions API, which closes the loop.

## 2. Funnel

```
Meta ad (panel)  ──> /book-tests/<slug>/  ──> app /join?panel=<code> ──> pay ──> results
                     PageView, LPV             CompleteRegistration (CAPI)   Purchase (CAPI)
                     InitiateCheckout on the Book click

Meta ad (guide)  ──> /guides/<slug>/  ──> form ──> guide unlocked + PDF + panel CTA
                     PageView, LPV        Lead     InitiateCheckout on the Book click
                                          row in marketing_leads (app DB)
                                          ──> WhatsApp nurture (manual, 3 touches) ──> /book-tests
```

## 3. Campaign 1: BHA — Test Panels — Sep 2026

- Objective: Sales. Budget: campaign-level (CBO), $5.00/day for a 14-day flight (Meta's minimum campaign spend cap is $100, so the end is a stop date set at activation, not a cap). Bid: lowest cost.
- Optimisation: landing page views, pixel `2118966258986670`. Switch each ad set to conversions on `InitiateCheckout` once the account has seen roughly 50 of them in a week; that event fires on the site every time someone clicks through to the app.
- Placements: Facebook and Instagram feeds, stories, reels. No Audience Network.
- Targeting: Ghana, hard age and gender caps per ad set (Advantage+ audience off). No interest layers: Meta removed health-condition targeting in 2022 and the creative does the qualifying.

| Ad set | Panel | Audience | Price | Destination (`/book-tests/<slug>/` + UTMs) |
|---|---|---|---|---|
| 1 | Panorama, Complete Health Check | 30 to 60, all | GHS 1,100 | `panorama` |
| 2 | Dialics, Blood Sugar Check | 30 to 60, all | GHS 350 | `dialics` |
| 3 | Cardion, Heart Health Check | 35 to 60, all | GHS 475 | `cardion` |
| 4 | Metabolix, Core Health Check | 30 to 60, all | GHS 697 | `metabolix` |
| 5 | Alpha, Men's Health Check | men 40 to 65 | GHS 995 | `alpha` |
| 6 | Empress, Women's Health Check | women 30 to 60 | GHS 995 | `empress` |
| 7 | Shield, Wellness Check (malaria and typhoid) | 18 to 55, all | GHS 497 | `shield` |
| 8 | Spark, Him/Her Fertility Test (added 2026-09-02) | 25 to 45, all | GHS 1,500 | `spark` |

Two ads per ad set: A is the product card (tests, price, turnaround); B is a statement hook. Same destination, `utm_content` differs (`<slug>-a`, `<slug>-b`).

Excluded on purpose: Privara (sexual health; Meta policy and audience privacy). It stays on the site and in search. Spark was excluded in the first draft and added at Damzi's decision; its copy is third-person throughout and its card says "Partner lab visit" because the ultrasound and semen analysis cannot be collected at home.

Cardion gains a lipid profile at Damzi's decision (2026-09-02). Price stays GHS 475 until the margin is re-checked: the August model put Cardion's cost at GHS 224 against a GHS 251 margin, and the lipid profile's cost price has to be added to that before the ads scale.

CBO trade-off: at $5/day Meta will concentrate spend on two or three ad sets within days. That is the test working. The panels that lose spend are the ones the market did not respond to at this price. If a deliberate even split is wanted for a week, switch the campaign to ad-set budgets at $1.50/day each in Ads Manager.

## 4. Campaign 2: BHA — Lead Magnets — Sep 2026

- Objective: Leads. Budget: campaign-level (CBO), $5.00/day for a 14-day flight (Meta's minimum campaign spend cap is $100, so the end is a stop date set at activation, not a cap). Bid: lowest cost.
- Optimisation: conversions on the pixel `Lead` event. It fires once, on form success, from `trackLead` in `src/lib/analytics.js`. It has zero history on the pixel today, so expect "learning limited" for the first two weeks; judge on cost per lead, not on learning status.
- Conversion location: website. (Meta Instant Forms would give cheaper, lower-intent leads and need no landing page; the MCP cannot create forms, so they are documented in section 11 as a follow-up test, not built.)
- Placements and geography as Campaign 1.

| Ad set | Tool | Stage | Audience | Format | Leads to |
|---|---|---|---|---|---|
| 2 | Which Health Test Do I Actually Need? | Middle | 25 to 55, all | 7-question quiz | Recommended panel |
| 7 | Genotype Compatibility Calculator | Top | 22 to 45, all | Two genotypes, then two follow-ups that sharpen the advice | HB Electrophoresis, GHS 170 |
| 8 | Diabetes Risk Score | Middle | 30 to 60, all | FINDRISC (8), then your week on a plate (7) | Dialics, GHS 350 |
| 9 | Heart Age Check | Middle | 30 to 65, all | WHO chart (5), then heart habits (7) | Cardion, GHS 475 |
| 10 | BMI and Waist Calculator | Top | 25 to 55, all | 4 measurements, then lifestyle (5) | Panorama, GHS 1,100 |

**Depth pass, 2026-09-03.** Damzi judged the first calculators thin: correct, but nobody shares a form. Each tool now carries a clearly separated Part 2 that never alters the validated score. The diabetes and BMI tools add a plate builder over seventeen Ghanaian staples (kenkey, banku, fufu, gari, kokonte, tuo zaafi, waakye, jollof, rice, red red, yam, plantain, Hausa koko, tom brown, bread), an asanka proportion picker after Ghana's 2023 dietary guidelines, and vegetables, protein, drinks and fried food. Heart age adds seasoning cubes, salted fish, shito, table salt, activity, alcohol, sleep and family history. Every food line traces to a sourced evidence brief (seven Ghanaian in-vivo GI studies, the national guidelines with servings in sardine tins and soup ladles, 24-hour-urine salt data); foods with no published value say so. Results count up and reveal, and every tool ends on a shareable 1080×1350 card carrying the result and nothing personal, sent via Web Share or a WhatsApp fallback. The ads still say "8 questions" and "5 questions", which remains true of Part 1 and is the honest hook; Part 2 is what they find once they arrive.

**The five PDF guides were retired from the campaign on 2026-09-02.** Damzi reviewed them and called them weak, which they were: a PDF asks for a phone number against a promise of value later, while a calculator returns a personalised number at the moment curiosity peaks, and that number is itself the argument for the test. The five ad sets are renamed "(retired)" and stay paused; the pages stay live at `/guides/<slug>` for organic search, and their approved ad copy is kept in `ad-copy.md` in case a PDF is ever tested again. The quiz stayed because it already works the way the calculators do.

Two ads per ad set, A card and B statement, as in Campaign 1.

Every guide page (`/guides/<slug>/`) has the form directly under the hero, above the fold on a 375px phone. Fields: first name, WhatsApp, optional email, an unticked opt-in for occasional health education. On success the page unlocks the full guide, offers the PDF, and shows the matching panel with price and a Book link. The quiz reveals its recommendation only after the form; the recommended panel code is stored as `health_interest` on the lead row, so the follow-up message can name the right test.

## 5. Budget

Decided by Damzi on 2026-09-02: $5 per campaign per day for 14 days. Set on both campaigns as a $5.00 daily budget. Meta refuses a campaign spend cap under $100, so the flight length is enforced by setting each campaign's stop time to activation plus 14 days at the moment of activation (step 7 of the launch checklist).

| | Daily | 14 days |
|---|---|---|
| Campaign 1: panels | $5.00 | $70 |
| Campaign 2: lead magnets | $5.00 | $70 |
| Total | $10.00 | $140 |

At this level each campaign will spend on two or three ad sets and starve the rest; read the winners, not the losers. A 14-day flight at $5/day buys roughly 1,500 to 2,500 impressions a day at the August CPMs, so the gates below are sized to that.

The account bills in USD; the site prices in GHS. Meta-reported ROAS will not tie out to Paystack exactly because `firePurchaseConversion` reports `currency: "GHS"`.

Scale rule: raise a campaign budget by at most 20% per day, and only after it has cleared its gate for three consecutive days. Do not raise both on the same day, because the read becomes ambiguous.

## 6. Gates and kill criteria (agreed before spend)

Campaign 1 (per ad set, read at 7 days and 14 days):

| Gate | Metric | Target | Miss means |
|---|---|---|---|
| P1 | Link CTR | ≥ 1.5% | Creative or audience problem |
| P2 | Landing page views ÷ link clicks | ≥ 60% | Page speed or 508 host errors; check `/api/health` uptime |
| P3 | `InitiateCheckout` ÷ landing page views | ≥ 5% | Page or price problem |
| P4 | Any `CompleteRegistration` or `Purchase` attributed within 14 days | ≥ 1 for the campaign | Onboarding or payment friction on the app, not the ad |
| Kill | $15 spent on an ad set with zero `InitiateCheckout` | Pause it | |

Campaign 2 (per ad set):

| Gate | Metric | Target | Miss means |
|---|---|---|---|
| L1 | Link CTR | ≥ 1.5% | Hook problem |
| L2 | Cost per `Lead` | ≤ $1.50 (stretch $0.75) | Page or form friction; compare landing-page-view to lead rate |
| L3 | Leads ÷ landing page views | ≥ 15% | Form too high a price for the perceived value |
| L4 | `InitiateCheckout` ÷ leads (panel click after unlock) | ≥ 10% | Guide does not bridge to the test; fix the CTA block |
| L5 | Leads reached on WhatsApp within 24h | 100% | Ops, not ads |
| Kill | $12 spent on an ad set with zero leads, or cost per lead above $4 after $15 | Pause it | |

Overall verdict at day 14: a campaign earns its next 14 days if it has cleared gates 1 to 3. Gate 4 (a real booking) is the business result and will lag; log it, do not wait for it to decide creative.

## 7. Tracking

Events on the pixel (`2118966258986670`), as of 2026-09-02, last 28 days: `PageView` (yes), `CompleteRegistration` (a few, server-side), `BookingStep` (custom, from the consultation page), nothing else. So:

- `Lead` starts firing from the guide pages. Standard event, optimisable. Confirm in Events Manager test mode on the first live submission.
- `InitiateCheckout` fires on any click to `app.betterhealth.africa/join` (site-wide delegated listener in `App.jsx`). It will now get volume from both campaigns.
- `Purchase` and `CompleteRegistration` arrive from the app via CAPI. `CompleteRegistration` under-fires (silent early return when user data is thin); treat it as a floor.
- `BookingStep` fires at the same rate as `PageView` on the consultation page, which means it fires on load. Not used by either campaign; fix separately before trusting it.
- UTMs: `utm_source=meta`, `utm_medium=paid_social`, `utm_campaign=panels_sep26|leads_sep26`, `utm_content=<slug>-<a|b>`. The guide form stores all four plus `fbclid` on the lead row; the panel page carries them into the app join link.
- GA4 receives `generate_lead` and `begin_checkout` through the web GTM container `GTM-MS22RHNF`; a tag must exist for each or the event is dropped at the container.

## 8. Lead handling

The follow-up decides whether Campaign 2 pays back. Leads land in `marketing_leads` in the app database (columns: lead magnet, name, WhatsApp, email, health interest, quiz answers, source, UTMs, status). The endpoint's origin allowlist covers the production site and localhost only; the devon staging site will get a 403 unless the same `MARKETING_ORIGINS_EXTRA` extension used by wellness-consultations is added. Until an admin view exists, export with:

```sql
select created_at, lead_magnet, full_name, whatsapp, email, health_interest, utm_content, status
from marketing_leads
where created_at > now() - interval '7 days'
order by created_at desc;
```

Nurture, by WhatsApp, from 026 859 6410 (+233 26 859 6410, the same number the guide pages fall back to), one person owning it:

| Touch | When | Message (adapt, keep short) |
|---|---|---|
| 1 | Within 24h of the lead | "Hi <name>, this is <name> from BetterHealth Africa. Your guide, <title>, is here: <PDF link>. If anything in it is unclear, reply and I will explain it. No pressure, no sales pitch." |
| 2 | Day 3 | One useful line from the guide, personal to the lead's interest (e.g. for the BP guide: "Two readings a minute apart, morning and evening, is the pattern clinicians can use."). Then: "If you ever want the numbers checked properly, the <panel> is GHS <price> and takes one visit." |
| 3 | Day 7 | "Last note from me. If a check would be useful this month, here is the page: <panel URL>. Home collection is available. Otherwise, keep the guide and check back in a year." Then stop unless they reply. |

Rules: no more than three unsolicited messages; stop on any "stop"; log outcome on the row (`status`: `contacted`, `booked`, `declined`, `unreachable`). The `optIn` answer says whether they agreed to occasional education beyond these three.

## 9. What was built

Marketing site (this repo, branch `claude/meta-campaign-health-tests-f7038d`):
- `/guides` index and `/guides/<slug>` pages for the six original magnets, plus `/tools` and `/tools/<slug>` for the three calculators. Every one has the lead form, gated result, and a panel or test CTA, with a prerendered `<head>` so the ad link preview renders.
- `src/lib/leads.js`, the lead client (attribution capture, 10s timeout, `Lead` event on success only).
- `public/guides/*.pdf`, five printable guides. `scripts/build-guide-pdfs.mjs` regenerates them.
- `public/ads/2026-09/*`, the 4:5 ad images; 9:16 story versions under `artifacts/meta-campaign-2026-09/creatives/story/`.

App backend (`BetterHealth-Africa`, branch `claude/marketing-leads-endpoint`):
- `migrations/172_marketing_leads.sql` and `POST /api/public/marketing-leads` (CORS allowlist, rate limit, Zod, ops email).

Meta ad account `1332108492417465` (all objects PAUSED): two campaigns, 18 ad sets (5 of them retired), 36 ads (plus 2 archived Cardion ads from before the lipid profile was added). IDs and preview links in `meta-campaign-2026-09/meta-objects.md`.

App backend, same branch: `migrations/173_cardion_add_lipid.sql` adds the lipid profile to the Cardion panel. Apply with 172 on deploy, before Campaign 1 is activated, so the panel page, the ads and the catalogue agree.

## 10. Launch checklist

1. Merge the front-end PR to `main` (Hostinger auto-deploys). Confirm `https://www.betterhealth.africa/guides/know-your-numbers/` returns 200 with the right `<title>`, and the PDF downloads.
2. Merge the backend PR ([BetterHealth-Africa#121](https://github.com/blakrisemarketing-spec/BetterHealth-Africa/pull/121)) into `staging`, then `main`; apply migrations 172 and 173 to production (Supabase MCP, both additive), then confirm `GET /api/public/disease-panels?country=Ghana` lists `LIPID` under `cardion`. Confirm `OPTIONS` and a test `POST` to `/api/public/marketing-leads` from an allowed origin return 204 and 201.
3. Submit one real test lead from a phone on the live site. Confirm the row, the ops email, and a `Lead` event in Events Manager.
4. Re-run `scripts/build-pricing-snapshot.mjs`; confirm every price in the ads matches the live catalogue.
5. Put an uptime check on `https://app.betterhealth.africa/api/health` (the host served 503/508 for minutes on 2026-08-30; paid traffic into that is burnt spend).
6. Confirm the images and copy in Ads Manager previews on a phone; check the description text is not truncated.
7. Activation is a separate approval under the spend gate: exact objects, before and after, blast radius ($10/day across both, $140 over the flight), and the undo. At activation, set each campaign's stop time to activation + 14 days (Meta refuses a spend cap under $100, so the stop time is what ends the flight). Activate Campaign 2 first for 24 hours, confirm leads arrive, then Campaign 1.
8. Day 1 to 3: no edits. Day 4: delivery check and disapprovals. Day 7: first read against section 6. Day 14: scale, iterate, or kill by the gates.

## 11. Follow-ups not built here

- **Meta Instant Forms** as a second lead-gen test: cheaper leads, no landing page, native to the feed. Form spec: intro "Free guide, delivered on WhatsApp"; questions first name, phone (WhatsApp), email optional, one custom question "Which do you want first?" (the six guides); privacy link `/privacy`; thank-you screen links to the guide page with `?unlocked=1`. Leads then need exporting or a Zapier hook into `marketing_leads`.
- **Retargeting**: once the pixel has 30 days of guide traffic, build a website custom audience (all guide visitors, 30 days, minus leads) and a lookalike from leads. No audiences exist on the account today.
- **Admin view of `marketing_leads`** in the app, with status editing, so nurture does not live in SQL.
- **`BookingStep` fires on page load** on the consultation pages; fix before reusing that page for ads.
- **Shield is displayed as "Wellness Check"** but is a malaria and typhoid screen. Rename or add a sub-line on the site; the ad already carries "malaria + typhoid".
- **Partner forms post to `api.betterhealth.africa`**, a hostname with no DNS record; every doctor, nutritionist and lab signup on the live site fails silently. Separate fix.
- **Single-test pages (`/test/<slug>/`) return HTTP 404 on the live site** for the same reason the panel pages did (not prerendered, and `.htaccess` returns a real 404 for anything not prerendered). The panel pages are fixed in this branch; the single-test pages are not. Do not point ads at `/test/...` until they are.

## 12. Decisions taken by Damzi, 2026-09-02

1. Budget: $5 per campaign per day for 14 days. Applied as $5.00 daily on each campaign; the 14-day stop time is set at activation because Meta's minimum spend cap is $100.
2. WhatsApp nurture runs from 026 859 6410.
3. Cardion: add the lipid profile. Applied to the site content, the ad copy, the card creative and the catalogue change in the app repo; the margin re-check is the one open item.
4. Spark runs, as ad set 8 with third-person copy.

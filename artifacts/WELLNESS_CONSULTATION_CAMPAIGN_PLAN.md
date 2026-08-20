# Wellness Consultation Campaign — Build & Launch Plan

**Status:** Draft v1 — 2026-08-08
**Owner:** Growth
**Hypothesis under test:** Two failure modes only — **no traffic** and **no felt need**.
Everything else (price, logistics, trust-at-scale) is explicitly *out of scope* for this test.

---

## 1. The thesis in one line

Paid traffic buys us attention; the Wellness Consultation converts that attention into
*felt need* by giving a person a plan they didn't have before — and the plan's first
step happens to be a lab test.

**What we are NOT testing:** whether the test is priced right, whether home collection
works, whether the app onboarding converts. Those are separate experiments. If this
campaign fails, we must be able to say *which* of traffic or felt-need failed — see §3.

---

## 2. Funnel definition

```
Meta/Google ad
   └─> /wellness-consultation          (dedicated landing page — NOT the site nav)
         └─> Booking form OR WhatsApp   [CONVERSION EVENT: Schedule]
               └─> Reminder sequence    (cut no-shows)
                     └─> Consultation   (30 min, Wellness Consultant)
                           └─> Wellness Plan delivered (written, named, theirs)
                                 └─> Lab test booked  [REVENUE EVENT]
                                       └─> Doctor consult on results
                                             └─> Plan v2 / retest cadence
```

The **optimisation event** for the ad platforms is `Schedule` (booking made).
The **judgement event** for the business is a paid lab test attributable to a consultation.
These are different, they live on different domains, and joining them is a build task (§5.4).

---

## 3. Decision gates — agreed BEFORE spend

Write the numbers in before launch. A campaign without a pre-agreed kill criterion
always gets "one more week".

| Gate | Metric | Target | If missed → diagnosis |
|---|---|---|---|
| G1 | Landing page CTR from ad | ≥ 1.5% | Creative/audience problem → **traffic** failure |
| G2 | Landing → booking conversion | ≥ 8% | Offer or page problem → **felt-need** failure |
| G3 | Booking → consultation attended | ≥ 55% | Friction/no-show problem → ops, not thesis |
| G4a | Tests ÷ **all bookings** | ≥ 30% | Consultation quality/script → **felt-need** failure |
| G4b | Tests ÷ **attended** consults | ~55% | Early warning. Near 30% → re-run the break-even model before scaling |
| G5 | 6-month contribution per consult vs CAC | CAC < contribution | Unit economics → offer redesign |

**Why the gates are split this way:** G1 isolates traffic. G2 and G4 isolate felt-need at
two different depths (does the *promise* create need; does the *consultation* create need).
G3 isolates ops so a no-show problem doesn't get misread as a thesis failure.

Targets above are placeholders — replace each with a number the team will actually honour.

### Break-even model — real numbers, computed 2026-08-08

Inputs, all now fixed:

```
Consultation cost          C  = GHS 60   per DELIVERED consultation
Consult → test rate        r  = 30%      of ALL BOOKINGS (decided 2026-08-08)
Attendance (G3)               = 55%      → cost per booking = 0.55 × 60 = GHS 33
Landing → booking (G2)        = 8%

Contribution per booking   =  (r × M) − (0.55 × C)  =  0.30M − 33
Max viable cost per click  =  0.08 × (0.30M − 33)   =  0.024M − 2.64
```

Gross margins are live from production (`country_test_packages.price` minus the summed
`country_diagnostic_tests.cost_price` of the panel's tests, Ghana):

| Panel | Price | Cost | Margin **M** | Per booking | **Max CPC** |
|---|---:|---:|---:|---:|---:|
| Dialics — Blood Sugar | 350 | 184 | **166** | +16.80 | **1.34** |
| Cardion — Heart Health | 475 | 224 | **251** | +42.30 | **3.38** |
| Shield — Wellness | 497 | 200\* | **297**\* | +56.10 | **4.49** |
| Metabolix — Core Health | 697 | 376 | **321** | +63.30 | **5.06** |
| Alpha / Empress | 995 | 640 | **355** | +73.50 | **5.88** |
| Panorama — Complete | 1,100 | 560 | **540** | +129.00 | **10.32** |
| Privara — Private STI | 897 | 320\* | **577**\* | +140.10 | **11.21** |
| Spark — Fertility | 1,500 | 680\* | **820**\* | +213.00 | **17.04** |

\* Margin **overstated** — one test in the panel has no `cost_price` in Ghana:
`MALARIA_RDT_BF` (Shield), `GONORRHOEA` (Privara), `SCAN_PELVIC` (Spark). Fill these in
before trusting those three rows; the pelvic scan in particular is unlikely to be cheap.

### What the model says

**Break-even panel margin is GHS 110** (= 33 ÷ 0.30). Every panel clears it, including
Dialics. **The campaign is viable on first-test margin alone.**

**A GHS 2.00 CPC needs an average panel margin above ~GHS 193.** Cardion and up clear
that comfortably; a Dialics-heavy mix sustains about GHS 1.34. So the mix matters for
headroom, not for survival — which means the script can keep recommending honestly.

### The assumption this rests on — watch it from day one

Measuring `r` against *all bookings* rather than attended consultations is the optimistic
reading, and it embeds a demanding number: **30 tests from 55 attended consults is a ~55%
close rate.** That is high for a free call with a stranger. The alternative explanation —
that a meaningful share of no-shows book a test anyway — is plausible but unproven.

If the true close rate among attendees turns out to be 30% rather than 55%, real
conversion is 16.5% of bookings, per-booking contribution at Cardion drops from GHS 42 to
**GHS 8**, and max CPC drops from GHS 3.38 to **GHS 0.67** — back under water.

**So G4 must be logged as two numbers, not one:**

| Logged | Definition | Why |
|---|---|---|
| **G4a** | tests ÷ all bookings | The headline rate this model uses. Target 30%. |
| **G4b** | tests ÷ *attended* consultations | The number that will actually move, and the early warning. Implied target ~55%. |

Both fall straight out of `wellness_consultations` — G4a from all rows, G4b filtered to
`status = 'attended'`. If G4b comes in near 30%, re-run this model before scaling spend.

### G5 — decided: 6-month contribution per consultation

Judge the campaign on contribution over the first six months per consultation: the first
test, plus the paid doctor consult, plus any retest — not first-test margin. This is what
lets the script keep recommending the narrowest honest panel, because a GHS 350 first sale
that recurs beats a GHS 1,100 one that doesn't.

Two consequences:

1. **Outcome logging must continue past the first purchase.** The `wellness_consultations`
   outcome columns capture test one; the 6-month figure needs a periodic join from the
   booking's ref code through to that patient's later purchases. Not built — see §7.
2. **The verdict is months away, so week-1 decisions need a leading indicator.** Use
   first-test contribution per booking (`0.30M − 33`) as the weekly read and the 6-month
   number as the final arbiter. Do not let the absence of the slow number stop the fast one
   from killing an obviously failing ad set.

---

## 4. Phase 0 — Offer decisions

**DECIDED 2026-08-08** unless marked open.

| # | Decision | Status | Notes |
|---|---|---|---|
| 0.1 | Consult price | ✅ **Free**, 15–20 min call in a 20-min slot | Removes every barrier to the first yes. Revisit only if no-shows breach gate G3. Cost to serve: **GHS 60** per consultation. |
| 0.2 | Booking channel | ✅ **Self-serve slot picker** on the landing page | Better show-rates, no scheduling round-trip. Carries a tracking consequence — see §4.1. |
| 0.3 | Consult delivery | ✅ **Google Meet or phone call** | Meet link for those who want it, plain phone call for those who don't. WhatsApp is the reminder + plan-delivery channel, not the call channel. |
| 0.4 | Consultant staffing | ✅ **Standby pool**, flexes with demand | No fixed roster to plan around. Still need names + numbers seeded into `wellness_consultants` for slots to appear. |
| 0.5 | Plan deliverable | ✅ **Written PDF, named after the person, on WhatsApp within 24h** | Built — see `wellness-consultation/WELLNESS_PLAN_TEMPLATE.md`. |
| 0.6 | Weekly capacity cap | ✅ **None** | The GHS 60 is a true variable cost, not a fixed salary to amortise, so budget is bounded by economics (§3) rather than by roster. Supersedes 8.5. |
| 0.7 | Geography | ⬜ Proposed: **Greater Accra only** for v1 | Keeps the variable count down. |

### 4.1 Slot picker — first-party, decided 2026-08-08

Third-party embeds (Calendly, Google Appointment Schedules) were rejected. A widget
completes the booking **inside an iframe**, where the marketing pixel cannot see it, so
`Schedule` could only fire on *widget open* — training ad delivery toward people who open
a calendar and leave. We own the request instead, and fire `Schedule` on the booking
response and nowhere else.

The app already had most of the pattern:

| Existing | Where | Reused as |
|---|---|---|
| Date + slot-grid picker UI | `client/src/pages/onboarding/ScheduleStep.tsx` (app repo) | Pattern for the marketing-site picker |
| Public slots endpoint | `GET /api/onboarding/labs/:labId/slots` | Shape mirrored for consultants |
| Marketing-site CORS precedent | `server/routes/partner-signup.ts` | Origin allowlist + preflight, copied |

**Why a new table rather than `appointments`:** the existing slots are *lab collection*
capacity, keyed to a lab, and `appointments.patient_id` is `NOT NULL`. A wellness consult
consumes a *consultant's* time and is booked by a prospect with no patient record.
Overloading `appointments` would eat collection capacity and drop consults into the lab
queue. It is equally not `consultation_requests` (a paid post-result doctor call) or
`doctor_appointments` — this is a fourth, pre-test, unpaid thing.

**Availability model:** a pool, not named consultants. The booker doesn't choose who they
speak to; a slot is bookable while any active consultant's weekly hours cover it and they
have no booking at that instant. Consultants and their hours are **data, not code**, so
decisions 0.4 and 0.6 no longer block the build — only the seed rows and the ad budget.

**Shipped on branch `claude/wellness-consultation-booking` (app repo):**

- `migrations/166_wellness_consultations.sql` — `wellness_consultants`,
  `wellness_consultant_hours` (weekly recurring blocks), `wellness_consultations`
  (booking + attribution + outcome columns), a ref-code sequence, and a partial unique
  index on `(consultant_id, scheduled_at)` as the double-booking race guard.
- `server/routes/wellness-consultations.ts` —
  `GET /api/public/wellness-consultations/slots?date=` and
  `POST /api/public/wellness-consultations`, returning a ref code.
- Mounted in `server/routes.ts`. No `publicPrefixes` change needed: `/public` is already
  whitelisted.

**This replaces the Apps Script + bookings-sheet plan.** Outcome logging for G4 and G5
lives in the booking row (`plan_sent_at`, `test_booked`, `test_panel_code`,
`test_value_ghs`), not a spreadsheet.

Keep the **WhatsApp CTA as a secondary path** — some people won't use a picker at all,
and that path fires the same event cleanly on click-out.

> **Not yet done:** the migration has **not been applied** to any database, and no
> consultant rows exist. Until they do, the slots endpoint correctly returns an empty
> list. See §7 for the seeding task.

---

## 5. Phase 1 — Measurement spine *(must land before any spend)*

- [ ] **5.1** Add `trackConsultationBooked()` to `src/lib/analytics.js` — Meta standard
      event `Schedule`, GA4 `schedule_consultation`. Standard event so Meta can
      optimise delivery toward it.
- [ ] **5.2** Create the custom conversion in Meta Events Manager on `Schedule`,
      scoped to the `/wellness-consultation` URL so it never collides with other traffic.
- [ ] **5.3** Campaign UTM taxonomy — lock it once, use it everywhere:
      `utm_source=meta|google` · `utm_medium=paid_social|paid_search` ·
      `utm_campaign=wellness_consult_v1` · `utm_content=<creative_id>`
- [ ] **5.4** **Consult → revenue join.** Every booking gets a short reference code.
      Consultant records it against the outcome (test booked Y/N, panel, value) in the
      bookings sheet. This is the only way to compute G4 and G5.
      Manual is fine for v1 — do not build a CRM for this.
- [ ] **5.5** Verify with Meta Pixel Helper + GA4 DebugView that `Schedule` fires exactly
      once per booking, on both the form and the WhatsApp path.
      **Production-only tracking** — see the warning in `README.md`; never point a
      staging build at the live pixel.

> **Known gap, accept for v1:** Meta CAPI is not wired on the marketing site, and the
> eventual purchase completes on `app.betterhealth.africa`. Browser-side `Schedule` is
> good enough to optimise this campaign. Revenue attribution stays manual via 5.4.

---

## 6. Phase 2 — Funnel surfaces (build)

- [ ] **6.1** **Four** condition routes, not one — the A/B/C/D cells are audiences, because
      the campaign tests traffic and felt need rather than copywriting technique:
      `/wellness-consultation/blood-sugar` · `/blood-pressure` · `/wellness` · `/fertility`.
      Bare `/wellness-consultation` redirects to the winner. Copy: `wellness-consultation/ABCD_TEST.md`.
- [ ] **6.2** Landing page sections, in this order:
      1. Hero — the promise is *the plan*, not the test
      2. "What you get" — the three deliverables, concrete
      3. How it works — 4 steps (consult → plan → test → doctor review)
      4. Who it's for — 3–4 recognisable situations, not demographics
      5. Meet the team — real faces; this is a trust purchase
      6. Booking form (repeat CTA)
      7. FAQ — "is it really free", "do I have to do the test", "is this a sales call"

      **SUPERSEDED 2026-08-20 — the list above is the original plan, kept for the
      reasoning.** What shipped differs on two counts. The booking form moved
      from near the bottom to fourth, directly under the self-qualification
      checklist: that is the moment the reader has decided the page is about
      them, and it took the form from 70% of page depth to 24%. And four blocks
      came out (the four-step how-it-works, a plan-covers pill wall, an
      us-vs-them table, the team roster), each restating something the page
      already said; the team section in particular was left saying only what our
      consultants are *not*, after the call not to lead on credentials.

      Current order lives in the header comment of
      `src/pages/WellnessConsultation.jsx`, which is the source of truth:
      hero · trust · agitate · checklist · **book** · belief · mechanism ·
      promise · inside-the-20-minutes · proof · scope · FAQ · close.
- [ ] **6.3** `ConsultationBooking.jsx` — embeds the slot picker (§4.1) and registers a
      `postMessage` listener for the widget's booking-completed event, firing
      `trackConsultationBooked({ channel })` **once, on completion only** — never on
      widget open. Guard against duplicate events on re-render.
      Capture a short lead row (name, WhatsApp, concern) to a **new** Apps Script
      endpoint (`VITE_CONSULT_API_URL`) writing to a separate sheet — do not pollute
      the waitlist sheet. Pattern to fork: `scripts/google-apps-script.js`.
- [ ] **6.4** Success state: what happens next, when the call is, and the reference code.
- [ ] **6.5** WhatsApp CTA with a prefilled message so the consultant knows the source:
      `wa.me/233268596410?text=Hi%2C%20I'd%20like%20to%20book%20a%20wellness%20consultation`
      Fires the same event.
- [ ] **6.6** SEO entry in `src/data/seo.js` + prerender entry in `vite.config.js`
      so the page isn't an empty `#root` to crawlers and link previews.
- [ ] **6.7** Mobile-first QA at 360px. Ghana traffic is overwhelmingly mobile; the form
      must be reachable without a pinch-zoom.

---

## 7. Phase 3 — Ops kit (this is the actual product)

- [ ] **7.1** **Consultation script** — opening, 8–10 discovery questions, the pivot to
      plan, the test recommendation, the close. Written, not improvised.
- [ ] **7.2** **Wellness Plan template** — branded, ≤ 2 pages: where you are now, your
      3 goals, what we're checking and why, your first 30 days, your review date.
      Must contain non-test actions so the plan is not a thin wrapper on an upsell.
- [ ] **7.3** **Consultant brief** — what a good consult sounds like, scope limits
      (education not diagnosis), and the standing claims guardrails in
      `.agents/skills/bh-social-visual-system/references/copy-rules.md`.
- [ ] **7.4** **Reminder sequence** — WhatsApp at booking (instant), 24h before, 1h before.
      This is the single highest-leverage no-show fix.
- [ ] **7.5** **Post-consult sequence** — plan delivered within 24h, then a nudge at
      day 3 and day 7 for anyone who hasn't booked a test.
- [ ] **7.6** **Bookings sheet** — one row per booking: ref code, source/UTM, booked at,
      attended Y/N, plan sent Y/N, test booked Y/N, panel, value. Feeds every gate in §3.
- [ ] **7.7** **Dry run** — two internal consultations end-to-end before any ad spend.

---

## 8. Phase 4 — Ads

- [ ] **8.1** Campaign structure: one campaign, objective = Leads, optimising for the
      `Schedule` custom conversion. 2–3 ad sets max — do not fragment a small budget.
- [ ] **8.2** Audiences: broad Greater Accra 28–55 first; interest stacks as the
      challenger. Broad usually wins when the creative carries the message.
- [ ] **8.3** One creative per **audience**, matched to its landing cell — see
      `wellness-consultation/ABCD_TEST.md`. Blood sugar · blood pressure · general wellness ·
      trying to conceive.
      **Every ad must clear Meta's personal-attributes policy**: state the fact about a group,
      then invite the reader, never assert the reader's condition. "Worried about your blood
      sugar?" gets rejected; "Most people in Ghana find out about their blood sugar late" runs.
      Repeat violations put the ad account at risk.
- [ ] **8.4** Message match: the ad's headline promise must appear near-verbatim in the
      landing hero. Mismatch here is the most common cause of a good CTR with no bookings.
- [ ] **8.5** Budget: bounded by the economics in §3, **not** by roster capacity — consultants
      are a standby pool and the GHS 60 is variable, so demand spikes are absorbed rather than
      rationed. The binding constraint is max viable CPC, not seats.
      *Quality risk this introduces:* pulling in standby consultants at short notice makes the
      script and brief more load-bearing, not less. Nobody takes a call un-briefed.
- [ ] **8.6** Learning-phase discipline: no edits for the first 3–4 days.

---

## 9. Phase 5 — Launch

- [ ] **9.1** Pre-launch checklist: event fires on both paths, sheet receives rows,
      reminders send, consultants briefed and calendars blocked, plan template ready.
- [ ] **9.2** Soft launch, small budget, 3 days. Confirm data flows end to end before scaling.
- [ ] **9.3** Daily read for week 1 against §3 gates; weekly thereafter.
- [ ] **9.4** Review at 14 days: scale, iterate, or kill — decided by the gates, not by feel.

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| Consultation is a sales call in disguise | Plan must contain real non-test actions (7.2); say the test recommendation is coming, up front |
| No-shows on a free booking | Reminder sequence (7.4); if > 45%, introduce a small credited fee |
| Demand exceeds consultant capacity | Hard budget cap tied to capacity (0.6, 8.5) |
| Can't tell traffic failure from need failure | Gate split in §3 |
| Revenue can't be attributed to consults | Ref code + manual outcome logging (5.4, 7.6) |
| Staging traffic pollutes production pixel | Production-only tracking rule in `README.md` |

---

## 11. Explicitly out of scope for v1

Payments on the landing page · a real booking calendar · CRM integration · Meta CAPI ·
automated plan generation · cities beyond Accra · the doctor-consult booking flow
(handled manually for v1).

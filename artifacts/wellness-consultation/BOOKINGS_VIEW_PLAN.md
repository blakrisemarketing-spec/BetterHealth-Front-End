# Wellness Consultation — Bookings View, Build Plan

**Status:** Plan · 2026-08-10 · not started
**Repo:** `BetterHealth-Africa` (app), branch `claude/wellness-consultation-booking`
**Companion:** `../WELLNESS_CONSULTATION_CAMPAIGN_PLAN.md` · `ABCD_TEST.md`

---

## 1. Why this is on the critical path, not after launch

`wellness_consultations` already has the outcome columns — `status`, `plan_sent_at`,
`test_booked`, `test_panel_code`, `test_value_ghs` — but **nothing can write to them.**
The booking API only ever inserts a row.

That means today:

| Gate | Computable? |
|---|---|
| G1 CTR · G2 landing→booking | ✅ Meta and GA4 |
| G3 attendance | ❌ needs `status` |
| G4a tests ÷ bookings | ❌ needs `test_booked` |
| **G4b tests ÷ attended** | ❌ needs both |
| G5 contribution | ❌ needs value |

Ads could run without this. But **G4b is the number that tells us whether the 30%
assumption holds**, and the whole break-even model rests on that assumption — at 30% of
attendees instead of 30% of bookings, max viable CPC falls from GHS 3.38 to GHS 0.67.
Spending without it means finding out after the money is gone.

So this ships before spend.

---

## 2. The one decision to make first — who logs outcomes

`wellness_consultants` was deliberately **not** linked to `auth.users` (migration 166), so
the four consultants have no login. Three ways out, and they trade privilege against data
quality:

| Option | Data quality | Privilege cost | Build |
|---|---|---|---|
| **A. Ops logs, consultants report over WhatsApp** | Weakest — second-hand and delayed | None. Ops already have admin | Smallest |
| **B. Consultants get `standard_admin` L1** | Best — logged minutes after the call | **L1 carries the `patients` scope, i.e. patient-account access they don't need** | Small |
| **C. New `wellness_consultant` userType** | Best | Correct least-privilege | Largest — touches the AppRouter userType branching and the 5-registry rule in `bh-arch-routing` |

**Recommendation: start with A, gated at `requireAdmin`.** It needs no new accounts and no
new privileges, and it gets the gates computable this week. If ops entry proves too slow or
too lossy — which it may, since the plan-sent and test-booked events happen days apart —
move to C rather than B. B looks cheap and quietly hands four marketing-side staff access
to patient accounts, which is the kind of trade that is easy to make and hard to undo.

Everything below is written so A and C differ only in the middleware and the nav entry.

---

## 3. Make it a tool, not a chore

A pure data-entry form gets filled in late and badly. A page a consultant opens *before*
every call because it tells them who they're about to speak to gets filled in as a
by-product.

So the page leads with **today's and tomorrow's bookings** — name, WhatsApp, the concern
they picked, the time, the reference — and the outcome fields sit on the same row. The
logging is incidental to the thing they came for.

---

## 4. What the page does

**Upcoming** (default view)
- Grouped by day, soonest first. Name · WhatsApp (tap to open chat) · concern · time · ref.
- Which landing variant they came from, as a quiet label — useful context for the call.

**Per booking, editable at any time**
- Status: `booked` → `attended` · `no_show` · `cancelled`
- `plan_sent_at` — one tap, stamps now
- `test_booked` (bool) → reveals `test_panel_code` (select from the live catalogue) and
  `test_value_ghs`
- `outcome_note` — one line on what they actually wanted; this is what tells the ads team
  which angle to buy more of

**Rows stay editable.** A test booked five days after the call is the normal case, not an
edge case, so nothing locks on save.

**Stats strip at the top** — bookings, attended, tests, and G4a/G4b for the last 30 days,
split by `landing_variant`. On the page rather than in a separate report on purpose: a
number visible to the people entering the data is the cheapest data-quality control there
is, and it is also the campaign's daily read.

---

## 5. Data model

No migration needed — migration 166 already carries every column. Two gaps to note:

- **`updated_at` is never touched.** Add a trigger, or set it in the PATCH handler. Without
  it there's no way to tell a stale row from an untouched one.
- **No link to the patient record** the person later creates. So `test_value_ghs` is typed
  by hand rather than joined from `paystack_payments`. Fine for v1; it is exactly what
  tasks #9 and #10 exist to fix, and it means **G5's six-month figure stays manual** until
  the ref-code deep link lands.

---

## 6. Endpoints

New file `server/routes/admin/wellness-consultations.ts`, mounted in
`server/routes/admin/index.ts`. Not a public route, so no `publicPrefixes` change.

```
GET   /api/admin/wellness-consultations
      ?from=&to=&status=&variant=&q=
      → paginated rows + the aggregate counts for the stats strip

PATCH /api/admin/wellness-consultations/:id
      { status?, planSent?, testBooked?, testPanelCode?, testValueGhs?, outcomeNote? }
      → updated row
```

Both at `requireAdmin` (option A). Under option C, swap for the consultant guard and scope
`GET` to that consultant's own rows.

House rules that apply (`bh-arch-coding-standards`):

- Zod on every input — no exceptions, including the query string
- `pgSql` tagged templates or Drizzle, **never** string-concatenated SQL
- No `any`; `tsc --noEmit` must pass
- **Audit-log every PATCH.** These fields decide whether a campaign scales or dies, and
  `test_value_ghs` is money. Who changed what, when.
- The logger redacts PII — do not log `whatsapp` or `full_name`; log `ref_code`

**Validation worth enforcing server-side, not just in the UI:**

- `test_booked = true` requires `test_panel_code`; a test with no panel is unattributable
- `test_value_ghs` must be > 0 when `test_booked`
- Status transitions: anything → `attended` | `no_show` | `cancelled`; block
  `attended` → `booked` (that's a mis-click, not a state)
- `plan_sent_at` set once, and only when status is `attended` — a plan sent to a no-show is
  almost always a data-entry error

---

## 7. Client

`client/src/pages/admin/wellness-consultations.tsx`, following the existing admin page
patterns (see `admin/escalations.tsx` and `admin/patients.tsx` for the table + filter shape
already in use).

Registries to touch — authenticated admin route, so only two:

1. `client/src/LabApp.tsx` — `<Route path="/admin/wellness-consultations" …>`.
   Admin and standard_admin land in **LabApp**, not PatientApp.
2. `client/src/components/layout/admin-layout.tsx` — nav entry.

Read `bh-arch-routing` before touching either. The 4-registry rule is for *public* routes
and doesn't apply here, but the userType-to-shell branching does: put the route in the
wrong shell and it 404s for exactly the people who need it.

Mobile matters. Consultants will log outcomes on a phone between calls, not at a desk.

---

## 8. What this deliberately does not solve

- **G5 at six months.** Needs the patient join (#9/#10). This view captures the first test
  only; later purchases stay invisible until a booking can be tied to an account.
- **Reminders.** The 24h/1h WhatsApp reminders (plan §7.4) are separate, and they're the
  single biggest lever on G3.
- **Consultant self-service.** Under option A, consultants don't log in at all.

---

## 9. Build order

1. `GET` endpoint + stats aggregate, Zod, audit wiring
2. `PATCH` endpoint with the validation rules in §6
3. Page: upcoming list, then outcome editing, then the stats strip
4. Nav + route registration
5. `tsc --noEmit`, then walk one booking end to end on dev — the four consultants and
   migration 166 are already seeded there
6. Backfill check: confirm a row created by the marketing-site picker shows up and can be
   taken all the way to `test_booked`

Ships into the same branch as the booking API, so it's one PR and one review.

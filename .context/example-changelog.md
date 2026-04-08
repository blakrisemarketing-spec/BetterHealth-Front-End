# Changelog: 2026-04-05-001

## Carried forward
[If this is the first changelog, leave empty. Otherwise, paste the summary from the previous changelog file here.]

---

## 2026-04-05 | Stripe checkout integration | codex
- Added Stripe SDK (`stripe` v17.4.0) as dependency
- Created `src/services/stripe.ts` — initialises Stripe client, exports `createCheckoutSession()` and `handleWebhook()`
- Created `src/app/api/checkout/route.ts` — POST endpoint that creates a checkout session and returns the URL
- Created `src/app/api/webhooks/stripe/route.ts` — handles checkout.session.completed, updates order status in DB
- Added `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to required env vars
- **main-context.md updated:** yes — added new env vars and API routes

## 2026-04-05 | Fix user avatar upload | codex
- Modified `src/components/user-profile.tsx` — replaced base64 inline storage with presigned S3 URL upload
- Modified `src/lib/storage.ts` — added `getPresignedUploadUrl()` function
- Avatar images now stored in S3 bucket instead of DB blob column
- **main-context.md updated:** no — no structural change, just implementation detail

## 2026-04-05 | Dashboard charts | claude
- Created `src/components/dashboard/revenue-chart.tsx` — Recharts area chart showing monthly revenue
- Created `src/components/dashboard/task-completion-chart.tsx` — bar chart showing task throughput
- Modified `src/app/dashboard/page.tsx` — added chart components to dashboard layout
- Added `recharts` (v2.15.0) as dependency
- **main-context.md updated:** no — recharts is minor enough to not warrant main context update

---
*When this file exceeds 80 lines, follow the rollover procedure in changelog-index.md.*

# Project: [Project Name]

## Purpose
[2-3 sentences. What this project does, who it's for, what problem it solves.]

## Stack
- **Language:** [e.g. TypeScript]
- **Framework:** [e.g. Next.js 15, App Router]
- **Database:** [e.g. PostgreSQL via Supabase]
- **ORM:** [e.g. Prisma]
- **Auth:** [e.g. NextAuth v5 with GitHub + Google providers]
- **Hosting:** [e.g. Vercel]
- **Package manager:** [e.g. pnpm]

## Architecture
[Brief description of the app's architecture. E.g. "Monolithic Next.js app with server actions for mutations, RSC for data fetching, Prisma for DB access. No separate API layer."]

## Database schema (key tables)
- `users` — id, email, name, role, created_at
- `projects` — id, user_id (FK), title, status, created_at
- `tasks` — id, project_id (FK), title, description, status, assigned_to
[Keep this to the essential tables. Full schema lives in prisma/schema.prisma or equivalent.]

## Directory structure
```
src/
  app/              — Pages and layouts (App Router)
  components/       — Reusable UI (buttons, forms, modals)
  components/ui/    — shadcn/ui primitives
  lib/              — Utilities, db client, auth config
  services/         — Business logic functions
  types/            — Shared TypeScript types
prisma/
  schema.prisma     — Database schema
  migrations/       — Migration history
```

## Environment variables
[List names only, never values]
- DATABASE_URL
- NEXTAUTH_SECRET
- GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
- NEXT_PUBLIC_APP_URL

## API routes / key endpoints
- POST /api/auth/* — NextAuth handlers
- GET /api/projects — List user projects
- POST /api/projects — Create project
[Only list routes that exist. Remove this section if using server actions only.]

## Project-specific conventions
[Anything that overrides global conventions.md. Leave empty if none.]

---
*This file contains stable project context only. For recent changes, read the active changelog via changelog-index.md.*
*Update this file ONLY for structural changes: new DB tables, new dependencies, architecture shifts, new env vars, new API routes.*

# BetterHealth Front-End

Marketing frontend for BetterHealth Africa.

A modern, conversion-optimised landing site built to launch BetterHealth Africa to the world — covering consumer health plans, B2B partner pages, waitlist signups, and compliance documentation.

---

## Agent Team

| Agent | Role | System Prompt |
|-------|------|---------------|
| **Sheldon** | Product Manager | `agents/sheldon-pm-system-prompt.md` |
| **Howard** | Senior Software Engineer | `agents/howard-engineer-system-prompt.md` |
| **Raj** | Senior UX/UI Designer | `agents/raj-designer-system-prompt.md` |
| **Leonard** | QA Engineer | `agents/leonard-qa-system-prompt.md` |
| **Amy** | System Design Thinker | `agents/amy-system-design-thinker-prompt.md` |

---

## Sprint Pipeline

Every sprint follows this order:

1. **Sheldon** — writes sprint spec and acceptance criteria
2. **Howard** — builds; does NOT push to git
3. **Raj** — design review and UX sign-off
4. **Leonard** — QA sign-off
5. **Amy** — system design review where applicable
6. **Cal** — commits and pushes to GitHub only after all sign-offs

---

## Project Structure

```
BetterHealth-Front-End/
├── README.md
├── CONTEXT.md                  ← Project context and current state
├── agents/                     ← Agent system prompts
├── artifacts/                  ← Sprint specs, QA reports
├── public/                     ← Static assets, 404.html
├── scripts/                    ← Utility scripts (e.g. Playwright captures)
├── src/
│   ├── App.jsx                 ← Routing
│   ├── index.css               ← Global styles, font imports
│   ├── components/             ← Shared UI components
│   ├── pages/                  ← Page components (16 routes)
│   ├── context/                ← React context providers (WaitlistProvider, etc.)
│   └── data/
│       └── content.js          ← All page content data
├── tailwind.config.js          ← Design tokens
└── vite.config.js
```

---

## Repository

`blakrisemarketing-spec/BetterHealth-Front-End`

**Live site:** [betterhealth.africa](https://betterhealth.africa)
**Deployed via:** GitHub Pages with custom domain

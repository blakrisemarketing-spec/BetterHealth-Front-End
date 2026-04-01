# BetterHealth Front-End

New homepage redesign for BetterHealth Africa.

A modern, conversion-optimised SaaS landing page built to launch BetterHealth Africa to the world.

---

## Agent Team

| Agent | Role | System Prompt |
|-------|------|---------------|
| **Atlas** | Product Manager | `agents/atlas-system-prompt.md` |
| **Forge** | Senior Frontend Engineer | `agents/forge-system-prompt.md` |
| **Pixel** | Senior UX/UI Designer | `agents/pixel-system-prompt.md` |
| **Scout** | Senior QA Engineer | `agents/scout-system-prompt.md` |
| **Echo II** 🔏 | Compliance Agent | `agents/echo2-system-prompt.md` |

---

## Sprint Pipeline

Every sprint follows this order — NO EXCEPTIONS:

1. **Atlas** → writes sprint spec
2. **Forge** → builds, does NOT push to git
3. **Scout** → QA sign-off
4. **Echo II** → compliance review (COMPLIANT verdict required)
5. **Cal** → commits and pushes to GitHub only after Echo II clears

---

## Project Structure

```
BetterHealth-Front-End/
├── README.md
├── artifacts/          ← Sprint specs, QA reports, compliance reports
└── src/                ← Source code (created by Forge)
```

---

## Repository

`blakrisemarketing-spec/BetterHealth-Front-End` *(to be created)*

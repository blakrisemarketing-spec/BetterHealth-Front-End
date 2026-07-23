# BetterHealth Content System

This repository includes a portable social-content system under [`.agents/`](.agents/README.md).

For any BetterHealth social content task:

1. Read `.agents/content-pipeline/PLAYBOOK.md`.
2. Use `.agents/copywriting-council/README.md` for the book-lens review process. The listed Workspace Agent IDs are OpenAI-specific; use the named lenses and prompts instead.
3. Draft from the templates in `.agents/content-pipeline/templates/` and save durable content kits in `.agents/social-content/`.
4. For image work, follow `.agents/skills/bh-social-visual-system/SKILL.md` and its references. Generate imagery without text, then compose and inspect the final asset.

Health content is general education, not a diagnosis. Keep claims supportable and use the copy guardrails in `.agents/skills/bh-social-visual-system/references/copy-rules.md`.

# Copywriting Council

This folder documents the BetterHealth copywriting council that is published in Workspace Agents.

The council is intentionally split into separate book-lens agents rather than one blended copywriting agent. Each specialist reasons from one book or framework, then the Council Chair synthesizes their outputs into a final recommendation.

Last synced: 2026-07-13

## Architecture

- `Copywriting Council Chair` coordinates the workflow and synthesizes specialist outputs.
- Each book agent reviews the same brief from a narrow lens.
- The chair preserves disagreement instead of averaging every view into generic advice.
- The individual book agents do not use Memory, so their perspectives stay distinct.
- The chair uses Memory and web search because its job is coordination, synthesis, and current-context checks.

## Published Workspace Agents

| Agent | Role | Workspace Agent ID |
| --- | --- | --- |
| Copywriting Council Chair | Synthesizes separate book-agent outputs | `agt_6a53d3c5fd648191b43645aedbb3412c` |
| Scientific Advertising | Reason-why copy, offers, proof, response tracking, tests | `agt_6a4d9e45692c8191a44edf6ba9f5c021` |
| Ogilvy on Advertising | Research-led selling, main idea, proof, brand trust | `agt_6a4d9e4f6be08191974c8070abfae09f` |
| Confessions of an Advertising Man | Brief quality, standards, craft, execution discipline | `agt_6a4d9e5802548191a9204087e1a487c6` |
| Tested Advertising Methods | Headlines, hooks, benefit clarity, direct response tests | `agt_6a4d9e6193108191b21ff551e29c1303` |
| Breakthrough Advertising | Awareness, sophistication, desire, mechanism, proof | `agt_6a4d9e6cff6c8191b6ab32e41f5fd298` |
| The Copywriter's Handbook | Practical copy structure, benefits, proof, objections, CTAs | `agt_6a4d9e75d7fc8191ba1cae1109fdd7cd` |
| Influence | Ethical persuasion, social proof, authority, trust | `agt_6a4d9e80e8a48191beb1743e5f7114f5` |
| Positioning | Category, mental ownership, contrast, focus, sacrifice | `agt_6a4d9e8a3ee481919aa3ea9ef296ba6c` |
| The 22 Immutable Laws of Marketing | Category creation, leadership, focus, perception, sacrifice | `agt_6a4d9e928a3c8191b332dd35eef56a6d` |
| Marketing Management | Segmentation, targeting, positioning, value, marketing mix | `agt_6a4d9e9bfacc8191bc02eb2d47cf63c5` |
| Crossing the Chasm | Beachhead market, whole product, references, adoption | `agt_6a4d9ea48f7c8191b4aae0f6b4e61fec` |
| Made to Stick | Simple, unexpected, concrete, credible, emotional stories | `agt_6a4d9ead0d0c8191ab610fd7fe6be544` |

## Recommended Workflow

1. Send the brief to `Copywriting Council Chair`.
2. Ask the chair which book agents should review the task.
3. Run the brief through the recommended book agents.
4. Paste their outputs back into the chair.
5. Ask the chair for a final synthesis, final copy, implementation brief, and test plan.

For a major landing-page or campaign task, a strong default panel is:

- `Breakthrough Advertising` for awareness, desire, mechanism, and proof.
- `Positioning` for category, contrast, and mental slot.
- `Ogilvy on Advertising` for brand trust and the main selling idea.
- `Scientific Advertising` for measurable offer logic and tests.
- `The Copywriter's Handbook` for practical structure and clarity.
- `Influence` for ethical persuasion and proof.
- `Made to Stick` for memorability.
- `Copywriting Council Chair` for synthesis.

## Guardrails

- These agents are framework-based assistants, not literal author simulations.
- They must not invent quotes, passages, citations, or claims about source books.
- They should not claim access to full book text unless source material is provided.
- Health, medical, legal, and financial claims must stay careful and supportable.
- If proof is missing, the agents should flag the proof gap rather than fill it with invented evidence.


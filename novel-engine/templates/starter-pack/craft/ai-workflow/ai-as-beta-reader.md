---
title: AI as Beta Reader and Diagnostician
type: guide
tags: [ai, feedback, revision]
sources: ["Brandon Sanderson, BYU creative writing lectures (2020)", "Brandon Sanderson, BYU creative writing lectures (2020)", "[[bouchard-ai-editing]]", "[[slop-guide-ai-fiction]]"]
updated: 2026-10-01
---
# AI as Beta Reader and Diagnostician

Writing-workshop rules (as taught by Brandon Sanderson, among others) translate directly to prompting a model for feedback (Sanderson, BYU 2020 lectures).

## Rules
- **Descriptive, not prescriptive.** Ask for *reactions*: where were you bored, confused, surprised? What do you expect next? Which character do you want more/less of? "I was bored" is always valid; "add a fight scene" often isn't.
- **What works first**, then "things that could use a second look."
- **Don't let it rewrite into its story.** The workshop danger — turning your book into the story *they* would write — is the model's default too.
- **Alpha vs beta** (Sanderson, BYU 2020 lectures): an "alpha" prompt asks for craft diagnosis (promises, progress, motivation consistency, rules of the core system); a "beta" prompt asks for a target reader's reactions only.
- **Use a fresh chat/model** for diagnosis so it hasn't absorbed the draft's assumptions ([[bouchard-ai-editing]]).
- Diagnose with AI; **rewrite yourself** where voice matters ([[slop-guide-ai-fiction]]).

## Prompt templates
**Beta reaction pass**
> You are a reader of {genre} who loves {model authors}. Read this chapter. Report only reactions, paragraph-anchored: where you were hooked, bored, confused; what you believe each character wants; what you predict will happen; any moment that felt unearned. Do not suggest fixes.

**Alpha craft pass**
> Check this chapter against: (1) the chapter brief, (2) the promises in `manuscript/outline.md`, (3) character motivations in the attached `story/characters/` pages, (4) core-system rules in `story/system/`. List violations, weak progress, actions contrary to motivation, and problems solved with unestablished rules or luck. Do not rewrite.

**Continuity pass**
> Compare this chapter with the attached story bible pages. List every name, place, time, physical detail, or knowledge-state that conflicts, with quotes.

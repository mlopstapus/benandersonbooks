---
title: AI Novel-Writing Patterns (What Works)
type: concept
tags: [ai, workflow, synthesis]
sources: ["[[entangledtext-ai-novel-workflow]]", "[[slop-guide-ai-fiction]]", "[[bouchard-ai-editing]]", "[[novelcrafter-codex-progressions]]", "[[writeanovelwithai-scene-brief]]", "[[max-read-elara-voss]]"]
updated: 2026-10-01
---
# AI Novel-Writing Patterns — Synthesis

Patterns that recur across practitioner sources, cross-checked against mainstream craft advice. Sources are blogs/community guides, not research; treat numbers as anecdotes.

## 1. The human owns structure; the model fills it
- Lock premise and conflict in two sentences or "AI will invent a new book every chapter" ([[entangledtext-ai-novel-workflow]]).
- Heavy pre-writing (planning dominates effort) ([[slop-guide-ai-fiction]]).

## 2. A living story bible, loaded selectively
- Compact entries: voice samples (2–3 lines/character), physical markers, secrets each POV doesn't know, open threads ([[entangledtext-ai-novel-workflow]]).
- Inject only what the scene touches. Update after every chapter that adds facts.
- **Time-aware facts** (Novelcrafter "progressions"): facts that become true at chapter N shouldn't leak into earlier scenes ([[novelcrafter-codex-progressions]]). → our `story/` pages use `## Changes over time` sections keyed by chapter.
- This vault *is* the bible: `story/` = canon.

## 3. Draft in small chunks from tight briefs
- One scene/chapter at a time; ~250–1,200 words per generation; edit between chunks and feed edited text back ([[slop-guide-ai-fiction]]).
- Brief = **Job** (POV, goal, conflict, outcome, length) / **Must include** / **Must not** / **Context pack** (prev-chapter summary + relevant bible pages) ([[entangledtext-ai-novel-workflow]]); scene briefs add stakes, emotional arc, intended reader reaction ([[writeanovelwithai-scene-brief]]).
- **Read every chapter before generating the next** — continuity debt compounds.
- → [[drafting-workflow]], the brief template (templates/pages/brief.md).

## 4. Generate options, curate by hand
- Several variants, then "kitbash" the best lines yourself. Never accept the first output.
- Treat AI-invented subplots as brief failure, not a gift — unless you consciously adopt them and update the outline.

## 5. Use AI to diagnose more than to rewrite
- Each AI rewrite pass flattens prose ("blandification"); cap ~3 passes ([[slop-guide-ai-fiction]]).
- A second model/chat checks rule violations before any rewrite ([[bouchard-ai-editing]]).
- Revise in fixed order: **structure → continuity → scene craft → line edit → proofread**; line-editing first polishes chapters you'll delete ([[entangledtext-ai-novel-workflow]]). Mirrors Sanderson's revision process.
- → [[ai-as-beta-reader]].

## 6. Fight the defaults ("slop")
- Known tells: AI-thesaurus nouns, magic adverbs, body-language clichés, "not X—it's Y," rule-of-three overuse, em-dash overuse, uniform rhythm, unearned epiphanies, over-explained subtext ([[slop-guide-ai-fiction]]).
- Default **names and places** converge (Elara Voss; bustling marketplaces) — name everything yourself ([[max-read-elara-voss]]).
- Prefer **positive** style instructions; negative lists can prime the pattern — use banned lists in a *checking* pass instead.
- → [[ai-prose-tells]].

## 7. Known model weaknesses to plan around

## 8. Budget human time
Practitioners report heavy human editing (on the order of 1–2 h per 1,000 words) to make output read as human. Plan the schedule around it.

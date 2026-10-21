---
title: The LLM Wiki Pattern (How This Vault Works)
type: concept
tags: [meta, wiki, karpathy]
sources: ["[[karpathy-llm-wiki]]", "Brandon Sanderson, BYU creative writing lectures (2020)"]
updated: 2026-10-01
---
# The LLM Wiki Pattern

This vault follows Andrej Karpathy's LLM wiki idea ([[karpathy-llm-wiki]]): raw sources stay immutable; an LLM maintains interlinked markdown pages; a schema file (`CLAUDE.md`) sets the rules. Knowledge compounds instead of being rediscovered each chat.

- **Ingest:** new source → summary page → update related pages → index → log.
- **Query:** answer from the wiki with citations; file reusable answers back.
- **Lint:** fix contradictions, orphans, broken links, stale canon.

Sanderson keeps his own worldbuilding in a private wiki (WikkaWiki) referenced by his outlines (Sanderson, BYU 2020 lectures) — `story/` is our equivalent, with the AI as continuity editor.

See `CLAUDE.md` at the vault root for the full schema.

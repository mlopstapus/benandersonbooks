# Source note — Andrej Karpathy, "LLM Wiki" (gist)
URL: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
Retrieved: 2026-10-01 via web fetch (summary extraction, not verbatim)

- Three layers: immutable **raw sources**; an LLM-maintained **wiki** of markdown pages (summaries, entity pages, cross-references); a **schema** file (e.g., CLAUDE.md) defining structure, conventions, workflows.
- The wiki is "a persistent, compounding artifact" — unlike RAG, where the model rediscovers knowledge on every question.
- Operations: **ingest** (read source, write summary, update index and 10–15 related pages), **query** (search wiki, answer with citations; good answers filed back as pages), **lint** (contradictions, stale claims, orphans, missing cross-references, knowledge gaps).
- `index.md`: content catalog by category with one-line summaries; read first. `log.md`: append-only, consistent prefixes like `## [2026-04-02] ingest | Title`, parseable with unix tools.
- Rationale: the tedious part of a knowledge base is bookkeeping; LLMs don't get bored of it. Humans curate sources and ask questions.
- Tips: Obsidian Web Clipper for capture; Obsidian graph view to spot orphans; keep it in git; enforce consistent frontmatter.

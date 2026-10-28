# Health checks

Skip `manuscript/reports/legacy-*` and anything under `raw/` for all checks.

## Mechanical (fix directly)
- **Broken links:** a `[[target]]` that matches no file (any extension counts, e.g. `[[map.svg]]`). Ignore template placeholders like `[[...]]`.
- **Missing from the index:** every page should be reachable from `index.md`, either listed by name or under a folder heading that lists it (chapters and briefs can be listed as a folder with a count).
- **Frontmatter:** pages missing it, or missing `title`, `type` or `updated`. `story/` and planning pages also need `status: draft | canon`. Exempt files are listed in conventions §9.
- **Stage fields:** briefs and chapters with no `stage`, or a value not in write-chapter's stage table. Notes files (`chNN-notes.md`), versioned or backup briefs, and chapters created by a split (which share a parent brief) are allowed; list them, don't flag them.
- **File names:** a chapter whose file slug no longer matches its title after a retitle (propose the rename, and fix links to it).
- Uncommitted changes in the book's git repo.
- **Log length:** `log.md` over about 40 entries: move all but the newest 10 to `log-archive.md`, verbatim and in order.

## Canon health (report; fix with approval)
- **Probably not synced:** chapters marked `synced` with no details-ledger section in continuity.md, or whose section there is marked pending (see SKILL.md; don't keyword-match status text).
- **Stale drafts:** `story/` pages still `status: draft` that approved chapters rely on.
- **Pending proposals:** grep loosely for `proposal` on planning and canon pages; list each with its date (or "undated") and whether a later decision already settled it.
- **Open rules the next brief needs:** anything marked "open until ChN" where N is the next chapter or earlier.
- **Contradictions:** the same fact stated differently on two pages (ages, dates, counts, places, rule details). Check running counts and the calendar against the latest chapters.
- **Retrofit queue:** items not done, especially for chapters already shared with beta readers.
- **Things without a page:** a concept, place or **person** mentioned on three or more pages with no home page (propose one, or a row in the minor-characters table).
- **One fact, two homes:** the same detail maintained on two pages. Check the canonical-homes table in the book's `CLAUDE.md` first: any page that restates one of those facts in full (rather than a line and a link) is a finding.
- **Bloated ledger:** entries in decisions.md longer than two lines, or that restate their home page; propose one-liners (shorten an entry when it is next edited, not all at once).
- **Re-proposed ideas:** a proposal on a planning page that matches something in a **Dropped** list or a rejected line in the log.
- **Stale states:** lines still marked leaning or proposal that a later decision settled.
- **Long pages:** pages over about 800 words other than continuity.md, outline.md and the core-system page (conventions §9); propose splits.
- **Stale open decisions:** items in decisions.md's Open section that later entries already settled.

## Schema drift (report)
- Folders or files the book's `CLAUDE.md` folder map doesn't mention, and map entries that don't exist. Propose an updated map.
- Folders referenced in `log.md` or `CLAUDE.md` that no longer exist.
- Facts that touch many pages but aren't in the canonical-homes table yet; propose rows.
- A second copy of the wiki the author has said is deprecated, still being written to (check the log).
- `book.yaml` values that no longer match reality (`chapters_planned`; `chapter_words` and `target_words` vs. actual). Once every chapter is synced, propose updating them to the actual figures rather than treating the overrun as a fault.
- Log lines whose op isn't in conventions §6: report the count only. Never rewrite old log lines.

## Manuscript
- Word count per chapter (body only) vs. `chapter_words`; chapters over ~1.5× the target (candidates to split).
- Chapters whose `status` mentions notes not yet applied.
- **Beta Doc** (if configured): a metadata check only (Drive title and the in-Doc version line vs. the synced chapter count, and the Doc's modified time vs. the last `sync` in the log). A paragraph-by-paragraph diff only on request, following `engine/beta-google-doc.md`.

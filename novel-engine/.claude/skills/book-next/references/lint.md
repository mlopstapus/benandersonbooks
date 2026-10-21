# Health checks

## Mechanical (fix directly)
- Broken wikilinks (a `[[page]]` with no file).
- Orphan pages (not linked from `index.md` or any other page).
- Pages missing frontmatter, or with frontmatter fields missing (`title`, `type`, `updated`, `status`).
- Briefs and chapters whose `stage` field is missing or doesn't match the stage table in write-chapter.
- `log.md` lines out of the standard format.
- Uncommitted changes in the book's git repo.

## Canon health (report; fix with approval)
- **Stale drafts:** `story/` pages still `status: draft` that later approved chapters rely on.
- **Pending proposals** older than a week (`*(proposal …; pending author)*`).
- **Open rules the next brief needs:** anything marked "open until ChN" where N is the next chapter or earlier.
- **Contradictions:** the same fact stated differently on two pages (ages, dates, counts, places, rule details). Check running counts and the calendar in continuity.md against the latest chapters.
- **Retrofit queue:** items not done, especially for chapters already shared with beta readers.
- **Concepts without a page:** a term or concept mentioned on three or more pages with no home page.
- **One fact, two homes:** the same detail maintained on two pages.

## Schema drift (report)
- Folders or files in the book that the book's `CLAUDE.md` folder map doesn't mention, and map entries that no longer exist. Propose an updated map.
- `book.yaml` values that no longer match reality (`chapters_planned`, `chapter_words` vs. actual average).

## Manuscript
- Word count per chapter vs. `chapter_words`; chapters over ~1.5× the target (candidates to split).
- Chapters whose `status` mentions notes not yet applied.
- If a beta Doc is configured: approved chapters missing from it, and the Doc's version line vs. the chapter count.

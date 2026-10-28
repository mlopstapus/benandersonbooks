---
name: book-next
description: Say where a book stands and what to do next, and run a health check on the book's wiki (broken links, stale drafts, contradictions, schema drift). Use when the author asks "where am I", "what's next", "status", "check the book", "lint", or runs /book-next.
---

# book-next

## Read
`engine/conventions.md`; the book's `book.yaml`, `CLAUDE.md` and `index.md`; the last 20 lines of `log.md`; the frontmatter of every brief and chapter; the Open section of `manuscript/decisions.md`; and the retrofit queue in `story/continuity.md` (`grep -n` for it, then read that section).

## 1. Where the book stands
Find the latest phase that has started, then the first unfinished step inside it. (A later phase having started means earlier phases count as done, even if their marker files are missing, as in a book migrated from another system.)

| Phase | Started when | Done when | Next |
|---|---|---|---|
| Setup | `book.yaml` exists | `craft/reader-taste.md` is canon and style guide sections F–H are filled | `/book-new` (resumes) |
| Planning | `story/system/` or `outline.md` has content | outline has a chapter list and the calendar (continuity.md, or the page the book's `CLAUDE.md` names) has Day 0 | `/book-plan`, naming the stages still missing (book-plan's "how to tell where you are"), the open questions that block chapter 1, and for a series whether the series arc exists |
| Drafting | any brief exists | every outlined chapter is `synced` | `/write-chapter N` for the lowest chapter not `synced` (say which stage it's at and what's waiting on the author) |
| Revising | all chapters synced, or `phase: revising` | the author sets `phase: released` | `/line-edit` passes not yet in the log, in order: repeats → trim → pronoun and belonging → word sweep. If all are logged, say revision looks done and ask the author whether to set `phase: released` |
| Released | `phase: released` | | No skill covers release (building ebook and print files, store listings). Offer a health check, or `/book-plan` for a sequel |

If `book.yaml` has a `phase` field that disagrees with what you find, report both.

**Cross-check the stage fields** (most useful on migrated books, where `stage` was filled in by hand). The reliable evidence that a chapter is synced is continuity.md: it has a details-ledger section for that chapter, and that section isn't marked pending. Don't keyword-match the free-text `status`; it is a history of notes (newest first) and old notes mention "pending" long after approval. Read the newest note only. A chapter marked `synced` without that evidence is reported as **probably not synced**; its next step is the approve stage of `/write-chapter`, after the author confirms the chapter is approved.

Report in a few lines:
- Title, form, phase, chapters synced / planned, words so far vs. target (count chapter bodies only, not frontmatter).
- The chapter in progress and what it's waiting on.
- Any stage mismatches.
- Open decisions (see `decisions.md` format; if the Open section is clearly stale, say so) and items in the retrofit queue.
- **The one next command to run.**

## 2. Health check
Run the checks in `references/lint.md` when the author asks for a check, every 10 synced chapters, or when the status above turns up something odd. Report counts and the worst findings. Fix the mechanical ones directly (commit first if the fixes touch many files), then commit `lint: <summary>` and append a `lint` line to `log.md`. List the rest for the author.

---
name: book-next
description: Say where a book stands and what to do next, and run a health check on the book's wiki (broken links, stale drafts, contradictions, schema drift). Use when the author asks "where am I", "what's next", "status", "check the book", "lint", or runs /book-next.
---

# book-next

Read `engine/conventions.md`, then the book's `book.yaml`, `index.md`, the last 20 lines of `log.md`, and the frontmatter of every brief and chapter.

## 1. Where the book stands
Work out the earliest unfinished step:

| If | Next |
|---|---|
| No `books/` folder or no `book.yaml` | `/book-new` |
| `book-new` stages incomplete (see its SKILL.md for how to tell) | `/book-new` (resumes) |
| No `story/continuity.md` calendar, or outline has no chapter list | `/book-plan` |
| A chapter not `synced` | `/write-chapter N` (say which stage it's at and what's waiting on the author) |
| All outlined chapters synced | Revision: `/line-edit` (repeats → trim → pronoun and belonging → word sweep), then release |

Report in a few lines:
- Title, form, chapters synced / planned, words so far vs. target.
- The chapter in progress and what it's waiting on (the author's approval of a brief, notes on a draft, etc.).
- Open decisions in `manuscript/decisions.md` and items in the retrofit queue.
- **The one next command to run.**

## 2. Health check
Run the checks in `references/lint.md` when the author asks for a check, every 10 synced chapters, or when the status above turns up something odd. Report counts and the worst findings; fix the mechanical ones (broken links, missing index entries, frontmatter) directly and commit `lint: <summary>`; list the rest for the author.

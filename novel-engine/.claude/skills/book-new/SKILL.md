---
name: book-new
description: Start a new work of fiction. Interviews the author about the book's basics, their taste as a reader and the authors they want to learn from, researches those authors' craft, and builds the book's style guide and voice. Use when someone wants to start a new book or novella, or runs /book-new.
---

# book-new

The first of two interviews. This one is about **the writer and the kind of book**: who the author is as a reader, whose craft to learn from, and how the prose should sound. The second interview (`book-plan`) is about the story itself.

Read `engine/conventions.md` first.

## Stages
Run in order. Each stage has its own instructions in `references/stages/`; load only the one you are running. Each stage ends by saving its output, committing, logging, and telling the author what's next. If the session ends, the next `/book-new` resumes at the first stage whose output is missing.

| # | Stage | File | Writes | Gate |
|---|---|---|---|---|
| 1 | Basics and scaffold | `01-basics.md` | `books/<slug>/` from `templates/book/`, `book.yaml`, starter pack, genre folders, local git | Author confirms `book.yaml` |
| 2 | Taste interview | `02-taste.md` | `craft/reader-taste.md`, `model_authors` in `book.yaml` | Author confirms the profile |
| 3 | Craft research | `03-research.md` | `raw/`, `craft/` concept and source pages, `craft/research-plan.md` | None (resumable; report at end) |
| 4 | Style guide and scope | `04-style-guide.md` | `craft/style-guide.md` (sections F, G, I), `craft/scope.md` | Author reviews |
| 5 | Voice calibration | `05-calibration.md` | `craft/calibration.md`, style guide section H, taste page | Author picks a version |

How to tell where you are (if the book already has an outline or chapters, treat book-new as done and point to `/book-next`): stage 1 is done if `book.yaml` exists with a real title and genre; stage 2 if `craft/reader-taste.md` exists with `status: canon`; stage 3 if `craft/research-plan.md` has no unchecked items; stage 4 if style guide section G is filled; stage 5 if section H is filled or `craft/calibration.md` holds a winning sample.

## Interviewing
- Ask a few questions at a time (three to five), in rounds. Use multiple-choice questions where the answer is a choice; leave room for the author's own words.
- Ask for **examples and anti-examples**: "a book that did this well" and "a book that made you quit". These are worth more than adjectives.
- Play back what you heard in one short summary before writing it down, and write the author's own phrasing where it is vivid.
- Don't ask what the files already answer.
- If the author already knows something (they've done the research, they have a style sheet, they've already named the model authors in another session), take it and skip ahead.
- **Tone lines count as much as content lines.** When the author reacts to an example with "too dark" or "my family wouldn't like that", write it down as a line in the taste page; later proposals have to respect it.
- **Check the config against the taste.** When model authors are chosen, compare them with `book.yaml`'s point of view, tense and audience. If the book is set to omniscient present tense and every model author writes close-third past, say so and ask, before the style guide is built on the mismatch.

## When done
Tell the author the book is set up, give a three-line summary of the voice and the model authors, and point them to `/book-plan`.

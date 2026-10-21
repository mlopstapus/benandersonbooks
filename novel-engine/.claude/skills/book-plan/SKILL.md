---
name: book-plan
description: Plan a work of fiction with the author, or change the plan later. Interviews the author to build the core system (magic, technology, the crime, the period), the story spine, the cast, the world, a stress test that locks every rule the outline depends on, and the chapter outline. Use after /book-new, when someone wants to plan or rework their story, add a character, change a rule, or runs /book-plan.
---

# book-plan

The second interview. This one is about **the story**. It ends when chapter 1 can be briefed without any open question the outline depends on.

Read `engine/conventions.md`, then `book.yaml`, `craft/reader-taste.md`, `craft/scope.md`, and the genre modules named in `book.yaml` (`templates/genres/<genre>.md`, or the book's custom module).

## Why this skill is strict
When *Ash of Verdance* was written, the first outline and chapter 1 were done on day two. That speed was good. What wasn't: about a week of later sessions went to rules decided one chapter at a time (how long effects last, whether healing sticks, range, what bystanders notice, dose counts, the calendar, how the villain escalates), each followed by fixes to chapters already written. Stage 5 asks those questions before drafting. Planning should still be fast. It just shouldn't leave holes the outline will fall into.

## Stages
| # | Stage | File | Writes |
|---|---|---|---|
| 1 | Core system | `01-core.md` | `story/system/*.md` (and `story/research/`, `raw/history/` for historical) |
| 2 | Spine | `02-spine.md` | `manuscript/outline.md` (promises, premise, threads, antagonist plan, ending) |
| 3 | Cast | `03-cast.md` | `story/characters/*.md` |
| 4 | World | `04-world.md` | `story/world/*` (overview, places, idioms-and-terms, sets, optional map) |
| 5 | Lock rules | `05-lock-rules.md` | `story/continuity.md` seeded; locked rules on their home pages |
| 6 | Outline | `06-outline.md` | `manuscript/outline.md` (set pieces, climax, clue plan, chapter list) |

First run: go in order. The author can reorder stages 1–4 if the story starts elsewhere (a character, an image, a twist); stages 5 and 6 always come last.

Everything written is `status: draft` with proposal markers until the author approves it. Commit and log after each stage (`plan: <stage>`).

## Re-running for changes
`/book-plan <section>` (e.g. "cast", "add a character", "rework act 3", "change the magic"):
1. Load only that stage's file and the pages it touches.
2. Make the change with the author.
3. **Ripple check:** search the outline, continuity.md, canon pages and every drafted chapter for anything the change contradicts. Fix planning pages directly. For drafted chapters, add rows to the **retrofit queue** in `story/continuity.md` and list them for the author; never edit approved chapter prose without the author's go-ahead.
4. Re-run the relevant part of stage 5's stress test for the changed rule.
5. Record the decision in `manuscript/decisions.md`. Commit `decision: <what>` or `retrofit: <what>`.

## Interviewing
- Offer options when the author is stuck: two or three concrete proposals, each with a one-line upside and downside, then the author picks or mixes. Mark anything you invented as a proposal.
- Ask "why" for the antagonist and every major character choice. Motive gaps are cheap to fix now.
- The author's words win. When they give a line of dialogue or a specific image, keep it verbatim.
- Keep a running "Open" list at the bottom of each page so nothing gets lost between rounds.

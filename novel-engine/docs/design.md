# Design notes

Why the engine is shaped the way it is. For how it compares with the process that produced *Ash of Verdance*, see [comparison.md](comparison.md).

## Scope
Fiction only: novels, novellas and short fiction in any genre, including historical fiction (a story with research and citations). Not nonfiction or memoir, because the system's core move (the AI proposes invented details and the author approves them into canon) doesn't apply when nothing can be invented.

## Repo vs. books
The repo is the engine: skills, rules, templates. Books live in `books/<slug>/`, which git ignores, so manuscripts never leave the author's machine (important for anyone publishing exclusively through a store like KDP). Each book folder has its own local git repository with no remote, and every stage is a commit.

## Five skills
| Skill | When | Shape |
|---|---|---|
| `book-new` | Once | Interview: basics, taste, craft research, style guide, voice calibration |
| `book-plan` | Once, then re-run by section | Interview: core system, spine, cast, world, rule lock, outline |
| `write-chapter` | Every chapter | Stage machine driven by the chapter's `stage` field, with two author gates |
| `line-edit` | When feedback arrives / before release | Modes, each a separate pass across chapters |
| `book-next` | Anytime | Status, next command, health check |

Two interviews rather than one, because the first is about the writer (stable across books) and the second about the story (changes constantly). Line editing stays separate from the chapter loop because it runs on a different clock: across many chapters, usually triggered by beta feedback days later.

## Progressive disclosure
Each SKILL.md is short: the stage table, the gates, and how to tell where you are. Each stage's instructions live in `references/stages/` (or `references/modes/`), loaded only when that stage runs, so instructions don't crowd out the manuscript in context. Rules shared by every skill live once in `engine/conventions.md`.

## Config, not hardcoding
Every skill reads `book.yaml` (title, genre modules, length, POV, audience and dialect, content lines, model authors, beta Doc). No paths, names or document IDs appear in a skill.

## Genre modules
The skeleton (calendar, counts, antagonist plan, set pieces, who knows what, ending, sets) applies to all fiction. A module in `templates/genres/` adds reader promises, the core system and its spec questions, extra lock questions, story folders, research targets and chapter checks. A book has one primary module and any number of secondaries; unlisted genres get a custom module written into the book.

## Lessons encoded
The default style guide ships with rules that were learned by fixing a finished book (pronoun ownership, sentence belonging, reword close calls, no hints that never pay off, distinct voices, the reader's English, lay-reader explanations). `book-plan`'s stage 5 asks the questions that, unasked, cost a week of retrofits. See comparison.md, section 2.

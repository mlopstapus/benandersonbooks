# Genre module format

A genre module is one file in `templates/genres/`. It tells the skills what is special about a genre. The universal skeleton (calendar, counts, antagonist plan, set pieces, who knows what, ending, sets) applies to every book; a module adds to it.

`book.yaml` names a primary genre and any secondaries. The **primary** supplies the core system. **Secondaries** add their reader promises, lock questions, story folders, research targets and chapter checks. When modules disagree, the primary wins and the skill notes the conflict for the author.

If no module fits, `book-plan` copies this format to `books/<slug>/craft/genre-module.md`, fills it in with the author, and sets `genre.custom_module` in `book.yaml`. A good custom module can be promoted into `templates/genres/`.

Every module has exactly these sections:

## Reader promises
What readers of this genre expect, which the book must deliver or deliberately subvert. Used by `book-new` (style guide section F) and `book-plan` (outline promises).

## Core system
What gets the full rules spec (templates/pages/system.md), which page it lives on, and the genre-specific spec questions to add to the standard table. Used by `book-plan` stage 01. (Secondary modules skip this section unless the author wants a second system.)

## Extra lock questions
Questions added to `book-plan` stage 05's stress test.

## Story folders
Pages and folders to create under `story/` at setup.

## Research targets
What `book-new` should study besides the model authors.

## Chapter checks
Extra passes for the fresh-eyes continuity check in `write-chapter`.

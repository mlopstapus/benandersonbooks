# Stage 4: style guide and scope

`craft/style-guide.md` already has the engine's sections A–E (story rules, prose rules, anti-slop, drafting preamble, self-check). Those rules came from real fixes on a finished book; keep them. This stage fills in what is specific to this book.

## Check the setup against the model authors first
Compare `book.yaml`'s person, POV mode, tense and audience with how the model authors write. If they conflict (the book is set to omniscient present tense and every model author writes close-third past), name the conflict and what each choice gives, and let the author decide before writing anything. Record the decision in `book.yaml` and decisions.md, and fill the style guide's **Voice basics** line.

## Fill the placeholders
- Section D (drafting preamble): substitute `{{PERSON}}`, `{{MODE}}`, `{{TENSE}}`, `{{AUDIENCE}}`, `{{GENRE}}` from `book.yaml`.
- The belonging rule's examples and the reader's-English rule's word list: add any words or habits the author already flagged in the taste interview.

## Section F: genre promises
From each genre module's **Reader promises**, plus the sub-genre promises the author named. Primary module first. Note any promise the book deliberately subverts.

## Section G: model-author rules
One subsection per model author, saying which **layer** of the book they shape (for example: one for structure, the system and multiple POVs; one for the protagonist's voice and withheld plans; one for warmth, banter and the mentor). They shape the book's one voice and its structure, not a style per character. Under each, from the concept pages: the craft principles that should govern drafting (8–15 in total), each one line, each linking its concept page. Split into "story rules" (checked at the brief) and "prose rules" (checked at the line). Where a principle conflicts with `reader-taste.md`, the taste page wins; say so on the line.

## Section I: book-specific rules
Leave empty, with the note that standing rules the author states while writing are numbered on from B15.

## Ask (one short round)
1. **Period words:** setting flavor the reader can infer, strict period language, or modern? (Update `period_words` in `book.yaml`.)
2. **Lay-reader explanations:** how much should the narration explain the core system at first use? A line, a paragraph, or let the reader work it out?
3. Any rule above they want to drop or change.

## Write `craft/scope.md`
The book's budget, so planning and drafting stay in proportion:
- Target words (or "as long as the story needs", with a working estimate in words and pages), chapter length, so the planned chapter count (round, and note that splits happen when a chapter runs long).
- For a series: roughly how long each book runs, and whether later books may grow.
- POV characters and roughly how many chapters each (the focus lead about half), plus flashback chapters, a prelude and interludes if the author wants them.
- How many main threads the length supports (a novella: one main thread and two or three subplots is typical; a novel: more).
- Cast size guide: main, supporting, minor.
- Number of key locations (and that the recurring ones get a page in `story/world/sets.md`).
- If the author named comparable books, their lengths, as a sanity check.

Commit `style: style guide and scope`, log it, and give the author a short summary of what the drafter will be held to.

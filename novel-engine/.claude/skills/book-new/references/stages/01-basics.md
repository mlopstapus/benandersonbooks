# Stage 1: basics and scaffold

## Ask (one round, mostly multiple choice)
1. Working title (any placeholder is fine) and the author's name as it should appear.
2. Genre: primary, plus any secondary (offer the modules in `templates/genres/`: fantasy, mystery, historical; anything else becomes a custom module in `book-plan`). Sub-genre in their words (gaslamp, cozy, epic…), and anything it is explicitly *not* ("not gaslamp").
3. **Standalone or series?** If a series: how many books, and whether each book centers a different lead (as *The Stormlight Archive* centers Kaladin, then Shallan, then Dalinar) or one lead carries them all.
4. Form and length: short story, novella (roughly 20–50k words), novel (70k+). A target word count if they have one, or "as long as the story needs". Authors often think in pages: about 275–300 words per page at a 6×9 trade trim, so 100k words is roughly 350–380 pages. A chapter length (default 3,500).
5. Point of view and tense: first or third; close (limited) or omniscient; one POV per chapter or mixed; one POV or several; past or present. **If the author points to a model author** ("like Sanderson"), say plainly what that author does (Sanderson: close third, past tense, several POVs, one per chapter) and confirm. Authors often say "omniscient" when they mean several limited POVs; explain the difference with a one-line example before recording it.
6. Audience: adult, young adult, middle grade, or a crossover ("adult, suitable for teens"). The reader's English (American, British…), which is about the *reader*, not the setting.
7. Hard content lines (romance, sex, violence and gore, profanity and oaths, religion, anything else). These become rules.
8. Earlier books by this author: anything not to reuse (character names, plots, settings). These go in `off_limits`.
9. Beta readers: will anyone read along as chapters are approved? If so, in a Google Doc? (Only record names and the doc ID.)

## Do
1. Make the slug (kebab-case of the working title). Create `books/<slug>/` by copying `templates/book/`. Replace `{{TITLE}}` and `{{DATE}}` placeholders.
2. Copy `templates/starter-pack/raw/ai-writing/` → `raw/ai-writing/` and `templates/starter-pack/craft/ai-workflow/` → `craft/ai-workflow/`. These are notes on what works when drafting fiction with an LLM; the book uses them from day one.
3. For each genre module named (primary and secondaries), create the folders listed under **Story folders** in `templates/genres/<genre>.md`.
4. **Series:** copy `templates/pages/series-arc.md` → `manuscript/series-arc.md`. For a standalone, delete its line from the `CLAUDE.md` folder map and canonical-homes table.
5. Fill `book.yaml`, including `series` and `off_limits`. Copy `off_limits` names into the **Do not use** list on `story/world/names.md`. Leave `model_authors`, `touchstones`, `structure` and `calendar.day0` empty for later stages.
6. Make sure the engine root's `.gitignore` contains `books/`. Then `git init` inside `books/<slug>/` (no remote) and commit `setup: scaffold`.
7. Add the new pages to `index.md`. Log `setup`.

## Confirm
Show the author `book.yaml` in a few lines and ask if anything is wrong. Then go to stage 2.

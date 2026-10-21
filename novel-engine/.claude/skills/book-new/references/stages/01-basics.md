# Stage 1: basics and scaffold

## Ask (one round, mostly multiple choice)
1. Working title (any placeholder is fine) and the author's name as it should appear.
2. Genre: primary, plus any secondary (offer the modules in `templates/genres/`: fantasy, mystery, historical; anything else becomes a custom module in `book-plan`). Sub-genre in their words (gaslamp, cozy, epic…).
3. Form and length: short story, novella (roughly 20–50k words), novel (70k+). A target word count if they have one, and a chapter length (default 3,500).
4. Point of view and tense: first or third; limited or omniscient; one POV or several; past or present.
5. Audience: adult, young adult, middle grade. The reader's English (American, British…), which is about the *reader*, not the setting.
6. Hard content lines (romance, sex, violence and gore, profanity, anything else). These become rules.
7. Beta readers: will anyone read along as chapters are approved? If so, in a Google Doc? (Only record names and the doc ID.)

## Do
1. Make the slug (kebab-case of the working title). Create `books/<slug>/` by copying `templates/book/`. Replace `{{TITLE}}` and `{{DATE}}` placeholders.
2. Copy `templates/starter-pack/raw/ai-writing/` → `raw/ai-writing/` and `templates/starter-pack/craft/ai-workflow/` → `craft/ai-workflow/`. These are notes on what works when drafting fiction with an LLM; the book uses them from day one.
3. For each genre module named (primary and secondaries), create the folders listed under **Story folders** in `templates/genres/<genre>.md`.
4. Fill `book.yaml`. Leave `model_authors`, `touchstones` and `calendar.day0` empty for later stages.
5. Make sure the engine root's `.gitignore` contains `books/`. Then `git init` inside `books/<slug>/` (no remote) and commit `setup: scaffold`.
6. Add the new pages to `index.md`. Log `setup`.

## Confirm
Show the author `book.yaml` in a few lines and ask if anything is wrong. Then go to stage 2.

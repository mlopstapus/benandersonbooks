# Stage 3: craft research

Goal: turn what the model authors (and the genre) teach about craft into short, cited concept pages the style guide and planning can lean on. This is the longest stage. It saves as it goes and resumes.

## Plan first
Write `craft/research-plan.md`: a checklist with one line per source to process, grouped by model author, then genre research targets (from each genre module's **Research targets**). Mark each `[ ]` and tick it as it's done. On resume, start at the first unticked line.

For each model author, look for (in this order):
1. Lecture series, classes or talks on writing, with transcripts or captions available.
2. Essays and blog posts on craft by the author.
3. Long interviews where they discuss process.
4. Serious critical analysis of their style by others (reviews, craft blogs), clearly labeled as secondhand.

Use web search and fetch. Some pages need a browser (for example a video's transcript panel). If a source can't be read, note it in the plan and move on.

## Per source
1. Save a **source note** in `raw/<author-slug>/<source-slug>.md`: full citation, URL, date retrieved, and either the transcript (only if it is freely published, such as video captions of a public lecture) or a faithful summary with timestamps or section references. Never copy text from the author's books.
2. Write a **summary page** in `craft/<author-slug>/sources/<source-slug>.md`: the main craft points, each cited to the note with a timestamp or section.

## Concept pages
After each source, create or update **concept pages** in `craft/<author-slug>/` (one concept per page: e.g. "promise, progress, payoff", "limitations over powers", "fair-play clues"). Each page:
- What the concept is, in two or three sentences.
- How the author applies it, with citations to the source summaries (`([[source-slug]] ~41:27)`).
- A callout translating it into an action for this book: `> [!tip] For this book` (use what you know from `reader-taste.md`).
- Links to related concepts.

When two sources disagree, note it inline: `> [!warning] Conflicts with [[page]]: …`.

If a model author has little public craft material, say so to the author, and fill the gap with general craft sources on the same subjects rather than guessing at the author's methods.

## Genre research
Work through each genre module's research targets the same way. Historical fiction research about the *period* itself (not craft) belongs to `book-plan` (stage 01), which saves to `raw/history/` and `story/research/`. Here, only collect what helps write in the genre.

## Finish
Update `index.md` with every new page (grouped by author). Commit after each author (`research: <author>`), log each. Report: how many sources, the ten most useful concepts with one line each, and any authors whose material was thin.

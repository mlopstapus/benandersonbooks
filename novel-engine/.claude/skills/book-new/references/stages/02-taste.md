# Stage 2: taste interview

Goal: a reader-taste profile specific enough that a drafter could pass a blind test ("would this author like this paragraph?"). It also picks the **model authors** whose craft stage 3 researches.

In *Ash of Verdance* this profile was the most-cited page in the whole book. Where it conflicts with the style guide, the taste page wins.

**Same author, earlier book?** If another folder in `books/` has a canon `craft/reader-taste.md` by this author, start from it: play it back in a few lines and ask only what's different for this book. Don't re-ask what it answers.

## Round 1: broad (three to five questions)
- Favorite authors and books, and **what specifically** they love about each (a character, a scene, a feeling, a technique).
- Books they quit or skimmed, and why. Things that make them put a book down.
- The kind of experience they want *this* book to give a reader.
- Two or three touchstones for this book (books, films, shows).
- **Characters they'd love to see a version of** (a favorite rogue, mentor or detective). These become *models* for the leads in `book-plan`, with deliberate differences so the lead is their own person.

## Round 2: targeted follow-ups by section
Fill gaps in each section below. Push for examples on anything vague ("strong characters" → "strong how? who?").
- **Characters:** what makes them care (flaws, competence, humor, struggle); preferred arc shapes; protagonist survives?; mentors?
- **Villains:** what kind they find compelling (sympathetic, monstrous, a point of view the reader half agrees with).
- **Themes:** what they want the book to be about underneath.
- **World and system:** how much lore, how hard the rules, era feel, in-world slang.
- **Structure and pacing:** slow burn vs. fast; tolerance for slow openings; multiple POVs; endings (happy, bittersweet, a win at a real cost).
- **Prose:** spare or lush; humor; how much interior thought.
- **Content lines:** confirm the stage 1 lines and add anti-examples (a specific book or scene that crossed the line).
- **Tone lines:** what's allowed but unwelcome (the death of a child, a sibling's drowning, cruelty played for laughs), and who else reads the book (a spouse, kids, parents) whose comfort matters. Ask lightly; the author will add more when a proposal crosses one.
- **Action and politics balance:** how much physical danger they want (fights, chases) and how much intrigue (councils, guilds). Authors often want "a little politics, not a political novel"; record their phrasing.

## Synthesize
- **Tensions to manage:** where two likes pull against each other (deep lore vs. a fast opening; a villain with a point vs. no politics). For each, one line on how the book will honor both.
- **Model authors:** propose two to four, mostly from the author's favorites, chosen for the craft the book needs (e.g. one for magic systems, one for mystery plotting). Prefer authors who have talked publicly about craft (lectures, essays, interviews), since that's what stage 3 can study. Say so when an author has little public craft material. The author approves the list.

## Write `craft/reader-taste.md`
Frontmatter `type: guide`, `sources: ["interview with the author, YYYY-MM-DD"]`. Sections:

```
# Reader taste profile
(one line: where this conflicts with the style guide, this page wins)
## Characters
## Content lines (hard rules)
## Tone lines (allowed, but not for this book or its readers)
## Themes
## Villains
## World and system
## Structure and pacing
## Prose
## Tensions to manage
## Touchstones
## Character models (favorite characters to borrow from, and what to change)
## Model authors (and what to learn from each)
## Open questions
```
Each bullet is concrete, uses the author's phrasing where it's vivid, and names its example or anti-example.

Update `book.yaml` (`model_authors`, `touchstones`, `content_lines`). Play back a summary, get a yes, set `status: canon`, commit `taste: reader profile`, log it.

# {{TITLE}} — book schema

This folder is an LLM-maintained wiki for one work of fiction. The author curates sources and makes creative decisions; the AI does the reading, filing, cross-linking, drafting and bookkeeping.

**Every session:** read `../../engine/conventions.md`, then `book.yaml`, then this file, then `index.md`. Then only the pages the task needs (see **Load tiers**).

## Skills
| Skill | Use it to |
|---|---|
| `/book-new` | (done) set up this book: taste, craft research, style guide, voice |
| `/book-plan` | plan or change the series arc, core system, spine, cast, world, locked rules, outline |
| `/write-chapter N` | brief → draft → check → approve → canon sync for chapter N (resumes where it left off) |
| `/line-edit` | prose passes across chapters; beta-reader comments; trims |
| `/book-next` | what to do next, and a health check |

## Folder map
```
raw/                    immutable source notes (craft research, AI-writing notes, research sources)
craft/                  reader-taste.md, style-guide.md, calibration.md, scope.md, concept pages, ai-workflow/
story/system/           the core system (magic, technology, the crime, the period) — how things ACTUALLY work
story/research/         (historical books only) one cited page per topic; fact-vs-invention ledger
story/world/            setting, present day, places, names.md, idioms-and-terms.md, sets.md, map
story/institutions/     (if the book has them) a hub page for power and politics + one page per guild, house, faction or agency
story/characters/       one page per character, with "Knows / doesn't know"
story/events/           history and timeline
story/mythology/        what people believe, kept apart from what is true
story/continuity.md     calendar, running counts, who-knows-what, observables, retrofit queue, details ledger
manuscript/series-arc.md (series only) the plan across every book
manuscript/outline.md   this book: shape, promises, threads, set pieces, climax, chapter list and beats
manuscript/decisions.md ledger of settled and open decisions
manuscript/ideas.md     parking lot (the author's ideas and the AI's, kept apart)
manuscript/briefs/      chNN-brief.md
manuscript/chapters/    chNN-slug.md
manuscript/reports/     continuity checks, line-edit and trim reports
index.md                catalog of every page
log.md                  append-only history (recent entries)
log-archive.md          older log entries, moved here unchanged
```
Delete the lines for folders this book doesn't use, and add any the book grows.

## Where things go (keep pages separate)
- A fact about one character, place or institution goes on that page; only facts involving two or more institutions go on the institutions hub.
- Plans that span books go in `manuscript/series-arc.md`; this book's plans go in `manuscript/outline.md`.
- What people believe goes in `story/mythology/` or the society page; what is actually true goes on the system or events page. Link the two.
- When a page starts covering a second subject, split it.
- Check `story/world/names.md` before naming anything.

## Canonical homes (write a fact once; link to it everywhere else)
Some facts touch many pages. Each has one home where it is written in full; every other page gets one line and a link. Fill this in as planning settles big facts.
| Fact | Home |
|---|---|
| The core system's rules | `story/system/<name>.md` (continuity keeps only the one-line quick reference) |
| What is true at chapter N: counts, who knows what, observables, details ledger | [[continuity]] |
| Series threads and how the leads meet | [[series-arc]] (series only); this book's clue and payoff table in [[outline]] |
| A character's past, personality, beats and "Knows / doesn't know" | that character's page |
| Names in use and banned names | [[names]] |
| Prose rules and the book's voice sample | [[style-guide]]; [[calibration]] |

## Load tiers (keep sessions cheap)
Always: the four files in "Every session". Then by task:
| Task | Load |
|---|---|
| Draft a chapter | [[style-guide]], [[calibration]], [[continuity]], the chapter's brief, the POV character's page, pages for the places and people in the brief; the system page only if the scene uses it |
| Scene brief or outline work | [[outline]], [[series-arc]] (series), the Open list in [[decisions]], the pages the scene touches |
| Planning session on one topic | that topic's home page, its links one level out, the Open list in [[decisions]] |
| Check a fact | [[continuity]] first, then the fact's home page from the table above |
| Name something | [[names]] |
Do not load [[log]], [[log-archive]], [[ideas]] or `raw/` unless the task is about them. Search [[decisions]] for a specific past decision instead of reading the whole page.

## Edit hygiene
- Edit pages in place; put all changes to a page into one write, and touch as few pages as the canonical homes allow. A decision that lands on its home page, one decisions line and one log line is the target.
- `decisions.md` is a ledger: one line per decision (the decision, date, scope, link to its home page). Open questions live in its Open list; when one is settled, move it to Settled as a one-liner.
- Log entries are one line: `## [YYYY-MM-DD] op | what changed`. When `log.md` passes about 40 lines, move all but the newest 10 to [[log-archive]], verbatim.
- Superseded text goes in the log and git, not on live pages. Keep a "Dropped" line on a page only when the rejected idea is likely to be suggested again.
- This folder is the only copy of the wiki. If a copy exists elsewhere, don't write canon there.

## Cast map
Which file holds which character (fill in as characters are added). Pages named by role (`protagonist.md`) need a row here.
| Character | File |
|---|---|

## Where things live
- Calendar: `story/continuity.md` → Calendar (change this line if the book keeps it elsewhere).

## Book-specific rules
Standing rules the author states for this book (world rules such as "no magic but the one system", tone rules such as "a little politics, not a political novel"). Prose rules also go in `craft/style-guide.md` section I.

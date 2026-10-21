# {{TITLE}} — book schema

This folder is an LLM-maintained wiki for one work of fiction. The author curates sources and makes creative decisions; the AI does the reading, filing, cross-linking, drafting and bookkeeping.

**Every session:** read `../../engine/conventions.md`, then `book.yaml`, then this file, then `index.md`. Then only the pages the task needs.

## Skills
| Skill | Use it to |
|---|---|
| `/book-new` | (done) set up this book: taste, craft research, style guide |
| `/book-plan` | plan or change the core system, spine, cast, world, locked rules, outline |
| `/write-chapter N` | brief → draft → check → approve → canon sync for chapter N (resumes where it left off) |
| `/line-edit` | prose passes across chapters; beta-reader comments; trims |
| `/book-next` | what to do next, and a health check |

## Folder map
```
raw/                    immutable source notes (craft research, AI-writing notes, research sources)
craft/                  reader-taste.md, style-guide.md, scope.md, concept pages, ai-workflow/
story/system/           the core system (magic, technology, the crime, the period) — how things ACTUALLY work
story/research/         (historical books only) one cited page per topic; fact-vs-invention ledger
story/world/            places, cultures, idioms-and-terms.md, sets.md (recurring locations), map
story/characters/       one page per character, with "Knows / doesn't know"
story/events/           history and timeline
story/continuity.md     calendar, running counts, who-knows-what, observables, retrofit queue, details ledger
manuscript/outline.md   promises, threads, climax, set pieces, chapter list
manuscript/decisions.md settled and open decisions
manuscript/ideas.md     parking lot
manuscript/briefs/      chNN-brief.md
manuscript/chapters/    chNN-slug.md
manuscript/reports/     continuity checks, line-edit and trim reports
index.md                catalog of every page
log.md                  append-only history
```

## Cast map
Which file holds which character (fill in as characters are added):
| Character | File |
|---|---|

## Where things live
- Calendar: `story/continuity.md` → Calendar (change this line if the book keeps it elsewhere).

## Book-specific rules
Add standing rules the author states for this book here (they also go in `craft/style-guide.md` if they are prose rules).

# Novel Engine

The AI-assisted fiction-writing system used to write *Ash of Verdance*, packaged as Claude skills. You bring the taste and the decisions; the skills run the interviews, research, drafting, continuity checks and bookkeeping.

## Layout

| Path | What |
|---|---|
| `.claude/skills/` | The five book-writing skills |
| `engine/` | Rules every skill follows (`conventions.md`) and the optional beta-reader Google Doc procedure |
| `templates/` | The book scaffold, page templates, genre modules, and a starter pack of notes on writing fiction with an LLM |
| `docs/` | Design notes, a comparison of the skills with how *Ash of Verdance* was actually written, and what planning the *Thornwake* trilogy added |
| `books/` | Your books. **Git-ignored**, so manuscripts never leave your machine |

## Writing a book with it

You need [Claude Code](https://claude.com/claude-code) (the skills load automatically when you run it from the `novel-engine` folder).

```bash
git clone https://github.com/mlopstapus/benandersonbooks.git
cd benandersonbooks/novel-engine
claude
```

Then:

| Step | Run | What happens |
|---|---|---|
| 1 | `/book-new` | An interview about you and the book: genre, length, point of view, your taste as a reader and the authors you want to learn from. It researches those authors' craft talks and essays, then builds a style guide and calibrates the voice with A/B samples. Creates `books/<your-book>/`. |
| 2 | `/book-plan` | Interviews and riff sessions about the story, one topic at a time: the series arc (for a series), the core system (magic, technology, the crime, the period), the spine, the cast, the world and its institutions, a stress test that locks every rule the outline depends on, and the chapter outline with beats. |
| 3 | `/write-chapter 1` | Brief → **you approve** → draft → fresh-eyes continuity check and polish → **you approve** → canon sync. Run it again and it picks up where the chapter left off. Repeat for every chapter. |
| 4 | `/line-edit` | Prose passes across chapters: pronouns, sentences that don't belong, dialogue, repeats, trims, word sweeps, beta-reader comments. |
| any time | `/book-next` | Where the book stands, the one command to run next, and a health check. |

If you only remember one thing: **run `/book-next`.**

### How it works
- Each book is a small wiki (it opens as an [Obsidian](https://obsidian.md) vault). `craft/` holds how to write this book, `story/` holds what is true in it (canon), `manuscript/` holds the outline, briefs and chapters. `story/continuity.md` tracks the calendar, running counts, who knows what, and every concrete detail a later chapter could contradict.
- **You decide what is true.** Anything the AI invents is a proposal until you approve it. Nothing becomes canon without your sign-off, and no prose is written before you approve the chapter's brief.
- Every chapter is checked by a separate reviewer that didn't write it.
- Each book folder is its own local git repository with no remote. Every step is a commit, so any pass can be undone.
- **Series:** for a trilogy or longer, `book-plan` keeps a series arc (one question per book, threads hinted, turned and paid off, the antagonist revealed layer by layer, a focus lead per book if you want one) and every book-1 choice is checked against it.
- Genres plug in as modules in `templates/genres/`. v1 ships fantasy, mystery and historical fiction, and they combine (a fantasy mystery uses both). Fiction only.

### Beta readers
If people read along as chapters are approved, `book.yaml` can point at a shared Google Doc. Approved chapters are appended to it, and `/line-edit` works through readers' comments and keeps the Doc in sync. Needs the Google Drive and Docs connectors.

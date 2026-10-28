# Engine conventions

Every skill in this repo reads this file first. It holds the rules that apply to every book and every stage. Skill files hold only what is specific to them.

## 1. Find the book

Books live in `books/<slug>/` (git-ignored, so manuscripts never leave the author's machine). Resolve the active book in this order:

1. The author named it ("chapter 7 of ash-of-verdance").
2. The current working directory is inside `books/<slug>/`.
3. There is exactly one folder in `books/`.
4. Otherwise list the books and ask.

Then read, in this order: `books/<slug>/book.yaml`, `books/<slug>/CLAUDE.md`, `books/<slug>/index.md`. Read other pages only as the stage needs them: the book's `CLAUDE.md` has a **load tiers** table that says which pages each kind of task needs. Don't load `log.md`, `log-archive.md`, `ideas.md` or `raw/` unless the task is about them, and search `decisions.md` for a past decision rather than reading it whole.

**The book folder is the only copy of the wiki.** If the author also keeps a copy somewhere else (a claude.ai Project, a synced drive), treat it as read-only or ignore it; never write canon to two places.

All paths in skill files are relative to the book folder unless they start with `engine/`, `templates/`, `.claude/` or `books/`; those are relative to the engine root (the folder that holds `.claude/skills/`, normally `novel-engine/`).

## 2. The layers (never mix them)

| Folder | Holds | Who edits |
|---|---|---|
| `raw/` | Source notes, transcripts, links. Immutable once saved | Nobody (add only) |
| `craft/` | How to write: taste profile, style guide, craft concepts | AI, from `raw/` and interviews |
| `story/` | What is TRUE in this book: canon | AI proposes, author approves |
| `manuscript/` | Outline, decisions, briefs, chapters, edit reports | Author and AI |
| `publish/` | Release files | Author |

Advice ("magic needs costs") lives in `craft/`. Facts ("this magic costs the caster a memory") live in `story/`.

## 3. Canon and approval

- **The author decides what is true.** Anything the AI invents (a name, a rule, a place, a past event) is a *proposal* until the author approves it.
- Every line on a planning or canon page has one of four states, and the state is visible on the line:

  | State | Meaning | Marker |
  |---|---|---|
  | canon | The author decided it | `(canon, YYYY-MM-DD)` on the line or its heading; in chapter-sourced lines, `(Ch3, approved YYYY-MM-DD)` |
  | leaning | The author likes it but hasn't committed | `(leaning, YYYY-MM-DD)` |
  | proposal | The AI suggested it; the author hasn't answered | `*(proposal YYYY-MM-DD; pending author)*`, or `(proposed)` inside tables |
  | dropped | The author rejected or replaced it | moved to a **Dropped** list on the page, with what replaced it |

- Mark ideas the AI contributed `(Claude)` when they sit next to the author's, so the author can see whose idea is whose (the ideas page keeps them in separate sections).
- **Changing a decision:** write the new version and say what it replaces, in the same line ("…(replaces 'built on the ruins', 2026-10-27)"). Don't leave both versions live.
- Page-level `status:` in frontmatter is `draft` until the author approves the page, then `canon`.
- When the author rejects something, take it off the live page. Keep a one-line entry in the page's **Dropped** list only when the idea is likely to be suggested again (so nobody re-proposes it); the full history lives in `log.md` and git.
- **One fact, one home.** Each fact lives on exactly one page; other pages link to it with `[[wikilinks]]`. Facts that touch many pages (the core rules, the antagonist's secret, the protagonist's wound) are listed in the **canonical homes** table in the book's `CLAUDE.md`. Every other page gets one line and a link, never a second full statement; when you edit a page that restates a fact in full, cut the restatement to a link in the same edit.
- When a page starts covering a second subject (a guild page collecting facts about a second guild, a character page collecting a plot), split it.
- `story/continuity.md` is the single most important canon file. It holds the calendar (unless the book's `CLAUDE.md` names another home for it), running counts, the who-knows-what matrix, what bystanders can observe, the retrofit queue, and a per-chapter details ledger. Keep it current; read it in chunks (`grep -n`, then a line range) once it grows.

## 4. Gates

Skills stop and wait for the author at these points, and never roll past them:

- Brief approval (before any prose).
- Chapter approval (before canon sync).
- Any new fact that would change canon.
- Any story choice (cut vs. keep, which version of an event). Ask a short numbered question; don't make a silent edit.

Close-call *prose* fixes (pronouns, a clearer word, a reworded sentence) do not need a gate: apply them and list them in the report ("when in doubt, reword").

When asking the author several things at once, number them so they can answer "1 yes, 2 no, 3 use the second option".

## 5. Editing files safely

- Edit in place with a small script that replaces an exact string **only if it occurs exactly once**, and fails loudly otherwise. Never rebuild a whole chapter from memory or from a truncated tool result.
- Before a pass that touches many chapters, commit (see 6) so the pass can be reverted in one step.
- Large files: search first, then read the lines you need.
- If files live on a linked computer rather than locally, do the editing with that computer's shell, not a copy.

## 6. Version control and the log

- Each book folder is its own local git repository with no remote (`book-new` creates it). After every stage that writes files, commit inside the book folder:
  `git -C books/<slug> add -A && git -C books/<slug> commit -m "<op>: <what>"`
  where `<op>` is one of `setup, taste, research, style, plan, canon, brief, draft, check, approve, sync, retro, line-edit, trim, lint, decision, retrofit`.
- Also append one line to `log.md`: `## [YYYY-MM-DD] <op> | <what>`. One line, a few words on what changed, with no restated rationale (the pages carry that). The log is for humans reading the vault in Obsidian; git is for diffs and rollback. The log is append-only: never rewrite old lines, even ones that use other op names. When `log.md` passes about 40 entries, move all but the newest 10 to `log-archive.md`, verbatim and in order.
- `manuscript/decisions.md` is a **ledger**, not a second copy of the wiki: one line per decision (what was decided, the date, its scope such as book 1 or trilogy, and a link to its home page). Open questions live in its Open list as `- [ ] question (raised YYYY-MM-DD, affects …)`; when one is settled, move it to Settled as a one-liner.
- A decision that lands on its home page, one decisions line and one log line is the target. Put all of a session's changes to a page into one write.
- Never push a book folder anywhere.

## 7. Fresh eyes

The writer of a chapter is blind to its own inventions. Continuity checks and other reviews run in a **separate subagent** that did not draft the text, and that subagent reports only; it changes nothing. If subagents are unavailable, start the review in a new session.

## 8. Style rules are cited by name

Books number their style rules differently (the engine's default guide calls the pronoun rule B9; a migrated book may call it B13). Skills refer to rules by name: *the pronoun rule, the belonging rule, the reword rule, the payoff rule, the distinct-voices rule, the reader's-English rule, the lay-reader rule*. Find the rule in the book's style guide by its title.

## 9. Page conventions

- Kebab-case file names. Obsidian wikilinks `[[page-name]]` without extensions. Every page links to at least one other page and is listed in `index.md`.
- Frontmatter on every page except `raw/`, `CLAUDE.md`, `index.md`, `log.md`, `log-archive.md` and files under `manuscript/reports/`:
  ```yaml
  ---
  title:
  type: concept | guide | character | place | culture | institution | world | event | myth | system | research | brief | chapter | report | source
  aliases: []        # other names the page answers to (Obsidian uses these for links and search)
  tags: []
  sources: []
  updated: YYYY-MM-DD
  status: draft | canon
  ---
  ```
  `status: draft | canon` applies to `story/` pages and planning pages. Briefs and chapters instead carry `stage:` (the machine-readable step, see write-chapter) and a free-text `status:` (the human note). Craft concept and source pages need no status.
- Scene breaks in chapters are a line with `* * *` or `---`; the first sentence after one names the acting person or the POV character.
- Split a page once it passes about 800 words, except `continuity.md`, `outline.md`, `series-arc.md`, `decisions.md` and the core-system page, which are allowed to grow. A hub page plus one page per member (a guilds hub and one page per guild) is the usual split for a topic that grows.
- Never invent quotes from sources. Paraphrase unless copying the raw note exactly.
- `raw/` holds notes, summaries and links. Do not copy the text of published books into it.

## 10. Working sessions (planning and riffing)

Planning happens in conversation, often across many topical sessions (the magic, the history, the guilds, the cast, the trilogy, the book's chapters). The author thinks aloud; the AI's job is to listen, synthesize, extend and keep the books.

- **Synthesize, then extend.** Play back the author's idea in clean form, then follow it out: what it implies for the rules, the world, the cast and later books. Flag the logic gaps it opens ("if nothing grows, why can't they farm indoors?") as questions, not silent fixes.
- **Check every proposal against canon before offering it.** Walk it through the locked rules and the who-knows-what table first. A proposal that breaks a rule (a seal that can't matter because travelers return to where they left), or a scene that needs a character to know what they can't (a crew fighting guards who don't know the crew is there), wastes the author's attention.
- **Two or three options with a recommendation.** Each option gets a one-line upside and downside; say which you'd pick and why. The author picks, mixes or rejects. Keep the author's own words and images verbatim.
- **Respect "not now."** When the author says a question can wait, park it in decisions.md's Open list with what it affects and the first chapter or book that needs it, and stop asking. Raise it again only when that chapter's brief or that book's planning arrives.
- **Respect tone lines.** If the author rejects an idea as too dark or not for their readers, record the line in `craft/reader-taste.md` (content and tone lines) so later proposals don't cross it.
- **Save at natural checkpoints, in one pass.** In a long session it is fine to settle several things in conversation and then write them all at once (pages, one decisions line each, one log line), as long as nothing settled is lost if the session ends. Say what you'll save and when.
- **Finish big sessions with a consistency pass.** After a session that changed several pages, search the wiki for lines the new decisions contradict (a stale "greenhouses are rare" after deciding there are none) and fix or flag them.

## 11. Talking to the author

- Lead with the result, not the process. Short reports: what changed, what needs a decision, where to look.
- When a chapter or brief is ready to read, send the file itself (as an attachment where the app supports it) as well as saving it in the book.
- Use the author's own words for things in their world. Explain any period or setting term the author might not know.

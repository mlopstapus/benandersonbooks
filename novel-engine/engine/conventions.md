# Engine conventions

Every skill in this repo reads this file first. It holds the rules that apply to every book and every stage. Skill files hold only what is specific to them.

## 1. Find the book

Books live in `books/<slug>/` (git-ignored, so manuscripts never leave the author's machine). Resolve the active book in this order:

1. The author named it ("chapter 7 of ash-of-verdance").
2. The current working directory is inside `books/<slug>/`.
3. There is exactly one folder in `books/`.
4. Otherwise list the books and ask.

Then read, in this order: `books/<slug>/book.yaml`, `books/<slug>/CLAUDE.md`, `books/<slug>/index.md`. Read other pages only as the stage needs them.

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
- Proposals are written with a visible marker: `*(proposal YYYY-MM-DD; pending author)*`. Approved facts carry the source: `- Ostley combs his whiskers in the window reflection (Ch3, approved YYYY-MM-DD).`
- Page-level `status:` in frontmatter is `draft` until the author approves the page, then `canon`.
- When the author rejects something, strike it through (`~~...~~`) on planning pages rather than deleting it, so the history of the decision stays visible. On canon pages, remove it.
- **One fact, one home.** Each fact lives on exactly one page; other pages link to it with `[[wikilinks]]`.
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
  where `<op>` is one of `setup, taste, research, style, plan, canon, brief, draft, check, approve, sync, line-edit, trim, lint, decision, retrofit`.
- Also append one line to `log.md`: `## [YYYY-MM-DD] <op> | <what>`. The log is for humans reading the vault in Obsidian; git is for diffs and rollback. The log is append-only: never rewrite old lines, even ones that use other op names.
- Never push a book folder anywhere.

## 7. Fresh eyes

The writer of a chapter is blind to its own inventions. Continuity checks and other reviews run in a **separate subagent** that did not draft the text, and that subagent reports only; it changes nothing. If subagents are unavailable, start the review in a new session.

## 8. Style rules are cited by name

Books number their style rules differently (the engine's default guide calls the pronoun rule B9; a migrated book may call it B13). Skills refer to rules by name: *the pronoun rule, the belonging rule, the reword rule, the payoff rule, the distinct-voices rule, the reader's-English rule, the lay-reader rule*. Find the rule in the book's style guide by its title.

## 9. Page conventions

- Kebab-case file names. Obsidian wikilinks `[[page-name]]` without extensions. Every page links to at least one other page and is listed in `index.md`.
- Frontmatter on every page except `raw/`, `CLAUDE.md`, `index.md`, `log.md` and files under `manuscript/reports/`:
  ```yaml
  ---
  title:
  type: concept | guide | character | place | culture | event | myth | system | research | brief | chapter | report | source
  tags: []
  sources: []
  updated: YYYY-MM-DD
  status: draft | canon
  ---
  ```
  `status: draft | canon` applies to `story/` pages and planning pages. Briefs and chapters instead carry `stage:` (the machine-readable step, see write-chapter) and a free-text `status:` (the human note). Craft concept and source pages need no status.
- Scene breaks in chapters are a line with `* * *` or `---`; the first sentence after one names the acting person or the POV character.
- Split a page once it passes about 800 words, except `continuity.md`, `outline.md` and the core-system page, which are allowed to grow.
- Never invent quotes from sources. Paraphrase unless copying the raw note exactly.
- `raw/` holds notes, summaries and links. Do not copy the text of published books into it.

## 10. Talking to the author

- Lead with the result, not the process. Short reports: what changed, what needs a decision, where to look.
- When a chapter or brief is ready to read, send the file itself (as an attachment where the app supports it) as well as saving it in the book.
- Use the author's own words for things in their world. Explain any period or setting term the author might not know.

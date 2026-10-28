---
name: book-plan
description: Plan a work of fiction with the author, or change the plan later. Interviews and riff sessions that build the series arc (for a series), the core system (magic, technology, the crime, the period), the story spine, the cast, the world and its institutions, a stress test that locks every rule the outline depends on, and the chapter outline with beats. Use after /book-new, when someone wants to plan or rework their story or series, brainstorm the world, add a character, change a rule, or runs /book-plan.
---

# book-plan

The second interview. This one is about **the story**. It ends when chapter 1 can be briefed without any open question the outline depends on.

Read `engine/conventions.md` (especially §3 on canon states and §10 on working sessions), then `book.yaml`, the book's `CLAUDE.md` (its canonical homes and load tiers), `craft/reader-taste.md`, `craft/scope.md`, and the genre modules named in `book.yaml` (`templates/genres/<genre>.md`, or the book's custom module).

## Why this skill is strict
When *Ash of Verdance* was written, the first outline and chapter 1 were done on day two. That speed was good. What wasn't: about a week of later sessions went to rules decided one chapter at a time (how long effects last, whether healing sticks, range, what bystanders notice, dose counts, the calendar, how the villain escalates), each followed by fixes to chapters already written. Stage 5 asks those questions before drafting. Planning should still be fast. It just shouldn't leave holes the outline will fall into.

## Why it is also loose
Planning *Thornwake* (a fantasy trilogy) took about ten topical sessions over three days: the magic system, the cataclysm and history, society, the guilds, the trilogy threads, the cast, the city and map, the voice, and the book 1 chapter plan. The author arrived with fragments and riffed; the best ideas came from following a fragment out to its implications ("if the cure ends travel, his crew is lost forever"). So the stages below are a checklist of what must exist by the end, not a script. Run whichever stage the author wants to talk about, in whatever order, and keep track of what's still missing.

## Stages
| # | Stage | File | Writes |
|---|---|---|---|
| 0 | Series arc (series only) | `00-series.md` | `manuscript/series-arc.md` |
| 1 | Core system | `01-core.md` | `story/system/*.md`; `story/events/` history it depends on (and `story/research/`, `raw/history/` for historical) |
| 2 | Spine | `02-spine.md` | `manuscript/outline.md` (shape, promises, premise, threads, antagonist plan, ending) |
| 3 | Cast | `03-cast.md` | `story/characters/*.md`, `story/world/names.md` |
| 4 | World | `04-world.md` | `story/world/*`, `story/events/*`, `story/institutions/*` (setting, present day, institutions, places, sets, names, map) |
| 5 | Lock rules | `05-lock-rules.md` | `story/continuity.md` seeded; locked rules on their home pages |
| 6 | Outline | `06-outline.md` | `manuscript/outline.md` (structure, set pieces, climax, clue plan, chapter list, chapter beats) |

First run: stage 0 first for a series (at least the shape and the threads, roughly, because every book-1 choice plants something for later), then stages 1–4 in any order the story suggests (a magic, a character, an image, a twist), returning to stage 0 as answers come in. Stages 5 and 6 always come last.

Everything written is `status: draft` with proposal markers until the author approves it. Commit and log after each stage or session (`plan: <what>`).

**How to tell where you are:** a stage is done when its pages exist and its essentials are canon: series arc (shape, threads, leads, how they meet); system (rules numbered and locked, spec answered or "open until"); spine (premise, antagonist motive, ending); cast (every lead and main supporting character has want, arc, past, voice, knows/doesn't know); world (setting, history the plot needs, institutions if any, recurring sets, names); lock rules (continuity seeded); outline (chapter list approved, beats for at least the first part). Report what's missing, and offer the most useful next topic.

## Running a session
See conventions §10. In short:
- **Listen, synthesize, extend.** Play back the author's idea cleanly, then follow it out: what it implies for the rules, the world, the cast and later books. That extension is most of the value.
- **Check before proposing.** Walk every proposal through the locked rules and the who-knows-what table. Don't offer a vault seal when travelers return to the spot they left from; don't stage a fight with guards who don't know the crew is there.
- **Options with a lean.** Two or three concrete proposals, each with a one-line upside and downside; say which you'd pick. Mark anything you invented as a proposal, and anything the author likes but hasn't committed to as leaning.
- **Ask "why"** for the antagonist and every major character choice. Motive gaps are cheap to fix now.
- **The author's words win.** Keep their lines and images verbatim. When they correct you, take the correction fully and follow its ripple through the other pages.
- **"Not now" is an answer.** Park it in decisions.md's Open list with what it affects and when it's needed, and move on.
- **Track the open list as you go,** and at the end of a session say what got settled, what got parked, and what the next session could take up.
- **Save in one pass** at the end of a topic (pages, a decisions line per decision, one log line), then run a quick consistency search for lines the session made stale.

## Re-running for changes
`/book-plan <section>` (e.g. "cast", "add a character", "rework act 3", "change the magic"):
1. Load only that stage's file and the pages it touches (the load tiers in the book's `CLAUDE.md`).
2. Make the change with the author.
3. **Ripple check:** search the outline, the series arc, continuity.md, canon pages and every drafted chapter for anything the change contradicts. Fix planning pages directly. For drafted chapters, add rows to the **retrofit queue** in `story/continuity.md` and list them for the author; never edit approved chapter prose without the author's go-ahead.
4. Re-run the relevant part of stage 5's stress test for the changed rule.
5. Record the decision in `manuscript/decisions.md` (one line, saying what it replaces). Commit `decision: <what>` or `retrofit: <what>`.

## Later books in a series
The engine has no fixed layout for book 2 yet. When it starts, decide with the author; the recommendation is to keep the whole series in one book folder, so every fact keeps one home (`story/` and `craft/` are shared; give each book its own `manuscript/book-N/` with an outline, briefs and chapters, and update the folder map). Then run book-plan with the series arc as the starting point: this book's row of the shape, each thread's book-N step, the handoffs from the last book, and its "For later planning sessions" list.

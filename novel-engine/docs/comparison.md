# How the skills compare with how *Ash of Verdance* was written

*Ash of Verdance* (26 chapters, about 110,000 words) was written between October 1 and October 19, 2026, in an Obsidian vault with five hand-built skills. This document compares the generic skills in this repo against that process. It draws on three sources: the vault's `log.md` (348 entries), the five original skills, and the chapter sessions themselves.

Short version: the **chapter loop** is the original process, generalized and tightened, and keeps what worked. The **two interviews** are mostly new. In the original they were a day of improvised conversation, and their gaps cost about a week of mid-draft fixes. The new interviews are designed to close those gaps.

---

## 1. book-new vs. what happened on October 1

| Step | What happened | What `book-new` does | Change |
|---|---|---|---|
| Scaffold | Vault created by hand from a Karpathy-style wiki schema | Stage 1 copies `templates/book/`, writes `book.yaml`, creates genre folders, `git init` | Same idea, automated. Adds config and version control |
| Basics | Never asked as a set. POV, tense, length, dialect and beta readers were settled piecemeal over the first week | Stage 1 asks them up front (7 questions) | **New.** The reader's English (American vs. British) alone caused fixes in about a dozen chapters |
| Model-author research | Done first, because the author was already known: 13 Sanderson BYU lectures, transcripts pulled from the YouTube transcript panel, then 13 summaries and 25 concept pages | Stage 3, after taste. Resumable checklist, source notes in `raw/`, concept pages with "for this book" callouts | Kept. **Reordered:** taste comes first because it picks the authors. Adds a fallback for authors with little public craft material (Sanderson is unusual in having a full public course) |
| AI-craft research | 8 articles ingested (slop guide, scene briefs, Karpathy wiki, etc.) → ai-prose-tells, drafting-workflow, ai-as-beta-reader | Ships as a **starter pack** copied into every book | Done once, reused. Nobody re-researches slop guides |
| Style guide | Synthesized on day 1 from the lectures, then grew rules B13–B17 over the next two weeks from fixes | Ships with sections A–E pre-filled, **including generalized versions of B13–B17** (as B9–B15). Stage 4 adds genre promises, model-author rules, and book-specific rules | The lessons that took two weeks to learn now start on day 1 |
| Scope | `novella-scope.md` from the MICE quotient | `craft/scope.md`: words, chapter count, POV split, thread and cast budget | Kept, generalized |
| Taste interview | Two rounds → `reader-taste.md` (characters, content lines, themes, villains, world, pacing, prose, tensions to manage, touchstones) | Stage 2: the same two-round structure and the same sections, plus "model authors and what to learn from each" | Kept almost exactly. This page was the most-cited page in the book |
| Calibration | A/B test on humor, description, interiority (earnest won, richer sensory detail, balanced interiority) | Stage 5: same three pairs, an optional fourth, results written as checkable rules | Kept |
| Lay-reader and period-word policy | Discovered at Ch8 from a beta reader's comments (clarity pass over Ch1, 2, 5, 7, 8) and in later wording sweeps | Stage 4 asks both questions. Style guide B14 and B15 enforce them | **New.** It replaces two retroactive passes |

**Dropped:** nothing from the original. **Not automated:** reading video transcripts sometimes needs a browser. Stage 3 says to use one where available, or to note the source and move on.

---

## 2. book-plan vs. October 1–5

### What happened
On Oct 1–2 the magic was brainstormed first (`life-drawing.md`), then the protagonist and premise, the story spine (to v4), the cast one at a time (the villain was rebuilt three times), names and terms, outline v1, the map, and chapter 1, all within two days. Chapters 1–3 were drafted from the outline alone. Scene briefs didn't start until Ch4.

Then, through Oct 5 and beyond, a long run of `canon` entries locked rules that the first chapters had already improvised. Each one was followed by `revise`, `retrofit` or `fix` entries against chapters already written. A first continuity audit at Ch3 created `continuity.md`, the running counts and the retrofit queue.

### The questions that were missing, and where book-plan now asks them

| Iteration category (examples from the log) | Where it's asked now |
|---|---|
| **Magic mechanics:** whether healing is automatic (Ch7–8 retrofit) and whether it lasts; the aftereffect's look, duration and scaling (three separate rulings); range (Ch12/14 toned down); whether using it makes a sound; what one user senses of another (Ch20, then Ch8 fixed during the final trim); how power can be stored or carried (Ch18, Ch22) | Stage 1 spec table (17 questions on `templates/pages/system.md` plus the fantasy module's 8). Stage 5 §1 forces every line closed or "open until ChN", plus the **edge-case drill** for every set piece |
| **Counts and supply:** dosing re-locked three times; a second way of taking the drug added and later cut book-wide; the Part Four supply plan reworked; a running tally of deaths (16 vs. 17); how many years a character had been ill | Stage 5 §2: every countable thing with a start value and a planned value at the climax, seeded into continuity.md |
| **Calendar:** Day 0 set after Ch3; circle night moved; Part Four re-dated (climax Sunday → Saturday) | Stage 5 §3: Day 0, day-by-day act one, climax day fixed, recurring events, travel times |
| **Antagonist and reveal:** tells scrubbed from Ch1; the reveal fixed across Ch1/2/5; villain rebuilt; escalation reason added late; a beat reverted because "he couldn't know" | Stage 2 (motive iterated until it's personal). Stage 5 §4 (off-page timeline, what he knows when, escalation, reveal discipline, clue plan). Mystery module adds fair-play checks |
| **Climax and set pieces:** climax mechanics invented during briefs (a sting rejected twice, an improvised trick cut); the book's key backstory scene shaped over twelve revisions; an important off-page character unnamed until Ch21 | Stage 5 §5: climax beat by beat with locked rules only, 3–5 set pieces with substance, every person named. Stage 3: name off-page people who matter |
| **Who knows what:** a witness moved rooms (Ch7 retrofit); a character couldn't have known a count she was never told; how a character learned a secret rerouted | Stage 3 (knows/doesn't per character). Stage 5 §6 matrix seeded into continuity.md |
| **Ending and length:** "keeps his badge" → private inquiry agent; hearing stakes changed twice; postlude added late; 24 → 25 → 26 chapters via splits | Stage 2 (ending, denouement, stakes by act). Stage 5 §7 (planned splits from chapter length) |
| **Recurring sets:** front door vs. back door; dresser vs. cupboard; range vs. fireplace | Stage 4 `sets.md`, Stage 5 §8 |
| **Reader's English** | Moved to book-new (above) |

### What's kept from the original
- Core system first, then spine, cast, world. Stages 1–4 can be reordered if the story starts with a character or image.
- Proposals marked as pending, with the author approving piece by piece (the original's `canon-draft` → `canon` rhythm).
- The outline's shape: promises, threads written end-state-first, climax, power beats (now "first on-page appearance of each rule"), and a chapter list.
- Speed. Stage 6 explicitly stops at "ready to brief Ch1" and allows one-line rows for later chapters.

### What's new
- **Stage 5, the stress test.** This is the biggest single change in the system.
- **Re-run mode with a ripple check,** for changes mid-book. The original did this by hand (e.g., "Part Four plan v2" on Oct 10, which re-dated chapters and cut a mechanic from Ch17).
- **Genre modules.** The original was fantasy-only in practice. It was also a mystery, but the mystery's clue plan and reveal discipline were never written down, and that is where the villain-reveal fixes came from.
- **Historical fiction support:** cited research pages, the fact vs. invention ledger, and real-calendar checks.

---

## 3. The chapter loop: write-chapter vs. the four original skills

### Mapping

| Original skill | New home | Kept | Changed |
|---|---|---|---|
| `novel-scene-brief` | `write-chapter` → `stages/brief.md` | Gate: no prose until the brief is approved. Loads outline row, continuity, previous chapter, only the touched canon pages. Who knows what at the end. Must include / must not. New facts listed for approval | Uses the brief format as it **actually evolved** by Ch20 (beats with reasons and citations, running counts before → after, offstage characters in who-knows-what, author decisions dated inline) rather than the original 15-line template. Adds an explicit "open questions with recommendations" section, which was done in practice but never in the skill. Book-specific standing rules (magic verbs, rhyme limits, the villain's reveal discipline) moved out of the skill into each book's style guide and continuity |
| `novel-draft-chapter` | `stages/draft.md` | Only from an approved brief. Stay inside the brief and stop rather than invent. Prose-tells scan after drafting, not as a prompt. New facts listed as pending | Runs in a **subagent** so the main session stays clean for the check and notes. Adds a **split rule:** propose a split past ~1.5× the target (the original discovered this at Ch23/24, which became three chapters). Word target from `book.yaml` |
| `novel-continuity-check` | `stages/check.md` | Fresh-eyes subagent, report only. The same eight finding categories. Fix clear errors, ask about story choices. Bookkeeping | Adds severity, a saved report file, a ninth category (genre checks), and a repeats category that includes recaps (the trim pass found many). **Folds in the per-chapter pronoun and belonging passes,** which in practice usually ran right after the check and before approval (Ch16, Ch17, Ch23). Adds a **revision protocol** for the author's notes: find the gap behind the note, use the author's exact words, and **re-run the review after substantive notes** (done by hand for Ch16 and Ch22) |
| `novel-canon-sync` | `stages/approve.md` | Route each fact to one home page with its source. Update continuity (calendar, counts, who-knows-what, details ledger). Ripple check. Retire placeholders. Map update | Adds historical routing (research pages with sources), outline-row update, index, and the **beta Doc append** (previously a separate manual step after every approval) |

### Things the original process did that no skill captured, and are now in one
- **The beta Google Doc.** The procedure was hard-won (UTF-16 offsets, revision IDs, italics splitting, verify paragraph by paragraph, check for edits made in the Doc), but it was only written down inside `novel-line-edit` and session notes, and pinned to one Doc ID. Now it's `engine/beta-google-doc.md`, used by both write-chapter and line-edit, and configured in `book.yaml`.
- **Plan changes mid-chapter** (e.g., cutting a mechanic from the whole book, the Part Four re-plan, the Ch23/24 split). Now there's a protocol: stop, ask, log the decision, ripple check, add retrofit-queue rows.
- **Sending the chapter as a file to read** (the author read drafts as attachments). Now part of the present step.
- **Version control.** 23 hand-made backup folders in `manuscript/backups/` are replaced by a commit per stage.
- **Resuming.** The original relied on the author remembering which skill came next. The `stage` field now drives it.

### What was dropped or weakened
- **Book-specific rules inside the skills** (the magic's verbs, one character's rhyme limit, the villain's reveal discipline). They're gone from the skills on purpose. In the generic system they belong in the book's style guide (section I), continuity.md and the outline's reveal plan, which the brief and check stages load. Migrating Ash of Verdance means moving them there.
- **Device-shell instructions** (the vault on a linked Mac, `fileUuid` commits). Replaced by one environment-neutral rule in conventions: edit in place, exact-match edits, use the linked computer's shell if the files live there.

---

## 4. line-edit vs. the original

| Original practice | New home |
|---|---|
| `novel-line-edit`: pronoun pass (B13), belonging pass (B14), beta-reader Doc comments, Doc sync | Modes `pronoun-belonging` and `beta-comments`, plus `engine/beta-google-doc.md`. Character names in the pronoun rules replaced by the general rule |
| Dialogue pass (Oct 12, which led to B17 "only the protagonist is terse") | Mode `dialogue` (no skill before) |
| Duplicate sweep (Oct 11) and repeated-beat cuts (Ch15, Ch26) | Mode `repeats` (no skill before) |
| Trim pass, ~10% book-wide (Oct 16), first every trim reviewed, then small trims authorized; scene trims separately | Mode `trim`, including the authorization step and a follow-up continuity check, as the original trim pass had (no skill before) |
| Wording sweeps ("the bench" ×21 → magistrate/hearing/court; "flags" → "flagstones"; "packet" → "steamer") | Mode `word-sweep` (no skill before) |
| Patterns in beta comments becoming standing rules | Written into `beta-comments` step 3 |

---

## 5. Gaps and risks

- **Untested.** None of this has run on a real book yet. The plan is to migrate *Ash of Verdance* (or a chapter of a revision) and run `write-chapter` on it, then dogfood `book-new` and `book-plan` on a throwaway historical novella.
- **Migrating Ash of Verdance** needs: a `book.yaml`; the vault moved or linked under `books/ash-of-verdance/`; `stage:` fields added to briefs and chapters (everything is `synced`); `story/magic/` → `story/system/` (or a note in the book's CLAUDE.md); the book-specific rules from the old skills copied into style guide section I; `manuscript/backups/` replaced by an initial git commit; Ch1–3 have no briefs (fine, since they're synced).
- **Stage 5 could be too heavy for a short story.** It allows "open until ChN" for anything the outline doesn't need yet. Watch whether authors find it tedious.
- **Research quality depends on what's public.** Authors with few talks or essays will get thinner craft pages. Stage 3 says so rather than guessing.
- **No publishing skill.** Building the EPUB and print PDFs, the KDP listing, covers and the author site stay manual for now (the Ash of Verdance build script in `publish/build/` is a candidate to generalize later).
- **No structural-revision skill.** Whole-book restructuring (e.g., the rejected front-door climax alternative) goes through `book-plan` re-runs and `write-chapter` revisions. This is probably fine, but it hasn't been tried.

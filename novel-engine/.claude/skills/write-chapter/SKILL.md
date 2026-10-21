---
name: write-chapter
description: Write one chapter of a book end to end, picking up wherever it left off. Builds a scene brief for the author to approve, drafts the chapter, runs a fresh-eyes continuity check and polish, takes the author's notes, and on approval folds every new fact into the book's canon. Use for "/write-chapter N", "brief chapter N", "draft the next chapter", "chapter N is approved", or any work on a single chapter.
---

# write-chapter

One command for the whole chapter loop. The chapter's `stage` field tells you where it is, so the same command resumes after a break of minutes or days.

Read `engine/conventions.md` first, then `book.yaml` and `CLAUDE.md` for the book.

## Find the stage
Chapter N's brief is `manuscript/briefs/chNN-brief.md`; the chapter is `manuscript/chapters/chNN-<slug>.md`. (Zero-pad N to two digits.)

| State on disk | Next stage | File |
|---|---|---|
| No brief | Brief | `references/stages/brief.md` |
| Brief `stage: brief-draft` | Wait for the author's approval or notes on the brief (revise in the brief stage) | `brief.md` |
| Brief `stage: brief-approved`, no chapter | Draft, then go straight on to Check | `draft.md` → `check.md` |
| Chapter `stage: drafted` | Check | `check.md` |
| Chapter `stage: checked` | Wait for the author's notes or approval (revise in the check stage) | `check.md` |
| Chapter `stage: approved` | Approve: canon sync and beta copy | `approve.md` |
| Chapter `stage: synced` | Done. Offer the next chapter | |

If N isn't given, use the lowest chapter that isn't `synced`; if all are synced, the next outline row.

Before chapter N's brief, chapter N−1 should be `synced`. If it isn't, say so and offer to finish it first; the brief depends on canon being current.

## The two gates
1. **Brief approval.** No prose until the author approves the brief. The brief is where story decisions happen; drafting only carries them out.
2. **Chapter approval.** Nothing from the chapter becomes canon until the author approves the chapter and its list of new facts.

Load only the stage file you are running. Each stage ends with a commit (`brief:`, `draft:`, `check:`, `approve:`, `sync:` plus the chapter number) and a log line.

## Mid-chapter changes to the plan
If a stage reveals that the outline, a locked rule, or canon needs to change (the author changes their mind, or a beat can't work under the rules), stop, raise it as a numbered question, and on approval make the change the way `book-plan` does: decision logged, ripple check, retrofit queue rows for earlier chapters. Then resume.

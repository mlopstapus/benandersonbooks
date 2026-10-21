---
name: line-edit
description: Prose-level editing passes across one or more chapters of a book - unclear pronouns, sentences that don't belong, flat dialogue, repeated beats and recaps, trims, word sweeps for the reader's English - and working through beta-reader comments, then syncing any beta copy. Use for "line edit", "clean up chapters", "go through my beta readers' comments", "trim the book", "fix every use of X", or before a release.
---

# line-edit

For prose, not plot. Plot and canon changes go through `/write-chapter` (one chapter) or `/book-plan` (the plan). If a line edit turns up a plot or canon problem, stop and raise it.

Read `engine/conventions.md`, then `book.yaml`, `craft/style-guide.md` (rules B9–B15 and section I) and `craft/reader-taste.md`.

## Modes
Pick the mode(s) from the request. Each has its own file in `references/modes/`; load only what you run.

| Mode | File | Use when |
|---|---|---|
| Pronoun and belonging | `pronoun-belonging.md` | The default pass. Unclear he/she/it; sentences that don't belong where they sit |
| Beta comments | `beta-comments.md` | Readers left comments (Google Doc or pasted notes) |
| Dialogue | `dialogue.md` | Voices sound alike; everyone is terse; dialogue is flat |
| Repeats | `repeats.md` | Beats, images, lines or recaps repeated across chapters |
| Trim | `trim.md` | The book or chapters need to be shorter (typically ~10%) |
| Word sweep | `word-sweep.md` | One word or habit must change everywhere (a term the reader won't know, a renamed thing) |

A full pre-release pass runs: repeats → trim → pronoun and belonging → word sweep → beta sync. (Structure and continuity come before line editing; don't polish chapters that may be cut.)

## Every mode
1. **Commit first** inside the book folder, so the whole pass can be reverted in one step.
2. **Read every chapter in scope in full.** Searches find candidates; reading finds problems. Never edit from search results alone.
3. Keep a change list (chapter, old → new, why). Apply edits with exact-match replacement (each find string must occur exactly once in its file).
4. **Fix vs. ask:** clear fixes (an ambiguous pronoun, a reader's clear comment, a typo) are applied and reported. Taste calls (cutting a line, rewording a joke) go to the author first as a numbered list, each with the quote, what's wrong and a proposed rewrite; apply only the ones picked, and don't raise a rejected item again. Close calls lean toward rewording (B11) unless the author has said otherwise.
5. Save the change list to `manuscript/reports/<mode>-<chapters>-YYYY-MM-DD.md`; note the pass in each chapter's frontmatter `status`; add the report to `index.md`.
6. **Beta copy:** if `beta.type` is `google-doc`, sync the changed approved chapters following `engine/beta-google-doc.md` ("Sync edits"). Do the Doc-to-book check first, so edits made in the Doc aren't overwritten.
7. Commit `line-edit: <mode> <chapters>` (or `trim:`), log it.
8. If the author states a new standing rule, add it to the style guide section I with a self-check line, and to `manuscript/decisions.md`.

## Report
Short: what changed (counts per chapter), what was kept or rejected, anything found in the Doc that wasn't in the book, that the Doc was verified, and which comment threads the author can now resolve.

# Stage: check

Three steps before the author reads anything: a fresh-eyes review, fixes, and a quick polish. Then the author's notes, as many rounds as it takes.

## 1. Fresh-eyes review (subagent)
Start a subagent that did **not** draft the chapter. Give it: the chapter, its brief, all earlier chapters (or, past about ten chapters, the previous three in full plus all summaries and the details ledger), `story/continuity.md`, the core-system page(s), the relevant character and place pages, `story/world/sets.md`, and the style guide. Ask it to report findings only, with quotes, line references and a severity (error / should fix / nit), grouped as:

1. **Contradictions** with canon or earlier chapters: timeline, places, positions, who was where, ages, counts, objects, weather, injuries.
2. **Invented facts** not in canon or the brief.
3. **Core-system violations:** capabilities beyond the rules, effects bystanders couldn't observe, wrong verbs, effects lasting too long, counts that don't add up.
4. **POV and knowledge slips:** a character knowing or noticing what they couldn't; logistics like finding something "on the way" when already there.
5. **Ambiguity:** sentences a reader could misread about who is present, who acts, or what happened.
6. **Repeats:** beats, images, lines or descriptions that echo earlier chapters, and recaps of what the reader already knows.
7. **Pacing drift:** reveals, suspicion or clues arriving earlier than the outline allows; antagonist tells before the planned chapter.
8. **Style-rule misses:** the style guide's self-check (section E), book-specific rules (section I), AI prose tells.
9. **Genre checks:** every **Chapter checks** item from the genre modules in `book.yaml`.

## 2. Fix
- Fix clear errors directly (exact-match edits; see conventions).
- Anything that is a story choice (cut vs. keep, which version of an event) becomes a numbered question for the author, not a silent edit.
- Save the review and what was done with each finding to `manuscript/reports/chNN-check-YYYY-MM-DD.md`.

## 3. Polish (single chapter)
Do the two line-level passes from the line-edit skill on this chapter only: the pronoun pass and the belonging pass (`.claude/skills/line-edit/references/modes/pronoun-belonging.md`). Apply clear fixes; list taste calls for the author. This is what keeps the author's reading time for story, not typos.

## 4. Present
Set `stage: checked`, `status: "draft N, checked, awaiting author"`. Commit `check: chNN`. Send the chapter file itself so the author can read it anywhere, plus one short message:
- What the chapter does, in two lines.
- What the check caught and fixed (counts by category, plus anything notable).
- The numbered pending new facts.
- Numbered questions and taste calls.

## 5. Revise with the author
The author will often give short notes ("very unclear", "she couldn't know that", "should be removed"). For each:
- Find the specific gap behind the note (a logic error, a knowledge slip, a missing reason) before rewording. Fix the cause, not just the sentence.
- When the author supplies exact words, use them verbatim.
- When a note changes a rule, a count or a future beat, handle it as a plan change (see SKILL.md) and update the brief so it stays true to the chapter.
- Bump the draft version in `status`, commit `draft: chNN vN (notes)`.
- If a round of notes changed more than a few lines, or touched logic, positions or the timeline, re-run the fresh-eyes review on the changed passages before sending it back.

If a standing preference comes out of the notes ("only the protagonist is terse"), propose adding it to the style guide, section I, with a self-check line.

## 6. Approval
When the author approves the chapter (and says yes or no to each pending fact), set `stage: approved`, `status: "approved by author YYYY-MM-DD (vN)"`, commit `approve: chNN`, and go to the approve stage.

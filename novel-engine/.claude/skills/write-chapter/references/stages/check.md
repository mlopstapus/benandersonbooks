# Stage: check

Three steps before the author reads anything: a fresh-eyes review, fixes, and a quick polish. Then the author's notes, as many rounds as it takes.

## 1. Fresh-eyes review (subagent)
Start a subagent that did **not** draft the chapter. It reports only and changes nothing (conventions §7).

**Give it this pack** (paths, not pasted text; it reads them itself, grepping long files):
- The chapter and its brief.
- The previous three chapters in full, and the frontmatter `summary:` of every earlier chapter. (For a book of ten chapters or fewer, all earlier chapters in full.)
- From `story/continuity.md`: the current calendar, running counts, who knows what, observable effects, retrofit queue, and the details-ledger sections for the last five chapters.
- The core-system page(s) in `story/system/`. For a mystery without a separate crime page, the outline's clue and payoff plan instead.
- Canon pages for every on-stage character and location named in the brief (the book's `CLAUDE.md` cast map says which file is whose), and `story/world/sets.md` if it exists.
- `craft/style-guide.md`, `craft/calibration.md` and `book.yaml`, and the genre modules it names. For a series, `manuscript/series-arc.md`.
- Earlier reports for this chapter in `manuscript/reports/`, and decisions in `manuscript/decisions.md` that name it, so settled taste calls aren't raised again.
- Then: grep every named person, place and number in the chapter across earlier chapters and canon, and check the hits.

**Ask for findings** with quotes, line references and a severity, grouped as:
1. **Contradictions** with canon or earlier chapters: timeline, places, positions, who was where, ages, counts, objects, weather, injuries.
2. **Invented facts** not in canon or the brief.
3. **Core-system violations:** capabilities beyond the rules, effects bystanders couldn't observe, wrong verbs, effects lasting too long, counts that don't add up.
4. **POV and knowledge slips:** a character knowing or noticing what they couldn't; logistics like finding something "on the way" when already there.
5. **Ambiguity:** sentences a reader could misread about who is present, who acts, whose thing it is, or which day is meant.
6. **Repeats:** beats, images, lines or descriptions that echo earlier chapters, and recaps of what the reader already knows.
7. **Pacing drift:** reveals, suspicion or clues arriving earlier than the outline allows; antagonist tells before the planned chapter; for a series, anything that explains or reveals what the series arc saves for a later book.
8. **Style-rule misses:** the style guide's self-check (section E), book-specific rules (section I), AI prose tells.
9. **Genre checks:** every **Chapter checks** item from the genre modules in `book.yaml`.
10. **Record drift:** the brief, continuity rows or canon pages that no longer match what the chapter says.
11. **Choreography and physics:** step through every use of the core system against the rules, in order: who holds what, who touches whom, what triggers it, what it looks like. Flag any physical property of the system (color, temperature, glow, timing) not in canon.
12. **Missing reasons:** for every reaction and every thing a character knows or acts on, quote where the reason is on the page, or flag it.
13. **First-read clarity:** quote every line a reader would have to stop and decode (an abstraction for a concrete thing, a joke or simile that needs working out, a theory stated vaguely, an unmarked time jump).
14. **Hook and last lines:** does the first paragraph carry the want and stakes? Does each scene's last line land? For an opening chapter or prelude, does it promise the scale of the book?

**Severity:** *error* = a reader would notice something false or impossible (a contradiction, wrong person, broken rule). *Should fix* = a reader could stumble or misread. *Nit* = taste or polish; list sparingly.

**Re-checking a chapter that is already synced:** canon now contains this chapter's own facts, which makes the invented-facts check circular. Tell the reviewer to treat canon lines sourced to this chapter as unverified, or to compare against the book's commit from before this chapter's sync.

## 2. Fix
Done by the main session, not the reviewer.
- Fix clear errors directly (exact-match edits; see conventions).
- Anything that is a story choice (cut vs. keep, which version of an event) becomes a numbered question for the author, not a silent edit.
- Save the review and what was done with each finding to `manuscript/reports/chNN-check-YYYY-MM-DD.md`.

## 3. Polish (single chapter)
Also the main session. Do the two line-level passes from the line-edit skill on this chapter only: the pronoun pass and the belonging pass (`.claude/skills/line-edit/references/modes/pronoun-belonging.md`). Apply clear fixes; list taste calls for the author. This keeps the author's reading time for story, not typos.

## 4. Present
Set `stage: checked`, `status: "draft N, checked, awaiting author"`. Commit `check: chNN`, log it. Send the chapter file itself so the author can read it anywhere, plus one short message:
- What the chapter does, in two lines.
- What the check caught and fixed (counts by category, plus anything notable).
- The numbered pending new facts.
- Numbered questions and taste calls.

## 5. Revise with the author
The author will often give short notes ("very unclear", "she couldn't know that", "should be removed"). For each:
- Find the specific gap behind the note (a logic error, a knowledge slip, a missing reason) before rewording. Fix the cause, not just the sentence.
- When the author supplies exact words, use them verbatim.
- When a note changes a rule, a count or a future beat, handle it as a plan change (see SKILL.md).
- **Keep the brief true to the chapter:** when a revision changes a beat, update the brief to match.
- Bump the draft version in `status`, commit `draft: chNN vN (notes)`.
- If a round of notes changed more than a few lines, or touched logic, positions or the timeline, re-run the fresh-eyes review on the changed passages before sending it back.

If a standing preference comes out of the notes ("only the protagonist is terse"), propose adding it to the style guide, section I, with a self-check line.

## 6. Approval
When the author approves the chapter (and says yes or no to each pending fact), set `stage: approved`, `status: "approved by author YYYY-MM-DD (vN)"`, commit `approve: chNN`, and go to the approve stage.

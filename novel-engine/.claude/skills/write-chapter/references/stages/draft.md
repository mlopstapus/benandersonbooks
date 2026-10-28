# Stage: draft

Run the drafting in a **subagent** when available, giving it the load list below, so the main session keeps a clean context for the check and the author's notes. The subagent writes the file and returns the new-facts list.

## Load
- The approved brief.
- `craft/style-guide.md` (all sections), `craft/calibration.md` (the voice sample) and `craft/reader-taste.md`. The taste page wins on conflicts.
- `story/continuity.md` (the sections the brief touches).
- The previous chapter in full.
- Canon pages for every character, place and rule in the brief.
- `story/world/idioms-and-terms.md` and, if the chapter uses one, `story/world/sets.md`.

## Rules
- **Stay inside the brief.** No new characters, places, powers, events or rule details the brief doesn't list. If the scene seems to need one, stop and ask rather than invent.
- Target `chapter_words` from `book.yaml`. If the chapter is clearly going to run past about 1.5× the target, stop and propose a split at a natural break instead of compressing.
- Write with the style guide's drafting preamble (section D) and calibration rules (section H).
- Use the book's own verbs and terms for the core system; check idioms-and-terms before using any in-world word.
- Explain the core system for a lay reader where the style guide's lay-reader rule says to.
- Name people whenever it matters who is present (the pronoun rule). Open every scene with a name.
- **Core-system physics come only from canon** (the canon-physics rule): no new color, glow, temperature, smell, timing or trigger for atmosphere.
- **Stage every use of the core system in rule order** (the choreography rule): track who holds and touches what, and what triggers the moment.
- **Every reaction and every piece of knowledge gets its reason on the page** (the reason rule).
- **When characters argue or explain how something works, state each side in one plain sentence** (the plain-theory rule).
- **Put the POV's want and stakes in the first paragraph; make each scene's last line land its point** (story rule A2, the last-line rule). Show damage happening to specific things (A5).
- Prefer plain lines to clever ones: a joke or simile that needs decoding gets cut (the clarity rule).
- After drafting, scan with `craft/ai-workflow/ai-prose-tells.md` and fix what it finds. Use it as a check, not as a prompt.

## Save
`manuscript/chapters/chNN-<slug>.md` from `templates/pages/chapter.md`: frontmatter with `stage: drafted`, `status: "draft 1 (AI), awaiting author"`, word count, and a summary under 120 words. Commit `draft: chNN draft 1`.

## New facts
List every fact the chapter introduced that isn't already in canon or the brief: names, places, past events, rule details, character history, objects. Number them; mark each pending. Nothing goes into canon pages yet.

Go straight on to the check stage. Don't show the author the draft until it has been checked.

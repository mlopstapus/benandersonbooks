---
title: Style Guide
type: guide
tags: [style, prose, core]
sources: ["[[reader-taste]]", "[[ai-prose-tells]]", "[[ai-novel-writing-patterns]]"]
updated: {{DATE}}
status: draft
---
# Style Guide — {{TITLE}}

**Load this page and [[reader-taste]] before generating any prose.** Where they conflict, [[reader-taste]] wins. The author can override anything here; changes go in [[decisions]].

Sections A–C and E ship with the engine. They were learned the hard way while writing *Ash of Verdance* (Rules B9–B15 each came from a round of fixes after drafting). `book-new` adds the model-author rules, genre promises and calibration results.

## A. Story rules (check at the brief level)
1. **Every chapter changes something.** If you can't say what is different by the end of the chapter, don't draft it.
2. **Open scenes with a character who wants something** and is acting to get it.
3. **Characters act from established motivation.** If the plot needs them to act otherwise, fix the setup first.
4. **Problems are solved only with rules the reader already understands.** No new powers, tools or facts at the climax.
5. **Costs and limits over capabilities.** Using the core system should cost or risk something visible.
6. **Escalate, don't undermine.** Twists expand the conflict and are set up in advance.
7. **Converge at the climax:** plot, character decision and subplots meet in one moment that is the protagonist's choice.
8. **Emotion moves.** Nothing pinned at 10; give lulls, humor, relief.
9. **Genre promises:** see section F.

## B. Prose rules (check at the line level)
1. **Clear prose that serves the story.** Lyrical flourishes are for earned peak moments.
2. **POV discipline:** every description filtered through the POV character's background, motive and mood. Name the POV character in the first line of a scene.
3. **Worldbuilding through character eyes.** No encyclopedia passages, no "as you know" dialogue. Explain only what this moment needs.
4. **Concrete before abstract.** Specific sensory detail (not just sight) before rumination. Anchor characters in the space during dialogue.
5. **Cut tell-then-show,** empty modifiers ("very", "a little bit"), and passive voice where active works.
6. **Dialogue does the work:** "said" for most tags; beats instead of tags where useful; exposition broken into real back-and-forth. Voices distinct by diction, image source and how they argue.
7. **Introspection stays brief** (about a third of a scene at most), and ends in a decision or a shifted motive.
8. **Action as mini-plot:** motive → objective → countable progress → payoff; keep geography clear.
9. **The pronoun rule: every pronoun has one obvious owner.** When two people of the same gender share a paragraph, use names. Re-name after the other person speaks or the subject changes. "It" points at the nearest noun: check what that noun is, or name the thing. Open every scene (after a `* * *` or `---` break) with a name, never "He", "She" or "It". Repeating a name is invisible to readers; confusion is not.
10. **The belonging rule: every sentence belongs where it sits.** Each follows from the one before and leads to the next. Watch for an aside dropped between cause and effect, a reaction placed before what it reacts to, a sentence that contradicts its neighbor, a character re-described when the reader already has the description, and a detail that disagrees with the same moment in another chapter.
11. **The reword rule: when in doubt, reword.** If a line edit is a close call, apply the reword and list it in the report.
12. **The payoff rule: no hints that never pay off.** Don't plant a small mysterious detail (an empty chair, an unexplained look) unless the book answers it soon or it is tied to a named later payoff.
13. **The distinct-voices rule.** Only characters whose personality is terseness speak tersely. Everyone else speaks in full sentences with their own texture (a detail, a reason, a bit of history or humor).
14. **The reader's-English rule: write for the reader's English** (`dialect` in `book.yaml`). Setting words are fine when the reader can infer them from context; replace words the reader is likely to misread (court slang, regional household words, obsolete units) with plain ones.
15. **The lay-reader rule: explain the core system to a lay reader at first use,** in a line or two of what the POV character feels or sees, and again briefly after a long gap.

## C. Anti-slop rules (AI-specific)
- Name every person and place deliberately; never accept a model-default name. See [[ai-prose-tells]].
- Prefer specific, unique genre details over generic ones.
- Let subtext stay subtext; no closing epiphany that restates the scene.
- Vary sentence and paragraph length; avoid "not X — it's Y", tricolon chains, em-dash pileups, and the body-language cliché list.
- Don't resolve tension early or make every character reasonable.
- Use [[ai-prose-tells]] as a *checking* pass after drafting, not as a negative prompt.

## D. Drafting preamble (put at the top of generation prompts)
> Write in clear {{PERSON}}-person {{MODE}} prose, {{TENSE}} tense, from {POV}'s perspective, for a {{AUDIENCE}} reader of {{GENRE}}. Ground each scene in concrete sensory detail from the POV's point of view; convey worldbuilding only through what the character notices and needs right now. Keep dialogue doing the emotional work, with "said" for most tags. Keep introspection brief and ending in a decision. Honor the core-system rules and costs provided. Stay strictly within the brief: include every "must include", violate no "must not", and invent no new characters, places, powers or subplots. Leave subtext unspoken. Make every pronoun unambiguous and open every scene with a name.

## E. Self-check before handing a chapter to the author
- [ ] Did the chapter's promised thread move?
- [ ] Is the POV's want visible in the first paragraphs?
- [ ] Any action contrary to established motivation?
- [ ] Any problem solved by unestablished rules or luck?
- [ ] Any infodump longer than three sentences? Any "as you know"?
- [ ] Introspection brief, ending in a decision?
- [ ] Ran the [[ai-prose-tells]] scan?
- [ ] Pronoun pass, belonging pass, payoff check, voice check, reader's-English check (rules B9–B14).

## F. Genre promises
(book-new fills this from the genre modules.)

## G. Model-author rules
(book-new fills this from craft research: the specific craft principles of the authors in `model_authors`, each cited to a `craft/` page.)

## H. Calibration results
(book-new fills this from the A/B test.)

## I. Book-specific rules
Standing rules the author states while writing, numbered on from B15 (B16, B17, …). Each rule also gets a self-check line in section E.

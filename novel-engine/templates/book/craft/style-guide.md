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

**Voice basics:** (book-new fills this in: person, tense, POV per chapter, audience, model authors.)

**One voice for the whole book; the POV character colors each chapter.** Unless the author decides otherwise, the prose style is the same in every chapter: the sentence rhythm, clarity, amount of description and level of humor of the winning sample in [[calibration]]. What changes from one POV to the next is the filter: what the character notices, the words they'd use, what they care about and how they judge it. The most colorful character gets the most colorful chapters because of who they are, not because their chapters use a different style.

## A. Story rules (check at the brief level)
1. **Every chapter changes something.** If you can't say what is different by the end of the chapter, don't draft it.
2. **Open scenes with a character who wants something** and is acting to get it. For a chapter's first scene, put the want and the stakes in the first paragraph, before the scenery.
3. **Characters act from established motivation.** If the plot needs them to act otherwise, fix the setup first.
4. **Problems are solved only with rules the reader already understands.** No new powers, tools or facts at the climax.
5. **Costs and limits over capabilities.** Using the core system should cost or risk something visible. When the system or the plot does damage, show it happening to specific things on the page (lichen going gray, needles falling), not just implied.
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
16. **The clarity rule: the reader never has to pause to work out what a line describes.** Name the thing before describing it, and write full sentences with a subject and a verb. Join related details in one sentence instead of stacking fragments: not "Four volumes, shelf eleven, upper row." but "The catalogue listed four volumes on the upper row of shelf eleven." A short sentence is for punch at the end of a beat, never for a list of details. Name the concrete thing rather than an in-world abstraction ("the boat," not "the thing at the center"). A joke or simile must read on the first pass; if it needs decoding, cut or plain it. Mark every time jump plainly ("*Centuries later*").
17. **The canon-physics rule: every physical property of the core system comes from canon.** Color, glow, temperature, smell, timing, what triggers it and how fast it acts. Don't add one for atmosphere; if a scene needs one, ask at the brief. (From Thornwake's prelude: cold ore, ore changing color, glowing mist, mist rising at moonrise, and "think about the day" all had to be cut.)
18. **The choreography rule: stage every use of the core system step by step, in the order the rules require.** Track hands and objects: who holds what, who touches whom, and what action triggers the moment. Nothing happens before its trigger. (Thornwake prelude: he breathed before he held the keepsake; the elder's hands were on shoulders they never touched.)
19. **The reason rule: every reaction and every piece of knowledge has its reason on the page.** Why the crew cheers; how the elder knows his fear; why a character is where they are. If the reason is off the page, put it on, in a line.
20. **The plain-theory rule: when characters argue about, explain or wonder how something works, state each position in one plain sentence the reader could repeat,** and make sure the rule behind each is already on the page. (Thornwake prelude: "Some say it's facing the fear that makes it go away. Others say it's taking the object back that removes the memory.")
21. **The last-line rule: the last line of a scene or chapter lands its point** (the cost, the turn, the hook). No ordinary action trailing after the closing beat.

## C. Anti-slop rules (AI-specific)
- Name every person and place deliberately; never accept a model-default name. See [[ai-prose-tells]].
- Prefer specific, unique genre details over generic ones.
- Let subtext stay subtext; no closing epiphany that restates the scene.
- Vary sentence and paragraph length; avoid "not X — it's Y", tricolon chains, em-dash pileups, and the body-language cliché list.
- Don't resolve tension early or make every character reasonable.
- Use [[ai-prose-tells]] as a *checking* pass after drafting, not as a negative prompt.

## D. Drafting preamble (put at the top of generation prompts)
> Write in clear {{PERSON}}-person {{MODE}} prose, {{TENSE}} tense, from {POV}'s perspective, for a {{AUDIENCE}} reader of {{GENRE}}. Match the prose style of the winning sample on the calibration page, whoever the POV is, and let {POV}'s personality color the narration through what they notice and how they judge it. Ground each scene in concrete sensory detail from the POV's point of view; convey worldbuilding only through what the character notices and needs right now. Keep dialogue doing the emotional work, with "said" for most tags. Keep introspection brief and ending in a decision. Honor the core-system rules and costs provided. Stay strictly within the brief: include every "must include", violate no "must not", and invent no new characters, places, powers or subplots. Leave subtext unspoken. Make every pronoun unambiguous and open every scene with a name.

## E. Self-check before handing a chapter to the author
- [ ] Did the chapter's promised thread move?
- [ ] Is the POV's want visible in the first paragraphs?
- [ ] Any action contrary to established motivation?
- [ ] Any problem solved by unestablished rules or luck?
- [ ] Any infodump longer than three sentences? Any "as you know"?
- [ ] Introspection brief, ending in a decision?
- [ ] Ran the [[ai-prose-tells]] scan?
- [ ] Pronoun pass, belonging pass, payoff check, voice check, reader's-English check (rules B9–B14).
- [ ] Does the prose match the book's one voice ([[calibration]]), with the POV character coloring it rather than a different style?
- [ ] If the POV character is hiding a plan, did the chapter cut away rather than have their thoughts mislead the reader?
- [ ] Clarity (B16): any fragment, abstraction or figure of speech the reader must stop to decode? Any time jump unmarked?
- [ ] Canon physics (B17): every color, glow, temperature, smell, timing and trigger of the system matches canon?
- [ ] Choreography (B18): each use of the system staged step by step in rule order, with who holds and touches what?
- [ ] Reasons (B19): every reaction and every piece of knowledge has its reason on the page?
- [ ] Plain theories (B20): every argument or explanation of how things work states each side in one plain sentence?
- [ ] Last lines (B21): does the final line of each scene land its point?
- [ ] Costs shown (A5): is damage shown happening to specific things?

## F. Genre promises
(book-new fills this from the genre modules.)

## G. Model-author rules
(book-new fills this from craft research: the specific craft principles of the authors in `model_authors`, each cited to a `craft/` page.)

## H. Calibration results
(book-new fills this from the A/B test: which version won and why, with the sample itself on [[calibration]]. Any dimension rules from extra pairs go here as a table.)

## I. Book-specific rules
Standing rules the author states while writing, numbered on from B21 (B22, B23, …). Each rule also gets a self-check line in section E.

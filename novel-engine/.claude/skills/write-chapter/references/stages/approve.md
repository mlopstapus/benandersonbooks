# Stage: approve (canon sync)

Drafting invents small facts: a street, a shopkeeper, a habit, how an effect looks. If they stay only in the chapter, a later chapter will contradict them. This stage writes everything new into the book's canon, so the wiki stays the single source of truth.

## Inputs
The approved chapter, its brief, the check report, and the author's answers on pending facts and questions.

## Steps
1. **List every approved new fact:** people (name, age, look, role, relationships), places (streets, rooms, what's nearby, travel times), objects and evidence, history and backstory, core-system behavior, world texture (institutions, transport, idioms, units), and every decision the author made on this chapter.
2. **Route each fact to its one home page**, written as a short line with its source: `- Ostley combs his whiskers in the window reflection (Ch3).`
   - People → `story/characters/<name>.md` under `## ChNN (approved YYYY-MM-DD)`. Minor one-scene people → the minor characters table in `idioms-and-terms.md`.
   - Places → `story/world/…`; recurring locations → `sets.md`. If the book has a map and a place is new or moved, update it and re-render it.
   - Core-system behavior → the system page under `## ChNN`, and new observable effects → continuity.md's **Observable effects**.
   - Terms, names, idioms, units → `idioms-and-terms.md`.
   - History → `story/events/`.
   - Historical facts → the research page, with its source; new real-world claims without a source go on the research page's open questions.
   - Plot and structure decisions → `manuscript/decisions.md`, and the outline if they change future chapters.
3. **Update `story/continuity.md`:** calendar (what happened on which day), running counts, who knows what, any tracked meters, and a new **Details ledger** section for this chapter (every concrete detail a later chapter could contradict).
4. **Ripple check.** For each new fact, search the outline, canon pages and remaining briefs for anything it now contradicts (a count that shifts later chapters, a place that moves a scene, a rule that changes the climax). Fix planning pages directly. List anything that changes future plot for the author. Add retrofit-queue rows for earlier chapters if needed.
5. **Retire placeholders.** Mark resolved open items resolved, update `status:` on pages the author has now approved, and delete superseded notes rather than keeping two versions.
6. **Outline row:** mark the chapter written; note any change to what it actually does.
7. **Index:** add the chapter (and any new pages) to `index.md`.
8. **Beta copy:** if `beta.type` is `google-doc`, append the chapter to the Doc following `engine/beta-google-doc.md` ("Append an approved chapter"), including verification. Batch any approved fixes to earlier chapters into the same sync.
9. Set `stage: synced`. Commit `sync: chNN`. Log: `## [date] sync | ChNN: <facts added>, <pages touched>`.

## Report
A few lines: pages changed, map or sets updated, ripple effects that need a decision, the beta Doc updated (with its new version). Offer `/write-chapter N+1`.

## Rules
- Only canonize what the author approved (explicitly, or by approving the chapter after seeing the new-facts list). Rejected facts get removed from the chapter too, unless the author says to keep the line.
- Never leave a fact only in a chapter if a later chapter could need it.
- Keep the details ledger cumulative; correct earlier rows, don't rewrite them.

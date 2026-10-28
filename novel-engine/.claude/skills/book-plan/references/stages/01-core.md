# Stage 1: core system

The core system is the part of the book that has to obey rules the reader can trust. The primary genre module's **Core system** section says what it is and adds genre questions. Secondary modules may add a second system page (a fantasy mystery has the magic *and* the crime); ask the author.

## Fantasy and sci-fi: brainstorm, then spec
1. **Seed.** Ask for an image, a cost, a source, a "what if". If the author has none, offer three short concepts tied to `reader-taste.md` (each: the hook, the cost, why it suits this book). If the author has two book ideas in mind, it's fine to compare them first (genre fit, the author's own reading, how each would sell as a series) and pick.
2. **Rules in rounds.** Brainstorm how it works, who can use it, what it costs, how the world treats it, what goes wrong. Write each settled rule into `story/system/<name>.md` (from `templates/pages/system.md`) as a numbered rule with its date. Expect rules to be rewritten several times in the first session (in *Thornwake*, the rule about what happens to a harvested object changed four times in one evening before it held). Rewrite in place and move the old version to **Dropped**.
3. **Follow each rule out.** After each rule, ask what it implies and play it back: "if anything taken is erased from everyone's memory, then society knows it is eating its own past", "if things can only be taken once, the supply runs out, so the world is on a clock". The implications often become the premise.
4. **The questions authors don't think to ask** (they matter later):
   - What **counters** it (sunlight, fire, a closed door)? Heists, guards and the climax depend on this.
   - **Where does the cost land on people who never used it?** A cost only users pay stays abstract; a cost the community or the future pays gives the POV someone to meet.
   - **What is society taught about it, and what's a lie?** Folk beliefs and superstitions go on the society or mythology page; a lie kept alive by the powerful is a plot engine.
   - **Can a user get stuck, lost or cut off?** What becomes of them?
   - **Can the system end,** and what would ending it cost?
5. **The spec table** plus the module's extra questions. "Not decided" is allowed for now; stage 5 forces the ones the outline needs.
6. **Name things:** the system, the verbs used on the page, the slang, the units. Check the name against famous series in the genre (avoid a "mist" or "shroud" readers already associate with someone else). Avoid generic verbs (pull, push, channel) if the book has its own. Add every term to `story/world/idioms-and-terms.md` and names to `story/world/names.md`.

## The history the system depends on
Most systems imply a past: where it came from, what it broke, why the world treats it as it does. Write it to `story/events/` (from `templates/pages/event.md`) as it comes up: the origin, the cataclysm or turning point, the collapse and recovery, what was lost or erased, and **what survives only as legend**. Separate who knows the truth from the official story. A buried cause is a strong series mystery.

Record the author's world rules that constrain everything else (for example "the only magic is this system, and there is no religion"; "everything else has a human, technical explanation") in the book's `CLAUDE.md` under Book-specific rules.

## Mystery: the crime
Fill `story/system/the-crime.md`: the true timeline of each crime, method, motive, opportunity, the evidence left, witnesses, the culprit's cover story and its weak point, and the chain of deductions that solves it. Draft this privately with the author; it is the answer key.

## Historical: the period and its sources
1. Agree the years, place and the real events the book overlaps.
2. Agree the **citation policy**: trusted source types, how claims are cited, whether there will be an author's historical note or bibliography.
3. Research topic by topic (the module lists the usual ones: travel and messages, medicine, law and police, money and prices, who can go where, technology, speech). For each source, save a note in `raw/history/<source-slug>.md` (full citation, what was taken, link). For each topic, write `story/research/<topic>.md` from `templates/pages/research-topic.md`, every claim cited.
4. Start the **fact vs. invention ledger** on `story/system/the-period.md`.
5. Real people: the policy for each (on the page, mentioned, invented stand-in).
Save after each topic; this part can span sessions.

## Close
Play back the system in a short summary: the hook, the five most important rules, the cost, what counters it. Update the quick-reference list in `story/continuity.md` → Locked rules and the canonical-homes table in `CLAUDE.md`. Commit `plan: core system`.

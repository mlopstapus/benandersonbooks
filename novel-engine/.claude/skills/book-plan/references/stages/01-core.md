# Stage 1: core system

The core system is the part of the book that has to obey rules the reader can trust. The primary genre module's **Core system** section says what it is and adds genre questions. Secondary modules may add a second system page (a fantasy mystery has the magic *and* the crime); ask the author.

## Fantasy and sci-fi: brainstorm, then spec
1. Ask for the seed: an image, a cost, a source, a "what if". If the author has none, offer three short concepts tied to `reader-taste.md` (each: the hook, the cost, why it suits this book).
2. Brainstorm in rounds: how it feels, who can use it, what it costs, how the world treats it, what goes wrong. Write it into `story/system/<name>.md` from `templates/pages/system.md` as you go.
3. Work through the **spec table** plus the module's extra questions. "Not decided" is allowed for now; stage 5 will force the ones the outline needs.
4. Name things: the system, the verbs used on the page, the slang, the units. Avoid generic verbs (pull, push, channel) if the book has its own. Add every term to `story/world/idioms-and-terms.md`.

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
Play back the system in a short summary: the hook, the five most important rules, the cost. Commit `plan: core system`.

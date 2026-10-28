# Stage 5: lock rules (the stress test)

Every question below was answered mid-draft in *Ash of Verdance*, and each answer cost fixes to chapters already written. Ask them now. Go section by section; for each question record the answer on its home page and mark it locked, or mark it explicitly **open until chapter N** (the first chapter whose brief needs it). Nothing the outline relies on may stay open.

Also run the **Extra lock questions** from every genre module named in `book.yaml`.

## 1. Core system edge cases
- Walk the spec table on the system page. Every line is answered or has an "open until ChN".
- Healing, killing, minds, storage, carrying or transferring power: yes or no for each.
- Duration, range and how they change with dose or strength; repeat use; what happens at the extremes (full strength, empty, two users against each other).
- What bystanders observe (sight, sound, smell, temperature, color, glow) and what they don't. Copy the final list into **Observable effects** in `story/continuity.md`. Anything not on the list does not happen on the page.
- **Play back every physical rule with a concrete test case** ("so at night, in the middle of a bridge, is there mist?"), and write canon lines with plain verbs. A vague verb ("rolls off water") can mean two opposite things.
- What another user perceives, and whether users can recognize each other.
- How to explain the system to a lay reader at first use (one or two lines of what the POV feels or sees).
- What counters the system, exactly (how far a flame clears it, how long a closed door holds), and every set piece that relies on a counter.
- **Edge-case drill:** list every set piece and the climax as known so far; for each, what does it need the system to do, and is that legal? Fill the drill table on the system page. Include every security measure and break-in method in the plan (a lock, a seal, a guard post): does the system make it pointless or trivial?

## 2. Counts and supply
- List every countable thing: doses, money, victims, days of supply, ages, years since key events, people in a group, objects that get used up.
- Starting value for each, and the plan through the climax (how it runs out, gets replenished, or gets taken).
- Fill **Running counts** in `story/continuity.md` with a "planned at climax" column.

## 3. Calendar
- **Day 0:** a weekday and date (in-world or real), and what happens on it.
- Day-by-day plan for act one; act-level for the rest, with the climax day fixed.
- **Ages and years:** each lead's age now and at every past event the book shows (flashbacks), and years since the key events. These leak into dialogue and must agree everywhere.
- Recurring events (meetings, market days, shifts, church, court sessions) with their weekday.
- Travel times between key places, and how they change at night or in weather.
- Fill **Calendar** in `story/continuity.md`. For historical books, check real weekdays and real events on those dates.

## 4. Antagonist plan and reveal
- The antagonist's off-page timeline, day by day, regardless of the protagonist. What they do, where, with what.
- What the antagonist knows at each point, and how they learn it. (A planned beat in *Ash of Verdance* was cut because the villain couldn't have known something.)
- Why they escalate, and on what schedule.
- **Reveal discipline:** the chapter where the reader may first suspect them, and the rule for before that (no tells).
- Mystery or not, fill the **Clue and payoff plan** table in the outline for every clue and setup the ending depends on.

## 5. Set pieces and climax
- The climax beat by beat, using only locked rules. No new capability, tool or fact may appear at the climax.
- The three to five emotional set pieces the book exists for (a backstory reveal, a death, a confession, a reunion): who is there, what happens in substance, what is said in substance, what it pays off. Name every person involved.
- Physical logic of every fight and chase: who is stronger and why, positions, exits, what each side has left.

## 6. Who knows what
- The secrets of the book (list them; for a series, the series' secrets too, with the book where the reader learns each). For each main character and the reader: knows or not at the start, and the chapter each one changes.
- **Scene logic:** walk each set piece through the table. Can this character act on, fight, chase or hide from that one, given what each knows? (A crew can't fight guards who don't know the crew is there.) Can the antagonist react to something they haven't learned yet?
- **Penalties:** what getting caught costs each side (prison, the mines, exile, death). Stakes set how heavy every choice is, especially a choice in a character's past.
- Fill **Who knows what** in `story/continuity.md`, and the **Knows / doesn't know** table on each character page.

## 7. Ending and length
- End state of every thread and every main character's arc confirmed against the spine.
- Denouement or epilogue: yes/no, and what it covers.
- Chapter length target and the chapter count it implies (`craft/scope.md`). Note which chapters are likely to run long (climax chapters usually do) and plan them as two.

## 8. Recurring sets
- Confirm `story/world/sets.md` covers every location used in three or more chapters.

## 9. Series locks (series only)
- Every series thread's book-1 step is placed in the outline, and nothing in book 1 contradicts a later book's planned beat (a secret revealed too early, a character who must survive, a door that must stay open).
- What book 1 must leave alive, unexplained or recoverable for later books (an object catalogued rather than destroyed, a question the protagonist only files away).

## Write and confirm
- Seed `story/continuity.md`: Calendar, Running counts, Who knows what, Observable effects, Locked rules (one line each, linking home pages), an empty Retrofit queue and Details ledger.
- Put a **Locked rules** summary in `manuscript/decisions.md` under Settled.
- Show the author a short list of what got locked and what is open until which chapter. Questions the author defers stay in decisions.md's Open list with the chapter that needs them; don't force them now unless the outline breaks without them. Get approval, set approved pages to `status: canon`, commit `plan: lock rules`.

# Stage 4: world

Only as much world as the story will touch, plus enough depth underneath that details feel consistent. Lore can stay off the page; it still has to exist. Expect several sessions; give each topic its own page and keep one subject per page (conventions §3).

## Ask, in rounds
1. **Setting** (`story/world/setting.md`): land and water; what grows and what doesn't; food, fuel and materials and where each comes from; regions that differ (coast and interior); the old world's level if there was one. Ask the logistics question for every scarcity: "if nothing grows outdoors, why can't they farm indoors?"; the answers become rules or plot.
2. **History** (`story/events/`): the one or two past events that explain how the world treats the core system and the main conflict (a war, a ban, a plague, a cataclysm). Who knows the truth vs. the official story, what was lost or erased, and what survives only as legend. A timeline, even rough.
3. **Present day** (`story/world/present-day.md`): time since the turning point, technology, daily life, getting around, economy, night versus day. Pointers to canon held elsewhere rather than restatements.
4. **Society and belief** (a society page, and `story/mythology/` if the module creates it): what people are taught, customs and superstitions (with their origin), records, regulation and penalties, how ordinary people feel about the core system. Keep belief apart from truth and link the two.
5. **Institutions and politics** (`story/institutions/`, if the world has guilds, houses, orders, agencies or factions that matter):
   - First, the author's line on **how much politics** ("a little politics, not a political novel"). Write it at the top of the hub; every later proposal answers to it.
   - The **governing body**; the list of institutions with what each **represents**; in-world names (checked against `names.md`; file names can keep plain role words).
   - The **loop** (who supplies whom with what) and the imbalance at its center, which is usually where the antagonist's power sits.
   - **Relationships**, one line per pair, naming both. **Factions** within and across them.
   - **Heads and named members** with weight (main or walk-on).
   - Use `templates/pages/institutions-hub.md` for the hub and `institution.md` for each one. A fact about one institution goes on its page; only facts involving two or more go on the hub.
6. **The underworld** (if the protagonist works outside the law): the black market, fences, where illegal goods and tools come from, what the law does to people caught.
7. **Places** (`templates/pages/place.md`): the city or region and its districts, then each place a chapter will use. Sensory signature for each. Travel times between key places.
8. **Recurring sets** (`story/world/sets.md`): the three to six locations the book returns to (the protagonist's home, the workplace, the antagonist's house, a meeting place). Lock the layout: rooms, doors, which entrance people use, what is where. *Ash of Verdance* needed fixes for a front door vs. back door and a kitchen range vs. a parlor fireplace.
9. **Language** (`story/world/idioms-and-terms.md`, `story/world/names.md`): place names, oaths and in-world swearing (if `content_lines` asks for invented oaths), slang, units, forms of address, naming conventions per culture. Check each against the reader's English (`dialect`, `period_words`).
10. **Map** (`templates/pages/map.md`): **map only what this book uses.** If the book stays in one city, draw the city and keep only the wider facts canon already fixes. A simple SVG in `story/world/`, or a design canvas if the author prefers to sketch; render it to check labels don't overlap. Record moves of the plan under Changes over time.

## Close
Update the canonical-homes table in `CLAUDE.md` for facts that touch many pages (the cataclysm, the society's lie, the institutions' loop). Commit `plan: world`.

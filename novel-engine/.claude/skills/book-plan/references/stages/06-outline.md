# Stage 6: outline

Turn the spine, the cast and the locked rules into a chapter plan the chapter loop can brief from, one row at a time. In practice this is one long working session in two passes: a **first pass** of the whole book for the author to react to, then **beats part by part**, with the author's changes folded in before moving on.

Read: the outline so far, the series arc (series), every lead's page, the system page, `craft/calibration.md`, `craft/scope.md`, the Open list in decisions.md.

## 1. First pass: the shape and the chapter list
Bring a complete proposal in one message, so the author reacts to a whole book rather than answering questions about an empty one. Nothing is written to the outline yet.
- **Structure:** a prelude or prologue? Named **parts** (four parts is a sturdy default for a novel)? Short **interludes** between parts from outside the main POVs (the antagonist's side, a hunter, a minor viewpoint the leads can't give)? Say what each device buys and costs (in close third, every page away from the focus lead is a page the reader isn't with them).
- **POV split:** chapters per POV, including flashbacks. The focus lead carries about half; the others get enough chapters that each has a visible arc.
- **Flashbacks** (if the focus lead has them): run them in chronological order, one every few chapters, each landing **just before the present-day beat it sets up** (the wound flashback right before the low point; the aftermath right before the climax choice).
- **The spine's mirror:** say where the past choice is shown and where the climax echoes it.
- **The chapter list:** one row per chapter with POV and what happens, part headings as rows.
- **A few proposals that fill holes** the plan exposes (how a character gets access, which earlier scene sets up the climax's rule), each marked proposal and checked against the rules first.
- **Questions:** three or four, numbered.

**Length:** if the author asks, translate words to pages (about 275–300 words per page at a 6×9 trade trim) and compare with their earlier books. Offer a leaner and a fuller version only if asked. If the author says "how long it is will be how long it is", record that and don't merge chapters to hit a number; a book that feels rushed is the bigger risk.

## 2. Beats, part by part
Take one part per round (prelude and part one first). For each chapter, 3–6 bullets in the outline's **Chapter beats** section:
- What happens, in order, with the reason for each turn.
- **Plant:** any clue, setup or preparation placed here, which also goes in the clue table.
- **Hook:** how the chapter ends (a turn, a question, a cut-away). Short chapters that end on a hook suit most commercial fiction.
- Scene details the author hasn't approved stay *proposal*; the brief settles them.

After each part, ask what feels thin or wrong, fold the answers in, and offer the next part. When the author redirects a beat (too dark, wrong for a character, a rule broken), take the correction, fix the ripple through later parts, and record the line it implies (a tone line in reader-taste, a rule clarification on the system page).

## 3. Threads the reader can watch
For each thread, write its steps by chapter number in **Plot threads**. Give every thread that is physical or countable a **progress ladder**: its state in each chapter that touches it (a greenhouse from bare frame → one pane → a sealed case → the first bay → standing; a stock of anchors running down). Ladders give secondary POVs a visible arc and keep chapters from repeating a state. Check that the ladder's in-between steps are fed (fuel runs, supply jobs) by smaller chapters between set pieces.

## 4. Set pieces and action
Fill the **Set pieces and action** table: chapter, scene, kind, and the rule or setup it turns on.
- **Each big set piece turns on a different rule** of the system, so the system does the work and the reader learns it through action.
- **Repeated kinds play differently.** Two heists: one goes almost perfectly (a joy to watch), the other goes wrong early and forces improvising.
- **Check the action balance** against the taste page. Heists, discovery and politics can leave a book with little physical danger. If so, propose one or two fights where the protagonist **can't run and can't talk their way out**, and make them fight in character (a talker fights dirty and badly, wins by a trick, and it costs them). Put one near the midpoint if the middle sags.
- **Every rule the climax uses appears on the page earlier** (a torch used against a traveler in the middle of the book, before fire decides the climax).
- **Hidden plans** (a scheming protagonist): in close POV the narration never lies about what the POV is thinking. Cut away once they have a plan ("I've got an idea"), pick up once it's in motion, and plant the preparation where a careful reader could see it. Each one goes in the clue table.

## 5. Climax and ending
- Fill **Climax** beat by beat, using only locked rules. Consider a **cut-away and reveal across POVs**: the focus lead's chapter cuts at the decision; the next chapter, from another POV, assumes the worst; the climax chapter reveals what they actually did.
- **Bookend:** set the climax somewhere that ties back to chapter 1 or the wound (a place, an object, a sound) without anyone saying so.
- Fill **Ending and denouement**: every thread's end state, every lead's arc, and for a series the open question and the way back in for the next book.

## 6. Clues, rules and pacing
1. Place every clue, setup and payoff from the **Clue and payoff plan** in a specific chapter row (and, for a series, every book-1 step of the series threads).
2. Place the first on-page appearance of each core-system rule, so the reader learns every rule before the climax uses it.
3. Place where each cost of the system lands on a living person the POV meets.
4. Check the POV distribution against `book.yaml` and scope.
5. Check pacing: where are the lulls, the escalations, the act breaks? Does anything sit at maximum intensity for too long? Is politics within the author's line?

## Review with the author
Walk the list part by part. Then ask the last question: **"Is there anything chapter 1 needs that isn't decided yet?"** Anything that comes up gets locked now or marked "open until ChN". Questions the author says can wait go to the Open lists (outline and decisions.md) with the chapter that needs them.

## Close
Set `chapters_planned` and `structure` in `book.yaml`. Approve → `status: canon` on the outline with a status line saying what the author approved (rows can still change; changes go through `/book-plan` re-runs or canon sync). Update character pages with the beats the outline settled, decisions.md with one line per decision, and the series arc with anything book 1 now plants. Commit `plan: outline`, log it, update `index.md`. Tell the author they're ready for `/write-chapter 1` (or the prelude).

Don't over-plan beyond this. Beats for later chapters can be two lines; the brief does the detailed work.

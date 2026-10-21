# Stage 6: outline

Turn the spine and locked rules into a chapter list the chapter loop can brief from, one row at a time.

## Build
1. Fill **Set pieces** and **Climax** in `manuscript/outline.md` from stage 5.
2. **Chapter list:** one row per chapter: working title, POV, day (from the calendar), purpose (what is different by the end), threads advanced, target words. Every chapter changes something; if a row's purpose is vague, merge it or give it a job.
3. Place every clue, setup and payoff from the **Clue and payoff plan** in a specific chapter row.
4. Place the first on-page appearance of each core-system rule (the "rules" list on the system page), so the reader learns every rule before the climax uses it.
5. Check the POV distribution against `book.yaml` and scope.
6. Check pacing: where are the lulls, the escalations, the act breaks? Does anything sit at maximum intensity for too long?

## Review with the author
Walk the list act by act. Then ask the last question: **"Is there anything chapter 1 needs that isn't decided yet?"** Anything that comes up gets locked now or marked "open until ChN".

## Close
Set `chapters_planned` in `book.yaml`. Approve → `status: canon` on the outline (rows can still change; changes go through `/book-plan` re-runs or canon sync). Commit `plan: outline`, log it, update `index.md`. Tell the author they're ready for `/write-chapter 1`.

Don't over-plan beyond this. Rows for later chapters can be a single line; the brief does the detailed work.

# Stage: brief

## Load
Read these, in this order. Long files: list their headings first (`grep -n '^#' <file>`), then read the sections you need.

1. `engine/conventions.md`, the book's `book.yaml`, `CLAUDE.md` (its cast map says which file holds which character; its notes say where the calendar lives if not in continuity.md).
2. The chapter's row and its **Chapter beats** section in `manuscript/outline.md`, plus every thread beat, progress-ladder state, clue, set piece and rule appearance placed in this chapter. For a series, the lines of `manuscript/series-arc.md` that name this book's threads, so a series plant isn't dropped or revealed early.
3. **Current state** from `story/continuity.md`: the calendar, running counts, who knows what, observable effects and the retrofit queue. Where these are kept as per-chapter entries in the details ledger rather than one table, use the latest entries (the previous chapter's, then the one before). Also read the details-ledger sections for the last two or three chapters.
4. The previous chapter in full, and the frontmatter `summary:` of every earlier chapter.
5. Canon pages only for the characters, places and rules this chapter touches. On long append-only pages, read the core sections at the top plus the most recent dated sections.
6. `craft/style-guide.md` sections A (story rules), F (genre promises), G (model-author story rules) and I (book-specific rules); `craft/reader-taste.md` (including tone lines).
7. `manuscript/decisions.md`: open items, and any settled entry that names this chapter or a later one.
8. Any planning item still marked as a pending proposal that touches this chapter (search the outline and canon pages for `proposal`).

## Write
`manuscript/briefs/chNN-brief.md` from `templates/pages/brief.md`. Rules:
- **Day and time** follow the calendar exactly and pick up from the previous chapter's last moment. Days are numbered from Day 0 (`calendar.day0` in book.yaml) and given with weekday and date.
- **Running counts** before → after for every count this chapter touches, and the state of any progress ladder.
- **Flashbacks:** the character's age and the date in the past, consistent with the ages locked on their page, and the present-day beat it sets up.
- **Beats** carry their reasons. When a beat depends on a rule or an earlier chapter, cite it ("set up in Ch8", "range rule").
- **"Why doesn't she just…?"** List every obvious alternative a reader will ask about (use the power, call for help, run, wait, tell someone) and make sure the brief answers each one, in a beat or as an open question.
- **Who knows what at the end**, one line per main character, offstage ones included. Check every beat where one character acts on another against what each knows.
- **Plants, payoffs and the hook** from the outline's beats and clue table. If the POV character hides a plan, mark where the scene cuts away and what preparation a careful reader can see.
- **Opening and hook:** the POV's want and stakes in the first paragraph; the last line of the chapter; what pulls the reader into the next chapter. For an opening chapter or prelude, how it promises the scale of the book.
- **System behaviors shown:** list each behavior of the core system the scene will show (what it looks like, how people inside react, what triggers it, how a counter works) and confirm canon covers each. Anything canon doesn't cover is an open question, not a detail for the drafter to invent.
- **Repeats:** grep the chapter's key places, objects, actions and set-up lines across earlier chapters and read the hits. Anything this chapter would echo goes in **Must not**, or becomes a deliberate callback.
- **Open questions for the author:** anything the outline leaves undecided, every pending proposal from step 8, and anything in the outline row that contradicts itself. Each with a recommendation. Don't invent the answer silently.
- **New facts:** every name, place, rule detail or past event the chapter will introduce. Numbered, so the author can approve them one by one.

Stay within locked rules. If the chapter seems to need a new capability, or a new behavior of an existing one, that is an open question, not a beat. (In *Ash of Verdance* a rule about what one user can sense of another was invented while drafting a late chapter; asked at the brief, it would have cost no retrofits.)

## Present
Send the brief file and a short summary: the job of the chapter, the beats in a line each, and the numbered questions and new facts. Make sure the brief's `stage` is `brief-draft`. Commit `brief: chNN v1`, log it.

## Revise
Apply the author's notes, bump the version in `status`, and record each settled question in the beat it affects ("(author, YYYY-MM-DD)") and in `manuscript/decisions.md` if it affects later chapters. Expect several rounds; the author may reject the shape of the chapter outright (in *Ash of Verdance*, a planned sting was redesigned twice at the brief stage), and that is the cheapest place to do it.

When the author approves: `stage: brief-approved`, `status: "approved by author YYYY-MM-DD (vN)"`. Commit `brief: chNN approved`. Go to the draft stage.

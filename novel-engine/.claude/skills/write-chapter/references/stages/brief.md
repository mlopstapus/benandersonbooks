# Stage: brief

## Load
- The chapter's row in `manuscript/outline.md`, plus every thread beat, clue and set piece placed in this chapter.
- `story/continuity.md`: calendar, running counts, who knows what, observable effects, retrofit queue, and the details ledger for the last two or three chapters. (Read in chunks.)
- The previous chapter in full, and the summaries of the ones before it.
- Only the canon pages for the characters, places and rules this chapter touches.
- `craft/style-guide.md` section A (story rules), F (genre promises) and G (model-author story rules); `craft/reader-taste.md`.
- Open items in `manuscript/decisions.md` that affect this chapter.

## Write
`manuscript/briefs/chNN-brief.md` from `templates/pages/brief.md`. Rules:
- **Day and time** follow the calendar exactly and pick up from the previous chapter's last moment.
- **Running counts** before → after for every count this chapter touches.
- **Beats** carry their reasons. When a beat depends on a rule or an earlier chapter, cite it ("set up in Ch8", "range rule"). When a choice needs explaining on the page ("why she doesn't just go to the police"), write the reason into the beat.
- **Who knows what at the end**, one line per main character, offstage ones included.
- **Must not** lists the repeats to avoid: earlier beats, images and lines this chapter could echo. Search earlier chapters for them.
- **Open questions for the author:** anything the outline leaves undecided, each with a recommendation. Don't invent the answer silently.
- **New facts:** every name, place, rule detail or past event the chapter will introduce. Numbered, so the author can approve them one by one.

Stay within locked rules. If the chapter seems to need a new capability or fact that changes canon, it's an open question, not a beat.

## Present
Send the brief file and a short summary: the job of the chapter, the beats in a line each, and the numbered questions and new facts. Set `stage: brief-draft`. Commit `brief: chNN v1`.

## Revise
Apply the author's notes, bump the version in `status`, and record each settled question in the beat it affects ("(author, YYYY-MM-DD)") and in `manuscript/decisions.md` if it affects later chapters. Expect several rounds; the author may reject the shape of the chapter outright (in *Ash of Verdance*, a planned sting was redesigned twice at the brief stage), and that is the cheapest place to do it.

When the author approves: `stage: brief-approved`, `status: "approved by author YYYY-MM-DD (vN)"`. Commit `brief: chNN approved`. Go to the draft stage.

# What planning *Thornwake* taught the engine

*Thornwake* (working title) is a fantasy trilogy planned between October 26 and 28, 2026, across about ten topical sessions: the magic system, the cataclysm and history, society and customs, the guilds and politics, the trilogy threads, the three leads, the city and map, the voice and model authors, a wiki-structure audit, and the book 1 chapter plan. It was the first real use of `book-plan` (and of parts of `book-new`) on a new book. This page records what it showed and where each lesson now lives. The book's own wiki is the evidence: its `log-archive.md` (60 entries), `decisions.md`, `trilogy-arc.md` and `outline.md`.

Short version: the stages were the right checklist, but the author didn't plan in stage order. Planning happened as riff sessions on one topic at a time, and the most valuable work was following an idea out to its consequences. The engine now treats the stages as a list of what must exist, adds a series layer, and writes down how a good planning session runs.

## How the sessions ran

| What happened | Where it lives now |
|---|---|
| The author thought aloud with fragments and typos; the AI played them back cleanly and extended them ("if things can be harvested only once, the world is on a clock") | conventions §10; book-plan "Running a session" |
| The AI twice proposed things that broke locked rules (vault mist seals, when travelers return to the spot they left; a crew fighting guards who didn't know the crew was there). The author caught both | conventions §10 "check every proposal against canon"; system page edge-case drill now covers security and heist methods; lock-rules §6 scene logic |
| A full first pass of the book (shape, 32 chapter rows, four proposals, four questions) worked better than questions about an empty outline; then beats part by part | book-plan stage 6 §1–2 |
| "I think all these questions don't need answers right now" | conventions §10 "respect not now"; decisions Open list tagged with what needs it |
| A dark proposal (a drowned sibling) was rejected for the author's family readers | book-new taste interview: tone lines; conventions §10 |
| Rules were rewritten many times in one evening (the harvested-thing rule changed four times) | system page: numbered rules rewritten in place, a Dropped list |
| Token cost: whole pages and the long decisions log were being rewritten after every decision | book `CLAUDE.md` template: canonical homes, load tiers, edit hygiene; conventions §3 and §6 (decisions as a ledger, one-line log, log archive) |
| Two copies of the wiki drifted (a claude.ai Project and the local folder) | conventions §1: the book folder is the only copy |

## What the outline needed that the engine didn't have

| Concept from the sessions | Where it lives now |
|---|---|
| A trilogy: one question per book, threads hinted → turned → paid off, a focus lead per book with flashback chapters (Stormlight-style) | New stage `00-series.md`, new page `templates/pages/series-arc.md`, `series` in `book.yaml` |
| An institutional antagonist with motives revealed one layer per book (sincere, power, buried crime), their lies cracking one by one, honest muscle that turns | Series stage §3; series-arc template; institution template "lies and secrets" |
| An escalation ladder (glass → clean soil → the cure), each step threatening someone new | Series stage §2; series-arc ladder table |
| The spine as a mirror: the wound was a *choice* (he chose to strand his crew), and the climax repeats it knowingly | Spine stage §3; outline Shape; character template "wound, as a choice" |
| Book 1 plants without explaining (the sting's reason is a book 2 realization) | Spine stage §6; lock-rules §9 series locks |
| Prelude, named parts, interludes, POV split, flashbacks in order landing right before the beat they set up | Stage 6 §1; outline Shape; `structure` in `book.yaml`; ch00 and iN naming in write-chapter |
| A visible progress ladder for a secondary POV's thread (the greenhouse pane by pane) | Stage 6 §3; outline threads; brief template |
| Set pieces each turning on a different rule; two heists that play differently; the author wanting real fights in a heist book; fights where the talker can't run or talk | Stage 6 §4; outline set-piece table |
| Withheld plans in close third: cut away at "I've got an idea", plant the preparation | Stage 6 §4; style guide self-check; brief template; character craft notes |
| Climax as a cut-away and reveal across POVs, set on the chapter 1 bridge | Stage 6 §5 |
| Chapter beats with Plant and Hook markers | Outline template "Chapter beats"; brief stage |
| The cost of the system landing on living people (the hollowed elders) | System spec row; core stage §4; fantasy module |
| Fire as a counter to the mist, which made the climax and heists work | System spec row "what counters it"; fantasy module |
| Society taught a lie about the system ("nothing living can be harvested"), cracked by a sprouting seed | System page "taught vs. true"; core stage §4; fantasy module |
| Guilds: a hub plus one page per guild, the loop, relationships naming both guilds, "a little politics, not a political novel" | World stage §5; `institutions-hub.md` and `institution.md` templates |
| Leads with a model character and deliberate differences (Sage, but warm and fight-averse), why we like them, quirks, weaknesses, each lead's relationship to the truth | Cast stage; character template |
| Names: in use, in-world institution names, do-not-use (the author's earlier book, AI defaults, famous series), taken first letters | `templates/book/story/world/names.md`; `off_limits` in `book.yaml` |
| Map only what this book uses | World stage §10; map template |
| Length set by the story, not a number; pages-to-words conversion | book-new stage 1; stage 6 §1; scope |

## Voice

| What happened | Where it lives now |
|---|---|
| The config (omniscient, present tense) conflicted with all three model authors; switched to close third, past | book-new SKILL "check the config against the taste"; stage 4 first step |
| Calibration used two versions of the protagonist's real opening, each leaning a model author, instead of generic dimension pairs | book-new stage 5 (the new default; pairs are optional) |
| "One voice for the whole book; the POV character colors it" | Style guide template voice note and preamble; calibration template |
| Model authors each own a layer (structure and system; the protagonist's voice and withheld plans; warmth and the mentor) | book-new stage 4, section G |

## Still untested
- Drafting: no Thornwake chapter has been briefed or drafted yet, so the brief and check changes are untested.
- Book 2 layout: the engine recommends keeping a series in one folder, but hasn't tried it.
- The Thornwake wiki itself hasn't been migrated to the new templates (its guilds live in `story/guilds/`, its series page is `trilogy-arc.md`). Both work; `/book-next` will report the folder names as schema drift if the book's `CLAUDE.md` doesn't list them, and it does.

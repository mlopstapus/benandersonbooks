# Migrating an existing book

For a book written before the engine existed (or in another system), so the skills can work on it. Learned by migrating *Ash of Verdance*. Work on a **copy**; keep the original untouched until the copy is proven.

## Steps
1. **Copy** the book into `books/<slug>/`. Leave out old backup folders (git replaces them) and build output.
2. **`book.yaml`:** fill it from `templates/book/book.yaml`. Set `phase` honestly (`drafting`, `revising` or `released`), and set `calendar.day0`, `genre`, `dialect`, `content_lines`, `model_authors`, and `beta` if a shared Doc exists.
3. **`CLAUDE.md`:** start from `templates/book/CLAUDE.md` and keep the old schema as `manuscript/reports/legacy-CLAUDE.md`. Fill in:
   - the **cast map** (which file holds which character), especially if character pages are named by role (`protagonist.md`, `villain.md`);
   - **where things live** when they differ from the engine's defaults (where the calendar is, where the current who-knows-what is kept);
   - known gaps (chapters with no brief, chapters split from others).
4. **Folders:** move the core-system page into `story/system/` (wikilinks are by file name, so they keep working). Rename the scope page to `craft/scope.md` and fix links to it. Move loose reports into `manuscript/reports/`.
5. **Stage fields:** add `stage:` to every brief and chapter frontmatter. **Don't mark everything `synced` by default.** For each chapter, check that its facts are actually in continuity.md and the canon pages, and that its status text doesn't say "pending". Mark anything doubtful `approved` so `write-chapter` runs its canon sync. (In *Ash of Verdance*, two chapters split from a pending draft had been published but never synced; a blanket `synced` would have hidden that.)
6. **Style guide:** keep the book's own rules and numbering. Add sections F (genre promises), G (model-author rules, or a pointer if A and B already are), H (calibration results, or a pointer) and I (book-specific rules). Move any book-specific rules that lived inside old skills or prompts into section I, **with their context** (a rule like "no tea" needs to say what it means, or a reviewer will flag every cup).
7. **Taste page:** set `craft/reader-taste.md` to `status: canon` if the author treats it as settled.
8. **Index and links:** fix links to renamed pages. A full index rebuild can wait for `/book-next`'s health check.
9. **Git:** `git init` inside the book folder and commit `setup: migrated`.
10. **Run `/book-next`** with a health check. Expect a long list on an old book (frontmatter gaps, stale proposals, pages without homes); fix the mechanical ones and triage the rest with the author.

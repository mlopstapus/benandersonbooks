# Beta readers on a Google Doc (optional)

Used when `book.yaml` has `beta.type: google-doc`. Beta readers (family, friends, a writing group) read and comment in one shared Google Doc that holds the approved chapters. **The book folder stays the source of truth;** the Doc is a delivery copy.

Requires the Google Drive and Google Docs connectors. Read the google-workspace skill (if available) before the first Docs edit in a session.

## Rules
- Always edit the one Doc in place (`beta.doc_id`). Never create a new Doc for a new version.
- The Doc holds only **approved** chapters. Batch approved fixes into the next sync instead of re-syncing after every small edit.
- Keep a version line at the top of the Doc ("Chapters 1–N (Draft, vK)") and the same range in the Drive file title. Update both whenever chapters are added.
- Formatting: chapter title as Heading 2 ("Chapter N: Title"), centered `* * *` for scene breaks, italics carried over from markdown `*…*`. No wikilinks, comments or frontmatter.
- Google Docs indexes are UTF-16 code units, not characters. Compute offsets accordingly.
- Every write passes `writeControl.requiredRevisionId` from a fresh read, so a reader's concurrent edit isn't overwritten.
- The connector can't resolve comments. Tell the author which comment threads are fixed so they can resolve them.

## Append an approved chapter (write-chapter, approve stage)
1. Read the Doc to get the end index and `revisionId`.
2. Build the plain text of the chapter from the markdown: strip frontmatter, wikilinks and HTML comments; record the italic ranges and the scene-break lines.
3. One `insertText` at `endOfSegmentLocation`, then `updateParagraphStyle` (HEADING_2) on the title, centered alignment on scene breaks, and `updateTextStyle` (italic) on each italic range, using offsets from the insertion point.
4. Update the version line (`replaceAllText`) and the Drive title (`update_file`).
5. Verify: read the Doc again, rebuild the chapter's paragraphs (italics as `*…*`) and diff against the chapter file paragraph by paragraph. Fix any mismatch before reporting.

## Sync edits to chapters already in the Doc (line-edit)
1. Export the Doc as text/plain. Strip comment markers like `[a]` and the comment footnotes.
2. **Check for edits made in the Doc first:** every chapter paragraph from before your edits should already be in the Doc. A missing one means the author or a reader edited the Doc directly. Copy those edits into the book (the book stays the source of truth), then continue.
3. Build minimal `replaceAllText` pairs: trim each changed paragraph to the smallest window that differs, widen to word boundaries, then keep widening until the find text occurs exactly once in the whole Doc. Strip markdown `*` from both sides.
4. Never let a window run from roman text into italic text (the replacement takes the style of the first matched character). Split windows around italics.
5. Check each pair lands in the right chapter, using the offsets of the "Chapter N:" headings. Short paragraphs ("He stopped.") can match elsewhere; fix those by position instead (read the Doc, find the paragraph by its neighbors, delete and insert in descending index order, guarded by the revision id).
6. Send all pairs in one batch; confirm each reply says `occurrencesChanged: 1`.
7. Verify as in "Append", step 5.

## Gather reader comments (line-edit)
1. Read the Doc with comments included (`read_file_content`, `includeComments: true`). Save to a file and parse it.
2. Anchors appear as `<comment_start id=…>text<comment_end id=…>`. For each comment, record the reader, the anchored text, about 500 characters of context, the chapter, and the comment.
3. Also look for notes typed straight into the Doc text, and for edits made directly in the Doc (step 2 above finds these).

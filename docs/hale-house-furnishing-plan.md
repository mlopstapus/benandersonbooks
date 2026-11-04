# Hale house: furnishing and illustration pass

30 October 2026. Proposal for the existing early-book tour, not a list of new canonical facts. The user approved the furnishing list and requested exposed hearth boards on 30 October. The main furnishing pass is now implemented; the optional side table, extra crockery shelf and washing line remain omitted to keep the small rooms and yard clear.

## What the manuscript adds to our inventory

- **Gideon's washstand and mirror:** Ch8, *Sallow Jack*, lines 340–344. At home, he puts something on his washstand and then stands at the glass to fasten his shirt. These are explicit, previously missed furnishings. Their shape and exact position are not described. Do not display the plot-related object left on the washstand.
- **Hall coat hook:** Ch12, *Seized*, line 111; Ch8, line 340. A hall hook is explicit, separate from the peg by the back door in Ch2. A row of hooks on a narrow wooden rail is an interpretation; a large freestanding coat stand is not specified.
- **Kitchen basin:** Ch7, *The Docks*, lines 203–205. Gideon washes his hand using water poured from a jug into a basin. The basin should be an ordinary domestic object in the tour, without staging the associated injury.
- **Hearthrug:** Ch12, line 135. Already modeled as a small, faint cloth surface, so this needs to read more clearly as a rug rather than adding a second rug accidentally.
- **Callum's drawer contents:** Ch12, line 311: socks, a clean collar, and a tin soldier missing its gun. Ch13, line 45: three drawers, ordinarily not closed all the way. The current chest has three closed-looking drawer faces. A slightly open drawer with a glimpse of cloth and the soldier would communicate this better. Their precise arrangement inside it is invented.
- **Entrance mat:** Ch26, line 54, explicitly at the front entrance; Ch17, line 388 also mentions a mat in the homecoming sequence. Using a worn mat in the earlier house is a continuity inference because the front mat is described late.
- **Bucket and brush:** Ch20, lines 100–116. These exist in the household's later events. Storing ordinary cleaning implements in the early yard is plausible, but the early placement is inferred.

## Proposed additions and improvements

| Space | Proposal | Evidence and placement |
| --- | --- | --- |
| Parlor | A narrow, worn two-seat settee, with shaped arms and a slightly sagging seat | Inferred; no sofa was found in the manuscript search. Against a wall, leaving the hearth and entrance clear. The room is unused, not necessarily unfurnished. Avoid a large modern sofa or a busy arrangement of cushions. |
| Parlor | Make the hearthrug readable: a darker woven border, uneven fringe and worn middle | Rug is explicit and already present. Pattern, wear and fringe are visual interpretation. Keep it immediately before the hearth, not as wall-to-wall carpeting. |
| Parlor | Optional small side table beside the settee | Inferred; lower priority. Add only if the room still needs it after the main seating and rug are legible. Do not add the ending's inquiry desk, kitchen table or office sign. |
| Hall | A shallow wooden coat rail with simple metal hooks; one naturally hanging coat | Hook and use for Callum's coat are explicit. Number of hooks and the displayed coat's exact location are inferred. Mount to a wall rather than obstructing the narrow passage. Keep the existing satchel peg at the user-requested hall back entrance. |
| Hall | Worn entrance mat | Explicit in the later book; early presence and woven construction inferred. Keep it flat across the threshold without creating a navigation obstacle. |
| Gideon's room | Washstand and looking glass | Both explicit in Ch8. Highest-priority missing furnishings. Put against a wall with usable standing room; mirror size and washstand shape inferred. |
| Gideon's room | Bowl, jug and a folded towel on the washstand | Inferred accessories for the explicit washstand; the kitchen's basin and jug are separately explicit. Avoid presenting a second upstairs set as quoted manuscript detail. |
| Gideon's room | Plain, modest chest of drawers | Inferred clothing storage, distinct from his explicit quilt chest. Back it against a free wall, with fronts facing into the room and room to open them. |
| Gideon's room | A simple chair with a folded shirt or waistcoat | Inferred furniture/placement; his clothing and changing in the room are supported by Ch8. Optional after storage and washstand fit. No crowded bedside furniture set. |
| Callum's room | One partially open drawer, visible socks/collar, and the small damaged tin soldier | Objects and habitual open drawers are explicit. Keep the soldier inside the drawer, rather than inventing a prominent display shelf. This can be a close-up detail, not another walking stop. |
| Callum's room | Replace the generic cloth square on the chair with a recognizable shirt | Shirt and chair are explicit. A collar, sleeves, drape and folds should make the object legible without a tooltip. |
| Callum's room | Improve the borrowed book: page block, bent cover, visible library ticket | Book and overdue ticket are explicit; wear and cover design inferred. No invented title. Avoid implying the current sill placement is its only location throughout the book. |
| Kitchen | Washing basin beside the existing jug; a drying cloth | Basin/jug explicit in Ch7; cloth form and placement inferred. Prefer cupboard/work surface space to more objects on the small table. |
| Kitchen | A few crockery pieces on a shallow shelf or in the cupboard | Existing cup/plate/jug have textual support. Extra bowl count, shelf and display are inferred. Lower priority than recognizable existing objects. |
| Yard | Bucket and brush stored against a boundary; a restrained stack of kindling by the house | Bucket/brush and the use of kindling are explicit at particular moments. These permanent storage arrangements are inferred. Preserve the path to the gate and privy. |
| Yard | Optional short washing line, empty or with one cloth | Entirely inferred. Lowest priority; should not make this tiny yard feel picturesque or clutter its walking route. |

## Illustration direction

The problem is not just sparse rooms. Several objects use construction primitives as their final silhouettes. The software path also disables the generic rounded-box geometry, which makes cloth, footwear and small possessions particularly rigid. Texture alone cannot make those shapes read as drawings.

1. **Recognizable forms first:** rounded shoe toes and insteps, hollow boot cuffs, curved jug bodies with spouts, real garment silhouettes, bowed upholstery, and pillows with softened seams. Use economical custom geometry in both renderers instead of relying on the rounded-box shortcut.
2. **Draw the important contours:** a darker silhouette, finer construction seams, broken crease lines and selective hatching. Reserve deep black for small recesses such as a boot opening, range interior or gap beneath a seat.
3. **Keep light areas quiet:** paper highlights with a restrained gray wash, not dense repeated hatching across every face or large opaque dark blocks.
4. **Give textiles weight:** hanging coat sleeves, a shirt over the chair, compressed cushions, folded blanket edges and a rug that lies on the floor. Avoid cloth intersecting its support.
5. **Review from visitor viewpoints:** each object should be identifiable at room distance and coherent in close-up. Existing routes, doors and wall contact take priority over fitting more furniture in.

First furnishing batch: Gideon's washstand/mirror, hall coat rail, parlor settee and improved hearthrug, Gideon's dresser, kitchen basin. Then the drawer contents and smaller domestic details.

## Implemented during this review

Remodeled Callum's boots with continuous shaped uppers, rounded toes, narrow ankles, open cuffs, thin soles, lacing and drawn seams. Added a pale leather wash in the software renderer so the details remain visible. This is the first object-level improvement, not a claim that the whole tour has reached the desired hand-drawn finish. Geometry and navigation checks pass; the actual software renderer was inspected through a rendered close-up. This is not a Chrome page screenshot.

### Approved furnishing pass and hearth boards

Added the settee, moved and bordered the rug, coat rail/coat and entrance mat, Gideon's washstand/mirror/dresser/chair, kitchen basin and drying cloth, open drawer with Callum's socks/collar/tin soldier, recognizable shirt and library ticket, and yard bucket/brush/kindling. Curved cushions and vessels use shaped geometry in both renderers.

At the user's request, the boards beside the parlor hearth are now exposed, nearly flush with the floor, with the third board distinguished by its end seam. They are the first parlor note and the subject of the entry view. The note explains the lifting board and oilcloth-lined space using Chapters 2 and 12; contents and associated events remain unstaged. The five-board visual grouping and rug position are artistic choices. Inferred furnishing notes are labeled as illustration details, never as manuscript quotations.

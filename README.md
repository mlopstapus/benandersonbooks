# benandersonbooks

Two separate things live in this repo:

| Folder | What | Details |
|---|---|---|
| [`site/`](site/) | The author website for Ben Anderson, starting with *Ash of Verdance*, a clean gaslamp fantasy mystery (November 17, 2026). Plain HTML, no build step. | Vercel deploys it (`vercel.json` sets the output directory to `site`; `.vercelignore` keeps the rest of the repo out of deploys). |
| [`novel-engine/`](novel-engine/) | The AI-assisted fiction-writing system used to make *Ash of Verdance*, packaged as Claude skills so anyone can reuse it. | See [`novel-engine/README.md`](novel-engine/README.md). |

The author site includes an illustrated 3D tour at [`site/tour/`](site/tour/), linked from the Ashcombe map. Serve `site/` over HTTP to preview it: `python3 -m http.server 8765 --directory site`, then open `http://localhost:8765/tour/`. No build step is needed; Three.js and its MIT license are included locally. The tour has street, parlor, kitchen, both bedrooms, and yard views, mouse/touch and keyboard camera controls, eye-level viewpoints, and manuscript detail notes. House research and interpretation decisions are in [`docs/hale-house-research.md`](docs/hale-house-research.md) (contains book spoilers; not deployed).

The tour starts with a zoomed-out cutaway. Ground floor and Upstairs select a level; Step inside switches to eye level. All four rooms occupy one shared house, connected by open doorways, a hall, a full staircase and a landing. Floor rings and the equivalent keyboard-accessible buttons follow routes through this geometry, including when choosing a distant room from the guide. The exact plan is an interpretation of the novel.

If WebGL cannot start, a canvas renderer with a per-pixel depth buffer draws the same geometry without a GPU. Force it with `/tour/?renderer=ink` (the old `renderer=svg` link also selects this replacement). It avoids the former SVG painter-order artifacts. A fatal startup failure displays technical details instead of a substitute map.

Run `node scripts/check-house-tour.mjs` to verify room placement, route reachability, walking-path clearance and depth occlusion. This does not substitute for browser gesture/layout verification.

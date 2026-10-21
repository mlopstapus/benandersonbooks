# benandersonbooks

Two separate things live in this repo:

| Folder | What | Details |
|---|---|---|
| [`site/`](site/) | The author website for Ben Anderson, starting with *Ash of Verdance*, a clean gaslamp fantasy mystery (November 17, 2026). Plain HTML, no build step. | Vercel deploys it (`vercel.json` sets the output directory to `site`; `.vercelignore` keeps the rest of the repo out of deploys). |
| [`novel-engine/`](novel-engine/) | The AI-assisted fiction-writing system used to make *Ash of Verdance*, packaged as Claude skills so anyone can reuse it. | See [`novel-engine/README.md`](novel-engine/README.md). |

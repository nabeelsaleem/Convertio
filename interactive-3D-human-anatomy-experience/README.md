# Corpus — Interactive 3D Anatomy Explorer

A fully client-side, dependency-free 3D anatomy explorer built with **Three.js**.
Every specimen (heart, brain, lungs, liver, kidneys, eye, intestine, pancreas,
skin) is generated **procedurally in code** — no external 3D model files, no
build step, no paid assets. Just static files you can drop on GitHub Pages.

## Features

- 9 specimens with hand-tuned procedural geometry
- Orbit / zoom camera (mouse, trackpad, and touch)
- Clickable hotspot markers with an info dossier panel
- Cross-section clipping, exploded view, auto-rotate, and marker toggle
- Physically based materials + environment lighting for an organic, wet look
- Fully responsive layout (desktop, tablet, mobile), including a slide-out
  specimen index on small screens
- A loading watchdog: if a script fails to load or an error is thrown while
  booting the scene, the loading screen surfaces an error instead of
  spinning forever
- Zero build tools — plain ES modules loaded via `<script type="module">`
  and an import map pointing at the Three.js CDN build

## Run locally

Because it uses ES module imports, open it through a local server rather than
a `file://` URL:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then visit the printed local URL.

## Deploy to GitHub Pages

1. Push this folder's contents to a repository (root, or a `/docs` folder).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick your
   branch and the folder (`/` or `/docs`), and save.
4. Your site will be live at `https://<username>.github.io/<repo>/` within a
   couple of minutes.

No build step is required — the files are served as-is.

**Important:** `index.html` loads `js/organData.js`, `js/organGeometry.js`,
and `js/main.js` by relative path. All three files must live directly
inside the `js/` folder alongside each other. If any of them end up in a
different folder (e.g. dropped into a stray subfolder during upload), the
browser will 404 on that script and the page will hang on the loading
screen — see Troubleshooting below.

## Project structure

```
anatomy-explorer/
├── index.html          # layout + import map
├── css/
│   └── style.css        # visual theme ("specimen lab")
└── js/
    ├── organData.js     # facts, descriptions, hotspot copy per specimen
    ├── organGeometry.js # procedural Three.js geometry builders
    └── main.js          # scene, camera, controls, UI wiring
```

## Extending it

- **Add a specimen**: add an entry to `ORGANS` in `js/organData.js` (facts,
  description, hotspots with local-space `position` arrays), then add a
  matching builder function in `js/organGeometry.js` and register it in the
  `BUILDERS` map at the bottom of that file.
- **Swap in real models**: if you'd rather load authored `.glb` models,
  replace the body of `buildSpecimen()` with a `GLTFLoader` call — the rest
  of the app (markers, dossier, toolbar) works the same, since hotspot
  positions are just local-space coordinates.
- **Re-theme**: everything is driven by CSS custom properties at the top of
  `css/style.css`.

## Troubleshooting

**Page hangs on the "CORPUS" loading screen forever.** This almost always
means one of the three `<script type="module">` tags in `index.html`
pointed at a file that isn't actually there — a wrong path, a typo, or a
file that got uploaded into the wrong folder. Open the browser's dev tools
(F12) → Console tab and look for a red 404 or "Failed to load module
script" error; it will name the exact missing file. Confirm that folder
holds all three files, matching the tree above, then hard-refresh
(Ctrl/Cmd+Shift+R).

As of this version, a small watchdog script also catches this case after
~9 seconds and swaps the loading screen for a visible error message instead
of spinning indefinitely, so the failure is easier to notice.

## Credits

Three.js (MIT) loaded from the jsDelivr CDN. Fonts: Fraunces & IBM Plex Mono
& Inter via Google Fonts. All geometry, textures, and copy in this project
are original / procedurally generated.

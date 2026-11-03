# Monster Motion Studio

A complete React + TypeScript Remotion project featuring a ten-second vertical motion graphics demo. Kinetic typography, a rotating gradient orbital sculpture, an animated grid, a progress indicator, and a closing call to action are generated entirely from the current frame. No remote assets, API keys, or paid services are required. The demo is silent.

## Requirements

- Node.js 22 or newer (Node 24 recommended; see `.nvmrc`)
- npm
- Chromium for headless composition checks and exports (the cloud environment provides `/usr/bin/chromium`)

## Develop

```sh
npm ci
npm run dev
```

Select **MonsterMotion** in Remotion Studio. The composition is **1080 × 1920**, **30 fps**, **300 frames / 10 seconds**.

Edit `src/Root.tsx` to change the colors, copy, motion, and composition metadata. `src/index.ts` registers the root. The visual uses system fonts and SVG geometry, so it works without downloading fonts or media.

## Validate

```sh
npm run check
npm run compositions -- --browser-executable=/usr/bin/chromium
```

`check` runs strict TypeScript checking and a production webpack bundle. `compositions` executes the composition in Chromium and reports the actual metadata. The production bundle is generated in `build/` (ignored by Git).

## Export when needed

```sh
npm run render -- --browser-executable=/usr/bin/chromium
```

This writes `out/monster-motion.mp4` using two rendering workers. Exported media and installed dependencies are ignored by Git. On other platforms, omit the browser flag to let Remotion manage its browser.

## Cloud environment

Use the existing checkout at `/workspace/remotion-project`; each cloud task is already isolated and does not need a Git worktree. Run `npm ci` when dependencies change, then restart Studio with `npm run dev -- --port=3000`. Live server processes must be restarted in new tasks.

When the cloud network requires its injected HTTPS proxy, use:

```sh
npm ci --https-proxy="$HTTPS_PROXY" --proxy="$HTTP_PROXY"
```

Keep the platform's CA trust and TLS verification enabled. No proxy or credential values belong in repository files.

# كوفي الأباطرة — EmperorsCafePromo

15 seconds · 1080 × 1920 · 30 fps · 450 frames. Original SVG crown and stylized hookah, frame-driven smoke, particles, parallax, spring price reveal and light transitions. No venue photography or third-party brand assets. Silent by design; works without audio.

## Preview

Run `npm ci`, then `npm run dev`. Open the printed Studio URL and select **EmperorsCafePromo** (or append `/EmperorsCafePromo`). The four scenes are also available independently in Studio. The existing **MonsterMotion** composition and its render command are preserved.

## Validate and export

```sh
npm run check
npm run render:emperors
```

Output: `out/emperors-cafe-promo.mp4` (H.264). On a Linux host with installed Chromium, append `--browser-executable=/usr/bin/chromium` if needed. Otherwise Remotion manages its browser installation.

The MP4 output is ignored by Git; after cloning the repository, render it with the command above. If cloud file downloads are unavailable, copy the out file through your environment's file browser, or clone and render locally. A running cloud Studio's localhost URL requires environment port forwarding to view from another computer.

Local Noto fonts are bundled in public/fonts, together with their copyright and SIL Open Font License. All visual motion is deterministic and seekable. Offer validity is the supplied wording “لمدة أسبوع”; no calendar dates were inferred.

## Windows (PowerShell)

Install Node.js 22 LTS or newer and Git for Windows, then:

```powershell
git clone --branch feat/emperors-cafe-promo https://github.com/MONSTER177/remotion-project.git emperors-cafe
cd emperors-cafe
npm ci
npm run check
npm run render:emperors
Start-Process .\out\emperors-cafe-promo.mp4
```

For editing, run `npm run dev` and open the printed URL on the same Windows computer. Select EmperorsCafePromo. Do not pass the cloud Linux browser path on Windows.

The pre-rendered MP4 is included at `media/emperors-cafe-promo.mp4` on this local branch, prepared for direct download after the branch is pushed.

# YONKO GATE — عرض الأسبوع

Original procedural Remotion advertisement for كوفي الأباطرة.

- Composition: `Yonko1500` (existing `MonsterMotion` preserved)
- Delivery: `media/YONKO_1500_Offer.mp4`
- H.264 / yuv420p, 1080 × 1920, 30 FPS, exactly 300 frames / 10 seconds
- Offer: 1500 Iraqi dinars; November 6–12, 2026 inclusive (Friday–Thursday)
- All typography, particles, smoke haze, lighting, metallic materials and hookah illustration are procedural; no stock footage or official logo implied.
- Arabic: locally bundled Noto Kufi Arabic Bold; license in `public/yonko/FONT-LICENSE.txt`.
- Original synthetic soundtrack, reproducible with `python scripts/yonko-sound.py` from project root. No sampled copyrighted music.

## Reproduce

```sh
npm ci
bash scripts/render-yonko.sh
```

The render script also normalizes color range and AAC padding using FFmpeg, then checks the encoded file with ffprobe. If Chrome is already installed, append `--browser-executable=/usr/bin/chromium` (or its platform-specific path).

## Windows download

Open the MP4 file on this branch in GitHub and click **Download raw file** in the file toolbar. If the browser plays the MP4, press **Ctrl+S** to save it.

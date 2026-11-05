# كوفي الأباطرة | YONKO GATE

Complete café campaign: 150-second film and 15-second promotional edit.
Vertical 1080 × 1920, 30 fps, H.264 / 8-bit 4:2:0 MP4 with stereo AAC at 48 kHz.

## Films

- [150-second cinematic film](media/YONKO_Cafe_Cinematic_150s.mp4)
- [15-second promotional edit](media/YONKO_Cafe_Cinematic_15s.mp4)
- [Technical validation](media/YONKO_Cafe_Technical_Validation.json)
- [Representative frames from the actual MP4 exports](media/YONKO_Cafe_Frame_Review.jpg)

## Approved promotional copy

شاي بـ500 دينار<br/>
ماء بـ500 دينار<br/>
نسكافيه بـ1000 دينار<br/>
مشروبات باردة وعصائر متنوعة<br/>
جلسات مريحة ومبرّدة<br/>
بغداد – الدورة – البعيثة – المثلث الذهبي<br/>
عمارة الأباطرة – فوق أزياء الأمير<br/>
يوميًا من 4 العصر إلى 1 بالليل

No offer dates were introduced in this revised café campaign.

## Art direction and assets

Black, antique metallic gold, champagne, burgundy and amber. Dimensional gold
price typography, engraved gate details, camera parallax, refractive-looking
procedural glass, tea steam, suspended ice, condensation, orbital highlights,
moving light, restrained dust, and diagonal gold transition wipes. Arabic is
rendered as complete RTL text runs by Chromium with local Noto Sans Arabic
fonts. The connected project contained no official YONKO GATE logo or café
photography: the closing mark is a typographic brand reveal. Lounge furniture
is an original illustrative scene, labelled in-frame as a visual interpretation.

All illustrations and animation are authored in React/TypeScript/SVG/CSS.
No generative footage, product photography, stock interiors or paid services
are used. The existing MonsterMotion composition and source are preserved.
The campaign adds a new folder of independently editable scene compositions.

## Original music and sound design

The soundtrack is a newly composed 112 BPM cinematic electronic instrumental.
It evolves through detuned sustained strings, muted low-string pulses, resonant
bells, harmonic bass, sparse brass-like harmonics, percussion, stereo reflections
and a final D-minor/add9 resolution. Impacts, sub drops, metallic resonances,
shimmers and reverse sweeps are synthesised from mathematical oscillators and
seeded noise, synchronised to scene and price reveals.

No third-party music, recordings, melody samples or unlicensed sound effects
are included. The original audiovisual campaign assets created here may be used
commercially. Font licences remain in `public/yonko/fonts/` (Noto / SIL OFL;
DejaVu / Bitstream Vera-derived licence).

## Main timeline

| Time | Scene |
| --- | --- |
| 00:00–00:08 | Immediate tea 500 dinar impact |
| 00:08–00:20 | YONKO GATE brand reveal |
| 00:20–00:36 | Tea hero and price |
| 00:36–00:50 | Water hero and price |
| 00:50–01:08 | Nescafe hero and price |
| 01:08–01:26 | Assorted juices |
| 01:26–01:40 | Cold drinks |
| 01:40–01:54 | Comfortable, cooled seating |
| 01:54–02:06 | Three-price menu |
| 02:06–02:16 | Baghdad destination |
| 02:16–02:30 | Gold brand reveal, full location and opening hours |

The short edit uses tea at 0–3 seconds, water at 3–5, Nescafe at 5–8,
cold drinks at 8–10, and the brand/address/hours at 10–15.

## Reproduce and edit

Existing pinned npm dependencies are reused; no npm packages were added.
The score generator needs Python 3, NumPy, SciPy and FFmpeg. The renderer uses
the installed `/usr/bin/chromium`; change that path in the render script on
other operating systems.

```bash
npm ci
npm run dev
npm run check
python scripts/yonko_score.py
node scripts/yonko-render.mjs review
node scripts/yonko-render.mjs short
node scripts/yonko-render.mjs main
python scripts/yonko-master.py 150 15
python scripts/yonko-verify.py
```

`src/yonko/Campaign.tsx` contains both full timelines and individual scene
registrations. `design.tsx` controls the shared identity. `Products.tsx` contains
the procedural product illustrations. `scripts/yonko_score.py` is the reusable
music and sound design source.

The delivered files receive final audio mastering and exact-duration muxing
after Remotion rendering, including an oversampled lookahead safety limiter.
`scripts/yonko-verify.py` probes both final files,
fully decodes them, checks stream durations and frame counts, and measures
integrated loudness and true peak. It also checks sustained black frames and
audio silence. See the JSON report for measured values.

Sixteen representative frames were extracted from the actual MP4 exports and
visually inspected for Arabic shaping, spelling, clipped text, pricing, address,
opening hours and composition. The attached contact sheet includes twelve
points across the main film (1.8–149.3 seconds) and four from the short edit.
Remotion Studio was also opened and its composition preview verified at frame 60.

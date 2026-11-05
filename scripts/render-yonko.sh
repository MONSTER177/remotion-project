#!/usr/bin/env bash
set -euo pipefail
mkdir -p work media
npm run check
npx remotion render src/index.ts Yonko1500 work/YONKO_render.mp4 --codec=h264 --pixel-format=yuv420p --crf=17 --concurrency=2 "$@"
# Normalize full-range browser imagery and AAC padding for an exact 10s MP4.
ffmpeg -y -v error -i work/YONKO_render.mp4 -vf 'scale=in_range=full:out_range=tv,format=yuv420p' -c:v libx264 -preset slow -crf 17 -color_range tv -c:a aac -b:a 192k -t 10 -movflags +faststart media/YONKO_1500_Offer.mp4
python scripts/verify-yonko.py

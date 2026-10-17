#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/vividscales-ad
npm run typecheck
npx remotion render src/index.ts VividScalesAd \
  out/vividscales-ad/.remotion-master.mp4 \
  --codec=h264 --crf=14 --pixel-format=yuv420p --image-format=png \
  --color-space=bt709 --concurrency=2
# Keep the final MP4 at exactly 30s, without AAC packet-padding overrun.
# Copy the video stream, so the final mux adds no extra picture encoding.
ffmpeg -v error -y -i out/vividscales-ad/.remotion-master.mp4 \
  -i public/audio/vividscales-ad.wav -map 0:v:0 -map 1:a:0 \
  -c:v copy -c:a aac -b:a 256k -t 30 -movflags +faststart \
  out/vividscales-ad/VividScales-Landscaping-30s.mp4

#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/vividscales-opening-v2
npm run typecheck
npx remotion render src/index.ts VividScalesOpeningV2 \
  out/vividscales-opening-v2/.remotion-master.mp4 \
  --codec=h264 --crf=14 --pixel-format=yuv420p --image-format=png \
  --color-space=bt709 --concurrency=2
ffmpeg -v error -y -i out/vividscales-opening-v2/.remotion-master.mp4 \
  -i public/audio/vividscales-opening-v2.wav -map 0:v:0 -map 1:a:0 \
  -c:v copy -c:a aac -b:a 256k -t 5 -movflags +faststart \
  out/vividscales-opening-v2/VividScales-Opening-v2.mp4
# These three stills are extracted from the actual delivered encoded MP4.
ffmpeg -v error -y -i out/vividscales-opening-v2/VividScales-Opening-v2.mp4 \
  -vf "select='eq(n,30)+eq(n,72)+eq(n,132)'" -fps_mode vfr \
  out/vividscales-opening-v2/still-%02d.png

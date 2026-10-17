#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/vividscales-launch
npm run typecheck
# PNG captures preserve typography and smooth gradient edges before H.264 encoding.
npx remotion render src/index.ts VividScalesLaunch \
  out/vividscales-launch/.remotion-master.mp4 \
  --codec=h264 --crf=14 --pixel-format=yuv420p --image-format=png \
  --color-space=bt709 --concurrency=2
# Native AAC encoding of the exact five-second WAV removes packet padding from
# the container duration. Copy the encoded video without another generation.
ffmpeg -v error -y \
  -i out/vividscales-launch/.remotion-master.mp4 \
  -i public/audio/vividscales-launch.wav \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 256k \
  -af volume=0.9 -t 5 -movflags +faststart \
  out/vividscales-launch/VividScales-Launch-1080x1920.mp4

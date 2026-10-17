# VividScales — Connected

A finished, deterministic 2D brand film: **1080 × 1920 / 30 fps / 150 frames / 5.000 seconds**.

## Preview and export

```bash
cd /workspace/vividscales-videos
npm run dev
# Select VividScalesLaunch in Studio.
bash scripts/render-launch.sh
```

Final export: `out/vividscales-launch/VividScales-Launch-1080x1920.mp4`.
The render script typechecks, captures lossless PNG frames, encodes H.264 at CRF 14 / BT.709 / yuv420p, and muxes a 256 kbps AAC soundtrack. It copies the video during final muxing and makes the container exactly five seconds long. Concurrency is limited to two.

## Editable files

- `src/compositions/vividscales-launch/VividScalesLaunch.tsx`: layout, font loading, logo and tagline reveal.
- `src/compositions/vividscales-launch/Interface.tsx`: vector icons, cards, and synchronized signal.
- `src/compositions/vividscales-launch/design.ts`: palette, timeline, resolution, and sampled motion paths.
- `src/Root.tsx`: composition registration. The previous sample is preserved.
- `public/assets/vividscales-logo.png`: transparent logo cutout.
- `public/assets/vividscales/Manrope.ttf`: local variable font; OFL license beside it.
- `public/audio/vividscales-launch.wav`: original, generated sound design.
- `scripts/generate-launch-audio.py`: deterministic audio source (Python standard library).
- `scripts/render-launch.sh`: repeatable final export.

## Choreography

- Frames 0–23: short, staggered card arrivals under the fixed opening title.
- Frame 29: message response; frames 30–43: first signal hop.
- Frame 43: calendar response; frames 44–57: second signal hop.
- Frame 57: task check completes over five frames.
- Frames 63–82: coordinated card convergence and line retraction; card interiors simplify before their panels clear completely.
- Frames 82–98: original logo image revealed with a clean mask.
- Frames 90–102: wordmark reveal. The supplied mark contains no lettering, so one wordmark identifies the brand.
- Frames 99–111: tagline reveal. Frames 111–149 hold the full final layout without movement.

All animation derives from the frame number. There are no timers, CSS keyframes, runtime remote assets, random visual animation, 3D or generated technology imagery.

## Logo provenance and review limits

The requested local logo path was initially empty. A transparent cutout was made from the image supplied in the conversation using the image editing tool. This PNG is placed directly into the composition without geometric redrawing, stretching, color filters or shape morphing. The signal green `#02c065` is sampled at pixel (800,450) of that cutout. Original attachment bytes were unavailable for a pixel-by-pixel comparison; visual comparison was performed. Replacing this PNG with the original transparent artwork is straightforward if it becomes available later.

Sound design uses original synthesized interface clicks, a low air transition and a short final tonal accent. Its levels and encoding were measured; live speaker/headphone audition was unavailable in this environment.

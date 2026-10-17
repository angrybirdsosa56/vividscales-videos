# VividScales Motion Lab

A self-contained Remotion 4.0.536 / React / TypeScript video studio. The sample combines staggered type, orbiting geometric shapes, a scene wipe, and an original melodic pulse soundtrack. No remote fonts or assets are required.

## Commands

```bash
cd /workspace/vividscales-videos
npm ci
npm run dev
```

Select **VividScales** in Studio; Space plays/pauses, and the timeline scrubs. The cloud onboarding UI does not expose a web preview; Studio runs on port 3000 for a browser-enabled workspace or local development.

```bash
npm run typecheck
npm run build
npm run compositions
npm run still
npm run render
# Creates out/vividscales.mp4 (H.264 + AAC)
npm run new:composition -- ProductLaunch
npx remotion render src/index.ts ProductLaunch out/product-launch.mp4 --codec=h264 --concurrency=2
```

New compositions appear automatically in Studio. The generator refuses to overwrite existing compositions.

## Change output settings

Edit `src/config.ts`: `width`, `height`, `fps`, `durationSeconds`. Defaults are **1920×1080, 30 fps, 8 seconds**. Frame counts derive from seconds. The sample's scene change starts at 3.25 seconds, so use at least 5 seconds to show both scenes. For a one-off export:

```bash
npx remotion render src/index.ts VividScales out/custom.mp4 --width=1280 --height=720 --fps=24 --duration=240 --codec=h264 --concurrency=2
```

`--duration` is a frame count (240 frames at 24 fps = 10 seconds). The sample scales its design canvas to fit; redesign layouts when changing aspect ratio. Export settings do not require source changes.

## Project guide

- `src/Root.tsx`: composition registry
- `src/compositions/`: videos and scenes
- `src/components/`: reusable animated text and graphics
- `src/utils/animation.ts`: deterministic easing and spring helpers
- `public/assets/`: artwork and local fonts
- `public/audio/pulse.wav`: original generated soundtrack, free to use in this project
- `AGENTS.md`: animation, typography, audio, and validation instructions for coding agents

Node >=24, npm and a compatible Chromium are required. Dependencies are pinned in package-lock.json. The config discovers this cloud's `/usr/bin/chromium`; on another machine run `npx remotion browser ensure` if needed. npm cache is configured at `/workspace/.npm-cache` for this cloud; override with `npm --cache /path/to/cache ci` elsewhere.

## Official sources

Based on the official blank template and installation docs, read directly from the Remotion repository when the documentation host was blocked:

- https://github.com/remotion-dev/remotion/tree/main/packages/template-blank
- https://www.remotion.dev/docs/brownfield
- https://www.remotion.dev/docs/animating-properties
- https://www.remotion.dev/docs/spring
- https://www.remotion.dev/docs/audio/importing
- https://www.remotion.dev/docs/cli/studio
- https://www.remotion.dev/docs/cli/render

Remotion has its own license conditions; check https://www.remotion.dev/license for your usage.

## 30-second landscaping advertisement

Select **VividScalesAd** in Studio for the new 1080×1920, 30 fps, 900-frame ad. Export it with `bash scripts/render-ad.sh`. Full production notes, capability-verification status and the exact timed narration script are in [docs/vividscales-ad/README.md](docs/vividscales-ad/README.md). The soundtrack contains original music and effects; natural voiceover was unavailable. Scenes 3–6 are proposed demonstrations for review because the depicted product capabilities could not be verified against authoritative offer materials.

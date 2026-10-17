# Creating videos in this project

Use the existing checkout; cloud tasks are already isolated. Do not create worktrees unless requested.

## Workflow
- Node >=24 and npm; use `npm ci` with the committed lockfile. All Remotion packages must stay on the exact same version (currently 4.0.536).
- Run `npm run dev` for Studio, `npm run typecheck`, `npm run build`, then `npm run render`. Outputs belong in ignored `out/`.
- `npm run new:composition -- ProductLaunch` creates a component and registers it in `src/Root.tsx`. Select its ID in Studio or render with `npx remotion render src/index.ts ProductLaunch out/product-launch.mp4 --codec=h264 --concurrency=2`.

## Structure and timing
- `src/config.ts`: resolution, fps, duration in seconds, palette. Default: 1920×1080, 30fps, 8 seconds (240 frames).
- `src/compositions/`: complete videos; `src/components/`: reusable visuals; `src/utils/animation.ts`: clamped easing and spring helpers; `public/assets/`: artwork/fonts; `public/audio/`: audio.
- Drive every animation from `useCurrentFrame()` and `useVideoConfig()`. Convert seconds to frames with fps. Never use CSS animations/transitions, timers, Date.now(), or unseeded randomness to animate a render.
- Use `interpolate` with clamping and `spring` for controlled reveals. Animate typography by words or lines, keeping text readable and inside safe margins. Compose shapes with SVG or deterministic styles. Prefer opacity and transforms over expensive filters.
- Use `<Sequence from={...} durationInFrames={...}>` for scenes. Its children see local frame zero. Overlap scenes for transitions; the sample uses a mint wipe and fading outgoing title. Keep animation timing within the configured duration when shortening videos.
- The sample uses a 1920×1080 design canvas scaled to fit the output. For other aspect ratios, design an intentional layout rather than stretching it.

## Assets and audio
- Use local `staticFile('assets/logo.svg')`, `<Img>`, and loaded local fonts. Avoid runtime network dependencies. Await asynchronous assets using Remotion's supported loading APIs before capture.
- Import `Audio` from `@remotion/media` and use `staticFile('audio/track.wav')`. Use a Sequence to place a cue, `trimBefore`/`trimAfter` for source frame trims, and `volume={(frame) => ...}` for fades. Volume callbacks use local audio frame time; trimming and sequencing change timing context. Check sync by scrubbing and listening.
- The sample's original `pulse.wav` has a pulse every 0.5 seconds; the scene transition lands at 3.5 seconds. It loops and fades at the composition boundaries. Replace or layer it only with owned/licensed assets.

## Validation and delivery
- Typecheck and bundle after edits. Preview the start, scene boundary, and ending at full resolution. In Studio select a composition, press Space to play/pause, scrub the timeline, and listen for clipping or drift.
- Render H.264 MP4; inspect with `ffprobe` for dimensions, fps, duration, video and audio streams. Decode with FFmpeg to detect corrupt frames. Inspect representative stills, not only the first frame.
- This cloud uses `/usr/bin/chromium` through `remotion.config.ts`; outside this machine Remotion uses its managed browser. Do not disable TLS verification to obtain tools.
- Keep render concurrency at 2 in this cloud. Do not commit node_modules, bundles, or rendered outputs.

Official references: https://www.remotion.dev/docs/ | https://www.remotion.dev/docs/brownfield | https://www.remotion.dev/docs/animating-properties | https://www.remotion.dev/docs/spring | https://www.remotion.dev/docs/sequence | https://www.remotion.dev/docs/audio/importing | https://www.remotion.dev/docs/cli/render

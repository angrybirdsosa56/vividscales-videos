# VividScales — Landscaping advertisement

Finished 30-second 2D advertisement. **1080×1920 · 30 fps · 900 frames**. Composition ID: `VividScalesAd`.

## Preview and export

```bash
cd /workspace/vividscales-videos
npm ci
npm run dev
# Select VividScalesAd in Studio.
bash scripts/render-ad.sh
```

Export: `out/vividscales-ad/VividScales-Landscaping-30s.mp4`.

The script captures lossless PNG frames, encodes H.264 at CRF14, uses BT.709 / yuv420p, and copies the video stream when muxing a 256 kbps AAC soundtrack. The video and container are exactly 30 seconds. Chromium is selected by `remotion.config.ts` in this prepared cloud environment. Elsewhere use Remotion's supported browser installation if necessary. The previous `VividScalesLaunch` 5-second composition and its export are preserved.

## Editable source

`src/compositions/vividscales-ad/` contains the complete ad:

- `VividScalesAd.tsx`: seven-scene frame map, local font loading and audio.
- `Scenes.tsx`: hook, problem, solution, conversation, follow-up, benefit and CTA.
- `Primitives.tsx`: notification, message bubble, contact header, tag, workflow row, headline, logo lockup and transition wrapper.
- `Landscape.tsx`: original flat vector lawn and frame-driven push mower.
- `design.ts`: resolution, frame rate, palette and easing.

`src/Root.tsx` registers this ad separately from both existing samples. Local Manrope typography and its OFL license are in `public/assets/vividscales/`. The existing `public/assets/vividscales-logo.png` is used as an image, proportionally and without filters or geometric redrawing. This is the transparent cutout previously prepared from the conversation attachment; original attachment bytes were unavailable for pixel-exact comparison.

## Audio and narration

The delivered video has original music and restrained effects, with no voiceover. Natural commercial voice generation was unavailable. The exact supplied 61-word script and proposed recording windows are in `timed-narration.md` and `timed-narration.json`. S6 starts at 22.70 seconds, intentionally overlapping the end of S5. A recording has not been made, so word-level alignment and vocal delivery cannot be verified.

- `public/audio/vividscales-ad.wav`: original stereo 48kHz soundtrack, exactly 30 s.
- `scripts/generate-ad-audio.py`: deterministic music and SFX generator; supports adding a later narration WAV with 13 dB music ducking.
- No speech is present in the default mix, so music is not unnecessarily ducked.
- Music and sound fade out by 28.4 s, leaving the final 1.6 s quiet.
- Default original mix measured −21.43 LUFS integrated and −9.04 dBTP, without clipping. Speaker/headphone audition was unavailable; numerical and codec checks were performed.

## Claims and illustrative workflow

**S3–S6 are proposed demonstrations for review.** Responding to inquiries, collecting job details and estimate follow-up could not be verified against actual offer materials. No authoritative business materials were present locally, and requests to the official domain were blocked by the environment proxy. See `capability-verification.md`.

All fictional interfaces use Alex, with “Example workflow” visible in S1–S6. No testimonial, performance statistic, revenue amount, sale, payment, guaranteed result, automation claim, team feature, integration or deployment is shown. `vividscales.com` and the free-demo call to action are taken directly from the supplied brief; no booking URL is invented.

## Safe zones and scene map

Essential content stays inside x60–1020 and y250–1520. Main content is at x80–1000; the disclosure sits at y1478–1508. Scene transitions use opaque 14-frame masked wipes after each boundary, with outgoing headings clearing before the new type appears, preventing double-exposed headlines while retaining the specified main scene starts:

| Scene | Frames | Story |
|---|---|---|
| S1 | 0–89 | Alex asks about weekly lawn care while the mower works |
| S2 | 90–209 | Unanswered inquiry and estimate reminder |
| S3 | 210–299 | Notifications consolidate into the branded interface |
| S4 | 300–509 | Four sequential messages collect job details |
| S5 | 510–689 | Estimate follow-up and Alex's next-week question |
| S6 | 690–779 | Lawn work continues with an organized inquiry |
| S7 | 780–899 | One free-demo CTA, logo and official domain |

S4 messages arrive at 10.4, 11.8, 13.2 and 14.6 seconds. The last holds about 2.4 seconds before the next scene. S5's response indicator activates when Alex's message begins at 20.8 seconds. CTA content is fully settled by 27.5 seconds and holds through frame 899.

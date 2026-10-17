# VividScales — revised opening, version 2

This is a **5-second visual direction test only**. The remaining 25 seconds have not been rebuilt.

- Composition: `VividScalesOpeningV2`
- Format: 1080×1920, 30 fps, 150 frames, exactly 5.000 seconds.
- Source: `src/compositions/vividscales-opening-v2/OpeningV2.tsx` and `SideViewLawn.tsx`.
- Export: `bash scripts/render-opening-v2.sh`.
- Preview: `npm run dev`, then select `VividScalesOpeningV2` in Studio.

## Preserved version 1

The original 30-second ad and its source remain unchanged:

- Video: `videos/VividScales-Landscaping-30s.mp4`
- Composition: `VividScalesAd`
- Git commit: `e6b56f675c91b0897320d324367f411526e9edef`
- Git tag: `vividscales-ad-v1`

`version-1-preserved.json` records SHA256 hashes of the original ad source, soundtrack, and export for verification.

## Revised direction and timing

| Time | Frames | Direction |
|---|---|---|
| 0–1.5s | 0–44 | Oversized condensed BUSY / ON A JOB? typography and a large side-view lawn mower in a residential landscaping setting. |
| 1.5–3s | 45–89 | An editorial cut to one large cream notification: Can I get a lawn-care quote? The message is readable on its first frame. |
| 3–5s | 90–149 | The alert expands into a bright conversation canvas. The same inquiry stays on-screen through the push. Keep inquiries moving. and the large green property-address reply reveal, then hold. |

No miniature dashboards, overhead mower, repeated dissolves, 3D, or perspective. All animation is frame-based and deterministic. The fictional interface remains labeled Example workflow. This is an illustrative proposed demonstration, not a verified product recording.

## Three representative stills

The render script extracts the delivered PNGs directly from the final encoded MP4:

1. Frame 30 / 1.00 s — huge hook and landscaping scene.
2. Frame 72 / 2.40 s — dominant customer notification.
3. Frame 132 / 4.40 s — conversation and property-address reply.

## Assets and sound

Typography uses local Anton and Manrope fonts, with OFL license files retained. Landscaping is original SVG geometry designed for this larger framing. Audio is original SFX only: quiet mower texture, incoming alert, controlled push and soft reply accent. No voiceover. Generator: `scripts/generate-opening-v2-audio.py`; soundtrack: `public/audio/vividscales-opening-v2.wav`. Exact 5 s stereo 48 kHz PCM16, peak −12 dBFS, no clipping, final 0.5 s silent. Live speaker audition is unavailable; audio levels and encoding can be checked numerically.

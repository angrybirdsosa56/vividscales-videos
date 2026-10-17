#!/usr/bin/env python3
"""Original, sample-free VividScales advertisement score and interface sound design.

Run: python scripts/generate-ad-audio.py
Optional: --narration /path/to/48k-mono-or-stereo-pcm16.wav
The narration file must be a fully timed 30-second track; only the music is
ducked 13 dB during the script windows. No external samples or synthesizers.
Requires numpy, used only for deterministic signal synthesis.
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
import wave

import numpy as np

RATE = 48_000
DURATION = 30
SAMPLES = RATE * DURATION
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "audio"
RNG = np.random.default_rng(156307)
NARRATION = [
    (0.18, 2.75, "You're mowing. A customer wants a quote."),
    (3.12, 6.78, "But you can't stop every job to answer messages."),
    (7.10, 9.86, "VividScales helps keep those conversations moving."),
    (10.12, 16.55, "Respond to inquiries, collect job details, and keep it all organized."),
    (17.12, 22.55, "And follow up on estimates, so a busy day doesn't mean a forgotten conversation."),
    (22.70, 25.72, "Focus on the work. Stay on top of inquiries."),
    (26.20, 28.35, "Book your free VividScales demo."),
]


def hz(note: float) -> float:
    return 440 * 2 ** ((note - 69) / 12)


def add(target: np.ndarray, start: float, mono: np.ndarray, pan: float = 0.0) -> None:
    """Equal-power pan, preserving sample-accurate placement."""
    offset = int(round(start * RATE))
    if offset < 0:
        mono = mono[-offset:]
        offset = 0
    n = min(len(mono), len(target) - offset)
    if n <= 0:
        return
    gains = np.array([math.cos((pan + 1) * math.pi / 4), math.sin((pan + 1) * math.pi / 4)])
    target[offset:offset + n] += mono[:n, None] * gains


def key(note: int, length: float = 4.0, strength: float = 1.0) -> np.ndarray:
    """Soft tine-like keys: rounded fundamental, brief and very quiet partials."""
    t = np.arange(round(length * RATE)) / RATE
    f = hz(note)
    attack = 1 - np.exp(-t / 0.010)
    voice = np.sin(2 * np.pi * f * t) * np.exp(-t / 1.5)
    voice += .16 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t / .75)
    voice += .045 * np.sin(2 * np.pi * f * 3.003 * t) * np.exp(-t / .28)
    return strength * .023 * attack * voice * np.clip((length - t) / .25, 0, 1)


def soft_pad(notes: list[int], length: float) -> np.ndarray:
    """Quiet, slow chord foundation, with no sawtooth or bright synthetic edges."""
    t = np.arange(round(length * RATE)) / RATE
    env = np.minimum(np.clip(t / .75, 0, 1), np.clip((length - t) / 1.1, 0, 1))
    env = env * env * (3 - 2 * env)
    signal = np.zeros_like(t)
    for i, note in enumerate(notes):
        f = hz(note)
        signal += (np.sin(2 * np.pi * f * t + i * .37)
                   + .12 * np.sin(2 * np.pi * f * 2 * t + .2)) / len(notes)
    return signal * env * .029


def air(length: float, gain: float, seed_offset: float = 0.0) -> np.ndarray:
    """Soft filtered air using interpolated noise, not a harsh broadband sweep."""
    n = round(length * RATE)
    t = np.arange(n) / RATE
    grid = np.linspace(0, length, round(length * 2600) + 1)
    n1 = np.interp(t, grid, RNG.normal(0, .5, len(grid)))
    n2 = np.interp(t, grid[::5], RNG.normal(0, .5, len(grid[::5])))
    return (n1 - n2 * .65) * np.sin(np.pi * t / length) ** 2 * gain


def tap(index: int) -> np.ndarray:
    t = np.arange(round(.16 * RATE)) / RATE
    # A tactile contact click rather than a notification ringtone.
    signal = .040 * np.sin(2 * np.pi * (330 + 12 * index) * t) * np.exp(-t / .020)
    signal += .012 * np.sin(2 * np.pi * 1060 * t) * np.exp(-t / .006)
    noise = RNG.normal(0, 1, len(t))
    signal += .006 * noise * np.exp(-t / .0025)
    return signal * (1 - np.exp(-t / .0007))


def read_narration(path: Path) -> np.ndarray:
    with wave.open(str(path), "rb") as source:
        if source.getframerate() != RATE or source.getsampwidth() != 2 or source.getnchannels() not in (1, 2):
            raise ValueError("Narration must be 48 kHz PCM16 WAV, one or two channels.")
        channels = source.getnchannels()
        raw = np.frombuffer(source.readframes(source.getnframes()), dtype="<i2").astype(np.float64) / 32768
    raw = raw.reshape(-1, channels)
    if channels == 1:
        raw = np.repeat(raw, 2, axis=1)
    if len(raw) > SAMPLES:
        raise ValueError("Timed narration exceeds 30 seconds; edit timing rather than truncate words.")
    track = np.zeros((SAMPLES, 2), dtype=np.float64)
    track[:len(raw)] = raw
    return track


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--narration", type=Path)
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    music = np.zeros((SAMPLES, 2), dtype=np.float64)
    effects = np.zeros_like(music)

    # Restrained Em9 / Cmaj9 / Gmaj9 / D6 language. Chords follow the story,
    # leaving space for the messages rather than filling every beat.
    chords = [
        (0.00, 7.6, [52, 59, 62, 66], [52, 59, 66, 67]),
        (7.00, 4.0, [48, 55, 59, 62], [48, 55, 62, 64]),
        (10.0, 7.7, [43, 54, 59, 62], [55, 59, 62, 66]),
        (17.0, 6.7, [50, 57, 59, 66], [50, 57, 64, 66]),
        (23.0, 3.8, [48, 55, 59, 64], [48, 55, 62, 64]),
        (26.0, 2.4, [43, 55, 59, 62], [55, 59, 62, 67]),
    ]
    for at, length, pad_notes, keys in chords:
        pad = soft_pad(pad_notes, length)
        add(music, at, pad, -.15)
        add(music, at + .023, pad * .45, .65)
        for j, note in enumerate(keys):
            add(music, at + .06 + j * .075, key(note, min(4.3, length + .5)), (j - 1.5) * .2)
        # An understated answer halfway through longer scenes, no lead melody.
        if length > 5:
            for j, note in enumerate(keys[1:]):
                add(music, at + 3.5 + .10 * j, key(note, 3.2, .65), .15 - j * .2)

    # Sparse low pulse and brushed texture, to make movement feel deliberate.
    for i, at in enumerate(np.arange(.6, 25.8, 1.2)):
        t = np.arange(round(.24 * RATE)) / RATE
        pulse = .009 * np.sin(2 * np.pi * 92 * t) * np.exp(-t / .052) * (1 - np.exp(-t / .003))
        add(music, float(at), pulse, 0)
        if i % 2 == 1:
            add(music, float(at + .6), air(.105, .007), (-1 if i % 4 == 1 else 1) * .30)

    # Short, quiet room reflections, never a cavernous reverb tail.
    dry = music.copy()
    for delay, gain in [(.073, .075), (.113, .055), (.181, .035), (.249, .02)]:
        n = round(delay * RATE)
        music[n:, 0] += dry[:-n, 1] * gain
        music[n:, 1] += dry[:-n, 0] * gain

    for i, at in enumerate([.4, 4.8, 10.4, 11.8, 13.2, 14.6, 17.7, 20.8]):
        add(effects, at, tap(i), (-.18, .18)[i % 2])
    for i, at in enumerate([7, 10, 17, 23, 26]):
        add(effects, at - .22, air(.48, .018 if at != 26 else .024), -.08)

    # One clean resolving accent lands on the CTA, then gives way to silence.
    for i, note in enumerate([67, 71, 74]):
        add(effects, 26.9 + i * .012, key(note, 1.35, .52), (i - 1) * .15)

    time = np.arange(SAMPLES) / RATE
    fade = np.clip(time / .08, 0, 1) * np.clip((28.4 - time) / 1.15, 0, 1)
    music *= fade[:, None]
    effects *= np.clip((28.4 - time) / .18, 0, 1)[:, None]

    # A restrained but audible non-voice presentation, with ample mix headroom.
    # The source synthesis is intentionally quiet; apply one transparent gain.
    music *= 5.25
    effects *= 5.25

    if args.narration:
        duck = np.ones(SAMPLES)
        gain = 10 ** (-13 / 20)
        for start, end, _ in NARRATION:
            attack = np.clip((time - (start - .12)) / .12, 0, 1)
            release = np.clip((end + .28 - time) / .28, 0, 1)
            shape = np.minimum(attack, release)
            duck = np.minimum(duck, 1 - shape * (1 - gain))
        music *= duck[:, None]
        narration = read_narration(args.narration)
        voice_peak = np.max(np.abs(narration))
        if voice_peak > 0:
            narration *= min(1.0, 10 ** (-5 / 20) / voice_peak)
        mix = music + effects + narration
    else:
        mix = music + effects

    # Conservative headroom; only reduce, never squash or indiscriminately boost.
    raw_peak = float(np.max(np.abs(mix)))
    if raw_peak > 10 ** (-3 / 20):
        mix *= 10 ** (-3 / 20) / raw_peak
    pcm = np.rint(np.clip(mix, -.9999, .9999) * 32767).astype("<i2")
    output = OUT / "vividscales-ad.wav"
    with wave.open(str(output), "wb") as wavefile:
        wavefile.setnchannels(2)
        wavefile.setsampwidth(2)
        wavefile.setframerate(RATE)
        wavefile.writeframes(pcm.tobytes())

    metadata = {
        "title": "VividScales — landscaping advertisement",
        "audio": str(output.relative_to(ROOT)),
        "durationSeconds": DURATION,
        "sampleRate": RATE,
        "channels": 2,
        "narrationIncluded": bool(args.narration),
        "narrationStatus": "No natural voice-generation tool was available. Exact timed narration script is supplied for recording.",
        "mixNotes": "Original synthesized music and interface cues, no third-party samples. Music ducks 13 dB only when timed narration is supplied. Music and effects are silent from 28.4 s through the last frame.",
        "narrationWordCount": sum(len(text.split()) for _, _, text in NARRATION),
        "narration": [{"scene": i + 1, "startSeconds": start, "endSeconds": end,
                       "startFrame": round(start * 30), "endFrame": round(end * 30), "text": text}
                      for i, (start, end, text) in enumerate(NARRATION)],
        "sfxSeconds": [.4, 4.8, 10.4, 11.8, 13.2, 14.6, 17.7, 20.8, 26.9],
        "transitionSeconds": [7, 10, 17, 23, 26],
        "peakDbfs": round(20 * math.log10(max(float(np.max(np.abs(mix))), 1e-12)), 2),
        "rmsDbfs": round(20 * math.log10(max(float(np.sqrt(np.mean(mix ** 2))), 1e-12)), 2),
        "reproduce": "python scripts/generate-ad-audio.py",
        "withVoice": "python scripts/generate-ad-audio.py --narration /path/to/timed-30s-pcm16-48k.wav",
    }
    (OUT / "vividscales-ad-narration-timing.json").write_text(json.dumps(metadata, indent=2) + "\n")
    print(json.dumps({"file": str(output), "duration": DURATION,
                      "peakDbfs": metadata["peakDbfs"], "rmsDbfs": metadata["rmsDbfs"],
                      "narrationIncluded": metadata["narrationIncluded"]}, indent=2))


if __name__ == "__main__":
    main()

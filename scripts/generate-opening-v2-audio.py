#!/usr/bin/env python3
"""Generate the original deterministic 5-second VividScales opening sound design.

No samples, music, speech, or external assets. Requires numpy.
Run from the project: python scripts/generate-opening-v2-audio.py
"""
from pathlib import Path
import json
import math
import wave

import numpy as np


RATE = 48000
SECONDS = 5
RNG = np.random.default_rng(156202610)


def envelope(t, duration, attack, release):
    shape = np.minimum(np.clip(t / attack, 0, 1), np.clip((duration - t) / release, 0, 1))
    return shape * shape * (3 - 2 * shape)


def textured_air(duration, bandwidth=1400):
    t = np.arange(round(duration * RATE)) / RATE
    grid = np.linspace(0, duration, round(duration * bandwidth) + 1)
    return np.interp(t, grid, RNG.normal(0, .45, len(grid)))


def main():
    track = np.zeros((RATE * SECONDS, 2), dtype=np.float64)

    def add(at, signal, pan=0.0):
        offset = round(at * RATE)
        count = min(len(signal), len(track) - offset)
        gains = [math.cos((pan + 1) * math.pi / 4), math.sin((pan + 1) * math.pi / 4)]
        track[offset:offset + count] += signal[:count, None] * gains

    # Suggest the mower with a soft low mechanical texture, never a loud engine.
    duration = 1.23
    t = np.arange(round(duration * RATE)) / RATE
    texture = (.012 * np.sin(2 * np.pi * 71 * t)
               + .005 * np.sin(2 * np.pi * 106.5 * t + .4)
               + .002 * np.sin(2 * np.pi * 142 * t + .2))
    texture *= 1 + .025 * np.sin(2 * np.pi * 4.0 * t)
    texture += textured_air(duration, 500) * .007
    texture *= envelope(t, duration, .12, .36)
    add(.0, texture, -.14)
    add(.018, texture * .22, .8)

    # The incoming message gets one tactile, warmly rounded contact sound.
    duration = .25
    t = np.arange(round(duration * RATE)) / RATE
    incoming = (.18 * np.sin(2 * np.pi * 385 * t) * np.exp(-t / .025)
                + .055 * np.sin(2 * np.pi * 1030 * t) * np.exp(-t / .013)
                + .014 * RNG.normal(0, 1, len(t)) * np.exp(-t / .003))
    incoming *= (1 - np.exp(-t / .0012)) * np.clip((duration - t) / .04, 0, 1)
    add(1.5, incoming, -.08)

    # A very short, controlled air movement connects notification and conversation.
    duration = .25
    t = np.arange(round(duration * RATE)) / RATE
    air = textured_air(duration, 1800)
    lower = textured_air(duration, 380)
    motion = (air - lower * .25) * np.sin(np.pi * t / duration) ** 2 * .027
    add(2.85, motion, -.28)
    add(2.865, motion * .45, .5)

    # A small consonant reply accent: a rounded tone with no ringtone sequence.
    duration = .66
    t = np.arange(round(duration * RATE)) / RATE
    reply = (.085 * np.sin(2 * np.pi * 659.255 * t)
             + .040 * np.sin(2 * np.pi * 987.767 * t + .1)
             + .018 * np.sin(2 * np.pi * 1318.51 * t))
    reply *= (1 - np.exp(-t / .010)) * np.exp(-t / .105)
    reply *= np.clip((duration - t) / .16, 0, 1)
    add(3.3, reply, .11)
    add(3.347, reply * .055, -.3)

    # Finish quietly; all samples after 4.5 s remain exactly zero.
    timeline = np.arange(len(track)) / RATE
    track *= np.clip((4.5 - timeline) / .22, 0, 1)[:, None]
    target_peak = 10 ** (-12 / 20)
    track *= target_peak / max(np.max(np.abs(track)), 1e-9)
    pcm = np.rint(track * 32767).astype("<i2")
    output = Path(__file__).resolve().parents[1] / "public/audio/vividscales-opening-v2.wav"
    output.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(output), "wb") as stream:
        stream.setnchannels(2)
        stream.setsampwidth(2)
        stream.setframerate(RATE)
        stream.writeframes(pcm.tobytes())
    print(json.dumps({
        "file": str(output), "seconds": SECONDS, "sampleRate": RATE, "channels": 2,
        "sampleFrames": len(pcm),
        "peakDbfs": round(20 * math.log10(np.max(np.abs(pcm.astype(float))) / 32768), 3),
        "rmsDbfs": round(20 * math.log10(np.sqrt(np.mean((pcm.astype(float) / 32768) ** 2))), 3),
        "clippedSamples": int((np.abs(pcm.astype(int)) >= 32767).sum()),
        "finalHalfSecondPeak": int(np.max(np.abs(pcm[round(4.5 * RATE):]))),
        "cueSeconds": {"mowerTexture": [0, 1.248], "incomingTap": 1.5,
                       "push": [2.85, 3.115], "reply": 3.3}
    }, indent=2))


if __name__ == "__main__":
    main()

"""Original deterministic interface sound design; stdlib only, no third-party samples."""
from pathlib import Path
import math, random, struct, wave
rate = 48000
rng = random.Random(156)
frames = []
noise = 0.0
for n in range(rate * 5):
    t = n / rate
    left = right = 0.0
    for i, start in enumerate([29/30, 43/30, 57/30]):
        d = t - start
        if 0 <= d < .14:
            envelope = (1-math.exp(-d/.0006))*math.exp(-d/.016)
            click = .042*envelope*(math.sin(2*math.pi*(1120+i*140)*d) + .25*math.sin(2*math.pi*2100*d))
            left += click * (1 if i != 1 else .82)
            right += click * (1 if i == 1 else .82)
    # A low, filtered air transition; no exaggerated swoosh or bass impact.
    noise = .92*noise + .08*rng.uniform(-1, 1)
    if 2.1 < t < 3.12:
        air = noise*.026*math.sin(math.pi*(t-2.1)/1.02)**2
        left += air
        right += air
    d = t - 3.04
    if 0 <= d < 1.65:
        envelope = (1-math.exp(-d/.016))*math.exp(-d/0.34)*min(1,(1.65-d)/.18)
        accent = sum(math.sin(2*math.pi*freq*d) for freq in [261.6256, 523.2511, 659.2551, 783.9909]) / 4
        left += .095*envelope*accent
        right += .095*envelope*accent
    fade = min(1,t/.01,(5-t)/.15)
    frames.append((left*fade, right*fade))
peak = max(abs(v) for pair in frames for v in pair)
scale = (10**(-16/20))/peak
output = Path(__file__).resolve().parents[1]/'public/audio/vividscales-launch.wav'
with wave.open(str(output),'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(rate)
    w.writeframes(b''.join(struct.pack('<hh',round(l*scale*32767),round(r*scale*32767)) for l,r in frames))
print(output)

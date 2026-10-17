import {Easing, interpolate, spring} from 'remotion';
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const reveal = (frame: number, fps: number, delay = 0) => spring({frame: frame - delay, fps, config: {damping: 200, stiffness: 110, mass: 0.8}});
export const tween = (frame: number, from: number, to: number, start = 0, end = 1) => interpolate(frame, [from, to], [start, end], {...clamp, easing: Easing.inOut(Easing.cubic)});

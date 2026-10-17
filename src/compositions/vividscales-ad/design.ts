import {Easing, interpolate} from 'remotion';

export const ad = {width:1080,height:1920,fps:30,durationInFrames:900};
export const C = {bg:'#0a100e',panel:'#142019',stroke:'#304238',white:'#f2efe7',muted:'#9aa89e',faint:'#51675a',green:'#02c065',amber:'#cda866'};
export const p = (f:number,a:number,b:number) => interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const ease = (x:number) => 1-Math.pow(1-x,4);
export const flow = (x:number) => Easing.bezier(.55,0,.25,1)(x);
export const appear = (f:number,at=0,duration=13) => ease(p(f,at,at+duration));

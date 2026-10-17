import {useCurrentFrame, useVideoConfig} from 'remotion';
import {palette} from '../config';
import {reveal} from '../utils/animation';
export const Orbit = () => {
 const frame = useCurrentFrame(); const {fps} = useVideoConfig(); const t = frame / fps;
 return <div style={{position: 'absolute', left: 1260, top: 170, width: 510, height: 510, transform: `scale(${reveal(frame, fps, fps*0.25)}) rotate(${t*9}deg)`}}>
  {[0,1,2].map(i => <div key={i} style={{position: 'absolute', inset: i*54, border: `2px solid ${i===1 ? palette.mint : '#36415b'}`, borderRadius: i===1 ? '28%' : '50%', transform: `rotate(${i*32}deg)`}}/>)}
  <div style={{position: 'absolute', inset: 167, background: palette.mint, borderRadius: 40, transform: `rotate(${-t*25}deg)`}}/>
  <div style={{position: 'absolute', width: 64, height: 64, borderRadius: '50%', background: palette.coral, top: 40, left: 72}}/>
 </div>;
};

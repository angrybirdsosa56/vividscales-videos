import {useCurrentFrame, useVideoConfig} from 'remotion';
import {reveal} from '../utils/animation';
export const AnimatedText = ({text, delay = 0, color = 'inherit'}: {text: string; delay?: number; color?: string}) => {
 const frame = useCurrentFrame(); const {fps} = useVideoConfig();
 return <div style={{display: 'flex', gap: 22, overflow: 'hidden', color}}>{text.split(' ').map((word, i) => {
  const p = reveal(frame, fps, delay + i * fps * 0.09);
  return <span key={i} style={{display: 'inline-block', opacity: p, transform: `translateY(${(1-p)*110}px)`}}>{word}</span>;
 })}</div>;
};

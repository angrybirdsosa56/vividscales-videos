import {AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {AnimatedText} from '../components/AnimatedText';
import {Orbit} from '../components/Orbit';
import {palette} from '../config';
import {tween} from '../utils/animation';

const Opening = () => {
 const f = useCurrentFrame(); const {fps} = useVideoConfig();
 return <AbsoluteFill style={{padding: '90px 110px', opacity: 1-tween(f, fps*3.05, fps*3.55), transform: `translateY(${-tween(f,fps*3.05,fps*3.55)*50}px)`}}>
  <div style={{fontSize: 23, letterSpacing: 7, color: palette.mint}}>VIVIDSCALES / MOTION LAB</div>
  <Orbit/>
  <div style={{marginTop: 150, fontSize: 124, lineHeight: 1.08, fontWeight: 750, letterSpacing: -7}}>
   <AnimatedText text="Ideas, in"/><AnimatedText text="full motion." color={palette.mint} delay={fps*.28}/>
  </div>
  <div style={{marginTop: 44, fontSize: 29, color: palette.muted, opacity: tween(f, fps*.8, fps*1.5)}}>Built with code. Designed to move.</div>
  <div style={{position: 'absolute', bottom: 105, left: 110, display: 'flex', gap: 18}}>{['01 / CONCEPT','02 / RHYTHM','03 / IMPACT'].map((x,i)=><div key={x} style={{fontSize: 18, border: '1px solid #36415b', borderRadius: 30, padding: '16px 24px', opacity: tween(f,fps*(1+i*.15),fps*(1.5+i*.15))}}>{x}</div>)}</div>
 </AbsoluteFill>;
};
const Finale = () => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const p=tween(f,0,fps*.65);
 return <AbsoluteFill style={{background: palette.mint, color: palette.ink, clipPath: `inset(${(1-p)*100}% 0 0 0)`, padding: '90px 110px'}}>
  <div style={{fontSize: 23, letterSpacing: 7}}>VIVIDSCALES / MAKE IT MOVE</div>
  <div style={{marginTop: 145,fontSize: 136,lineHeight: 1.05,letterSpacing:-8,fontWeight:750}}><AnimatedText text="Small details." delay={fps*.35}/><AnimatedText text="Big feeling." delay={fps*.6}/></div>
  <div style={{display:'flex',gap:24,marginTop:65}}>{['Type with purpose','Shape the story','Move with rhythm'].map((x,i)=><div key={x} style={{background:palette.ink,color:palette.paper,borderRadius:22,padding:'28px 34px',fontSize:26,opacity:tween(f,fps*(.8+i*.15),fps*(1.2+i*.15)),transform:`translateY(${(1-tween(f,fps*(.8+i*.15),fps*(1.2+i*.15)))*40}px)`}}>{x}<svg width="23" height="23" viewBox="0 0 24 24" style={{marginLeft:35,verticalAlign:"middle"}}><path d="M5 19 19 5M5 5h14v14" fill="none" stroke={palette.coral} strokeWidth="2"/></svg></div>)}</div>
  <div style={{position:'absolute',bottom:90,right:110,fontSize:22}}>IMAGINE → ANIMATE → CREATE</div>
 </AbsoluteFill>;
};
export const VividScales = () => {
 const f=useCurrentFrame(); const {fps,width,height,durationInFrames}=useVideoConfig();
 return <AbsoluteFill style={{background:palette.ink,color:palette.paper,fontFamily:'Arial, Helvetica, sans-serif',overflow:'hidden'}}>
  <Audio src={staticFile('audio/pulse.wav')} loop volume={(frame)=>0.3*Math.min(1,frame/(fps*.25),Math.max(0,(durationInFrames-frame)/(fps*.6)))}/>
  <div style={{width:1920,height:1080,position:'absolute',left:(width-1920*Math.min(width/1920,height/1080))/2,top:(height-1080*Math.min(width/1920,height/1080))/2,transform:`scale(${Math.min(width/1920,height/1080)})`,transformOrigin:'top left'}}>
   <Opening/><Sequence from={Math.round(fps*3.25)}><Finale/></Sequence>
   <div style={{position:'absolute',bottom:0,left:0,height:7,width:`${100*f/(durationInFrames-1)}%`,background:palette.coral}}/>
  </div>
 </AbsoluteFill>;
};

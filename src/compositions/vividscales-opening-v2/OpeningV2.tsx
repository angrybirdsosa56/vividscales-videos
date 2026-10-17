import {useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,staticFile,useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {SideViewLawn} from './SideViewLawn';

const C={ink:'#0a100e',cream:'#f2efe7',green:'#02c065',muted:'#9aa89e'};
export const openingV2={width:1080,height:1920,fps:30,durationInFrames:150};
const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const phase=(f:number,a:number,b:number)=>clamp((f-a)/(b-a));
const settle=(n:number)=>1-Math.pow(1-n,4);
const mix=(a:number,b:number,p:number)=>a+(b-a)*p;

const MessageIcon=({size=77}:{size?:number})=> <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
 <rect width="80" height="80" rx="23" fill={C.green}/>
 <path d="M22 22h36a5 5 0 0 1 5 5v23a5 5 0 0 1-5 5H40L25 64v-9h-3a5 5 0 0 1-5-5V27a5 5 0 0 1 5-5Z" fill={C.cream}/>
</svg>;

export const OpeningV2=()=>{
 const f=useCurrentFrame();
 const [handle]=useState(()=>delayRender('Loading local opening typography'));
 useEffect(()=>{
  Promise.all([
   new FontFace('Opening Display',`url(${staticFile('assets/opening-v2/Anton-Regular.ttf')})`).load(),
   new FontFace('Opening Sans',`url(${staticFile('assets/vividscales/Manrope.ttf')})`,{weight:'200 800'}).load(),
  ]).then(fonts=>{fonts.forEach(font=>document.fonts.add(font));continueRender(handle);}).catch(cancelRender);
 },[handle]);

 const arrive=settle(phase(f,45,53));
 const push=settle(phase(f,90,102));
 const panelX=mix(60,0,push);
 const panelY=mix(452,0,push);
 const panelW=mix(960,1080,push);
 const panelH=mix(760,1920,push);
 const heading=settle(phase(f,91,99));
 const incoming=push;
 const reply=settle(phase(f,98,105));
 const isThread=f>=90;

 return <AbsoluteFill style={{background:C.ink,color:C.cream,fontFamily:'Opening Sans, sans-serif',overflow:'hidden'}}>
  <Audio src={staticFile('audio/vividscales-opening-v2.wav')}/>

  {f<45&&<>
   <div style={{position:'absolute',left:77,top:271,fontFamily:'Opening Display, sans-serif',lineHeight:1,letterSpacing:0,transform:`translateY(${8*(1-settle(phase(f,0,8)))}px)`}}>
    <div style={{fontSize:263}}>BUSY</div>
    <div style={{fontSize:169,marginTop:12}}>ON A <span style={{color:C.green}}>JOB?</span></div>
   </div>
   <div style={{position:'absolute',left:60,top:862,width:960,height:560}}><SideViewLawn frame={f}/></div>
  </>}

  {f>=45&&<>
   {/* One alert becomes the full conversation canvas: a real 2D framing change,
       with no dashboard, perspective, or recurring opacity transitions. */}
   <div style={{position:'absolute',left:panelX,top:panelY+(f<90?(1-arrive)*12:0),width:panelW,height:panelH,
    borderRadius:mix(46,0,push),background:C.cream,overflow:'hidden',
    transform:f<90?`scale(${1.025-(arrive*.025)})`:undefined,transformOrigin:'50% 50%'}}/>

   {isThread&&<div style={{position:'absolute',inset:0,color:C.ink,
     clipPath:`inset(${Math.max(0,panelY)}px ${Math.max(0,1080-panelX-panelW)}px ${Math.max(0,1920-panelY-panelH)}px ${Math.max(0,panelX)}px)`}}>
    <div style={{position:'absolute',left:80,right:80,top:283,fontSize:104,lineHeight:1.02,fontWeight:800,letterSpacing:-5.2,overflow:'hidden',paddingBottom:20,clipPath:`inset(0 0 ${(1-heading)*100}% 0)`}}>
     <div style={{transform:`translateY(${(1-heading)*34}px)`}}>Keep inquiries<br/>moving.</div>
    </div>

    <div style={{position:'absolute',left:80,top:704,width:854,height:211,padding:'29px 34px',boxSizing:'border-box',background:'#dfe7da',borderRadius:32,borderBottomLeftRadius:9,
     transform:`translateY(${(1-incoming)*17}px)`,clipPath:`inset(0 0 ${(1-incoming)*100}% 0)`}}/>

    <div style={{position:'absolute',left:130,top:987,width:870,height:342,padding:'31px 34px',boxSizing:'border-box',background:C.green,borderRadius:34,borderBottomRightRadius:9,
     fontSize:57,lineHeight:1.18,fontWeight:600,letterSpacing:-1.8,
     transform:`translateY(${(1-reply)*24}px) scale(${.985+.015*reply})`,transformOrigin:'100% 100%',clipPath:`inset(0 0 ${(1-reply)*100}% 0)`}}>Thanks for reaching out!<br/>What’s the property<br/>address?</div>
   </div>}

   {/* The same inquiry remains visible throughout the push. Its position and
       type size settle into the thread instead of disappearing between shots. */}
   <div style={{position:'absolute',left:mix(112,80,push),top:mix(515,623,push),width:mix(856,920,push),display:'flex',alignItems:'center',gap:mix(25,17,push),color:C.ink}}>
    <MessageIcon size={mix(77,52,push)}/><div style={{fontSize:mix(43,33,push),fontWeight:700,letterSpacing:-1}}>Alex</div>
    {push<.5&&<div style={{marginLeft:'auto',fontSize:26,color:'#5d6b61',fontWeight:500}}>now</div>}
   </div>
   <div style={{position:'absolute',left:mix(112,114,push),top:mix(687,733,push),width:mix(856,786,push),color:C.ink,
    fontSize:mix(91,58,push),fontWeight:mix(600,500,push),lineHeight:mix(1.12,1.16,push),letterSpacing:mix(-4.4,-2,push)}}>Can I get a<br/>lawn-care quote?</div>
  </>}

  {f>=45&&<div style={{position:'absolute',left:80,top:1478,fontSize:23,lineHeight:'30px',fontWeight:500,color:f>=96?'#58695e':C.muted}}>Example workflow</div>}
 </AbsoluteFill>;
};

import {useEffect, useState} from 'react';
import {AbsoluteFill, Img, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {colors as c, out, progress, timing} from './design';
import {Interfaces} from './Interface';

const useManrope = () => {
  const [handle] = useState(()=>delayRender('Loading local Manrope typography'));
  useEffect(()=>{
    const font = new FontFace('Launch Manrope',`url(${staticFile('assets/vividscales/Manrope.ttf')})`,{weight:'200 800'});
    font.load().then(loaded=>{document.fonts.add(loaded);continueRender(handle);}).catch(cancelRender);
  },[handle]);
};

export const VividScalesLaunch = () => {
  useManrope();
  const f = useCurrentFrame();
  const clear = out(progress(f,63,79));
  const logo = out(progress(f,timing.logo,98));
  const settle = out(progress(f,83,103));
  const word = out(progress(f,timing.wordmark,102));
  const tag1 = out(progress(f,timing.tagline,109));
  const tag2 = out(progress(f,timing.tagline+3,timing.hold));
  return <AbsoluteFill style={{background:c.background,color:c.white,fontFamily:'Launch Manrope, sans-serif',overflow:'hidden'}}>
    <Audio src={staticFile('audio/vividscales-launch.wav')} volume={0.9}/>
    {/* All artwork is genuinely flat: borders, paths, type, and the supplied raster mark. */}
    <div style={{position:'absolute',left:110,top:257,opacity:1-clear,transform:`translateY(${-clear*24}px)`}}>
      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:34}}>
        <div style={{width:8,height:8,borderRadius:'50%',background:c.green}}/>
        <span style={{fontSize:19,fontWeight:550,letterSpacing:3.3,color:c.muted}}>ONE CONNECTED SYSTEM</span>
      </div>
      <div style={{fontSize:91,fontWeight:600,letterSpacing:-5.3,lineHeight:1.08}}>Your day.<br/><span style={{color:c.white}}>In sync.</span></div>
    </div>
    <Interfaces/>
    <div style={{position:'absolute',left:110,top:1525,display:'flex',alignItems:'center',gap:17,opacity:(1-clear)*0.7}}>
      <div style={{height:1,width:31,background:c.green}}/>
      <div style={{fontSize:20,letterSpacing:0.5,color:c.muted}}>Less friction. More flow.</div>
    </div>
    {/* Original cutout: never stretch, recolor, redraw, or morph this asset. */}
    <div style={{position:'absolute',left:190,top:443,width:700,height:700,opacity:progress(f,82,88),clipPath:`inset(${(1-logo)*100}% 0 0 0)`,transform:`translateY(${(1-logo)*16}px) scale(${1.035-settle*0.035})`,transformOrigin:'50% 65%'}}>
      <Img src={staticFile('assets/vividscales-logo.png')} style={{width:700,height:700,objectFit:'contain'}}/>
    </div>
    <div style={{position:'absolute',left:90,right:90,top:1091,textAlign:'center',overflow:'hidden'}}>
      {/* The supplied asset is a symbol only, so one wordmark identifies the brand. */}
      <div style={{fontSize:66,fontWeight:650,letterSpacing:-3.1,lineHeight:1.25,opacity:word,transform:`translateY(${(1-word)*65}px)`}}>VividScales</div>
    </div>
    <div style={{position:'absolute',left:100,right:100,top:1240,textAlign:'center',fontSize:48,fontWeight:450,letterSpacing:-1.5,lineHeight:1.38}}>
      <div style={{overflow:'hidden'}}><div style={{opacity:tag1,transform:`translateY(${(1-tag1)*48}px)`}}>Less busywork.</div></div>
      <div style={{overflow:'hidden'}}><div style={{color:c.white,opacity:tag2,transform:`translateY(${(1-tag2)*48}px)`}}>More business.</div></div>
    </div>
  </AbsoluteFill>;
};

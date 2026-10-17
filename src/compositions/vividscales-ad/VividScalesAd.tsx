import {useEffect,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,staticFile,useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import {C} from './design';
import {SceneLayer} from './Primitives';
import {Benefit,CallToAction,FollowUp,Hook,Mechanism,Problem,Solution} from './Scenes';

export const VividScalesAd = () => {
 const f=useCurrentFrame();
 const [handle]=useState(()=>delayRender('Loading local Manrope font'));
 useEffect(()=>{
  new FontFace('Vivid Ad Manrope',`url(${staticFile('assets/vividscales/Manrope.ttf')})`,{weight:'200 800'}).load().then(font=>{document.fonts.add(font);continueRender(handle);}).catch(cancelRender);
 },[handle]);
 return <AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:'Vivid Ad Manrope, sans-serif',overflow:'hidden'}}>
  <Audio src={staticFile('audio/vividscales-ad.wav')}/>
  <SceneLayer frame={f} start={0} duration={90}><Hook f={f}/></SceneLayer>
  <SceneLayer frame={f} start={90} duration={120}><Problem f={f-90}/></SceneLayer>
  <SceneLayer frame={f} start={210} duration={90}><Solution f={f-210}/></SceneLayer>
  <SceneLayer frame={f} start={300} duration={210}><Mechanism f={f-300}/></SceneLayer>
  <SceneLayer frame={f} start={510} duration={180}><FollowUp f={f-510}/></SceneLayer>
  <SceneLayer frame={f} start={690} duration={90}><Benefit f={f-690}/></SceneLayer>
  <SceneLayer frame={f} start={780} duration={120}><CallToAction f={f-780}/></SceneLayer>
 </AbsoluteFill>;
};

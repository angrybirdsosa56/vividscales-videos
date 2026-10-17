import type {CSSProperties,ReactNode} from 'react';
import {Img,staticFile} from 'remotion';
import {C,appear,flow,p} from './design';

export const Icon = ({kind,size=32,color=C.green}:{kind:'message'|'clock'|'check'|'arrow'|'leaf'|'details';size?:number;color?:string}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
 {kind==='message'&&<path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-6 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM7 9h10M7 13h6"/>}
 {kind==='clock'&&<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}
 {kind==='check'&&<path d="m5 12 4.5 4.5L19 7"/>}
 {kind==='arrow'&&<path d="M4 12h16m-6-6 6 6-6 6"/>}
 {kind==='leaf'&&<><path d="M20 4C9 1 2 8 5 16s16 4 15-12ZM6 18 16 8"/></>}
 {kind==='details'&&<><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h4"/></>}
</svg>;

export const Kicker = ({children}:{children:ReactNode}) => <div style={{position:'absolute',left:80,top:265,fontSize:22,fontWeight:600,letterSpacing:2.8,color:C.muted,display:'flex',alignItems:'center',gap:15,opacity:'var(--ad-heading-opacity, 1)'}}><span style={{width:8,height:8,borderRadius:9,background:C.green}}/>{children}</div>;
export const Headline = ({children,frame=100,at=0,size=78,top=338,style}:{children:ReactNode;frame?:number;at?:number;size?:number;top?:number;style?:CSSProperties}) => {
 const a=appear(frame,at,13);
 return <div style={{position:'absolute',left:80,right:80,top,opacity:'var(--ad-heading-opacity, 1)'}}><div style={{fontSize:size,fontWeight:600,letterSpacing:-3.7,lineHeight:1.12,opacity:a,transform:`translateY(${(1-a)*21}px)`,...style}}>{children}</div></div>;
};
export const LabelTag = ({children,amber=false}:{children:ReactNode;amber?:boolean}) => <span style={{display:'inline-flex',alignItems:'center',gap:9,padding:'10px 15px',borderRadius:10,background:amber?'#382e1a':'#173d29',color:amber?C.amber:C.green,fontSize:22,fontWeight:550,whiteSpace:'nowrap'}}>{children}</span>;
export const Disclosure = () => <div style={{position:'absolute',left:80,top:1478,fontSize:23,lineHeight:'30px',color:C.muted,letterSpacing:.2}}>Example workflow</div>;

export const ContactHeader = ({sub='Lawn care inquiry',business=false}:{sub?:string;business?:boolean}) => <div style={{height:112,display:'flex',alignItems:'center',gap:20,padding:'0 28px',borderBottom:`1px solid ${C.stroke}`}}>
 <div style={{width:62,height:62,borderRadius:'50%',background:'#244b33',color:C.white,fontSize:28,fontWeight:550,display:'flex',alignItems:'center',justifyContent:'center'}}>A</div>
 <div><div style={{fontSize:33,lineHeight:1.25,fontWeight:600}}>Alex</div><div style={{fontSize:23,color:C.muted,marginTop:2}}>{sub}</div></div>
 {business&&<div style={{marginLeft:'auto',display:'flex',gap:9,alignItems:'center',fontSize:20,color:C.green}}><Icon kind="leaf" size={25}/>Inquiry</div>}
</div>;

export const Notification = ({frame,at=0,waiting=false,style}:{frame:number;at?:number;waiting?:boolean;style?:CSSProperties}) => {
 const a=appear(frame,at,16);
 return <div style={{position:'absolute',left:80,top:720,width:920,minHeight:265,background:C.panel,border:`1.5px solid ${C.stroke}`,borderRadius:29,opacity:a,transform:`translateY(${(1-a)*25}px)`,overflow:'hidden',...style}}>
  <div style={{padding:'26px 30px 0',display:'flex',alignItems:'center',gap:17}}><div style={{width:52,height:52,borderRadius:17,background:'#244b33',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:600}}>A</div><div style={{fontSize:30,fontWeight:600}}>Alex</div><div style={{marginLeft:'auto',fontSize:21,color:C.muted}}>NEW INQUIRY</div></div>
  <div style={{padding:'20px 30px 29px',fontSize:35,lineHeight:1.33,fontWeight:450,letterSpacing:-.6}}>Hi! Can I get a quote for weekly lawn care?</div>
  {waiting&&<div style={{padding:'0 30px 25px'}}><LabelTag amber><Icon kind="clock" color={C.amber} size={23}/>Unanswered · 3 hrs</LabelTag></div>}
 </div>;
};

export const MessageBubble = ({children,frame,at,outgoing=false,top,width=740,height=126,fontSize=33}:{children:ReactNode;frame:number;at:number;outgoing?:boolean;top:number;width?:number;height?:number;fontSize?:number}) => {
 const a=appear(frame,at,13);
 return <div style={{position:'absolute',top,left:outgoing?undefined:28,right:outgoing?28:undefined,width,height,padding:'20px 25px',boxSizing:'border-box',background:outgoing?'#11643c':'#25342b',color:C.white,borderRadius:25,borderBottomLeftRadius:outgoing?25:8,borderBottomRightRadius:outgoing?8:25,fontSize,lineHeight:1.29,letterSpacing:-.5,opacity:a,transform:`translateY(${(1-a)*18}px)`}}>{children}</div>;
};

export const WorkflowRow = ({frame}:{frame:number}) => <div style={{position:'absolute',left:27,right:27,top:389,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
 {['Estimate sent','Follow-up','Customer reply'].map((label,i)=><div key={label} style={{display:'flex',alignItems:'center',gap:12}}>
  {i>0&&<Icon kind="arrow" size={23} color={C.faint}/>}
  <div style={{padding:'17px 14px',border:`1px solid ${frame>=[10,21,114][i]?C.green:C.stroke}`,background:frame>=[10,21,114][i]?'#143524':'transparent',borderRadius:14,fontSize:22,fontWeight:500,color:frame>=[10,21,114][i]?C.white:C.muted,opacity:appear(frame,i*12,14)}}>{label}</div>
 </div>)}
</div>;

export const LogoLockup = ({frame,at=0,top=300,size=390,wordmark=true}:{frame:number;at?:number;top?:number;size?:number;wordmark?:boolean}) => {
 const a=appear(frame,at,17);
 return <div style={{position:'absolute',left:0,right:0,top,textAlign:'center',opacity:a,transform:`translateY(${(1-a)*12}px)`}}>
  <Img src={staticFile('assets/vividscales-logo.png')} style={{width:size,height:size,objectFit:'contain'}}/>
  {wordmark&&<div style={{fontSize:57,fontWeight:650,letterSpacing:-2.4,lineHeight:1.25,marginTop:-28}}>VividScales</div>}
 </div>;
};

export const RevealLine = ({children,frame,at=0}:{children:ReactNode;frame:number;at?:number}) => {
 const a=appear(frame,at,15);
 return <div style={{overflow:'hidden'}}><div style={{opacity:a,transform:`translateY(${(1-a)*65}px)`}}>{children}</div></div>;
};

export const SceneLayer = ({frame,start,duration,children}:{frame:number;start:number;duration:number;children:ReactNode}) => {
 if(frame<start||frame>=start+duration+14)return null;
 const local=frame-start;
 const enter=start===0?1:flow(p(local,0,14));
 const headingOpacity=(start===0?1:appear(local,0,13))*(start+duration>=900?1:1-p(local,duration-11,duration));
 // An opaque editorial wipe replaces the previous scene without double-exposed
 // text or translucent interface panels. The last scene never fades away.
 return <div style={{position:'absolute',inset:0,background:C.bg,clipPath:`inset(0 ${(1-enter)*100}% 0 0)`,'--ad-heading-opacity':headingOpacity} as CSSProperties}>{children}</div>;
};

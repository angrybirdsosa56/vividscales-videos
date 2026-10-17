import type {CSSProperties, ReactNode} from 'react';
import {useCurrentFrame} from 'remotion';
import {colors as c, out, progress, routes, smooth, timing} from './design';

const iconStyle = {fill: 'none', stroke: 'currentColor', strokeWidth: 1.65, strokeLinecap: 'round', strokeLinejoin: 'round'} as const;
const Icon = ({kind, color = c.muted}: {kind: 'message' | 'calendar' | 'task'; color?: string}) => <svg width="34" height="34" viewBox="0 0 24 24" style={{color}} {...iconStyle}>
  {kind === 'message' && <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-6 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM7 9h10M7 13h6"/>}
  {kind === 'calendar' && <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18"/></>}
  {kind === 'task' && <><rect x="3" y="3" width="18" height="18" rx="5"/><path d="m7.5 12 3 3 6-6"/></>}
</svg>;

const Card = ({x, y, width, height, index, children}: {x: number; y: number; width: number; height: number; index: number; children: ReactNode}) => {
  const f = useCurrentFrame();
  const enter = out(progress(f, -8 + index*6, 12 + index*6));
  const collapse = smooth(progress(f, timing.convergence + index*2, 87 + index*2));
  const scale = 1 - collapse*0.78;
  const dx = (540 - x - width/2) * collapse;
  const dy = (920 - y - height/2) * collapse;
  return <div style={{position:'absolute',left:x,top:y,width,height,
    transform:`translate(${dx}px, ${dy+(1-enter)*26}px) scale(${scale})`,
    transformOrigin:'50% 50%',opacity:enter*(1-progress(f,74+index,82)),
    background:c.surface,border:`1.5px solid ${c.stroke}`,borderRadius:26,
    boxShadow:'0 18px 45px #00000022',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,opacity:1-progress(f,70+index,78+index)}}>{children}</div>
    </div>;
};
const Label = ({kind, text, number, active}: {kind: 'message' | 'calendar' | 'task'; text: string; number: string; active: number}) => <div style={{position:'absolute',left:28,right:28,top:25,display:'flex',alignItems:'center',gap:17}}>
  <Icon kind={kind} color={active > 0 ? c.green : c.muted}/>
  <span style={{fontSize:20,fontWeight:550,letterSpacing:0.3,color:c.muted}}>{text}</span>
  <span style={{marginLeft:'auto',fontSize:17,color:c.faint,fontWeight:500,fontVariantNumeric:'tabular-nums'}}>{number}</span>
</div>;
const Rule = ({width, style}: {width: number; style?: CSSProperties}) => <div style={{height:5,width,background:'#34473b',borderRadius:3,...style}}/>;

export const Interfaces = () => {
  const f = useCurrentFrame();
  const message = out(progress(f,timing.message,timing.message+6));
  const calendar = out(progress(f,timing.calendar,timing.calendar+6));
  const task = out(progress(f,timing.task,timing.task+5));
  const taskText = out(progress(f,timing.task+1,timing.task+5));
  const retract = smooth(progress(f,64,82));
  const opacity = 1-progress(f,75,83);
  return <>
    <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity,transform:`translate(${540*retract}px,${920*retract}px) scale(${1-retract})`,transformOrigin:'0 0'}}>
      {routes.map((route,i) => {
        const p = progress(f,i===0 ? 30 : 44,i===0 ? 43 : 57);
        const point = route.point(p);
        return <g key={i}>
          <path d={route.d} stroke="#304237" fill="none" strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1-out(progress(f,13+i*4,24+i*4))}/>
          <path d={route.d} stroke={c.green} fill="none" strokeWidth="2.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} opacity={0.8}/>
          {p > 0 && p < 1 && <><circle cx={point[0]} cy={point[1]} r="8" fill={c.background} stroke={c.green} strokeWidth="2"/><circle cx={point[0]} cy={point[1]} r="3.5" fill={c.green}/></>}
        </g>;
      })}
    </svg>
    <Card x={110} y={660} width={420} height={210} index={0}>
      <Label kind="message" text="Messages" number="01" active={message}/>
      <Rule width={192} style={{position:'absolute',left:29,top:91}}/>
      <div style={{position:'absolute',left:29,right:29,top:120,height:58,borderRadius:13,background:'#1d3024',display:'flex',alignItems:'center',padding:'0 19px'}}>
        <div style={{display:'flex',gap:8,opacity:1-message}}>{[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:'50%',background:c.faint}}/>)}</div>
        <div style={{position:'absolute',left:19,opacity:message,transform:`translateY(${(1-message)*9}px)`,fontSize:25,color:c.white,fontWeight:500}}>Message received.</div>
        <div style={{position:'absolute',right:20,width:7,height:7,borderRadius:'50%',background:c.green,opacity:message}}/>
      </div>
      <div style={{position:'absolute',inset:0,border:`1.5px solid ${c.green}`,borderRadius:26,opacity:0.65*(1-progress(f,33,41))*message}}/>
    </Card>
    <Card x={560} y={900} width={410} height={260} index={1}>
      <Label kind="calendar" text="Calendar" number="02" active={calendar}/>
      {[16,17,18].map((day,i)=><div key={day} style={{position:'absolute',left:29+i*117,top:99,width:99,height:90,borderRadius:15,
        background:day===17 ? (calendar>0 ? c.green : '#203027') : 'transparent',
        color:day===17 && calendar>0 ? c.background : c.muted,display:'flex',justifyContent:'center',alignItems:'center',fontWeight:day===17?700:450,fontSize:33,
        transform:day===17?`scale(${1+Math.sin(calendar*Math.PI)*0.04})`:undefined}}>{day}</div>)}
      <div style={{position:'absolute',left:29,right:29,top:210,display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:calendar>0?c.green:c.faint}}/>
        <span style={{fontSize:21,color:c.muted}}>10:30</span>
        <div style={{marginLeft:'auto',fontSize:19,color:c.green,opacity:calendar,transform:`translateX(${(1-calendar)*8}px)`}}>Confirmed</div>
      </div>
    </Card>
    <Card x={110} y={1210} width={450} height={190} index={2}>
      <Label kind="task" text="Follow-up" number="03" active={task}/>
      <div style={{position:'absolute',left:29,top:105,opacity:1-progress(f,timing.task,timing.task+1)}}><Rule width={210}/><Rule width={130} style={{marginTop:16}}/></div>
      <div style={{position:'absolute',left:29,top:101,fontSize:25,fontWeight:500,color:c.white,opacity:taskText,transform:`translateY(${(1-taskText)*8}px)`}}>Done. Automatically.</div>
      <svg width="47" height="47" viewBox="0 0 48 48" style={{position:'absolute',right:29,top:92}}>
        <circle cx="24" cy="24" r="21" stroke={task>0?c.green:c.faint} strokeWidth="1.5" fill={task>0?'#113b24':'none'}/>
        <path d="m14 24 7 7 14-15" stroke={c.green} strokeWidth="2.7" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-task}/>
      </svg>
    </Card>
  </>;
};

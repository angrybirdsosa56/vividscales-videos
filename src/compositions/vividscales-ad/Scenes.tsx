import {Img,staticFile} from 'remotion';
import {C,appear,ease,flow,p} from './design';
import {ContactHeader,Disclosure,Headline,Icon,Kicker,LabelTag,LogoLockup,MessageBubble,Notification,RevealLine,WorkflowRow} from './Primitives';
import {Landscape} from './Landscape';

export const Hook = ({f}:{f:number}) => <>
 <Kicker>LANDSCAPING OWNERS.</Kicker>
 <Headline size={78} style={{opacity:1-p(f,24,30)}}>Working a job?</Headline>
 <Headline frame={f} at={30} size={76}>Your next customer<br/>is waiting.</Headline>
 <Notification frame={f} at={-8} style={{top:700}}/>
 <div style={{position:'absolute',left:80,top:1100,width:920,height:320}}><Landscape frame={f}/></div>
 <Disclosure/>
</>;

export const Problem = ({f}:{f:number}) => <>
 <Kicker>WHEN THE DAY GETS BUSY</Kicker>
 <Headline size={75}>Inquiries. Estimates.<br/>Follow-ups.</Headline>
 <Notification frame={100} waiting style={{top:655}}/>
 <div style={{position:'absolute',left:142,top:1007,width:858,background:'#221f15',border:`1px solid #4b412a`,borderRadius:24,padding:'24px 28px',boxSizing:'border-box',display:'flex',gap:19,alignItems:'center',opacity:appear(f,38,15),transform:`translateY(${(1-appear(f,38,15))*18}px)`}}>
  <Icon kind="clock" size={32} color={C.amber}/><div style={{fontSize:29,lineHeight:1.35,color:C.white}}>Follow up on yesterday&apos;s estimate.</div>
 </div>
 <div style={{position:'absolute',left:80,top:1190,width:920,height:255}}><Landscape frame={f+90} compact/></div>
 <Disclosure/>
</>;

export const Solution = ({f}:{f:number}) => {
 const merge=flow(p(f,0,26));
 return <>
  <Kicker>A LITTLE MORE CONNECTED</Kicker>
  <Headline frame={f} at={5} size={78}>Put follow-up<br/>to work.</Headline>
  <div style={{position:'absolute',left:80,top:685,width:920,height:715,borderRadius:31,background:C.panel,border:`1.5px solid ${C.stroke}`,opacity:appear(f,8,16),overflow:'hidden'}}>
   <div style={{height:154,borderBottom:`1px solid ${C.stroke}`,display:'flex',alignItems:'center',gap:19,padding:'0 30px'}}>
    <Img src={staticFile('assets/vividscales-logo.png')} style={{width:100,height:100,objectFit:'contain'}}/><div style={{fontSize:41,fontWeight:600,letterSpacing:-1.5}}>VividScales</div>
   </div>
   {[['message','Respond to inquiries'],['details','Collect job details'],['check','Keep follow-up in view']].map(([kind,label],i)=>{
    const a=appear(f,19+i*12,14);
    return <div key={label} style={{position:'absolute',left:30,right:30,top:190+i*157,height:124,display:'flex',alignItems:'center',gap:24,padding:'0 25px',boxSizing:'border-box',borderRadius:19,background:'#1c2d22',border:`1px solid ${C.stroke}`,opacity:a,transform:`translateY(${(1-a)*15}px)`}}>
     <div style={{width:56,height:56,borderRadius:16,background:'#124c2b',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon kind={kind as 'message'|'details'|'check'} size={32}/></div><div style={{fontSize:31,fontWeight:500,letterSpacing:-.5}}>{label}</div>
    </div>;
   })}
  </div>
  {[0,1].map(i=><div key={i} style={{position:'absolute',left:80+(1-merge)*(i?150:-50),top:720+i*300-merge*(i?160:-140),width:760,height:150,borderRadius:24,background:i?'#282319':'#203629',border:`1px solid ${i?'#655635':C.green}`,opacity:(1-merge)*.8,transform:`scale(${1-merge*.5})`,display:'flex',alignItems:'center',padding:'0 30px',gap:20,fontSize:28}}><Icon kind={i?'clock':'message'}/>{i?'Estimate follow-up':'Alex · New inquiry'}</div>)}
  <Disclosure/>
 </>;
};

export const Mechanism = ({f}:{f:number}) => {
 const labels=['Respond','Collect details','Organize the inquiry'];
 const active=f<55?0:f<111?1:2;
 return <>
  <Kicker>FROM FIRST MESSAGE TO NEXT STEP</Kicker>
  <Headline size={77}>Keep it moving.</Headline>
  <div style={{position:'absolute',left:80,right:80,top:506,display:'flex',gap:15}}>{labels.map((x,i)=><div key={x} style={{padding:'13px 16px',borderRadius:12,fontSize:24,fontWeight:550,letterSpacing:-.3,background:active===i?'#15452b':'transparent',border:`1px solid ${active===i?C.green:C.stroke}`,color:active===i?C.white:C.muted,opacity:appear(f,i*12,12)}}>{x}</div>)}</div>
  <div style={{position:'absolute',left:80,top:650,width:920,height:790,background:C.panel,border:`1.5px solid ${C.stroke}`,borderRadius:30,overflow:'hidden'}}>
   <ContactHeader business/>
   <MessageBubble frame={f} at={12} top={136} width={760} height={132}>Can I get a quote for weekly lawn care?</MessageBubble>
   <MessageBubble frame={f} at={54} top={285} width={760} height={132} outgoing>Happy to help. What&apos;s the property address?</MessageBubble>
   <MessageBubble frame={f} at={96} top={434} width={365} height={82}>124 Oak Lane.</MessageBubble>
   <MessageBubble frame={f} at={138} top={533} width={700} height={126} outgoing>Thanks! What size is the lawn?</MessageBubble>
   <div style={{position:'absolute',bottom:29,left:29,right:29,height:53,border:`1px solid ${C.stroke}`,borderRadius:26,display:'flex',alignItems:'center',padding:'0 21px',color:C.faint,fontSize:23}}>Conversation with Alex<div style={{marginLeft:'auto'}}><Icon kind="message" size={24} color={C.faint}/></div></div>
  </div>
  <Disclosure/>
 </>;
};

export const FollowUp = ({f}:{f:number}) => <>
 <Kicker>A CONVERSATION WORTH KEEPING</Kicker>
 <Headline size={72}>Keep the<br/>conversation going.</Headline>
 <div style={{position:'absolute',left:80,top:665,width:920,height:775,background:C.panel,border:`1.5px solid ${C.stroke}`,borderRadius:30,overflow:'hidden'}}>
  <ContactHeader sub="Estimate follow-up"/>
  <div style={{position:'absolute',left:29,top:141,fontSize:21,color:C.muted,letterSpacing:1.4}}>ESTIMATE SENT</div>
  <MessageBubble frame={f} at={21} top={192} width={770} height={135} outgoing>Hi Alex, any questions about your estimate?</MessageBubble>
  <WorkflowRow frame={f}/>
  <MessageBubble frame={f} at={114} top={515} width={775} height={137}>Could we discuss starting next week?</MessageBubble>
 </div>
 <Disclosure/>
</>;

export const Benefit = ({f}:{f:number}) => <>
 <Kicker>BACK TO WHAT YOU DO BEST</Kicker>
 <Headline size={77} style={{opacity:1-p(f,33,40)}}>Focus on the job.</Headline>
 <Headline frame={f} at={40} size={77}>Stay on top<br/>of inquiries.</Headline>
 <div style={{position:'absolute',left:80,top:1000,width:920,height:380}}><Landscape frame={f} complete/></div>
 <div style={{position:'absolute',left:520,top:820,width:480,height:350,border:`1.5px solid ${C.stroke}`,borderRadius:27,background:C.panel,overflow:'hidden',opacity:appear(f,8,16),transform:`translateY(${(1-appear(f,8,16))*18}px)`}}>
  <ContactHeader sub="Inquiry organized"/>
  <div style={{padding:'26px 28px',fontSize:30,fontWeight:500,lineHeight:1.35}}>Weekly lawn care<div style={{fontSize:25,color:C.muted,marginTop:9}}>124 Oak Lane</div><div style={{marginTop:24}}><LabelTag><Icon kind="check" size={23}/>Ready for review</LabelTag></div></div>
 </div>
 <Disclosure/>
</>;

export const CallToAction = ({f}:{f:number}) => <>
 <LogoLockup frame={f} at={0} top={277} size={390}/>
 <div style={{position:'absolute',left:80,right:80,top:814,textAlign:'center',fontSize:35,lineHeight:1.3,color:C.muted,fontWeight:450,letterSpacing:-.6,opacity:appear(f,10,12)}}>See it work for your business.</div>
 <div style={{position:'absolute',left:80,right:80,top:968,textAlign:'center',fontSize:86,fontWeight:650,letterSpacing:-4,lineHeight:1.1}}>
  <RevealLine frame={f} at={17}>Book your</RevealLine><RevealLine frame={f} at={21}><span style={{color:C.green}}>free demo.</span></RevealLine>
 </div>
 <div style={{position:'absolute',left:80,right:80,top:1243,textAlign:'center',fontSize:37,fontWeight:500,letterSpacing:-.5,opacity:appear(f,26,14)}}>vividscales.com</div>
 <div style={{position:'absolute',left:465,top:1370,width:150,height:2,background:C.green,transform:`scaleX(${ease(p(f,26,45))})`}}/>
</>;

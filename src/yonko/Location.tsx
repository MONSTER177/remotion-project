import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Arabic,C,English,SceneBase,Wordmark} from './design';
export const Location:React.FC<{final?:boolean;compact?:boolean}>=({final=false,compact=false})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 return <SceneBase tag={final?'YOUR EVENING STARTS HERE':'FIND YOUR GOLDEN MOMENT'}>
  {final?<Wordmark top={compact?225:285} scale={compact?.85:1} delay={.05}/>:<><English top={245}>BAGHDAD / AL DORA</English><Arabic top={330} size={108}>ننتظركم</Arabic></>}
  <svg width="1080" height="580" viewBox="0 0 1080 580" style={{position:'absolute',left:0,top:final?610:590,transform:`perspective(1400px) rotateY(${Math.sin(t*.32)*5}deg)`}}>
   <defs><linearGradient id="pin"><stop stopColor="#5d3a17"/><stop offset=".3" stopColor="#ffeaa4"/><stop offset=".55" stopColor="#bd8d36"/><stop offset=".8" stopColor="#ffe7a0"/><stop offset="1" stopColor="#523315"/></linearGradient></defs>
   {[0,1,2].map(i=><ellipse key={i} cx="540" cy="490" rx={95+i*75+(t*12)%45} ry={20+i*17+(t*3)%10} fill="none" stroke={C.gold} strokeWidth="1" opacity={.5-i*.13}/>)}
   <path d="M540 440C540 440 385 267 385 190A155 155 0 0 1 695 190C695 267 540 440 540 440Z" fill="url(#pin)" stroke="#f6d77a" strokeWidth="2"/><circle cx="540" cy="188" r="64" fill="#14110b" stroke="#ffe3a0" strokeWidth="3"/><circle cx="540" cy="188" r="48" fill="none" stroke="#bd9652" strokeWidth="1"/>
  </svg>
  <div style={{position:'absolute',top:final?1160:1150,left:80,right:80,textAlign:'center'}}>
   <Arabic size={61} color={C.pale} delay={.3}>بغداد – الدورة – البعيثة</Arabic>
   <Arabic size={65} delay={.45}>المثلث الذهبي</Arabic>
   <div style={{height:18}}/>
   <Arabic size={48} delay={.6}>عمارة الأباطرة – فوق أزياء الأمير</Arabic>
   <div style={{height:38}}/>
   <Arabic size={49} color={C.pale} delay={.8}>يوميًا من 4 العصر إلى 1 بالليل</Arabic>
   {final&&<Arabic size={48} delay={1}>المساء يحلى بلمّتكم</Arabic>}
  </div>
 </SceneBase>;
};

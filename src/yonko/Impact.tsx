import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Arabic,C,English,Price,SceneBase,clamp} from './design';
import {Drink} from './Products';

export const Impact:React.FC=()=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig();const t=f/fps;
 const settle=spring({frame:f-6,fps,config:{damping:22,stiffness:80}});
 return <SceneBase tag="YONKO GATE / THE GOLDEN HOUR">
  <div style={{position:'absolute',top:240,left:540,width:2,height:1300,background:'linear-gradient(transparent,#f6d77a,transparent)',transform:`rotate(${(1-settle)*50-14}deg) scaleX(${1+Math.sin(t)*.3})`,opacity:interpolate(f,[0,5,22,65],[0,1,1,0],clamp),boxShadow:'0 0 60px 15px #f6d77a55'}}/>
  <Arabic top={230} size={91} delay={.15}>مزاجك يستاهل</Arabic>
  <Arabic top={365} size={66} color={C.pale} delay={.35}>شاي بـ</Arabic>
  <Price value="500" top={470} size={355} delay={.6}/>
  <Drink kind="tea" x={190} y={850} scale={1.05}/>
  <div style={{position:'absolute',top:1600,left:80,right:80,background:'linear-gradient(transparent,#080808 40%)',paddingTop:60}}><Arabic size={58} delay={1.2}>كوفي الأباطرة</Arabic><English size={26}>YONKO GATE</English></div>
  {Array.from({length:16},(_,i)=>{const progress=Math.max(0,Math.min(1,(t-.5)/1.7));const angle=i*2.399;return <div key={i} style={{position:'absolute',left:540+Math.cos(angle)*progress*950,top:650+Math.sin(angle)*progress*1000,width:8+i%3*6,height:3+i%4*4,background:`linear-gradient(45deg,#785221,${C.pale})`,transform:`rotate(${i*24+progress*140}deg)`,opacity:(1-progress)*.75}}/>;})}
  <div style={{position:'absolute',inset:0,background:'#000',opacity:interpolate(f,[0,7,14],[1,.4,0],clamp)}}/>
 </SceneBase>;
};

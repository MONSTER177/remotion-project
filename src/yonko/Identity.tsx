import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Arabic,C,English,Orbital,SceneBase,Wordmark,clamp} from './design';
export const Identity:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const open=interpolate(f,[0,4*fps],[0,1],clamp);
 return <SceneBase tag="A MOMENT ABOVE THE EVERYDAY">
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',top:0,left:0}}><defs><linearGradient id="gate-metal"><stop stopColor="#3b2b16"/><stop offset=".45" stopColor="#d4af37"/><stop offset=".51" stopColor="#fff0ac"/><stop offset="1" stopColor="#47341d"/></linearGradient></defs>
   {[0,1].map(side=><g key={side} transform={`translate(${side?open*385:-open*385} 0)`} opacity={.8-open*.3}>{Array.from({length:8},(_,i)=><path key={i} d={`M${140+side*405+i*49} 1480V${480+Math.abs(3-i)*38}`} stroke="url(#gate-metal)" strokeWidth="4"/>)}<path d={`M${120+side*405} 1480V620Q${320+side*405} 270 ${520+side*405} 620V1480`} stroke="url(#gate-metal)" strokeWidth="7" fill="none"/></g>)}
   <circle cx="540" cy="820" r={360+Math.sin(t*.3)*12} stroke="#d4af3744" strokeWidth="1" fill="none" strokeDasharray="1 17"/>
  </svg>
  <English top={350} size={25}>WELCOME TO YOUR EVENING</English>
  <Wordmark top={630} delay={.4}/>
  <Arabic top={1135} size={84} delay={1.2}>للمساء عنوان</Arabic>
  <Arabic top={1300} size={51} color={C.pale} delay={2}>شاي، قهوة، ولحظات حلوة</Arabic>
  <Orbital top={1390}/>
 </SceneBase>;
};

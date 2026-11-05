import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Arabic,C,English,SceneBase} from './design';
export const Experience:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 return <SceneBase tag="SETTLE IN / STAY A LITTLE LONGER">
  <Arabic top={270} size={96}>جلستك على راحتك</Arabic>
  <Arabic top={440} size={59} color={C.pale} delay={.8}>جلسات مريحة ومبرّدة</Arabic>
  <svg width="1080" height="1200" viewBox="0 0 1080 1200" style={{position:'absolute',top:580,left:0,transform:`perspective(1600px) rotateY(${Math.sin(t*.24)*3}deg) scale(${1+t*.002})`}}>
   <defs><linearGradient id="seat" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#604b33"/><stop offset=".35" stopColor="#2a2823"/><stop offset=".8" stopColor="#131615"/><stop offset="1" stopColor="#997d4d"/></linearGradient><radialGradient id="table"><stop stopColor="#51412c"/><stop offset=".74" stopColor="#1a1814"/><stop offset=".95" stopColor="#a98a4b"/><stop offset="1" stopColor="#302415"/></radialGradient><radialGradient id="lamp"><stop stopColor="#ffe5a1" stopOpacity=".2"/><stop offset="1" stopColor="#d4af37" stopOpacity="0"/></radialGradient></defs>
   {[190,540,890].map((x,i)=><g key={x}><ellipse cx={x} cy={260+i%2*60} rx="235" ry="340" fill="url(#lamp)"/><path d={`M${x} 0v${175+i%2*60}`} stroke="#bd9c59" strokeWidth="2"/><path d={`M${x-60} ${210+i%2*60}L${x-24} ${160+i%2*60}H${x+24}L${x+60} ${210+i%2*60}Z`} fill="#ae8841"/><ellipse cx={x} cy={210+i%2*60} rx="60" ry="13" fill="#ffe6a3"/></g>)}
   <path d="M0 1030L1080 1030M0 1140L1080 1140M0 1200L400 720M1080 1200L680 720" stroke="#a7894f22" fill="none"/>
   {[0,1].map(i=><g key={i} transform={`translate(${i*575} 0)`}><path d="M90 900V575Q90 495 180 485H300Q390 495 390 575V900Z" fill="url(#seat)" stroke="#9d805040" strokeWidth="2"/><path d="M70 705Q90 650 115 710L125 855H360L365 710Q400 650 416 705L420 893Q245 945 66 893Z" fill="url(#seat)" stroke="#a18c5b50" strokeWidth="2"/><path d="M105 906L88 1020M380 906L401 1020" stroke="#a08755" strokeWidth="8"/><path d="M155 528V814M201 520V823M247 520V826M293 528V817" stroke="#c7ae7520" fill="none" strokeWidth="3"/></g>)}
   <path d="M528 788V1060M550 788V1060M485 1060H592" stroke="#b29455" strokeWidth="10"/>
   <ellipse cx="540" cy="785" rx="270" ry="83" fill="url(#table)" stroke="#ad8f53" strokeWidth="3"/>
   <ellipse cx="540" cy="779" rx="250" ry="67" fill="none" stroke="#c7ae7520"/>
   <ellipse cx="485" cy="770" rx="47" ry="13" fill="#b69b62"/><path d="M460 711L465 761Q485 775 505 761L510 711Z" fill="#a9561c" stroke="#f9dda2" strokeOpacity=".5"/><ellipse cx="485" cy="711" rx="25" ry="6" fill="#c17b38"/>
  </svg>
  <Arabic top={1670} size={48} delay={1.4}>مساحة للمزاج الحلو</Arabic>
  <English top={1780} size={19} style={{letterSpacing:1,opacity:.6}}>تصوّر بصري للأجواء — رسوم إجرائية</English>
 </SceneBase>;
};

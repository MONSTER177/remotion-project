import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Arabic,C,English,Orbital,Price,SceneBase} from './design';
import {Drink} from './Products';
export const Water:React.FC<{compact?:boolean}>=({compact=false})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <SceneBase accent="#719a9f" tag="A CLEAR MOMENT / YONKO GATE">
  <English top={245}>PURE REFRESHMENT</English>
  <Arabic top={300} size={110}>ماء بـ</Arabic>
  <Price value="500" top={compact?475:495} size={compact?310:340} delay={.2}/>
  <Orbital top={1000}/>
  <Drink kind="water" x={190} y={875} scale={.82}/>
  <svg width="1080" height="650" style={{position:'absolute',top:1040,left:0}}>{[0,1,2,3].map(i=><ellipse key={i} cx="540" cy="380" rx={250+((f/fps*37+i*80)%310)} ry={45+((f/fps*7+i*18)%70)} fill="none" stroke="#a7d8d8" opacity={.18-i*.03} strokeWidth="1"/>)}</svg>
  <Arabic top={1710} size={48} color={C.pale} delay={.6}>انتعاش يرافق جلستك</Arabic>
 </SceneBase>;
};

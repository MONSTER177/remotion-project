import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Arabic,C,English,Orbital,Price,SceneBase,clamp,ease} from './design';
import {Drink} from './Products';
export const HotDrinks:React.FC<{coffee?:boolean;compact?:boolean}>=({coffee=false,compact=false})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;
 const move=compact?0:interpolate(f,[5*fps,8*fps],[0,1],{...clamp,easing:ease});
 return <SceneBase accent={coffee?'#ad6f3d':C.gold} tag={coffee?'THE COFFEE MOMENT':'THE ART OF A SIMPLE PLEASURE'}>
  <English top={225} size={24}>{coffee?'RICH · WARM · YOURS':'AMBER IN EVERY MOMENT'}</English>
  <Arabic top={280} size={110} delay={.1}>{coffee?'نسكافيه':'استكانة شاي'}</Arabic>
  {!compact&&<Arabic top={470} size={48} color={C.pale} delay={1.5}>{coffee?'دفء يكمّل جلستك':'لحظة هدوء بطعم الشاي'}</Arabic>}
  <Orbital top={890}/>
  <div style={{position:'absolute',inset:0,transform:`translate(${move*65}px,${-move*155}px) scale(${1-move*.16})`,transformOrigin:'540px 1050px'}}><Drink kind={coffee?'coffee':'tea'} x={190} y={compact?670:580} scale={compact?.9:1.25}/></div>
  <div style={{position:'absolute',top:compact?450:1330-move*70,left:0,right:0}}><Price value={coffee?'1000':'500'} top={0} size={compact?270:260} delay={compact?.3:1}/></div>
  {!compact&&<Arabic top={1725} size={43} color={C.pale} delay={2.2}>كوفي الأباطرة | YONKO GATE</Arabic>}
 </SceneBase>;
};

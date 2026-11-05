import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Arabic,C,English,Orbital,SceneBase,clamp,ease} from './design';
import {Drink} from './Products';
export const Refreshments:React.FC<{cold?:boolean;compact?:boolean}>=({cold=false,compact=false})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps;const reveal=interpolate(f,[0,1.4*fps],[0,1],{...clamp,easing:ease});
 return <SceneBase accent={cold?'#5c8f91':'#c8801a'} tag={cold?'CHILLED / COLOURFUL / REFRESHING':'FRESH COLOUR. GOLDEN MOMENTS.'}>
  <English top={250}>{cold?'THE COOL SIDE OF YOUR EVENING':'A LITTLE COLOUR IN YOUR DAY'}</English>
  <Arabic top={330} size={cold?92:99} delay={.1}>{cold?'مشروبات باردة':'عصائر متنوعة'}</Arabic>
  {!compact&&<Arabic top={490} size={50} color={C.pale} delay={1}>{cold?'انتعاش على ذوقك':'ألوان ونكهات تكمّل المساء'}</Arabic>}
  <Orbital top={1130}/>
  <div style={{position:'absolute',inset:0,transform:`translateX(${-(1-reveal)*380}px)`}}><Drink kind={cold?'lime':'orange'} x={-85} y={compact?720:660} scale={.83} phase={1}/></div>
  <div style={{position:'absolute',inset:0,transform:`translateX(${(1-reveal)*380}px)`}}><Drink kind={cold?'berry':'lime'} x={450} y={compact?720:660} scale={.83} phase={2}/></div>
  <Drink kind={cold?'orange':'berry'} x={190} y={compact?800:795} scale={.94} phase={3}/>
  {!compact&&<><div style={{position:'absolute',top:1500+Math.sin(t*.5)*15,left:65,width:120,height:120,border:'1px solid #d4af3780',borderRadius:'50%',transform:`rotate(${t*8}deg)`}}/><Arabic top={1690} size={52} delay={1.3}>اختار مشروبك المفضّل</Arabic></>}
 </SceneBase>;
};

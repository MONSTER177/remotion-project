import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {Arabic,C,English,Price,SceneBase,clamp} from './design';
export const Menu:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <SceneBase tag="YOUR FAVOURITES / EVERY EVENING">
  <English top={250}>GOOD TASTE. SIMPLE PRICES.</English>
  <Arabic top={320} size={94}>مزاجك، على ذوقك</Arabic>
  <div style={{position:'absolute',top:600,left:110,right:110}}>
   {[{name:'شاي',price:'500',delay:0},{name:'ماء',price:'500',delay:.35},{name:'نسكافيه',price:'1000',delay:.7}].map(({name,price,delay})=><div key={name} style={{height:260,borderBottom:'1px solid #d4af3740',display:'flex',alignItems:'center',justifyContent:'space-between',opacity:interpolate(f,[delay*fps,delay*fps+22],[0,1],clamp),transform:`translateX(${interpolate(f,[delay*fps,delay*fps+30],[80,0],clamp)}px)`}}><div style={{textAlign:'center',width:360}}><span style={{fontFamily:'YonkoSerif',fontSize:price==='1000'?106:124,color:C.pale,textShadow:'2px 4px #664516,4px 7px #35200a'}}>{price}</span><div dir="rtl" style={{fontSize:35,color:'#cab888'}}>دينار</div></div><Arabic size={65}>{name}</Arabic></div>)}
  </div>
  <Arabic top={1490} size={58} color={C.pale} delay={1.3}>مشروبات باردة وعصائر متنوعة</Arabic>
  <Arabic top={1680} size={47} delay={1.8}>كوفي الأباطرة | YONKO GATE</Arabic>
 </SceneBase>;
};

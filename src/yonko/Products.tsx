import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

export type DrinkKind='tea'|'coffee'|'orange'|'berry'|'lime'|'water';
// Original procedural studio products. No source photographs or stock footage.
export const Drink:React.FC<{kind:DrinkKind; x?:number; y?:number; scale?:number; phase?:number}> =({kind,x=190,y=850,scale=1,phase=0})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const t=f/fps+phase;
 const cold=['orange','berry','lime','water'].includes(kind);const isWater=kind==='water';const isCoffee=kind==='coffee';
 const id=`${kind}-${phase}`;const color=kind==='orange'?'#ffad28':kind==='berry'?'#8f173f':kind==='lime'?'#b6ca4d':isWater?'#a2d5dd':isCoffee?'#7d4a22':'#bd5d13';
 const top=isWater?240:385; const btm=865;
 return <div style={{position:'absolute',left:x,top:y,width:700,height:1000,transform:`perspective(1800px) rotateY(${Math.sin(t*.27)*7}deg) rotateZ(${Math.sin(t*.23)*1.5}deg) translateY(${Math.sin(t*.8)*8}px) scale(${scale})`,transformOrigin:'center center'}}>
  <svg width="700" height="1000" viewBox="0 0 700 1000" style={{overflow:'visible'}}>
   <defs>
    <linearGradient id={`${id}-glass`}><stop stopColor="#e2eff0" stopOpacity=".32"/><stop offset=".09" stopColor="#fff" stopOpacity=".08"/><stop offset=".25" stopColor="#fff" stopOpacity=".02"/><stop offset=".7" stopColor="#f9d986" stopOpacity=".06"/><stop offset=".91" stopColor="#fff" stopOpacity=".32"/><stop offset="1" stopColor="#a0d9e0" stopOpacity=".4"/></linearGradient>
    <linearGradient id={`${id}-liquid`}><stop stopColor={color}/><stop offset=".3" stopColor={isWater?'#203c40':color} stopOpacity=".65"/><stop offset=".65" stopColor={color}/><stop offset="1" stopColor={isCoffee?'#301208':isWater?'#8cadb1':'#8a300c'}/></linearGradient>
    <linearGradient id={`${id}-shine`}><stop stopColor="#fff9d8" stopOpacity=".02"/><stop offset=".5" stopColor="#fff9d8" stopOpacity=".7"/><stop offset="1" stopColor="#fff9d8" stopOpacity=".03"/></linearGradient>
    <radialGradient id={`${id}-saucer`}><stop stopColor="#2b2116"/><stop offset=".6" stopColor="#090b0b"/><stop offset=".84" stopColor="#6a522a"/><stop offset=".92" stopColor="#e5c67d"/><stop offset=".94" stopColor="#2a2418"/><stop offset="1" stopColor="#8d764e"/></radialGradient>
    <linearGradient id={`${id}-ice`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffffed" stopOpacity=".65"/><stop offset=".45" stopColor="#d1f8ff" stopOpacity=".15"/><stop offset="1" stopColor="#fff" stopOpacity=".45"/></linearGradient>
    <linearGradient id={`${id}-foam`} x2="0" y2="1"><stop stopColor="#f9dab0"/><stop offset=".5" stopColor="#b98c52"/><stop offset="1" stopColor="#8f602f"/></linearGradient>
   </defs>
   <ellipse cx="350" cy="925" rx="270" ry="36" fill="#000" opacity=".7"/>
   <ellipse cx="350" cy="905" rx={cold?230:290} ry="65" fill={`url(#${id}-saucer)`}/>
   <ellipse cx="350" cy="905" rx="180" ry="28" fill="none" stroke="#e4c77d" strokeOpacity=".23"/>
   {!cold&&<path d="M493 437C665 401 668 722 497 730" fill="none" stroke="#a68a58" strokeWidth="30" opacity=".45"/>}
   {!cold&&<path d="M505 449C635 429 630 695 503 714" fill="none" stroke="#ffedb7" strokeWidth="6" opacity=".5"/>}
   <path d={`M${isWater?270:180} ${top} C${isWater?245:187} ${top+160} ${isWater?235:206} ${btm-50} ${isWater?250:225} ${btm} Q350 905 ${isWater?450:475} ${btm} C${isWater?465:494} ${btm-50} ${isWater?455:513} ${top+160} ${isWater?430:520} ${top}Z`} fill={`url(#${id}-glass)`} stroke="#e7dfc8" strokeOpacity=".55" strokeWidth="3"/>
   <path d={`M${isWater?255:194} ${isWater?350:top+70} L${isWater?258:236} 851 Q350 888 ${isWater?442:464} 851 L${isWater?445:506} ${isWater?350:top+70}Z`} fill={`url(#${id}-liquid)`} opacity={isWater?.55:.96}/>
   <ellipse cx="350" cy={isWater?350:top+70} rx={isWater?95:156} ry={isWater?18:39} fill={isCoffee?`url(#${id}-foam)`:color} stroke="#ffc874" strokeOpacity=".4" strokeWidth="2"/>
   {isCoffee&&Array.from({length:44},(_,i)=><circle key={i} cx={222+(i*73)%255} cy={431+(i*19)%35} r={1+i%4} fill={i%2?'#5b3319':'#f4d3a1'} opacity=".45"/>)}
   {!isWater&&<ellipse cx="350" cy={top} rx="170" ry="43" fill="none" stroke="#f6edcb" strokeWidth="4" opacity=".65"/>}
   <path d={`M${isWater?277:203} ${top+25} Q${isWater?265:211} 680 ${isWater?277:247} 840`} fill="none" stroke={`url(#${id}-shine)`} strokeWidth={isWater?11:16}/>
   <path d={`M${isWater?421:500} ${top+28} Q${isWater?442:483} 680 ${isWater?426:456} 843`} fill="none" stroke="#fff5dc" strokeOpacity=".6" strokeWidth="3"/>
   <path d="M250 854Q350 886 451 854" fill="none" stroke="#fff2c1" strokeWidth="6" opacity=".65"/>
   {isWater&&<><path d="M270 240L290 183V125Q350 104 410 125V183L430 240" fill={`url(#${id}-glass)`} stroke="#cbe3e2" strokeWidth="3" strokeOpacity=".5"/><rect x="286" y="93" width="128" height="58" rx="10" fill="#292923" stroke="#d9bb73" strokeWidth="3"/>{Array.from({length:13},(_,i)=><path key={i} d={`M${293+i*9} 99v42`} stroke="#ac8e50" strokeWidth="2"/>)}<path d="M260 510Q350 535 440 510M257 540Q350 565 444 540M254 570Q350 595 447 570M255 715Q350 740 445 715M256 745Q350 770 445 745" fill="none" stroke="#a4d2d4" strokeWidth="3" opacity=".3"/></>}
   {cold&&!isWater&&[0,1,2,3,4].map(i=><g key={i} transform={`translate(${240+(i*93)%170} ${440+(i*73)%230+Math.sin(t+i)*6}) rotate(${i*31+Math.sin(t*.4)*3})`}><path d="M0 0L63-13 87 43 19 58Z" fill={`url(#${id}-ice)`} stroke="#fff9d6" strokeOpacity=".5" strokeWidth="2"/><path d="M0 0L26 24 87 43M26 24L19 58" fill="none" stroke="#eaffff" strokeOpacity=".4"/></g>)}
   {cold&&Array.from({length:38},(_,i)=><ellipse key={i} cx={isWater?275+(i*41)%145:218+(i*57)%264} cy={top+75+(i*67)%385} rx={1.3+i%3} ry={2+i%5} fill="#d2ffff" opacity={.12+i%4*.07}/>)}
   {!cold&&[0,1,2,3].map(i=><path key={i} d={`M${275+i*50} ${top-25} C${220+i*48+Math.sin(t+i)*32} ${top-130} ${340+i*36} ${top-170} ${270+i*48+Math.sin(t*.8+i)*35} ${top-290}`} fill="none" stroke="#efdab5" strokeWidth={10+i*2} opacity={.055+.025*Math.sin(t+i)} style={{filter:'blur(7px)'}}/>)}
   {(kind==='orange'||kind==='lime')&&<g transform={`translate(180 810) rotate(${-15+Math.sin(t*.4)*6})`}><circle r="97" fill={kind==='orange'?'#e99214':'#46751b'} stroke="#ebc25d" strokeWidth="2"/><circle r="86" fill={kind==='orange'?'#ffe5a1':'#dae39b'}/><circle r="76" fill={kind==='orange'?'#f3a528':'#b8cf57'}/>{Array.from({length:9},(_,i)=><path key={i} d="M0 0L0-76" transform={`rotate(${i*40})`} stroke="#fff0b1" strokeWidth="3"/>)}<circle r="10" fill="#fff1b8"/></g>}
   {kind==='berry'&&[0,1,2].map(i=><g key={i} transform={`translate(${155+i*40} ${861+i%2*19})`}><circle r="35" fill="#70203f" stroke="#b55a68" strokeWidth="2"/><path d="M-9-24L0-37 10-23 21-28 15-13" fill="#395c25"/></g>)}
   <path d={`M${275+Math.sin(t*.23)*25} ${top+40} L${289+Math.sin(t*.23)*25} 831`} stroke="#fff3cf" strokeWidth="2" opacity=".15"/>
  </svg>
 </div>;
};

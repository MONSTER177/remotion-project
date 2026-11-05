import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const C = {black: '#080808', gold: '#D4AF37', pale: '#F6D77A', red: '#650B15', white: '#fff5dc'};
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const FontStyles = () => <style>{`
@font-face{font-family:YonkoArabic;src:url('${staticFile('yonko/fonts/NotoSansArabic-Bold.ttf')}');font-weight:700;font-display:block}
@font-face{font-family:YonkoArabic;src:url('${staticFile('yonko/fonts/NotoSansArabic-Regular.ttf')}');font-weight:400;font-display:block}
@font-face{font-family:YonkoSerif;src:url('${staticFile('yonko/fonts/DejaVuSerif.ttf')}');font-display:block}
*{box-sizing:border-box} `}</style>;

export const Arabic: React.FC<{children: React.ReactNode; size?: number; top?: number; color?: string; delay?: number; style?: React.CSSProperties}> = ({children, size = 84, top, color = C.white, delay = 0, style}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const a = spring({frame: frame - delay * fps, fps, config: {damping: 22, stiffness: 90}});
  return <div dir="rtl" data-typography="arabic" style={{position: top === undefined ? 'relative' : 'absolute', top, left: top === undefined ? undefined : 80, right: top === undefined ? undefined : 80, color, fontFamily: 'YonkoArabic', fontSize: size, fontWeight: 700, textAlign: 'center', lineHeight: 1.65, whiteSpace: 'pre-line', opacity: interpolate(frame, [delay*fps, delay*fps+10], [0,1], clamp), transform: `translateY(${(1-a)*65}px)`, ...style}}>{children}</div>;
};

export const English: React.FC<{children: React.ReactNode; top?: number; size?: number; style?: React.CSSProperties}> = ({children, top, size = 24, style}) => <div style={{position: top === undefined ? 'relative' : 'absolute', top, left: 80, right: 80, textAlign: 'center', fontFamily: 'Arial', letterSpacing: 8, fontSize: size, color: C.pale, ...style}}>{children}</div>;

export const Wordmark: React.FC<{top?: number; scale?: number; delay?: number}> = ({top = 500, scale = 1, delay = 0}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const reveal=interpolate(f,[delay*fps,(delay+1.1)*fps],[0,1],{...clamp,easing:ease});
  return <div style={{position:'absolute',top,left:60,right:60,textAlign:'center', transform:`scale(${scale})`,opacity:interpolate(f,[delay*fps,delay*fps+30],[0,1],clamp)}}>
    <div style={{clipPath:`inset(0 0 0 ${(1-reveal)*100}%)`}}><Arabic size={104} color={C.pale} delay={delay} style={{backgroundImage:'linear-gradient(110deg,#bd8b35,#fff0b8 40%,#d4af37 65%,#fff2bf)',backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>كوفي الأباطرة</Arabic></div>
    <div style={{fontFamily:'YonkoSerif',fontSize:66,letterSpacing:7+(1-reveal)*15,color:C.pale,lineHeight:1.7,textShadow:'0 3px 0 #4a3516,0 10px 25px #000',opacity:reveal}}>YONKO GATE</div>
    <svg width="560" height="40" viewBox="0 0 560 40"><path d="M0 20h240m80 0h240M266 20l14-10 14 10-14 10z" stroke={C.gold} fill="none" strokeWidth="1.5" strokeDasharray="580" strokeDashoffset={(1-reveal)*580}/></svg>
    <div style={{position:'absolute',top:0,left:-80+reveal*1050,width:4,height:250,background:'linear-gradient(transparent,#fff3c0,transparent)',boxShadow:'0 0 24px 8px #f6d77a33',opacity:Math.sin(reveal*Math.PI)}}/>
  </div>;
};

export const Price: React.FC<{value: string; top?: number; label?: string; size?: number; delay?: number}> = ({value,top=500,label='دينار فقط',size=360,delay=0.6}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const p=spring({frame:frame-delay*fps,fps,config:{damping:17,stiffness:95,mass:1.1}});
  const sweep=(frame/fps*22)%180;
  return <div style={{position:'absolute',top,left:70,right:70,textAlign:'center',opacity:interpolate(frame,[delay*fps,delay*fps+8],[0,1],clamp),transform:`perspective(1500px) rotateX(${(1-p)*22}deg) scale(${0.65+p*.35}) translateY(${(1-p)*80}px)`}}>
    <div style={{fontFamily:'YonkoSerif',fontWeight:900,fontSize:size,lineHeight:1.12,letterSpacing:-18,position:'relative',color:'#654119',textShadow:'1px 1px #805525,2px 3px #684318,4px 5px #4f2f0c,6px 8px #352007,8px 11px #261603,0 28px 42px #000'}}>{value}<span style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${110+sweep/12}deg,#6b431c 0%,#f6d77a 22%,#fff6cc 32%,#b98029 45%,#eac65d 58%,#fff4bc 67%,#8f5e25 82%,#e0b65a 100%)`,backgroundSize:'180% 100%',backgroundPosition:`${sweep}% center`,backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',textShadow:'none'}}>{value}</span></div>
    <Arabic size={58} color={C.pale} delay={delay+.2}>{label}</Arabic>
  </div>;
};

export const SceneBase: React.FC<{children:React.ReactNode;accent?:string;tag?:string}> = ({children,accent=C.gold,tag='YONKO GATE / BAGHDAD'}) => {
  const frame=useCurrentFrame(); const {fps,durationInFrames}=useVideoConfig();const t=frame/fps;
  const ending=interpolate(frame,[durationInFrames-17,durationInFrames-1],[0,1],clamp);
  return <AbsoluteFill style={{background:C.black,overflow:'hidden',fontFamily:'YonkoArabic',color:C.white}}>
    <FontStyles/>
    <AbsoluteFill style={{background:`radial-gradient(ellipse at ${50+Math.sin(t/8)*22}% 62%,${accent}22 0%,transparent 62%),radial-gradient(ellipse at 5% 10%,#650b152a,transparent 55%),linear-gradient(110deg,#080808,#18130d 55%,#070706)`}}/>
    <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,opacity:.48}}>
      <defs><linearGradient id="arch-gold"><stop stopColor="#705024"/><stop offset=".5" stopColor="#e3c076"/><stop offset="1" stopColor="#3b2914"/></linearGradient><radialGradient id="aura"><stop stopColor={accent} stopOpacity=".13"/><stop offset="1" stopColor={accent} stopOpacity="0"/></radialGradient></defs>
      <ellipse cx={540+Math.sin(t/7)*100} cy="1000" rx="670" ry="850" fill="url(#aura)"/>
      {[0,1,2].map(i=><path key={i} d={`M${85+i*30} 1810V600C${85+i*30} ${130+i*40} ${995-i*30} ${130+i*40} ${995-i*30} 600V1810`} fill="none" stroke="url(#arch-gold)" strokeWidth={i===0?2:.6} opacity={.6-i*.12} transform={`translate(0 ${Math.sin(t/6)*9})`}/>)}
      {Array.from({length:34},(_,i)=>{const x=(i*137.508+Math.sin(t*.19+i)*45)%1080;const y=(i*227.71-t*(12+i%5*4)+2400)%1920;return <circle key={i} cx={x} cy={y} r={i%6===0?2.5:1.1} fill={i%2?C.pale:'#fff1bc'} opacity={.12+(.5+.5*Math.sin(i+t*.8))*.45}/>;})}
      <path d={`M-100 ${1260+Math.sin(t*.4)*100} Q450 ${700+Math.cos(t*.3)*70} 1190 ${850+Math.sin(t*.3)*70}`} fill="none" stroke={C.gold} strokeWidth=".8" opacity=".35"/>
    </svg>
    <div style={{position:'absolute',left:-340+((t*43)%1750),top:-220,width:180,height:2300,background:'linear-gradient(90deg,transparent,#f6d77a04,transparent)',rotate:'25deg'}}/>
    <English top={105} size={20} style={{letterSpacing:6,opacity:.66}}>{tag}</English>
    {children}
    <div style={{position:'absolute',left:90,right:90,bottom:105,height:1,background:'linear-gradient(90deg,transparent,#b9914855,transparent)'}}/>
    <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(ellipse at 50% 50%,transparent 45%,#0007 100%)'}}/>
    {ending>0&&<div style={{position:'absolute',inset:-600,transform:`translateX(${interpolate(ending,[0,1],[-2200,2200])}px) rotate(-18deg)`,background:'linear-gradient(90deg,transparent 25%,#2c1709 35%,#b68b32 47%,#ffe5a0 50%,#38220d 56%,#650b15 65%,transparent 75%)',opacity:.85}}/>}
  </AbsoluteFill>;
};

export const Orbital:React.FC<{top?:number;size?:number}> =({top=800,size=1000})=>{const f=useCurrentFrame();return <div style={{position:'absolute',top,left:(1080-size)/2,width:size,height:size,transform:`perspective(1400px) rotateX(68deg) rotateZ(${f/20}deg)`,borderRadius:'50%',border:'2px solid #b6924d66',boxShadow:'0 0 0 22px #b6924d08,0 0 0 70px #b6924d08,0 0 60px #d4af3710'}}/>;};

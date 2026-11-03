import React from 'react';
import {AbsoluteFill, Composition, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const ink = '#080c16';
const lime = '#d6ff62';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

type TitleProps = {children: React.ReactNode; delay: number; color?: string};
const Title: React.FC<TitleProps> = ({children, delay, color = '#f4f5ef'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div style={{overflow: 'hidden', paddingBottom: 14}}><div style={{
    color, fontSize: 148, fontWeight: 900, lineHeight: 0.95, letterSpacing: -10,
    translate: `0 ${interpolate(spring({frame: frame - delay * fps, fps, config: {damping: 20, stiffness: 110}}), [0, 1], [180, 0])}px`,
    opacity: interpolate(frame, [delay * fps, (delay + 0.2) * fps], [0, 1], clamp),
  }}>{children}</div></div>;
};

// Every visible movement is derived from the frame for deterministic seeking and rendering.
export const MonsterMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const seconds = frame / fps;
  const outro = interpolate(frame, [6.8 * fps, 7.55 * fps], [0, 1], {...clamp, easing: Easing.bezier(0.65, 0, 0.35, 1)});
  const appear = spring({frame: frame - 1.4 * fps, fps, config: {damping: 18, stiffness: 70}});
  return <AbsoluteFill style={{background: ink, color: '#f4f5ef', fontFamily: 'Arial, Helvetica, sans-serif', overflow: 'hidden'}}>
    <AbsoluteFill style={{backgroundImage: 'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)', backgroundSize: '90px 90px', translate: `0 ${seconds * 9}px`}} />
    <div style={{position: 'absolute', width: 1100, height: 1100, left: -400, top: 500, borderRadius: '50%', background: 'radial-gradient(circle, #536cff30, transparent 68%)'}} />
    <div style={{position: 'absolute', top: 110, left: 84, right: 84, display: 'flex', justifyContent: 'space-between', fontSize: 23, letterSpacing: 4, opacity: interpolate(frame, [0, fps * 0.5], [0, 1], clamp)}}>
      <span><span style={{color: lime}}>●</span> MONSTER / STUDIO</span><span>VOL. 001</span>
    </div>
    <div style={{position: 'absolute', top: 310, left: 84, right: 70, translate: `0 ${-outro * 260}px`, opacity: 1 - outro}}>
      <div style={{fontSize: 25, color: lime, letterSpacing: 6, marginBottom: 40}}>IDEAS INTO IMPACT</div>
      <Title delay={0.35}>MAKE</Title>
      <Title delay={0.65} color={lime}>YOUR</Title>
      <Title delay={0.95}>MOVE.</Title>
      <div style={{fontSize: 29, lineHeight: 1.5, color: '#a6b0c5', marginTop: 12, opacity: interpolate(frame, [1.4 * fps, 2 * fps], [0, 1], clamp)}}>Bold ideas. Precision in motion.</div>
    </div>
    <div style={{position: 'absolute', top: 1220 - outro * 400, left: 540, width: 0, height: 0, scale: appear * 0.76 * (1 - outro * 0.18), rotate: `${seconds * 11}deg`}}>
      <svg width="900" height="900" viewBox="-450 -450 900 900" style={{position: 'absolute', left: -450, top: -450, overflow: 'visible'}}>
        <defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d6ff62"/><stop offset="0.48" stopColor="#81d9b7"/><stop offset="1" stopColor="#7588ff"/></linearGradient></defs>
        <circle r="320" fill="none" stroke="#ffffff20" strokeWidth="1" />
        <circle r="365" fill="none" stroke="#ffffff12" strokeWidth="1" strokeDasharray="3 16" />
        {Array.from({length: 12}, (_, i) => <ellipse key={i} rx="285" ry="112" fill="none" stroke="url(#metal)" strokeWidth="9" transform={`rotate(${i * 15})`} opacity={0.45 + i * 0.04} />)}
        <circle cx="320" r="13" fill={lime}/><path d="M-390 0h55M0-390v55M335 0h55M0 335v55" stroke={lime} strokeWidth="3" />
      </svg>
    </div>
    <div style={{position: 'absolute', top: 1540, left: 84, right: 84, opacity: 1 - outro, translate: `0 ${interpolate(frame, [3 * fps, 4 * fps], [70, 0], clamp)}px`}}>
      <div style={{fontSize: 21, letterSpacing: 4, color: '#a6b0c5', marginBottom: 22}}>BUILT TO STAND OUT</div>
      <div style={{display: 'flex', gap: 14}}>{['DESIGN', 'MOTION', 'IMPACT'].map((label) => <div key={label} style={{border: '1px solid #ffffff35', borderRadius: 40, padding: '18px 25px', fontSize: 23, letterSpacing: 2}}>{label}</div>)}</div>
    </div>
    <div style={{position: 'absolute', top: 1140, left: 60, right: 60, textAlign: 'center', opacity: outro, translate: `0 ${(1 - outro) * 120}px`}}>
      <div style={{fontSize: 24, letterSpacing: 7, color: lime, marginBottom: 34}}>THE NEXT CHAPTER</div>
      <div style={{fontSize: 120, fontWeight: 900, lineHeight: 1, letterSpacing: -7}}>STARTS<br/>WITH YOU.</div>
      <div style={{display: 'inline-block', background: lime, color: ink, borderRadius: 60, fontSize: 27, fontWeight: 700, padding: '24px 42px', marginTop: 50}}>LET’S CREATE ↗</div>
    </div>
    <div style={{position: 'absolute', bottom: 110, left: 84, right: 84}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 20, letterSpacing: 3, color: '#a6b0c5', marginBottom: 25}}><span>CREATIVE ENERGY, UNLIMITED.</span><span>{String(Math.min(10, Math.floor(seconds) + 1)).padStart(2, '0')} / 10</span></div>
      <div style={{height: 3, background: '#ffffff20'}}><div style={{height: '100%', background: lime, width: `${frame / (durationInFrames - 1) * 100}%`}} /></div>
    </div>
  </AbsoluteFill>;
};

export const RemotionRoot: React.FC = () => <Composition id="MonsterMotion" component={MonsterMotion} durationInFrames={300} fps={30} width={1080} height={1920} />;

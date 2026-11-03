import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {Opening} from './Opening';
import {Hookah} from './Hookah';
import {Offer} from './Offer';
import {Closing} from './Closing';
export const EmperorsCafePromo=()=>{const{fps}=useVideoConfig();const f=useCurrentFrame();return <AbsoluteFill style={{background:'#060606'}}><Sequence name="01 · The crown" durationInFrames={3*fps} premountFor={fps}><Opening/></Sequence><Sequence name="02 · Signature hookah" from={3*fps} durationInFrames={4*fps} premountFor={fps}><Hookah/></Sequence><Sequence name="03 · Golden offer" from={7*fps} durationInFrames={4*fps} premountFor={fps}><Offer/></Sequence><Sequence name="04 · Visit us" from={11*fps} durationInFrames={4*fps} premountFor={fps}><Closing/></Sequence>{[3,7,11].map(t=><AbsoluteFill key={t} style={{pointerEvents:'none',mixBlendMode:'screen',opacity:interpolate(f,[(t-.2)*fps,t*fps,(t+.3)*fps],[0,.8,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),background:'linear-gradient(115deg,transparent 10%,#f8d58c 50%,transparent 85%)'}}/>)}</AbsoluteFill>};

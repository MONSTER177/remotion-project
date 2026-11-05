import React from 'react';
import {AbsoluteFill,Audio,Composition,Folder,Series,staticFile,useVideoConfig} from 'remotion';
import {Impact} from './Impact';import {Identity} from './Identity';import {HotDrinks} from './HotDrinks';import {Water} from './Water';import {Refreshments} from './Refreshments';import {Experience} from './Experience';import {Menu} from './Menu';import {Location} from './Location';

export const YonkoCafe150:React.FC=()=>{const {fps}=useVideoConfig();return <AbsoluteFill>
 <Series>
  <Series.Sequence name="01 • The 500 dinar impact" durationInFrames={8*fps} premountFor={fps}><Impact/></Series.Sequence>
  <Series.Sequence name="02 • Enter YONKO GATE" durationInFrames={12*fps} premountFor={fps}><Identity/></Series.Sequence>
  <Series.Sequence name="03 • Amber tea" durationInFrames={16*fps} premountFor={fps}><HotDrinks/></Series.Sequence>
  <Series.Sequence name="04 • Clear refreshment" durationInFrames={14*fps} premountFor={fps}><Water/></Series.Sequence>
  <Series.Sequence name="05 • Nescafe" durationInFrames={18*fps} premountFor={fps}><HotDrinks coffee/></Series.Sequence>
  <Series.Sequence name="06 • Fresh juices" durationInFrames={18*fps} premountFor={fps}><Refreshments/></Series.Sequence>
  <Series.Sequence name="07 • Cold drinks" durationInFrames={14*fps} premountFor={fps}><Refreshments cold/></Series.Sequence>
  <Series.Sequence name="08 • Settle in" durationInFrames={14*fps} premountFor={fps}><Experience/></Series.Sequence>
  <Series.Sequence name="09 • The menu" durationInFrames={12*fps} premountFor={fps}><Menu/></Series.Sequence>
  <Series.Sequence name="10 • Your destination" durationInFrames={10*fps} premountFor={fps}><Location/></Series.Sequence>
  <Series.Sequence name="11 • Grand wordmark and address" durationInFrames={14*fps} premountFor={fps}><Location final/></Series.Sequence>
 </Series>
 <Audio src={staticFile('yonko/audio/Yonko_Cafe_150s.m4a')}/>
 </AbsoluteFill>;};
export const YonkoCafe15:React.FC=()=>{const {fps}=useVideoConfig();return <AbsoluteFill>
 <Series>
  <Series.Sequence name="Tea impact" durationInFrames={3*fps} premountFor={fps}><Impact/></Series.Sequence>
  <Series.Sequence name="Water 500" durationInFrames={2*fps} premountFor={fps}><Water compact/></Series.Sequence>
  <Series.Sequence name="Nescafe 1000" durationInFrames={3*fps} premountFor={fps}><HotDrinks coffee compact/></Series.Sequence>
  <Series.Sequence name="Juice and cold drinks" durationInFrames={2*fps} premountFor={fps}><Refreshments cold compact/></Series.Sequence>
  <Series.Sequence name="Gold wordmark / address" durationInFrames={5*fps} premountFor={fps}><Location final compact/></Series.Sequence>
 </Series>
 <Audio src={staticFile('yonko/audio/Yonko_Cafe_15s.m4a')}/>
 </AbsoluteFill>;};

export const YonkoCompositions:React.FC=()=> <Folder name="YONKO-GATE-Cafe">
 <Composition id="YonkoCafe150" component={YonkoCafe150} durationInFrames={4500} fps={30} width={1080} height={1920}/>
 <Composition id="YonkoCafe15" component={YonkoCafe15} durationInFrames={450} fps={30} width={1080} height={1920}/>
 <Folder name="Scenes">
  <Composition id="YonkoImpact" component={Impact} durationInFrames={240} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoIdentity" component={Identity} durationInFrames={360} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoTea" component={HotDrinks} durationInFrames={480} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoWater" component={Water} durationInFrames={420} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoCoffee" component={HotDrinks} defaultProps={{coffee:true}} durationInFrames={540} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoJuices" component={Refreshments} durationInFrames={540} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoColdDrinks" component={Refreshments} defaultProps={{cold:true}} durationInFrames={420} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoExperience" component={Experience} durationInFrames={420} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoMenu" component={Menu} durationInFrames={360} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoLocation" component={Location} durationInFrames={300} fps={30} width={1080} height={1920}/>
  <Composition id="YonkoFinale" component={Location} defaultProps={{final:true}} durationInFrames={420} fps={30} width={1080} height={1920}/>
 </Folder>
 </Folder>;

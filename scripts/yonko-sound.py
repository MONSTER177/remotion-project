import math,random,wave,struct
random.seed(177)
sr=48000
out=[]
for n in range(sr*10):
 t=n/sr
 # Original synthetic low drone and airy texture; no sampled music.
 v=.018*math.sin(2*math.pi*55*t)+.009*math.sin(2*math.pi*82.4*t)
 for hit,amp in [(0.12,.6),(1,.3),(3.08,.9),(6,.45),(8,.65)]:
  d=t-hit
  if 0<=d<1.3:
   v+=amp*(.47*math.sin(2*math.pi*(48*d+19*(1-math.exp(-d*15))))*math.exp(-d*5)+random.uniform(-1,1)*.1*math.exp(-d*18))
  if -.23<d<0:
   v+=random.uniform(-1,1)*.16*(1+d/.23)**2
 v+=.025*math.sin(2*math.pi*880*t)*math.exp(-max(0,t-3.1)*6) if t>=3.1 else 0
 v*=min(1,t/.03,(10-t)/.35)
 out.append(max(-.96,min(.96,v)))
with wave.open('public/yonko/cinematic.wav','wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes(b''.join(struct.pack('<h',int(v*32767)) for v in out))

"""Original 112 BPM instrumental score and frame-synchronised sound design.
No samples, external recordings, borrowed melodies, or third-party music.
Generate: python scripts/yonko_score.py
Requires NumPy, SciPy and ffmpeg. Masters live in work/yonko; AAC preview/render
assets live in public/yonko/audio. Both mixes are normalised with EBU R128.
"""
from pathlib import Path
import json, subprocess
import numpy as np
from scipy import signal
from scipy.io import wavfile

ROOT=Path(__file__).resolve().parents[1]
SR=48000
RNG=np.random.default_rng(1772026)
BEAT=60/112

def note(m): return 440*2**((m-69)/12)

def create(duration, short=False):
    mix=np.zeros((int(duration*SR),2),np.float32)
    def put(x,at,gain=1,pan=0):
        a=int(at*SR); x=np.asarray(x,dtype=np.float32)
        if a<0: x=x[-a:]; a=0
        n=min(len(x),len(mix)-a)
        if n<=0:return
        gains=np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)],np.float32)
        mix[a:a+n]+=x[:n,None]*gains*gain
    def tone(m,d,kind='string'):
        t=np.arange(int(d*SR))/SR; hz=note(m)
        if kind=='string':
            x=np.zeros(len(t))
            for det in [-.003,0,.002]:
                for h in range(1,6):x+=np.sin(2*np.pi*hz*(1+det)*h*t+np.sin(t*5)*.035)/(h**1.8)/3
            env=np.minimum(t/.65,1)*np.minimum((d-t)/1.15,1)
        elif kind=='bell':
            x=sum(np.sin(2*np.pi*hz*r*t)*np.exp(-t*(1.3+i*.7))*(.62**i) for i,r in enumerate([1,2.002,3.998,5.43]))
            env=np.minimum(t/.008,1)*np.minimum((d-t)/.09,1)
        elif kind=='pluck':
            x=sum(np.sin(2*np.pi*hz*h*t)*np.exp(-t*(2+h*.6))/h**1.7 for h in range(1,7))
            env=np.minimum(t/.012,1)*np.minimum((d-t)/.09,1)
        elif kind=='bass':
            x=np.sin(2*np.pi*hz*t)+.18*np.sin(4*np.pi*hz*t)
            env=np.minimum(t/.035,1)*np.exp(-t*1.8)*np.minimum((d-t)/.09,1)
        else:
            x=np.sin(2*np.pi*hz*t)+.26*np.sin(4*np.pi*hz*t)+.09*np.sin(6*np.pi*hz*t)
            env=np.minimum(t/.17,1)*np.minimum((d-t)/.35,1)
        return (x*env).astype(np.float32)
    def impact(at,power=1):
        d=2.8;t=np.arange(int(d*SR))/SR
        sub=np.sin(2*np.pi*(42*t+50*.05*(1-np.exp(-t/.05))))*np.exp(-t*2.6)
        noise=RNG.normal(0,1,len(t)); low=signal.sosfilt(signal.butter(2,1400,fs=SR,output='sos'),noise)
        put(sub,at,.9*power);put(low*np.exp(-t*12),at,.65*power)
        metal=sum(np.sin(2*np.pi*h*t)*np.exp(-t*k) for h,k in [(367,3),(583,4),(919,5),(1519,6)])
        put(metal,at,.065*power,.2)
    def whoosh(at,d=1.1,power=.18,reverse=False):
        t=np.arange(int(d*SR))/SR
        noise=RNG.normal(0,1,len(t))
        noise=signal.sosfilt(signal.butter(2,[450,5200],btype='bandpass',fs=SR,output='sos'),noise)
        env=np.sin(np.pi*t/d)**2
        chirp=signal.chirp(t,220 if reverse else 2600,d,2800 if reverse else 180)*.12
        put((noise+chirp)*env,at,power,-.35)
        put((noise+chirp)*env,at+.025,power*.7,.55)
    def shimmer(at,power=.05):
        for i,m in enumerate([81,84,88,93,96]):put(tone(m,2.5,'bell'),at+i*.065,power,(-1)**i*.55)
    # D minor -> Bb maj7 -> F add9 -> C sus. Distinct section orchestrations.
    chords=[[50,57,62,65,69],[46,53,58,62,65],[41,53,57,60,67],[48,55,60,64,67]]
    bars=int(np.ceil(duration/(BEAT*4)))
    for bar in range(bars):
        at=bar*BEAT*4
        chord=chords[(bar//2)%4]
        if short:energy=.8
        elif at<8:energy=.25
        elif at<20:energy=.48
        elif at<50:energy=.56
        elif at<68:energy=.65
        elif at<100:energy=.83
        elif at<114:energy=.4
        elif at<136:energy=.9
        else:energy=.62
        for j,m in enumerate(chord[1:]):put(tone(m,BEAT*4+1.5),at,.055*energy,(j-1.5)*.32)
        for beat in range(4):
            bt=at+beat*BEAT
            put(tone(chord[0]-12,BEAT*.9,'bass'),bt,.19*energy)
            if energy>.45:
                # Muted low string ostinato, lifted in the juice/menu sections.
                for eighth in range(2):
                    idx=(beat*2+eighth+bar)%len(chord)
                    put(tone(chord[idx]+12,BEAT*.85,'pluck'),bt+eighth*BEAT/2,.055*energy,(-1)**idx*.4)
            if beat in [0,2] and energy>.55:
                tt=np.arange(int(.4*SR))/SR
                kick=np.sin(2*np.pi*(49*tt+40*.05*(1-np.exp(-tt/.05))))*np.exp(-tt*13)
                put(kick,bt,.3*energy)
            if energy>.7:
                for h in range(2):
                    tt=np.arange(int(.09*SR))/SR
                    noise=signal.sosfilt(signal.butter(1,5500,btype='highpass',fs=SR,output='sos'),RNG.normal(0,1,len(tt)))
                    put(noise*np.exp(-tt*60),bt+h*BEAT/2,.075,(-1)**h*.3)
        # Long melodic phrases, varied by section and register.
        if bar%2==0:
            motif=([74,77,76,72] if (bar//8)%2==0 else [69,72,74,77])
            for j,m in enumerate(motif):
                put(tone(m+(12 if 68<at<100 else 0),2.8,'bell'),at+j*BEAT*1.5,.065*energy,(-1)**j*.45)
        if energy>.65 and bar%4==3:
            for j,m in enumerate([chord[1],chord[2],chord[3]]):put(tone(m,1.8,'brass'),at+j*.065,.085*energy,(j-1)*.3)
    events=([0,.6,3,3.2,5,5.3,8,10,10.45,14.2] if short else [0,.6,8,8.4,20,21,36,36.2,50,51,68,68.4,86,86.4,100,100.5,114,114.5,126,126.5,136,136.4,148.2])
    for i,at in enumerate(events):
        main=at in ([.6,10] if short else [.6,51,114,136.4])
        impact(at,1.0 if main else .47)
        if at>.9: whoosh(at-.75,.78,.21 if main else .12,True)
        shimmer(at+.08,.065 if main else .027)
    if not short:
        for at in [7,19,35,49,67,85,99,113,125,135]:whoosh(at,.95,.18,True)
    # Memorable D minor/add9 final resolution, with room for reverb decay.
    end=duration-2.3
    for i,m in enumerate([38,50,57,62,65,69,76]):put(tone(m,2.2,'string' if i<4 else 'bell'),end,.12 if i<2 else .06,(i-3)*.14)
    # Stereo early reflections + diffuse long tails. Preserve dry transients.
    dry=mix.copy()
    for delay,g in [(.073,.12),(.131,.095),(.269,.08),(.411,.065),(.683,.049),(1.071,.032)]:
        offset=int(delay*SR);mix[offset:]+=dry[:-offset,::-1]*g
    mix*=np.minimum(np.arange(len(mix))/SR/.012,1)[:,None]
    mix*=np.minimum((duration-np.arange(len(mix))/SR)/.9,1)[:,None]
    peak=float(np.max(np.abs(mix)));mix*=.84/max(peak,.001)
    scratch=ROOT/'work/yonko';scratch.mkdir(parents=True,exist_ok=True)
    out=ROOT/'public/yonko/audio';out.mkdir(parents=True,exist_ok=True)
    name=f'Yonko_Cafe_{duration}s'
    wavfile.write(scratch/f'{name}.wav',SR,(mix*32767).astype(np.int16))
    first=subprocess.run(['ffmpeg','-hide_banner','-i',str(scratch/f'{name}.wav'),'-af','loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json','-f','null','-'],capture_output=True,text=True,check=True)
    stats=json.JSONDecoder().raw_decode(first.stderr[first.stderr.rfind('{'):])[0]
    filt=f"loudnorm=I=-14:TP=-1.5:LRA=9:measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:offset={stats['target_offset']}:linear=true:print_format=json,volume=-0.7dB"
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',str(scratch/f'{name}.wav'),'-af',filt,'-ar',str(SR),'-ac','2','-c:a','aac','-b:a','224k',str(out/f'{name}.m4a')],check=True)
    (scratch/f'{name}_premaster.json').write_text(json.dumps(stats,indent=2))
    print(f'{name}: original score rendered; peak pre-normalisation {peak:.3f}',flush=True)

if __name__=='__main__':
    create(150)
    create(15,True)

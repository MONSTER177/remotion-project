"""Final two-pass streaming master with exact-duration AAC edit lists.
Run after rendering: python scripts/yonko-master.py 150 15
"""
from pathlib import Path
import json,subprocess,sys

ROOT=Path(__file__).resolve().parents[1]
for duration in (int(s) for s in sys.argv[1:]):
    wav=ROOT/f'work/yonko/Yonko_Cafe_{duration}s.wav'
    mp4=ROOT/f'media/YONKO_Cafe_Cinematic_{duration}s.mp4'
    tmp=ROOT/f'work/yonko/master-{duration}s.mp4'
    loud='loudnorm=I=-14:TP=-3:LRA=9'
    p=subprocess.run(['ffmpeg','-hide_banner','-i',str(wav),'-af',loud+':print_format=json','-f','null','-'],capture_output=True,text=True,check=True)
    stats=json.JSONDecoder().raw_decode(p.stderr[p.stderr.rfind('{'):])[0]
    af=loud+f":measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:offset={stats['target_offset']}:linear=true,aresample=192000,alimiter=limit=0.63:attack=3:release=70:level=false:latency=true,aresample=48000,atrim=duration={duration}"
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',str(mp4),'-i',str(wav),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','224k','-af',af,'-ar','48000','-ac','2','-t',str(duration),'-movflags','+faststart',str(tmp)],check=True)
    tmp.replace(mp4)
    # Keep the Studio soundtrack identical to the delivered encoded mix.
    audio=ROOT/f'public/yonko/audio/Yonko_Cafe_{duration}s.m4a'
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-i',str(mp4),'-vn','-c:a','copy',str(audio)],check=True)
    print(f'Mastered {duration}s (two-pass -14 LUFS target / -3 dBTP processing ceiling; final AAC measured separately)',flush=True)

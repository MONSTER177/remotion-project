"""Validate the delivered MP4 files, not only Remotion composition metadata."""
from pathlib import Path
import hashlib,json,re,subprocess,sys

ROOT=Path(__file__).resolve().parents[1]
def run(cmd):return subprocess.run(cmd,capture_output=True,text=True,check=True)

results=[]
for seconds in ([int(v) for v in sys.argv[1:]] or [150,15]):
    frames=seconds*30
    p=ROOT/f'media/YONKO_Cafe_Cinematic_{seconds}s.mp4'
    probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(p)]).stdout)
    v=next(s for s in probe['streams'] if s['codec_type']=='video')
    a=next(s for s in probe['streams'] if s['codec_type']=='audio')
    assert (v['width'],v['height'],v['r_frame_rate'],v['codec_name'])==(1080,1920,'30/1','h264')
    # FFprobe calls full-range H.264 4:2:0 "yuvj420p"; both are 8-bit 4:2:0.
    assert v['pix_fmt'] in ('yuv420p','yuvj420p')
    assert int(v['nb_frames'])==frames
    assert abs(float(probe['format']['duration'])-seconds)<.001
    assert abs(float(v['duration'])-seconds)<.001
    assert abs(float(a['duration'])-seconds)<.001
    assert (a['codec_name'],a['channels'],a['sample_rate'])==('aac',2,'48000')
    # Full decoding with -xerror catches corruption or truncated media, while
    # checking sustained black frames and audio silence in the delivered files.
    analysis=run(['ffmpeg','-xerror','-hide_banner','-i',str(p),'-vf','blackdetect=d=0.4:pix_th=0.04:pic_th=0.99','-af','loudnorm=I=-14:TP=-1:LRA=11:print_format=json,silencedetect=noise=-50dB:d=1','-f','null','-'])
    matches=list(re.finditer(r'\{\s*"input_i"',analysis.stderr))
    loud=json.JSONDecoder().raw_decode(analysis.stderr[matches[-1].start():])[0]
    assert -16<=float(loud['input_i'])<=-12,loud
    assert float(loud['input_tp'])<=-1,loud
    assert 'silence_start' not in analysis.stderr,analysis.stderr
    assert 'black_start' not in analysis.stderr,analysis.stderr
    report={'file':str(p.relative_to(ROOT)),'duration_seconds':float(probe['format']['duration']),'frames':int(v['nb_frames']),'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'video_codec':v['codec_name'],'pixel_format':v['pix_fmt'],'audio_codec':a['codec_name'],'audio_channels':a['channels'],'audio_sample_rate':int(a['sample_rate']),'size_bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'loudness_lufs':float(loud['input_i']),'true_peak_dbtp':float(loud['input_tp']),'full_decode':'passed','sustained_audio_silence':'none','black_intervals_over_0_4_seconds':'none'}
    results.append(report)
    print(json.dumps(report,ensure_ascii=False),flush=True)
(ROOT/'media/YONKO_Cafe_Technical_Validation.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')

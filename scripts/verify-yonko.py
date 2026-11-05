"""Verify the actual encoded deliverable, not just composition settings."""
import json, subprocess
from pathlib import Path
p=Path('media/YONKO_1500_Offer.mp4')
assert p.is_file() and p.stat().st_size>100_000
report=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_streams','-show_format','-of','json',str(p)]))
v=next(s for s in report['streams'] if s['codec_type']=='video')
a=next(s for s in report['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'])==(1080,1920)
assert v['codec_name']=='h264' and v['pix_fmt']=='yuv420p'
assert v['r_frame_rate']=='30/1' and v['avg_frame_rate']=='30/1'
assert int(v['nb_read_frames'])==300
assert float(v['duration'])==10 and float(report['format']['duration'])==10
assert a['codec_name']=='aac'
summary={k:v[k] for k in ('codec_name','width','height','pix_fmt','r_frame_rate','avg_frame_rate','duration','nb_read_frames')}
summary.update(audio_codec=a['codec_name'],bytes=p.stat().st_size,container_duration=report['format']['duration'])
Path('media/YONKO_verification.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))

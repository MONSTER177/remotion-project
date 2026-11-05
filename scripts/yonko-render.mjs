import path from 'node:path';
import fs from 'node:fs';
import {bundle} from '@remotion/bundler';
import {getCompositions, renderStill, renderMedia} from '@remotion/renderer';

const root=process.cwd();
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),outDir:path.join(root,'work/yonko/bundle')});
const common={serveUrl,browserExecutable:'/usr/bin/chromium',chromiumOptions:{gl:'angle',disableWebSecurity:false},logLevel:'warn'};
const compositions=await getCompositions(serveUrl,{browserExecutable:common.browserExecutable});
fs.mkdirSync('work/yonko/frames',{recursive:true});
fs.mkdirSync('media',{recursive:true});
const mode=process.argv[2]||'review';
if(mode==='review'){
 const list=[['YonkoCafe150',60],['YonkoCafe150',330],['YonkoCafe150',780],['YonkoCafe150',1230],['YonkoCafe150',1710],['YonkoCafe150',2190],['YonkoCafe150',2670],['YonkoCafe150',3180],['YonkoCafe150',3570],['YonkoCafe150',3900],['YonkoCafe150',4320],['YonkoCafe15',60],['YonkoCafe15',120],['YonkoCafe15',200],['YonkoCafe15',270],['YonkoCafe15',420]];
 for(const [id,frame] of list){await renderStill({...common,composition:compositions.find(c=>c.id===id),frame,output:`work/yonko/frames/${id}-${frame}.png`});console.log(`Reviewed frame ready: ${id} ${frame}`);}
}else{
 const id=mode==='short'?'YonkoCafe15':'YonkoCafe150';
 const composition=compositions.find(c=>c.id===id);
 let milestone=-1;
 await renderMedia({...common,composition,outputLocation:`media/YONKO_Cafe_Cinematic_${mode==='short'?'15s':'150s'}.mp4`,codec:'h264',audioCodec:'aac',audioBitrate:'224k',crf:20,pixelFormat:'yuv420p',imageFormat:'jpeg',jpegQuality:88,concurrency:2,enableMultiProcessOnLinux:true,
 onProgress:({progress,renderedFrames,encodedFrames})=>{const p=Math.floor(progress*20);if(p!==milestone){milestone=p;console.log(`${id} ${Math.round(progress*100)}% frames=${renderedFrames} encoded=${encodedFrames}`);}}});
 console.log(`Completed ${id}`);
}

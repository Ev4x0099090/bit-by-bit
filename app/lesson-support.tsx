'use client';
import {Fragment} from 'react';
import {Popover,PopoverTrigger,PopoverContent} from '@/components/ui/popover';
import {glossary,type TermId} from '@/lib/glossary';
import {lessonHelp} from '@/lib/lesson-help';
import {LessonGlossary} from './key-term';
import {VisualBits,VisualFlow} from './topic-visuals';
import {TransmissionHelpVisual} from './transmission-visuals';
import {courseById} from '@/lib/course-registry';
import {HardwareFlow} from './hardware-visuals';
import {HardwareHelpVisual} from './hardware-visuals';

export function TermText({text,terms}:{text:string,terms:TermId[]}){
 const entries=terms.flatMap(id=>{
  const name=glossary[id].name,words=[name];
  if(['bit','byte','nibble','pixel','sample','register','header','robot','algorithm','variable','constant','array','procedure','function','record','field','gate'].includes(id))words.push(name+'s');
  if(id==='gate')words.push('gate','gates');
  if(id==='hexadecimal')words.push('hex');if(id==='rle')words.push('RLE');if(id==='complement')words.push("two's complement");
  return words.map(word=>({id,word}));
 }).sort((a,b)=>b.word.length-a.word.length);
 const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const expression=new RegExp(`\\b(${entries.map(e=>escape(e.word)).join('|')})\\b`,'gi');
 const seen=new Set<TermId>();
 return <>{text.split(expression).map((piece,i)=>{
  const entry=entries.find(e=>e.word.toLowerCase()===piece.toLowerCase());if(!entry||seen.has(entry.id))return <Fragment key={i}>{piece}</Fragment>;seen.add(entry.id);
  const t=glossary[entry.id];return <Popover key={i}><PopoverTrigger asChild><button className="inline-term" aria-label={`Explain ${piece}`}>{piece}</button></PopoverTrigger><PopoverContent className="term-popover" aria-label={`${t.name} definition`}><strong>{t.name}</strong><p>{t.simple}</p><p><b>Example:</b> {t.example}</p><details><summary>More detail</summary><p>{t.more}</p></details><small>Press Escape or tap the word again to close.</small></PopoverContent></Popover>;
 })}</>;
}

function AnotherExample({objective}:{objective:string}){
 if(courseById[objective])return <HardwareFlow frames={courseById[objective].helpFrames}/>;
 if(objective.startsWith('2.'))return <TransmissionHelpVisual objective={objective}/>;
 if(objective.startsWith('3.'))return <HardwareHelpVisual objective={objective}/>;
 switch(objective){
 case '1.1.2':return <><VisualBits pattern="0110" weights={[8,4,2,1]} marked={[1,2]}/><VisualFlow items={[{label:'Use the 4 and 2 columns',value:'4 + 2 = 6'},{label:'Leave out 8 and 1',value:'0110 in binary = 6 in denary'}]}/></>;
 case '1.1.3':return <div className="help-bit-pair">{[0,1].map(i=><div key={i}><VisualBits pattern="1111"/><strong>↓ F</strong></div>)}</div>;
 case '1.1.4':return <><VisualBits pattern="00000001"/><span>+ another one</span><VisualBits pattern="00000001"/><span>↓ 1 + 1: write 0, carry 1 left</span><VisualBits pattern="00000010" marked={[6,7]}/></>;
 case '1.1.5':return <><VisualBits pattern="00000100"/><span>One place right →</span><VisualBits pattern="00000010" marked={[0]}/><VisualFlow items={[{label:'Before',value:'4'},{label:'Divide by 2',value:'2'}]}/></>;
 case '1.1.6':return <><VisualBits pattern="00000010"/><span>↓ swap every bit</span><VisualBits pattern="11111101"/><span>↓ add one</span><VisualBits pattern="11111110" weights={[-128,64,32,16,8,4,2,1]}/><p>−128 + 64 + 32 + 16 + 8 + 4 + 2 = −2.</p></>;
 case '1.2.1':return <><VisualFlow items={[{label:'Letter',value:'B'},{label:'ASCII code',value:'66 = 64 + 2'}]}/><VisualBits pattern="01000010" weights={[128,64,32,16,8,4,2,1]} marked={[1,6]}/></>;
 case '1.2.2':return <div className="help-samples">{[[4,2],[8,2],[4,4]].map(([count,depth],i)=><div key={i}><span>{count} samples · {depth} bits each</span><div>{Array.from({length:count},(_,n)=><b key={n}>{'0'.repeat(depth)}</b>)}</div><strong>{count*depth} bits</strong></div>)}</div>;
 case '1.2.3':return <><div className="help-pixels">{['00','01','10','11'].map(p=><span key={p}>{p}</span>)}</div><VisualFlow items={[{label:'Four pixels, two bits each',value:'4 × 2 = 8 bits'},{label:'Eight bits per byte',value:'1 byte'}]}/></>;
 case '1.3.1':return <VisualFlow items={[{label:'Start with bits',value:'8192 bits'},{label:'÷ 8',value:'1024 bytes'},{label:'÷ 1024',value:'1 KiB'}]}/>;
 case '1.3.2':return <VisualFlow items={[{label:'Count pixels',value:'8 × 8 = 64'},{label:'Two bits per pixel',value:'64 × 2 = 128 bits'},{label:'÷ 8',value:'16 bytes'}]}/>;
 case '1.3.3':return <VisualFlow items={[{label:'Fewer bits stored',value:'More space left'},{label:'Fewer bits sent',value:'Shorter transmission time'},{label:'Fewer bits during streaming',value:'Less bandwidth needed'}]}/>;
 case '1.3.4':return <div className="rle-walkthrough">{[['AAA','(3,A)'],['BB','(2,B)']].map(([run,encoded])=><div key={run}><code>{run}</code><span>↓</span><strong>{encoded}</strong><span>↓</span><code>{run}</code></div>)}</div>;
 default:return null;
 }
}

export function LessonSupport({objective,onWalkthrough}:{objective:string,onWalkthrough:()=>void}){
 const help=lessonHelp[objective];if(!help)return null;
 return <div className="lesson-support" data-lesson-support={objective}>
  <div className="learning-help"><details><summary>Explain more simply</summary><p>{help.simple}</p></details><details><summary>Show another example</summary><div className="help-example"><p>{help.example}</p><AnotherExample objective={objective}/></div></details><button className="text-btn help-walkthrough" onClick={onWalkthrough}>Show me how</button></div>
  <LessonGlossary terms={help.terms}/>
 </div>;
}

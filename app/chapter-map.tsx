'use client';
import {Check,Clock,Send,ScanLine,ShieldCheck,Target,Binary,AudioLines,HardDrive,Cpu,Keyboard,Network} from 'lucide-react';
import {Progress} from '@/components/ui/progress';
import {lessons} from '@/lib/content';
import {chapters} from '@/lib/chapters';
import {courseById} from '@/lib/course-registry';
import {hardwareById} from '@/lib/hardware';
import {transmissionLayouts} from '@/lib/transmission-layout';

const previews:Record<string,[string,string,string]>={
 '1.1.1':['OFF / ON','0 / 1','One binary digit · bit'],
 '1.1.2':['8 · 4 · 2 · 1','1 · 0 · 1 · 1','8 + 2 + 1 = 11'],
 '1.1.3':['0010 | 1101','2 | D','Same value · fewer digits'],
 '1.1.4':['01 + 01','One + one','10 in binary'],
 '1.1.5':['00000100','Shift one place right','00000010'],
 '1.1.6':['11111110','Signed eight-bit value','−2 in denary'],
 '1.2.1':['A','ASCII code 65','01000001'],
 '1.2.2':['Sound → samples','8 bits per sample','256 possible values'],
 '1.2.3':['4 × 4 pixels','2 bits per pixel','16 × 2 = 32 bits'],
 '1.3.1':['8 bits = 1 byte','1024 bytes','1 KiB'],
 '1.3.2':['Pixels × colour depth','File size in bits','Divide by 8 for bytes'],
 '1.3.3':['Original: 20 MiB','Compressed: 8 MiB','12 MiB of space saved'],
 '1.3.4':['AAAABB','(4,A) (2,B)','Recover AAAABB exactly'],
 '2.1.1':['1 · MEET','2 · AFTER','3 · SCHOOL'],
 '2.1.2':['One channel: 1 → 0 → 1','Several: 1 | 0 | 1','Both ways? A ⇄ B'],
 '2.1.3':['Laptop','USB · data + power','Mouse'],
 '2.2.1':['Sent 101101','Received 100101','Spot the difference'],
 '2.2.2':['Data: 1011001','Parity bit: 0','Four ones · even'],
 '2.2.3':['4 + 2 + 7 = 13','Add check digit 7','4277 → total 20'],
 '2.2.4':['Sender → DATA → Receiver','Sender ← ACK ← Receiver','No reply? Send again'],
 '2.3.1':['MEET AT FIVE','Encrypt with a key','Q7 • 9Z • K2'],
 '2.3.2':['Ben’s PUBLIC key','Encrypt a message to Ben','Ben’s PRIVATE key reads it']
};
export function ChapterMap({chapter,completed,onLesson,onAssessment}:{chapter:string,completed:string[],onLesson:(index:number)=>void,onAssessment:()=>void}){
 const c=chapters.find(c=>c.id===chapter)||chapters[0],available=lessons.filter(l=>l.id.startsWith(c.id+'.')),done=available.filter(l=>completed.includes(l.id)).length,next=available.find(l=>!completed.includes(l.id));
 const groupTitles=c.id==='2'?['Send it','Check it','Keep it private']:c.groups.map(g=>g.name),icons=c.id==='2'?[Send,ScanLine,ShieldCheck]:c.id==='3'?[Cpu,Keyboard,HardDrive,Network]:[Binary,AudioLines,HardDrive];
 const title=c.title.charAt(0).toUpperCase()+c.title.slice(1);
 return <div className={`chapter-page chapter-map tx-chapter-map ${c.id==='2'?'transmission-chapter':''}`} data-chapter-map={c.id} style={{"--chapter-section-count":c.groups.length} as React.CSSProperties}>
  <header className="tx-map-heading"><div><span className="tx-kicker">PAPER {Number(c.id)<=6?1:2} · TOPIC {c.id}</span><h1>{title}</h1><p>{c.id==='2'?'Take a message from sender to receiver. Find the faults. Keep it private.':c.description}</p></div><div className="tx-map-progress"><strong>{done} of {available.length} lessons completed</strong><Progress value={done/available.length*100} aria-label={`${title} reading progress`}/></div></header>
  <nav className="tx-journey-map" aria-label="Chapter sections">{c.groups.map((g,i)=>{const Icon=icons[i]||Binary;return <a href={`#tx-map-${i}`} key={g.name}><Icon size={25}/><span><strong>{groupTitles[i]}</strong><small>{g.subtitle}</small></span><b aria-hidden="true">{i+1}</b></a>})}</nav>
  {c.groups.map((g,gi)=>{const Icon=icons[gi]||Binary;return <section className="tx-map-group" id={`tx-map-${gi}`} key={g.name}><div className="tx-map-group-heading"><Icon size={24}/><div><h2>{groupTitles[gi]}</h2><p>{g.description}</p></div></div><div className="tx-mission-cards">{g.ids.map(id=>{const index=lessons.findIndex(l=>l.id===id),l=lessons[index],layout=transmissionLayouts[id],isDone=completed.includes(id);return <button key={id} className={`tx-mission-card ${next?.id===id?'up-next':''} tx-card-${layout?.format||'number'}`} onClick={()=>onLesson(index)} aria-label={`Open lesson ${available.findIndex(l=>l.id===id)+1}: ${l.title}`}><span className="tx-card-top"><span>{layout?.kicker||g.subtitle.toUpperCase()}</span>{isDone?<span className="tx-card-done"><Check size={14}/> Completed</span>:next?.id===id?<b>Up next</b>:<span>{id}</span>}</span><div className="tx-card-preview" aria-hidden="true">{(hardwareById[id]?.preview||courseById[id]?.preview||previews[id]||[l.id,g.subtitle,l.goal]).map((t,i)=><span key={t} className={`part-${i}`}>{t}</span>)}</div><h3>{l.title}</h3><span className="tx-card-task">{layout?.task||l.goal}</span><span className="tx-card-bottom"><span><Clock size={14}/> {l.minutes} min</span><strong>{isDone?'Revisit lesson':'Open lesson'}</strong></span></button>})}</div></section>})}
  <section className="tx-map-assessment"><Target size={28}/><div><h2>Bring the chapter together</h2><p>{c.assessment}</p></div><button className="btn" onClick={onAssessment}>Take chapter assessment</button></section>
 </div>;
}

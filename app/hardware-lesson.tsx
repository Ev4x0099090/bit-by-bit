'use client';
import {useRef,useState} from 'react';
import {Check,Lightbulb,ArrowRight,RotateCcw} from 'lucide-react';
import {lessons} from '@/lib/content';
import {courseById} from '@/lib/course-registry';
import {chapterFor} from '@/lib/chapters';
import {CourseActivity} from './course-activities';
import {hardwareById} from '@/lib/hardware';
import type {Attempt} from '@/lib/engine';
import {TermText,LessonSupport} from './lesson-support';
import {PracticeCheck,LessonKnowledgeCheck} from './learning-support';
import {HardwareActivity} from './hardware-activities';
import {HardwareFlow} from './hardware-visuals';
export function HardwareLesson({index,completed,onComplete,onAttempt,onError,onChapter,onNext}:{index:number,completed:boolean,onComplete:()=>void,onAttempt:(a:Attempt)=>void,onError:(s:string)=>void,onChapter:()=>void,onNext:()=>void}){
 const l=lessons[index],e=hardwareById[l.id]||courseById[l.id],chapter=chapterFor(l.id),chapterLessons=lessons.filter(l=>l.id.startsWith(chapter.id+'.')); 
 const [help,setHelp]=useState(false),[workedStep,setWorkedStep]=useState(0),worked=useRef<HTMLElement>(null);
 const showHow=()=>{setWorkedStep(0);requestAnimationFrame(()=>{worked.current?.scrollIntoView({block:'start',behavior:'instant'});worked.current?.querySelector<HTMLButtonElement>('button')?.focus({preventScroll:true})})};
 return <article className={`hardware-lesson hw-topic-${l.id.split('.')[1]}`} data-hardware-lesson={l.id} data-course-lesson={l.id}>
  <header className="hw-heading"><div><button className="text-btn" onClick={onChapter}>{chapter.title}</button><span>Lesson {chapterLessons.findIndex(x=>x.id===l.id)+1} of {chapterLessons.length} · {l.id}</span></div><h1>{l.title}</h1><p>{e.opening}</p></header>
  <nav className="hw-lesson-nav" aria-label="Lesson sections"><a href="#hw-explore">Try it</a><a href="#hw-understand">Understand it</a><a href="#hw-worked">Worked example</a><a href="#hw-practise">Practise</a><a href="#hw-finish">Check & finish</a><button className="text-btn" aria-expanded={help} onClick={()=>setHelp(!help)}><Lightbulb size={16}/> Help & key terms</button></nav>
  {help&&<div className="hw-help"><LessonSupport objective={l.id} onWalkthrough={showHow}/></div>}
  <section id="hw-explore" className="hw-workshop"><h2>{e.mission}</h2>{l.id.startsWith("3.")?<HardwareActivity id={l.id}/>:<CourseActivity id={l.id}/>}</section>
  <section id="hw-understand" className="hw-notes"><h2>Understand the idea</h2><div>{e.sections.map(([title,text],i)=><div className="hw-note" key={i}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p><TermText text={text} terms={e.terms}/></p></div></div>)}</div></section>
  <section id="hw-worked" className="hw-worked" ref={worked}><span className="tx-kicker">WORK IT THROUGH</span><h2>A different example</h2><p>{e.worked.prompt}</p><div className="hw-worked-steps" role="group" aria-label="Worked example steps">{e.worked.steps.map((s,i)=><button key={i} className={i===workedStep?'active':''} aria-pressed={i===workedStep} onClick={()=>setWorkedStep(i)}><span>{i+1}</span>{s.title}</button>)}</div><div className="hw-worked-result" aria-live="polite"><HardwareFlow frames={e.worked.steps[workedStep].frames}/><p><TermText text={e.worked.steps[workedStep].reason} terms={e.terms}/></p></div><div className="hw-controls"><button className="text-btn" disabled={workedStep===0} onClick={()=>setWorkedStep(n=>n-1)}>Previous step</button><button className="btn secondary" disabled={workedStep===e.worked.steps.length-1} onClick={()=>setWorkedStep(n=>n+1)}>Next step</button><button className="text-btn" onClick={()=>setWorkedStep(0)}><RotateCcw size={14}/> Start example again</button></div></section>
  <section id="hw-practise" className="hw-practise"><h2>Now try a different situation</h2><div>{e.practice.map((q,i)=><PracticeCheck key={i} question={q} label={`Try ${i+1}`} hintVisuals={q.clues.map((c,j)=><div className="hw-hint-step" data-hardware-hint key={j}>{j>0&&<ArrowRight aria-hidden="true"/>}<small>{c.label}</small><strong>{c.value}</strong></div>)}/>)}</div></section>
  <section id="hw-finish" className="hw-finish"><div><h2>A quick check</h2><LessonKnowledgeCheck objective={l.id} onAttempt={onAttempt} onError={onError} summaryHref="#hw-summary"/></div><div id="hw-summary"><h2>Keep these ideas</h2><ul>{e.takeaways.map(t=><li key={t}><Check size={17}/><span><TermText text={t} terms={e.terms}/></span></li>)}</ul><aside><strong>Easy to mix up</strong><p>{e.mistake}</p></aside><details><summary>Cambridge wording · {l.id}</summary><p>{e.exam}</p></details></div></section>
  <div className="hw-controls hw-completion"><button className="btn" onClick={onComplete}>{completed?<><Check size={17}/> Lesson completed</>:'Mark lesson complete'}</button>{index<lessons.length-1&&<button className="btn secondary" onClick={onNext}>Continue to next lesson <ArrowRight size={16}/></button>}<button className="text-btn" onClick={onChapter}>Back to chapter</button></div>
 </article>;
}

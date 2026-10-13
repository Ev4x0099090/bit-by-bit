'use client';
import {useState,useRef} from 'react';
import {Check,BookOpen,Lightbulb,RotateCcw} from 'lucide-react';
import {lessons} from '@/lib/content';
import {teaching} from '@/lib/teaching';
import {lessonHelp} from '@/lib/lesson-help';
import {transmissionLayouts} from '@/lib/transmission-layout';
import {type Attempt} from '@/lib/engine';
import {TransmissionActivity} from './transmission-activities';
import {TransmissionVisual} from './transmission-visuals';
import {LessonSupport,TermText} from './lesson-support';
import {PracticeCheck,LessonKnowledgeCheck} from './learning-support';

export function TransmissionLesson({index,completed,onComplete,onAttempt,onError,onChapter,onNext}:{index:number,completed:boolean,onComplete:()=>void,onAttempt:(a:Attempt)=>void,onError:(s:string)=>void,onChapter:()=>void,onNext:()=>void}){
 const l=lessons[index],plan=teaching[l.id],layout=transmissionLayouts[l.id],terms=lessonHelp[l.id].terms,local=lessons.filter(l=>l.id.startsWith('2.')).findIndex(x=>x.id===l.id)+1;
 const [help,setHelp]=useState(false),[step,setStep]=useState(-1),worked=useRef<HTMLElement>(null);
 const showHow=()=>{setStep(0);requestAnimationFrame(()=>{worked.current?.scrollIntoView({block:'start',behavior:'instant'});worked.current?.querySelector<HTMLButtonElement>('.tx-case-tabs button')?.focus({preventScroll:true})})};
 const notes=<section id="tx-notes" className="tx-field-notes" aria-labelledby="tx-notes-title"><h2 id="tx-notes-title">{layout.notes}</h2><div className="tx-note-grid">{l.detail.map((text,i)=><div className="tx-field-note" key={i}><h3>{plan.ideaTitles[i]}</h3><TransmissionVisual objective={l.id} step={i}/><p><TermText text={text} terms={terms}/></p></div>)}</div></section>;
 const lab=<section id="tx-lab" className="tx-lab-zone" aria-label={layout.task}><div className="tx-brief"><span className="tx-kicker">{layout.kicker}</span><h2>{layout.task}</h2><p><TermText text={layout.primer} terms={terms}/></p></div><TransmissionActivity id={l.id}/></section>;
 return <article className={`transmission-lesson tx-format-${layout.format}`} data-transmission-format={layout.format}>
  <header className="tx-lesson-heading"><div className="tx-heading-meta"><button className="text-btn" onClick={onChapter}>Data transmission</button><span>Lesson {local} of 9 · {l.id}</span></div><h1>{l.title}</h1></header>
  <nav className="tx-page-links" aria-label="Lesson sections"><a href="#tx-lab">{layout.format==='detective'?'Investigate':layout.format==='intercept'?'The conversation':layout.format==='timeline'?'The exchange':'Explore'}</a><a href="#tx-notes">{layout.format==='workbench'?'Checking rules':'How it works'}</a><a href="#tx-worked">Worked case</a><a href="#tx-practice">Your challenge</a><a href="#tx-review">Check & finish</a><button className="text-btn" aria-expanded={help} onClick={()=>setHelp(v=>!v)}><Lightbulb size={16}/> Help & key terms</button></nav>
  {help&&<div className="tx-help-drawer"><LessonSupport objective={l.id} onWalkthrough={showHow}/></div>}
  <div className="tx-investigation">{lab}{notes}</div>
  <section id="tx-worked" className="tx-case-study" ref={worked}><div className="tx-section-title"><BookOpen size={21}/><h2>{layout.worked}</h2></div><p className="tx-case-question">{plan.worked.prompt}</p><div className="tx-case-tabs" role="group" aria-label="Worked example steps">{plan.worked.steps.map((s,i)=><button key={i} className={step===i?'active':''} aria-pressed={step===i} onClick={()=>setStep(i)}><span>{i+1}</span>{s.title}</button>)}</div>{step<0?<p className="tx-case-instruction">Choose the first step to start. You can revisit any step.</p>:<div className="tx-case-result" aria-live="polite"><TransmissionVisual objective={l.id} step={step} example/><div><h3>{plan.worked.steps[step].title}</h3><p><TermText text={plan.worked.steps[step].reason} terms={terms}/></p><div className="tx-case-controls">{step>0&&<button className="text-btn" onClick={()=>setStep(n=>n-1)}>Previous step</button>}{step<plan.worked.steps.length-1&&<button className="btn secondary" onClick={()=>setStep(n=>n+1)}>Next step</button>}<button className="text-btn" onClick={()=>setStep(-1)}><RotateCcw size={14}/> Reset example</button></div></div></div>}</section>
  <section id="tx-practice" className="tx-challenge"><span className="tx-kicker">YOUR CHALLENGE</span><h2>{layout.practice}</h2><div className="tx-practice-grid">{plan.practice.map((q,i)=><PracticeCheck key={i} question={q} label={`Challenge ${i+1}`} hintsTarget={{objective:l.id,questionIndex:i}}/>)}</div></section>
  <section id="tx-review" className="tx-review"><div><span className="tx-kicker">CHECK & FINISH</span><h2>What did you work out?</h2><p>Two short answers, saved to your progress.</p><LessonKnowledgeCheck objective={l.id} onAttempt={onAttempt} onError={onError} summaryHref="#transmission-recap"/></div><div id="transmission-recap" className="tx-recap"><h2>Take this with you</h2><ul>{plan.takeaways.map(t=><li key={t}><Check size={17}/><span><TermText text={t} terms={terms}/></span></li>)}</ul><aside className="tx-caution"><strong>Easy to mix up</strong><p><TermText text={l.misconception} terms={terms}/></p></aside><details className="tx-exam-note"><summary>Cambridge wording · {l.id}</summary><p>{l.tip}</p><p>{l.example}</p></details></div></section>
  <div className="tx-finish"><button className="btn" onClick={onComplete}>{completed?<><Check size={17}/> Lesson completed</>:'Mark lesson complete'}</button>{index<lessons.length-1&&<button className="btn secondary" onClick={onNext}>Continue to next lesson</button>}<button className="text-btn" onClick={onChapter}>Back to chapter</button><p>Reading completion and assessment results are tracked separately.</p></div>
 </article>;
}

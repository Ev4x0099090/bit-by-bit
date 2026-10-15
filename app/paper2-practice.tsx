'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,CheckCircle2,Flag,LoaderCircle} from 'lucide-react';
import type {PracticalTask} from '@/lib/course-paper2-practice';
import {paperCatalogue,paperById} from '@/lib/paper-catalogue';
import {practicalDraftKey} from '@/lib/practical-drafts';
import {choosePaper} from '@/lib/paper-selection';
import type {CodeDraft,PaperSession} from '@/lib/paper-practice-types';
import {lessons} from '@/lib/content';
import type {Attempt} from '@/lib/engine';
import {PracticalAnswer,emptyCodeDraft} from './practical-answer';
import {usePracticalScope} from './practical-session';
import {QuestionPassage} from './question-text';
import {AnswerCode} from './answer-code';
import {PaperHistory,paperLabel} from './paper-history';
import {MarkFeedback} from './mark-feedback';
import {SearchFlowchart} from './search-flowchart';
import {PaperGradeScale} from './paper-grade-scale';
const partLabel=(part?:string)=>!part?'':part.length===1?`(${part})`:`(${part[0]})(${part.slice(1)})`;
const format=(task:PracticalTask)=>task.kind==='code'?'Pseudocode'+(task.languages?' or program':''):task.kind==='diagram'?'Draw your answer':task.kind==='sql'?'SQL':task.kind==='trace'?'Complete the table':task.kind==='matching'?'Match the pairs':task.kind==='choice'?'Choose one answer':'Written answer';
const answered=(d?:CodeDraft)=>!!d&&(!!d.text.trim()||!!d.choice||Object.values(d.fields).some(v=>v.trim()));
const cacheKey=(scope:string)=>`bit-paper-sessions-v1:${scope}`;
const outboxKey=(scope:string)=>`bit-paper-outbox-v1:${scope}`;
const paperPool=paperCatalogue;
async function requestPaper(body?:unknown){const r=await fetch('/api/paper-practice',body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),keepalive:JSON.stringify(body).length<28000}:undefined);const data=await r.json();if(!r.ok)throw Object.assign(Error(data.error||'Saving is unavailable.'),{session:data.session,code:data.code});return data}
function safeDraft(taskId:string,value:unknown):value is CodeDraft{const t=paperCatalogue.flatMap(p=>p.tasks).find(t=>t.id===taskId),d=value as CodeDraft;return !!t&&!!d&&typeof d==='object'&&!Array.isArray(d)&&typeof d.text==='string'&&d.text.length<=12000&&typeof d.choice==='string'&&typeof d.language==='string'&&!!d.fields&&typeof d.fields==='object'&&!Array.isArray(d.fields)&&Object.values(d.fields).every(v=>typeof v==='string')}
function safeAnswers(value:unknown){if(!value||typeof value!=='object'||Array.isArray(value))return {};return Object.fromEntries(Object.entries(value).filter(([id,d])=>safeDraft(id,d))) as Record<string,CodeDraft>}
function cached(scope:string):PaperSession[]{try{const rows=JSON.parse(localStorage.getItem(cacheKey(scope))||'[]');return Array.isArray(rows)?rows.filter(s=>s&&typeof s.paperId==='string'&&typeof s.currentTask==='string'&&s.results&&typeof s.results==='object'&&!Array.isArray(s.results)&&['in_progress','marking','complete'].includes(s.status)).map(s=>({...s,answers:safeAnswers(s.answers)})):[]}catch{return []}}
function queued(scope:string){try{return safeAnswers(JSON.parse(localStorage.getItem(outboxKey(scope))||'{}'))}catch{return {}}}
function fresh(id:string):PaperSession{const paper=paperById(id)!;return {paperId:paper.id,currentTask:paper.tasks[0].id,startedAt:Date.now(),updatedAt:Date.now(),completedAt:null,status:'in_progress',answers:{},results:{},earned:null,maximumMarks:paper.marks,grade:null,requiresReview:false}}
export function Paper2Practice({onLesson,onExit}:{attempts:Attempt[],onAttempt:(a:Attempt)=>void,onError?:(s:string)=>void,onLesson:(i:number)=>void,onExit?:()=>void}){
 const scope=usePracticalScope(),[session,setSession]=useState<PaperSession|null>(null),[loaded,setLoaded]=useState(''),[history,setHistory]=useState<PaperSession[]>([]),[selected,setSelected]=useState(''),[phase,setPhase]=useState<'question'|'submit'|'result'|'history'>('question'),[busy,setBusy]=useState(false),[saveStatus,setSaveStatus]=useState(''),[error,setError]=useState('');
 const paper=paperById(session?.paperId)||paperCatalogue[0],paper2Tasks=paper.tasks,groups=Array.from(new Set(paper2Tasks.map(t=>t.question!))).map(n=>({n,parts:paper2Tasks.filter(t=>t.question===n)}));
 const api=useCallback((body?:Record<string,unknown>)=>requestPaper(body?{...body,expectedUserId:scope}:undefined),[scope]);
 const current=useRef<PaperSession|null>(null),pending=useRef<Record<string,CodeDraft>>({}),timer=useRef<ReturnType<typeof setTimeout>|null>(null),chain=useRef<Promise<boolean>>(Promise.resolve(true)),flushRef=useRef<()=>Promise<boolean>>(async()=>true),mounted=useRef(true),owner=useRef(scope),finishRef=useRef<()=>Promise<void>>(async()=>{});
 useEffect(()=>{owner.current=scope;mounted.current=true;return()=>{mounted.current=false}},[scope]);
 const update=useCallback((next:PaperSession|null)=>{current.current=next;setSession(next)},[]);
 const saveCache=useCallback((next:PaperSession,owner:string)=>{try{const rows=cached(owner).filter(s=>s.paperId!==next.paperId);localStorage.setItem(cacheKey(owner),JSON.stringify([...rows,next]));return true}catch{return false}},[]);
 const recordOutbox=useCallback((owner:string)=>{try{localStorage.setItem(outboxKey(owner),JSON.stringify(pending.current))}catch{}},[]);
 const flush=useCallback(async()=>{
  if(timer.current)clearTimeout(timer.current);timer.current=null;
  if(!scope||scope==='guest')return true;
  chain.current=chain.current.then(async()=>{
   const jobs=Object.entries(pending.current);if(!jobs.length)return true;
   try{for(const [taskId,draft] of jobs){await api({action:'save',paperId:paperCatalogue.find(p=>p.tasks.some(t=>t.id===taskId))?.id,taskId,draft});if(JSON.stringify(pending.current[taskId])===JSON.stringify(draft))delete pending.current[taskId];recordOutbox(scope)}setSaveStatus(Object.keys(pending.current).length?'Saving…':'Saved to your account');return true}catch(e){setSaveStatus('Saved on this device · account sync pending');setError(e instanceof Error?e.message:'Account saving is unavailable.');return false}
  });return chain.current;
 },[scope,recordOutbox,api]);
 useEffect(()=>{flushRef.current=flush},[flush]);
 useEffect(()=>{
  if(!scope)return;let active=true;pending.current={};
  async function load(){
   try{
    let rows:PaperSession[]=[],next:PaperSession|null=null;
    if(scope==='guest'){rows=cached(scope);const choice=choosePaper(paperPool,rows);next=choice?(choice.session||fresh(choice.paperId)):null}
    else{pending.current=queued(scope!);const data=await api();rows=data.sessions||[];const params=new URLSearchParams(window.location.search),review=rows.find(r=>r.paperId===params.get('review')&&r.status==='complete');if(review){if(!active)return;setHistory(rows);update(review);setSelected(review.currentTask);setLoaded(scope!);setPhase('result');return}if(rows.length>1&&!params.get('task')){if(!active)return;setHistory(rows);setLoaded(scope!);setPhase('history');return}next=(await api({action:'start'})).session;}
    if(!active)return;setHistory(next?[...rows.filter(s=>s.paperId!==next!.paperId),next]:rows);
    if(scope==='guest'&&rows.length>1&&!new URLSearchParams(window.location.search).get('task')){setLoaded(scope);setPhase('history');return}
    if(next&&next.status!=='complete'){
     const paper2Tasks=paperById(next.paperId)?.tasks||[];
     const params=new URLSearchParams(window.location.search),requested=params.get('task');
     next={...next,answers:{...next.answers,...Object.fromEntries(Object.entries(pending.current).filter(([id])=>paper2Tasks.some(t=>t.id===id)))}};
     if(scope==='guest'){for(const t of paper2Tasks){if(!next.answers[t.id])try{const raw=localStorage.getItem(practicalDraftKey(scope,t.id));if(raw){const d=JSON.parse(raw);if(typeof d.text==='string'&&d.fields&&typeof d.choice==='string')next.answers[t.id]={text:d.text,fields:d.fields,choice:d.choice,language:t.kind==='sql'?'SQL':t.languages?.includes(d.language)?d.language:'Pseudocode'}}}catch{}}}
     // Import guest work only after the student explicitly followed the sign-in link here.
     if(scope!=='guest'&&params.get('transfer')==='guest'&&sessionStorage.getItem('bit-paper-transfer')==='yes'&&!Object.values(next.answers).some(answered)){
      const guest=cached('guest').find(s=>s.status==='in_progress'&&s.paperId===next!.paperId);
      if(guest){for(const [taskId,draft] of Object.entries(guest.answers))await api({action:'save',paperId:next.paperId,taskId,draft});next=(await api({action:'open',paperId:next.paperId,taskId:guest.currentTask})).session}sessionStorage.removeItem('bit-paper-transfer');params.delete('transfer');
     }else if(paper2Tasks.some(t=>t.id===requested))next.currentTask=requested!;
     if(!next)throw Error('Your paper could not be restored.');
     if(scope!=='guest')await api({action:'open',paperId:next.paperId,taskId:next.currentTask});
     if(!active)return;update(next);setSelected(next.currentTask);setPhase('question');saveCache(next,scope!);replaceLocation(next.currentTask);
    }else{const last=rows.filter(s=>s.status==='complete').sort((a,b)=>(b.completedAt||0)-(a.completedAt||0))[0]||null;update(last);setSelected(last?.currentTask||'');setPhase('result')}
    setLoaded(scope!);setSaveStatus(scope==='guest'?'Draft saved on this device':'Saved to your account');if(Object.keys(pending.current).length)void flushRef.current();
   }catch(e){if(active){setError(e instanceof Error?e.message:'Your paper could not be loaded.');setLoaded(scope!);const local=cached(scope!);setHistory(local);const next=local.find(s=>s.status!=='complete')||null;update(next);setSelected(next?.currentTask||'');setSaveStatus('Working from this device · account sync pending')}}
  }
  void load();return()=>{active=false;void flushRef.current()};
 },[scope,update,saveCache,api]);
 useEffect(()=>{const restore=()=>{const id=new URLSearchParams(window.location.search).get('task'),old=current.current;if(old&&paperById(old.paperId)?.tasks.some(t=>t.id===id)){setSelected(id!);setPhase('question');if(old.status==='in_progress'){const next={...old,currentTask:id!,updatedAt:Date.now()};update(next);if(scope)saveCache(next,scope);if(scope&&scope!=='guest')void api({action:'open',paperId:old.paperId,taskId:id}).catch(()=>{})}}else if(current.current?.status==='complete')setPhase('result')};window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore)},[scope,saveCache,update,api]);
 useEffect(()=>{
  if(!scope||scope==='guest'||session?.status!=='marking')return;
  const poll=setInterval(()=>{api().then(state=>{const next=state.sessions.find((s:PaperSession)=>s.paperId===current.current?.paperId);if(next&&next.status==='complete'){update(next);saveCache(next,scope);setBusy(false);setPhase('result')}else if(next&&next.status==='in_progress'){update(next);setBusy(false)}}).catch(()=>{})},5000);return()=>clearInterval(poll);
 },[scope,session?.status,update,saveCache,api]);
 function replaceLocation(id?:string,push=false){const url=new URL(window.location.href);url.searchParams.set('view','paper2');url.searchParams.delete('result');url.searchParams.delete('transfer');url.searchParams.delete('review');if(current.current?.status==='complete')url.searchParams.set('review',current.current.paperId);if(id)url.searchParams.set('task',id);else url.searchParams.delete('task');window.history[push?'pushState':'replaceState'](null,'',url.pathname+url.search)}
 function changeDraft(draft:CodeDraft){const old=current.current;if(!old||old.status!=='in_progress'||!scope)return;const next={...old,updatedAt:Date.now(),answers:{...old.answers,[selected]:draft}};update(next);const stored=saveCache(next,scope);setSaveStatus(stored?(scope==='guest'?'Draft saved on this device':'Saving…'):'Keep this page open · device saving unavailable');if(scope!=='guest'){pending.current[selected]=draft;recordOutbox(scope);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>void flush(),650)}}
 async function go(task:PracticalTask){const old=current.current;if(!old||busy)return;if(old.status==='complete'){setSelected(task.id);setPhase('question');replaceLocation(task.id,true);window.scrollTo({top:0,behavior:'instant'});return}await flush();const next={...current.current!,currentTask:task.id,updatedAt:Date.now()};update(next);setSelected(task.id);setPhase('question');replaceLocation(task.id,true);if(scope)saveCache(next,scope);if(scope&&scope!=='guest')try{await api({action:'open',paperId:next.paperId,taskId:task.id})}catch(e){setError(e instanceof Error?e.message:'Position could not sync.')}window.scrollTo({top:0,behavior:'instant'})}
 async function finish(){
  if(!current.current||busy)return;
  if(scope==='guest'){setError('Sign in to submit this paper for marking. Your answers are saved on this device.');return}
  setBusy(true);setError('');setPhase('submit');
  if(!await flush()){setBusy(false);return}
  try{
   while(mounted.current&&owner.current===scope){
    const data=await api({action:'finish',paperId:current.current!.paperId});if(!mounted.current||owner.current!==scope)return;
    update(data.session);saveCache(data.session,scope!);setHistory(rows=>[...rows.filter(s=>s.paperId!==data.session.paperId),data.session]);
    if(!data.pending){setPhase('result');replaceLocation();window.scrollTo({top:0,behavior:'instant'});break}
    setSaveStatus(`Marked ${Object.keys(data.session.results).length} of ${paper2Tasks.length} parts · progress saved`);
    await new Promise(resolve=>setTimeout(resolve,Math.max(750,data.retryAfterMs||1000)));
   }
  }catch(e){
   if(!mounted.current||owner.current!==scope)return;
   const partial=(e as {session?:PaperSession}).session;if(partial){update(partial);saveCache(partial,scope!)}
   setError(e instanceof Error?e.message:'Marking is unavailable. Your answers are safe.');
  }finally{if(mounted.current&&owner.current===scope)setBusy(false)}
 }
 useEffect(()=>{finishRef.current=finish});
 useEffect(()=>{if(loaded===scope&&session?.status==='marking'&&!busy&&phase==='question')void finishRef.current()},[loaded,scope,session?.status,busy,phase]);
 async function chooseFromHistory(saved?:PaperSession){
  if(busy)return;setBusy(true);setError('');let next=saved||null;
  try{if(!await flush())return;if(!next){if(scope==='guest'){const choice=choosePaper(paperPool,history,Math.random,false);next=choice?(choice.session||fresh(choice.paperId)):null}else next=(await api({action:'start',untried:true})).session}if(!next){setPhase('history');return}if(next.status==='in_progress'){const local=scope?cached(scope).find(s=>s.paperId===next!.paperId):null;if(local&&local.updatedAt>next.updatedAt)next={...next,answers:{...next.answers,...local.answers}}}update(next);setSelected(next.currentTask);setPhase(next.status==='complete'?'result':'question');if(scope)saveCache(next,scope);setHistory(rows=>[...rows.filter(s=>s.paperId!==next!.paperId),next!]);replaceLocation(next.status==='complete'?undefined:next.currentTask,true);window.scrollTo({top:0,behavior:'instant'})}catch(e){setError(e instanceof Error?e.message:'Your paper could not be opened.')}finally{setBusy(false)}
 }
 useEffect(()=>{const enter=()=>{if(history.length>1)setPhase('history')};window.addEventListener('bit-paper-entry',enter);return()=>window.removeEventListener('bit-paper-entry',enter)},[history]);
 const task=paper2Tasks.find(t=>t.id===selected),done=session?.status==='complete',answers=session?.answers||{},answerCount=paper2Tasks.filter(t=>answered(answers[t.id])).length;
 if(!scope||loaded!==scope)return <div className="paper2-loading" role="status"><LoaderCircle className="marking-spinner" size={20}/> Opening your paper…</div>;
 const errorPanel=error?<div className="practical-error" role="alert"><p>{error}</p>{scope==='guest'&&<a href="/sign-in?next=%2F%3Fview%3Dpaper2%26transfer%3Dguest" onClick={()=>sessionStorage.setItem('bit-paper-transfer','yes')}>Sign in to submit your saved answers</a>}</div>:null;
 if(phase==='history')return <><PaperHistory sessions={history} onReview={s=>void chooseFromHistory(s)} onContinue={s=>void chooseFromHistory(s)} onNew={()=>void chooseFromHistory()} hasNew={paperPool.some(p=>!history.some(s=>s.paperId===p.id))} busy={busy}/>{errorPanel}</>;
 if(session&&!paperById(session.paperId)){const label=paperLabel(session.paperId);return <section className="paper2-results"><button className="text-btn" onClick={()=>setPhase('history')}><ArrowLeft size={16}/> Your papers</button><h1>{label.code} · {label.title}</h1><p>{session.earned} / {session.maximumMarks} marks · Grade {session.grade}</p>{Object.entries(session.results).map(([taskId,result])=><div key={taskId}><h2>{result.question_id}</h2><MarkFeedback result={result} official/></div>)}</section>}
 if(!session)return <section className="paper2-results"><h1>{error?'Your paper is unavailable':'You’ve completed the available papers.'}</h1><p>{error?'Your saved work has not been removed.':'More papers can be added here later.'}</p>{errorPanel}<button className="btn secondary" onClick={()=>window.location.reload()}>Try again</button></section>;
 if(phase==='result'||phase==='submit')return <section className="paper2-results">{history.length>1&&<button className="text-btn" onClick={()=>setPhase('history')}><ArrowLeft size={16}/> Your papers</button>}{!done&&<button className="text-btn" disabled={busy} onClick={()=>setPhase('question')}><ArrowLeft size={16}/> Back to your answer</button>}<div className="paper2-result-heading"><span className="paper2-result-icon">{busy?<LoaderCircle size={26} className="marking-spinner"/>:<CheckCircle2 size={26}/>}</span><h1>{done?'Your paper result':busy?'Marking your paper…':'Ready to submit?'}</h1><p>Cambridge O Level Computer Science<br/><strong>{paper.code} · {paper.title}</strong></p></div>{done?<><div className="paper2-score"><span>{session.requiresReview?'Provisional score':'Your score'}</span><div><strong>{session.earned}</strong><span>/ {session.maximumMarks}</span></div><p className="paper2-grade">Estimated Paper 2 grade <b>{session.grade==='U'?'Below E':session.grade}</b></p></div><p className="paper2-result-note">{session.requiresReview?'Some answers need a teacher’s review. ':''}This is a practice estimate for Paper 2. The full qualification grade uses both papers.</p><div className="paper2-result-actions"><button className="btn" disabled={busy} onClick={()=>void chooseFromHistory()}>{paperPool.some(p=>!history.some(s=>s.paperId===p.id))?'Start another paper':'Your papers'} <ArrowRight size={16}/></button><button className="btn secondary" onClick={()=>void go(paper2Tasks[0])}>Review answers</button><button className="text-btn" onClick={()=>setPhase('history')}>Your papers</button>{!paperPool.some(p=>!history.some(s=>s.paperId===p.id))&&<p>You’ve tried every available paper. You can review all six in Your papers.</p>}</div><PaperGradeScale thresholds={paper.thresholds} maximum={paper.marks} mark={session.earned||0} source={paper.thresholdSource}/></>:busy?<p className="paper2-result-note" role="status">{saveStatus.includes('Marked')?saveStatus:'Checking your answers…'}<br/>You can leave and return; marking progress is saved.</p>:<p className="paper2-result-note">{answerCount} of {paper2Tasks.length} parts contain an answer.{answerCount<paper2Tasks.length?' Unanswered parts will receive 0 marks.':''} Submit when you are ready; your completed paper will not be assigned again.</p>}<div className="paper2-results-breakdown">{groups.map(({n,parts})=>{const earned=parts.reduce((sum,t)=>sum+(session.results[t.id]?.marks_awarded||0),0),max=parts.reduce((sum,t)=>sum+t.examMarks!,0),count=parts.filter(t=>answered(answers[t.id])).length;return <button key={n} disabled={busy} onClick={()=>void go(parts[0])}><span>Question {n}<small>{done?'View feedback':`${count}/${parts.length} parts answered`}</small></span>{done&&<strong>{earned} <span>/ {max}</span></strong>}<ArrowRight size={16}/></button>})}</div>{errorPanel}{!done&&<button className="btn" disabled={busy} onClick={()=>void finish()}>{busy?<><LoaderCircle size={16} className="marking-spinner"/> Marking…</>:<>Submit for marking <ArrowRight size={16}/></>}</button>}<p className="paper2-credit">Automatically marked using Cambridge’s published scheme. Check uncertain results with your teacher. Question content © UCLES {paper.year}.</p></section>;
 if(!task)return <p role="alert">This question could not be found.</p>;
 const identifiers=Array.from(new Set([...(task.readingTables||[]).flatMap(t=>t.headings),...(task.table?.headings||[]),...Array.from((task.code||'').matchAll(/\b(?:DECLARE|INPUT)\s+([A-Za-z_]\w*)|\b([A-Za-z_]\w*)\s*←/g),m=>m[1]||m[2]),...Array.from(((task.context||'')+' '+task.prompt).matchAll(/\b([A-Za-z_]\w*)\[.*?\]|\b([A-Za-z_]\w*[a-z][A-Z]\w*)\b/g),m=>m[1]||m[2])])).filter(n=>n!=='OUTPUT');
 const index=paper2Tasks.indexOf(task),siblings=paper2Tasks.filter(t=>t.question===task.question),locked=done||busy||session.status==='marking';
 return <article className="paper2-task"><div className="paper2-workspace-bar"><button className="text-btn" disabled={busy} onClick={()=>{void flush();onExit?.()}}><ArrowLeft size={16}/> Pause</button><span>{paper.code} · {paper.year} · Part {index+1} of {paper2Tasks.length}</span><button className="text-btn" disabled={busy} onClick={()=>{setPhase(done?'result':'submit');window.scrollTo({top:0,behavior:'instant'})}}><Flag size={14}/>{done?'View result':'Finish paper'}</button></div><nav className="paper2-question-nav" aria-label="Jump to a question">{groups.map(({n,parts})=><button key={n} aria-label={`Question ${n}`} disabled={busy} aria-current={task.question===n?'step':undefined} className={task.question===n?'active':parts.every(t=>answered(answers[t.id]))?'complete':''} onClick={()=>void go(parts[0])}>{n}</button>)}</nav><header className="paper2-task-heading"><h1>Question {task.question}{partLabel(task.part)}</h1><span>{task.examMarks} {task.examMarks===1?'mark':'marks'}</span></header><section className="paper2-prompt" aria-label="Question"><div className="paper2-question-copy">{paper.legacy&&<p className="paper2-legacy-note">Earlier syllabus · {paper.marks} marks{task.legacySkill?' · '+task.legacySkill:''}</p>}{task.question===1&&paper.scenario&&<details className="paper2-scenario" open><summary>{paper.scenario.title}</summary><QuestionPassage text={paper.scenario.text}/><ReadTable data={paper.scenario.table}/></details>}{task.context&&<QuestionPassage text={task.context} identifiers={identifiers}/>}{task.readingTables?.map((data,i)=><ReadTable key={i} data={data}/>)}{task.figure&&<figure className={'paper2-original-figure'+(task.figure.includes('q3')?' paper2-gate-options':'')}><img src={task.figure} alt={task.figureAlt||'Figure supplied with the question'}/></figure>}{task.code&&<div className="paper2-source-code"><AnswerCode text={task.code} numbered={task.question!==7}/></div>}{paper.id==='2210-w25-23'&&task.question===6&&<details className="paper2-diagram" open><summary>Search flowchart</summary><SearchFlowchart/></details>}<QuestionPassage text={task.prompt} instruction identifiers={identifiers}/></div><div className="paper2-format">{format(task)}</div></section>{siblings.length>1&&<nav className="paper2-siblings" aria-label="Question parts">{siblings.map(t=><button key={t.id} disabled={busy} className={t.id===task.id?'active':''} aria-pressed={t.id===task.id} onClick={()=>void go(t)}>{partLabel(t.part)}</button>)}</nav>}<PracticalAnswer key={task.id} task={task} draft={answers[task.id]||emptyCodeDraft(task)} onDraft={changeDraft} readOnly={locked} result={session.results[task.id]} saveStatus={saveStatus}/>{errorPanel}<div className="paper2-task-navigation"><button className="text-btn" disabled={index===0||busy} onClick={()=>void go(paper2Tasks[index-1])}><ArrowLeft size={16}/> Previous</button><button className="btn secondary" disabled={busy} onClick={()=>index===paper2Tasks.length-1?setPhase(done?'result':'submit'):void go(paper2Tasks[index+1])}>{index===paper2Tasks.length-1?(done?'View result':'Finish paper'):'Next part'} <ArrowRight size={16}/></button></div><details className="paper2-prerequisites"><summary>Need to revisit a skill?</summary>{task.requires.map(id=>{const i=lessons.findIndex(l=>l.id===id);return i<0?null:<button key={id} className="text-btn" onClick={()=>{void flush();onLesson(i)}}>{lessons[i].title} <ArrowRight size={14}/></button>})}</details></article>;
}

function ReadTable({data}:{data:{headings:string[],rows:string[][]}}){return <div className="practical-table paper2-reading-table"><table><thead><tr>{data.headings.map((h,i)=><th key={i} scope="col">{h}</th>)}</tr></thead><tbody>{data.rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div>}

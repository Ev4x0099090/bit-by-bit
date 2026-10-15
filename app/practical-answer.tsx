'use client';
import dynamic from 'next/dynamic';
import {useEffect,useId,useRef,useState} from 'react';
import {ChevronRight,FileCode2,Lightbulb,LoaderCircle} from 'lucide-react';
import type {PracticalTask} from '@/lib/course-paper2-practice';
import type {Attempt} from '@/lib/engine';
import type {CodeDraft,MarkResult} from '@/lib/paper-practice-types';
import {practicalDraftKey} from '@/lib/practical-drafts';
import {usePracticalScope} from './practical-session';
import {MarkFeedback} from './mark-feedback';
import {DiagramAnswer} from './diagram-answer';
const CodeEditor=dynamic(()=>import('./code-editor').then(m=>m.CodeEditor),{ssr:false,loading:()=> <div className="editor-loading">Loading editor…</div>});
export const emptyCodeDraft=(task:PracticalTask):CodeDraft=>({text:'',fields:{},choice:'',language:task.kind==='sql'?'SQL':task.languages?.[0]||'Pseudocode'});
export function PracticalAnswer({task,draft:controlled,onDraft,readOnly=false,result:paperResult,saveStatus}:{task:PracticalTask,draft?:CodeDraft,onDraft?:(d:CodeDraft)=>void,readOnly?:boolean,result?:MarkResult,saveStatus?:string,onAttempt?:(a:Attempt)=>void,onError?:(s:string)=>void}){
 const scope=usePracticalScope(),inputId=useId(),edited=useRef(false);
 const [local,setLocal]=useState<CodeDraft>(()=>emptyCodeDraft(task)),[loaded,setLoaded]=useState(''),[deviceStatus,setDeviceStatus]=useState('Loading your draft…'),[hint,setHint]=useState(0),[busy,setBusy]=useState(false),[result,setResult]=useState<MarkResult|undefined>(),[error,setError]=useState('');
 const key=scope?practicalDraftKey(scope,task.id):'',draft=controlled??local,ready=!!controlled||!!key&&loaded===key,isCode=['code','sql'].includes(task.kind),locked=readOnly||busy;
 useEffect(()=>{
  if(controlled||!key||loaded===key)return;let next=emptyCodeDraft(task);
  try{const raw=localStorage.getItem(key);if(raw){const p=JSON.parse(raw);next={text:typeof p.text==='string'?p.text.slice(0,12000):'',choice:typeof p.choice==='string'?p.choice:'',fields:p.fields&&typeof p.fields==='object'&&!Array.isArray(p.fields)?Object.fromEntries(Object.entries(p.fields).filter((e):e is [string,string]=>typeof e[1]==='string')):{},language:task.kind==='sql'?'SQL':task.languages?.includes(p.language)?p.language:'Pseudocode'}}}catch{}
  // Restore this account's external device draft before allowing changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setLocal(next);setLoaded(key);setResult(undefined);edited.current=false;
 },[controlled,key,loaded,task]);
 useEffect(()=>{
  if(controlled||!key||loaded!==key)return;
  // eslint-disable-next-line react-hooks/set-state-in-effect -- Reflect the external storage write result.
  try{localStorage.setItem(key,JSON.stringify(local));setDeviceStatus('Draft saved on this device')}catch{setDeviceStatus('Device saving is unavailable. Keep this page open.')}
  // The status reports an external storage write, not a value derived from React state.
 },[local,key,loaded,controlled]);
 useEffect(()=>{
  if(controlled||!scope||scope==='guest')return;let active=true;
  fetch('/api/paper-practice').then(r=>r.ok?r.json():null).then(state=>{if(!active||edited.current)return;const saved=state?.lessonResults?.find((r:{taskId:string})=>r.taskId===task.id);if(saved){setResult(saved.result);setLocal(saved.draft)}}).catch(()=>{});return()=>{active=false};
 },[controlled,scope,task.id]);
 function change(patch:Partial<CodeDraft>){const next={...draft,...patch};edited.current=true;setResult(undefined);setError('');if(onDraft)onDraft(next);else setLocal(next)}
 const feedback=paperResult??result,hasAnswer=!!draft.text.trim()||!!draft.choice||Object.values(draft.fields).some(v=>v.trim());
 const fileName=task.kind==='sql'?'answer.sql':({'Python':'answer.py','Java':'answer.java','Visual Basic':'answer.vb'} as Record<string,string>)[draft.language]||'answer.pseudo';
 async function mark(){setBusy(true);setError('');try{const response=await fetch('/api/paper-practice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'lesson-mark',taskId:task.id,draft,expectedUserId:scope})});const body=await response.json();if(!response.ok)throw Error(body.error||'Marking is unavailable.');setResult(body.lessonResult.result)}catch(e){setError(e instanceof Error?e.message:'Marking is unavailable. Your draft is safe.')}finally{setBusy(false)}}
 const editableTable=task.table&&['trace','matching'].includes(task.kind);
 return <div className="practical-answer" data-practical-task={task.id}>
  <div className="practical-answer-heading"><h2>Your answer</h2>{isCode&&<span>{draft.language}</span>}</div>
  {task.kind==='choice'&&<fieldset disabled={locked||!ready}><legend className="sr-only">Choose your answer</legend>{task.choices?.map(choice=><label key={choice} className="practical-choice"><input type="radio" name={task.id} checked={draft.choice===choice} onChange={()=>change({choice})}/>{choice}</label>)}</fieldset>}
  {task.table&&<div className="practical-table"><table><caption className="sr-only">{editableTable?'Complete the answer cells':'Question data'}</caption><thead><tr>{task.table.headings.map(h=><th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{task.table.rows.map((row,r)=><tr key={r}>{row.map((cell,c)=><td key={c}>{cell||!editableTable?cell:task.kind==='matching'?<select aria-label={`${task.table!.headings[c]}, ${row[0]}`} disabled={locked||!ready} value={draft.fields[`${r}-${c}`]||''} onChange={e=>change({fields:{...draft.fields,[`${r}-${c}`]:e.target.value}})}><option value="">Choose</option>{task.choices?.map(v=><option key={v}>{v}</option>)}</select>:<input aria-label={`${task.table!.headings[c]}, row ${r+1}`} value={draft.fields[`${r}-${c}`]||''} disabled={locked||!ready} maxLength={120} onChange={e=>change({fields:{...draft.fields,[`${r}-${c}`]:e.target.value}})}/>}</td>)}</tr>)}</tbody></table></div>}
  {task.kind==='diagram'&&<DiagramAnswer value={draft.text} onChange={text=>change({text})} mode={task.diagramMode||'flowchart'} readOnly={locked||!ready}/>}
  {!['choice','matching','diagram'].includes(task.kind)&&(isCode?<div className="practical-code-frame"><div className="practical-filebar"><span><FileCode2 size={16}/>{fileName}</span>{task.languages?<select aria-label="Answer language" disabled={locked||!ready} value={draft.language} onChange={e=>change({language:e.target.value})}>{task.languages.map(l=><option key={l}>{l}</option>)}</select>:<span className="practical-file-language">{draft.language}</span>}</div><CodeEditor value={draft.text} language={draft.language} readOnly={locked||!ready} onChange={text=>change({text})} label={`Write your ${draft.language} answer`}/></div>:<label className="practical-writing" htmlFor={inputId}><span className="sr-only">{task.kind==='trace'?'Working or explanation (optional)':'Your answer'}</span><textarea id={inputId} rows={task.kind==='trace'?3:6} readOnly={locked} disabled={!ready} value={draft.text} maxLength={12000} spellCheck={task.kind!=='logic'} onChange={e=>change({text:e.target.value})} placeholder={task.kind==='trace'?'Add any working here (optional)…':'Write your answer here…'}/></label>)}
  <div className="practical-draft-info"><span role="status">{saveStatus||(controlled?(readOnly?'Saved answer':'Draft saved on this device'):deviceStatus)}</span>{!['choice','matching'].includes(task.kind)&&<span>{draft.text.length} / 12000</span>}</div>
  {!readOnly&&<div className="practical-actions">{!controlled&&<button className="btn" disabled={!ready||!hasAnswer||busy} onClick={mark}>{busy?<><LoaderCircle size={16} className="marking-spinner"/> Checking…</>:<>Check my solution <ChevronRight size={16}/></>}</button>}{task.hints.length>0&&<button className="text-btn" disabled={hint===task.hints.length} onClick={()=>setHint(h=>h+1)}><Lightbulb size={16}/>{hint===task.hints.length?'All hints shown':hint?'Next hint':'Need a hint?'}</button>}</div>}
  {hint>0&&<ol className="practical-hints">{task.hints.slice(0,hint).map(([title,example],i)=><li key={title}><span>{i+1}</span><div><strong>{title}</strong><pre>{example}</pre></div></li>)}</ol>}
  {error&&<div className="practical-error" role="alert"><p>{error}</p>{error.includes('Sign in')&&<a href={'/sign-in?next='+encodeURIComponent(typeof window==='undefined'?'/':window.location.pathname+window.location.search)}>Sign in to get feedback</a>}</div>}
  {feedback&&<MarkFeedback result={feedback} official={!!task.examMarks} example={{text:task.model,code:isCode}}/>}
 </div>;
}

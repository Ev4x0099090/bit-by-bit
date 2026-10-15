import type {CodeDraft,LessonCodeResult,MarkResult,PaperSession} from './types.ts';
import {type MarkQuestion,validDraft,hasAnswer} from './grading.ts';
import {choosePaper,gradeForPaper} from './selection.ts';
export type PaperDefinition={id:string,taskIds:string[],thresholds:{grade:string,minimum:number}[],maximumMarks?:number};
export type PaperServices={authenticate:(token:string)=>Promise<string|null>,read:(uid:string)=>Promise<{sessions:PaperSession[],lessonResults:LessonCodeResult[]}>,open:(uid:string,paperId:string,taskId:string,draft?:CodeDraft)=>Promise<PaperSession>,acquire:(uid:string,paperId:string)=>Promise<PaperSession>,progress:(uid:string,paperId:string,results:Record<string,MarkResult>)=>Promise<PaperSession>,finish:(uid:string,paperId:string,results:Record<string,MarkResult>,earned:number,grade:string)=>Promise<PaperSession>,release:(uid:string,paperId:string)=>Promise<void>,reserve:(uid:string)=>Promise<void>,mark:(questions:MarkQuestion[],answers:Record<string,CodeDraft>)=>Promise<Record<string,MarkResult>>,saveLesson:(uid:string,taskId:string,draft:CodeDraft,result:MarkResult)=>Promise<LessonCodeResult>,configured:()=>boolean};
const headers={'Content-Type':'application/json','Cache-Control':'private, no-store'};
const reply=(value:unknown,status=200)=>new Response(JSON.stringify(value),{status,headers});
export function paperHandler(services:PaperServices,papers:PaperDefinition[],questions:MarkQuestion[],lessonIds:string[]){
 const bank=new Map(questions.map(q=>[q.id,q])),lessonSet=new Set(lessonIds);
 return async(request:Request)=>{
  if(request.method==='GET'&&new URL(request.url).searchParams.get('health')==='1')return reply({configured:services.configured(),model:'openai/gpt-oss-120b'});
  if(!['GET','POST'].includes(request.method))return reply({error:'Method not allowed.'},405);
  const token=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!token)return reply({error:'Sign in to save answers and get marking.'},401);
  let uid;try{uid=await services.authenticate(token)}catch{return reply({error:'Sign-in is unavailable. Try again.'},503)}if(!uid)return reply({error:'Sign in to save answers and get marking.'},401);
  let acquired:string|null=null,working:Record<string,MarkResult>={};
  try{
   if(request.method==='GET')return reply({...await services.read(uid),authenticated:true,configured:services.configured()});
   if(Number(request.headers.get('content-length'))>80000)return reply({error:'Request too large.'},413);const text=await request.text();if(text.length>80000)return reply({error:'Request too large.'},413);
   let p:any;try{p=JSON.parse(text)}catch{return reply({error:'Invalid request.'},400)}if(!p||typeof p!=='object'||Array.isArray(p))return reply({error:'Invalid request.'},400);
   if(p.expectedUserId!==uid)return reply({error:'Your account changed. Reload this page before continuing.'},409);
   if(p.action==='start'){
    const state=await services.read(uid),selected=choosePaper(papers,state.sessions,Math.random,p.untried!==true);
    return reply({session:selected?selected.session||await services.open(uid,selected.paperId,papers.find(p=>p.id===selected.paperId)!.taskIds[0]):null});
   }
   if(p.action==='lesson-mark'){
    const q=bank.get(p.taskId);if(!q||!lessonSet.has(q.id)||!validDraft(q,p.draft))return reply({error:'Unknown writing exercise or invalid answer.'},400);
    if(!services.configured())throw Error('groq_not_configured');await services.reserve(uid);const results=await services.mark([q],{[q.id]:p.draft});return reply({lessonResult:await services.saveLesson(uid,q.id,p.draft,results[q.id])});
   }
   const paper=papers.find(paper=>paper.id===p.paperId);if(!paper)return reply({error:'Unknown paper.'},400);
   if(['open','save'].includes(p.action)){
    const q=bank.get(p.taskId);if(!q||!paper.taskIds.includes(q.id)||p.action==='save'&&!validDraft(q,p.draft))return reply({error:'Unknown question or invalid answer.'},400);
    return reply({session:await services.open(uid,paper.id,q.id,p.action==='save'?p.draft:undefined)});
   }
   if(p.action!=='finish')return reply({error:'Invalid action.'},400);
   const session=await services.acquire(uid,paper.id);if(session.status==='complete')return reply({session});acquired=paper.id;
   if(!services.configured())throw Error('groq_not_configured');
   const tasks=paper.taskIds.map(id=>bank.get(id)!),todo=tasks.filter(q=>!session.results[q.id]);working={...session.results};
   const fixed=todo.filter(q=>!hasAnswer(session.answers[q.id])||q.deterministic);
   if(fixed.length)Object.assign(working,await services.mark(fixed,session.answers));
   const next=todo.find(q=>hasAnswer(session.answers[q.id])&&!q.deterministic);
   if(next){await services.reserve(uid);Object.assign(working,await services.mark([next],session.answers))}
   const results=working;
   if(tasks.some(q=>!results[q.id])){const partial=await services.progress(uid,paper.id,results);acquired=null;return reply({session:partial,pending:true,retryAfterMs:1000})}
   const earned=tasks.reduce((total,q)=>total+results[q.id].marks_awarded,0),grade=gradeForPaper(earned,paper.thresholds,paper.maximumMarks||75);
   const finished=await services.finish(uid,paper.id,results,earned,grade);acquired=null;return reply({session:finished});
  }catch(e){
   const reason=e instanceof Error?e.message:'';
   if(reason==='paper_marking_busy'){const state=await services.read(uid);const running=state.sessions.find(s=>s.status==='marking');if(running)return reply({session:running,pending:true,retryAfterMs:5000})}
   let partial:PaperSession|undefined;
   if(acquired)try{partial=await services.progress(uid,acquired,working)}catch{try{await services.release(uid,acquired)}catch{}}
   if(partial&&['groq_rate_limit','ai_minute_limit','paper_marking_busy'].includes(reason))return reply({session:partial,pending:true,retryAfterMs:Math.max(5000,Math.min(90000,(e as {retryAfterMs?:number}).retryAfterMs||61000))});
   const messages:Record<string,[string,number]>={ai_daily_limit:['You have reached today’s marking limit. Try again tomorrow; your answers are saved.',429],ai_minute_limit:['Please wait a minute before marking another answer.',429],groq_not_configured:['marking has not been configured yet. Your answers are safe.',503],groq_request_limit:['This answer exceeds the provider’s current request allowance. Your work is saved; try a shorter answer or return later.',429],groq_key_rejected:['The marking service needs its API key checked. Your answers are safe.',503],groq_rate_limit:['The marking provider is busy. Wait a little and submit again; your answers are safe.',429],ai_rate_limit:['You have reached the marking limit. Please try again later; your answers are safe.',429],paper_marking_busy:['This paper is already being marked. Please wait before trying again.',409],invalid_ai_result:['The marking response could not be verified. No marks were saved. Please try again.',502],incomplete_ai_result:['The marking response was incomplete. No marks were saved. Please try again.',502],unknown_paper_session:['Start this paper before submitting it.',400]};
   const [message,status]=messages[reason]||['Marking or saving is temporarily unavailable. Your answers are safe; please try again.',503];return reply({error:message,code:messages[reason]?reason:'unavailable',...partial?{session:partial}:{}},status);
  }
 };
}

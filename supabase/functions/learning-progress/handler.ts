import {mark} from './marking.ts';
type Question={id:string,objective:string,type:string,answer?:string,prompt:string,marks:number,model:string};
type Saved={id:string,objective:string,question_id:string,answer:string,earned:number,possible:number,confidence:number,at:number,self:boolean};
export type ProgressServices={
 authenticate:(token:string)=>Promise<string|null>;
 read:(userId:string)=>Promise<{completed:string[],attempts:Saved[]}>;
 complete:(userId:string,lessonId:string)=>Promise<void>;
 save:(userId:string,q:Question,answer:string,earned:number,confidence:number)=>Promise<Saved>;
};
const headers={'Content-Type':'application/json','Cache-Control':'private, no-store'};
const reply=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers});
const error=(message:string,status:number)=>reply({error:message},status);
const attempt=(a:Saved)=>({id:a.id,objective:a.objective,questionId:a.question_id,answer:a.answer,earned:a.earned,possible:a.possible,confidence:a.confidence,at:Number(a.at),self:a.self});
export function progressHandler(services:ProgressServices,lessons:string[],questions:Question[]){
 const bank=new Map(questions.map(q=>[q.id,q])),known=new Set(lessons);
 return async(request:Request)=>{
  if(!['GET','POST'].includes(request.method))return error('Method not allowed.',405);
  const authorization=request.headers.get('authorization')||'';
  if(!authorization.startsWith('Bearer '))return error('Sign in to save and view your progress.',401);
  let uid:string|null;try{uid=await services.authenticate(authorization.slice(7))}catch{return error('Sign-in is unavailable. Please try again.',503)}
  if(!uid)return error('Sign in to save and view your progress.',401);
  try{
   if(request.method==='GET'){const data=await services.read(uid);return reply({completed:data.completed,attempts:data.attempts.map(attempt),authenticated:true})}
   if(Number(request.headers.get('content-length'))>16000)return error('Request too large.',413);
   const raw=await request.text();if(raw.length>16000)return error('Request too large.',413);
   let p:any;try{p=JSON.parse(raw)}catch{return error('Invalid JSON.',400)}
   if(!p||typeof p!=='object'||Array.isArray(p))return error('Invalid request.',400);
   if(p.action==='complete'){
    if(typeof p.lessonId!=='string'||!known.has(p.lessonId))return error('Unknown lesson.',400);
    await services.complete(uid,p.lessonId);return reply({saved:true});
   }
   if(p.action!=='answer'||typeof p.questionId!=='string'||typeof p.answer!=='string'||!p.answer.trim()||p.answer.trim().length>4000||!Number.isInteger(p.confidence)||p.confidence<1||p.confidence>5)return error('Invalid answer or request.',400);
   const q=bank.get(p.questionId);if(!q)return error('Unknown question.',400);
   let earned:number;
   if(q.type==='written'){
    if(!Array.isArray(p.rubric)||p.rubric.length!==q.marks||!p.rubric.every((v:unknown)=>typeof v==='boolean'))return error('Review each rubric point.',400);
    earned=p.rubric.filter(Boolean).length;
   }else earned=mark(q,p.answer.trim());
   const saved=await services.save(uid,q,p.answer.trim(),earned,p.confidence);
   return reply({attempt:attempt(saved),model:q.model});
  }catch(e){
   if(e instanceof Error&&e.message==='attempt_rate_limit')return error('Please pause before submitting more answers.',429);
   console.error('Progress request failed');return error('Progress could not be saved or loaded. Please try again.',503);
  }
 };
}

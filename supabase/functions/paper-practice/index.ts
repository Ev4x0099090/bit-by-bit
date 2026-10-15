import {createClient} from 'npm:@supabase/supabase-js@2.117.3';
import {paperHandler} from './handler.ts';
import {markAnswers} from './grading.ts';
import bank from './bank.json' with {type:'json'};
const url=Deno.env.get('SUPABASE_URL')!,key=Deno.env.get('GROQ_API_KEY')||'';
const publicKey=JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS')||'{}').default||Deno.env.get('SUPABASE_ANON_KEY')!;
const secretKey=JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS')||'{}').default||Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const admin=createClient(url,secretKey,{auth:{persistSession:false,autoRefreshToken:false}});
const session=(r:any)=>({paperId:r.paper_id,currentTask:r.current_task,startedAt:Number(r.started_at),updatedAt:Number(r.updated_at),completedAt:r.completed_at===null?null:Number(r.completed_at),status:r.status,answers:r.answers,results:r.results,earned:r.earned,maximumMarks:r.maximum_marks,grade:r.grade,requiresReview:r.requires_review});
function failure(error:any){if(error)throw Error(['ai_minute_limit','ai_daily_limit','ai_rate_limit','paper_marking_busy','unknown_paper_session'].find(s=>error.message?.includes(s))||'storage_unavailable')}
const handler=paperHandler({
 configured:()=>!!key,
 async authenticate(token){const auth=createClient(url,publicKey,{auth:{persistSession:false,autoRefreshToken:false}});const {data,error}=await auth.auth.getUser(token);return error?null:data.user?.id||null},
 async read(uid){const [p,c]=await Promise.all([admin.from('learning_paper_sessions').select('*').eq('user_id',uid).order('updated_at',{ascending:false}),admin.from('learning_code_results').select('task_id,draft,result,at').eq('user_id',uid)]);failure(p.error);failure(c.error);return {sessions:p.data!.map(session),lessonResults:c.data!.map(r=>({taskId:r.task_id,draft:r.draft,result:r.result,at:Number(r.at)}))}},
 async open(uid,paperId,taskId,draft){const {data,error}=await admin.rpc('save_learning_paper_draft',{p_user_id:uid,p_paper_id:paperId,p_task_id:taskId,p_draft:draft??null});failure(error);return session(Array.isArray(data)?data[0]:data)},
 async acquire(uid,paperId){const {data,error}=await admin.rpc('acquire_learning_paper_marking',{p_user_id:uid,p_paper_id:paperId});failure(error);return session(Array.isArray(data)?data[0]:data)},
 async progress(uid,paperId,results){const {data,error}=await admin.from('learning_paper_sessions').update({results,lease_until:null,updated_at:Date.now()}).eq('user_id',uid).eq('paper_id',paperId).eq('status','marking').select('*').single();failure(error);return session(data)},
 async release(uid,paperId){const {error}=await admin.from('learning_paper_sessions').update({lease_until:null}).eq('user_id',uid).eq('paper_id',paperId).eq('status','marking');failure(error)},
 async reserve(uid){const {error}=await admin.rpc('reserve_learning_ai_request',{p_user_id:uid});failure(error)},
 mark:(questions,answers)=>markAnswers(questions,answers,key),
 async finish(uid,paperId,results,earned,grade){const {data,error}=await admin.from('learning_paper_sessions').update({results,earned,grade,requires_review:Object.values(results).some(r=>r.requires_review),status:'complete',completed_at:Date.now(),updated_at:Date.now(),lease_until:null}).eq('user_id',uid).eq('paper_id',paperId).eq('status','marking').select('*').single();failure(error);return session(data)},
 async saveLesson(uid,taskId,draft,result){const at=Date.now();const {error}=await admin.from('learning_code_results').upsert({user_id:uid,task_id:taskId,draft,result,at},{onConflict:'user_id,task_id'});failure(error);return {taskId,draft,result,at}}
},bank.papers,bank.questions,bank.lessonIds);
// Every non-health request is authenticated with the Auth server above.
Deno.serve(handler);

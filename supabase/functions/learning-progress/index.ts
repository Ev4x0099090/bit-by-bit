import {createClient} from 'npm:@supabase/supabase-js@2.117.3';
import {progressHandler} from './handler.ts';
import bank from './question-bank.json' with {type:'json'};
const url=Deno.env.get('SUPABASE_URL')!;
const publicKeys=JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS')||'{}');
const secretKeys=JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS')||'{}');
const publicKey=publicKeys.default||Deno.env.get('SUPABASE_ANON_KEY')!;
const secretKey=secretKeys.default||Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const admin=createClient(url,secretKey,{auth:{persistSession:false,autoRefreshToken:false}});
const handler=progressHandler({
 async authenticate(token){
  // Ask the Auth server to verify the token. Never accept a caller-provided user ID.
  const auth=createClient(url,publicKey,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await auth.auth.getUser(token);return error?null:data.user?.id||null;
 },
 async read(uid){
  const c=await admin.from('learning_completions').select('lesson_id').eq('user_id',uid).order('at');if(c.error)throw new Error('storage_unavailable');
  const attempts=[];
  for(let offset=0;;offset+=1000){const a=await admin.from('learning_attempts').select('id,objective,question_id,answer,earned,possible,confidence,at,self').eq('user_id',uid).order('at').order('id').range(offset,offset+999);if(a.error)throw new Error('storage_unavailable');attempts.push(...a.data);if(a.data.length<1000)break}
  return {completed:c.data.map(row=>row.lesson_id),attempts};
 },
 async complete(uid,lessonId){const {error}=await admin.from('learning_completions').upsert({user_id:uid,lesson_id:lessonId,at:Date.now()},{onConflict:'user_id,lesson_id',ignoreDuplicates:true});if(error)throw new Error('storage_unavailable')},
 async save(uid,q,answer,earned,confidence){const {data,error}=await admin.rpc('save_learning_attempt',{p_user_id:uid,p_objective:q.objective,p_question_id:q.id,p_answer:answer,p_earned:earned,p_possible:q.marks,p_confidence:confidence,p_self:q.type==='written'});if(error)throw new Error(error.message.includes('attempt_rate_limit')?'attempt_rate_limit':'storage_unavailable');return Array.isArray(data)?data[0]:data}
},bank.lessons,bank.questions);
// Auth-server verification above supports current asymmetric JWT signing keys.
Deno.serve(handler);

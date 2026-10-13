import {createClient} from '@/lib/supabase/server';
import {supabaseConfigured,publicSupabaseConfig} from '@/lib/supabase/config';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store'};
const fail=(error:string,status:number)=>Response.json({error},{status,headers});
async function forward(request:Request){
 if(request.method==='POST'){try{const origin=new URL(request.headers.get('origin')||'');if(!['https:','http:'].includes(origin.protocol)||origin.host!==request.headers.get('host'))return fail('Invalid origin.',403)}catch{return fail('Invalid origin.',403)}}
 if(!supabaseConfigured())return request.method==='GET'?Response.json({completed:[],attempts:[],authenticated:false},{headers}):fail('Sign in to save your progress.',401);
 const supabase=await createClient();
 const {data:{user},error}=await supabase.auth.getUser();
 if(error||!user)return request.method==='GET'?Response.json({completed:[],attempts:[],authenticated:false},{headers}):fail('Sign in to save your progress.',401);
 // getUser verified this session. Send its token only to this project's backend.
 const {data:{session}}=await supabase.auth.getSession();if(!session)return fail('Sign in to save your progress.',401);
 let body:string|undefined;if(request.method==='POST'){if(Number(request.headers.get('content-length'))>16000)return fail('Request too large.',413);body=await request.text();if(body.length>16000)return fail('Request too large.',413)}
 const {url,key}=publicSupabaseConfig();
 try{
  const response=await fetch(url+'/functions/v1/learning-progress',{method:request.method,headers:{Authorization:'Bearer '+session.access_token,apikey:key,...body?{'Content-Type':'application/json'}:{}},body,cache:'no-store',signal:AbortSignal.timeout(20000)});
  return new Response(await response.text(),{status:response.status,headers:{...headers,'Content-Type':'application/json'}});
 }catch{return fail('Progress is unavailable. Please try again.',503)}
}
export async function GET(request:Request){return forward(request)}
export async function POST(request:Request){return forward(request)}

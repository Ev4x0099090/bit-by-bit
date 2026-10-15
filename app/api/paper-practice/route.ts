import {createClient} from '@/lib/supabase/server';
import {publicSupabaseConfig,supabaseConfigured} from '@/lib/supabase/config';
export const dynamic='force-dynamic';
export const maxDuration=180;
const headers={'Cache-Control':'private, no-store'};
const fail=(error:string,status:number)=>Response.json({error},{status,headers});
async function forward(request:Request){
 if(request.method==='POST'){try{const origin=new URL(request.headers.get('origin')||'');if(!['https:','http:'].includes(origin.protocol)||origin.host!==request.headers.get('host'))return fail('Invalid origin.',403)}catch{return fail('Invalid origin.',403)}}
 if(!supabaseConfigured())return request.method==='GET'?Response.json({sessions:[],lessonResults:[],authenticated:false,configured:false},{headers}):fail('Sign in to save answers and get marking.',401);
 const auth=await createClient();const {data:{user},error}=await auth.auth.getUser();
 if(error||!user)return request.method==='GET'?Response.json({sessions:[],lessonResults:[],authenticated:false,configured:false},{headers}):fail('Sign in to save answers and get marking.',401);
 const {data:{session}}=await auth.auth.getSession();if(!session)return fail('Sign in to save answers and get marking.',401);
 let body:string|undefined;if(request.method==='POST'){if(Number(request.headers.get('content-length'))>80000)return fail('Request too large.',413);body=await request.text();if(body.length>80000)return fail('Request too large.',413)}
 const {url,key}=publicSupabaseConfig();
 try{const response=await fetch(url+'/functions/v1/paper-practice',{method:request.method,headers:{Authorization:'Bearer '+session.access_token,apikey:key,...body?{'Content-Type':'application/json'}:{}},body,cache:'no-store',signal:AbortSignal.timeout(140000)});return new Response(await response.text(),{status:response.status,headers:{...headers,'Content-Type':'application/json'}})}catch{return fail('Saving or marking took too long. Your answers are safe. Please try again.',503)}
}
export async function GET(request:Request){return forward(request)}
export async function POST(request:Request){return forward(request)}

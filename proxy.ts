import {createServerClient} from '@supabase/ssr';
import {NextResponse,type NextRequest} from 'next/server';
import {publicSupabaseConfig,supabaseConfigured} from './lib/supabase/config';
export async function proxy(request:NextRequest){
 if(!supabaseConfigured())return NextResponse.next({request});
 let response=NextResponse.next({request});const {url,key}=publicSupabaseConfig();
 const supabase=createServerClient(url,key,{cookies:{getAll:()=>request.cookies.getAll(),setAll(values){for(const {name,value} of values)request.cookies.set(name,value);response=NextResponse.next({request});for(const {name,value,options} of values)response.cookies.set(name,value,options)}}});
 await supabase.auth.getClaims();
 response.headers.set('Cache-Control','private, no-store');
 return response;
}
export const config={matcher:['/api/:path*','/auth/:path*','/sign-in','/reset-password']};

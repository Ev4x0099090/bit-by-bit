import 'server-only';
import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {publicSupabaseConfig} from './config';
export async function createClient(){
 const store=await cookies(),{url,key}=publicSupabaseConfig();
 return createServerClient(url,key,{cookies:{getAll:()=>store.getAll(),setAll(values){try{for(const {name,value,options} of values)store.set(name,value,options)}catch{/* Server Components cannot set cookies; the proxy refreshes them. */}}}});
}

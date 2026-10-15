'use client';
import {useEffect,useState} from 'react';
import {createClient} from '@/lib/supabase/client';
import {supabaseConfigured} from '@/lib/supabase/config';

export function usePracticalScope(){
 const [scope,setScope]=useState<string|null>(()=>supabaseConfigured()?null:'guest');
 useEffect(()=>{
  if(!supabaseConfigured())return;
  let active=true,changed=false;const client=createClient();
  const {data}=client.auth.onAuthStateChange((_event,session)=>{changed=true;if(active)setScope(session?.user.id||'guest')});
  client.auth.getUser().then(({data})=>{if(active&&!changed)setScope(data.user?.id||'guest')}).catch(()=>{if(active&&!changed)setScope('guest')});
  return()=>{active=false;data.subscription.unsubscribe()};
 },[]);
 return scope;
}

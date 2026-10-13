'use client';
import {useEffect,useState} from 'react';
import {UserRound,LogOut} from 'lucide-react';
import {createClient} from '@/lib/supabase/client';
import {supabaseConfigured} from '@/lib/supabase/config';
export function AccountMenu(){
 const [email,setEmail]=useState<string|null>(null),[busy,setBusy]=useState(false),[error,setError]=useState('');
 useEffect(()=>{if(!supabaseConfigured())return;const supabase=createClient();let mounted=true;supabase.auth.getUser().then(({data})=>{if(mounted)setEmail(data.user?.email||null)});const {data}=supabase.auth.onAuthStateChange((_event,session)=>setEmail(session?.user.email||null));return()=>{mounted=false;data.subscription.unsubscribe()}},[]);
 async function signOut(){setBusy(true);setError('');try{const {error}=await createClient().auth.signOut({scope:'local'});if(error){setError('Could not sign out. Please try again.');return}window.location.assign('/')}catch{setError('Could not sign out. Please try again.')}finally{setBusy(false)}}
 if(!email)return <a className="account-sign-in" href="/sign-in" onClick={e=>{e.currentTarget.href='/sign-in?next='+encodeURIComponent(window.location.pathname+window.location.search+window.location.hash)}}><UserRound size={16}/> Sign in</a>;
 return <details className="account-menu"><summary aria-label="Your account"><UserRound size={18}/><span>Your account</span></summary><div><strong>Signed in</strong><p>{email}</p><button className="text-btn" disabled={busy} onClick={signOut}><LogOut size={15}/>{busy?'Signing out…':'Sign out'}</button>{error&&<p role="alert">{error}</p>}</div></details>;
}

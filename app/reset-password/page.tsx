'use client';
import {useEffect,useState} from 'react';
import {createClient} from '@/lib/supabase/client';
import {supabaseConfigured} from '@/lib/supabase/config';
export default function ResetPassword(){
 const [password,setPassword]=useState(''),[confirm,setConfirm]=useState(''),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[done,setDone]=useState(false);
 useEffect(()=>{if(!supabaseConfigured())return;createClient().auth.getUser().then(({data})=>setReady(!!data.user))},[]);
 async function submit(e:React.FormEvent){e.preventDefault();if(password!==confirm){setError('The passwords do not match.');return}setBusy(true);setError('');try{const {error}=await createClient().auth.updateUser({password});if(error)throw error;setDone(true);setPassword('');setConfirm('')}catch(e){setError(e instanceof Error?e.message:'Could not update your password.')}finally{setBusy(false)}}
 return <main className="auth-page"><a className="auth-brand" href="/">Bit by Bit</a><section className="auth-form-panel auth-reset"><h1>Choose a new password</h1>{done?<><p role="status">Your password has been updated.</p><a className="btn" href="/">Back to learning</a></>:!ready?<><p>Open the reset link from your email first. If it has expired, request a new one.</p><a className="btn" href="/sign-in">Go to sign in</a></>:<form onSubmit={submit}><label>New password<input type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={password} onChange={e=>setPassword(e.target.value)}/></label><label>Confirm new password<input type="password" autoComplete="new-password" minLength={8} maxLength={128} required value={confirm} onChange={e=>setConfirm(e.target.value)}/></label>{error&&<p role="alert" className="auth-error">{error}</p>}<button className="btn" disabled={busy}>{busy?'Saving…':'Update password'}</button></form>}</section></main>;
}

'use client';
import {useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {ArrowLeft,BookOpen,CheckCircle2,Eye,EyeOff} from 'lucide-react';
import {createClient} from '@/lib/supabase/client';
import {supabaseConfigured} from '@/lib/supabase/config';
import {safeReturnTo} from '@/lib/auth-navigation';
export function SignInForm(){
 const params=useSearchParams(),next=safeReturnTo(params.get('next'));
 const [mode,setMode]=useState<'login'|'signup'|'reset'>('login'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[show,setShow]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(params.get('error')?'That link has expired or could not be verified. Please request a new one.':''),[message,setMessage]=useState('');
 const configured=supabaseConfigured();
 function changeMode(value:typeof mode){setMode(value);setError('');setMessage('');setPassword('')}
 function callback(destination=next){return window.location.origin+'/auth/callback?next='+encodeURIComponent(destination)}
 async function submit(e:React.FormEvent){
  e.preventDefault();if(!configured)return;setBusy(true);setError('');setMessage('');
  try{
   const auth=createClient().auth;
   if(mode==='login'){const {error}=await auth.signInWithPassword({email:email.trim(),password});if(error)throw error;window.location.assign(next)}
   else if(mode==='signup'){const {data,error}=await auth.signUp({email:email.trim(),password,options:{emailRedirectTo:callback()}});if(error)throw error;if(data.session)window.location.assign(next);else setMessage('Check your email to confirm your account. Open the confirmation link, then return to your lesson.')}
   else{const {error}=await auth.resetPasswordForEmail(email.trim(),{redirectTo:callback('/reset-password')});if(error)throw error;setMessage('If an account uses this email, you will receive a link to choose a new password.')}
  }catch(e){const text=e instanceof Error?e.message:'Please try again.';setError(/invalid login/i.test(text)?'Email or password is incorrect.':/fetch|network/i.test(text)?'Could not connect. Check your internet connection and try again.':text)}finally{setBusy(false)}
 }
 async function google(){setBusy(true);setError('');try{const {error}=await createClient().auth.signInWithOAuth({provider:'google',options:{redirectTo:callback()}});if(error)throw error}catch(e){setError(e instanceof Error?e.message:'Google sign-in is unavailable.');setBusy(false)}}
 return <main className="auth-page"><a className="auth-back" href={next}><ArrowLeft size={17}/> Back to learning</a><div className="auth-layout"><section className="auth-intro"><span className="auth-brand"><img src="/favicon.svg" width="42" height="42" alt=""/> Bit by Bit</span><p className="auth-byline">BY LEARNING LAB</p><h1>{mode==='signup'?'Your learning, saved.':mode==='reset'?'Let’s get you back in.':'Pick up where you left off.'}</h1><p>Explore the lessons freely. Sign in to keep your completed lessons, practice answers and revision progress together.</p><div className="auth-preview" aria-label="Learning progress illustration"><BookOpen size={25}/><span>Understand one idea.<br/><strong>Build on it tomorrow.</strong></span><CheckCircle2 size={24}/></div></section><section className="auth-form-panel" aria-label="Student account">
  {mode!=='reset'&&<div className="auth-tabs" role="group" aria-label="Choose account action"><button aria-pressed={mode==='login'} onClick={()=>changeMode('login')}>Sign in</button><button aria-pressed={mode==='signup'} onClick={()=>changeMode('signup')}>Create account</button></div>}
  <h2>{mode==='login'?'Welcome back':mode==='signup'?'Create your free account':'Reset your password'}</h2>
  {!configured&&<p role="alert">Account setup is being completed. You can still read every lesson.</p>}
  <form onSubmit={submit}><label>Email address<input type="email" autoComplete="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} disabled={busy}/></label>
   {mode!=='reset'&&<label>Password<div className="auth-password"><input aria-label="Password" type={show?'text':'password'} autoComplete={mode==='signup'?'new-password':'current-password'} required minLength={mode==='signup'?8:undefined} maxLength={128} value={password} onChange={e=>setPassword(e.target.value)} disabled={busy}/><button type="button" className="icon-btn" aria-label={show?'Hide password':'Show password'} onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>{mode==='signup'&&<small>Use at least 8 characters.</small>}</label>}
   {error&&<p className="auth-error" role="alert">{error}</p>}{message&&<p className="auth-message" role="status">{message}</p>}
   <button className="btn" disabled={!configured||busy} type="submit">{busy?'Please wait…':mode==='login'?'Sign in':mode==='signup'?'Create account':'Send reset link'}</button>
  </form>
  {mode==='login'?<button className="text-btn" onClick={()=>changeMode('reset')}>Forgot your password?</button>:mode==='reset'?<button className="text-btn" onClick={()=>changeMode('login')}>Back to sign in</button>:null}
  {configured&&process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED==='true'&&mode!=='reset'&&<button className="btn secondary auth-google" disabled={busy} onClick={google}>Continue with Google</button>}
  <p className="auth-small">Cambridge O Level Computer Science · 2210<br/>An independent learning resource by Learning Lab.</p>
 </section></div></main>;
}

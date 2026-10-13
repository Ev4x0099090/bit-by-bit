import {Suspense} from 'react';
import {SignInForm} from './sign-in-form';
export default function SignInPage(){return <Suspense fallback={<main className="auth-page"><p>Loading sign-in…</p></main>}><SignInForm/></Suspense>}

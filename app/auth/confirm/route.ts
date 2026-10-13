import {NextResponse} from 'next/server';
import type {EmailOtpType} from '@supabase/supabase-js';
import {createClient} from '@/lib/supabase/server';
import {safeReturnTo,requestOrigin} from '@/lib/auth-navigation';
export async function GET(request:Request){
 const url=new URL(request.url),origin=requestOrigin(request),hash=url.searchParams.get('token_hash'),type=url.searchParams.get('type');
 if(hash&&type&&['signup','recovery','email','email_change','invite','magiclink'].includes(type)){const supabase=await createClient();const {error}=await supabase.auth.verifyOtp({token_hash:hash,type:type as EmailOtpType});if(!error)return NextResponse.redirect(new URL(safeReturnTo(url.searchParams.get('next')),origin))}
 return NextResponse.redirect(new URL('/sign-in?error=link-expired',origin));
}

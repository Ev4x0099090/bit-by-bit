import {NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {safeReturnTo,requestOrigin} from '@/lib/auth-navigation';
export async function GET(request:Request){
 const url=new URL(request.url),origin=requestOrigin(request),code=url.searchParams.get('code'),next=safeReturnTo(url.searchParams.get('next'));
 if(code){const supabase=await createClient();const {error}=await supabase.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(next,origin))}
 return NextResponse.redirect(new URL('/sign-in?error=link-expired',origin));
}

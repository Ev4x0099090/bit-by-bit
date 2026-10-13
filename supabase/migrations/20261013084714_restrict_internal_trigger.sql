-- This built-in event trigger is invoked by PostgreSQL, not by API clients.
revoke execute on function public.rls_auto_enable() from public,anon,authenticated;

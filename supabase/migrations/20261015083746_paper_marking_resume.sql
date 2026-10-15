create or replace function public.reserve_learning_ai_request(p_user_id uuid) returns void
language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user_id::text,711));
 if (select count(*) from public.learning_ai_requests where user_id=p_user_id and at>now()-interval '1 minute')>=5 then raise exception 'ai_minute_limit'; end if;
 if (select count(*) from public.learning_ai_requests where user_id=p_user_id and at>now()-interval '1 day')>=50 then raise exception 'ai_daily_limit'; end if;
 insert into public.learning_ai_requests(user_id) values(p_user_id);
end $$;
revoke all on function public.reserve_learning_ai_request(uuid) from public,anon,authenticated;
grant execute on function public.reserve_learning_ai_request(uuid) to service_role;
-- This internal usage table is deliberately inaccessible to browser roles.
-- An explicit deny policy makes the intent visible to database advisors.
create policy ai_request_browser_deny on public.learning_ai_requests for all to anon,authenticated using(false) with check(false);

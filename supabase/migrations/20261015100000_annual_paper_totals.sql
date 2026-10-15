-- Keep historical paper raw marks: pre-2023 Paper 2 was marked out of 50.
-- Explicitly starting a different paper keeps earlier unfinished attempts available.
drop index public.learning_paper_one_active;
alter table public.learning_paper_sessions drop constraint learning_paper_sessions_earned_check;
alter table public.learning_paper_sessions drop constraint learning_paper_sessions_maximum_marks_check;
alter table public.learning_paper_sessions add constraint learning_paper_sessions_maximum_marks_check check (maximum_marks in (50,75));
alter table public.learning_paper_sessions add constraint learning_paper_sessions_earned_check check (earned between 0 and maximum_marks);

create or replace function public.save_learning_paper_draft(p_user_id uuid,p_paper_id text,p_task_id text,p_draft jsonb default null)
returns public.learning_paper_sessions language plpgsql security definer set search_path='' as $$
declare r public.learning_paper_sessions; current_ms bigint := (extract(epoch from clock_timestamp())*1000)::bigint;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user_id::text,712));
 insert into public.learning_paper_sessions(user_id,paper_id,current_task,maximum_marks)
 values(p_user_id,p_paper_id,p_task_id,case when p_paper_id in ('2210-w20-22','2210-w21-22','2210-w22-23') then 50 else 75 end)
 on conflict(user_id,paper_id) do nothing;
 update public.learning_paper_sessions set current_task=case when p_draft is null then p_task_id else current_task end,updated_at=current_ms,
  answers=case when p_draft is null then answers else answers||jsonb_build_object(p_task_id,p_draft) end
 where user_id=p_user_id and paper_id=p_paper_id and status='in_progress' returning * into r;
 if not found then select * into r from public.learning_paper_sessions where user_id=p_user_id and paper_id=p_paper_id; end if;
 return r;
end $$;
revoke all on function public.save_learning_paper_draft(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.save_learning_paper_draft(uuid,text,text,jsonb) to service_role;

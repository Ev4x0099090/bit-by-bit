create table public.learning_paper_sessions (
 user_id uuid not null references auth.users(id) on delete cascade,
 paper_id text not null,
 current_task text not null,
 started_at bigint not null default (extract(epoch from clock_timestamp())*1000)::bigint,
 updated_at bigint not null default (extract(epoch from clock_timestamp())*1000)::bigint,
 completed_at bigint,
 status text not null default 'in_progress' check (status in ('in_progress','marking','complete')),
 lease_until bigint,
 answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers)='object'),
 results jsonb not null default '{}'::jsonb check (jsonb_typeof(results)='object'),
 earned integer check (earned between 0 and 75),
 maximum_marks integer not null default 75 check (maximum_marks=75),
 grade text check (grade in ('A','B','C','D','E','U')),
 requires_review boolean not null default false,
 primary key(user_id,paper_id),
 check ((status='complete')=(completed_at is not null))
);
create unique index learning_paper_one_active on public.learning_paper_sessions(user_id) where status<>'complete';
create table public.learning_code_results (
 user_id uuid not null references auth.users(id) on delete cascade,
 task_id text not null,
 draft jsonb not null check (jsonb_typeof(draft)='object'),
 result jsonb not null check (jsonb_typeof(result)='object'),
 at bigint not null default (extract(epoch from clock_timestamp())*1000)::bigint,
 primary key(user_id,task_id)
);
create table public.learning_ai_requests (
 id bigint generated always as identity primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 at timestamptz not null default now()
);
create index learning_ai_requests_user_at on public.learning_ai_requests(user_id,at);
alter table public.learning_paper_sessions enable row level security;
alter table public.learning_code_results enable row level security;
alter table public.learning_ai_requests enable row level security;
revoke all on public.learning_paper_sessions,public.learning_code_results,public.learning_ai_requests from anon,authenticated;
grant select on public.learning_paper_sessions,public.learning_code_results to authenticated;
grant all on public.learning_paper_sessions,public.learning_code_results,public.learning_ai_requests to service_role;
grant usage,select on sequence public.learning_ai_requests_id_seq to service_role;
create policy paper_session_owner on public.learning_paper_sessions for select to authenticated using ((select auth.uid())=user_id);
create policy code_result_owner on public.learning_code_results for select to authenticated using ((select auth.uid())=user_id);

create function public.reserve_learning_ai_request(p_user_id uuid) returns void
language plpgsql security definer set search_path='' as $$
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user_id::text,711));
 if (select count(*) from public.learning_ai_requests where user_id=p_user_id and at>now()-interval '1 minute')>=5
 or (select count(*) from public.learning_ai_requests where user_id=p_user_id and at>now()-interval '1 day')>=50 then
  raise exception 'ai_rate_limit';
 end if;
 insert into public.learning_ai_requests(user_id) values(p_user_id);
end $$;

create function public.save_learning_paper_draft(p_user_id uuid,p_paper_id text,p_task_id text,p_draft jsonb default null)
returns public.learning_paper_sessions language plpgsql security definer set search_path='' as $$
declare r public.learning_paper_sessions; current_ms bigint := (extract(epoch from clock_timestamp())*1000)::bigint;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_user_id::text,712));
 select * into r from public.learning_paper_sessions where user_id=p_user_id and status<>'complete';
 if found and r.paper_id<>p_paper_id then return r; end if;
 insert into public.learning_paper_sessions(user_id,paper_id,current_task) values(p_user_id,p_paper_id,p_task_id) on conflict(user_id,paper_id) do nothing;
 update public.learning_paper_sessions set current_task=case when p_draft is null then p_task_id else current_task end,updated_at=current_ms,
  answers=case when p_draft is null then answers else answers||jsonb_build_object(p_task_id,p_draft) end
 where user_id=p_user_id and paper_id=p_paper_id and status='in_progress' returning * into r;
 if not found then select * into r from public.learning_paper_sessions where user_id=p_user_id and paper_id=p_paper_id; end if;
 return r;
end $$;

create function public.acquire_learning_paper_marking(p_user_id uuid,p_paper_id text)
returns public.learning_paper_sessions language plpgsql security definer set search_path='' as $$
declare r public.learning_paper_sessions; current_ms bigint := (extract(epoch from clock_timestamp())*1000)::bigint;
begin
 select * into r from public.learning_paper_sessions where user_id=p_user_id and paper_id=p_paper_id for update;
 if not found then raise exception 'unknown_paper_session'; end if;
 if r.status='complete' then return r; end if;
 if r.status='marking' and r.lease_until>current_ms then raise exception 'paper_marking_busy'; end if;
 update public.learning_paper_sessions set status='marking',lease_until=current_ms+180000 where user_id=p_user_id and paper_id=p_paper_id returning * into r;
 return r;
end $$;

revoke all on function public.reserve_learning_ai_request(uuid),public.save_learning_paper_draft(uuid,text,text,jsonb),public.acquire_learning_paper_marking(uuid,text) from public,anon,authenticated;
grant execute on function public.reserve_learning_ai_request(uuid),public.save_learning_paper_draft(uuid,text,text,jsonb),public.acquire_learning_paper_marking(uuid,text) to service_role;

-- Students read their own progress. Only the verified backend can write marks.
create table public.learning_completions (
 user_id uuid not null references auth.users(id) on delete cascade,
 lesson_id text not null check (length(lesson_id) between 1 and 24),
 at bigint not null,
 primary key (user_id, lesson_id)
);
create table public.learning_attempts (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 objective text not null, question_id text not null,
 answer text not null check (length(answer) between 1 and 4000),
 earned integer not null check (earned >= 0),
 possible integer not null check (possible between 1 and 20),
 confidence integer not null default 3 check (confidence between 1 and 5),
 at bigint not null, self boolean not null default false,
 check (earned <= possible)
);
create index learning_attempts_user_time on public.learning_attempts(user_id, at);
alter table public.learning_completions enable row level security;
alter table public.learning_attempts enable row level security;
revoke all on public.learning_completions,public.learning_attempts from anon,authenticated;
grant select on public.learning_completions,public.learning_attempts to authenticated;
grant all on public.learning_completions,public.learning_attempts to service_role;
create policy read_own_completions on public.learning_completions for select to authenticated using ((select auth.uid()) = user_id);
create policy read_own_attempts on public.learning_attempts for select to authenticated using ((select auth.uid()) = user_id);

-- Serialize each student's submissions so simultaneous requests cannot bypass the limit.
create function public.save_learning_attempt(
 p_user_id uuid,p_objective text,p_question_id text,p_answer text,
 p_earned integer,p_possible integer,p_confidence integer,p_self boolean
) returns public.learning_attempts
language plpgsql security invoker set search_path = '' as $$
declare row public.learning_attempts; current_ms bigint;
begin
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_user_id::text,0));
 current_ms := floor(extract(epoch from clock_timestamp()) * 1000)::bigint;
 if (select count(*) from public.learning_attempts where user_id=p_user_id and at>current_ms-60000)>=30 then
  raise exception 'attempt_rate_limit' using errcode='P0001';
 end if;
 insert into public.learning_attempts(user_id,objective,question_id,answer,earned,possible,confidence,at,self)
 values(p_user_id,p_objective,p_question_id,p_answer,p_earned,p_possible,p_confidence,current_ms,p_self) returning * into row;
 return row;
end;
$$;
revoke all on function public.save_learning_attempt(uuid,text,text,text,integer,integer,integer,boolean) from public,anon,authenticated;
grant execute on function public.save_learning_attempt(uuid,text,text,text,integer,integer,integer,boolean) to service_role;

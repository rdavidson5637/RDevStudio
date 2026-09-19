-- RLS, rate limit, and SECURITY DEFINER on the rollup writers.
-- Service role bypasses RLS for seeding and moderation. Do not loosen
-- these policies for local testing.

alter table public.pubs enable row level security;
alter table public.pub_drinks enable row level security;
alter table public.reports enable row level security;

drop policy if exists "public reads active pubs" on public.pubs;
create policy "public reads active pubs"
  on public.pubs
  for select
  using (status = 'active');

drop policy if exists "authenticated can submit pubs" on public.pubs;
create policy "authenticated can submit pubs"
  on public.pubs
  for insert
  to authenticated
  with check (
    auth.uid() = submitted_by
    and status = 'pending'
    and source = 'user'
  );

drop policy if exists "public reads drinks" on public.pub_drinks;
create policy "public reads drinks"
  on public.pub_drinks
  for select
  using (true);

drop policy if exists "authenticated can report" on public.reports;
create policy "authenticated can report"
  on public.reports
  for insert
  to authenticated
  with check (auth.uid() = reporter_id);

drop policy if exists "reporters read own" on public.reports;
create policy "reporters read own"
  on public.reports
  for select
  using (auth.uid() = reporter_id);

-- Table grants. Without these, RLS policies are never reached.
grant select on public.pubs to anon, authenticated;
grant insert on public.pubs to authenticated;
grant select on public.pub_drinks to anon, authenticated;
grant select on public.reports to authenticated;
grant insert on public.reports to authenticated;
grant usage on type public.stout_drink to anon, authenticated;

create or replace function public.check_report_rate_limit()
returns trigger
language plpgsql
as $$
begin
  -- Seed / moderation inserts go through the service role and must not
  -- trip the hourly cap. Anonymous drinkers still get 20/hour.
  if auth.role() = 'service_role' then
    return new;
  end if;

  if (
    select count(*)
    from public.reports
    where reporter_id = new.reporter_id
      and created_at > now() - interval '1 hour'
  ) >= 20 then
    raise exception 'Rate limit exceeded, try again later';
  end if;

  return new;
end;
$$;

drop trigger if exists reports_rate_limit on public.reports;
create trigger reports_rate_limit
  before insert on public.reports
  for each row
  execute procedure public.check_report_rate_limit();

-- Rollup writers have no INSERT/UPDATE policy on pub_drinks, so they
-- must run as the table owner. search_path is pinned to block hijacking.
alter function public.apply_report()
  security definer
  set search_path = public;

alter function public.ensure_pub_drinks(uuid)
  security definer
  set search_path = public;

alter function public.pubs_ensure_pub_drinks()
  security definer
  set search_path = public;

alter function public.check_report_rate_limit()
  set search_path = public;

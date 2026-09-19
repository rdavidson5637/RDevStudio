-- Rollup trigger, confidence function, and per-pub drink row bootstrap.

create or replace function public.apply_report()
returns trigger
language plpgsql
as $$
begin
  insert into public.pub_drinks as pd (
    pub_id,
    drink,
    yes_count,
    no_count,
    last_confirmed_at,
    last_denied_at,
    updated_at
  )
  values (
    new.pub_id,
    new.drink,
    case when new.available then 1 else 0 end,
    case when new.available then 0 else 1 end,
    case when new.available then new.created_at else null end,
    case when new.available then null else new.created_at end,
    now()
  )
  on conflict (pub_id, drink) do update
  set
    yes_count = pd.yes_count + case when new.available then 1 else 0 end,
    no_count = pd.no_count + case when new.available then 0 else 1 end,
    last_confirmed_at = case
      when new.available then new.created_at
      else pd.last_confirmed_at
    end,
    last_denied_at = case
      when new.available then pd.last_denied_at
      else new.created_at
    end,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists reports_apply_report on public.reports;
create trigger reports_apply_report
  after insert on public.reports
  for each row
  execute procedure public.apply_report();

-- Recency wins. yes_count / no_count are accepted so the signature matches
-- the rollup and so a later rule can use vote weight without a signature change.
-- Evaluated in order: unknown, unlikely, confirmed (90d), likely (365d), stale.
create or replace function public.drink_confidence(
  last_confirmed_at timestamptz,
  last_denied_at timestamptz,
  yes_count int,
  no_count int
)
returns text
language sql
stable
as $$
  select case
    when last_confirmed_at is null and last_denied_at is null then 'unknown'
    when last_denied_at is not null
      and (last_confirmed_at is null or last_denied_at > last_confirmed_at) then 'unlikely'
    when last_confirmed_at >= now() - interval '90 days' then 'confirmed'
    when last_confirmed_at >= now() - interval '365 days' then 'likely'
    else 'stale'
  end;
$$;

create or replace function public.ensure_pub_drinks(p_pub_id uuid)
returns void
language plpgsql
as $$
begin
  insert into public.pub_drinks (pub_id, drink)
  select p_pub_id, d.drink
  from unnest(enum_range(null::public.stout_drink)) as d(drink)
  on conflict (pub_id, drink) do nothing;
end;
$$;

create or replace function public.pubs_ensure_pub_drinks()
returns trigger
language plpgsql
as $$
begin
  perform public.ensure_pub_drinks(new.id);
  return new;
end;
$$;

drop trigger if exists pubs_ensure_pub_drinks on public.pubs;
create trigger pubs_ensure_pub_drinks
  after insert on public.pubs
  for each row
  execute procedure public.pubs_ensure_pub_drinks();

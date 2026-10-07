-- Stout Finder setup. Paste this whole file into the Supabase SQL editor and run it once.
-- Safe to re-run the functions and policies. Do not re-run the create table
-- statements if the tables already exist.

set search_path = public, extensions;

-- Stout Finder schema
--
-- Design: "this pub pours Beamish" is a claim with a shelf life, not a
-- permanent attribute. reports is the append-only evidence log. Never
-- update or delete a report. pub_drinks is a derived rollup of current
-- belief (yes/no counts and last-confirmed / last-denied timestamps),
-- maintained by a trigger. Confidence tiers are computed at read time
-- from that rollup so the rules can change without rewriting history.
--
-- OSM base data (pubs) and confirmation data (reports / pub_drinks) are
-- kept in separate tables so the ODbL share-alike surface stays on the
-- location rows, not the merged product.

create extension if not exists postgis;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'stout_drink') then
    execute 'create type public.stout_drink as enum (''beamish'', ''kilkenny'', ''murphys'', ''guinness'')';
  end if;
end
$$;

create table public.pubs (
  id uuid primary key default gen_random_uuid(),
  osm_type text,
  osm_id bigint,
  slug text unique not null,
  name text not null,
  address text,
  town text,
  postcode text,
  county text not null check (county in ('Antrim', 'Down')),
  lat double precision not null,
  lng double precision not null,
  geog geography(Point, 4326) generated always as (
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography
  ) stored,
  website text,
  phone text,
  source text not null default 'osm' check (source in ('osm', 'user')),
  status text not null default 'active' check (status in ('active', 'pending', 'closed', 'rejected')),
  submitted_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  unique (osm_type, osm_id)
);

create index pubs_geog_gix on public.pubs using gist (geog);
create index pubs_slug_idx on public.pubs (slug);
create index pubs_status_idx on public.pubs (status);

comment on table public.pubs is
  'Pub locations. OSM-sourced rows and user submissions. Confirmation data lives in reports / pub_drinks, not here.';

create table public.pub_drinks (
  pub_id uuid not null references public.pubs (id) on delete cascade,
  drink public.stout_drink not null,
  yes_count int not null default 0,
  no_count int not null default 0,
  last_confirmed_at timestamptz,
  last_denied_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (pub_id, drink)
);

comment on table public.pub_drinks is
  'Rolled-up current belief per pub per drink. Written only by the apply_report trigger. Do not update by hand.';

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  pub_id uuid not null references public.pubs (id) on delete cascade,
  drink public.stout_drink not null,
  available boolean not null,
  note text check (char_length(note) <= 280),
  reporter_id uuid not null references auth.users (id),
  created_at timestamptz not null default now()
);

comment on table public.reports is
  'Immutable evidence. Insert only. The apply_report trigger rolls each row into pub_drinks.';

create index reports_pub_drink_created_idx
  on public.reports (pub_id, drink, created_at desc);

-- timestamptz::date follows the session timezone, so Postgres marks that
-- cast stable and rejects it in an index. The day boundary is UTC.
create or replace function public.report_day(ts timestamptz)
returns date
language sql
immutable
as $$
  select (ts at time zone 'UTC')::date;
$$;

create unique index reports_one_per_day
  on public.reports (pub_id, drink, reporter_id, public.report_day(created_at));


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


-- Nearby search. ST_DWithin is written with the indexed geography column
-- on the left so the GIST index (pubs_geog_gix) can be used.
--
-- EXPLAIN (ANALYZE, BUFFERS)
--   select * from nearby_pubs(54.5967, -5.9301, 15000, array['beamish']::stout_drink[], false, 'any', 200);
-- Expect an Index Scan on pubs_geog_gix, not a Seq Scan, once the table
-- is large enough that the planner prefers the index.

create or replace function public.nearby_pubs(
  in_lat double precision,
  in_lng double precision,
  in_radius_m integer default 15000,
  in_drinks public.stout_drink[] default null,
  in_match_all boolean default false,
  in_min_confidence text default 'any',
  in_limit integer default 200
)
returns table (
  id uuid,
  slug text,
  name text,
  town text,
  county text,
  lat double precision,
  lng double precision,
  distance_m double precision,
  drinks jsonb
)
language sql
stable
set search_path = public
as $$
  with origin as (
    select ST_SetSRID(ST_MakePoint(in_lng, in_lat), 4326)::geography as pt
  ),
  bounded as (
    select
      p.id,
      p.slug,
      p.name,
      p.town,
      p.county,
      p.lat,
      p.lng,
      ST_Distance(p.geog, origin.pt) as distance_m,
      jsonb_object_agg(
        pd.drink::text,
        jsonb_build_object(
          'confidence', public.drink_confidence(
            pd.last_confirmed_at,
            pd.last_denied_at,
            pd.yes_count,
            pd.no_count
          ),
          'last_confirmed_at', pd.last_confirmed_at,
          'yes_count', pd.yes_count,
          'no_count', pd.no_count
        )
      ) as drinks
    from public.pubs p
    cross join origin
    join public.pub_drinks pd on pd.pub_id = p.id
    where p.status = 'active'
      and ST_DWithin(
        p.geog,
        origin.pt,
        least(greatest(coalesce(in_radius_m, 15000), 1), 50000)
      )
    group by p.id, p.slug, p.name, p.town, p.county, p.lat, p.lng, origin.pt
  )
  select
    b.id,
    b.slug,
    b.name,
    b.town,
    b.county,
    b.lat,
    b.lng,
    b.distance_m,
    b.drinks
  from bounded b
  where in_drinks is null
    or (
      not coalesce(in_match_all, false)
      and exists (
        select 1
        from unnest(in_drinks) as d(drink)
        where case coalesce(in_min_confidence, 'any')
          when 'known' then (b.drinks -> d.drink::text ->> 'confidence')
            in ('confirmed', 'likely', 'stale', 'unlikely')
          when 'plausible' then (b.drinks -> d.drink::text ->> 'confidence')
            in ('confirmed', 'likely')
          when 'confirmed' then (b.drinks -> d.drink::text ->> 'confidence') = 'confirmed'
          else true
        end
      )
    )
    or (
      coalesce(in_match_all, false)
      and not exists (
        select 1
        from unnest(in_drinks) as d(drink)
        where not case coalesce(in_min_confidence, 'any')
          when 'known' then (b.drinks -> d.drink::text ->> 'confidence')
            in ('confirmed', 'likely', 'stale', 'unlikely')
          when 'plausible' then (b.drinks -> d.drink::text ->> 'confidence')
            in ('confirmed', 'likely')
          when 'confirmed' then (b.drinks -> d.drink::text ->> 'confidence') = 'confirmed'
          else true
        end
      )
    )
  order by b.distance_m asc
  limit least(greatest(coalesce(in_limit, 200), 1), 200);
$$;

grant execute on function public.nearby_pubs(
  double precision,
  double precision,
  integer,
  public.stout_drink[],
  boolean,
  text,
  integer
) to anon, authenticated;

grant execute on function public.drink_confidence(
  timestamptz,
  timestamptz,
  int,
  int
) to anon, authenticated;


-- Kilkenny joins the finder. Fresh installs already include it in 0004.
-- ADD VALUE cannot be used in the same transaction, so the backfill
-- of existing pubs is 0009.

alter type public.stout_drink add value if not exists 'kilkenny';


-- One unknown Kilkenny row per pub that was inserted before the enum grew.
-- New pubs already get every drink from pubs_ensure_pub_drinks.

insert into public.pub_drinks (pub_id, drink)
select p.id, 'kilkenny'::public.stout_drink
from public.pubs p
on conflict (pub_id, drink) do nothing;


-- Pending pub moderation. Run from the Supabase SQL editor as the
-- table owner. Not exposed in the app. No GRANT to anon/authenticated.

create or replace view public.pending_pubs as
select
  p.id,
  p.slug,
  p.name,
  p.town,
  p.county,
  p.address,
  p.postcode,
  p.lat,
  p.lng,
  p.submitted_by,
  p.created_at,
  nearest.id as nearby_active_id,
  nearest.slug as nearby_active_slug,
  nearest.name as nearby_active_name,
  nearest.distance_m as nearby_active_distance_m
from public.pubs p
left join lateral (
  select
    a.id,
    a.slug,
    a.name,
    ST_Distance(p.geog, a.geog) as distance_m
  from public.pubs a
  where a.status = 'active'
    and a.id <> p.id
    and ST_DWithin(p.geog, a.geog, 200)
  order by p.geog <-> a.geog
  limit 1
) nearest on true
where p.status = 'pending'
order by p.created_at desc;

alter view public.pending_pubs set (security_invoker = true);

create or replace function public.approve_pub(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.pubs
  set status = 'active'
  where id = p_id
    and status = 'pending';

  if not found then
    raise exception 'No pending pub with id %', p_id;
  end if;
end;
$$;

create or replace function public.reject_pub(p_id uuid, p_reason text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_reason is null or length(trim(p_reason)) = 0 then
    raise exception 'A reason is required';
  end if;

  update public.pubs
  set status = 'rejected'
  where id = p_id
    and status = 'pending';

  if not found then
    raise exception 'No pending pub with id %', p_id;
  end if;
end;
$$;

revoke all on function public.approve_pub(uuid) from public, anon, authenticated;
revoke all on function public.reject_pub(uuid, text) from public, anon, authenticated;
revoke all on public.pending_pubs from anon, authenticated;

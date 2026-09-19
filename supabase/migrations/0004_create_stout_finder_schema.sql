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
    create type public.stout_drink as enum ('beamish', 'murphys', 'guinness');
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

create unique index reports_one_per_day
  on public.reports (pub_id, drink, reporter_id, (created_at::date));

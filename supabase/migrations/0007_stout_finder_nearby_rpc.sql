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

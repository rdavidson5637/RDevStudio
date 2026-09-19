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

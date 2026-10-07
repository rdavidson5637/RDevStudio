-- One unknown Kilkenny row per pub that was inserted before the enum grew.
-- New pubs already get every drink from pubs_ensure_pub_drinks.

insert into public.pub_drinks (pub_id, drink)
select p.id, 'kilkenny'::public.stout_drink
from public.pubs p
on conflict (pub_id, drink) do nothing;

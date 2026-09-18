# Stout Finder - parked build

This folder is a Next.js private folder (leading underscore), so nothing in it
is routed or built. `/stout-finder` serves a coming-soon page instead.

The build itself is complete: map, filters, nearest-first list, per-drink pages,
pub detail pages, the add-a-pub form and the report widget. What it does not
have is data. `scripts/stout-finder/data/known-stock.json` is an empty array.

## To go live

1. Apply migrations 0004 to 0007 to Supabase.
2. `npm run osm:fetch` then `npm run osm:import` to load Antrim and Down pubs.
3. Seed the pubs you can personally vouch for into `known-stock.json`, then
   `npm run stout:seed`.
4. Move these route files back up into `app/(site)/stout-finder/`, replacing the
   coming-soon `page.tsx`.
5. Move `app/api/_stout-finder/` back to `app/api/stout-finder/`. The client
   components still fetch `/api/stout-finder/*`, so the API must move back too.
6. Put the sub-routes back in `app/sitemap.ts` along with the `getAllPubSlugs()`
   call that generates a URL per pub.

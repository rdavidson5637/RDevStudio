# Stout Finder data

The routes are live in the app. `/stout-finder` stays on the coming-soon page until `public.pubs` exists, then it switches to the map on its own.

Still to do, in order:

1. In the Supabase SQL editor, run migrations `0004` through `0009`, then `supabase/moderation/pending-pubs.sql`.
2. Turn on anonymous sign-in (Authentication, Providers, Anonymous) so a report does not need an account.
3. `npm run osm:import` once `osm-pubs.json` is present.
4. Fill `known-stock.json` only with pubs you have checked yourself, then `npm run stout:seed`.
5. `beamish-kilkenny.json` is the working venue list. After the OSM import, `npm run stout:apply-data` writes a yes report for each drink marked `confirmed`. `reported` and `unverified` are left alone. The airport venue is skipped.

# Known stock seed

`known-stock.json` is a hand-maintained list of pubs you can personally vouch for. Fill it in after `npm run osm:import` so the slugs match real rows.

Format:

```json
[
  {
    "slug": "the-sunflower-belfast",
    "drinks": {
      "beamish": true,
      "guinness": true
    }
  }
]
```

Omit a drink to leave it as Unknown. Set a drink to `false` to record that it is gone.

Then:

```
SEED_REPORTER_ID=<uuid of an auth user> npm run stout:seed
```

The script writes `reports` only. The database trigger rolls those into `pub_drinks`.

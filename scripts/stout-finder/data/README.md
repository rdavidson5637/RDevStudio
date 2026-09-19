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

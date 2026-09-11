# Cron routes

Vercel Cron calls these on schedule (see `vercel.json`) with an
`Authorization: Bearer <CRON_SECRET>` header it adds automatically once
`CRON_SECRET` is set as a project env var.

## `/api/cron/sync`

Pulls players, teams, fixtures, league standings, ownership, transactions and
picks from the FPL Draft + main APIs into Supabase. Runs hourly.

Trigger it manually:

```bash
curl -s https://rdevstudio.co.uk/api/cron/sync \
  -H "Authorization: Bearer $CRON_SECRET" | jq
```

Locally, against `next dev` on port 3000:

```bash
curl -s http://localhost:3000/api/cron/sync \
  -H "Authorization: Bearer $CRON_SECRET" | jq
```

Returns `200` with `{ ok, durationMs, currentEvent, nextEvent, counts, errors }`
either way — a partial failure shows up as `ok: false` with populated `errors`,
not as a thrown 500, so cron logs stay readable.

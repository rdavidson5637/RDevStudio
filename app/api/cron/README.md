# Cron routes

Vercel Cron calls these on schedule (see `vercel.json`) with an
`Authorization: Bearer <CRON_SECRET>` header it adds automatically once
`CRON_SECRET` is set as a project env var.

## `/api/cron/sync`

Pulls players, teams, fixtures, league standings, ownership, transactions and
picks from the FPL Draft + main APIs into Supabase. Runs daily at 06:00 UTC —
Vercel's Hobby plan caps cron jobs at once a day; the spec called for hourly,
so bump the schedule in `vercel.json` if this project is ever on Pro.

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

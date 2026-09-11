# Cron routes

Vercel Cron calls these on schedule (see `vercel.json`) with an
`Authorization: Bearer <CRON_SECRET>` header it adds automatically once
`CRON_SECRET` is set as a project env var.

Hobby allows two daily jobs. This project uses them for `/api/cron/sync`
(06:00 UTC) and `/api/cron/news` (07:00 UTC). Live persist and deadline
alerts also run at the end of sync. `/api/cron/live` and `/api/cron/deadline`
exist for manual triggers and for Pro schedules.

Trigger any of them:

```bash
curl -s https://rdevstudio.co.uk/api/cron/sync \
  -H "Authorization: Bearer $CRON_SECRET" | jq
```

## `/api/cron/sync`

Pulls players, teams, fixtures, league standings, ownership, transactions and
picks from the FPL Draft + main APIs into Supabase, then runs news ingest,
a live snapshot, and the deadline alert window. Daily at 06:00 UTC.

Returns `{ ok, durationMs, currentEvent, nextEvent, counts, extras, errors }`.
A partial failure shows up as `ok: false` with populated `errors`, not as a
thrown 500.

## `/api/cron/news`

BBC + Guardian RSS, Claude extraction into `fpl_news_items`. Needs
`ANTHROPIC_API_KEY`. Skips URLs already stored. Daily at 07:00 UTC.

## `/api/cron/live`

Fetches the draft live endpoint, upserts `fpl_live_stats`, and broadcasts
on Pusher channel `draft-live` when `PUSHER_*` is set. Not in `vercel.json`
on Hobby; add `"schedule": "*/5 * * * *"` on Pro. The live page also POSTs
`/api/draft/live/refresh` (rate-limited) so a Saturday gameweek still moves
on Hobby.

## `/api/cron/deadline`

If the next deadline is between 1.5 and 24 hours away and the XI still has
flags, POSTs `DRAFT_ALERT_WEBHOOK` and/or emails via Resend
(`RESEND_API_KEY`, `DRAFT_ALERT_EMAIL`, `DRAFT_ALERT_FROM`). Browser
notifications are a separate in-tab `Notification` — not Web Push.

## Env extras

| Variable | Used by |
| --- | --- |
| `ANTHROPIC_API_KEY` | News extract |
| `PUSHER_APP_ID` / `PUSHER_KEY` / `PUSHER_SECRET` / `PUSHER_CLUSTER` | Live broadcast (same as pub quiz) |
| `NEXT_PUBLIC_PUSHER_KEY` / `NEXT_PUBLIC_PUSHER_CLUSTER` | Live page subscribe |
| `RESEND_API_KEY`, `DRAFT_ALERT_EMAIL`, `DRAFT_ALERT_FROM` | Deadline email |
| `DRAFT_ALERT_WEBHOOK` | Deadline webhook |

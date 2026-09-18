# Stout Finder moderation

There is no admin UI in v1. Volume at Antrim and Down scale does not justify one.

## Weekly check

1. Open the Supabase SQL editor (table owner / postgres role).
2. Run `select * from pending_pubs;`
3. `nearby_active_*` columns flag an existing live pub within 200m. If those are filled, it is probably a duplicate: reject it.
4. Approve or reject each row:

```sql
select approve_pub('00000000-0000-0000-0000-000000000000');
select reject_pub('00000000-0000-0000-0000-000000000000', 'duplicate of sunflower');
```

These functions run as the table owner, so they do not need an UPDATE policy on `pubs`. Do not grant them to `anon` or `authenticated`.

Rejected rows stay in the table with `status = 'rejected'`. They never appear on the map.

Apply `pending-pubs.sql` once after the numbered migrations.

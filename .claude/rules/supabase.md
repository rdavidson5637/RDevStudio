---
paths:
  - "supabase/**"
  - "lib/**"
  - "app/api/**"
---

# Database and secrets

- Supabase Postgres with RLS. Never disable RLS, never add a policy that opens a table to everyone, never use the service role key in client code.
- Schema changes go in `supabase/migrations/` as a new migration file. Never edit an applied migration.
- Inspect the existing tables and policies before proposing a change.
- Any Supabase MCP connection must point at a dev project and be read-only. Never run writes against a production or client project.
- Env vars live in Vercel. Do not hardcode keys. Do not read `.env.local`. Add new variable names to `.env.example` with no values.
- Cron routes need `CRON_SECRET`. Do not remove that check.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn(
    "[fpl] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing",
  );
}

// Anon key, RLS-restricted to SELECT only - safe wherever this ends up
// running. Used by the /draft pages, which read Postgres directly and never
// touch the FPL APIs client-side (both block browser requests anyway).
const safeUrl = url ?? "https://example.supabase.co";
const safeKey = key ?? "not-a-real-anon-key";

// Next.js's App Router auto-caches plain fetch() calls made in Server
// Components, including the ones supabase-js makes internally. Without
// this, pages read a stale snapshot from before the last sync until the
// Data Cache happens to expire. getSquad's own unstable_cache layer still
// works fine on top of this - it caches the function's return value, not
// the fetch, so it isn't affected by forcing the fetch itself fresh.
const noStoreFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

export const supabasePublic = createClient(safeUrl, safeKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: noStoreFetch },
});

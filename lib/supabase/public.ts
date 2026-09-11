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

export const supabasePublic = createClient(safeUrl, safeKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

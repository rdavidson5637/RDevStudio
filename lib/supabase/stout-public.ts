import { createClient } from "@supabase/supabase-js";

const url =
  process.env.NEXT_PUBLIC_STOUT_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_STOUT_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.warn(
    "[stout-finder] NEXT_PUBLIC_STOUT_SUPABASE_URL or NEXT_PUBLIC_STOUT_SUPABASE_ANON_KEY missing",
  );
}

const safeUrl = url ?? "https://example.supabase.co";
const safeKey = key ?? "not-a-real-anon-key";

const noStoreFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

export const supabaseStout = createClient(safeUrl, safeKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: noStoreFetch },
});

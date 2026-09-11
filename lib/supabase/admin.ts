// Server-side Supabase client for the FPL Draft Analyser cron jobs. Uses the
// SERVICE ROLE key, so it bypasses RLS. Import this ONLY from route handlers /
// server code, never a client component - the "server-only" import below makes
// an accidental client-bundle import a build error.
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.warn(
    "[fpl] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing",
  );
}

// Inert defaults so `next build` can complete (static page data collection
// evaluates route modules) even when env vars aren't set in this environment.
// Real requests still require proper env vars at runtime.
const safeUrl = url ?? "https://example.supabase.co";
const safeKey = key ?? "not-a-real-service-role-key";

export const supabaseAdmin = createClient(safeUrl, safeKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

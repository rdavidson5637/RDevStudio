// Server-side Supabase client for Wardrobe AI. Uses the SERVICE ROLE key, so it
// bypasses RLS. Import this ONLY from route handlers / server code, never a client component.
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.warn("[wardrobe] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing");
}

// Use inert defaults so Next build can complete when Wardrobe is in coming-soon mode.
// Real requests still require proper env vars in .env.local / deployment env.
const safeUrl = url ?? "https://example.supabase.co";
const safeKey = key ?? "not-a-real-service-role-key";

export const supabase = createClient(safeUrl, safeKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export const BUCKET = process.env.SUPABASE_BUCKET || "garments";

// Server-side Supabase client for Wardrobe AI. Uses the SERVICE ROLE key, so it
// bypasses RLS. Import this ONLY from route handlers / server code, never a client component.
import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.warn("[wardrobe] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing");
}

export const supabase = createClient(url ?? "", key ?? "", {
  auth: { persistSession: false, autoRefreshToken: false },
});

export const BUCKET = process.env.SUPABASE_BUCKET || "garments";

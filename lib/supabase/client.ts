import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase browser env vars are not configured.");
  }
  return createBrowserClient(url, key);
}

export function createStoutBrowserClient() {
  const url =
    process.env.NEXT_PUBLIC_STOUT_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_STOUT_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Stout Finder Supabase env vars are not configured.");
  }
  return createBrowserClient(url, key);
}

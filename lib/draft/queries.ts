import { supabasePublic } from "@/lib/supabase/public";

export type CurrentEventInfo = {
  id: number;
  name: string;
  deadlineTime: string | null;
} | null;

/** The gameweek to show in the status bar: the live one if there is one,
 * otherwise the upcoming one (e.g. pre-season, or the gap after deadline
 * before FPL flags the next event as current). */
export async function getCurrentEvent(): Promise<CurrentEventInfo> {
  const { data } = await supabasePublic
    .from("fpl_events")
    .select("id, name, deadline_time, is_current, is_next")
    .or("is_current.eq.true,is_next.eq.true")
    .order("is_current", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) return null;
  return { id: data.id, name: data.name, deadlineTime: data.deadline_time };
}

/** Most recent fpl_players.updated_at, for the "data as of" status bar. */
export async function getDataFreshness(): Promise<string | null> {
  const { data } = await supabasePublic
    .from("fpl_players")
    .select("updated_at")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.updated_at ?? null;
}

/** Whether the first sync has ever run - drives the empty states. */
export async function hasSyncedOnce(): Promise<boolean> {
  const { count } = await supabasePublic
    .from("fpl_players")
    .select("id", { count: "exact", head: true });

  return (count ?? 0) > 0;
}

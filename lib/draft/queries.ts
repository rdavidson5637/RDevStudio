import { supabasePublic } from "@/lib/supabase/public";

export type CurrentEventInfo = {
  id: number;
  name: string;
  /** The current gameweek's own deadline - already passed once it's live. */
  deadlineTime: string | null;
  /** The next deadline worth counting down to - the whole reason a status
   * bar shows a deadline at all. Falls back to the current event's own
   * deadline if there's no separate "next" row (e.g. season finale). */
  nextDeadlineTime: string | null;
} | null;

/** The gameweek to show in the status bar: the live one if there is one,
 * otherwise the upcoming one (e.g. pre-season, or the gap after deadline
 * before FPL flags the next event as current). */
export async function getCurrentEvent(): Promise<CurrentEventInfo> {
  const { data } = await supabasePublic
    .from("fpl_events")
    .select("id, name, deadline_time, is_current, is_next")
    .or("is_current.eq.true,is_next.eq.true");

  if (!data || data.length === 0) return null;

  const current = data.find((e) => e.is_current) ?? data.find((e) => e.is_next) ?? data[0];
  const next = data.find((e) => e.is_next);

  return {
    id: current.id,
    name: current.name,
    deadlineTime: current.deadline_time,
    nextDeadlineTime: next?.deadline_time ?? current.deadline_time,
  };
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
  // Don't use `count: "exact", head: true`: Next.js's fetch wrapper drops the
  // Content-Range header supabase-js reads the count from, so this always
  // returned false on the live site even when fpl_players was populated.
  const { data, error } = await supabasePublic
    .from("fpl_players")
    .select("id")
    .limit(1)
    .maybeSingle();

  return !error && data != null;
}

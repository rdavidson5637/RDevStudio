import { supabaseAdmin } from "@/lib/supabase/admin";

export type ChangeField = "status" | "news" | "chance_this" | "chance_next";

export type ChangeEvent = {
  playerId: number;
  field: ChangeField;
  from: string | number | null;
  to: string | number | null;
  at: string;
};

export type SnapshotRow = {
  player_id: number;
  captured_at: string;
  status: string | null;
  news: string | null;
  chance_of_playing_this_round: number | null;
  chance_of_playing_next_round: number | null;
};

/**
 * Pure diff over one player's snapshots (already ordered oldest to newest):
 * one change event per tracked field per consecutive pair that differs.
 * Kept separate from getRecentChanges so it's testable with no DB mocking.
 */
export function diffConsecutiveSnapshots(
  playerId: number,
  snapshots: SnapshotRow[],
): ChangeEvent[] {
  if (snapshots.length < 2) return [];

  const events: ChangeEvent[] = [];
  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1];
    const curr = snapshots[i];

    if (prev.status !== curr.status) {
      events.push({ playerId, field: "status", from: prev.status, to: curr.status, at: curr.captured_at });
    }
    if (prev.news !== curr.news) {
      events.push({ playerId, field: "news", from: prev.news, to: curr.news, at: curr.captured_at });
    }
    if (prev.chance_of_playing_this_round !== curr.chance_of_playing_this_round) {
      events.push({
        playerId,
        field: "chance_this",
        from: prev.chance_of_playing_this_round,
        to: curr.chance_of_playing_this_round,
        at: curr.captured_at,
      });
    }
    if (prev.chance_of_playing_next_round !== curr.chance_of_playing_next_round) {
      events.push({
        playerId,
        field: "chance_next",
        from: prev.chance_of_playing_next_round,
        to: curr.chance_of_playing_next_round,
        at: curr.captured_at,
      });
    }
  }
  return events;
}

const STATUS_LABELS: Record<string, string> = {
  a: "Available",
  d: "Doubtful",
  i: "Injured",
  s: "Suspended",
  u: "Unavailable",
  n: "Not in squad",
};

export async function getRecentChanges({
  since,
  playerIds,
}: {
  since: Date;
  playerIds?: number[];
}): Promise<ChangeEvent[]> {
  let query = supabaseAdmin
    .from("fpl_player_snapshots")
    .select("player_id, captured_at, status, news, chance_of_playing_this_round, chance_of_playing_next_round")
    .gte("captured_at", since.toISOString())
    .order("player_id", { ascending: true })
    .order("captured_at", { ascending: true });

  if (playerIds && playerIds.length > 0) {
    query = query.in("player_id", playerIds);
  }

  const { data, error } = await query;
  if (error) throw new Error(`fpl_player_snapshots lookup failed: ${error.message}`);

  const rows = (data ?? []) as SnapshotRow[];
  const byPlayer = new Map<number, SnapshotRow[]>();
  for (const row of rows) {
    const list = byPlayer.get(row.player_id) ?? [];
    list.push(row);
    byPlayer.set(row.player_id, list);
  }

  const events: ChangeEvent[] = [];
  for (const [playerId, snapshots] of byPlayer) {
    events.push(...diffConsecutiveSnapshots(playerId, snapshots));
  }

  return events;
}

/** One plain-English sentence describing a change event, no jargon. */
export function describeChange(event: ChangeEvent): string {
  switch (event.field) {
    case "status": {
      const toLabel = STATUS_LABELS[String(event.to)] ?? String(event.to ?? "unknown");
      if (event.to === "a") return "Cleared to play";
      return `Flagged: ${toLabel}`;
    }
    case "chance_this":
    case "chance_next": {
      const label = event.field === "chance_this" ? "this round" : "next round";
      if (event.from == null) return `Chance of playing ${label} set to ${event.to}%`;
      if (event.to == null) return `Chance of playing ${label} cleared`;
      const direction = Number(event.to) > Number(event.from) ? "rose" : "fell";
      return `Chance of playing ${label} ${direction} from ${event.from}% to ${event.to}%`;
    }
    case "news":
      return event.to ? `News updated: ${event.to}` : "News cleared";
    default:
      return "Updated";
  }
}

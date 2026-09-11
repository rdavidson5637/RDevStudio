import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { chunk, parseDate } from "@/lib/fpl/parse";
import type { DraftElement } from "@/lib/fpl/types";

const TRACKED_FIELDS = [
  "status",
  "news",
  "news_added",
  "chance_of_playing_this_round",
  "chance_of_playing_next_round",
] as const;

type SnapshotRow = {
  player_id: number;
  status: string | null;
  news: string | null;
  news_added: string | null;
  chance_of_playing_this_round: number | null;
  chance_of_playing_next_round: number | null;
};

const INSERT_CHUNK_SIZE = 200;

/**
 * Insert a new fpl_player_snapshots row for any player whose tracked fields
 * changed since their last snapshot (or who has none yet). This table is
 * append-only and only grows on real change, so fetching every latest-row
 * per run stays cheap for a single-league season - a materialised "latest
 * per player" view would only earn its complexity at a scale this project
 * doesn't operate at.
 */
export async function captureSnapshots(players: DraftElement[]): Promise<number> {
  const { data: history, error } = await supabaseAdmin
    .from("fpl_player_snapshots")
    .select(
      "player_id, status, news, news_added, chance_of_playing_this_round, chance_of_playing_next_round, captured_at",
    )
    .order("captured_at", { ascending: false });

  if (error) throw new Error(`fpl_player_snapshots lookup failed: ${error.message}`);

  const latestByPlayer = new Map<number, SnapshotRow>();
  for (const row of (history ?? []) as (SnapshotRow & { captured_at: string })[]) {
    if (!latestByPlayer.has(row.player_id)) {
      latestByPlayer.set(row.player_id, row);
    }
  }

  const toInsert: SnapshotRow[] = [];
  for (const player of players) {
    const next: SnapshotRow = {
      player_id: player.id,
      status: player.status,
      news: player.news,
      news_added: parseDate(player.news_added),
      chance_of_playing_this_round: player.chance_of_playing_this_round,
      chance_of_playing_next_round: player.chance_of_playing_next_round,
    };

    const prev = latestByPlayer.get(player.id);
    const changed = prev
      ? TRACKED_FIELDS.some((field) => prev[field] !== next[field])
      : true;

    if (changed) toInsert.push(next);
  }

  let inserted = 0;
  for (const batch of chunk(toInsert, INSERT_CHUNK_SIZE)) {
    if (batch.length === 0) continue;
    const { error: insertError } = await supabaseAdmin
      .from("fpl_player_snapshots")
      .insert(batch);
    if (insertError) {
      throw new Error(`fpl_player_snapshots insert failed: ${insertError.message}`);
    }
    inserted += batch.length;
  }

  return inserted;
}

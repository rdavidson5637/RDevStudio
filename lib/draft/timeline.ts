import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";

export type TimelineEvent = {
  playerId: number;
  webName: string;
  capturedAt: string;
  fromScore: number | null;
  toScore: number;
  status: string | null;
  news: string | null;
};

async function fetchTimeline(limit = 40): Promise<TimelineEvent[]> {
  const { data: snaps } = await supabasePublic
    .from("fpl_player_snapshots")
    .select("player_id, captured_at, availability_score, status, news")
    .order("captured_at", { ascending: false })
    .limit(800);

  if (!snaps || snaps.length === 0) return [];

  const byPlayer = new Map<number, typeof snaps>();
  for (const row of snaps) {
    const list = byPlayer.get(row.player_id) ?? [];
    list.push(row);
    byPlayer.set(row.player_id, list);
  }

  const changes: Omit<TimelineEvent, "webName">[] = [];
  for (const [playerId, list] of byPlayer) {
    const chronological = [...list].sort(
      (a, b) => new Date(a.captured_at).getTime() - new Date(b.captured_at).getTime(),
    );
    for (let i = 0; i < chronological.length; i++) {
      const prev = chronological[i - 1];
      const curr = chronological[i];
      if (prev && prev.availability_score === curr.availability_score && prev.status === curr.status) {
        continue;
      }
      changes.push({
        playerId,
        capturedAt: curr.captured_at,
        fromScore: prev?.availability_score ?? null,
        toScore: curr.availability_score ?? 0,
        status: curr.status,
        news: curr.news,
      });
    }
  }

  changes.sort((a, b) => new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime());
  const top = changes.slice(0, limit);
  const ids = Array.from(new Set(top.map((c) => c.playerId)));
  const { data: players } = ids.length
    ? await supabasePublic.from("fpl_players").select("id, web_name").in("id", ids)
    : { data: [] };
  const names = new Map((players ?? []).map((p) => [p.id, p.web_name]));

  return top.map((row) => ({
    ...row,
    webName: names.get(row.playerId) ?? `#${row.playerId}`,
  }));
}

export const getStatusTimeline = unstable_cache(fetchTimeline, ["draft-timeline"], {
  tags: ["fpl-players"],
});

export async function getPlayerTimeline(playerId: number): Promise<TimelineEvent[]> {
  const all = await getStatusTimeline(80);
  return all.filter((row) => row.playerId === playerId);
}

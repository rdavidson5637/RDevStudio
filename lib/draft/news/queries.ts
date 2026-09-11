import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";
import type { ReportedSignal } from "@/lib/draft/availability";
import { isNewsSignal, type NewsSignal } from "./match";

const FRESH_MS = 48 * 60 * 60 * 1000;

export type ReportedNewsItem = {
  playerId: number;
  teamId: number | null;
  signal: NewsSignal;
  confidence: number;
  quote: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  webName?: string;
};

function toItem(row: {
  player_id: number;
  team_id: number | null;
  signal: string;
  confidence: number | string | null;
  quote: string | null;
  source_url: string | null;
  source_name: string | null;
  published_at: string | null;
}): ReportedNewsItem | null {
  if (!isNewsSignal(row.signal)) return null;
  return {
    playerId: row.player_id,
    teamId: row.team_id,
    signal: row.signal,
    confidence: Number(row.confidence) || 0,
    quote: row.quote ?? "",
    sourceUrl: row.source_url ?? "",
    sourceName: row.source_name ?? "RSS",
    publishedAt: row.published_at ?? "",
  };
}

function isFreshPublished(publishedAt: string, now = Date.now()): boolean {
  if (!publishedAt) return false;
  const t = new Date(publishedAt).getTime();
  return Number.isFinite(t) && now - t <= FRESH_MS;
}

async function fetchRecentNews(limit = 20): Promise<ReportedNewsItem[]> {
  const { data } = await supabasePublic
    .from("fpl_news_items")
    .select("player_id, team_id, signal, confidence, quote, source_url, source_name, published_at")
    .order("published_at", { ascending: false })
    .limit(limit);
  const items = (data ?? []).map(toItem).filter((row): row is ReportedNewsItem => row != null);
  const ids = Array.from(new Set(items.map((item) => item.playerId)));
  if (ids.length === 0) return items;
  const { data: players } = await supabasePublic.from("fpl_players").select("id, web_name").in("id", ids);
  const nameById = new Map((players ?? []).map((p) => [p.id, p.web_name]));
  return items.map((item) => ({ ...item, webName: nameById.get(item.playerId) }));
}

export const getRecentNews = unstable_cache(fetchRecentNews, ["draft-news"], {
  tags: ["fpl-players"],
});

export async function getNewsForPlayer(playerId: number): Promise<ReportedNewsItem[]> {
  const { data } = await supabasePublic
    .from("fpl_news_items")
    .select("player_id, team_id, signal, confidence, quote, source_url, source_name, published_at")
    .eq("player_id", playerId)
    .order("published_at", { ascending: false })
    .limit(8);
  return (data ?? []).map(toItem).filter((row): row is ReportedNewsItem => row != null);
}

export async function getLatestSignalsForPlayers(
  playerIds: number[],
): Promise<Map<number, ReportedSignal>> {
  const map = new Map<number, ReportedSignal>();
  if (playerIds.length === 0) return map;
  const since = new Date(Date.now() - FRESH_MS).toISOString();
  const wanted = new Set(playerIds);
  let query = supabasePublic
    .from("fpl_news_items")
    .select("player_id, signal, confidence, published_at")
    .gte("published_at", since)
    .order("published_at", { ascending: false })
    .limit(800);
  if (playerIds.length <= 80) {
    query = query.in("player_id", playerIds);
  }
  const { data } = await query;
  for (const row of data ?? []) {
    if (!wanted.has(row.player_id) || map.has(row.player_id) || !isNewsSignal(row.signal)) continue;
    map.set(row.player_id, { signal: row.signal, confidence: Number(row.confidence) || 0 });
  }
  return map;
}

export function toReportedSignal(item: ReportedNewsItem | undefined, now = Date.now()): ReportedSignal | null {
  if (!item || !isFreshPublished(item.publishedAt, now)) return null;
  return { signal: item.signal, confidence: item.confidence };
}

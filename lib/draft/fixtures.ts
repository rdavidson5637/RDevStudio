import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";
import type { TickerFixture } from "./ticker";

export type TeamInfo = { id: number; name: string; short_name: string };

export type UpcomingFixture = TickerFixture & { opponentId: number };

/**
 * Plain objects only. `unstable_cache` JSON-serialises the return value, and a
 * Map survives that as `{}`, so the next request throws on `.get`. That was
 * the player-page 500: metadata never touched the maps, the body did.
 */
type CachedFixtures = {
  teams: TeamInfo[];
  byTeam: Record<string, UpcomingFixture[]>;
};

async function fetchTeamsAndFixtures(fromEvent: number, window: number): Promise<CachedFixtures> {
  const [{ data: teams }, { data: fixtures }] = await Promise.all([
    supabasePublic.from("fpl_teams").select("id, name, short_name"),
    supabasePublic
      .from("fpl_fixtures")
      .select(
        "id, event, kickoff_time, team_h, team_a, team_h_difficulty, team_a_difficulty, finished",
      )
      .gte("event", fromEvent)
      .lt("event", fromEvent + window),
  ]);

  const teamById = new Map<number, TeamInfo>(
    (teams ?? []).map((team) => [team.id, team]),
  );

  const byTeam = new Map<number, UpcomingFixture[]>();
  for (const team of teams ?? []) byTeam.set(team.id, []);

  for (const fixture of fixtures ?? []) {
    if (fixture.event == null) continue;
    const home: UpcomingFixture = {
      event: fixture.event,
      opponent: teamById.get(fixture.team_a)?.short_name ?? "?",
      opponentId: fixture.team_a,
      isHome: true,
      difficulty: fixture.team_h_difficulty ?? 3,
      kickoff: fixture.kickoff_time,
    };
    const away: UpcomingFixture = {
      event: fixture.event,
      opponent: teamById.get(fixture.team_h)?.short_name ?? "?",
      opponentId: fixture.team_h,
      isHome: false,
      difficulty: fixture.team_a_difficulty ?? 3,
      kickoff: fixture.kickoff_time,
    };
    byTeam.get(fixture.team_h)?.push(home);
    byTeam.get(fixture.team_a)?.push(away);
  }

  for (const list of byTeam.values()) {
    list.sort((a, b) => a.event - b.event || Number(a.isHome) - Number(b.isHome));
  }

  const byTeamRecord: Record<string, UpcomingFixture[]> = {};
  for (const [id, list] of byTeam) byTeamRecord[String(id)] = list;

  return { teams: teams ?? [], byTeam: byTeamRecord };
}

const readFixtures = unstable_cache(fetchTeamsAndFixtures, ["draft-fixtures-v2"], {
  tags: ["fpl-fixtures", "fpl-players"],
});

export async function getTeamsAndFixtures(fromEvent: number, window: number) {
  const data = await readFixtures(fromEvent, window);
  return {
    teamById: new Map(data.teams.map((team) => [team.id, team])),
    byTeam: new Map(
      Object.entries(data.byTeam).map(([id, fixtures]) => [Number(id), fixtures]),
    ),
  };
}

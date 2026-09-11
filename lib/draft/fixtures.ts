import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";
import type { TickerFixture } from "./ticker";

export type TeamInfo = { id: number; name: string; short_name: string };

export type UpcomingFixture = TickerFixture & { opponentId: number };

async function fetchTeamsAndFixtures(fromEvent: number, window: number) {
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

  return { teamById, byTeam };
}

export const getTeamsAndFixtures = unstable_cache(fetchTeamsAndFixtures, ["draft-fixtures"], {
  tags: ["fpl-fixtures", "fpl-players"],
});

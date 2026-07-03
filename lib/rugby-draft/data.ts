import nationSquads from "@/data/rugby-draft/nations.json";
import clubSquads from "@/data/rugby-draft/clubs.json";
import type { Squad, GameMode, RugbyCompetition } from "@/types/rugby-draft";

export function getNationSquads(): Squad[] {
  return nationSquads as Squad[];
}

export function getClubSquads(): Squad[] {
  return clubSquads as Squad[];
}

const SIX_NATIONS_TEAMS = [
  "England",
  "Ireland",
  "Wales",
  "Scotland",
  "France",
  "Italy",
];

export function getDraftPool(mode: GameMode): Squad[] {
  if (mode === "champions-cup") return getClubSquads();
  if (mode === "six-nations") {
    return getNationSquads().filter(
      (s) =>
        s.competition === "Six Nations" && SIX_NATIONS_TEAMS.includes(s.club),
    );
  }
  return getNationSquads();
}

export function findSquadByClub(
  squads: Squad[],
  club: string,
  options?: { season?: string; competition?: RugbyCompetition },
): Squad | undefined {
  let matches = squads.filter((s) => s.club === club);
  if (options?.competition) {
    matches = matches.filter((s) => s.competition === options.competition);
  }
  if (options?.season) {
    const bySeason = matches.filter((s) => s.season === options.season);
    if (bySeason.length > 0) matches = bySeason;
  }
  return matches[0];
}

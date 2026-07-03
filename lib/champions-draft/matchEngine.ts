import type {
  TeamRatings,
  MatchResult,
  LeagueTableRow,
  Squad,
} from "@/types/champions-draft";
import {
  calculateTeamRatings,
  simulateMatch,
  simulateKnockoutMatch,
  updateTableWithResult,
  sortTable,
  buildLeagueTable,
} from "./utils";

export function getSquadRatings(squad: Squad): TeamRatings {
  const draftSlots = squad.players.map((p, i) => ({
    position: p.position,
    player: {
      ...p,
      club: squad.club,
      season: squad.season,
      league: squad.league,
    },
    coordinates: { x: 0, y: 0 },
  }));
  return calculateTeamRatings(draftSlots);
}

export function simulateFullMatch(
  userRatings: TeamRatings,
  opponentRatings: TeamRatings,
  userTeamName: string,
  opponentName: string,
  isHome: boolean,
  neutralVenue = false,
): MatchResult {
  if (isHome) {
    return simulateMatch(
      userRatings,
      opponentRatings,
      userTeamName,
      opponentName,
      neutralVenue,
    );
  }
  return simulateMatch(
    opponentRatings,
    userRatings,
    opponentName,
    userTeamName,
    neutralVenue,
  );
}

export function simulateKnockoutFullMatch(
  userRatings: TeamRatings,
  opponentRatings: TeamRatings,
  userTeamName: string,
  opponentName: string,
  isHome: boolean,
  neutralVenue = false,
): MatchResult {
  if (isHome) {
    return simulateKnockoutMatch(
      userRatings,
      opponentRatings,
      userTeamName,
      opponentName,
      neutralVenue,
    );
  }
  return simulateKnockoutMatch(
    opponentRatings,
    userRatings,
    opponentName,
    userTeamName,
    neutralVenue,
  );
}

export function generateKnockoutOpponentResult(
  home: string,
  away: string,
  allSquads: Squad[],
  neutralVenue = false,
): MatchResult {
  const homeSquad = allSquads.find((s) => s.club === home);
  const awaySquad = allSquads.find((s) => s.club === away);

  const homeRatings = homeSquad
    ? getSquadRatings(homeSquad)
    : { attack: 80, midfield: 80, defence: 80, goalkeeper: 80, overall: 80 };
  const awayRatings = awaySquad
    ? getSquadRatings(awaySquad)
    : { attack: 78, midfield: 78, defence: 78, goalkeeper: 78, overall: 78 };

  return simulateKnockoutMatch(
    homeRatings,
    awayRatings,
    home,
    away,
    neutralVenue,
  );
}

export function generateLeagueFixtures(
  userTeam: string,
  opponents: string[],
): Array<{ home: string; away: string }> {
  const allTeams = [userTeam, ...opponents];
  const fixtures: Array<{ home: string; away: string }> = [];

  for (let i = 0; i < allTeams.length; i++) {
    for (let j = i + 1; j < allTeams.length; j++) {
      fixtures.push({ home: allTeams[i], away: allTeams[j] });
      fixtures.push({ home: allTeams[j], away: allTeams[i] });
    }
  }

  return shuffleArray(fixtures);
}

export function generateOpponentVsOpponentResult(
  home: string,
  away: string,
  allSquads: Squad[],
  neutralVenue = false,
): MatchResult {
  const homeSquad = allSquads.find((s) => s.club === home);
  const awaySquad = allSquads.find((s) => s.club === away);

  const homeRatings = homeSquad
    ? getSquadRatings(homeSquad)
    : { attack: 80, midfield: 80, defence: 80, goalkeeper: 80, overall: 80 };
  const awayRatings = awaySquad
    ? getSquadRatings(awaySquad)
    : { attack: 78, midfield: 78, defence: 78, goalkeeper: 78, overall: 78 };

  return simulateMatch(homeRatings, awayRatings, home, away, neutralVenue);
}

export function simulateFullSeason(
  userTeam: string,
  userRatings: TeamRatings,
  leagueSquads: Squad[],
): {
  allResults: MatchResult[];
  table: LeagueTableRow[];
} {
  const opponents = leagueSquads.map((s) => s.club);
  const allTeams = [userTeam, ...opponents];
  let table = buildLeagueTable(allTeams);
  const allResults: MatchResult[] = [];

  const fixtures = generateLeagueFixtures(userTeam, opponents);

  fixtures.forEach((fixture) => {
    let result: MatchResult;
    if (fixture.home === userTeam || fixture.away === userTeam) {
      const isHome = fixture.home === userTeam;
      const opponent = isHome ? fixture.away : fixture.home;
      const oppSquad = leagueSquads.find((s) => s.club === opponent);
      const oppRatings = oppSquad
        ? getSquadRatings(oppSquad)
        : {
            attack: 78,
            midfield: 78,
            defence: 78,
            goalkeeper: 78,
            overall: 78,
          };
      result = simulateFullMatch(
        userRatings,
        oppRatings,
        userTeam,
        opponent,
        isHome,
      );
    } else {
      result = generateOpponentVsOpponentResult(
        fixture.home,
        fixture.away,
        leagueSquads,
      );
    }
    allResults.push(result);
    table = updateTableWithResult(table, result);
  });

  return { allResults, table: sortTable(table) };
}

export function getTopScorer(
  userTeam: string,
  draftedPlayers: string[],
  allResults: MatchResult[],
): { playerName: string; club: string; goals: number } {
  const userGoals = allResults
    .filter((r) => r.homeTeam === userTeam || r.awayTeam === userTeam)
    .reduce((sum, r) => {
      return sum + (r.homeTeam === userTeam ? r.homeScore : r.awayScore);
    }, 0);

  const topAttacker = draftedPlayers[0] ?? "Unknown";
  const goalsPerGame =
    userGoals /
    Math.max(
      1,
      allResults.filter(
        (r) => r.homeTeam === userTeam || r.awayTeam === userTeam,
      ).length,
    );

  return {
    playerName: topAttacker,
    club: userTeam,
    goals: Math.round(userGoals * 0.35),
  };
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const CL_LEAGUE_PHASE_SIZE = 36;
export const CL_LEAGUE_MATCHES_PER_TEAM = 8;

export interface CLLeaguePhase {
  teams: string[];
  fixtures: Array<{ home: string; away: string }>;
  userFixtures: Array<{ home: string; away: string }>;
}

function fixtureExists(
  fixtures: Array<{ home: string; away: string }>,
  a: string,
  b: string,
): boolean {
  return fixtures.some(
    (f) => (f.home === a && f.away === b) || (f.home === b && f.away === a),
  );
}

export function buildCLLeaguePhase(
  userTeam: string,
  clubSquads: Squad[],
): CLLeaguePhase {
  const opponentCount = CL_LEAGUE_PHASE_SIZE - 1;
  const clubs = shuffleArray(clubSquads.map((s) => s.club)).slice(
    0,
    opponentCount,
  );
  const teams = [userTeam, ...clubs];

  const fixtures: Array<{ home: string; away: string }> = [];
  const gamesPlayed: Record<string, number> = {};
  const homeGames: Record<string, number> = {};
  const awayGames: Record<string, number> = {};

  teams.forEach((t) => {
    gamesPlayed[t] = 0;
    homeGames[t] = 0;
    awayGames[t] = 0;
  });

  for (const team of shuffleArray([...teams])) {
    const candidates = shuffleArray(teams.filter((t) => t !== team));
    for (const opp of candidates) {
      if (gamesPlayed[team] >= CL_LEAGUE_MATCHES_PER_TEAM) break;
      if (gamesPlayed[opp] >= CL_LEAGUE_MATCHES_PER_TEAM) continue;
      if (fixtureExists(fixtures, team, opp)) continue;

      let home: string;
      let away: string;
      if (homeGames[team] < 4 && awayGames[opp] < 4) {
        home = team;
        away = opp;
      } else if (homeGames[opp] < 4 && awayGames[team] < 4) {
        home = opp;
        away = team;
      } else {
        continue;
      }

      fixtures.push({ home, away });
      gamesPlayed[team]++;
      gamesPlayed[opp]++;
      homeGames[home]++;
      awayGames[away]++;
    }
  }

  const userFixtures = fixtures.filter(
    (f) => f.home === userTeam || f.away === userTeam,
  );

  return { teams, fixtures, userFixtures };
}

export function simulateCLLeaguePhase(
  userTeam: string,
  userRatings: import("@/types/champions-draft").TeamRatings,
  leaguePhase: CLLeaguePhase,
  allSquads: Squad[],
): {
  table: LeagueTableRow[];
  allResults: import("@/types/champions-draft").MatchResult[];
  userResults: import("@/types/champions-draft").MatchResult[];
} {
  let table = buildLeagueTable(leaguePhase.teams);
  const allResults: import("@/types/champions-draft").MatchResult[] = [];

  shuffleArray(leaguePhase.fixtures).forEach((fixture) => {
    const { home, away } = fixture;
    let result: import("@/types/champions-draft").MatchResult;

    if (home === userTeam || away === userTeam) {
      const isHome = home === userTeam;
      const opponent = isHome ? away : home;
      const oppSquad = allSquads.find((s) => s.club === opponent);
      const oppRatings = oppSquad
        ? getSquadRatings(oppSquad)
        : {
            attack: 80,
            midfield: 80,
            defence: 80,
            goalkeeper: 80,
            overall: 80,
          };
      result = simulateFullMatch(
        userRatings,
        oppRatings,
        userTeam,
        opponent,
        isHome,
      );
    } else {
      result = generateOpponentVsOpponentResult(home, away, allSquads);
    }

    allResults.push(result);
    table = updateTableWithResult(table, result);
  });

  const userResults = allResults.filter(
    (r) => r.homeTeam === userTeam || r.awayTeam === userTeam,
  );

  return { table: sortTable(table), allResults, userResults };
}

export type CLLeagueOutcome = "direct" | "playoff" | "eliminated";

export function getCLLeagueOutcome(position: number): CLLeagueOutcome {
  if (position <= 8) return "direct";
  if (position <= 24) return "playoff";
  return "eliminated";
}

export function getCLDirectQualifiers(table: LeagueTableRow[]): string[] {
  return table.slice(0, 8).map((r) => r.club);
}

export function getCLPlayoffTeams(table: LeagueTableRow[]): string[] {
  return table.slice(8, 24).map((r) => r.club);
}

export function simulateAIKnockoutRound(
  teams: string[],
  roundName: string,
  allSquads: Squad[],
): {
  round: import("@/types/champions-draft").TournamentRound;
  winners: string[];
} {
  const { round, winners } = simulateKnockoutRound(
    "__AI_ONLY__",
    { attack: 0, midfield: 0, defence: 0, goalkeeper: 0, overall: 0 },
    teams,
    roundName,
    allSquads,
  );
  return { round, winners };
}

export function buildCLRoundOf16(
  table: LeagueTableRow[],
  playoffWinners: string[],
): string[] {
  return shuffleArray([...getCLDirectQualifiers(table), ...playoffWinners]);
}

export function buildKnockoutPairings(
  teams: string[],
  roundName: string,
): import("@/types/champions-draft").TournamentRound {
  const paired = shuffleArray([...teams]);
  const fixtures: MatchResult[] = [];

  for (let i = 0; i < paired.length; i += 2) {
    const home = paired[i];
    const away = paired[i + 1];
    if (!home || !away) continue;
    fixtures.push({
      homeTeam: home,
      awayTeam: away,
      homeScore: 0,
      awayScore: 0,
    });
  }

  return { name: roundName, fixtures };
}

export function getUserKnockoutFixture(
  userTeam: string,
  round: import("@/types/champions-draft").TournamentRound,
): MatchResult | null {
  return (
    round.fixtures.find(
      (f) => f.homeTeam === userTeam || f.awayTeam === userTeam,
    ) ?? null
  );
}

export function simulateKnockoutRoundFromPairings(
  userTeam: string,
  userRatings: TeamRatings,
  pairings: import("@/types/champions-draft").TournamentRound,
  allSquads: Squad[],
  neutralVenue = false,
): {
  round: import("@/types/champions-draft").TournamentRound;
  winners: string[];
  userEliminated: boolean;
} {
  const fixtures: MatchResult[] = [];
  const winners: string[] = [];
  let userEliminated = false;

  for (const pairing of pairings.fixtures) {
    const { homeTeam: home, awayTeam: away } = pairing;
    if (!home || !away) {
      winners.push(home ?? away);
      continue;
    }

    let result: MatchResult;
    if (home === userTeam || away === userTeam) {
      const isHome = home === userTeam;
      const opponent = isHome ? away : home;
      const oppSquad = allSquads.find((s) => s.club === opponent);
      const oppRatings = oppSquad
        ? getSquadRatings(oppSquad)
        : {
            attack: 82,
            midfield: 82,
            defence: 82,
            goalkeeper: 82,
            overall: 82,
          };
      result = simulateKnockoutFullMatch(
        userRatings,
        oppRatings,
        userTeam,
        opponent,
        isHome,
        neutralVenue,
      );
    } else {
      result = generateKnockoutOpponentResult(
        home,
        away,
        allSquads,
        neutralVenue,
      );
    }

    fixtures.push(result);

    const winner =
      result.homeScore > result.awayScore ? result.homeTeam : result.awayTeam;
    winners.push(winner);
    if (
      (result.homeTeam === userTeam || result.awayTeam === userTeam) &&
      winner !== userTeam
    ) {
      userEliminated = true;
    }
  }

  return {
    round: { name: pairings.name, fixtures },
    winners,
    userEliminated,
  };
}

export function simulateKnockoutRound(
  userTeam: string,
  userRatings: TeamRatings,
  teams: string[],
  roundName: string,
  allSquads: Squad[],
): {
  round: import("@/types/champions-draft").TournamentRound;
  winners: string[];
  userEliminated: boolean;
} {
  const pairings = buildKnockoutPairings(teams, roundName);
  return simulateKnockoutRoundFromPairings(
    userTeam,
    userRatings,
    pairings,
    allSquads,
  );
}

export function buildWorldCupGroups(
  userTeam: string,
  nations: Squad[],
): import("@/types/champions-draft").WorldCupGroup[] {
  const otherNations = shuffleArray(nations.filter((n) => n.club !== userTeam));
  const selected = otherNations.slice(0, 31);
  const allTeams = [userTeam, ...selected.map((n) => n.club)];
  const groups: import("@/types/champions-draft").WorldCupGroup[] = [];
  const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H"];

  for (let i = 0; i < 8; i++) {
    const start = i * 4;
    const teams = allTeams.slice(start, start + 4);
    if (teams.length < 4) {
      const remaining = allTeams.slice(start);
      if (remaining.length > 0) {
        groups.push({
          name: groupNames[i],
          teams: remaining,
          table: buildLeagueTable(remaining),
          fixtures: [],
        });
      }
      break;
    }
    groups.push({
      name: groupNames[i],
      teams,
      table: buildLeagueTable(teams),
      fixtures: [],
    });
  }

  return groups;
}

export function simulateWorldCupGroups(
  userTeam: string,
  userRatings: import("@/types/champions-draft").TeamRatings,
  groups: import("@/types/champions-draft").WorldCupGroup[],
  allNationSquads: Squad[],
): import("@/types/champions-draft").WorldCupGroup[] {
  return groups.map((group) => {
    const fixtures: import("@/types/champions-draft").MatchResult[] = [];
    let table = buildLeagueTable(group.teams);

    const pairs: Array<[string, string]> = [];
    for (let i = 0; i < group.teams.length; i++) {
      for (let j = i + 1; j < group.teams.length; j++) {
        pairs.push([group.teams[i], group.teams[j]]);
      }
    }

    pairs.forEach(([home, away]) => {
      let result: import("@/types/champions-draft").MatchResult;
      if (home === userTeam || away === userTeam) {
        const isHome = home === userTeam;
        const opponent = isHome ? away : home;
        const oppSquad = allNationSquads.find((s) => s.club === opponent);
        const oppRatings = oppSquad
          ? getSquadRatings(oppSquad)
          : {
              attack: 80,
              midfield: 80,
              defence: 80,
              goalkeeper: 80,
              overall: 80,
            };
        result = simulateFullMatch(
          userRatings,
          oppRatings,
          userTeam,
          opponent,
          isHome,
          true,
        );
      } else {
        result = generateOpponentVsOpponentResult(
          home,
          away,
          allNationSquads,
          true,
        );
      }
      fixtures.push(result);
      table = updateTableWithResult(table, result);
    });

    return {
      ...group,
      fixtures,
      table: sortTable(table),
    };
  });
}

export function getWCKnockoutTeams(
  groups: import("@/types/champions-draft").WorldCupGroup[],
): string[] {
  const qualifiers: string[] = [];
  groups.forEach((group) => {
    const sorted = sortTable(group.table);
    if (sorted[0]) qualifiers.push(sorted[0].club);
    if (sorted[1]) qualifiers.push(sorted[1].club);
  });
  return qualifiers;
}

export function getWCTopScorer(
  userTeam: string,
  draftedAttackers: string[],
  allResults: import("@/types/champions-draft").MatchResult[],
): { playerName: string; club: string; goals: number } {
  const userGoals = allResults
    .filter((r) => r.homeTeam === userTeam || r.awayTeam === userTeam)
    .reduce((sum, r) => {
      return sum + (r.homeTeam === userTeam ? r.homeScore : r.awayScore);
    }, 0);

  const topAttacker = draftedAttackers[0] ?? "Unknown";

  return {
    playerName: topAttacker,
    club: userTeam,
    goals: Math.max(1, Math.round(userGoals * 0.4)),
  };
}

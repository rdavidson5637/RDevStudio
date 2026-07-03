import type {
  TeamRatings,
  MatchResult,
  LeagueTableRow,
  Squad,
  RugbyGroup,
  TournamentRound,
} from "@/types/rugby-draft";
import { findSquadByClub } from "./data";
import {
  calculateTeamRatings,
  updateTableWithResult,
  sortTable,
  buildLeagueTable,
} from "./utils";

const DEFAULT_HOME_RATINGS: TeamRatings = {
  forwards: 80,
  backs: 80,
  overall: 80,
};
const DEFAULT_AWAY_RATINGS: TeamRatings = {
  forwards: 78,
  backs: 78,
  overall: 78,
};

function samplePoisson(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L && k < 12);
  return k - 1;
}

function simulateTries(lambda: number): number {
  return Math.min(6, Math.max(0, samplePoisson(lambda)));
}

function triesToPoints(tries: number): number {
  let points = tries * 5;
  for (let i = 0; i < tries; i++) {
    if (Math.random() < 0.7) points += 2;
  }
  const penalties = Math.floor(Math.random() * 3);
  points += penalties * 3;
  return points;
}

function simulateMatch(
  homeRatings: TeamRatings,
  awayRatings: TeamRatings,
  homeTeam: string,
  awayTeam: string,
  neutralVenue = false,
): MatchResult {
  const homePower = homeRatings.overall + (neutralVenue ? 0 : 2);
  const awayPower = awayRatings.overall;
  const diff = homePower - awayPower;

  const homeAttackEdge = (homeRatings.backs - awayRatings.forwards) * 0.02;
  const awayAttackEdge = (awayRatings.backs - homeRatings.forwards) * 0.02;

  const homeLambda = Math.max(0.5, 2.5 + diff * 0.05 + homeAttackEdge);
  const awayLambda = Math.max(0.5, 2.5 - diff * 0.05 + awayAttackEdge);

  let homeTries = simulateTries(homeLambda);
  let awayTries = simulateTries(awayLambda);

  const maxMargin = Math.abs(diff) > 14 ? 4 : Math.abs(diff) > 8 ? 3 : 3;
  if (homeTries - awayTries > maxMargin) homeTries = awayTries + maxMargin;
  if (awayTries - homeTries > maxMargin) awayTries = homeTries + maxMargin;

  const homeScore = triesToPoints(homeTries);
  const awayScore = triesToPoints(awayTries);

  return { homeTeam, awayTeam, homeScore, awayScore, homeTries, awayTries };
}

function simulateKnockoutMatch(
  homeRatings: TeamRatings,
  awayRatings: TeamRatings,
  homeTeam: string,
  awayTeam: string,
  neutralVenue = false,
): MatchResult {
  const result = simulateMatch(
    homeRatings,
    awayRatings,
    homeTeam,
    awayTeam,
    neutralVenue,
  );
  if (result.homeScore !== result.awayScore) return result;

  const homePower = homeRatings.overall + (neutralVenue ? 0 : 2);
  const awayPower = awayRatings.overall;
  const diff = homePower - awayPower;
  const homeWinChance = 0.5 + Math.max(-0.4, Math.min(0.4, diff * 0.03));
  const homeWins = Math.random() < homeWinChance;

  if (homeWins) {
    return { ...result, homeScore: result.homeScore + 3 };
  }
  return { ...result, awayScore: result.awayScore + 3 };
}

export function getSquadRatings(squad: Squad): TeamRatings {
  const draftSlots = squad.players.map((p) => ({
    position: p.position,
    player: { ...p, club: squad.club, season: squad.season },
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
  const homeSquad = findSquadByClub(allSquads, home);
  const awaySquad = findSquadByClub(allSquads, away);

  const homeRatings = homeSquad
    ? getSquadRatings(homeSquad)
    : DEFAULT_HOME_RATINGS;
  const awayRatings = awaySquad
    ? getSquadRatings(awaySquad)
    : DEFAULT_AWAY_RATINGS;

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
  const homeSquad = findSquadByClub(allSquads, home);
  const awaySquad = findSquadByClub(allSquads, away);

  const homeRatings = homeSquad
    ? getSquadRatings(homeSquad)
    : DEFAULT_HOME_RATINGS;
  const awayRatings = awaySquad
    ? getSquadRatings(awaySquad)
    : DEFAULT_AWAY_RATINGS;

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
        : DEFAULT_AWAY_RATINGS;
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

export function buildKnockoutPairings(
  teams: string[],
  roundName: string,
): TournamentRound {
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

export function simulateKnockoutRoundFromPairings(
  userTeam: string,
  userRatings: TeamRatings,
  pairings: TournamentRound,
  allSquads: Squad[],
  neutralVenue = false,
): {
  round: TournamentRound;
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
      const oppSquad = findSquadByClub(allSquads, opponent);
      const oppRatings = oppSquad
        ? getSquadRatings(oppSquad)
        : DEFAULT_HOME_RATINGS;
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
  round: TournamentRound;
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

export function buildGroupStage(
  userTeam: string,
  allSquads: Squad[],
  groupCount: number,
  teamsPerGroup: number,
): RugbyGroup[] {
  const totalTeams = groupCount * teamsPerGroup;
  const otherSquads = shuffleArray(
    allSquads.filter((s) => s.club !== userTeam),
  );
  const selected = otherSquads.slice(0, totalTeams - 1);
  const allTeams = shuffleArray([userTeam, ...selected.map((s) => s.club)]);
  const groupNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .slice(0, groupCount);
  const groups: RugbyGroup[] = [];

  for (let i = 0; i < groupCount; i++) {
    const start = i * teamsPerGroup;
    const teams = allTeams.slice(start, start + teamsPerGroup);
    if (teams.length === 0) continue;
    groups.push({
      name: groupNames[i],
      teams,
      table: buildLeagueTable(teams),
      fixtures: [],
    });
  }

  return groups;
}

export function simulateGroups(
  userTeam: string,
  userRatings: TeamRatings,
  groups: RugbyGroup[],
  allSquads: Squad[],
): RugbyGroup[] {
  return groups.map((group) => {
    const fixtures: MatchResult[] = [];
    let table = buildLeagueTable(group.teams);

    const pairs: Array<[string, string]> = [];
    for (let i = 0; i < group.teams.length; i++) {
      for (let j = i + 1; j < group.teams.length; j++) {
        pairs.push([group.teams[i], group.teams[j]]);
      }
    }

    pairs.forEach(([home, away]) => {
      let result: MatchResult;
      if (home === userTeam || away === userTeam) {
        const isHome = home === userTeam;
        const opponent = isHome ? away : home;
        const oppSquad = findSquadByClub(allSquads, opponent);
        const oppRatings = oppSquad
          ? getSquadRatings(oppSquad)
          : DEFAULT_HOME_RATINGS;
        result = simulateFullMatch(
          userRatings,
          oppRatings,
          userTeam,
          opponent,
          isHome,
          true,
        );
      } else {
        result = generateOpponentVsOpponentResult(home, away, allSquads, true);
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

export function getGroupQualifiers(
  groups: RugbyGroup[],
  qualifiersPerGroup: number,
): string[] {
  const qualifiers: string[] = [];
  groups.forEach((group) => {
    const sorted = sortTable(group.table);
    for (let i = 0; i < qualifiersPerGroup; i++) {
      if (sorted[i]) qualifiers.push(sorted[i].club);
    }
  });
  return qualifiers;
}

export interface TryScorerCandidate {
  name: string;
  weight: number;
}

export function getTopTryScorer(
  userTeam: string,
  candidates: TryScorerCandidate[],
  allResults: MatchResult[],
): { playerName: string; club: string; tries: number } {
  const userTries = allResults
    .filter((r) => r.homeTeam === userTeam || r.awayTeam === userTeam)
    .reduce((sum, r) => {
      return (
        sum +
        (r.homeTeam === userTeam ? (r.homeTries ?? 0) : (r.awayTries ?? 0))
      );
    }, 0);

  if (candidates.length === 0) {
    return { playerName: "—", club: userTeam, tries: userTries };
  }

  const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
  let bestName = candidates[0].name;
  let bestTries = 0;
  let bestWeight = candidates[0].weight;

  for (const candidate of candidates) {
    const share =
      totalWeight > 0 ? (userTries * candidate.weight) / totalWeight : 0;
    const tries = Math.round(share);
    if (
      tries > bestTries ||
      (tries === bestTries && candidate.weight > bestWeight)
    ) {
      bestTries = tries;
      bestName = candidate.name;
      bestWeight = candidate.weight;
    }
  }

  return {
    playerName: bestName,
    club: userTeam,
    tries: userTries > 0 ? Math.max(1, bestTries) : 0,
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

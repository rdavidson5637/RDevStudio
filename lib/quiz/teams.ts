import { randomUUID } from "crypto";

import type { GameState, Player, Team } from "./types";

export const TEAM_COLOURS = [
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
] as const;

export function isValidTeamColour(colour: string): boolean {
  return (TEAM_COLOURS as readonly string[]).includes(colour);
}

export function findTeamForPlayer(
  teams: Team[] | null | undefined,
  playerId: string
): Team | undefined {
  return teams?.find((team) => team.playerIds.includes(playerId));
}

export function applyPointsToPlayerTeam(
  teams: Team[] | null | undefined,
  playerId: string,
  points: number
): void {
  const team = findTeamForPlayer(teams, playerId);

  if (team) {
    team.score = Math.max(0, team.score + points);
  }
}

export function getSortedTeams(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => b.score - a.score);
}

export function getUnassignedPlayerIds(
  players: Player[],
  teams: Team[]
): string[] {
  const assigned = new Set(teams.flatMap((team) => team.playerIds));
  return players.filter((player) => !assigned.has(player.id)).map((p) => p.id);
}

export function removePlayerFromTeams(teams: Team[], playerId: string): Team[] {
  return teams.map((team) => ({
    ...team,
    playerIds: team.playerIds.filter((id) => id !== playerId),
  }));
}

export function createDefaultTeams(teamCount: number): Team[] {
  const count = Math.min(4, Math.max(2, teamCount));

  return Array.from({ length: count }, (_, index) => ({
    id: `team_${index + 1}`,
    name: `Team ${index + 1}`,
    colour: TEAM_COLOURS[index % TEAM_COLOURS.length],
    playerIds: [],
    score: 0,
  }));
}

export function autoAssignTeams(players: Player[], teams: Team[]): Team[] {
  const shuffled = [...players].sort(() => Math.random() - 0.5);
  const nextTeams = teams.map((team) => ({
    ...team,
    playerIds: [] as string[],
  }));

  shuffled.forEach((player, index) => {
    const team = nextTeams[index % nextTeams.length];
    team.playerIds.push(player.id);
  });

  return nextTeams;
}

export function validateTeamAssignments(
  players: Player[],
  teams: Team[]
): string | null {
  if (teams.length < 2) {
    return "At least 2 teams are required";
  }

  const seen = new Set<string>();

  for (const team of teams) {
    for (const playerId of team.playerIds) {
      if (!players.some((player) => player.id === playerId)) {
        return "Invalid player in team assignment";
      }

      if (seen.has(playerId)) {
        return "A player cannot be on more than one team";
      }

      seen.add(playerId);
    }
  }

  const unassigned = getUnassignedPlayerIds(players, teams);

  if (unassigned.length > 0) {
    return `${unassigned.length} player${unassigned.length === 1 ? "" : "s"} still unassigned`;
  }

  return null;
}

export function normalizeTeamsFromRequest(
  teams: Array<{ name: string; colour: string; playerIds: string[] }>
): Team[] {
  return teams.map((team, index) => ({
    id: `team_${index + 1}_${randomUUID().slice(0, 8)}`,
    name: team.name.trim() || `Team ${index + 1}`,
    colour: isValidTeamColour(team.colour)
      ? team.colour
      : TEAM_COLOURS[index % TEAM_COLOURS.length],
    playerIds: [...team.playerIds],
    score: 0,
  }));
}

export function preserveTeamScores(
  existing: Team[] | null,
  updated: Team[]
): Team[] {
  if (!existing?.length) {
    return updated;
  }

  return updated.map((team) => {
    const match = existing.find(
      (item) =>
        item.name === team.name &&
        item.colour === team.colour &&
        item.playerIds.length === team.playerIds.length &&
        item.playerIds.every((id) => team.playerIds.includes(id))
    );

    return match ? { ...team, id: match.id, score: match.score } : team;
  });
}

export function findMvp(players: Player[]): Player | undefined {
  return [...players].sort((a, b) => b.score - a.score)[0];
}

export function hasTeammateAnsweredQuestion(
  game: GameState,
  playerId: string,
  questionId: string
): boolean {
  if (!game.teamMode || !game.teams) {
    return false;
  }

  const team = findTeamForPlayer(game.teams, playerId);

  if (!team) {
    return false;
  }

  return team.playerIds.some((teammateId) => {
    if (teammateId === playerId) {
      return false;
    }

    const teammate = game.players.find((player) => player.id === teammateId);

    return teammate?.answers.some(
      (answer) => answer.questionId === questionId
    );
  });
}

export function lockTeamOutOfBuzzing(game: GameState, teamId: string): void {
  if (!game.buzzLockedOutTeamIds) {
    game.buzzLockedOutTeamIds = [];
  }

  if (!game.buzzLockedOutTeamIds.includes(teamId)) {
    game.buzzLockedOutTeamIds.push(teamId);
  }

  const team = game.teams?.find((entry) => entry.id === teamId);

  if (!team) {
    return;
  }

  for (const memberId of team.playerIds) {
    if (!game.buzzLockedOutPlayerIds.includes(memberId)) {
      game.buzzLockedOutPlayerIds.push(memberId);
    }
  }
}

export function buildTeamStandings(
  teams: Team[],
  players: Player[]
): Array<{ team: Team; members: Player[] }> {
  return getSortedTeams(teams).map((team) => ({
    team,
    members: team.playerIds
      .map((id) => players.find((player) => player.id === id))
      .filter((player): player is Player => Boolean(player))
      .sort((a, b) => b.score - a.score),
  }));
}

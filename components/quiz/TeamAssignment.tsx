"use client";

import { useMemo, useState } from "react";

import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import {
  TEAM_COLOURS,
  autoAssignTeams,
  getUnassignedPlayerIds,
} from "@/lib/quiz/teams";
import type { Player, Team } from "@/lib/quiz/types";

interface TeamAssignmentProps {
  players: Player[];
  teams: Team[];
  isHost: boolean;
  onTeamsChange: (teams: Team[]) => void;
  onSaveTeams: (teams: Team[]) => Promise<void>;
}

export function TeamAssignment({
  players,
  teams,
  isHost,
  onTeamsChange,
  onSaveTeams,
}: TeamAssignmentProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const unassignedIds = useMemo(
    () => getUnassignedPlayerIds(players, teams),
    [players, teams],
  );

  const unassignedPlayers = players.filter((player) =>
    unassignedIds.includes(player.id),
  );

  async function persistTeams(nextTeams: Team[]) {
    onTeamsChange(nextTeams);

    if (!isHost) {
      return;
    }

    setSaving(true);

    try {
      await onSaveTeams(nextTeams);
    } finally {
      setSaving(false);
    }
  }

  function assignPlayerToTeam(playerId: string, teamId: string) {
    const nextTeams = teams.map((team) => ({
      ...team,
      playerIds:
        team.id === teamId
          ? [...team.playerIds.filter((id) => id !== playerId), playerId]
          : team.playerIds.filter((id) => id !== playerId),
    }));

    void persistTeams(nextTeams);
    setSelectedPlayerId(null);
  }

  function handlePlayerTap(playerId: string) {
    if (!isHost) {
      return;
    }

    if (selectedPlayerId === playerId) {
      setSelectedPlayerId(null);
      return;
    }

    setSelectedPlayerId(playerId);
  }

  function handleTeamTap(teamId: string) {
    if (!isHost || !selectedPlayerId) {
      return;
    }

    assignPlayerToTeam(selectedPlayerId, teamId);
  }

  function removeFromTeam(playerId: string) {
    if (!isHost) {
      return;
    }

    const nextTeams = teams.map((team) => ({
      ...team,
      playerIds: team.playerIds.filter((id) => id !== playerId),
    }));

    void persistTeams(nextTeams);
  }

  function updateTeamName(teamId: string, name: string) {
    const nextTeams = teams.map((team) =>
      team.id === teamId ? { ...team, name } : team,
    );
    onTeamsChange(nextTeams);
  }

  function updateTeamColour(teamId: string, colour: string) {
    const nextTeams = teams.map((team) =>
      team.id === teamId ? { ...team, colour } : team,
    );
    void persistTeams(nextTeams);
  }

  function addTeam() {
    if (!isHost || teams.length >= 4) {
      return;
    }

    const nextTeams = [
      ...teams,
      {
        id: `team_${teams.length + 1}`,
        name: `Team ${teams.length + 1}`,
        colour: TEAM_COLOURS[teams.length % TEAM_COLOURS.length],
        playerIds: [],
        score: 0,
      },
    ];

    void persistTeams(nextTeams);
  }

  function removeTeam(teamId: string) {
    if (!isHost || teams.length <= 2) {
      return;
    }

    void persistTeams(teams.filter((team) => team.id !== teamId));
  }

  async function handleAutoAssign() {
    if (!isHost) {
      return;
    }

    await persistTeams(autoAssignTeams(players, teams));
  }

  async function handleSaveNames() {
    if (!isHost) {
      return;
    }

    await persistTeams(teams);
  }

  return (
    <div className="space-y-5 rounded-2xl border border-quiz-border bg-quiz-surface p-5 text-left">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl text-white">Team Assignment</h3>
          <p className="mt-1 text-sm text-quiz-muted">
            {isHost
              ? "Tap a player, then tap a team to assign them"
              : "Teams are being set up by the host"}
          </p>
        </div>
        {isHost ? (
          <span className="text-xs text-quiz-muted">
            {saving ? "Saving..." : " "}
          </span>
        ) : null}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
          Unassigned ({unassignedPlayers.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {unassignedPlayers.length === 0 ? (
            <p className="text-sm text-green-400">Everyone is on a team ✓</p>
          ) : (
            unassignedPlayers.map((player) => (
              <button
                key={player.id}
                type="button"
                disabled={!isHost}
                onClick={() => handlePlayerTap(player.id)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors ${
                  selectedPlayerId === player.id
                    ? "border-quiz-amber bg-quiz-amber/15"
                    : "border-quiz-border bg-quiz-bg hover:border-quiz-amber/40"
                } ${!isHost ? "cursor-default" : ""}`}
              >
                <PlayerAvatar player={player} size="sm" />
                <span className="text-sm font-medium text-white">
                  {player.name}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="space-y-3">
        {teams.map((team) => {
          const teamPlayers = team.playerIds
            .map((id) => players.find((player) => player.id === id))
            .filter((player): player is Player => Boolean(player));

          return (
            <div
              key={team.id}
              className="rounded-xl border border-quiz-border bg-quiz-bg/50 p-4"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className="h-8 w-8 shrink-0 rounded-lg"
                  style={{ backgroundColor: team.colour }}
                />
                {isHost ? (
                  <input
                    className="quiz-input max-w-[10rem] py-2 text-sm"
                    value={team.name}
                    onChange={(event) =>
                      updateTeamName(team.id, event.target.value)
                    }
                    onBlur={() => void handleSaveNames()}
                  />
                ) : (
                  <p className="font-semibold text-white">{team.name}</p>
                )}
                {isHost && teams.length > 2 ? (
                  <button
                    type="button"
                    onClick={() => removeTeam(team.id)}
                    className="ml-auto text-xs text-quiz-muted hover:text-red-400"
                  >
                    Remove
                  </button>
                ) : null}
              </div>

              {isHost ? (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {TEAM_COLOURS.map((colour) => (
                    <button
                      key={colour}
                      type="button"
                      onClick={() => updateTeamColour(team.id, colour)}
                      className={`h-7 w-7 rounded-full border-2 ${
                        team.colour === colour
                          ? "border-white"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: colour }}
                      aria-label={`Set team colour ${colour}`}
                    />
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                disabled={!isHost || !selectedPlayerId}
                onClick={() => handleTeamTap(team.id)}
                className={`min-h-[3.5rem] w-full rounded-xl border border-dashed px-3 py-2 transition-colors ${
                  selectedPlayerId
                    ? "border-quiz-amber/60 hover:bg-quiz-amber/10"
                    : "border-quiz-border"
                }`}
              >
                {teamPlayers.length === 0 ? (
                  <p className="text-sm text-quiz-muted">
                    {selectedPlayerId ? "Tap to assign here" : "No players yet"}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {teamPlayers.map((player) => (
                      <button
                        key={player.id}
                        type="button"
                        disabled={!isHost}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (isHost) {
                            removeFromTeam(player.id);
                          }
                        }}
                        className="flex items-center gap-2 rounded-lg bg-quiz-surface px-2 py-1"
                      >
                        <PlayerAvatar player={player} size="sm" />
                        <span className="text-sm text-white">
                          {player.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {isHost ? (
        <div className="flex flex-wrap gap-2">
          {teams.length < 4 ? (
            <button
              type="button"
              onClick={addTeam}
              className="quiz-btn-secondary text-sm"
            >
              + Add team
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void handleAutoAssign()}
            className="quiz-btn-secondary text-sm"
          >
            Auto-assign
          </button>
        </div>
      ) : null}
    </div>
  );
}

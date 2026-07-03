"use client";

import confetti from "canvas-confetti";
import Link from "next/link";
import { useEffect } from "react";

import { LeaderboardRow } from "@/components/quiz/LeaderboardRow";
import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import { TeamLeaderboard } from "@/components/quiz/TeamLeaderboard";
import { getPlayerColour } from "@/lib/quiz/player-identity";
import { findMvp } from "@/lib/quiz/teams";
import { clearQuizSession } from "@/lib/quiz/session";
import type { Player, Team } from "@/lib/quiz/types";

interface FinishedScreenProps {
  players: Player[];
  playerId: string;
  playerName: string;
  totalQuestions: number;
  teamMode?: boolean;
  teams?: Team[];
}

export function FinishedScreen({
  players,
  playerId,
  playerName,
  totalQuestions,
  teamMode = false,
  teams = [],
}: FinishedScreenProps) {
  const winner = players[0];
  const winningTeam = teams[0];
  const mvp = findMvp(players);
  const currentPlayer = players.find((player) => player.id === playerId);
  const currentRank = players.findIndex((player) => player.id === playerId) + 1;
  const currentTeam = teams.find((team) => team.playerIds.includes(playerId));

  useEffect(() => {
    const colours =
      teamMode && winningTeam
        ? [winningTeam.colour, "#e8a317", "#f4f0e6"]
        : winner
          ? [getPlayerColour(winner), "#e8a317", "#f4f0e6"]
          : null;

    if (!colours) {
      return;
    }

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.65 },
      colors: colours,
    });

    const burst = window.setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colours,
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colours,
      });
    }, 250);

    return () => window.clearTimeout(burst);
  }, [teamMode, winningTeam, winner]);

  function handlePlayAgain() {
    clearQuizSession();
  }

  return (
    <div className="flex min-h-[calc(100vh-6rem)] w-full max-w-2xl flex-col gap-8">
      <div className="text-center">
        <p className="quiz-kicker">Game over</p>
        <h1 className="mt-2 font-serif text-4xl text-quiz-ink sm:text-5xl">
          Final results
        </h1>
      </div>

      {teamMode && winningTeam ? (
        <div
          className="reveal-pop rounded-2xl border p-8 text-center"
          style={{
            borderColor: `${winningTeam.colour}66`,
            background: `linear-gradient(to bottom, ${winningTeam.colour}22, transparent)`,
          }}
        >
          <p className="text-4xl">👑</p>
          <p className="mt-2 text-sm uppercase tracking-widest text-quiz-muted">
            Winning Team
          </p>
          <p
            className="mt-1 font-serif text-3xl font-bold text-white"
            style={{ color: winningTeam.colour }}
          >
            {winningTeam.name}
          </p>
          <p className="mt-2 text-2xl font-bold text-quiz-amber">
            {winningTeam.score} points
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {winningTeam.playerIds
              .map((id) => players.find((player) => player.id === id))
              .filter((player): player is Player => Boolean(player))
              .map((player) => (
                <PlayerAvatar
                  key={player.id}
                  player={player}
                  size="lg"
                  showName
                />
              ))}
          </div>
        </div>
      ) : winner ? (
        <div className="reveal-pop rounded-2xl border border-quiz-amber/40 bg-gradient-to-b from-quiz-amber/15 to-quiz-surface p-8 text-center">
          <div className="flex justify-center">
            <PlayerAvatar player={winner} size="lg" showName />
          </div>
          <p className="mt-3 text-sm uppercase tracking-widest text-quiz-muted">
            Winner
          </p>
          <p className="mt-2 text-2xl font-bold text-quiz-amber">
            {winner.score} points
          </p>
        </div>
      ) : null}

      {teamMode && mvp ? (
        <div className="rounded-xl border border-quiz-border bg-quiz-surface px-5 py-4 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-quiz-muted">
            Individual MVP
          </p>
          <div className="mt-3 flex flex-col items-center gap-2">
            <PlayerAvatar player={mvp} size="lg" showName />
            <p className="text-lg text-white">{mvp.score} personal points</p>
          </div>
        </div>
      ) : null}

      {currentPlayer ? (
        <div className="rounded-xl border border-quiz-border bg-quiz-surface px-5 py-4 text-center">
          <p className="text-sm text-quiz-muted">Your result</p>
          <p className="mt-1 text-lg text-white">
            {teamMode && currentTeam ? (
              <>
                <span style={{ color: currentTeam.colour }}>
                  {currentTeam.name}
                </span>
                {" · "}
              </>
            ) : null}
            {!teamMode ? (
              <>
                <span className="font-semibold text-quiz-amber">
                  #{currentRank}
                </span>
                {" · "}
              </>
            ) : null}
            {playerName} — {currentPlayer.score} pts across {totalQuestions}{" "}
            questions
          </p>
        </div>
      ) : null}

      <div className="space-y-3">
        <h2 className="text-center text-sm font-medium uppercase tracking-[0.15em] text-quiz-muted">
          {teamMode ? "Team breakdown" : "Final standings"}
        </h2>

        {teamMode && teams.length > 0 ? (
          <TeamLeaderboard
            teams={teams}
            players={players}
            currentPlayerId={playerId}
            showDelta={false}
          />
        ) : (
          <ul className="space-y-2">
            {players.map((player, index) => (
              <LeaderboardRow
                key={player.id}
                rank={index + 1}
                player={player}
                isCurrentPlayer={player.id === playerId}
                pointsDelta={0}
                showDelta={false}
                animationDelayMs={index * 50}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:justify-center">
        <Link
          href="/pub-quiz"
          onClick={handlePlayAgain}
          className="quiz-btn-primary text-center"
        >
          Host a New Game
        </Link>
        <Link
          href="/pub-quiz?panel=join"
          onClick={handlePlayAgain}
          className="quiz-btn-secondary text-center"
        >
          Join another game
        </Link>
      </div>
    </div>
  );
}

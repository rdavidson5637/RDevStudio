"use client";

import { useEffect, useState } from "react";

import { LeaderboardRow } from "@/components/quiz/LeaderboardRow";
import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import { PlayerResultsGrid } from "@/components/quiz/PlayerResultsGrid";
import { TeamLeaderboard } from "@/components/quiz/TeamLeaderboard";
import { ScorePopup } from "@/components/quiz/ScorePopup";
import { POINTS_BASE } from "@/lib/quiz/scoring";
import { playCorrectSound, playRevealSound, playWrongSound } from "@/lib/quiz/sounds";
import { RoundFormat, type Player, type Question, type Team } from "@/lib/quiz/types";
import { RISK_WRONG_DEDUCTION } from "@/lib/quiz/scoring";

interface PlayerResult {
  playerId: string;
  answer: string;
  isCorrect: boolean;
  pointsAwarded: number;
}

interface RevealScreenProps {
  question: Question;
  leaderboard: Player[];
  playerResults: PlayerResult[];
  previousScores: Record<string, number>;
  playerId: string;
  isHost: boolean;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  isEndOfRound?: boolean;
  isAdvancing?: boolean;
  teamMode?: boolean;
  teams?: Team[];
}

function CheckIcon() {
  return (
    <svg
      className="h-6 w-6 text-green-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-6 w-6 text-red-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-6 w-6 text-quiz-amber"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 3" />
    </svg>
  );
}

export function RevealScreen({
  question,
  leaderboard,
  playerResults,
  previousScores,
  playerId,
  isHost,
  onNext,
  questionNumber,
  totalQuestions,
  isLastQuestion,
  isEndOfRound = false,
  isAdvancing = false,
  teamMode = false,
  teams = [],
}: RevealScreenProps) {
  const currentResult = playerResults.find(
    (result) => result.playerId === playerId
  );
  const currentPlayer = leaderboard.find((player) => player.id === playerId);

  const [showScorePopup] = useState(
    () => (currentResult?.pointsAwarded ?? 0) > 0
  );

  const timedOut =
    !currentResult?.answer || currentResult.answer.trim() === "";

  useEffect(() => {
    playRevealSound();
    if (currentResult?.isCorrect) {
      playCorrectSound();
    } else if (currentResult && !timedOut) {
      playWrongSound();
    }
  }, [currentResult, timedOut]);
  const speedBonus = currentResult?.isCorrect
    ? Math.max(0, currentResult.pointsAwarded - POINTS_BASE)
    : 0;

  const isRiskRound = question.format === RoundFormat.RISK;
  const riskWrong =
    isRiskRound && currentResult && !currentResult.isCorrect && !timedOut;

  const previousTeamScores = Object.fromEntries(
    teams.map((team) => {
      const delta = team.playerIds.reduce((sum, memberId) => {
        const result = playerResults.find(
          (entry) => entry.playerId === memberId
        );
        return sum + (result?.pointsAwarded ?? 0);
      }, 0);

      return [team.id, team.score - delta];
    })
  );

  const currentTeam = teams.find((team) =>
    team.playerIds.includes(playerId)
  );
  const teamPointsDelta = currentTeam
    ? currentTeam.score - (previousTeamScores[currentTeam.id] ?? currentTeam.score)
    : 0;

  return (
    <div className="relative flex min-h-[calc(100vh-6rem)] w-full max-w-2xl flex-col gap-8">
      {showScorePopup && currentResult ? (
        <ScorePopup
          points={currentResult.pointsAwarded}
          isBonus={speedBonus > 0}
        />
      ) : null}

      <section className="space-y-4 text-center">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">
          The answer was...
        </h2>
        <p className="reveal-pop font-serif text-4xl font-bold text-quiz-amber sm:text-5xl">
          {question.correctAnswer}
        </p>
        {question.explanation ? (
          <p className="text-sm text-quiz-muted sm:text-base">
            {question.explanation}
          </p>
        ) : null}
      </section>

      <section className="result-fade-in rounded-2xl border border-quiz-border bg-quiz-surface p-5">
        {currentPlayer ? (
          <div className="mb-4 flex justify-center">
            <PlayerAvatar player={currentPlayer} size="lg" showName />
          </div>
        ) : null}

        {currentResult ? (
          timedOut ? (
            <div className="flex items-center justify-center gap-3">
              <ClockIcon />
              <p className="text-lg font-medium text-quiz-amber">Out of time!</p>
            </div>
          ) : currentResult.isCorrect ? (
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <CheckIcon />
                <p className="text-lg font-semibold text-green-400">
                  Correct! +{currentResult.pointsAwarded} points
                </p>
              </div>
              {teamMode && currentTeam && teamPointsDelta !== 0 ? (
                <p
                  className="text-sm font-medium"
                  style={{ color: currentTeam.colour }}
                >
                  {teamPointsDelta > 0 ? "+" : ""}
                  {teamPointsDelta} for {currentTeam.name}
                </p>
              ) : null}
              {speedBonus > 0 ? (
                <p className="text-sm text-quiz-muted">
                  {POINTS_BASE} + {speedBonus} speed bonus
                </p>
              ) : null}
            </div>
          ) : riskWrong ? (
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <XIcon />
                <p className="text-lg font-semibold text-red-400">
                  -{RISK_WRONG_DEDUCTION} points
                </p>
              </div>
              {teamMode && currentTeam && teamPointsDelta < 0 ? (
                <p
                  className="text-sm font-medium"
                  style={{ color: currentTeam.colour }}
                >
                  {teamPointsDelta} for {currentTeam.name}
                </p>
              ) : null}
              <p className="text-sm text-quiz-muted">
                The answer was {question.correctAnswer}
              </p>
              <p className="text-sm text-red-300/80">😬 Risky business</p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-center">
              <XIcon />
              <p className="text-lg font-medium text-red-400">
                Unlucky. The answer was {question.correctAnswer}
              </p>
            </div>
          )
        ) : null}
      </section>

      <PlayerResultsGrid players={leaderboard} playerResults={playerResults} />

      <section className="flex-1 space-y-4">
        <h3 className="text-center text-sm font-medium uppercase tracking-[0.15em] text-quiz-muted">
          {teamMode
            ? "Team standings"
            : `Standings after question ${questionNumber} of ${totalQuestions}`}
        </h3>

        {teamMode && teams.length > 0 ? (
          <TeamLeaderboard
            teams={teams}
            players={leaderboard}
            currentPlayerId={playerId}
            previousTeamScores={previousTeamScores}
          />
        ) : (
          <ul className="space-y-2">
            {leaderboard.map((player, index) => (
              <LeaderboardRow
                key={player.id}
                rank={index + 1}
                player={player}
                isCurrentPlayer={player.id === playerId}
                pointsDelta={player.score - (previousScores[player.id] ?? 0)}
                animationDelayMs={index * 50}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3 pb-4 text-center">
        {isHost ? (
          <>
            <button
              type="button"
              onClick={onNext}
              disabled={isAdvancing}
              className="quiz-btn-primary w-full sm:w-auto"
            >
              {isAdvancing
                ? "Loading..."
                : isLastQuestion
                  ? "See Final Results →"
                  : isEndOfRound
                    ? "Round Standings →"
                    : "Next Question →"}
            </button>
            <p className="text-xs text-quiz-muted">(only you can see this)</p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-quiz-muted">Waiting for host to continue...</p>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

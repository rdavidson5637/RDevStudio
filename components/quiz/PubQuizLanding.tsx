"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { AvatarPicker } from "@/components/quiz/AvatarPicker";
import { QuestionPreview } from "@/components/quiz/QuestionPreview";
import { QuizPresets } from "@/components/quiz/QuizPresets";
import { RoundBuilder } from "@/components/quiz/RoundBuilder";
import { createDefaultRound } from "@/lib/quiz/rounds";
import { saveLobbyCache, saveQuizSession } from "@/lib/quiz/session";
import {
  PLAYER_AVATARS,
  PLAYER_COLOURS,
  QuizCategory,
  type RoundConfig,
} from "@/lib/quiz/types";

type Panel = "none" | "host" | "join";

export function PubQuizLanding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const joinCode = searchParams.get("join");
  const statusMessage = searchParams.get("message");

  const [panel, setPanel] = useState<Panel>("none");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [hostName, setHostName] = useState("");
  const [hostAvatar, setHostAvatar] = useState<string>(PLAYER_AVATARS[0]);
  const [hostColour, setHostColour] = useState<string>(PLAYER_COLOURS[0]);
  const [roundConfigs, setRoundConfigs] = useState<RoundConfig[]>([
    createDefaultRound(1, QuizCategory.GENERAL),
  ]);
  const [teamMode, setTeamMode] = useState(false);
  const [teamCount, setTeamCount] = useState(2);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  const [joinName, setJoinName] = useState("");
  const [joinAvatar, setJoinAvatar] = useState<string>(PLAYER_AVATARS[0]);
  const [joinColour, setJoinColour] = useState<string>(PLAYER_COLOURS[0]);
  const [gameCode, setGameCode] = useState("");

  useEffect(() => {
    if (joinCode) {
      setPanel("join");
      setGameCode(joinCode.toUpperCase().slice(0, 6));
      return;
    }

    if (searchParams.get("panel") === "join") {
      setPanel("join");
    }
  }, [joinCode, searchParams]);

  async function handleCreateGame(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/quiz/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hostName: hostName.trim(),
          colour: hostColour,
          avatar: hostAvatar,
          roundConfigs,
          teamMode,
          teamCount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create game");
      }

      const hostPlayer = data.gameState.players.find(
        (player: { id: string }) => player.id === data.playerId
      );

      saveQuizSession({
        playerId: data.playerId,
        isHost: true,
        gameId: data.gameId,
        playerName: hostName.trim(),
        colour: hostPlayer?.colour ?? hostColour,
        avatar: hostPlayer?.avatar ?? hostAvatar,
      });
      saveLobbyCache(data.gameState);

      router.push(`/pub-quiz/${data.gameId}`);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Failed to create game"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinGame(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/quiz/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: gameCode.trim().toUpperCase(),
          playerName: joinName.trim(),
          colour: joinColour,
          avatar: joinAvatar,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to join game");
      }

      const joinedPlayer = data.gameState.players.find(
        (player: { id: string }) => player.id === data.playerId
      );

      saveQuizSession({
        playerId: data.playerId,
        isHost: false,
        gameId: gameCode.trim().toUpperCase(),
        playerName: joinName.trim(),
        colour: joinedPlayer?.colour ?? joinColour,
        avatar: joinedPlayer?.avatar ?? joinAvatar,
      });
      saveLobbyCache(data.gameState);

      router.push(`/pub-quiz/${gameCode.trim().toUpperCase()}`);
    } catch (joinError) {
      setError(
        joinError instanceof Error ? joinError.message : "Failed to join game"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <div className="w-full max-w-3xl space-y-10 text-center">
        {statusMessage === "removed" ? (
          <div
            className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            You were removed from the game
          </div>
        ) : null}
        <div className="space-y-4">
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-quiz-amber/60 to-transparent" />
          <h1 className="font-serif text-5xl leading-tight text-quiz-ink sm:text-6xl">
            Pub Quiz
          </h1>
          <p className="mx-auto max-w-md text-base leading-relaxed text-quiz-muted">
            Real-time trivia for the pub, the living room, or anywhere you can
            gather a few competitive friends.
          </p>
        </div>

        {panel === "none" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setPanel("host");
              }}
              className="quiz-choice-card group"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-quiz-amber/30 bg-quiz-amber/10 font-serif text-lg text-quiz-amber">
                H
              </span>
              <span className="font-serif text-2xl text-quiz-ink">Host a game</span>
              <p className="mt-2 text-sm leading-relaxed text-quiz-muted">
                Set up rounds, formats, and difficulty — then share your code.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setError(null);
                setPanel("join");
              }}
              className="quiz-choice-card group"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-quiz-border-bright bg-quiz-bg-elevated font-serif text-lg text-quiz-muted transition-colors group-hover:border-quiz-amber/30 group-hover:text-quiz-amber">
                J
              </span>
              <span className="font-serif text-2xl text-quiz-ink">Join a game</span>
              <p className="mt-2 text-sm leading-relaxed text-quiz-muted">
                Enter the six-character code from your host to jump in.
              </p>
            </button>
          </div>
        ) : null}

        {panel === "host" ? (
          <form
            onSubmit={handleCreateGame}
            className="quiz-card mx-auto max-w-lg space-y-6 p-8 text-left"
          >
            <div className="space-y-1">
              <h2 className="font-serif text-3xl text-quiz-ink">Host setup</h2>
              <p className="text-sm text-quiz-muted">
                Configure your quiz before inviting players.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="hostName" className="text-sm font-medium text-white">
                Your name
              </label>
              <input
                id="hostName"
                className="quiz-input"
                value={hostName}
                onChange={(event) => setHostName(event.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <AvatarPicker
              selectedAvatar={hostAvatar}
              selectedColour={hostColour}
              onAvatarChange={setHostAvatar}
              onColourChange={setHostColour}
            />

            <QuizPresets
              activePresetId={activePresetId}
              onSelect={(presetId, rounds) => {
                setActivePresetId(presetId);
                setRoundConfigs(rounds);
              }}
            />

            <RoundBuilder
              rounds={roundConfigs}
              onChange={(rounds) => {
                setActivePresetId(null);
                setRoundConfigs(rounds);
              }}
            />

            <QuestionPreview rounds={roundConfigs} />

            <div className="space-y-3 rounded-xl border border-quiz-border bg-quiz-bg/40 p-4">
              <label className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-white">Team Mode</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={teamMode}
                  onClick={() => setTeamMode((enabled) => !enabled)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    teamMode ? "bg-quiz-amber" : "bg-quiz-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
                      teamMode ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </label>

              {teamMode ? (
                <div className="space-y-3">
                  <p className="text-xs text-quiz-muted">
                    You&apos;ll assign teams in the lobby before starting.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
                      Number of teams
                    </p>
                    <div className="flex gap-2">
                      {[2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setTeamCount(count)}
                          className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                            teamCount === count
                              ? "border-quiz-amber bg-quiz-amber/15 text-quiz-amber"
                              : "border-quiz-border text-quiz-muted hover:border-quiz-amber/40"
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={loading || !hostName.trim()}
                className="quiz-btn-primary flex-1"
              >
                {loading ? "Creating..." : "Create Game"}
              </button>
              <button
                type="button"
                onClick={() => setPanel("none")}
                className="quiz-btn-secondary flex-1"
              >
                Back
              </button>
            </div>
          </form>
        ) : null}

        {panel === "join" ? (
          <form
            onSubmit={handleJoinGame}
            className="quiz-card mx-auto max-w-lg space-y-6 p-8 text-left"
          >
            <div className="space-y-1">
              <h2 className="font-serif text-3xl text-quiz-ink">Join game</h2>
              <p className="text-sm text-quiz-muted">
                Enter the 6-character code from your host.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="joinName" className="text-sm font-medium text-white">
                Your name
              </label>
              <input
                id="joinName"
                className="quiz-input"
                value={joinName}
                onChange={(event) => setJoinName(event.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <AvatarPicker
              selectedAvatar={joinAvatar}
              selectedColour={joinColour}
              onAvatarChange={setJoinAvatar}
              onColourChange={setJoinColour}
            />

            <div className="space-y-2">
              <label htmlFor="gameCode" className="text-sm font-medium text-white">
                Game code
              </label>
              <input
                id="gameCode"
                className="quiz-input font-mono uppercase tracking-[0.3em]"
                value={gameCode}
                onChange={(event) =>
                  setGameCode(event.target.value.toUpperCase().slice(0, 6))
                }
                placeholder="ABC123"
                maxLength={6}
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={loading || !joinName.trim() || gameCode.length !== 6}
                className="quiz-btn-primary flex-1"
              >
                {loading ? "Joining..." : "Join Game"}
              </button>
              <button
                type="button"
                onClick={() => setPanel("none")}
                className="quiz-btn-secondary flex-1"
              >
                Back
              </button>
            </div>
          </form>
        ) : null}

        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </main>
  );
}

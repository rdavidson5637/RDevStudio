"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Link from "next/link";

import { ChatPanel } from "@/components/quiz/ChatPanel";
import { ConnectionBadge } from "@/components/quiz/ConnectionBadge";
import { JoinQrCode } from "@/components/quiz/JoinQrCode";
import { QuestionPreview } from "@/components/quiz/QuestionPreview";
import { FinishedScreen } from "@/components/quiz/FinishedScreen";
import { FloatingReaction } from "@/components/quiz/FloatingReaction";
import { HostPanel } from "@/components/quiz/HostPanel";
import { PlayerList } from "@/components/quiz/PlayerList";
import { ReactionBar } from "@/components/quiz/ReactionBar";
import { RoundBreakScreen } from "@/components/quiz/RoundBreakScreen";
import { TeamAssignment } from "@/components/quiz/TeamAssignment";
import {
  QuestionScreen,
  type PublicQuestion,
} from "@/components/quiz/QuestionScreen";
import { RevealScreen } from "@/components/quiz/RevealScreen";
import {
  getRemainingSeconds,
  hasPlayerAnswered,
} from "@/lib/quiz/client-state";
import type { PublicGameState } from "@/lib/quiz/public-state";
import { getChannel } from "@/lib/quiz/pusher-client";
import {
  loadLobbyCache,
  loadQuizSession,
  saveLobbyCache,
  saveQuizSession,
} from "@/lib/quiz/session";
import { CATEGORY_OPTIONS } from "@/lib/quiz/categories";
import { getRoundFormatBadge } from "@/lib/quiz/round-badges";
import { ROUND_FORMAT_OPTIONS } from "@/lib/quiz/rounds";
import {
  findTeamForPlayer,
  getUnassignedPlayerIds,
  validateTeamAssignments,
} from "@/lib/quiz/teams";
import type {
  ActiveBuzz,
  ChatMessage,
  GameEventMap,
  Player,
  ReactionEvent,
  Round,
  RoundConfig,
  Team,
} from "@/lib/quiz/types";

type GameView = "lobby" | "question" | "reveal" | "round-break" | "finished";
type ConnectionStatus = "connected" | "disconnected" | "unavailable";

async function fetchGameState(
  gameId: string,
  playerId: string,
): Promise<PublicGameState | null> {
  const response = await fetch(
    `/api/quiz/state?gameId=${encodeURIComponent(gameId)}&playerId=${encodeURIComponent(playerId)}`,
  );

  if (response.ok) {
    const data = await response.json();
    return data.state as PublicGameState;
  }

  if (response.status === 404) {
    const lobby = loadLobbyCache();
    if (lobby?.id === gameId) {
      await fetch("/api/quiz/rehydrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameState: lobby }),
      });

      const retry = await fetch(
        `/api/quiz/state?gameId=${encodeURIComponent(gameId)}&playerId=${encodeURIComponent(playerId)}`,
      );

      if (retry.ok) {
        const data = await retry.json();
        return data.state as PublicGameState;
      }
    }
  }

  return null;
}

export default function GameRoomPage() {
  const router = useRouter();
  const params = useParams();
  const gameId = params.gameId as string;

  const [view, setView] = useState<GameView>("lobby");
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [playerColour, setPlayerColour] = useState("#F59E0B");
  const [playerAvatar, setPlayerAvatar] = useState("🦊");
  const [isHost, setIsHost] = useState(false);
  const [hostId, setHostId] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [roundConfigs, setRoundConfigs] = useState<RoundConfig[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [questionInRound, setQuestionInRound] = useState(1);
  const [roundBreak, setRoundBreak] = useState<
    GameEventMap["game:round-break"] | null
  >(null);
  const [currentQuestion, setCurrentQuestion] = useState<PublicQuestion | null>(
    null,
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLimitMs, setTimeLimitMs] = useState(30_000);
  const [questionStartedAt, setQuestionStartedAt] = useState<number | null>(
    null,
  );
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answerAttempt, setAnswerAttempt] = useState(0);
  const [revealData, setRevealData] = useState<
    GameEventMap["game:reveal"] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [isSkippingQuestion, setIsSkippingQuestion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("unavailable");
  const [isReady, setIsReady] = useState(false);
  const [reactions, setReactions] = useState<ReactionEvent[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeBuzz, setActiveBuzz] = useState<ActiveBuzz | null>(null);
  const [buzzLockedOutPlayerIds, setBuzzLockedOutPlayerIds] = useState<
    string[]
  >([]);
  const [buzzLockedOutTeamIds, setBuzzLockedOutTeamIds] = useState<string[]>(
    [],
  );
  const [timerPaused, setTimerPaused] = useState(false);
  const [teamMode, setTeamMode] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamWarning, setTeamWarning] = useState<string | null>(null);
  const chatOpenRef = useRef(false);

  const applyPublicState = useCallback(
    (state: PublicGameState, currentPlayerId: string) => {
      setHostId(state.hostId);
      setPlayers(state.players);
      setTotalQuestions(state.totalQuestions);
      setRoundConfigs(state.roundConfigs ?? []);
      setQuestionIndex(state.currentQuestionIndex);
      setView(state.status);
      setAnsweredCount(state.answeredCount);
      setCurrentRound(state.currentRound ?? null);
      setQuestionInRound(state.questionInRound ?? 1);
      setActiveBuzz(state.activeBuzz ?? null);
      setBuzzLockedOutPlayerIds(state.buzzLockedOutPlayerIds ?? []);
      setBuzzLockedOutTeamIds(state.buzzLockedOutTeamIds ?? []);
      setTimerPaused(state.timerPaused ?? false);
      setTeamMode(state.teamMode ?? false);
      setTeams(state.teams ?? []);

      if (state.status === "lobby") {
        setCurrentQuestion(null);
        setRevealData(null);
        setQuestionStartedAt(null);
        setRoundBreak(null);
      } else if (state.status === "finished") {
        setCurrentQuestion(null);
        setRevealData(null);
        setQuestionStartedAt(null);
        setRoundBreak(null);
      } else if (state.status === "round-break") {
        setCurrentQuestion(null);
        setRevealData(null);
        setQuestionStartedAt(null);
        setRoundBreak(state.roundBreak ?? null);
      } else if (state.status === "question") {
        setRevealData(null);
        if (state.currentQuestion) {
          setCurrentQuestion(state.currentQuestion);
        }
      } else if (state.status === "reveal") {
        if (state.reveal) {
          setRevealData(state.reveal);
        }
        if (state.currentQuestion) {
          setCurrentQuestion(state.currentQuestion);
        }
      }

      if (state.timeLimitMs) {
        setTimeLimitMs(state.timeLimitMs);
      }

      if (state.questionStartedAt) {
        setQuestionStartedAt(state.questionStartedAt);
        setTimeRemaining(
          getRemainingSeconds(state.questionStartedAt, state.timeLimitMs),
        );
      }

      const alreadyAnswered = hasPlayerAnswered(state, currentPlayerId);
      setAnswerSubmitted(alreadyAnswered);
      if (alreadyAnswered) {
        setAnswerAttempt((attempt) => attempt + 1);
      }
    },
    [],
  );

  useEffect(() => {
    const session = loadQuizSession();

    if (!session || session.gameId !== gameId) {
      router.replace("/pub-quiz");
      return;
    }

    setPlayerId(session.playerId);
    setPlayerName(session.playerName);
    setPlayerColour(session.colour);
    setPlayerAvatar(session.avatar);
    setIsHost(session.isHost);

    void (async () => {
      const state = await fetchGameState(gameId, session.playerId);

      if (state) {
        applyPublicState(state, session.playerId);
      } else {
        setError("Could not load game state. Go back and create a new game.");
      }

      setIsReady(true);
    })();
  }, [gameId, router, applyPublicState]);

  useEffect(() => {
    if (!playerId) {
      return;
    }

    const channel = getChannel(gameId);

    if (!channel) {
      setConnectionStatus("unavailable");
      return;
    }

    setConnectionStatus("connected");

    const handlePlayerJoined = (data: GameEventMap["game:player-joined"]) => {
      setPlayers(data.gameState.players);
      setHostId(data.gameState.hostId);
      setTeamMode(data.gameState.teamMode ?? false);
      setTeams(data.gameState.teams ?? []);
      if (data.gameState.status === "lobby") {
        saveLobbyCache(data.gameState);
      }
    };

    const handleGameStarted = (data: GameEventMap["game:started"]) => {
      setHostId(data.gameState.hostId);
      setPlayers(data.gameState.players);
      setTotalQuestions(data.gameState.totalQuestions);
      setRoundConfigs(data.gameState.roundConfigs ?? []);
      setTeamMode(data.gameState.teamMode ?? false);
      setTeams(data.gameState.teams ?? []);
    };

    const handleTeamsUpdated = (data: GameEventMap["game:teams-updated"]) => {
      setTeams(data.teams);
      setTeamMode(data.teamMode);
    };

    const handleRoundBreak = (data: GameEventMap["game:round-break"]) => {
      setPlayers(data.leaderboard);
      setRoundBreak(data);
      setCurrentRound(data.completedRound);
      setView("round-break");
    };

    const handleRoundStarted = (data: GameEventMap["game:round-started"]) => {
      setCurrentRound(data.round);
      setRoundBreak(null);
    };

    const handleQuestion = (data: GameEventMap["game:question"]) => {
      const { correctAnswer: _, ...publicQuestion } = data.question;

      setQuestionIndex(data.questionIndex);
      setCurrentRound(data.round);
      setQuestionInRound(data.questionInRound);
      setRoundBreak(null);
      setActiveBuzz(null);
      setBuzzLockedOutPlayerIds([]);
      setBuzzLockedOutTeamIds([]);
      setTimerPaused(false);
      setAnswerSubmitted(false);
      setAnswerAttempt((attempt) => attempt + 1);
      setTimeLimitMs(data.timeLimitMs);
      setQuestionStartedAt(data.questionStartedAt);
      setTimeRemaining(
        getRemainingSeconds(data.questionStartedAt, data.timeLimitMs),
      );
      setAnsweredCount(data.answeredCount);
      setRevealData(null);
      setCurrentQuestion(publicQuestion);
      setView("question");
    };

    const handleAnswerSubmitted = (
      data: GameEventMap["game:answer-submitted"],
    ) => {
      setAnsweredCount(data.answeredCount);
    };

    const handleReveal = (data: GameEventMap["game:reveal"]) => {
      setRevealData(data);
      setPlayers(data.leaderboard);
      if (data.teams) {
        setTeams(data.teams);
      }
      if (data.teamMode !== undefined) {
        setTeamMode(data.teamMode);
      }
      setView("reveal");
    };

    const handleFinished = (data: GameEventMap["game:finished"]) => {
      setPlayers(data.finalLeaderboard);
      if (data.teams) {
        setTeams(data.teams);
      }
      if (data.teamMode !== undefined) {
        setTeamMode(data.teamMode);
      }
      setView("finished");
    };

    const handleLeaderboard = (data: GameEventMap["game:leaderboard"]) => {
      setPlayers(data.players);
      if (data.teams) {
        setTeams(data.teams);
      }
    };

    const handleReaction = (data: ReactionEvent) => {
      setReactions((current) => [...current, data]);

      window.setTimeout(() => {
        setReactions((current) =>
          current.filter((reaction) => reaction.id !== data.id),
        );
      }, 3000);
    };

    const handleChat = (data: ChatMessage) => {
      setMessages((current) => [...current, data]);

      if (!chatOpenRef.current) {
        setUnreadCount((count) => count + 1);
      }
    };

    const handleBuzz = (data: GameEventMap["game:buzz"]) => {
      setActiveBuzz({
        playerId: data.playerId,
        playerName: data.playerName,
        playerColour: data.playerColour,
        playerAvatar: data.playerAvatar,
        buzzedAt: data.pausedAt,
      });
      setTimerPaused(true);
      setQuestionStartedAt(data.questionStartedAt);
      setTimeRemaining(
        getRemainingSeconds(data.questionStartedAt, timeLimitMs),
      );
    };

    const handleBuzzCleared = (data: GameEventMap["game:buzz-cleared"]) => {
      setActiveBuzz(null);
      setTimerPaused(false);
      setBuzzLockedOutPlayerIds(data.buzzLockedOutPlayerIds);
      setBuzzLockedOutTeamIds(data.buzzLockedOutTeamIds ?? []);
      setQuestionStartedAt(data.questionStartedAt);
      setTimeRemaining(
        getRemainingSeconds(data.questionStartedAt, timeLimitMs),
      );
    };

    const handlePlayerKicked = (data: GameEventMap["game:player-kicked"]) => {
      if (data.kickedPlayerId === playerId) {
        router.replace("/pub-quiz?message=removed");
        return;
      }

      setPlayers(data.players);
    };

    const handleQuestionSkipped = (
      data: GameEventMap["game:question-skipped"],
    ) => {
      if (data.nextQuestionIndex !== undefined) {
        setQuestionIndex(data.nextQuestionIndex);
      }
    };

    const handleBuzzResult = (data: GameEventMap["game:buzz-result"]) => {
      if (!data.correct) {
        setPlayers((current) =>
          current.map((player) =>
            player.id === data.playerId
              ? {
                  ...player,
                  score: Math.max(0, player.score + data.pointsAwarded),
                }
              : player,
          ),
        );

        if (data.teamId && data.teamPointsAwarded !== undefined) {
          setTeams((current) =>
            current.map((team) =>
              team.id === data.teamId
                ? {
                    ...team,
                    score: Math.max(0, team.score + data.teamPointsAwarded!),
                  }
                : team,
            ),
          );
        } else {
          setTeams((current) =>
            current.map((team) =>
              team.playerIds.includes(data.playerId)
                ? {
                    ...team,
                    score: Math.max(0, team.score + data.pointsAwarded),
                  }
                : team,
            ),
          );
        }
      }
    };

    channel.bind("pusher:subscription_succeeded", () => {
      setConnectionStatus("connected");
    });
    channel.bind("pusher:subscription_error", () => {
      setConnectionStatus("disconnected");
    });

    channel.bind("game:player-joined", handlePlayerJoined);
    channel.bind("game:started", handleGameStarted);
    channel.bind("game:teams-updated", handleTeamsUpdated);
    channel.bind("game:round-started", handleRoundStarted);
    channel.bind("game:round-break", handleRoundBreak);
    channel.bind("game:question", handleQuestion);
    channel.bind("game:answer-submitted", handleAnswerSubmitted);
    channel.bind("game:reveal", handleReveal);
    channel.bind("game:leaderboard", handleLeaderboard);
    channel.bind("game:finished", handleFinished);
    channel.bind("game:reaction", handleReaction);
    channel.bind("game:chat", handleChat);
    channel.bind("game:buzz", handleBuzz);
    channel.bind("game:buzz-cleared", handleBuzzCleared);
    channel.bind("game:buzz-result", handleBuzzResult);
    channel.bind("game:player-kicked", handlePlayerKicked);
    channel.bind("game:question-skipped", handleQuestionSkipped);

    return () => {
      channel.unbind("game:player-joined", handlePlayerJoined);
      channel.unbind("game:started", handleGameStarted);
      channel.unbind("game:teams-updated", handleTeamsUpdated);
      channel.unbind("game:round-started", handleRoundStarted);
      channel.unbind("game:round-break", handleRoundBreak);
      channel.unbind("game:question", handleQuestion);
      channel.unbind("game:answer-submitted", handleAnswerSubmitted);
      channel.unbind("game:reveal", handleReveal);
      channel.unbind("game:leaderboard", handleLeaderboard);
      channel.unbind("game:finished", handleFinished);
      channel.unbind("game:reaction", handleReaction);
      channel.unbind("game:chat", handleChat);
      channel.unbind("game:buzz", handleBuzz);
      channel.unbind("game:buzz-cleared", handleBuzzCleared);
      channel.unbind("game:buzz-result", handleBuzzResult);
      channel.unbind("game:player-kicked", handlePlayerKicked);
      channel.unbind("game:question-skipped", handleQuestionSkipped);
      channel.unsubscribe();
    };
  }, [gameId, playerId, router, timeLimitMs]);

  useEffect(() => {
    if (!playerId || !isReady) {
      return;
    }

    const shouldPoll = connectionStatus !== "connected" || view !== "lobby";

    if (!shouldPoll) {
      return;
    }

    const syncState = async () => {
      const state = await fetchGameState(gameId, playerId);
      if (state) {
        applyPublicState(state, playerId);
      }
    };

    void syncState();
    const interval = window.setInterval(() => {
      void syncState();
    }, 2500);

    return () => {
      window.clearInterval(interval);
    };
  }, [applyPublicState, connectionStatus, gameId, isReady, playerId, view]);

  const removeReaction = useCallback((reactionId: string) => {
    setReactions((current) =>
      current.filter((reaction) => reaction.id !== reactionId),
    );
  }, []);

  useEffect(() => {
    chatOpenRef.current = chatOpen;
  }, [chatOpen]);

  const openChat = useCallback(() => {
    setChatOpen(true);
    setUnreadCount(0);
  }, []);

  const currentPlayer = useMemo<Player>(
    () =>
      players.find((player) => player.id === playerId) ?? {
        id: playerId ?? "",
        name: playerName,
        colour: playerColour,
        avatar: playerAvatar,
        score: 0,
        answers: [],
      },
    [playerAvatar, playerColour, playerId, playerName, players],
  );

  const showReactionBar = view === "question" || view === "reveal";
  const showChat = view === "lobby" || view === "reveal";

  const inviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/pub-quiz?join=${gameId}`
      : `/pub-quiz?join=${gameId}`;

  const saveTeams = useCallback(
    async (nextTeams: Team[]) => {
      if (!playerId || !isHost) {
        return;
      }

      const response = await fetch("/api/quiz/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId,
          hostId: playerId,
          teams: nextTeams.map((team) => ({
            name: team.name,
            colour: team.colour,
            playerIds: team.playerIds,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save teams");
      }

      setTeams(data.teams);
      setTeamWarning(null);
    },
    [gameId, isHost, playerId],
  );

  const copyInviteLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy invite link");
    }
  }, [inviteLink]);

  const handleAnswerSubmitted = useCallback(
    async (answer: string, answerTimeMs: number) => {
      if (!playerId || !currentQuestion || answerSubmitted) {
        return;
      }

      setAnswerSubmitted(true);
      setError(null);

      try {
        const response = await fetch("/api/quiz/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId,
            playerId,
            questionId: currentQuestion.id,
            answer,
            answerTimeMs,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to submit answer");
        }

        if (data.ignored) {
          return { correct: false };
        }

        if (data.answeredCount !== undefined) {
          setAnsweredCount(data.answeredCount);
        }

        return { correct: Boolean(data.correct) };
      } catch (submitError) {
        setAnswerSubmitted(false);
        setAnswerAttempt((attempt) => attempt + 1);
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Failed to submit answer",
        );
      }
    },
    [answerSubmitted, currentQuestion, gameId, playerId],
  );

  const handleBuzzJudge = useCallback(
    async (correct: boolean) => {
      if (!playerId || !isHost) {
        return;
      }

      setError(null);

      try {
        const response = await fetch("/api/quiz/buzz-answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId,
            hostId: playerId,
            correct,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to judge buzzer answer");
        }

        if (correct && data.state) {
          applyPublicState(data.state, playerId);
        }
      } catch (judgeError) {
        setError(
          judgeError instanceof Error
            ? judgeError.message
            : "Failed to judge buzzer answer",
        );
      }
    },
    [applyPublicState, gameId, isHost, playerId],
  );

  const handleKickPlayer = useCallback(
    async (targetPlayerId: string) => {
      if (!playerId || !isHost) {
        return;
      }

      setError(null);

      try {
        const response = await fetch("/api/quiz/kick", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId,
            hostId: playerId,
            targetPlayerId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to remove player");
        }
      } catch (kickError) {
        setError(
          kickError instanceof Error
            ? kickError.message
            : "Failed to remove player",
        );
        throw kickError;
      }
    },
    [gameId, isHost, playerId],
  );

  const handleSkipQuestion = useCallback(async () => {
    if (!playerId || !isHost) {
      return;
    }

    setIsSkippingQuestion(true);
    setError(null);

    try {
      const response = await fetch("/api/quiz/skip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, hostId: playerId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to skip question");
      }
    } catch (skipError) {
      setError(
        skipError instanceof Error
          ? skipError.message
          : "Failed to skip question",
      );
    } finally {
      setIsSkippingQuestion(false);
    }
  }, [gameId, isHost, playerId]);

  const handleSkipWaiting = useCallback(async () => {
    if (!playerId || !isHost) {
      return;
    }

    setIsSkipping(true);
    setError(null);

    try {
      const response = await fetch("/api/quiz/skip-waiting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, hostId: playerId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to reveal answers");
      }

      if (data.state) {
        applyPublicState(data.state, playerId);
      }
    } catch (skipError) {
      setError(
        skipError instanceof Error
          ? skipError.message
          : "Failed to reveal answers",
      );
    } finally {
      setIsSkipping(false);
    }
  }, [applyPublicState, gameId, isHost, playerId]);

  const handleNext = useCallback(async () => {
    if (!playerId || !isHost) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/quiz/next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, hostId: playerId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to advance game");
      }

      if (data.state) {
        applyPublicState(data.state, playerId);
      }
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Failed to advance game",
      );
    } finally {
      setLoading(false);
    }
  }, [applyPublicState, gameId, isHost, playerId]);

  async function handleStartGame() {
    if (!playerId) {
      return;
    }

    if (teamMode && teams.length > 0) {
      const validationError = validateTeamAssignments(players, teams);

      if (validationError) {
        setTeamWarning(validationError);
        return;
      }
    }

    setError(null);
    setTeamWarning(null);
    setLoading(true);
    setIsGenerating(true);

    try {
      let response = await fetch("/api/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, hostId: playerId }),
      });

      let data = await response.json();

      if (response.status === 404) {
        const lobby = loadLobbyCache();
        if (lobby?.id === gameId) {
          await fetch("/api/quiz/rehydrate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameState: lobby }),
          });

          response = await fetch("/api/quiz/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId, hostId: playerId }),
          });
          data = await response.json();
        }
      }

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to start game");
      }

      if (data.state) {
        applyPublicState(data.state, playerId);
      }
    } catch (startError) {
      setError(
        startError instanceof Error
          ? startError.message
          : "Failed to start game",
      );
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  }

  if (!playerId || !isReady) {
    return (
      <main className="quiz-page flex min-h-screen items-center justify-center">
        <p className="text-quiz-muted">Loading game room...</p>
      </main>
    );
  }

  const pageShell = (
    children: React.ReactNode,
    options?: { withSocialPad?: boolean },
  ) => (
    <>
      <HostPanel
        gameId={gameId}
        hostId={hostId}
        isHost={isHost}
        view={view}
        players={players}
        currentQuestion={currentQuestion}
        currentRound={currentRound}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        questionInRound={questionInRound}
        onSkipQuestion={handleSkipQuestion}
        onKickPlayer={handleKickPlayer}
        isSkippingQuestion={isSkippingQuestion}
      />

      <main
        className={`quiz-page flex min-h-screen flex-col items-center px-4 py-16 sm:py-20 ${
          options?.withSocialPad ? "pb-28 md:pb-20" : ""
        }`}
      >
        <ConnectionBadge status={connectionStatus} />
        <div className="w-full max-w-2xl">{children}</div>
        {error ? (
          <div className="mt-6 space-y-3 text-center">
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
            <button
              type="button"
              onClick={() => router.push("/pub-quiz")}
              className="quiz-btn-secondary text-sm"
            >
              Back to home
            </button>
          </div>
        ) : null}
      </main>

      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        {reactions.map((reaction) => (
          <FloatingReaction
            key={reaction.id}
            reaction={reaction}
            onComplete={() => removeReaction(reaction.id)}
          />
        ))}
      </div>

      {showReactionBar ? (
        <ReactionBar gameId={gameId} playerId={playerId} />
      ) : null}

      {showChat ? (
        <>
          <button
            type="button"
            onClick={openChat}
            className={`fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-quiz-border bg-quiz-surface text-2xl shadow-lg transition-transform hover:scale-105 ${
              showReactionBar ? "bottom-28 md:bottom-8" : "bottom-8"
            }`}
            aria-label="Open chat"
          >
            💬
            {!chatOpen && unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-quiz-amber px-1 text-xs font-bold text-quiz-bg">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            ) : null}
          </button>

          <ChatPanel
            messages={messages}
            gameId={gameId}
            playerId={playerId}
            currentPlayer={currentPlayer}
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
          />
        </>
      ) : null}
    </>
  );

  if (view === "finished") {
    return pageShell(
      <FinishedScreen
        players={players}
        playerId={playerId}
        playerName={playerName}
        totalQuestions={totalQuestions}
        teamMode={teamMode}
        teams={teams}
      />,
    );
  }

  const isLastQuestion = questionIndex + 1 >= totalQuestions;
  const isEndOfRound =
    currentRound !== null &&
    questionIndex === currentRound.endIndex &&
    !isLastQuestion;
  const currentPlayerTeam =
    teamMode && playerId ? findTeamForPlayer(teams, playerId) : undefined;
  const teamLockedOut = Boolean(
    currentPlayerTeam && buzzLockedOutTeamIds.includes(currentPlayerTeam.id),
  );

  if (view === "round-break" && roundBreak) {
    return pageShell(
      <RoundBreakScreen
        completedRound={roundBreak.completedRound}
        roundNumber={roundBreak.roundNumber}
        nextRound={roundBreak.nextRound}
        leaderboard={roundBreak.leaderboard}
        playerId={playerId}
        isHost={isHost}
        onContinue={handleNext}
        isAdvancing={loading}
      />,
    );
  }

  if (view === "reveal" && revealData) {
    return pageShell(
      <RevealScreen
        question={revealData.question}
        leaderboard={revealData.leaderboard}
        playerResults={revealData.playerResults}
        previousScores={revealData.previousScores}
        playerId={playerId}
        isHost={isHost}
        onNext={handleNext}
        questionNumber={questionIndex + 1}
        totalQuestions={totalQuestions}
        isLastQuestion={isLastQuestion}
        isEndOfRound={isEndOfRound}
        isAdvancing={loading}
        teamMode={teamMode}
        teams={revealData.teams ?? teams}
      />,
      { withSocialPad: true },
    );
  }

  if (view === "question" && currentQuestion) {
    return pageShell(
      <QuestionScreen
        key={`${currentQuestion.id}-${answerAttempt}`}
        question={currentQuestion}
        gameId={gameId}
        playerId={playerId}
        onAnswerSubmitted={handleAnswerSubmitted}
        questionNumber={questionIndex + 1}
        totalQuestions={totalQuestions}
        roundName={currentRound?.name}
        roundFormat={currentRound?.format ?? currentQuestion.format}
        doublePoints={currentRound?.doublePoints}
        questionInRound={questionInRound}
        questionsInRound={currentRound?.questionCount}
        activeBuzz={activeBuzz}
        buzzLockedOutPlayerIds={buzzLockedOutPlayerIds}
        teamLockedOut={teamLockedOut}
        timerPaused={timerPaused}
        onBuzzJudge={handleBuzzJudge}
        durationSeconds={Math.ceil(timeLimitMs / 1000)}
        initialRemainingSeconds={getRemainingSeconds(
          questionStartedAt ?? undefined,
          timeLimitMs,
        )}
        answeredCount={answeredCount}
        totalPlayers={players.length}
        isHost={isHost}
        onSkipWaiting={handleSkipWaiting}
        isSkipping={isSkipping}
        initialSubmitted={answerSubmitted}
      />,
      { withSocialPad: true },
    );
  }

  return pageShell(
    <div className="space-y-8">
      {view === "lobby" ? (
        <>
          <div className="space-y-2 text-center">
            <p className="quiz-kicker">Lobby</p>
            <h1 className="font-serif text-4xl text-quiz-ink">Waiting room</h1>
          </div>

          <div className="quiz-card flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left">
            <JoinQrCode joinUrl={inviteLink} size={140} />
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-sm text-quiz-muted">Game code</p>
                <p className="mt-1 font-mono text-4xl font-bold tracking-[0.25em] text-quiz-amber">
                  {gameId.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={copyInviteLink}
                  className="quiz-btn-secondary w-full sm:w-auto"
                >
                  {copied ? "Link copied!" : "Copy invite link"}
                </button>
                {isHost ? (
                  <Link
                    href={`/pub-quiz/${gameId}/present`}
                    target="_blank"
                    className="quiz-btn-secondary text-center"
                  >
                    Open presenter view
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          {isHost && roundConfigs.length > 0 ? (
            <QuestionPreview rounds={roundConfigs} />
          ) : null}

          {roundConfigs.length > 0 ? (
            <div className="quiz-card p-6 text-left">
              <p className="mb-3 text-sm font-medium text-white">
                Tonight&apos;s rounds
              </p>
              <ul className="space-y-2">
                {roundConfigs.map((round, index) => {
                  const badge = getRoundFormatBadge(round.format);
                  const formatMeta = ROUND_FORMAT_OPTIONS.find(
                    (option) => option.value === round.format,
                  );

                  return (
                    <li
                      key={round.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-quiz-border/60 bg-quiz-bg-elevated/50 px-3 py-2 text-sm"
                    >
                      <span className="font-medium text-quiz-ink">
                        {index + 1}. {round.name}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-quiz-muted">
                        {CATEGORY_OPTIONS.find(
                          (option) => option.value === round.category,
                        ) ? (
                          <span className="text-xs">
                            {
                              CATEGORY_OPTIONS.find(
                                (option) => option.value === round.category,
                              )?.label
                            }
                          </span>
                        ) : null}
                        {badge ? (
                          <span
                            className={`rounded-full border px-2 py-0.5 text-xs font-medium ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        ) : formatMeta ? (
                          <span className="text-xs">{formatMeta.label}</span>
                        ) : null}
                        <span className="text-xs">
                          {round.questionCount} Qs ·{" "}
                          {round.timeLimitSeconds ?? 30}s
                        </span>
                        {round.doublePoints ? (
                          <span className="text-xs font-medium text-quiz-amber">
                            2×
                          </span>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {teamMode && teams.length > 0 ? (
            <TeamAssignment
              players={players}
              teams={teams}
              isHost={isHost}
              onTeamsChange={setTeams}
              onSaveTeams={saveTeams}
            />
          ) : (
            <div className="quiz-card p-6">
              <PlayerList
                players={players}
                hostId={hostId}
                isHost={isHost}
                onKickPlayer={isHost ? handleKickPlayer : undefined}
              />
            </div>
          )}

          <div className="text-center">
            {isHost ? (
              <div className="space-y-3">
                {teamMode &&
                getUnassignedPlayerIds(players, teams).length > 0 ? (
                  <p className="text-sm text-amber-300">
                    Assign all players to teams before starting
                  </p>
                ) : null}
                {teamWarning ? (
                  <p className="text-sm text-red-400" role="alert">
                    {teamWarning}
                  </p>
                ) : null}
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="h-8 w-8 animate-spin rounded-full border-2 border-quiz-border border-t-quiz-amber"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-quiz-muted">
                      Generating questions for {roundConfigs.length} round
                      {roundConfigs.length === 1 ? "" : "s"}...
                    </p>
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={handleStartGame}
                  disabled={loading || players.length < 1}
                  className="quiz-btn-primary w-full sm:w-auto"
                >
                  {loading ? "Starting..." : "Start Game"}
                </button>
                {players.length < 2 ? (
                  <p className="text-xs text-quiz-muted">
                    Solo mode — invite friends or start alone to test
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-quiz-muted">Waiting for host to start...</p>
            )}
          </div>
        </>
      ) : null}
    </div>,
  );
}

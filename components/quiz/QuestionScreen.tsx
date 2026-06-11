"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { AnswerButton } from "@/components/quiz/AnswerButton";
import { AudioPlayer } from "@/components/quiz/AudioPlayer";
import { BuzzerButton } from "@/components/quiz/BuzzerButton";
import { CountdownTimer } from "@/components/quiz/CountdownTimer";
import { PlayerAvatar } from "@/components/quiz/PlayerAvatar";
import { QuestionImage } from "@/components/quiz/QuestionImage";
import { CATEGORY_OPTIONS } from "@/lib/quiz/categories";
import { getRoundFormatBadge } from "@/lib/quiz/round-badges";
import {
  ActiveBuzz,
  QuestionType,
  RoundFormat,
  type Player,
  type Question,
} from "@/lib/quiz/types";

export type PublicQuestion = Omit<Question, "correctAnswer">;

interface QuestionScreenProps {
  question: PublicQuestion;
  gameId: string;
  playerId: string;
  onAnswerSubmitted: (
    answer: string,
    timeMs: number
  ) => Promise<{ correct: boolean } | void>;
  questionNumber: number;
  totalQuestions: number;
  roundName?: string;
  roundFormat?: RoundFormat;
  doublePoints?: boolean;
  questionInRound?: number;
  questionsInRound?: number;
  durationSeconds: number;
  initialRemainingSeconds?: number;
  answeredCount: number;
  totalPlayers: number;
  isHost: boolean;
  activeBuzz?: ActiveBuzz | null;
  buzzLockedOutPlayerIds?: string[];
  teamLockedOut?: boolean;
  timerPaused?: boolean;
  onBuzzJudge?: (correct: boolean) => Promise<void>;
  onSkipWaiting?: () => void;
  isSkipping?: boolean;
  initialSubmitted?: boolean;
}

const LETTERS = ["A", "B", "C", "D"] as const;

export function QuestionScreen({
  question,
  gameId,
  playerId,
  onAnswerSubmitted,
  questionNumber,
  totalQuestions,
  roundName,
  roundFormat,
  doublePoints = false,
  questionInRound,
  questionsInRound,
  durationSeconds,
  initialRemainingSeconds,
  answeredCount,
  totalPlayers,
  isHost,
  activeBuzz = null,
  buzzLockedOutPlayerIds = [],
  teamLockedOut = false,
  timerPaused = false,
  onBuzzJudge,
  onSkipWaiting,
  isSkipping = false,
  initialSubmitted = false,
}: QuestionScreenProps) {
  const [submitted, setSubmitted] = useState(initialSubmitted);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [riskFlash, setRiskFlash] = useState(false);
  const [judgingBuzz, setJudgingBuzz] = useState(false);
  const startTimeRef = useRef(Date.now());
  const submittedRef = useRef(false);

  const resolvedFormat = roundFormat ?? question.format;
  const formatBadge = getRoundFormatBadge(resolvedFormat);
  const isBuzzerRound =
    resolvedFormat === RoundFormat.BUZZER ||
    question.format === RoundFormat.BUZZER;
  const isRiskRound =
    resolvedFormat === RoundFormat.RISK || question.format === RoundFormat.RISK;
  const isPictureRound =
    resolvedFormat === RoundFormat.PICTURE ||
    question.type === QuestionType.PICTURE ||
    Boolean(question.imageUrl);
  const isMusicRound =
    resolvedFormat === RoundFormat.MUSIC ||
    question.type === QuestionType.MUSIC ||
    Boolean(question.audioUrl);

  const categoryMeta = CATEGORY_OPTIONS.find(
    (option) => option.value === question.category
  );

  useEffect(() => {
    startTimeRef.current = Date.now();
    setSubmitted(initialSubmitted);
    setSelectedOption(null);
    setTextAnswer("");
    setRiskFlash(false);
    submittedRef.current = initialSubmitted;
  }, [question.id, initialSubmitted]);

  const submitAnswer = useCallback(
    async (answer: string) => {
      if (submittedRef.current || isBuzzerRound) {
        return;
      }

      submittedRef.current = true;
      const elapsedMs = Date.now() - startTimeRef.current;
      setSubmitted(true);

      const result = await onAnswerSubmitted(answer, elapsedMs);

      if (isRiskRound && result && !result.correct) {
        setRiskFlash(true);
        window.setTimeout(() => setRiskFlash(false), 600);
      }
    },
    [isBuzzerRound, isRiskRound, onAnswerSubmitted]
  );

  const handleExpire = useCallback(() => {
    if (!submittedRef.current && !isBuzzerRound) {
      void submitAnswer("");
    }
  }, [isBuzzerRound, submitAnswer]);

  function handleOptionSelect(option: string) {
    setSelectedOption(option);
    void submitAnswer(option);
  }

  function handleTextSubmit(event: FormEvent) {
    event.preventDefault();
    if (textAnswer.trim()) {
      void submitAnswer(textAnswer.trim());
    }
  }

  async function handleBuzzJudge(correct: boolean) {
    if (!onBuzzJudge || judgingBuzz) {
      return;
    }

    setJudgingBuzz(true);

    try {
      await onBuzzJudge(correct);
    } finally {
      setJudgingBuzz(false);
    }
  }

  const canSkipWaiting =
    isHost &&
    !isBuzzerRound &&
    submitted &&
    answeredCount < totalPlayers &&
    onSkipWaiting;

  const canSkipBuzzerWaiting =
    isHost && isBuzzerRound && !activeBuzz && onSkipWaiting;

  const hasMultipleChoice =
    !isBuzzerRound &&
    (question.type === QuestionType.MULTIPLE_CHOICE ||
      question.type === QuestionType.PICTURE ||
      question.type === QuestionType.MUSIC) &&
    question.options &&
    question.options.length > 0;

  const progressLabel =
    questionInRound && questionsInRound
      ? `Q${questionInRound} of ${questionsInRound}`
      : `Question ${questionNumber} of ${totalQuestions}`;

  const buzzPlayer: Player | null = activeBuzz
    ? {
        id: activeBuzz.playerId,
        name: activeBuzz.playerName,
        colour: activeBuzz.playerColour,
        avatar: activeBuzz.playerAvatar,
        score: 0,
        answers: [],
      }
    : null;

  const youBuzzed = activeBuzz?.playerId === playerId;
  const someoneElseBuzzed = Boolean(activeBuzz && !youBuzzed);
  const lockedOut = buzzLockedOutPlayerIds.includes(playerId);

  return (
    <div
      className={`relative flex min-h-[calc(100vh-5rem)] w-full max-w-2xl flex-col ${
        riskFlash ? "risk-flash" : ""
      } ${isPictureRound ? "picture-round" : ""} ${isMusicRound ? "music-round" : ""}`}
    >
      {isRiskRound ? (
        <div className="mb-4 rounded-xl border border-quiz-risk/40 bg-quiz-risk/10 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-quiz-risk sm:text-base">
            Risk round — wrong answers lose 50 points
          </p>
        </div>
      ) : null}

      {doublePoints ? (
        <div className="mb-4 rounded-xl border border-quiz-amber/40 bg-quiz-amber/10 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-quiz-amber">
            Double points round
          </p>
        </div>
      ) : null}

      {activeBuzz && buzzPlayer ? (
        <div className="buzz-banner mb-4 flex items-center justify-center gap-3 rounded-xl border border-quiz-amber/50 bg-quiz-amber/10 px-4 py-4 text-center">
          <PlayerAvatar player={buzzPlayer} size="md" />
          <p className="font-serif text-lg font-semibold text-quiz-ink sm:text-xl">
            {activeBuzz.playerName} is answering
          </p>
        </div>
      ) : null}

      {roundName ? (
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.15em] text-quiz-amber">
          {roundName}
        </p>
      ) : null}

      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
        <p className="text-sm text-quiz-muted">{progressLabel}</p>

        {formatBadge ? (
          <span
            className={`w-fit rounded-full border px-3 py-1 text-sm font-medium ${formatBadge.className}`}
          >
            {formatBadge.icon} {formatBadge.label}
          </span>
        ) : (
          <span className="w-fit rounded-full border border-quiz-amber/40 bg-quiz-amber/10 px-3 py-1 text-sm font-medium text-quiz-amber">
            {categoryMeta
              ? `${categoryMeta.icon} ${categoryMeta.label}`
              : question.category}
          </span>
        )}

        <div className="flex justify-start sm:justify-end">
          <CountdownTimer
            durationSeconds={durationSeconds}
            initialRemainingSeconds={initialRemainingSeconds}
            onExpire={handleExpire}
            isActive={!submitted && !timerPaused && !activeBuzz}
          />
        </div>
      </div>

      {question.imageUrl ? (
        <QuestionImage
          imageUrl={question.imageUrl}
          imageAlt={question.imageAlt ?? "Picture round image"}
          prominent={isPictureRound}
        />
      ) : null}

      {question.audioUrl ? (
        <AudioPlayer audioUrl={question.audioUrl} />
      ) : null}

      <h2
        key={question.id}
        className={`question-fade-in text-center font-serif leading-tight text-quiz-ink ${
          isPictureRound || isMusicRound
            ? "mb-6 text-xl sm:mb-8 sm:text-2xl md:text-3xl"
            : "mb-8 text-2xl sm:mb-10 sm:text-4xl md:text-5xl"
        }`}
      >
        {question.text}
      </h2>

      {isBuzzerRound ? (
            <div className="flex flex-1 flex-col gap-6">
              {isHost && activeBuzz ? (
                <div className="space-y-3 text-center">
                  <p className="text-sm text-quiz-muted">
                    Mark their verbal answer (only you can see this)
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => void handleBuzzJudge(true)}
                      disabled={judgingBuzz}
                      className="rounded-xl border border-quiz-success/40 bg-quiz-success/10 px-6 py-3 text-sm font-semibold text-quiz-success transition-colors hover:bg-quiz-success/20 disabled:opacity-50"
                    >
                      Correct
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleBuzzJudge(false)}
                      disabled={judgingBuzz}
                      className="rounded-xl border border-quiz-danger/40 bg-quiz-danger/10 px-6 py-3 text-sm font-semibold text-quiz-danger transition-colors hover:bg-quiz-danger/20 disabled:opacity-50"
                    >
                      Wrong
                    </button>
                  </div>
                </div>
              ) : null}

              {!isHost && someoneElseBuzzed ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                  <p className="text-lg text-quiz-muted">
                    Waiting for {activeBuzz?.playerName} to answer...
                  </p>
                </div>
              ) : (
                <BuzzerButton
                  gameId={gameId}
                  playerId={playerId}
                  disabled={someoneElseBuzzed}
                  youBuzzed={youBuzzed}
                  lockedOut={lockedOut}
                  teamLockedOut={teamLockedOut}
                />
              )}

              {canSkipBuzzerWaiting ? (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={onSkipWaiting}
                    disabled={isSkipping}
                    className="quiz-btn-secondary"
                  >
                    {isSkipping ? "Revealing..." : "End question early"}
                  </button>
                </div>
              ) : null}
            </div>
          ) : submitted ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
              <p className="animate-pulse text-lg font-medium text-quiz-amber">
                Answer locked in! Waiting for others...
              </p>

              <div className="rounded-full border border-quiz-border bg-quiz-surface px-4 py-2 text-sm text-quiz-muted">
                <span className="font-semibold text-white">{answeredCount}</span>
                {" / "}
                {totalPlayers} players answered
              </div>

              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-quiz-amber [animation-delay:300ms]" />
              </div>

              {canSkipWaiting ? (
                <div className="mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={onSkipWaiting}
                    disabled={isSkipping}
                    className="quiz-btn-secondary"
                  >
                    {isSkipping ? "Revealing..." : "Reveal answers now"}
                  </button>
                  <p className="text-xs text-quiz-muted">
                    (only you can see this)
                  </p>
                </div>
              ) : null}
            </div>
          ) : hasMultipleChoice && question.options ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {question.options.slice(0, 4).map((option, index) => (
                <AnswerButton
                  key={`${question.id}-${index}`}
                  letter={LETTERS[index]}
                  text={option}
                  selected={selectedOption === option}
                  disabled={submitted}
                  riskMode={isRiskRound}
                  onClick={() => handleOptionSelect(option)}
                />
              ))}
            </div>
          ) : (
            <form
              onSubmit={handleTextSubmit}
              className="mx-auto flex w-full max-w-md flex-col gap-4"
            >
              <input
                type="text"
                value={textAnswer}
                onChange={(event) => setTextAnswer(event.target.value)}
                placeholder="Type your answer..."
                disabled={submitted}
                className={`quiz-input text-center text-lg ${
                  isRiskRound ? "focus:border-red-500 focus:ring-red-500/40" : ""
                }`}
                autoComplete="off"
                autoFocus
              />
              <button
                type="submit"
                disabled={submitted || !textAnswer.trim()}
                className={`w-full rounded-xl px-6 py-3 font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                  isRiskRound
                    ? "bg-red-500/90 text-white hover:bg-red-500"
                    : "quiz-btn-primary"
                }`}
              >
                Submit Answer
              </button>
            </form>
          )}
    </div>
  );
}

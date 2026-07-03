"use client";

import { useEffect, useMemo, useState } from "react";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import {
  bestWords,
  drawLetters,
  isValidWord,
} from "@/lib/countdown-game/letters-solver";
import {
  drawNumbers,
  makeTarget,
  solveNumbers,
} from "@/lib/countdown-game/numbers-solver";
import { STARTER_WORDS } from "@/lib/countdown-game/words";

type Mode = "letters" | "numbers";
const ROUND_SECONDS = 30;

export function CountdownGameApp() {
  const [mode, setMode] = useState<Mode>("letters");

  return (
    <div>
      <InteractiveToolHeader
        category="Quizzes & games"
        title="Countdown"
        description="Play the letters and numbers rounds solo. Beat the clock, then see the best the solver could find."
      />

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setMode("letters")}
          className={mode === "letters" ? "btn-primary" : "btn-outline-accent"}
        >
          Letters
        </button>
        <button
          type="button"
          onClick={() => setMode("numbers")}
          className={mode === "numbers" ? "btn-primary" : "btn-outline-accent"}
        >
          Numbers
        </button>
      </div>

      <div className="mt-8">
        {mode === "letters" ? <LettersRound /> : <NumbersRound />}
      </div>
    </div>
  );
}

function useCountdownTimer(active: boolean) {
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  useEffect(() => {
    if (!active) return;
    setSeconds(ROUND_SECONDS);
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [active]);
  return seconds;
}

function LettersRound() {
  const [rack, setRack] = useState<string | null>(null);
  const [vowels, setVowels] = useState(4);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const seconds = useCountdownTimer(rack !== null && !revealed);

  useEffect(() => {
    if (seconds === 0) setRevealed(true);
  }, [seconds]);

  const solverBest = useMemo(
    () => (rack ? bestWords(rack, STARTER_WORDS) : []),
    [rack]
  );
  const guessValid = rack ? isValidWord(guess, rack, STARTER_WORDS) : false;

  const deal = () => {
    setRack(drawLetters(vowels));
    setGuess("");
    setRevealed(false);
  };

  return (
    <div className="rounded-[10px] border border-border-strong bg-raised p-6">
      {!rack ? (
        <div className="space-y-4">
          <p className="shell-label text-accent">Vowels in your nine letters</p>
          <div className="flex flex-wrap gap-2">
            {[3, 4, 5, 6, 7].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVowels(v)}
                className={v === vowels ? "btn-primary" : "btn-outline-accent"}
              >
                {v}
              </button>
            ))}
          </div>
          <button type="button" onClick={deal} className="btn-primary">
            Deal letters
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {rack.toUpperCase().split("").map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  className="flex h-12 w-10 items-center justify-center rounded-md border border-border-strong bg-base font-display text-2xl text-primary"
                >
                  {ch}
                </span>
              ))}
            </div>
            <span className="font-display text-3xl text-accent">{seconds}</span>
          </div>

          <div>
            <label htmlFor="cd-word" className="shell-label text-accent">
              Your word
            </label>
            <input
              id="cd-word"
              value={guess}
              disabled={revealed}
              onChange={(e) => setGuess(e.target.value.replace(/[^a-zA-Z]/g, ""))}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary disabled:opacity-60"
            />
            {guess.length > 0 && (
              <p className="mt-2 text-sm text-secondary">
                {guessValid
                  ? `Valid - ${guess.length} letters.`
                  : "Not a valid word for these letters (using the starter dictionary)."}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setRevealed(true)} className="btn-secondary">
              Give up / reveal
            </button>
            <button type="button" onClick={deal} className="btn-outline-accent">
              New letters
            </button>
          </div>

          {revealed && (
            <div className="rounded-md border border-accent/40 bg-base p-4">
              <p className="shell-label text-accent">Best words the solver found</p>
              <p className="mt-2 text-primary">
                {solverBest.length ? solverBest.join(", ") : "No words found in the starter list."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NumbersRound() {
  const [numbers, setNumbers] = useState<number[] | null>(null);
  const [target, setTarget] = useState(0);
  const [large, setLarge] = useState(2);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const seconds = useCountdownTimer(numbers !== null && !revealed);

  useEffect(() => {
    if (seconds === 0) setRevealed(true);
  }, [seconds]);

  const solution = useMemo(
    () => (numbers ? solveNumbers(numbers, target) : null),
    [numbers, target]
  );

  const deal = () => {
    setNumbers(drawNumbers(large));
    setTarget(makeTarget());
    setAnswer("");
    setRevealed(false);
  };

  const yourValue = Number(answer);
  const yourOffBy =
    answer && Number.isFinite(yourValue) ? Math.abs(yourValue - target) : null;

  return (
    <div className="rounded-[10px] border border-border-strong bg-raised p-6">
      {!numbers ? (
        <div className="space-y-4">
          <p className="shell-label text-accent">How many large numbers (25/50/75/100)?</p>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setLarge(n)}
                className={n === large ? "btn-primary" : "btn-outline-accent"}
              >
                {n}
              </button>
            ))}
          </div>
          <button type="button" onClick={deal} className="btn-primary">
            Deal numbers
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {numbers.map((n, i) => (
                <span
                  key={`${n}-${i}`}
                  className="flex h-12 w-14 items-center justify-center rounded-md border border-border-strong bg-base font-display text-2xl text-primary"
                >
                  {n}
                </span>
              ))}
            </div>
            <span className="font-display text-3xl text-accent">{seconds}</span>
          </div>

          <p className="text-center font-display text-5xl text-primary">{target}</p>

          <div>
            <label htmlFor="cd-answer" className="shell-label text-accent">
              The number you reached
            </label>
            <input
              id="cd-answer"
              inputMode="numeric"
              value={answer}
              disabled={revealed}
              onChange={(e) => setAnswer(e.target.value.replace(/[^0-9]/g, ""))}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary disabled:opacity-60"
            />
            {yourOffBy !== null && (
              <p className="mt-2 text-sm text-secondary">
                {yourOffBy === 0 ? "Spot on!" : `${yourOffBy} away from target.`}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setRevealed(true)} className="btn-secondary">
              Reveal solution
            </button>
            <button type="button" onClick={deal} className="btn-outline-accent">
              New numbers
            </button>
          </div>

          {revealed && solution && (
            <div className="rounded-md border border-accent/40 bg-base p-4">
              <p className="shell-label text-accent">
                {solution.exact ? "Solved exactly" : `Closest possible (off by ${solution.offBy})`}
              </p>
              <p className="mt-2 font-display text-2xl text-primary">
                {solution.expression} = {solution.value}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

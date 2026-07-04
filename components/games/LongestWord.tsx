"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type FoundWord = { word: string; len: number };

type Feedback = { msg: string; type: "ok" | "err" | "info" | "" };

type StoredState = {
  found?: FoundWord[];
  attempts?: number;
};

function seededRand(seed: number) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function getTodaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function buildGrid(seed: number): string[] {
  const weighted =
    "AAAAAABBCCDDDDEEEEEEEEFFGGGHHIIIIIIJKLLLLMMNNNNNOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUVVWWXYYZ";
  const rand = seededRand(seed);
  const letters: string[] = [];
  while (letters.length < 16) {
    const idx = Math.floor(rand() * weighted.length);
    letters.push(weighted[idx]);
  }
  return letters;
}

function sortFound(words: FoundWord[]): FoundWord[] {
  return [...words].sort(
    (a, b) => b.len - a.len || a.word.localeCompare(b.word),
  );
}

function formatToday(): string {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function LongestWord() {
  const todaySeed = useMemo(() => getTodaySeed(), []);
  const storageKey = `rdev_boggle_${todaySeed}`;
  const grid = useMemo(() => buildGrid(todaySeed), [todaySeed]);

  const [selected, setSelected] = useState<number[]>([]);
  const [found, setFound] = useState<FoundWord[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({ msg: "", type: "" });
  const [checking, setChecking] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const currentWord = useMemo(
    () => selected.map((index) => grid[index]).join(""),
    [selected, grid],
  );

  const persist = useCallback(
    (nextFound: FoundWord[], nextAttempts: number) => {
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ found: nextFound, attempts: nextAttempts }),
        );
      } catch {
        // ignore storage errors
      }
    },
    [storageKey],
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const data = JSON.parse(raw) as StoredState;
        if (Array.isArray(data.found)) {
          setFound(sortFound(data.found));
        }
        if (typeof data.attempts === "number") {
          setAttempts(data.attempts);
        }
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, [storageKey]);

  const handleCellClick = (index: number) => {
    if (checking) return;

    setSelected((prev) => {
      const existingIndex = prev.indexOf(index);
      if (existingIndex !== -1) {
        return prev.slice(0, existingIndex);
      }
      return [...prev, index];
    });
    setFeedback({ msg: "", type: "" });
  };

  const handleClear = () => {
    setSelected([]);
    setFeedback({ msg: "", type: "" });
  };

  const handleSubmit = async () => {
    const word = currentWord.toLowerCase();
    if (word.length < 2 || checking) return;

    setChecking(true);
    setFeedback({ msg: "Checking...", type: "info" });

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (found.some((entry) => entry.word === word)) {
      persist(found, nextAttempts);
      setFeedback({ msg: `Already found ${word.toUpperCase()}`, type: "info" });
      setChecking(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
      );

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const entry: FoundWord = { word, len: word.length };
          const nextFound = sortFound([...found, entry]);
          setFound(nextFound);
          persist(nextFound, nextAttempts);
          setSelected([]);
          setFeedback({
            msg: `${word.toUpperCase()} is valid — ${word.length} letters`,
            type: "ok",
          });
          setChecking(false);
          return;
        }
      }

      persist(found, nextAttempts);
      setFeedback({
        msg: `${currentWord.toUpperCase()} is not a valid word`,
        type: "err",
      });
    } catch {
      persist(found, nextAttempts);
      setFeedback({ msg: "Could not check word — try again.", type: "err" });
    }

    setChecking(false);
  };

  const feedbackClass =
    feedback.type === "ok"
      ? "text-green-400"
      : feedback.type === "err"
        ? "text-red-400"
        : feedback.type === "info"
          ? "text-accent"
          : "text-transparent";

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[440px] rounded-xl bg-[#0e0e0e] p-6">
        <p className="text-sm text-white/70">Loading today&apos;s grid...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[440px] rounded-xl bg-[#0e0e0e] p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          Longest Word
        </p>
        <p className="text-right text-xs text-white/55">{formatToday()}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {grid.map((letter, index) => {
          const order = selected.indexOf(index);
          const isSelected = order !== -1;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleCellClick(index)}
              disabled={checking}
              className={`relative flex aspect-square cursor-pointer items-center justify-center rounded-lg border text-2xl font-bold transition-all active:scale-95 hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-white/10 bg-[#1a1a1a] text-paper"
              }`}
              aria-label={`Letter ${letter}${isSelected ? `, position ${order + 1}` : ""}`}
            >
              {letter}
              {isSelected && (
                <span className="absolute right-1.5 top-1 text-[10px] font-semibold text-accent">
                  {order + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#1a1a1a] px-4 py-4">
        <p
          className={`min-h-[2rem] flex-1 font-display text-2xl font-bold tracking-widest ${
            currentWord ? "text-paper" : "text-white/50"
          }`}
        >
          {currentWord ? currentWord.toUpperCase() : "Tap letters to spell"}
        </p>
        <span className="shrink-0 text-sm text-white/55">
          {currentWord.length}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleClear}
          disabled={checking || selected.length === 0}
          className="flex-1 rounded-md border border-white/20 bg-[#1a1a1a] px-4 py-3 text-sm font-semibold text-paper transition-colors hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={checking || currentWord.length < 2}
          className="flex-1 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit
        </button>
      </div>

      <p
        className={`mt-3 min-h-[1.25rem] text-sm transition-opacity duration-200 ${feedbackClass}`}
        aria-live="polite"
      >
        {feedback.msg || "\u00a0"}
      </p>

      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-widest text-white/70">
            Today&apos;s best words
          </p>
          <p className="text-xs text-white/55">
            {attempts} attempt{attempts === 1 ? "" : "s"}
          </p>
        </div>

        {found.length === 0 ? (
          <p className="text-sm text-white/55">No words found yet.</p>
        ) : (
          <ul className="space-y-2">
            {found.map((entry, index) => (
              <li
                key={entry.word}
                className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                  index === 0
                    ? "border-accent/40 bg-accent/5"
                    : "border-white/10 bg-[#1a1a1a]"
                }`}
              >
                <span className="font-bold uppercase tracking-wide text-paper">
                  {entry.word}
                </span>
                <span className="text-sm font-medium text-accent">
                  {entry.len}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

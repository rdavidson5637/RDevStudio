"use client";

import { useEffect, useState } from "react";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCard(words: string[]): (string | "FREE")[][] {
  const pool = shuffle(words.filter(Boolean)).slice(0, 24);
  const grid: (string | "FREE")[][] = [];
  let idx = 0;
  for (let r = 0; r < 5; r++) {
    const row: (string | "FREE")[] = [];
    for (let c = 0; c < 5; c++) {
      if (r === 2 && c === 2) row.push("FREE");
      else row.push(pool[idx++] ?? "-");
    }
    grid.push(row);
  }
  return grid;
}

export function BingoCardGeneratorApp() {
  const [words, setWords] = useState(
    "Bingo\nLine\nFull house\nNumber 7\nCaller\nDauber\nWinner\nRefreshments",
  );
  const [cards, setCards] = useState<(string | "FREE")[][][]>([]);
  const [count, setCount] = useState(4);

  useEffect(() => {
    recordInteractiveToolVisit("bingo-card-generator");
  }, []);

  const wordList = words
    .split("\n")
    .map((w) => w.trim())
    .filter(Boolean);

  const generate = () => {
    setCards(Array.from({ length: count }, () => makeCard(wordList)));
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Events & timers"
        title="Bingo Card Generator"
        description="Generate unique 5×5 bingo cards from your word list - perfect for meetings and watch parties."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">
              Words (min 24 unique, one per line)
            </span>
            <textarea
              value={words}
              onChange={(e) => setWords(e.target.value)}
              rows={10}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              Number of cards ({count})
            </span>
            <input
              type="range"
              min={1}
              max={12}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-2 w-full accent-accent"
            />
          </label>
          <button
            type="button"
            onClick={generate}
            disabled={wordList.length < 8}
            className="btn-primary disabled:opacity-50"
          >
            Generate cards
          </button>
        </FadeIn>
        <FadeIn delayMs={80} className="grid gap-4 sm:grid-cols-2">
          {cards.map((card, ci) => (
            <div
              key={ci}
              className="rounded-[10px] border border-border-strong bg-raised p-3"
            >
              <p className="shell-label mb-2 text-center text-secondary">
                Card {ci + 1}
              </p>
              <div className="grid grid-cols-5 gap-1">
                {card.flat().map((cell, i) => (
                  <div
                    key={i}
                    className={`flex aspect-square items-center justify-center rounded border p-0.5 text-center text-[9px] font-semibold leading-tight sm:text-[10px] ${cell === "FREE" ? "border-accent bg-accent/10 text-accent" : "border-border bg-base text-primary"}`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </div>
  );
}

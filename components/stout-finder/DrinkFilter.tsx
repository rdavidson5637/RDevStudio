"use client";

import { DRINKS, type Drink } from "@/lib/stout-finder/types";

type Props = {
  selectedDrinks: Drink[];
  matchAll: boolean;
  onToggleDrink: (drink: Drink) => void;
  onMatchAll: (matchAll: boolean) => void;
};

export function DrinkFilter({
  selectedDrinks,
  matchAll,
  onToggleDrink,
  onMatchAll,
}: Props) {
  const multi = selectedDrinks.length >= 2;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Drinks">
        {DRINKS.map((drink) => {
          const selected = selectedDrinks.includes(drink.id);
          return (
            <button
              key={drink.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggleDrink(drink.id)}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                selected
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border-strong bg-raised text-primary hover:border-accent"
              }`}
            >
              {drink.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div
          className={`inline-flex rounded-md border border-border ${
            multi ? "opacity-100" : "pointer-events-none opacity-40"
          }`}
          role="group"
          aria-label="Match mode"
        >
          <button
            type="button"
            disabled={!multi}
            onClick={() => onMatchAll(false)}
            className={`px-3 py-1.5 text-xs font-semibold ${
              !matchAll ? "bg-accent text-on-accent" : "bg-raised text-primary"
            }`}
          >
            ANY
          </button>
          <button
            type="button"
            disabled={!multi}
            onClick={() => onMatchAll(true)}
            className={`px-3 py-1.5 text-xs font-semibold ${
              matchAll ? "bg-accent text-on-accent" : "bg-raised text-primary"
            }`}
          >
            ALL
          </button>
        </div>
        <p className="text-xs text-secondary">
          ALL shows pubs that carry every drink you picked. Use it when one of you wants Beamish and the other wants Guinness.
        </p>
      </div>
    </div>
  );
}

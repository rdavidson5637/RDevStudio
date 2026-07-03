"use client";
import { AVAILABLE_LEAGUES } from "@/lib/champions-draft/data";
import type { GameState } from "@/types/champions-draft";

interface Props {
  onSelect: (updates: Partial<GameState>) => void;
  onBack: () => void;
}

export default function LeagueSelect({ onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white/30 hover:text-white text-sm uppercase tracking-widest transition-colors"
      >
        ← Back
      </button>

      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
          Pick a League
        </h2>
        <p className="text-white/40 text-sm mt-3">
          Your drafted XI will compete in a full season
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {AVAILABLE_LEAGUES.map((league) => (
          <button
            key={league.id}
            onClick={() =>
              onSelect({
                selectedLeague: league.id as GameState["selectedLeague"],
                phase: "formation-select",
              })
            }
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-5 text-left transition-all duration-200 cursor-pointer group"
          >
            <span className="text-3xl">{league.flag}</span>
            <span className="text-white font-semibold text-base group-hover:text-white/80">
              {league.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

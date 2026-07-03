"use client";
import type {
  Formation,
  GameState,
  GameMode,
  WCDraftMode,
} from "@/types/champions-draft";

interface Props {
  onSelect: (updates: Partial<GameState>) => void;
  onBack: () => void;
  mode?: GameMode | null;
  selectedNation?: string | null;
  wcDraftMode?: WCDraftMode | null;
}

const FORMATIONS: { id: Formation; label: string; description: string }[] = [
  { id: "4-3-3", label: "4-3-3", description: "Attacking. Wide. Classic." },
  { id: "4-4-2", label: "4-4-2", description: "Balanced. Solid. Traditional." },
  {
    id: "4-2-3-1",
    label: "4-2-3-1",
    description: "Controlled. Modern. Tactical.",
  },
  { id: "3-5-2", label: "3-5-2", description: "Wing play. Two up top." },
  { id: "5-3-2", label: "5-3-2", description: "Defensive. Counter. Compact." },
];

export default function FormationSelect({
  onSelect,
  onBack,
  mode,
  selectedNation,
  wcDraftMode,
}: Props) {
  const isNationalWC =
    mode === "world-cup" && wcDraftMode === "national" && selectedNation;

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
          Pick Your Formation
        </h2>
        <p className="text-white/40 text-sm mt-3">
          {isNationalWC
            ? `National Squad rules — only ${selectedNation} players in your spins`
            : "This shapes how your XI is laid out on the pitch"}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {FORMATIONS.map((f) => (
          <button
            key={f.id}
            onClick={() =>
              onSelect({
                formation: f.id,
                phase: "drafting",
              })
            }
            className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl px-6 py-5 text-left transition-all duration-200 cursor-pointer group"
          >
            <div>
              <span className="text-white font-black text-2xl tracking-tight">
                {f.label}
              </span>
              <p className="text-white/40 text-sm mt-0.5">{f.description}</p>
            </div>
            <span className="text-white/20 group-hover:text-white/50 text-xl transition-colors">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

'use client'
import { AVAILABLE_NATIONS } from '@/lib/champions-draft/data'
import type { GameState } from '@/types/champions-draft'

interface Props {
  onSelect: (updates: Partial<GameState>) => void
  onBack: () => void
}

export default function NationSelect({ onSelect, onBack }: Props) {
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
          Choose Your Nation
        </h2>
        <p className="text-white/40 text-sm mt-3">
          Pick the country your XI will represent at the World Cup
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {AVAILABLE_NATIONS.map(nation => (
          <button
            key={nation.id}
            onClick={() =>
              onSelect({
                selectedNation: nation.id,
                wcDraftMode: null,
                phase: 'wc-draft-mode-select',
              })
            }
            className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-5 text-center transition-all duration-200 cursor-pointer group"
          >
            <span className="text-4xl">{nation.flag}</span>
            <span className="text-white font-semibold text-sm group-hover:text-white/80">
              {nation.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

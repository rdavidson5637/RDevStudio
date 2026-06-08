'use client'
import {
  AVAILABLE_NATIONS,
  NATIONAL_PLAYER_COUNTS,
  LIMITED_NATIONAL_POOL_THRESHOLD,
} from '@/lib/champions-draft/data'
import type { GameState, WCDraftMode } from '@/types/champions-draft'

interface Props {
  selectedNation: string
  onSelect: (updates: Partial<GameState>) => void
  onBack: () => void
}

const MODES: {
  id: WCDraftMode
  label: string
  description: string
}[] = [
  {
    id: 'national',
    label: 'National Squad',
    description: 'Only players from your chosen nation appear in spins',
  },
  {
    id: 'dream',
    label: 'Dream Team',
    description: 'Draft any legends — your XI still represents your nation',
  },
]

export default function WCDraftModeSelect({ selectedNation, onSelect, onBack }: Props) {
  const nation = AVAILABLE_NATIONS.find(n => n.id === selectedNation)
  const playerCount = NATIONAL_PLAYER_COUNTS[selectedNation] ?? 0
  const isLimitedPool = playerCount < LIMITED_NATIONAL_POOL_THRESHOLD

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white/30 hover:text-white text-sm uppercase tracking-widest transition-colors"
      >
        ← Back
      </button>

      <div className="mb-10 text-center">
        <span className="text-5xl">{nation?.flag ?? '🏳️'}</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase mt-4">
          {selectedNation}
        </h2>
        <p className="text-white/40 text-sm mt-3">
          How do you want to build your World Cup XI?
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() =>
              onSelect({
                wcDraftMode: mode.id,
                phase: 'formation-select',
              })
            }
            className="flex flex-col items-start bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl px-6 py-5 text-left transition-all duration-200 cursor-pointer group"
          >
            <span className="text-white font-black text-xl tracking-tight">
              {mode.label}
            </span>
            <p className="text-white/40 text-sm mt-1">{mode.description}</p>
            {mode.id === 'national' && (
              <p className="text-white/25 text-xs mt-2">
                {playerCount} eligible players in the pool
              </p>
            )}
          </button>
        ))}
      </div>

      {isLimitedPool && (
        <p className="text-amber-400/70 text-xs text-center max-w-sm mt-6 leading-relaxed">
          Limited {selectedNation} player pool — National Squad works best for
          Dream Team, or try a nation with deeper coverage like Spain or Brazil.
        </p>
      )}
    </div>
  )
}

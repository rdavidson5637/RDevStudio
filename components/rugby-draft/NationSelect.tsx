'use client'
import type { GameMode, GameState } from '@/types/rugby-draft'
import { getClubColour } from '@/lib/rugby-draft/utils'

interface Props {
  mode: GameMode
  onSelect: (updates: Partial<GameState>) => void
  onBack: () => void
}

const SIX_NATIONS = ['England', 'Ireland', 'Wales', 'Scotland', 'France', 'Italy']

const WORLD_CUP_NATIONS = [
  'New Zealand', 'Ireland', 'South Africa', 'France', 'England',
  'Australia', 'Argentina', 'Wales', 'Scotland', 'Italy',
  'Fiji', 'Samoa', 'Tonga', 'Japan', 'Georgia',
  'Uruguay', 'Namibia', 'Portugal', 'Chile', 'United States',
]

const BADGE_CODES: Record<string, string> = {
  'New Zealand': 'NZL',
  Ireland: 'IRE',
  'South Africa': 'RSA',
  France: 'FRA',
  England: 'ENG',
  Australia: 'AUS',
  Argentina: 'ARG',
  Wales: 'WAL',
  Scotland: 'SCO',
  Italy: 'ITA',
  Fiji: 'FIJ',
  Samoa: 'SAM',
  Tonga: 'TON',
  Japan: 'JPN',
  Georgia: 'GEO',
  Uruguay: 'URU',
  Namibia: 'NAM',
  Portugal: 'POR',
  Chile: 'CHI',
  'United States': 'USA',
}

export default function NationSelect({ mode, onSelect, onBack }: Props) {
  const nations = mode === 'six-nations' ? SIX_NATIONS : WORLD_CUP_NATIONS
  const subtitle =
    mode === 'six-nations'
      ? 'Pick the nation your XV will represent in the Six Nations'
      : 'Pick the nation your XV will represent at the World Cup'

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
        <p className="text-white/40 text-sm mt-3">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {nations.map(nation => {
          const badge = BADGE_CODES[nation] ?? '---'
          const colour = getClubColour(badge)
          return (
            <button
              key={nation}
              onClick={() =>
                onSelect({
                  selectedNation: nation,
                  phase: 'drafting',
                })
              }
              className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-5 text-center transition-all duration-200 cursor-pointer group"
            >
              <span
                className="text-xs font-black tracking-widest px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: `${colour}33`,
                  color: colour,
                  border: `1px solid ${colour}55`,
                }}
              >
                {badge}
              </span>
              <span className="text-white font-semibold text-sm group-hover:text-white/80">
                {nation}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

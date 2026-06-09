'use client'
import type { GameState } from '@/types/rugby-draft'
import { getClubColour } from '@/lib/rugby-draft/utils'

interface Props {
  onSelect: (updates: Partial<GameState>) => void
  onBack: () => void
}

const CLUBS = {
  'United Rugby Championship': [
    { name: 'Leinster', badge: 'LNS' },
    { name: 'Munster', badge: 'MUN' },
    { name: 'Ulster', badge: 'ULS' },
    { name: 'Connacht', badge: 'CON' },
    { name: 'Glasgow Warriors', badge: 'GLA' },
    { name: 'Edinburgh', badge: 'EDI' },
    { name: 'Cardiff Rugby', badge: 'CAR' },
    { name: 'Dragons RFC', badge: 'DRA' },
  ],
  Premiership: [
    { name: 'Saracens', badge: 'SAR' },
    { name: 'Exeter Chiefs', badge: 'EXE' },
    { name: 'Bath Rugby', badge: 'BAT' },
    { name: 'Northampton Saints', badge: 'NOR' },
    { name: 'Sale Sharks', badge: 'SAL' },
    { name: 'Leicester Tigers', badge: 'LEI' },
    { name: 'Harlequins', badge: 'HAR' },
    { name: 'Bristol Bears', badge: 'BRI' },
  ],
  'Top 14': [
    { name: 'Toulouse', badge: 'TOU' },
    { name: 'La Rochelle', badge: 'LRO' },
    { name: 'Bordeaux-Bègles', badge: 'BOR' },
    { name: 'Stade Français', badge: 'SFR' },
    { name: 'Clermont', badge: 'CLE' },
    { name: 'Racing 92', badge: 'RAC' },
    { name: 'Toulon', badge: 'TVN' },
    { name: 'Lyon', badge: 'LYO' },
  ],
} as const

export default function ClubSelect({ onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center px-4 py-12">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white/30 hover:text-white text-sm uppercase tracking-widest transition-colors"
      >
        ← Back
      </button>

      <div className="mb-10 text-center mt-8">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
          Choose Your Club
        </h2>
        <p className="text-white/40 text-sm mt-3">
          Pick the club your XV will represent in the Champions Cup
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        {Object.entries(CLUBS).map(([league, clubs]) => (
          <div key={league}>
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
              {league}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {clubs.map(club => {
                const colour = getClubColour(club.badge)
                return (
                  <button
                    key={club.name}
                    onClick={() =>
                      onSelect({
                        selectedClub: club.name,
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
                      {club.badge}
                    </span>
                    <span className="text-white font-semibold text-sm group-hover:text-white/80 leading-tight">
                      {club.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

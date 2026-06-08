'use client'
import type { CLLeaguePhase } from '@/lib/champions-draft/matchEngine'

interface Props {
  leaguePhase: CLLeaguePhase
  userTeam: string
  participantCount: number
}

export default function CLLeagueDraw({ leaguePhase, userTeam, participantCount }: Props) {
  const { userFixtures } = leaguePhase

  return (
    <div className="w-full max-w-md">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 text-center">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
          League Phase
        </p>
        <p className="text-white font-black text-2xl tabular-nums">
          {participantCount} clubs
        </p>
        <p className="text-white/40 text-xs mt-1">
          8 matches each · One league table
        </p>
      </div>

      <p className="text-white/40 text-xs uppercase tracking-widest mb-3 text-center">
        Your opponents
      </p>

      <div className="flex flex-col gap-2">
        {userFixtures.map((fixture, i) => {
          const isHome = fixture.home === userTeam
          const opponent = isHome ? fixture.away : fixture.home
          return (
            <div
              key={i}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <span className="text-white/25 text-xs font-bold tabular-nums w-6">
                {i + 1}
              </span>
              <span className="text-white font-semibold text-sm flex-1 truncate">
                {opponent}
              </span>
              <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                {isHome ? 'Home' : 'Away'}
              </span>
            </div>
          )
        })}
      </div>

      <p className="text-white/20 text-[10px] uppercase tracking-widest text-center mt-4">
        Top 8 qualify · 9th–24th playoff · 25th+ out
      </p>
    </div>
  )
}

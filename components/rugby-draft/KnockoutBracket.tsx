'use client'
import type { TournamentRound } from '@/types/rugby-draft'

interface Props {
  rounds: TournamentRound[]
  userTeam: string
}

export default function KnockoutBracket({ rounds, userTeam }: Props) {
  return (
    <div className="w-full flex flex-col gap-6">
      {rounds.map(round => (
        <div key={round.name}>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
            {round.name}
          </p>
          <div className="flex flex-col gap-2">
            {round.fixtures.map((fixture, i) => {
              const homeWon =
                fixture.homeScore > fixture.awayScore
              const awayWon =
                fixture.awayScore > fixture.homeScore
              const isUserHome = fixture.homeTeam === userTeam
              const isUserAway = fixture.awayTeam === userTeam
              const userWon =
                (isUserHome && homeWon) || (isUserAway && awayWon)
              const userPlaying = isUserHome || isUserAway

              return (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 border ${
                    userPlaying
                      ? userWon
                        ? 'bg-emerald-400/10 border-emerald-400/30'
                        : 'bg-red-400/10 border-red-400/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <span
                    className={`font-bold text-sm flex-1 truncate ${
                      isUserHome ? 'text-emerald-400' : 'text-white'
                    }`}
                  >
                    {fixture.homeTeam}
                  </span>
                  <span className="text-white font-black text-base tabular-nums flex-shrink-0 mx-2">
                    {fixture.homeScore} - {fixture.awayScore}
                  </span>
                  <span
                    className={`font-bold text-sm flex-1 truncate text-right ${
                      isUserAway ? 'text-emerald-400' : 'text-white'
                    }`}
                  >
                    {fixture.awayTeam}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

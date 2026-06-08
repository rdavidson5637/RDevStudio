'use client'
import type { TournamentRound } from '@/types/champions-draft'
import { getUserKnockoutFixture } from '@/lib/champions-draft/matchEngine'

interface Props {
  round: TournamentRound
  userTeam: string
}

export default function KnockoutDrawPreview({ round, userTeam }: Props) {
  const userFixture = getUserKnockoutFixture(userTeam, round)

  if (!userFixture) {
    return (
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-6 text-center">
        <p className="text-white/40 text-sm">No tie scheduled for your team.</p>
      </div>
    )
  }

  const isHome = userFixture.homeTeam === userTeam
  const opponent = isHome ? userFixture.awayTeam : userFixture.homeTeam

  return (
    <div className="w-full max-w-md">
      <p className="text-white/40 text-xs uppercase tracking-widest mb-3 text-center">
        Your tie
      </p>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <p className="text-white/30 text-xs uppercase tracking-widest text-center mb-4">
          {round.name}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span
            className={`font-bold text-sm flex-1 truncate ${
              isHome ? 'text-emerald-400' : 'text-white'
            }`}
          >
            {userFixture.homeTeam}
          </span>
          <span className="text-white/20 font-black text-lg flex-shrink-0">vs</span>
          <span
            className={`font-bold text-sm flex-1 truncate text-right ${
              !isHome ? 'text-emerald-400' : 'text-white'
            }`}
          >
            {userFixture.awayTeam}
          </span>
        </div>
        <p className="text-white/25 text-[10px] uppercase tracking-widest text-center mt-4">
          {isHome ? 'Home' : 'Away'} · {opponent}
        </p>
      </div>
    </div>
  )
}

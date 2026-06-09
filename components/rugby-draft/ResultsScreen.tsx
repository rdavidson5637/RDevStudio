'use client'
import type { GameMode } from '@/types/rugby-draft'

interface Props {
  winner: string
  userResult: string
  userTeam: string
  topTryScorer: { playerName: string; club: string; tries: number }
  playerOfTournament: { playerName: string; club: string; overall: number }
  mode: GameMode
  onPlayAgain: () => void
  onShare?: () => void
}

const MODE_LABELS: Record<GameMode, string> = {
  'world-cup': 'Rugby World Cup',
  'six-nations': 'Six Nations',
  'champions-cup': 'Champions Cup',
}

export default function ResultsScreen({
  winner,
  userResult,
  userTeam,
  topTryScorer,
  playerOfTournament,
  mode,
  onPlayAgain,
  onShare,
}: Props) {
  const isChampion = userResult.toLowerCase().includes('champion')

  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 ${
        isChampion
          ? 'bg-emerald-400/5 border-emerald-400/30 shadow-[0_0_40px_rgba(52,211,153,0.12)]'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="text-center mb-8">
        <p className="text-6xl mb-4">🏆</p>
        <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
          {MODE_LABELS[mode]}
        </p>
        <h2 className="text-white font-black text-3xl md:text-4xl uppercase tracking-tight">
          {winner}
        </h2>
        <p
          className={`text-sm mt-3 font-semibold ${
            isChampion ? 'text-emerald-400' : 'text-white/50'
          }`}
        >
          {userResult}
        </p>
        {userTeam && (
          <p className="text-white/25 text-xs mt-1 uppercase tracking-widest">
            {userTeam}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
            Top Try Scorer
          </p>
          <p className="text-white font-bold text-sm truncate">
            {topTryScorer.playerName}
          </p>
          <p className="text-emerald-400 font-black text-2xl mt-1">
            {topTryScorer.tries} tries
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
            Player of Tournament
          </p>
          <p className="text-white font-bold text-sm truncate">
            {playerOfTournament.playerName}
          </p>
          <p className="text-amber-400 font-black text-2xl mt-1">
            {playerOfTournament.overall} OVR
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {onShare && (
          <button
            onClick={onShare}
            className="w-full py-3 bg-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
          >
            Share Result
          </button>
        )}
        <button
          onClick={onPlayAgain}
          className="w-full px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

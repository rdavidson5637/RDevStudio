'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import type { GameState, MatchResult, LeagueTableRow } from '@/types/champions-draft'
import { LEAGUE_SQUADS } from '@/lib/champions-draft/data'
import { simulateFullSeason, getTopScorer } from '@/lib/champions-draft/matchEngine'
import { sortTable } from '@/lib/champions-draft/utils'
import MatchAnimation, { CompletedMatchCard } from './MatchAnimation'
import LeagueTable from './LeagueTable'
import SeasonShareCard from './SeasonShareCard'
import { getShareSquadFromSlots } from './shareHelpers'

interface Props {
  state: GameState
  onUpdate: (updates: Partial<GameState>) => void
  onExit: () => void
}

const USER_TEAM = 'My XI'

type SeasonPhase = 'preview' | 'playing' | 'table' | 'done'

export default function LeagueSeason({ state, onUpdate, onExit }: Props) {
  const [seasonPhase, setSeasonPhase] = useState<SeasonPhase>('preview')
  const [allResults, setAllResults] = useState<MatchResult[]>([])
  const [table, setTable] = useState<LeagueTableRow[]>([])
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [speedMode, setSpeedMode] = useState<'normal' | 'fast' | 'skip'>(
    state.speedMode
  )
  const [isSimulating, setIsSimulating] = useState(true)
  const feedRef = useRef<HTMLDivElement>(null)

  const leagueName = state.selectedLeague ?? 'Premier League'
  const leagueSquads = LEAGUE_SQUADS[leagueName] ?? []
  const userRatings = state.teamRatings!

  const draftedAttackers = state.draftSlots
    .filter(s => s.player && ['ST', 'CF', 'LW', 'RW', 'LM', 'RM'].includes(s.player.position))
    .map(s => s.player!.name)

  useEffect(() => {
    if (seasonPhase !== 'preview') return

    setIsSimulating(true)
    let cancelled = false

    const timer = setTimeout(() => {
      const { allResults: results, table: finalTable } = simulateFullSeason(
        USER_TEAM,
        userRatings,
        leagueSquads
      )
      if (!cancelled) {
        setAllResults(results)
        setTable(finalTable)
        setIsSimulating(false)
      }
    }, 0)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [seasonPhase, userRatings, leagueSquads, leagueName])

  const userMatches = allResults.filter(
    r => r.homeTeam === USER_TEAM || r.awayTeam === USER_TEAM
  )

  const handleMatchComplete = useCallback(() => {
    setCurrentMatchIndex(prev => {
      const next = prev + 1
      if (next >= userMatches.length) {
        setSeasonPhase('table')
      }
      return next
    })
  }, [userMatches.length])

  const handleStartSeason = useCallback(() => {
    if (isSimulating || userMatches.length === 0) return
    setSeasonPhase('playing')
    setCurrentMatchIndex(0)
  }, [isSimulating, userMatches.length])

  const handleSkipAll = useCallback(() => {
    setSeasonPhase('table')
  }, [])

  const completedMatches = userMatches.slice(0, currentMatchIndex).reverse()

  useEffect(() => {
    if (seasonPhase === 'playing') {
      feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentMatchIndex, seasonPhase])

  const userPosition = table.findIndex(r => r.club === USER_TEAM) + 1
  const userRow = table.find(r => r.club === USER_TEAM)
  const winner = table[0]?.club ?? ''

  if (seasonPhase === 'preview') {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <button
          onClick={onExit}
          className="absolute top-6 left-6 text-white/50 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
        >
          ← Quit
        </button>
        <div className="text-center mb-10">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
            {leagueName}
          </p>
          <h2 className="text-white font-black text-4xl uppercase tracking-tight">
            Season Preview
          </h2>
          <p className="text-white/40 text-sm mt-3">
            {leagueSquads.length} opponents · {leagueSquads.length * 2} matches
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-8">
          {[
            { label: 'Attack', value: userRatings.attack },
            { label: 'Midfield', value: userRatings.midfield },
            { label: 'Defence', value: userRatings.defence },
            { label: 'GK', value: userRatings.goalkeeper },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
              <p className="text-white font-black text-3xl mt-1">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs mb-6">
          <p className="text-white/30 text-xs uppercase tracking-widest text-center">
            Match speed
          </p>
          <div className="flex gap-2">
            {(['normal', 'fast', 'skip'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSpeedMode(s)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all ${
                  speedMode === s
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartSeason}
          disabled={isSimulating}
          className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSimulating ? 'Simulating Season...' : 'Kick Off'}
        </button>
      </div>
    )
  }

  if (seasonPhase === 'playing') {
    const seasonProgress = (currentMatchIndex / Math.max(1, userMatches.length)) * 100

    return (
      <div className="min-h-screen bg-[#0a0a12] flex flex-col">
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={onExit}
                className="text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                ← Quit
              </button>
              <div className="text-center">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  {leagueName}
                </p>
                <h2 className="text-white font-black text-lg uppercase tracking-tight">
                  Season Progress
                </h2>
              </div>
              <p className="text-white/40 text-xs tabular-nums">
                {currentMatchIndex} / {userMatches.length}
              </p>
            </div>

            <div className="w-full bg-white/10 rounded-full h-1 mb-4">
              <div
                className="bg-emerald-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${seasonProgress}%` }}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {(['normal', 'fast', 'skip'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSpeedMode(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
                    speedMode === s
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white/40 hover:bg-white/20'
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={handleSkipAll}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide bg-white/5 text-white/30 hover:bg-white/10 border border-white/10 ml-auto"
              >
                Skip to Table
              </button>
            </div>
          </div>
        </div>

        <div ref={feedRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-lg mx-auto flex flex-col gap-2">
            {userMatches[currentMatchIndex] && (
              <MatchAnimation
                key={currentMatchIndex}
                result={userMatches[currentMatchIndex]}
                speedMode={speedMode}
                onComplete={handleMatchComplete}
                matchNumber={currentMatchIndex + 1}
                totalMatches={userMatches.length}
                userTeam={USER_TEAM}
              />
            )}

            {completedMatches.map((match, i) => (
              <CompletedMatchCard
                key={currentMatchIndex - i - 1}
                result={match}
                matchNumber={currentMatchIndex - i}
                userTeam={USER_TEAM}
              />
            ))}

            {currentMatchIndex === 0 && (
              <p className="text-white/20 text-xs text-center uppercase tracking-widest py-8">
                Results will stack here as matches finish
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (seasonPhase === 'table' || seasonPhase === 'done') {
    const topScorerData = getTopScorer(USER_TEAM, draftedAttackers, allResults)
    const playerOfSeason = state.draftSlots
      .filter(s => s.player)
      .sort((a, b) => (b.player?.overall ?? 0) - (a.player?.overall ?? 0))[0]?.player

    const userRecord = userMatches.reduce(
      (acc, r) => {
        const isHome = r.homeTeam === USER_TEAM
        const userScore = isHome ? r.homeScore : r.awayScore
        const oppScore = isHome ? r.awayScore : r.homeScore
        if (userScore > oppScore) acc.won++
        else if (userScore < oppScore) acc.lost++
        else acc.drawn++
        return acc
      },
      { won: 0, drawn: 0, lost: 0 }
    )

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              {leagueName} · Season Complete
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Final Table
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
                Champion
              </p>
              <p className="text-white font-black text-sm leading-tight">
                {winner === USER_TEAM ? '🏆 You!' : winner}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
                Your Finish
              </p>
              <p className="text-white font-black text-2xl">
                {userPosition}{userPosition === 1 ? 'st' : userPosition === 2 ? 'nd' : userPosition === 3 ? 'rd' : 'th'}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
                Points
              </p>
              <p className="text-white font-black text-2xl">
                {userRow?.points ?? 0}
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <LeagueTable table={table} userTeam={USER_TEAM} title="" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
                Top Scorer
              </p>
              <p className="text-white font-bold text-sm">{topScorerData.playerName}</p>
              <p className="text-emerald-400 font-black text-2xl mt-1">
                {topScorerData.goals} goals
              </p>
            </div>
            {playerOfSeason && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
                  Player of Season
                </p>
                <p className="text-white font-bold text-sm">{playerOfSeason.name}</p>
                <p className="text-amber-400 font-black text-2xl mt-1">
                  {playerOfSeason.overall} OVR
                </p>
              </div>
            )}
          </div>

          <SeasonShareCard
            leagueName={leagueName}
            position={userPosition}
            points={userRow?.points ?? 0}
            won={userRecord.won}
            drawn={userRecord.drawn}
            lost={userRecord.lost}
            goalDifference={userRow?.goalDifference ?? 0}
            topScorer={topScorerData.playerName}
            topScorerGoals={topScorerData.goals}
            playerOfSeason={playerOfSeason?.name ?? '—'}
            playerOfSeasonOvr={playerOfSeason?.overall ?? 0}
            formation={state.formation}
            teamRatings={state.teamRatings ?? undefined}
            squad={getShareSquadFromSlots(state.draftSlots)}
          />

          <div className="flex flex-col gap-3">
            <button
              onClick={() => onUpdate({ phase: 'playing', mode: 'champions-league' })}
              className="w-full py-4 bg-white/10 text-white font-black text-base uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
            >
              Play Champions League →
            </button>
            <button
              onClick={() => onUpdate({ phase: 'mode-select', mode: null, formation: null, draftSlots: [], teamRatings: null, selectedLeague: null })}
              className="w-full py-3 text-white/30 font-bold text-sm uppercase tracking-widest hover:text-white/60 transition-colors"
            >
              Start New Draft
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

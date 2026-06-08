'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import type { GameState, MatchResult, LeagueTableRow, TournamentRound } from '@/types/champions-draft'
import { CHAMPIONS_LEAGUE_CLUBS, ALL_MODERN_SQUADS } from '@/lib/champions-draft/data'
import {
  buildCLLeaguePhase,
  simulateCLLeaguePhase,
  getCLLeagueOutcome,
  getCLPlayoffTeams,
  simulateAIKnockoutRound,
  buildCLRoundOf16,
  buildKnockoutPairings,
  simulateKnockoutRoundFromPairings,
  CL_LEAGUE_PHASE_SIZE,
  type CLLeaguePhase,
  type CLLeagueOutcome,
} from '@/lib/champions-draft/matchEngine'
import MatchAnimation, { CompletedMatchCard } from './MatchAnimation'
import CLLeagueDraw from './CLLeagueDraw'
import LeagueTable from './LeagueTable'
import KnockoutBracket from './KnockoutBracket'
import KnockoutDrawPreview from './KnockoutDrawPreview'
import CLShareCard from './CLShareCard'
import QuitButton from './QuitButton'
import { getShareSquadFromSlots } from './shareHelpers'

interface Props {
  state: GameState
  onUpdate: (updates: Partial<GameState>) => void
  onExit: () => void
}

const USER_TEAM = 'My XI'

type CLPhase =
  | 'preview'
  | 'league-playing'
  | 'league-done'
  | 'playoff-preview'
  | 'playoff-playing'
  | 'playoff-done'
  | 'r16-preview'
  | 'r16-playing'
  | 'r16-done'
  | 'qf-preview'
  | 'qf-playing'
  | 'qf-done'
  | 'sf-preview'
  | 'sf-playing'
  | 'sf-done'
  | 'final-preview'
  | 'final-playing'
  | 'winner'
  | 'eliminated'

function getPositionSuffix(pos: number): string {
  if (pos === 1) return 'st'
  if (pos === 2) return 'nd'
  if (pos === 3) return 'rd'
  return 'th'
}

export default function ChampionsLeague({ state, onUpdate, onExit }: Props) {
  const [clPhase, setCLPhase] = useState<CLPhase>('preview')
  const [leaguePhase, setLeaguePhase] = useState<CLLeaguePhase | null>(null)
  const [leagueTable, setLeagueTable] = useState<LeagueTableRow[]>([])
  const [userLeagueResults, setUserLeagueResults] = useState<MatchResult[]>([])
  const [knockoutRounds, setKnockoutRounds] = useState<TournamentRound[]>([])
  const [r16Teams, setR16Teams] = useState<string[]>([])
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [activeMatches, setActiveMatches] = useState<MatchResult[]>([])
  const [speedMode, setSpeedMode] = useState<'normal' | 'fast' | 'skip'>(state.speedMode)
  const [eliminatedAt, setEliminatedAt] = useState<string>('')
  const [isSimulating, setIsSimulating] = useState(false)
  const [leagueOutcome, setLeagueOutcome] = useState<CLLeagueOutcome | null>(null)
  const [pendingKnockout, setPendingKnockout] = useState<TournamentRound | null>(null)
  const knockoutEliminatedRef = useRef(false)
  const feedRef = useRef<HTMLDivElement>(null)

  const userRatings = state.teamRatings!

  useEffect(() => {
    const built = buildCLLeaguePhase(USER_TEAM, CHAMPIONS_LEAGUE_CLUBS)
    setLeaguePhase(built)
  }, [])

  const userPosition = leagueTable.findIndex(r => r.club === USER_TEAM) + 1

  const handleStartLeaguePhase = useCallback(() => {
    if (!leaguePhase) return
    setIsSimulating(true)

    setTimeout(() => {
      const { table, userResults } = simulateCLLeaguePhase(
        USER_TEAM,
        userRatings,
        leaguePhase,
        ALL_MODERN_SQUADS
      )
      const position = table.findIndex(r => r.club === USER_TEAM) + 1
      setLeagueTable(table)
      setUserLeagueResults(userResults)
      setLeagueOutcome(getCLLeagueOutcome(position))
      setActiveMatches(userResults)
      setCurrentMatchIndex(0)
      setIsSimulating(false)
      setCLPhase('league-playing')
    }, 0)
  }, [leaguePhase, userRatings])

  const handleMatchComplete = useCallback(() => {
    setCurrentMatchIndex(prev => {
      const next = prev + 1
      if (next >= activeMatches.length) {
        setCLPhase(p => {
          if (p === 'league-playing') return 'league-done'
          if (p === 'playoff-playing') {
            return knockoutEliminatedRef.current ? 'eliminated' : 'playoff-done'
          }
          if (p === 'r16-playing') {
            return knockoutEliminatedRef.current ? 'eliminated' : 'r16-done'
          }
          if (p === 'qf-playing') {
            return knockoutEliminatedRef.current ? 'eliminated' : 'qf-done'
          }
          if (p === 'sf-playing') {
            return knockoutEliminatedRef.current ? 'eliminated' : 'sf-done'
          }
          if (p === 'final-playing') {
            return knockoutEliminatedRef.current ? 'eliminated' : 'winner'
          }
          return p
        })
      }
      return next
    })
  }, [activeMatches.length])

  const prepareKnockoutRound = useCallback(
    (roundName: string, teams: string[], previewPhase: CLPhase) => {
      const pairings = buildKnockoutPairings(teams, roundName)
      setPendingKnockout(pairings)
      setCLPhase(previewPhase)
    },
    []
  )

  const startPendingKnockout = useCallback(
    (playingPhase: CLPhase) => {
      if (!pendingKnockout) return

      const { round, userEliminated } = simulateKnockoutRoundFromPairings(
        USER_TEAM,
        userRatings,
        pendingKnockout,
        ALL_MODERN_SQUADS
      )

      setKnockoutRounds(prev => [...prev, round])
      setPendingKnockout(null)

      const userMatch = round.fixtures.find(
        f => f.homeTeam === USER_TEAM || f.awayTeam === USER_TEAM
      )
      setActiveMatches(userMatch ? [userMatch] : [])
      setCurrentMatchIndex(0)
      knockoutEliminatedRef.current = userEliminated
      if (userEliminated) {
        setEliminatedAt(pendingKnockout.name)
      }
      setCLPhase(playingPhase)
    },
    [pendingKnockout, userRatings]
  )

  const handlePlayoff = useCallback(() => {
    const playoffTeams = getCLPlayoffTeams(leagueTable)
    prepareKnockoutRound('Knockout Playoff', playoffTeams, 'playoff-preview')
  }, [leagueTable, prepareKnockoutRound])

  const handleAdvanceFromPlayoff = useCallback(() => {
    const lastRound = knockoutRounds[knockoutRounds.length - 1]
    const playoffWinners = lastRound.fixtures.map(f =>
      f.homeScore > f.awayScore ? f.homeTeam :
      f.awayScore > f.homeScore ? f.awayTeam :
      Math.random() > 0.5 ? f.homeTeam : f.awayTeam
    )
    const teams = buildCLRoundOf16(leagueTable, playoffWinners)
    setR16Teams(teams)
    prepareKnockoutRound('Round of 16', teams, 'r16-preview')
  }, [knockoutRounds, leagueTable, prepareKnockoutRound])

  const handleAdvanceFromDirect = useCallback(() => {
    const playoffTeams = getCLPlayoffTeams(leagueTable)
    const { round, winners } = simulateAIKnockoutRound(
      playoffTeams,
      'Knockout Playoff',
      ALL_MODERN_SQUADS
    )
    setKnockoutRounds(prev => [...prev, round])
    const teams = buildCLRoundOf16(leagueTable, winners)
    setR16Teams(teams)
    prepareKnockoutRound('Round of 16', teams, 'r16-preview')
  }, [leagueTable, prepareKnockoutRound])

  const handleAdvanceFromR16 = useCallback(() => {
    const lastRound = knockoutRounds[knockoutRounds.length - 1]
    const winners = lastRound.fixtures.map(f =>
      f.homeScore > f.awayScore ? f.homeTeam :
      f.awayScore > f.homeScore ? f.awayTeam :
      Math.random() > 0.5 ? f.homeTeam : f.awayTeam
    )
    prepareKnockoutRound('Quarter-Final', winners, 'qf-preview')
  }, [knockoutRounds, prepareKnockoutRound])

  const handleAdvanceFromQF = useCallback(() => {
    const lastRound = knockoutRounds[knockoutRounds.length - 1]
    const winners = lastRound.fixtures.map(f =>
      f.homeScore > f.awayScore ? f.homeTeam :
      f.awayScore > f.homeScore ? f.awayTeam :
      Math.random() > 0.5 ? f.homeTeam : f.awayTeam
    )
    prepareKnockoutRound('Semi-Final', winners, 'sf-preview')
  }, [knockoutRounds, prepareKnockoutRound])

  const handleAdvanceFromSF = useCallback(() => {
    const lastRound = knockoutRounds[knockoutRounds.length - 1]
    const winners = lastRound.fixtures.map(f =>
      f.homeScore > f.awayScore ? f.homeTeam :
      f.awayScore > f.homeScore ? f.awayTeam :
      Math.random() > 0.5 ? f.homeTeam : f.awayTeam
    )
    prepareKnockoutRound('Final', winners, 'final-preview')
  }, [knockoutRounds, prepareKnockoutRound])

  const completedMatches = activeMatches.slice(0, currentMatchIndex).reverse()

  useEffect(() => {
    if (clPhase === 'league-playing') {
      feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentMatchIndex, clPhase])

  const playerOfTournament = state.draftSlots
    .filter(s => s.player)
    .sort((a, b) => (b.player?.overall ?? 0) - (a.player?.overall ?? 0))[0]?.player

  const userRow = leagueTable.find(r => r.club === USER_TEAM)
  const userRecord = userLeagueResults.reduce(
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

  const shareCardProps = {
    leaguePhasePosition: userPosition || leagueTable.findIndex(r => r.club === USER_TEAM) + 1,
    leaguePhaseSize: CL_LEAGUE_PHASE_SIZE,
    points: userRow?.points ?? 0,
    won: userRecord.won,
    drawn: userRecord.drawn,
    lost: userRecord.lost,
    goalDifference: userRow?.goalDifference ?? 0,
    playerOfTournament: playerOfTournament?.name ?? '—',
    playerOfTournamentOvr: playerOfTournament?.overall ?? 0,
    formation: state.formation,
    teamRatings: state.teamRatings ?? undefined,
    squad: getShareSquadFromSlots(state.draftSlots),
  }

  const SpeedControls = ({ inline = false }: { inline?: boolean }) => (
    <div className={`flex gap-2 flex-wrap ${inline ? '' : 'absolute top-4 right-4 z-10'}`}>
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
    </div>
  )

  if (clPhase === 'preview' && !leaguePhase) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <p className="text-white/40 text-sm uppercase tracking-widest animate-pulse">
          Preparing league phase draw...
        </p>
      </div>
    )
  }

  if (clPhase === 'preview' && leaguePhase) {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <QuitButton onQuit={onExit} className="absolute top-6 left-6" />
        <div className="text-center mb-8">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
            UEFA Champions League
          </p>
          <h2 className="text-white font-black text-4xl uppercase tracking-tight">
            League Phase Draw
          </h2>
          <p className="text-white/40 text-sm mt-2">
            {CL_LEAGUE_PHASE_SIZE} clubs · 8 matches · Top 8 auto-qualify
          </p>
        </div>

        <CLLeagueDraw
          leaguePhase={leaguePhase}
          userTeam={USER_TEAM}
          participantCount={CL_LEAGUE_PHASE_SIZE}
        />

        <div className="flex flex-col gap-3 w-full max-w-xs mb-6 mt-8">
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
          onClick={handleStartLeaguePhase}
          disabled={isSimulating}
          className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40"
        >
          {isSimulating ? 'Drawing Fixtures...' : 'Play League Phase'}
        </button>
      </div>
    )
  }

  if (clPhase === 'league-playing') {
    const progress = (currentMatchIndex / Math.max(1, activeMatches.length)) * 100

    return (
      <div className="min-h-screen bg-[#0a0a12] flex flex-col">
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-3">
              <QuitButton onQuit={onExit} />
              <div className="text-center">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  League Phase
                </p>
                <h2 className="text-white font-black text-lg uppercase tracking-tight">
                  Matchday
                </h2>
              </div>
              <p className="text-white/40 text-xs tabular-nums">
                {currentMatchIndex} / {activeMatches.length}
              </p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1 mb-4">
              <div
                className="bg-emerald-400 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <SpeedControls inline />
          </div>
        </div>

        <div ref={feedRef} className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-lg mx-auto flex flex-col gap-2">
            {activeMatches[currentMatchIndex] && (
              <MatchAnimation
                key={currentMatchIndex}
                result={activeMatches[currentMatchIndex]}
                speedMode={speedMode}
                onComplete={handleMatchComplete}
                matchNumber={currentMatchIndex + 1}
                totalMatches={activeMatches.length}
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
          </div>
        </div>
      </div>
    )
  }

  const knockoutPreviewConfig: Partial<
    Record<CLPhase, { playing: CLPhase; label: string }>
  > = {
    'playoff-preview': { playing: 'playoff-playing', label: 'Play Knockout Playoff' },
    'r16-preview': { playing: 'r16-playing', label: 'Play Round of 16' },
    'qf-preview': { playing: 'qf-playing', label: 'Play Quarter-Final' },
    'sf-preview': { playing: 'sf-playing', label: 'Play Semi-Final' },
    'final-preview': { playing: 'final-playing', label: 'Play Final' },
  }

  const knockoutPreview = knockoutPreviewConfig[clPhase]
  if (knockoutPreview && pendingKnockout) {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <QuitButton onQuit={onExit} className="absolute top-6 left-6" />
        <div className="text-center mb-8">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
            UEFA Champions League
          </p>
          <h2 className="text-white font-black text-4xl uppercase tracking-tight">
            {pendingKnockout.name}
          </h2>
          <p className="text-white/40 text-sm mt-2">
            Your knockout tie — full bracket revealed after the match
          </p>
        </div>

        <KnockoutDrawPreview round={pendingKnockout} userTeam={USER_TEAM} />

        <div className="flex flex-col gap-3 w-full max-w-xs mt-8">
          <SpeedControls inline />
          <button
            onClick={() => startPendingKnockout(knockoutPreview.playing)}
            className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
          >
            {knockoutPreview.label} →
          </button>
        </div>
      </div>
    )
  }

  if (
    (clPhase === 'playoff-playing' ||
      clPhase === 'r16-playing' ||
      clPhase === 'qf-playing' ||
      clPhase === 'sf-playing' ||
      clPhase === 'final-playing') &&
    activeMatches[currentMatchIndex]
  ) {
    return (
      <div className="relative">
        <QuitButton onQuit={onExit} className="absolute top-4 left-4 z-20" />
        <SpeedControls />
        <MatchAnimation
          result={activeMatches[currentMatchIndex]}
          speedMode={speedMode}
          onComplete={handleMatchComplete}
          matchNumber={currentMatchIndex + 1}
          totalMatches={activeMatches.length}
          userTeam={USER_TEAM}
        />
      </div>
    )
  }

  if (clPhase === 'league-done') {
    const outcome = leagueOutcome ?? getCLLeagueOutcome(userPosition)

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              League Phase Complete
            </p>
            <h2
              className={`font-black text-4xl uppercase tracking-tight ${
                outcome === 'eliminated'
                  ? 'text-red-400'
                  : outcome === 'direct'
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`}
            >
              {outcome === 'direct'
                ? 'Top 8 — Auto Qualified!'
                : outcome === 'playoff'
                ? 'Knockout Playoff Awaits'
                : 'Eliminated'}
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Finished {userPosition}{getPositionSuffix(userPosition)} of {CL_LEAGUE_PHASE_SIZE}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 overflow-x-auto">
            <LeagueTable table={leagueTable} userTeam={USER_TEAM} title="League Phase Table" />
          </div>

          <div className="grid grid-cols-3 gap-2 mb-8 text-center text-[10px] uppercase tracking-widest">
            <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-lg p-3">
              <p className="text-emerald-400 font-bold">1st–8th</p>
              <p className="text-white/40 mt-1">Round of 16</p>
            </div>
            <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-3">
              <p className="text-amber-400 font-bold">9th–24th</p>
              <p className="text-white/40 mt-1">Playoff</p>
            </div>
            <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3">
              <p className="text-red-400 font-bold">25th+</p>
              <p className="text-white/40 mt-1">Out</p>
            </div>
          </div>

          {outcome === 'direct' && (
            <button
              onClick={handleAdvanceFromDirect}
              className="w-full px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
            >
              Round of 16 →
            </button>
          )}
          {outcome === 'playoff' && (
            <button
              onClick={handlePlayoff}
              className="w-full px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
            >
              Play Knockout Playoff →
            </button>
          )}
          {outcome === 'eliminated' && (
            <>
              <CLShareCard
                {...shareCardProps}
                result="eliminated"
                eliminatedAt="League Phase"
              />
              <button
                onClick={() =>
                  onUpdate({
                    phase: 'mode-select',
                    mode: null,
                    formation: null,
                    draftSlots: [],
                    teamRatings: null,
                  })
                }
                className="w-full px-10 py-4 bg-white/10 text-white font-black text-base uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
              >
                Start New Draft
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  if (clPhase === 'playoff-done') {
    const playoffRound = knockoutRounds[knockoutRounds.length - 1]

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Knockout Playoff Complete
            </p>
            <h2 className="text-emerald-400 font-black text-4xl uppercase tracking-tight">
              You&apos;re Through!
            </h2>
          </div>
          {playoffRound && (
            <div className="mb-8">
              <KnockoutBracket rounds={[playoffRound]} userTeam={USER_TEAM} />
            </div>
          )}
          <button
            onClick={handleAdvanceFromPlayoff}
            className="w-full px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
          >
            Round of 16 →
          </button>
        </div>
      </div>
    )
  }

  if (clPhase === 'r16-done' || clPhase === 'qf-done' || clPhase === 'sf-done') {
    const roundIndex =
      clPhase === 'r16-done' ? knockoutRounds.length - 1 :
      clPhase === 'qf-done' ? knockoutRounds.length - 1 :
      knockoutRounds.length - 1
    const currentRound = knockoutRounds[roundIndex]
    const nextLabel =
      clPhase === 'r16-done' ? 'Quarter-Finals' :
      clPhase === 'qf-done' ? 'Semi-Finals' : 'The Final'
    const handleNext =
      clPhase === 'r16-done' ? handleAdvanceFromR16 :
      clPhase === 'qf-done' ? handleAdvanceFromQF : handleAdvanceFromSF

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              {currentRound?.name} Complete
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              You&apos;re Through
            </h2>
          </div>
          {currentRound && (
            <div className="mb-8">
              <KnockoutBracket rounds={[currentRound]} userTeam={USER_TEAM} />
            </div>
          )}
          <button
            onClick={handleNext}
            className="w-full px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
          >
            {nextLabel} →
          </button>
        </div>
      </div>
    )
  }

  if (clPhase === 'winner') {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-6xl mb-4">🏆</p>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
            Champions of Europe
          </p>
          <h2 className="text-white font-black text-5xl uppercase tracking-tight">
            You Won!
          </h2>
          <p className="text-white/40 text-sm mt-3">
            Champions League Winner
          </p>
        </div>

        <div className="w-full max-w-lg mb-8">
          <KnockoutBracket rounds={knockoutRounds} userTeam={USER_TEAM} />
        </div>

        <CLShareCard {...shareCardProps} result="winner" />

        <button
          onClick={() =>
            onUpdate({
              phase: 'mode-select',
              mode: null,
              formation: null,
              draftSlots: [],
              teamRatings: null,
            })
          }
          className="w-full max-w-xs py-4 bg-white text-black font-black text-base uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all"
        >
          New Draft
        </button>
      </div>
    )
  }

  if (clPhase === 'eliminated') {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-5xl mb-4">❌</p>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
            Eliminated
          </p>
          <h2 className="text-red-400 font-black text-4xl uppercase tracking-tight">
            {eliminatedAt}
          </h2>
          <p className="text-white/40 text-sm mt-3">
            Better luck next time
          </p>
        </div>

        {knockoutRounds.length > 0 && (
          <div className="w-full max-w-lg mb-8">
            <KnockoutBracket rounds={knockoutRounds} userTeam={USER_TEAM} />
          </div>
        )}

        <CLShareCard
          {...shareCardProps}
          result="eliminated"
          eliminatedAt={eliminatedAt}
        />

        <button
          onClick={() =>
            onUpdate({
              phase: 'mode-select',
              mode: null,
              formation: null,
              draftSlots: [],
              teamRatings: null,
            })
          }
          className="px-10 py-4 bg-white/10 text-white font-black text-base uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
        >
          Start New Draft
        </button>
      </div>
    )
  }

  return null
}

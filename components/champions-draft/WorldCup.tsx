'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import type {
  GameState,
  MatchResult,
  WorldCupGroup,
  TournamentRound,
} from '@/types/champions-draft'
import { WORLD_CUP_NATIONS } from '@/lib/champions-draft/data'
import {
  buildWorldCupGroups,
  simulateWorldCupGroups,
  getWCKnockoutTeams,
  buildKnockoutPairings,
  simulateKnockoutRoundFromPairings,
  getWCTopScorer,
} from '@/lib/champions-draft/matchEngine'
import MatchAnimation from './MatchAnimation'
import WCGroupStage from './WCGroupStage'
import KnockoutBracket from './KnockoutBracket'
import KnockoutDrawPreview from './KnockoutDrawPreview'
import WCShareCard from './WCShareCard'
import QuitButton from './QuitButton'
import { getShareSquadFromSlots } from './shareHelpers'

interface Props {
  state: GameState
  onUpdate: (updates: Partial<GameState>) => void
  onExit: () => void
}

const USER_TEAM = 'My XI'

type WCPhase =
  | 'preview'
  | 'groups-playing'
  | 'groups-done'
  | 'r32-preview'
  | 'r32-playing'
  | 'r32-done'
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

export default function WorldCup({ state, onUpdate, onExit }: Props) {
  const [wcPhase, setWCPhase] = useState<WCPhase>('preview')
  const [groups, setGroups] = useState<WorldCupGroup[]>([])
  const [knockoutRounds, setKnockoutRounds] = useState<TournamentRound[]>([])
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [activeMatches, setActiveMatches] = useState<MatchResult[]>([])
  const [speedMode, setSpeedMode] = useState<'normal' | 'fast' | 'skip'>(
    state.speedMode
  )
  const [eliminatedAt, setEliminatedAt] = useState('')
  const [allGroupResults, setAllGroupResults] = useState<MatchResult[]>([])
  const [pendingKnockout, setPendingKnockout] = useState<TournamentRound | null>(
    null
  )
  const [isSimulating, setIsSimulating] = useState(false)
  const knockoutEliminatedRef = useRef(false)

  const userRatings = state.teamRatings!
  const selectedNation = state.selectedNation ?? 'Unknown'

  const draftedAttackers = state.draftSlots
    .filter(s =>
      s.player &&
      ['ST', 'CF', 'LW', 'RW', 'LM', 'RM'].includes(s.player.position)
    )
    .map(s => s.player!.name)

  const playerOfTournament = state.draftSlots
    .filter(s => s.player)
    .sort((a, b) => (b.player?.overall ?? 0) - (a.player?.overall ?? 0))[0]
    ?.player

  useEffect(() => {
    const builtGroups = buildWorldCupGroups(USER_TEAM, WORLD_CUP_NATIONS)
    setGroups(builtGroups)
  }, [])

  const handleStartGroups = useCallback(() => {
    setIsSimulating(true)
    setTimeout(() => {
      const simulated = simulateWorldCupGroups(
        USER_TEAM,
        userRatings,
        groups,
        WORLD_CUP_NATIONS
      )
      setGroups(simulated)
      const allResults = simulated.flatMap(g => g.fixtures)
      setAllGroupResults(allResults)
      const userMatches = simulated.flatMap(g =>
        g.fixtures.filter(
          f => f.homeTeam === USER_TEAM || f.awayTeam === USER_TEAM
        )
      )
      setActiveMatches(userMatches)
      setCurrentMatchIndex(0)
      setIsSimulating(false)
      setWCPhase('groups-playing')
    }, 0)
  }, [groups, userRatings])

  const handleMatchComplete = useCallback(() => {
    setCurrentMatchIndex(prev => {
      const next = prev + 1
      if (next >= activeMatches.length) {
        setWCPhase(p => {
          if (p === 'groups-playing') return 'groups-done'
          if (p === 'r32-playing') {
            return knockoutEliminatedRef.current ? 'eliminated' : 'r32-done'
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
    (roundName: string, teams: string[], previewPhase: WCPhase) => {
      const pairings = buildKnockoutPairings(teams, roundName)
      setPendingKnockout(pairings)
      setWCPhase(previewPhase)
    },
    []
  )

  const startPendingKnockout = useCallback(
    (playingPhase: WCPhase) => {
      if (!pendingKnockout) return

      const { round, userEliminated } = simulateKnockoutRoundFromPairings(
        USER_TEAM,
        userRatings,
        pendingKnockout,
        WORLD_CUP_NATIONS,
        true
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
      setWCPhase(playingPhase)
    },
    [pendingKnockout, userRatings]
  )

  const handleAdvanceFromGroups = useCallback(() => {
    const qualifiers = getWCKnockoutTeams(groups)
    prepareKnockoutRound('Round of 16', qualifiers, 'r32-preview')
  }, [groups, prepareKnockoutRound])

  const getWinnersFromLastRound = useCallback(() => {
    const lastRound = knockoutRounds[knockoutRounds.length - 1]
    return lastRound.fixtures.map(f =>
      f.homeScore > f.awayScore
        ? f.homeTeam
        : f.awayScore > f.homeScore
        ? f.awayTeam
        : Math.random() > 0.5
        ? f.homeTeam
        : f.awayTeam
    )
  }, [knockoutRounds])

  const handleAdvanceFromR32 = useCallback(() => {
    prepareKnockoutRound(
      'Quarter-Final',
      getWinnersFromLastRound(),
      'qf-preview'
    )
  }, [prepareKnockoutRound, getWinnersFromLastRound])

  const handleAdvanceFromQF = useCallback(() => {
    prepareKnockoutRound('Semi-Final', getWinnersFromLastRound(), 'sf-preview')
  }, [prepareKnockoutRound, getWinnersFromLastRound])

  const handleAdvanceFromSF = useCallback(() => {
    prepareKnockoutRound('Final', getWinnersFromLastRound(), 'final-preview')
  }, [prepareKnockoutRound, getWinnersFromLastRound])

  const topScorer = getWCTopScorer(USER_TEAM, draftedAttackers, allGroupResults)

  const shareCardProps = {
    selectedNation,
    wcDraftMode: state.wcDraftMode,
    topScorer: topScorer.playerName,
    topScorerGoals: topScorer.goals,
    playerOfTournament: playerOfTournament?.name ?? '—',
    playerOfTournamentOvr: playerOfTournament?.overall ?? 0,
    formation: state.formation,
    teamRatings: state.teamRatings ?? undefined,
    squad: getShareSquadFromSlots(state.draftSlots),
  }

  const SpeedControls = () => (
    <div className="absolute top-4 right-4 flex gap-2 z-10">
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

  if (wcPhase === 'preview') {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] px-4 py-12">
        <QuitButton onQuit={onExit} className="absolute top-6 left-6 z-10" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              FIFA World Cup · {selectedNation}
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Group Stage Draw
            </h2>
            <p className="text-white/40 text-sm mt-2">
              8 groups · Top 2 qualify · Round of 16 onwards
            </p>
          </div>

          {groups.length > 0 && (
            <div className="mb-8">
              <WCGroupStage groups={groups} userTeam={USER_TEAM} preview />
            </div>
          )}

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-6">
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

          <div className="text-center">
            <button
              onClick={handleStartGroups}
              disabled={groups.length === 0 || isSimulating}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40"
            >
              {isSimulating ? 'Simulating...' : 'Play Group Stage'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const knockoutPreviewConfig: Partial<
    Record<WCPhase, { playing: WCPhase; label: string }>
  > = {
    'r32-preview': { playing: 'r32-playing', label: 'Play Round of 16' },
    'qf-preview': { playing: 'qf-playing', label: 'Play Quarter-Final' },
    'sf-preview': { playing: 'sf-playing', label: 'Play Semi-Final' },
    'final-preview': { playing: 'final-playing', label: 'Play Final' },
  }

  const knockoutPreview = knockoutPreviewConfig[wcPhase]
  if (knockoutPreview && pendingKnockout) {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <QuitButton onQuit={onExit} className="absolute top-6 left-6" />
        <div className="text-center mb-8">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
            FIFA World Cup · {selectedNation}
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
    (wcPhase === 'groups-playing' ||
      wcPhase === 'r32-playing' ||
      wcPhase === 'qf-playing' ||
      wcPhase === 'sf-playing' ||
      wcPhase === 'final-playing') &&
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
        />
      </div>
    )
  }

  if (wcPhase === 'groups-done') {
    const userGroup = groups.find(g => g.teams.includes(USER_TEAM))
    const userPosition =
      userGroup
        ? userGroup.table.findIndex(r => r.club === USER_TEAM) + 1
        : 0
    const qualified = userPosition <= 2

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Group Stage Complete
            </p>
            <h2
              className={`font-black text-4xl uppercase tracking-tight ${
                qualified ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {qualified ? 'You Qualified!' : 'Eliminated'}
            </h2>
            <p className="text-white/40 text-sm mt-2">
              {qualified
                ? `Finished ${userPosition === 1 ? '1st' : '2nd'} in Group ${userGroup?.name}`
                : `Finished ${userPosition}${userPosition === 3 ? 'rd' : 'th'} in Group ${userGroup?.name}`}
            </p>
          </div>

          <div className="mb-8">
            <WCGroupStage groups={groups} userTeam={USER_TEAM} />
          </div>

          <div className="flex flex-col items-center">
            {!qualified && (
              <WCShareCard
                {...shareCardProps}
                result="eliminated"
                groupFinish={`${userPosition}${userPosition === 3 ? 'rd' : 'th'} in Group ${userGroup?.name}`}
              />
            )}
            {qualified ? (
              <button
                onClick={handleAdvanceFromGroups}
                className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
              >
                Round of 16 →
              </button>
            ) : (
              <button
                onClick={() =>
                  onUpdate({
                    phase: 'mode-select',
                    mode: null,
                    formation: null,
                    draftSlots: [],
                    teamRatings: null,
                    selectedNation: null,
                    wcDraftMode: null,
                  })
                }
                className="px-10 py-4 bg-white/10 text-white font-black text-base uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
              >
                Start New Draft
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (
    wcPhase === 'r32-done' ||
    wcPhase === 'qf-done' ||
    wcPhase === 'sf-done'
  ) {
    const roundIndex =
      wcPhase === 'r32-done' ? 0 : wcPhase === 'qf-done' ? 1 : 2
    const currentRound = knockoutRounds[roundIndex]
    const nextLabel =
      wcPhase === 'r32-done'
        ? 'Quarter-Finals'
        : wcPhase === 'qf-done'
        ? 'Semi-Finals'
        : 'The Final'
    const handleNext =
      wcPhase === 'r32-done'
        ? handleAdvanceFromR32
        : wcPhase === 'qf-done'
        ? handleAdvanceFromQF
        : handleAdvanceFromSF

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
              <KnockoutBracket
                rounds={[currentRound]}
                userTeam={USER_TEAM}
              />
            </div>
          )}

          <div className="text-center">
            <button
              onClick={handleNext}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
            >
              {nextLabel} →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (wcPhase === 'winner') {
    const finalRound = knockoutRounds[knockoutRounds.length - 1]

    return (
      <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-7xl mb-4">🏆</p>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
            World Cup Winners · {selectedNation}
          </p>
          <h2 className="text-white font-black text-5xl uppercase tracking-tight">
            Champions!
          </h2>
          <p className="text-white/40 text-sm mt-3">
            Your XI conquered the world
          </p>
        </div>

        <div className="w-full max-w-lg mb-8">
          <KnockoutBracket rounds={knockoutRounds} userTeam={USER_TEAM} />
        </div>

        <WCShareCard {...shareCardProps} result="winner" />

        <div className="flex flex-col gap-3 w-full max-w-xs mt-6">
          <button
            onClick={() =>
              onUpdate({
                phase: 'playing',
                mode: 'champions-league',
                selectedNation: null,
                wcDraftMode: null,
              })
            }
            className="w-full py-4 bg-white/10 text-white font-black text-base uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
          >
            Play Champions League →
          </button>
          <button
            onClick={() =>
              onUpdate({
                phase: 'mode-select',
                mode: null,
                formation: null,
                draftSlots: [],
                teamRatings: null,
                selectedNation: null,
                wcDraftMode: null,
              })
            }
            className="w-full py-3 text-white/30 font-bold text-sm uppercase tracking-widest hover:text-white/60 transition-colors"
          >
            Start New Draft
          </button>
        </div>
      </div>
    )
  }

  if (wcPhase === 'eliminated') {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10">
          <p className="text-5xl mb-4">❌</p>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
            Eliminated · {selectedNation}
          </p>
          <h2 className="text-red-400 font-black text-4xl uppercase tracking-tight">
            {eliminatedAt}
          </h2>
          <p className="text-white/40 text-sm mt-3">
            So close. Try again.
          </p>
        </div>

        {knockoutRounds.length > 0 && (
          <div className="w-full max-w-lg mb-8">
            <KnockoutBracket
              rounds={knockoutRounds}
              userTeam={USER_TEAM}
            />
          </div>
        )}

        <WCShareCard
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
              selectedNation: null,
              wcDraftMode: null,
            })
          }
          className="w-full max-w-xs mt-6 py-4 bg-white/10 text-white font-black text-base uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all"
        >
          Start New Draft
        </button>
      </div>
    )
  }

  return null
}

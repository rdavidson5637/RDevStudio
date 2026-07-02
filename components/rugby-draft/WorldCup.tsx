'use client'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import type {
  GameState,
  MatchResult,
  RugbyGroup,
  TournamentRound,
  TeamRatings,
  Squad,
} from '@/types/rugby-draft'
import { getDraftPool, findSquadByClub } from '@/lib/rugby-draft/data'
import {
  buildLeagueTable,
  updateTableWithResult,
  sortTable,
} from '@/lib/rugby-draft/utils'
import {
  simulateFullMatch,
  simulateKnockoutFullMatch,
  generateOpponentVsOpponentResult,
  generateKnockoutOpponentResult,
  getSquadRatings,
  getTopTryScorer,
} from '@/lib/rugby-draft/matchEngine'
import MatchAnimation, { CompletedMatchCard } from './MatchAnimation'
import LeagueTable from './LeagueTable'
import KnockoutBracket from './KnockoutBracket'
import QuitButton from './QuitButton'
import QuitConfirmModal from './QuitConfirmModal'
import SpeedControls from './SpeedControls'
import ResultsScreen from './ResultsScreen'
import ShareCard from './ShareCard'
import {
  getKnockoutUserAwards,
  getPlayerOfTournament,
  getPoolWinnerAward,
  getTryScorerCandidates,
} from './shareHelpers'

interface Props {
  state: GameState
  onUpdate: (updates: Partial<GameState>) => void
  onExit: () => void
}

const WORLD_CUP_NATIONS = [
  'New Zealand',
  'Ireland',
  'South Africa',
  'France',
  'England',
  'Australia',
  'Argentina',
  'Wales',
  'Scotland',
  'Italy',
  'Fiji',
  'Samoa',
  'Tonga',
  'Japan',
  'Georgia',
  'Uruguay',
  'Namibia',
  'Portugal',
  'Chile',
  'United States',
]

type WCPhase =
  | 'pool-draw'
  | 'pool-stage'
  | 'quarter-final-draw'
  | 'knockouts'
  | 'results'

type KnockoutRoundKey = 'quarter-final' | 'semi-final' | 'final'

interface PoolFixture {
  pool: string
  home: string
  away: string
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildWorldCupPools(userNation: string): RugbyGroup[] {
  const others = shuffleArray(
    WORLD_CUP_NATIONS.filter(n => n !== userNation)
  )
  const poolA = [userNation, ...others.slice(0, 4)]
  const remaining = others.slice(4)
  const poolB = remaining.slice(0, 5)
  const poolC = remaining.slice(5, 10)
  const poolD = remaining.slice(10, 15)

  return [
    { name: 'A', teams: poolA, table: buildLeagueTable(poolA), fixtures: [] },
    { name: 'B', teams: poolB, table: buildLeagueTable(poolB), fixtures: [] },
    { name: 'C', teams: poolC, table: buildLeagueTable(poolC), fixtures: [] },
    { name: 'D', teams: poolD, table: buildLeagueTable(poolD), fixtures: [] },
  ]
}

function generatePoolFixtures(groups: RugbyGroup[]): PoolFixture[] {
  const fixtures: PoolFixture[] = []
  for (const group of groups) {
    for (let i = 0; i < group.teams.length; i++) {
      for (let j = i + 1; j < group.teams.length; j++) {
        fixtures.push({
          pool: group.name,
          home: group.teams[i],
          away: group.teams[j],
        })
      }
    }
  }
  return fixtures
}

function getWorldCupSquads(): Squad[] {
  return getDraftPool('world-cup').filter(
    s => WORLD_CUP_NATIONS.includes(s.club) && s.season === '2024'
  )
}

function getTeamRatings(
  team: string,
  userNation: string,
  userRatings: TeamRatings,
  squads: Squad[]
): TeamRatings {
  if (team === userNation) return userRatings
  const squad = findSquadByClub(squads, team, { season: '2024' })
  return squad
    ? getSquadRatings(squad)
    : { forwards: 80, backs: 80, overall: 80 }
}

function simulatePoolMatch(
  fixture: PoolFixture,
  userNation: string,
  userRatings: TeamRatings,
  squads: Squad[]
): MatchResult {
  const { home, away } = fixture
  if (home === userNation || away === userNation) {
    const isHome = home === userNation
    const opponent = isHome ? away : home
    const oppRatings = getTeamRatings(opponent, userNation, userRatings, squads)
    return simulateFullMatch(
      userRatings,
      oppRatings,
      userNation,
      opponent,
      isHome
    )
  }
  return generateOpponentVsOpponentResult(home, away, squads)
}

function simulateKnockoutMatch(
  home: string,
  away: string,
  userNation: string,
  userRatings: TeamRatings,
  squads: Squad[],
  neutralVenue: boolean
): MatchResult {
  if (home === userNation || away === userNation) {
    const isHome = home === userNation
    const opponent = isHome ? away : home
    const oppRatings = getTeamRatings(opponent, userNation, userRatings, squads)
    return simulateKnockoutFullMatch(
      userRatings,
      oppRatings,
      userNation,
      opponent,
      isHome,
      neutralVenue
    )
  }
  return generateKnockoutOpponentResult(home, away, squads, neutralVenue)
}

function updateGroupsWithResult(
  groups: RugbyGroup[],
  pool: string,
  result: MatchResult
): RugbyGroup[] {
  return groups.map(g => {
    if (g.name !== pool) return g
    return {
      ...g,
      table: sortTable(updateTableWithResult(g.table, result)),
      fixtures: [...g.fixtures, result],
    }
  })
}

function isPoolComplete(group: RugbyGroup): boolean {
  const expected = (group.teams.length * (group.teams.length - 1)) / 2
  return group.fixtures.length >= expected
}

function getUserPoolPosition(groups: RugbyGroup[], userNation: string): number {
  const userPool = groups.find(g => g.teams.includes(userNation))
  if (!userPool) return 0
  const sorted = sortTable(userPool.table)
  return sorted.findIndex(r => r.club === userNation) + 1
}

function buildQuarterFinalDraw(groups: RugbyGroup[]): TournamentRound {
  const poolFinishers: Record<string, { first: string; second: string }> = {}
  for (const group of groups) {
    const sorted = sortTable(group.table)
    poolFinishers[group.name] = {
      first: sorted[0].club,
      second: sorted[1].club,
    }
  }

  return {
    name: 'Quarter-Final',
    fixtures: [
      {
        homeTeam: poolFinishers.A.first,
        awayTeam: poolFinishers.B.second,
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinishers.B.first,
        awayTeam: poolFinishers.A.second,
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinishers.C.first,
        awayTeam: poolFinishers.D.second,
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinishers.D.first,
        awayTeam: poolFinishers.C.second,
        homeScore: 0,
        awayScore: 0,
      },
    ],
  }
}

function buildSemiFinalDraw(qfRound: TournamentRound): TournamentRound {
  const winners = qfRound.fixtures.map(f =>
    f.homeScore > f.awayScore ? f.homeTeam : f.awayTeam
  )
  return {
    name: 'Semi-Final',
    fixtures: [
      {
        homeTeam: winners[0],
        awayTeam: winners[1],
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: winners[2],
        awayTeam: winners[3],
        homeScore: 0,
        awayScore: 0,
      },
    ],
  }
}

function buildFinalDraw(sfRound: TournamentRound): TournamentRound {
  const winners = sfRound.fixtures.map(f =>
    f.homeScore > f.awayScore ? f.homeTeam : f.awayTeam
  )
  return {
    name: 'Final',
    fixtures: [
      {
        homeTeam: winners[0],
        awayTeam: winners[1],
        homeScore: 0,
        awayScore: 0,
      },
    ],
  }
}

function getMatchWinner(result: MatchResult): string {
  return result.homeScore > result.awayScore
    ? result.homeTeam
    : result.awayTeam
}

function fastSimulateKnockoutRound(
  round: TournamentRound,
  fromIndex: number,
  userNation: string,
  userRatings: TeamRatings,
  squads: Squad[],
  neutralVenue: boolean
): TournamentRound {
  const fixtures: MatchResult[] = []

  for (let i = 0; i < round.fixtures.length; i++) {
    if (i < fromIndex) {
      fixtures.push(round.fixtures[i])
      continue
    }
    const pairing = round.fixtures[i]
    fixtures.push(
      simulateKnockoutMatch(
        pairing.homeTeam,
        pairing.awayTeam,
        userNation,
        userRatings,
        squads,
        neutralVenue
      )
    )
  }

  return { name: round.name, fixtures }
}

function fastSimulateEntireKnockouts(
  qfDraw: TournamentRound,
  userNation: string,
  userRatings: TeamRatings,
  squads: Squad[]
): { rounds: TournamentRound[]; winner: string } {
  const qf = fastSimulateKnockoutRound(
    qfDraw,
    0,
    userNation,
    userRatings,
    squads,
    false
  )
  const sf = buildSemiFinalDraw(qf)
  const sfSim = fastSimulateKnockoutRound(
    sf,
    0,
    userNation,
    userRatings,
    squads,
    true
  )
  const final = buildFinalDraw(sfSim)
  const finalSim = fastSimulateKnockoutRound(
    final,
    0,
    userNation,
    userRatings,
    squads,
    true
  )
  return {
    rounds: [qf, sfSim, finalSim],
    winner: getMatchWinner(finalSim.fixtures[0]),
  }
}

function getUserProgressSummary(
  userNation: string,
  winner: string,
  eliminatedAt: string | null
): string {
  if (winner === userNation) return 'You won the World Cup'
  if (eliminatedAt === 'Pool Stage') {
    return 'You were eliminated in the Pool Stage'
  }
  if (eliminatedAt === 'Quarter-Final') {
    return 'You reached the Quarter-Finals'
  }
  if (eliminatedAt === 'Semi-Final') {
    return 'You reached the Semi-Finals'
  }
  if (eliminatedAt === 'Final') {
    return 'You reached the Final'
  }
  return 'Tournament complete'
}

const KNOCKOUT_ROUND_NAMES: Record<KnockoutRoundKey, string> = {
  'quarter-final': 'Quarter-Final',
  'semi-final': 'Semi-Final',
  final: 'Final',
}

export default function WorldCup({ state, onUpdate, onExit }: Props) {
  const [phase, setPhase] = useState<WCPhase>('pool-draw')
  const [groups, setGroups] = useState<RugbyGroup[]>([])
  const [poolFixtures, setPoolFixtures] = useState<PoolFixture[]>([])
  const [poolMatchIndex, setPoolMatchIndex] = useState(0)
  const [poolResults, setPoolResults] = useState<MatchResult[]>([])
  const [pendingResult, setPendingResult] = useState<MatchResult | null>(null)
  const [quarterFinalDraw, setQuarterFinalDraw] = useState<TournamentRound | null>(
    null
  )
  const [knockoutRounds, setKnockoutRounds] = useState<TournamentRound[]>([])
  const [activeKnockoutRound, setActiveKnockoutRound] =
    useState<TournamentRound | null>(null)
  const [knockoutRoundKey, setKnockoutRoundKey] =
    useState<KnockoutRoundKey>('quarter-final')
  const [knockoutMatchIndex, setKnockoutMatchIndex] = useState(0)
  const [winner, setWinner] = useState<string>('')
  const [showShareCard, setShowShareCard] = useState(false)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)
  const speedMode = state.speedMode
  const [eliminatedAt, setEliminatedAt] = useState<string | null>(null)
  const [userPoolEliminated, setUserPoolEliminated] = useState(false)
  const userPoolEliminatedRef = useRef(false)

  const userNation = state.selectedNation ?? 'England'
  const userRatings = state.teamRatings!
  const nationSquads = useMemo(() => getWorldCupSquads(), [])

  const tryScorerCandidates = useMemo(
    () => getTryScorerCandidates(state.draftSlots),
    [state.draftSlots]
  )

  const userPool = groups.find(g => g.teams.includes(userNation))

  useEffect(() => {
    const built = buildWorldCupPools(userNation)
    setGroups(built)
    setPoolFixtures(generatePoolFixtures(built))
  }, [userNation])

  useEffect(() => {
    if (phase !== 'pool-stage' || poolMatchIndex >= poolFixtures.length) return
    const result = simulatePoolMatch(
      poolFixtures[poolMatchIndex],
      userNation,
      userRatings,
      nationSquads
    )
    setPendingResult(result)
  }, [
    phase,
    poolMatchIndex,
    poolFixtures,
    userNation,
    userRatings,
    nationSquads,
  ])

  useEffect(() => {
    if (phase !== 'knockouts' || !activeKnockoutRound) return
    if (knockoutMatchIndex >= activeKnockoutRound.fixtures.length) return

    const pairing = activeKnockoutRound.fixtures[knockoutMatchIndex]
    const neutral = knockoutRoundKey !== 'quarter-final'
    const result = simulateKnockoutMatch(
      pairing.homeTeam,
      pairing.awayTeam,
      userNation,
      userRatings,
      nationSquads,
      neutral
    )
    setPendingResult(result)
  }, [
    phase,
    activeKnockoutRound,
    knockoutMatchIndex,
    knockoutRoundKey,
    userNation,
    userRatings,
    nationSquads,
  ])

  const handleBeginPoolStage = useCallback(() => {
    setPoolMatchIndex(0)
    setPoolResults([])
    setPendingResult(null)
    setUserPoolEliminated(false)
    userPoolEliminatedRef.current = false
    setPhase('pool-stage')
  }, [])

  const handlePoolMatchComplete = useCallback(() => {
    if (!pendingResult) return

    const fixture = poolFixtures[poolMatchIndex]
    const result = pendingResult
    setPendingResult(null)

    const updatedGroups = updateGroupsWithResult(groups, fixture.pool, result)
    const newResults = [...poolResults, result]

    setGroups(updatedGroups)
    setPoolResults(newResults)

    const userGroup = updatedGroups.find(g => g.teams.includes(userNation))
    if (
      userGroup &&
      isPoolComplete(userGroup) &&
      !userPoolEliminatedRef.current
    ) {
      const position = getUserPoolPosition(updatedGroups, userNation)
      if (position > 2) {
        userPoolEliminatedRef.current = true
        setUserPoolEliminated(true)
        setEliminatedAt('Pool Stage')
      }
    }

    const nextIndex = poolMatchIndex + 1
    if (nextIndex >= poolFixtures.length) {
      if (userPoolEliminatedRef.current) {
        const qf = buildQuarterFinalDraw(updatedGroups)
        const { rounds, winner: tournamentWinner } = fastSimulateEntireKnockouts(
          qf,
          userNation,
          userRatings,
          nationSquads
        )
        setKnockoutRounds(rounds)
        setWinner(tournamentWinner)
        setPhase('results')
        onUpdate({
          groups: updatedGroups,
          fixtures: newResults,
          knockoutRounds: rounds,
        })
      } else {
        setQuarterFinalDraw(buildQuarterFinalDraw(updatedGroups))
        setPhase('quarter-final-draw')
        onUpdate({ groups: updatedGroups, fixtures: newResults })
      }
    } else {
      setPoolMatchIndex(nextIndex)
    }
  }, [
    pendingResult,
    poolFixtures,
    poolMatchIndex,
    poolResults,
    groups,
    userNation,
    userRatings,
    nationSquads,
    onUpdate,
  ])

  const finishTournament = useCallback(
    (rounds: TournamentRound[], finalWinner: string, exitStage: string | null) => {
      setKnockoutRounds(rounds)
      setWinner(finalWinner)
      if (exitStage) setEliminatedAt(exitStage)
      setPhase('results')
      onUpdate({ knockoutRounds: rounds, groups })
    },
    [groups, onUpdate]
  )

  const advanceKnockoutRound = useCallback(
    (
      completedRound: TournamentRound,
      existingRounds: TournamentRound[],
      nextKey: KnockoutRoundKey | null
    ) => {
      const rounds = [...existingRounds, completedRound]

      if (nextKey === 'semi-final') {
        const sf = buildSemiFinalDraw(completedRound)
        setKnockoutRounds(rounds)
        setActiveKnockoutRound(sf)
        setKnockoutRoundKey('semi-final')
        setKnockoutMatchIndex(0)
        setPendingResult(null)
        return
      }

      if (nextKey === 'final') {
        const finalRound = buildFinalDraw(completedRound)
        setKnockoutRounds(rounds)
        setActiveKnockoutRound(finalRound)
        setKnockoutRoundKey('final')
        setKnockoutMatchIndex(0)
        setPendingResult(null)
        return
      }

      const finalWinner = getMatchWinner(completedRound.fixtures[0])
      finishTournament(rounds, finalWinner, eliminatedAt)
    },
    [eliminatedAt, finishTournament]
  )

  const fastSimulateToEnd = useCallback(
    (
      currentRound: TournamentRound,
      fromMatchIndex: number,
      existingRounds: TournamentRound[],
      roundKey: KnockoutRoundKey
    ) => {
      const exitStage = KNOCKOUT_ROUND_NAMES[roundKey]
      setEliminatedAt(exitStage)

      const neutral = roundKey !== 'quarter-final'
      const completedRound = fastSimulateKnockoutRound(
        currentRound,
        fromMatchIndex,
        userNation,
        userRatings,
        nationSquads,
        neutral
      )
      const roundsSoFar = [...existingRounds, completedRound]

      if (roundKey === 'quarter-final') {
        const sf = buildSemiFinalDraw(completedRound)
        const sfSim = fastSimulateKnockoutRound(
          sf,
          0,
          userNation,
          userRatings,
          nationSquads,
          true
        )
        const final = buildFinalDraw(sfSim)
        const finalSim = fastSimulateKnockoutRound(
          final,
          0,
          userNation,
          userRatings,
          nationSquads,
          true
        )
        finishTournament(
          [...roundsSoFar, sfSim, finalSim],
          getMatchWinner(finalSim.fixtures[0]),
          exitStage
        )
        return
      }

      if (roundKey === 'semi-final') {
        const final = buildFinalDraw(completedRound)
        const finalSim = fastSimulateKnockoutRound(
          final,
          0,
          userNation,
          userRatings,
          nationSquads,
          true
        )
        finishTournament(
          [...roundsSoFar, finalSim],
          getMatchWinner(finalSim.fixtures[0]),
          exitStage
        )
        return
      }

      finishTournament(
        roundsSoFar,
        getMatchWinner(completedRound.fixtures[0]),
        exitStage
      )
    },
    [userNation, userRatings, nationSquads, finishTournament]
  )

  const handleBeginKnockouts = useCallback(() => {
    if (!quarterFinalDraw) return
    setKnockoutRounds([])
    setActiveKnockoutRound(quarterFinalDraw)
    setKnockoutRoundKey('quarter-final')
    setKnockoutMatchIndex(0)
    setPendingResult(null)
    setPhase('knockouts')
  }, [quarterFinalDraw])

  const handleKnockoutMatchComplete = useCallback(() => {
    if (!pendingResult || !activeKnockoutRound) return

    const result = pendingResult
    const userPlayed =
      result.homeTeam === userNation || result.awayTeam === userNation
    const userWon = getMatchWinner(result) === userNation
    const userLost = userPlayed && !userWon

    const updatedFixtures = [...activeKnockoutRound.fixtures]
    updatedFixtures[knockoutMatchIndex] = result
    const updatedRound: TournamentRound = {
      name: activeKnockoutRound.name,
      fixtures: updatedFixtures,
    }
    setActiveKnockoutRound(updatedRound)
    setPendingResult(null)

    const nextIndex = knockoutMatchIndex + 1

    if (userLost) {
      fastSimulateToEnd(
        updatedRound,
        nextIndex,
        knockoutRounds,
        knockoutRoundKey
      )
      return
    }

    if (nextIndex >= updatedRound.fixtures.length) {
      if (knockoutRoundKey === 'quarter-final') {
        advanceKnockoutRound(updatedRound, knockoutRounds, 'semi-final')
      } else if (knockoutRoundKey === 'semi-final') {
        advanceKnockoutRound(updatedRound, knockoutRounds, 'final')
      } else {
        const finalWinner = getMatchWinner(result)
        finishTournament([...knockoutRounds, updatedRound], finalWinner, null)
      }
      return
    }

    setKnockoutMatchIndex(nextIndex)
  }, [
    pendingResult,
    activeKnockoutRound,
    knockoutMatchIndex,
    knockoutRounds,
    knockoutRoundKey,
    userNation,
    fastSimulateToEnd,
    advanceKnockoutRound,
    finishTournament,
  ])

  const quitModal = showQuitConfirm ? (
    <QuitConfirmModal
      title="Quit Tournament?"
      message="Your progress will be lost and you'll return to the main menu."
      cancelLabel="Keep Playing"
      onCancel={() => setShowQuitConfirm(false)}
      onConfirm={onExit}
    />
  ) : null

  const PoolTables = ({ compact = false }: { compact?: boolean }) => (
    <div
      className={`grid gap-4 ${
        compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'
      }`}
    >
      {groups.map(group => (
        <div
          key={group.name}
          className={`bg-white/5 border rounded-xl p-3 ${
            group.teams.includes(userNation)
              ? 'border-emerald-400/30'
              : 'border-white/10'
          }`}
        >
          <LeagueTable
            table={sortTable(group.table)}
            userTeam={userNation}
            title={`Pool ${group.name}`}
          />
        </div>
      ))}
    </div>
  )

  if (phase === 'pool-draw') {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] px-4 py-12">
        {quitModal}
        <QuitButton onQuit={() => setShowQuitConfirm(true)} className="absolute top-6 left-6 z-10" />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Rugby World Cup · {userNation}
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Pool Draw
            </h2>
            <p className="text-white/40 text-sm mt-2">
              4 pools of 5 · Top 2 qualify · Knockout stage
            </p>
          </div>

          {groups.length > 0 && (
            <div className="mb-8">
              <PoolTables />
            </div>
          )}

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-6">
            <p className="text-white/30 text-xs uppercase tracking-widest text-center">
              Match speed
            </p>
            <SpeedControls
              speedMode={speedMode}
              onChange={s => onUpdate({ speedMode: s })}
              className="justify-center flex-wrap"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleBeginPoolStage}
              disabled={groups.length === 0}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40"
            >
              Begin Pool Stage
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'pool-stage' && !pendingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (phase === 'pool-stage' && pendingResult) {
    const completedMatches = poolResults.slice().reverse()

    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col">
        {quitModal}
        <QuitButton onQuit={() => setShowQuitConfirm(true)} className="absolute top-4 left-4 z-20" />
        <div className="absolute top-4 right-4 z-20">
          <SpeedControls
            speedMode={speedMode}
            onChange={s => onUpdate({ speedMode: s })}
            className="flex-wrap"
          />
        </div>
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4 pt-14">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              Pool Stage
            </p>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">
              Match {poolMatchIndex + 1} of {poolFixtures.length}
            </h2>
            {userPoolEliminated && (
              <p className="text-amber-400/80 text-xs mt-2 uppercase tracking-widest">
                Eliminated from Pool {userPool?.name} — remaining matches
                continue
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <MatchAnimation
              key={poolMatchIndex}
              result={pendingResult}
              speedMode={speedMode}
              onComplete={handlePoolMatchComplete}
              matchNumber={poolMatchIndex + 1}
              totalMatches={poolFixtures.length}
              userTeam={userNation}
            />

            <PoolTables compact />

            {completedMatches.length > 0 && (
              <div className="space-y-2">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  Completed
                </p>
                {completedMatches.slice(0, 5).map((match, i) => (
                  <CompletedMatchCard
                    key={poolResults.length - i}
                    result={match}
                    matchNumber={poolResults.length - i}
                    userTeam={userNation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'quarter-final-draw' && quarterFinalDraw) {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] px-4 py-12">
        {quitModal}
        <QuitButton onQuit={() => setShowQuitConfirm(true)} className="absolute top-6 left-6 z-10" />
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Knockout Stage Draw
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Quarter-Finals
            </h2>
            <p className="text-white/40 text-sm mt-2">
              Top 2 from each pool · 1A vs 2B, 1B vs 2A, 1C vs 2D, 1D vs 2C
            </p>
          </div>

          <div className="space-y-2 mb-8">
            {quarterFinalDraw.fixtures.map((fixture, i) => {
              const involvesUser =
                fixture.homeTeam === userNation ||
                fixture.awayTeam === userNation
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 border ${
                    involvesUser
                      ? 'bg-emerald-400/10 border-emerald-400/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      fixture.homeTeam === userNation
                        ? 'text-emerald-400'
                        : 'text-white/80'
                    }`}
                  >
                    {fixture.homeTeam}
                  </span>
                  <span className="text-white/30 text-xs font-bold uppercase">
                    vs
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      fixture.awayTeam === userNation
                        ? 'text-emerald-400'
                        : 'text-white/80'
                    }`}
                  >
                    {fixture.awayTeam}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-6">
            <SpeedControls
              speedMode={speedMode}
              onChange={s => onUpdate({ speedMode: s })}
              className="justify-center flex-wrap"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleBeginKnockouts}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
            >
              Begin Quarter-Finals
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'knockouts' && !pendingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (phase === 'knockouts' && pendingResult && activeKnockoutRound) {
    const completedInRound = activeKnockoutRound.fixtures.slice(
      0,
      knockoutMatchIndex
    )

    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col">
        {quitModal}
        <QuitButton onQuit={() => setShowQuitConfirm(true)} className="absolute top-4 left-4 z-20" />
        <div className="absolute top-4 right-4 z-20">
          <SpeedControls
            speedMode={speedMode}
            onChange={s => onUpdate({ speedMode: s })}
            className="flex-wrap"
          />
        </div>
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4 pt-14">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              {activeKnockoutRound.name}
            </p>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">
              Match {knockoutMatchIndex + 1} of{' '}
              {activeKnockoutRound.fixtures.length}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-lg mx-auto flex flex-col gap-4">
            <MatchAnimation
              key={`${knockoutRoundKey}-${knockoutMatchIndex}`}
              result={pendingResult}
              speedMode={speedMode}
              onComplete={handleKnockoutMatchComplete}
              matchNumber={knockoutMatchIndex + 1}
              totalMatches={activeKnockoutRound.fixtures.length}
              userTeam={userNation}
            />

            {knockoutRounds.length > 0 && (
              <KnockoutBracket
                rounds={knockoutRounds}
                userTeam={userNation}
              />
            )}

            {completedInRound.length > 0 && (
              <div className="space-y-2">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  {activeKnockoutRound.name} — Completed
                </p>
                {completedInRound.map((match, i) => (
                  <CompletedMatchCard
                    key={i}
                    result={match}
                    matchNumber={i + 1}
                    userTeam={userNation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'results') {
    const allResults = [...poolResults, ...knockoutRounds.flatMap(r => r.fixtures)]
    const topScorer = getTopTryScorer(userNation, tryScorerCandidates, allResults)
    const playerOfTournament = getPlayerOfTournament(state.draftSlots)
    const finalWinner =
      winner ||
      (knockoutRounds.length > 0
        ? getMatchWinner(
            knockoutRounds[knockoutRounds.length - 1].fixtures[0]
          )
        : '')
    const userResult =
      finalWinner === userNation
        ? 'You are the Champions!'
        : getUserProgressSummary(userNation, winner, eliminatedAt)
    const poolAward = userPool
      ? getPoolWinnerAward(userNation, userPool.table)
      : null
    const shareAwards = [
      ...getKnockoutUserAwards(
        userNation,
        finalWinner,
        eliminatedAt,
        'World Cup'
      ),
      ...(poolAward ? [poolAward] : []),
    ]

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        {quitModal}
        {showShareCard && (
          <ShareCard
            state={state}
            userTeam={userNation}
            result={userResult}
            awards={shareAwards}
            onClose={() => setShowShareCard(false)}
          />
        )}
        <div className="max-w-lg mx-auto">
          <ResultsScreen
            winner={finalWinner}
            userResult={userResult}
            userTeam={userNation}
            topTryScorer={topScorer}
            playerOfTournament={playerOfTournament}
            mode="world-cup"
            onPlayAgain={onExit}
            onShare={() => setShowShareCard(true)}
          />

          {userPool && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 mt-6">
              <LeagueTable
                table={sortTable(userPool.table)}
                userTeam={userNation}
                title={`Your Pool (${userPool.name}) — Final Standings`}
              />
            </div>
          )}

          {knockoutRounds.length > 0 && (
            <div className="mb-6">
              <KnockoutBracket rounds={knockoutRounds} userTeam={userNation} />
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

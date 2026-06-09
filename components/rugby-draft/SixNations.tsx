'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import type {
  GameState,
  MatchResult,
  LeagueTableRow,
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
  generateOpponentVsOpponentResult,
  getSquadRatings,
  getTopTryScorer,
} from '@/lib/rugby-draft/matchEngine'
import MatchAnimation, { CompletedMatchCard } from './MatchAnimation'
import LeagueTable from './LeagueTable'
import QuitButton from './QuitButton'
import QuitConfirmModal from './QuitConfirmModal'
import SpeedControls from './SpeedControls'
import ResultsScreen from './ResultsScreen'
import ShareCard from './ShareCard'
import {
  getPlayerOfTournament,
  getSixNationsUserAwards,
  getTryScorerCandidates,
} from './shareHelpers'

interface Props {
  state: GameState
  onUpdate: (updates: Partial<GameState>) => void
  onExit: () => void
}

const SIX_NATIONS_TEAMS = [
  'England',
  'Ireland',
  'Wales',
  'Scotland',
  'France',
  'Italy',
]

const HOME_NATIONS = ['England', 'Ireland', 'Wales', 'Scotland']

type SixNationsPhase = 'fixtures' | 'playing' | 'results'

interface Fixture {
  round: number
  home: string
  away: string
}

interface SixNationsAwards {
  grandSlam: string | null
  tripleCrown: string | null
  woodenSpoon: string
  championship: string
}

function generateRoundRobinFixtures(teams: string[]): Fixture[] {
  const n = teams.length
  const rotating = teams.slice(1)
  const fixed = teams[0]
  const fixtures: Fixture[] = []

  for (let round = 0; round < n - 1; round++) {
    const roundTeams = [fixed, ...rotating]
    for (let i = 0; i < n / 2; i++) {
      fixtures.push({
        round: round + 1,
        home: roundTeams[i],
        away: roundTeams[n - 1 - i],
      })
    }
    rotating.unshift(rotating.pop()!)
  }

  return fixtures
}

function getNationSquads(): Squad[] {
  return getDraftPool('six-nations').filter(
    s => SIX_NATIONS_TEAMS.includes(s.club) && s.competition === 'Six Nations'
  )
}

function getTeamRatings(
  team: string,
  userNation: string,
  userRatings: TeamRatings,
  squads: Squad[]
): TeamRatings {
  if (team === userNation) return userRatings
  const squad = findSquadByClub(squads, team, { competition: 'Six Nations' })
  return squad
    ? getSquadRatings(squad)
    : { forwards: 80, backs: 80, overall: 80 }
}

function simulateFixture(
  fixture: Fixture,
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

function calculateTripleCrown(results: MatchResult[]): string | null {
  for (const nation of HOME_NATIONS) {
    const others = HOME_NATIONS.filter(n => n !== nation)
    const beatAll = others.every(opponent => {
      const match = results.find(
        r =>
          (r.homeTeam === nation && r.awayTeam === opponent) ||
          (r.homeTeam === opponent && r.awayTeam === nation)
      )
      if (!match) return false
      if (match.homeTeam === nation) return match.homeScore > match.awayScore
      return match.awayScore > match.homeScore
    })
    if (beatAll) return nation
  }
  return null
}

function calculateAwards(
  table: LeagueTableRow[],
  results: MatchResult[]
): SixNationsAwards {
  const sorted = sortTable(table)
  return {
    championship: sorted[0].club,
    woodenSpoon: sorted[sorted.length - 1].club,
    grandSlam: sorted.find(r => r.played === 5 && r.won === 5)?.club ?? null,
    tripleCrown: calculateTripleCrown(results),
  }
}

function ordinal(n: number): string {
  const suffix =
    n % 10 === 1 && n % 100 !== 11
      ? 'st'
      : n % 10 === 2 && n % 100 !== 12
        ? 'nd'
        : n % 10 === 3 && n % 100 !== 13
          ? 'rd'
          : 'th'
  return `${n}${suffix}`
}

export default function SixNations({ state, onUpdate, onExit }: Props) {
  const [phase, setPhase] = useState<SixNationsPhase>('fixtures')
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [results, setResults] = useState<MatchResult[]>([])
  const [table, setTable] = useState<LeagueTableRow[]>([])
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [pendingResult, setPendingResult] = useState<MatchResult | null>(null)
  const [awards, setAwards] = useState<SixNationsAwards | null>(null)
  const [showShareCard, setShowShareCard] = useState(false)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)

  const userNation = state.selectedNation ?? 'England'
  const speedMode = state.speedMode
  const userRatings = state.teamRatings!
  const nationSquads = useMemo(() => getNationSquads(), [])

  useEffect(() => {
    const generated = generateRoundRobinFixtures(SIX_NATIONS_TEAMS)
    setFixtures(generated)
    setTable(sortTable(buildLeagueTable(SIX_NATIONS_TEAMS)))
  }, [])

  useEffect(() => {
    if (phase !== 'playing' || currentMatchIndex >= fixtures.length) return
    const result = simulateFixture(
      fixtures[currentMatchIndex],
      userNation,
      userRatings,
      nationSquads
    )
    setPendingResult(result)
  }, [phase, currentMatchIndex, fixtures, userNation, userRatings, nationSquads])

  const handleBeginTournament = useCallback(() => {
    setResults([])
    setCurrentMatchIndex(0)
    setPendingResult(null)
    setAwards(null)
    setTable(sortTable(buildLeagueTable(SIX_NATIONS_TEAMS)))
    setPhase('playing')
  }, [])

  const handleMatchComplete = useCallback(() => {
    if (!pendingResult) return

    setTable(prevTable => {
      const newTable = sortTable(updateTableWithResult(prevTable, pendingResult))
      setResults(prevResults => {
        const newResults = [...prevResults, pendingResult]
        const nextIndex = currentMatchIndex + 1
        if (nextIndex >= fixtures.length) {
          setAwards(calculateAwards(newTable, newResults))
          setPhase('results')
          onUpdate({ leagueTable: newTable, fixtures: newResults })
        } else {
          setCurrentMatchIndex(nextIndex)
        }
        return newResults
      })
      return newTable
    })
    setPendingResult(null)
  }, [pendingResult, currentMatchIndex, fixtures.length, onUpdate])

  const fixturesByRound = useMemo(() => {
    const grouped: Record<number, Fixture[]> = {}
    for (const fixture of fixtures) {
      if (!grouped[fixture.round]) grouped[fixture.round] = []
      grouped[fixture.round].push(fixture)
    }
    return grouped
  }, [fixtures])

  const sortedTable = sortTable(table)
  const userRow = sortedTable.find(r => r.club === userNation)
  const userPosition = sortedTable.findIndex(r => r.club === userNation) + 1

  const tryScorerCandidates = useMemo(
    () => getTryScorerCandidates(state.draftSlots),
    [state.draftSlots]
  )

  if (phase === 'fixtures') {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] px-4 py-12">
        {showQuitConfirm && (
          <QuitConfirmModal
            title="Quit Tournament?"
            message="Your progress will be lost and you'll return to the main menu."
            cancelLabel="Keep Playing"
            onCancel={() => setShowQuitConfirm(false)}
            onConfirm={onExit}
          />
        )}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-6 left-6 z-10"
        />
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Six Nations · {userNation}
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Tournament Fixtures
            </h2>
            <p className="text-white/40 text-sm mt-2">
              6 teams · 15 matches · 5 rounds
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {Object.entries(fixturesByRound)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([round, roundFixtures]) => (
                <div key={round}>
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
                    Round {round}
                  </p>
                  <div className="space-y-2">
                    {roundFixtures.map((fixture, i) => {
                      const involvesUser =
                        fixture.home === userNation ||
                        fixture.away === userNation
                      return (
                        <div
                          key={`${fixture.home}-${fixture.away}-${i}`}
                          className={`flex items-center justify-between rounded-xl px-4 py-3 border ${
                            involvesUser
                              ? 'bg-emerald-400/10 border-emerald-400/30'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <span
                            className={`text-sm font-semibold ${
                              fixture.home === userNation
                                ? 'text-emerald-400'
                                : 'text-white/80'
                            }`}
                          >
                            {fixture.home}
                          </span>
                          <span className="text-white/30 text-xs font-bold uppercase tracking-widest">
                            vs
                          </span>
                          <span
                            className={`text-sm font-semibold ${
                              fixture.away === userNation
                                ? 'text-emerald-400'
                                : 'text-white/80'
                            }`}
                          >
                            {fixture.away}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-6">
            <p className="text-white/30 text-xs uppercase tracking-widest text-center">
              Match speed
            </p>
            <SpeedControls
              speedMode={speedMode}
              onChange={s => onUpdate({ speedMode: s })}
              className="justify-center"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleBeginTournament}
              disabled={fixtures.length === 0}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40"
            >
              Begin Tournament
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'playing' && !pendingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (phase === 'playing' && pendingResult) {
    const completedMatches = results.slice().reverse()

    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col">
        {showQuitConfirm && (
          <QuitConfirmModal
            title="Quit Tournament?"
            message="Your progress will be lost and you'll return to the main menu."
            cancelLabel="Keep Playing"
            onCancel={() => setShowQuitConfirm(false)}
            onConfirm={onExit}
          />
        )}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-4 left-4 z-20"
        />
        <div className="absolute top-4 right-4 z-20">
          <SpeedControls
            speedMode={speedMode}
            onChange={s => onUpdate({ speedMode: s })}
          />
        </div>
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4 pt-14">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              Six Nations
            </p>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">
              Match {currentMatchIndex + 1} of {fixtures.length}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-lg mx-auto flex flex-col gap-4">
            <MatchAnimation
              key={currentMatchIndex}
              result={pendingResult}
              speedMode={speedMode}
              onComplete={handleMatchComplete}
              matchNumber={currentMatchIndex + 1}
              totalMatches={fixtures.length}
              userTeam={userNation}
            />

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <LeagueTable
                table={sortedTable}
                userTeam={userNation}
                title="Live Standings"
              />
            </div>

            {completedMatches.length > 0 && (
              <div className="space-y-2">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  Completed
                </p>
                {completedMatches.map((match, i) => (
                  <CompletedMatchCard
                    key={results.length - i}
                    result={match}
                    matchNumber={results.length - i}
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

  if (phase === 'results' && awards) {
    const totalPoints = (userRow?.points ?? 0) + (userRow?.bonusPoints ?? 0)
    const topScorer = getTopTryScorer(userNation, tryScorerCandidates, results)
    const playerOfTournament = getPlayerOfTournament(state.draftSlots)
    const userResult =
      awards.championship === userNation
        ? 'You are the Champions!'
        : `Finished ${ordinal(userPosition)} with ${totalPoints} points`

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        {showShareCard && (
          <ShareCard
            state={state}
            userTeam={userNation}
            result={userResult}
            awards={getSixNationsUserAwards(userNation, awards)}
            onClose={() => setShowShareCard(false)}
          />
        )}
        <div className="max-w-lg mx-auto">
          <ResultsScreen
            winner={awards.championship}
            userResult={userResult}
            userTeam={userNation}
            topTryScorer={topScorer}
            playerOfTournament={playerOfTournament}
            mode="six-nations"
            onPlayAgain={onExit}
            onShare={() => setShowShareCard(true)}
          />

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 mt-6">
            <LeagueTable table={sortedTable} userTeam={userNation} title="Final Standings" />
          </div>

          <div className="mb-6">
            <h3 className="text-white font-black text-lg uppercase tracking-tight mb-3">
              Special Awards
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
                  Championship
                </p>
                <p className="text-white font-black text-sm">
                  {awards.championship === userNation
                    ? `🏆 ${awards.championship}`
                    : awards.championship}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
                  Wooden Spoon
                </p>
                <p className="text-white font-black text-sm">
                  {awards.woodenSpoon}
                </p>
              </div>
              {awards.grandSlam && (
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 col-span-2">
                  <p className="text-amber-400/70 text-xs uppercase tracking-widest mb-1">
                    Grand Slam
                  </p>
                  <p className="text-amber-400 font-black text-sm">
                    {awards.grandSlam}
                  </p>
                </div>
              )}
              {awards.tripleCrown && (
                <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-4 col-span-2">
                  <p className="text-emerald-400/70 text-xs uppercase tracking-widest mb-1">
                    Triple Crown
                  </p>
                  <p className="text-emerald-400 font-black text-sm">
                    {awards.tripleCrown}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    )
  }

  return null
}

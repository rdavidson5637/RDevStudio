import type { Squad, Player, Formation, DraftSlot, Position, TeamRatings, League, MatchResult, LeagueTableRow } from '@/types/champions-draft'

export const FORMATION_POSITIONS: Record<Formation, Position[]> = {
  '4-3-3': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'RW', 'ST', 'LW'],
  '4-4-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'ST', 'ST'],
  '4-2-3-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'CAM', 'RM', 'LM', 'ST'],
  '3-5-2': ['GK', 'CB', 'CB', 'CB', 'RWB', 'CM', 'CDM', 'CM', 'LWB', 'ST', 'ST'],
  '5-3-2': ['GK', 'RWB', 'CB', 'CB', 'CB', 'LWB', 'CM', 'CM', 'CM', 'ST', 'ST'],
}

export const POSITION_COORDINATES: Record<Formation, { x: number; y: number }[]> = {
  '4-3-3': [
    { x: 50, y: 90 },
    { x: 80, y: 72 }, { x: 60, y: 72 }, { x: 40, y: 72 }, { x: 20, y: 72 },
    { x: 70, y: 52 }, { x: 50, y: 52 }, { x: 30, y: 52 },
    { x: 75, y: 28 }, { x: 50, y: 22 }, { x: 25, y: 28 },
  ],
  '4-4-2': [
    { x: 50, y: 90 },
    { x: 80, y: 72 }, { x: 60, y: 72 }, { x: 40, y: 72 }, { x: 20, y: 72 },
    { x: 80, y: 50 }, { x: 60, y: 50 }, { x: 40, y: 50 }, { x: 20, y: 50 },
    { x: 65, y: 25 }, { x: 35, y: 25 },
  ],
  '4-2-3-1': [
    { x: 50, y: 90 },
    { x: 80, y: 72 }, { x: 60, y: 72 }, { x: 40, y: 72 }, { x: 20, y: 72 },
    { x: 65, y: 57 }, { x: 35, y: 57 },
    { x: 75, y: 38 }, { x: 50, y: 38 }, { x: 25, y: 38 },
    { x: 50, y: 20 },
  ],
  '3-5-2': [
    { x: 50, y: 90 },
    { x: 65, y: 72 }, { x: 50, y: 72 }, { x: 35, y: 72 },
    { x: 85, y: 52 }, { x: 70, y: 52 }, { x: 50, y: 52 }, { x: 30, y: 52 }, { x: 15, y: 52 },
    { x: 65, y: 25 }, { x: 35, y: 25 },
  ],
  '5-3-2': [
    { x: 50, y: 90 },
    { x: 85, y: 68 }, { x: 68, y: 72 }, { x: 50, y: 72 }, { x: 32, y: 72 }, { x: 15, y: 68 },
    { x: 70, y: 48 }, { x: 50, y: 48 }, { x: 30, y: 48 },
    { x: 65, y: 25 }, { x: 35, y: 25 },
  ],
}

export const POSITION_GROUPS: Record<string, Position[]> = {
  goalkeeper: ['GK'],
  defence: ['CB', 'LB', 'RB', 'LWB', 'RWB'],
  midfield: ['CDM', 'CM', 'CAM', 'LM', 'RM'],
  attack: ['LW', 'RW', 'ST', 'CF'],
}

export const COMPATIBLE_POSITIONS: Record<Position, Position[]> = {
  GK: ['GK'],
  CB: ['CB'],
  LB: ['LB', 'LWB'],
  RB: ['RB', 'RWB'],
  LWB: ['LWB', 'LB'],
  RWB: ['RWB', 'RB'],
  CDM: ['CDM', 'CM'],
  CM: ['CM', 'CDM', 'CAM'],
  CAM: ['CAM', 'CM'],
  LM: ['LM', 'LW'],
  RM: ['RM', 'RW'],
  LW: ['LW', 'LM'],
  RW: ['RW', 'RM'],
  ST: ['ST', 'CF'],
  CF: ['CF', 'ST'],
}

export function buildDraftSlots(formation: Formation): DraftSlot[] {
  const positions = FORMATION_POSITIONS[formation]
  const coordinates = POSITION_COORDINATES[formation]
  return positions.map((position, index) => ({
    position,
    player: null,
    coordinates: coordinates[index],
  }))
}

export function getEmptySlots(slots: DraftSlot[]): DraftSlot[] {
  return slots.filter(slot => slot.player === null)
}

export function getEligiblePlayers(
  squad: Squad,
  emptySlots: DraftSlot[],
  nationality?: string,
  excludedPlayerIds?: string[]
): Player[] {
  const neededPositions = emptySlots.map(s => s.position)
  return squad.players.filter(player => {
    if (excludedPlayerIds?.includes(player.id)) return false
    if (nationality && player.nationality !== nationality) return false
    const compatible = COMPATIBLE_POSITIONS[player.position as Position] ?? [player.position]
    return compatible.some(pos => neededPositions.includes(pos as Position))
  })
}

export function squadHasEligibleNationalPlayers(
  squad: Squad,
  emptySlots: DraftSlot[],
  nationality: string,
  excludedPlayerIds?: string[]
): boolean {
  return getEligiblePlayers(squad, emptySlots, nationality, excludedPlayerIds).length > 0
}

export function flattenSquads(squads: Squad[]): Player[] {
  return squads.flatMap(squad =>
    squad.players.map(player => ({
      ...player,
      club: squad.club,
      season: squad.season,
      league: squad.league,
    }))
  )
}

export function calculateTeamRatings(slots: DraftSlot[]): TeamRatings {
  const drafted = slots.filter(s => s.player !== null).map(s => s.player!)

  const getGroupAvg = (positions: Position[]) => {
    const group = drafted.filter(p => positions.includes(p.position as Position))
    if (group.length === 0) return 0
    return Math.round(group.reduce((sum, p) => sum + p.overall, 0) / group.length)
  }

  const attack = getGroupAvg(POSITION_GROUPS.attack as Position[])
  const midfield = getGroupAvg(POSITION_GROUPS.midfield as Position[])
  const defence = getGroupAvg(POSITION_GROUPS.defence as Position[])
  const goalkeeper = getGroupAvg(POSITION_GROUPS.goalkeeper as Position[])
  const overall = Math.round((attack + midfield + defence + goalkeeper) / 4)

  return { attack, midfield, defence, goalkeeper, overall }
}

function samplePoissonGoals(lambda: number): number {
  const L = Math.exp(-lambda)
  let k = 0
  let p = 1
  do {
    k++
    p *= Math.random()
  } while (p > L && k < 6)
  return k - 1
}

export function simulateMatch(
  homeRatings: TeamRatings,
  awayRatings: TeamRatings,
  homeTeam: string,
  awayTeam: string,
  neutralVenue = false
): MatchResult {
  const homePower = homeRatings.overall + (neutralVenue ? 0 : 2)
  const awayPower = awayRatings.overall
  const diff = homePower - awayPower

  const homeAttackEdge = (homeRatings.attack - awayRatings.defence) * 0.03
  const awayAttackEdge = (awayRatings.attack - homeRatings.defence) * 0.03

  let homeScore = samplePoissonGoals(Math.max(0.4, 1.15 + diff * 0.035 + homeAttackEdge))
  let awayScore = samplePoissonGoals(Math.max(0.4, 1.05 - diff * 0.035 + awayAttackEdge))

  const maxMargin = Math.abs(diff) > 14 ? 3 : Math.abs(diff) > 8 ? 2 : 2
  if (homeScore - awayScore > maxMargin) homeScore = awayScore + maxMargin
  if (awayScore - homeScore > maxMargin) awayScore = homeScore + maxMargin

  homeScore = Math.min(homeScore, 4)
  awayScore = Math.min(awayScore, 4)

  return { homeTeam, awayTeam, homeScore, awayScore }
}

export function simulateKnockoutMatch(
  homeRatings: TeamRatings,
  awayRatings: TeamRatings,
  homeTeam: string,
  awayTeam: string,
  neutralVenue = false
): MatchResult {
  const result = simulateMatch(
    homeRatings,
    awayRatings,
    homeTeam,
    awayTeam,
    neutralVenue
  )
  if (result.homeScore !== result.awayScore) return result

  const homePower = homeRatings.overall + (neutralVenue ? 0 : 2)
  const awayPower = awayRatings.overall
  const diff = homePower - awayPower
  const homeWinChance = 0.5 + Math.max(-0.4, Math.min(0.4, diff * 0.03))
  const homeWins = Math.random() < homeWinChance

  if (homeWins) {
    return { ...result, homeScore: result.homeScore + 1 }
  }
  return { ...result, awayScore: result.awayScore + 1 }
}

export function getClubColour(badge: string): string {
  const colours: Record<string, string> = {
    LIV: '#C8102E', MAN: '#6CABDD', MNU: '#DA291C', ARS: '#EF0107',
    CHE: '#034694', TOT: '#132257', NEW: '#241F20', AVL: '#95BFE5',
    BAR: '#A50044', RMA: '#FEBE10', ATM: '#CB3524', BAY: '#DC052D',
    BVB: '#FDE100', INT: '#010E80', JUV: '#000000', ACM: '#FB090B',
    PSG: '#004170', NAP: '#12A0D7', SEV: '#D71920', VAL: '#FF7F00',
    FRA: '#002395', ENG: '#CF111A', BRA: '#009C3B', ARG: '#74ACDF',
    ESP: '#AA151B', GER: '#000000', POR: '#006600', ITA: '#003399',
    NED: '#FF6600', BEL: '#000000', URU: '#5EB6E4', CRO: '#FF0000',
    SEN: '#00853F', MAR: '#C1272D', JPN: '#BC002D', USA: '#3C3B6E',
    MEX: '#006847', KOR: '#C60C30', AUS: '#FFCD00', ECU: '#FFD100',
    COL: '#FCD116', SUI: '#FF0000', DEN: '#C60C30', POL: '#DC143C',
    TUR: '#E30A17', AUT: '#ED2939', HUN: '#477050', WAL: '#D30731',
    SCO: '#0065BD', IRL: '#169B62', SRB: '#C6363C', CZE: '#11457E',
    DEFAULT: '#4A5568',
  }
  return colours[badge] ?? colours.DEFAULT
}

export function getTextColourForBadge(badge: string): string {
  const darkKits = ['MNU', 'JUV', 'GER', 'BEL', 'BAR', 'MAN', 'INT', 'PSG', 'NEW']
  return darkKits.includes(badge) ? '#FFFFFF' : '#FFFFFF'
}

export function buildLeagueTable(clubs: string[]): LeagueTableRow[] {
  return clubs.map(club => ({
    club,
    played: 0, won: 0, drawn: 0, lost: 0,
    goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0,
  }))
}

export function updateTableWithResult(
  table: LeagueTableRow[],
  result: MatchResult
): LeagueTableRow[] {
  return table.map(row => {
    if (row.club === result.homeTeam) {
      const won = result.homeScore > result.awayScore
      const drawn = result.homeScore === result.awayScore
      return {
        ...row,
        played: row.played + 1,
        won: row.won + (won ? 1 : 0),
        drawn: row.drawn + (drawn ? 1 : 0),
        lost: row.lost + (!won && !drawn ? 1 : 0),
        goalsFor: row.goalsFor + result.homeScore,
        goalsAgainst: row.goalsAgainst + result.awayScore,
        goalDifference: row.goalDifference + (result.homeScore - result.awayScore),
        points: row.points + (won ? 3 : drawn ? 1 : 0),
      }
    }
    if (row.club === result.awayTeam) {
      const won = result.awayScore > result.homeScore
      const drawn = result.homeScore === result.awayScore
      return {
        ...row,
        played: row.played + 1,
        won: row.won + (won ? 1 : 0),
        drawn: row.drawn + (drawn ? 1 : 0),
        lost: row.lost + (!won && !drawn ? 1 : 0),
        goalsFor: row.goalsFor + result.awayScore,
        goalsAgainst: row.goalsAgainst + result.homeScore,
        goalDifference: row.goalDifference + (result.awayScore - result.homeScore),
        points: row.points + (won ? 3 : drawn ? 1 : 0),
      }
    }
    return row
  })
}

export function sortTable(table: LeagueTableRow[]): LeagueTableRow[] {
  return [...table].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    return b.goalsFor - a.goalsFor
  })
}

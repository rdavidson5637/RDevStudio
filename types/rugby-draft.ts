export type RugbyCompetition =
  | 'World Cup'
  | 'Six Nations'
  | 'Champions Cup'

export type GameMode =
  | 'world-cup'
  | 'six-nations'
  | 'champions-cup'

export type Position =
  | 'LH'
  | 'HK'
  | 'TH'
  | 'LL'
  | 'RL'
  | 'BF'
  | 'OF'
  | 'N8'
  | 'SH'
  | 'FH'
  | 'IC'
  | 'OC'
  | 'LW'
  | 'RW'
  | 'FB'

export type GamePhase =
  | 'mode-select'
  | 'nation-select'
  | 'club-select'
  | 'drafting'
  | 'draft-complete'
  | 'playing'
  | 'results'

export interface PlayerStats {
  str: number
  spd: number
  hnd: number
  kck: number
  tck: number
  stm: number
}

export interface Player {
  id: string
  name: string
  position: Position
  overall: number
  stats: PlayerStats
  nationality: string
  club?: string
  season?: string
}

export interface Squad {
  club: string
  season: string
  competition: RugbyCompetition
  badge: string
  players: Player[]
}

export interface DraftSlot {
  position: Position
  player: Player | null
  coordinates: { x: number; y: number }
}

export interface TeamRatings {
  forwards: number
  backs: number
  overall: number
}

export interface MatchResult {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  homeTries?: number
  awayTries?: number
}

export interface LeagueTableRow {
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  pointsFor: number
  pointsAgainst: number
  pointsDifference: number
  tries: number
  bonusPoints: number
  points: number
}

export interface RugbyGroup {
  name: string
  teams: string[]
  table: LeagueTableRow[]
  fixtures: MatchResult[]
}

export interface TournamentRound {
  name: string
  fixtures: MatchResult[]
}

export interface EndOfTournamentStats {
  winner: string
  topTryScorer: { playerName: string; club: string; tries: number }
  playerOfTournament: { playerName: string; club: string; overall: number }
  userResult: string
}

export interface GameState {
  phase: GamePhase
  mode: GameMode | null
  selectedNation: string | null
  selectedClub: string | null
  draftSlots: DraftSlot[]
  currentSpinSquad: Squad | null
  eligiblePlayers: Player[]
  usedSquadIds: string[]
  usedPlayerIds: string[]
  teamRatings: TeamRatings | null
  leagueTable: LeagueTableRow[]
  fixtures: MatchResult[]
  groups: RugbyGroup[]
  knockoutRounds: TournamentRound[]
  endStats: EndOfTournamentStats | null
  speedMode: 'normal' | 'fast' | 'skip'
}

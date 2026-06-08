export type League =
  | 'Premier League'
  | 'La Liga'
  | 'Bundesliga'
  | 'Serie A'
  | 'Ligue 1'
  | 'World Cup'
  | 'Euro Championship'
  | 'Champions League'

export type Formation =
  | '4-3-3'
  | '4-4-2'
  | '4-2-3-1'
  | '3-5-2'
  | '5-3-2'

export type GameMode =
  | 'league'
  | 'champions-league'
  | 'world-cup'

export type WCDraftMode = 'national' | 'dream'

export type Position =
  | 'GK'
  | 'CB'
  | 'LB'
  | 'RB'
  | 'LWB'
  | 'RWB'
  | 'CDM'
  | 'CM'
  | 'CAM'
  | 'LM'
  | 'RM'
  | 'LW'
  | 'RW'
  | 'ST'
  | 'CF'

export type GamePhase =
  | 'mode-select'
  | 'league-select'
  | 'nation-select'
  | 'wc-draft-mode-select'
  | 'formation-select'
  | 'drafting'
  | 'draft-complete'
  | 'playing'
  | 'results'

export interface PlayerStats {
  pac: number
  sho: number
  pas: number
  dri: number
  def: number
  phy: number
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
  league?: League
}

export interface Squad {
  club: string
  season: string
  league: League
  badge: string
  players: Player[]
}

export interface DraftSlot {
  position: Position
  player: Player | null
  coordinates: { x: number; y: number }
}

export interface TeamRatings {
  attack: number
  midfield: number
  defence: number
  goalkeeper: number
  overall: number
}

export interface MatchResult {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  playerGoals?: Record<string, number>
}

export interface LeagueTableRow {
  club: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface CLGroup {
  name: string
  teams: string[]
  table: LeagueTableRow[]
  fixtures: MatchResult[]
}

export interface WorldCupGroup {
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
  topScorer: { playerName: string; club: string; goals: number }
  playerOfTournament: { playerName: string; club: string; overall: number }
  userResult: string
}

export interface GameState {
  phase: GamePhase
  mode: GameMode | null
  selectedLeague: League | null
  selectedNation: string | null
  wcDraftMode: WCDraftMode | null
  formation: Formation | null
  draftSlots: DraftSlot[]
  currentSpinSquad: Squad | null
  eligiblePlayers: Player[]
  usedSquadIds: string[]
  usedPlayerIds: string[]
  teamRatings: TeamRatings | null
  leagueTable: LeagueTableRow[]
  fixtures: MatchResult[]
  clGroups: CLGroup[]
  wcGroups: WorldCupGroup[]
  knockoutRounds: TournamentRound[]
  endStats: EndOfTournamentStats | null
  speedMode: 'normal' | 'fast' | 'skip'
}

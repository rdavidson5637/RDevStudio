import type { MatchupResult, SeasonOdds } from "./simulate";

export type RivalPlayer = {
  id: number;
  webName: string;
  position: 1 | 2 | 3 | 4;
  pickPosition: number;
  availabilityScore: number;
  projectedPoints: number;
  totalPoints: number;
  draftRank: number | null;
  status: string;
};

export type RivalTeam = {
  entryId: number;
  name: string;
  manager: string;
  waiverPick: number | null;
  players: RivalPlayer[];
  projectedGw: number;
  injuryCount: number;
  thinPositions: string[];
  rank: number | null;
  total: number;
};

export type PostMortemRow = {
  id: number;
  webName: string;
  owner: string;
  draftRank: number;
  totalPoints: number;
  value: number;
};

export type TradePiece = {
  id: number;
  webName: string;
  entryId: number;
  owner: string;
  position: 1 | 2 | 3 | 4;
  projected6: number;
};

export type LeagueBoardData = {
  teams: RivalTeam[];
  myEntryId: number;
  matchup: (MatchupResult & { opponentName: string; opponentEntryId: number }) | null;
  classicNote: boolean;
  season: SeasonOdds[];
  postMortem: { best: PostMortemRow[]; worst: PostMortemRow[] };
  tradePool: TradePiece[];
};

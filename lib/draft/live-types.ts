export type LivePlayer = {
  id: number;
  webName: string;
  owner: string;
  entryId: number;
  points: number;
  minutes: number;
  bps: number;
  bonus: number;
  provisionalBonus: number;
  multiplier: number;
};

export type LiveH2H = {
  opponentName: string;
  opponentEntryId: number;
  myPoints: number;
  theirPoints: number;
  myWinPct: number | null;
};

export type LiveBoardData = {
  eventId: number;
  players: LivePlayer[];
  byEntry: { entryId: number; name: string; points: number }[];
  h2h: LiveH2H | null;
  updatedAt: string;
};

export const DRAFT_LIVE_CHANNEL = "draft-live";
export const DRAFT_LIVE_EVENT = "board";

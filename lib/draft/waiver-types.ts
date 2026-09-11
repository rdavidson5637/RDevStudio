import type { TickerCell } from "./ticker";
import type { DropPlayer } from "./drop";

export type WirePlayer = {
  id: number;
  webName: string;
  teamId: number;
  teamShortName: string;
  position: 1 | 2 | 3 | 4;
  availabilityScore: number;
  projected1: number;
  projected3: number;
  projected6: number;
  next3: { opponent: string; isHome: boolean; difficulty: number }[];
  form: number | null;
  minutes: number;
  starts: number;
  defconPer90: number;
  defconRate: number;
  pickupCount: number;
  dropCount: number;
  hasNextGwFixture: boolean;
  cells: TickerCell[];
};

export type WaiverTrending = {
  availabilityRisers: { id: number; webName: string; from: number; to: number }[];
};

export type WaiverBoardData = {
  players: WirePlayer[];
  trending: WaiverTrending;
  squadDrops: DropPlayer[];
};

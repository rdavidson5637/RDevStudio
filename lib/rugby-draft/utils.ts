import type {
  Squad,
  Player,
  DraftSlot,
  Position,
  TeamRatings,
  MatchResult,
  LeagueTableRow,
} from "@/types/rugby-draft";
const LEGENDARY_BADGE_TO_MODERN: Record<string, string> = {
  NZ15: "NZL",
  EN03: "ENG",
  IR18: "IRE",
  RS95: "RSA",
  AU99: "AUS",
  FR87: "FRA",
};

function resolveModernBadge(badge: string): string {
  return LEGENDARY_BADGE_TO_MODERN[badge] ?? badge;
}

export const RUGBY_POSITIONS: Position[] = [
  "LH",
  "HK",
  "TH",
  "LL",
  "RL",
  "BF",
  "OF",
  "N8",
  "SH",
  "FH",
  "IC",
  "OC",
  "LW",
  "RW",
  "FB",
];

export const POSITION_COORDINATES: { x: number; y: number }[] = [
  { x: 20, y: 82 },
  { x: 50, y: 85 },
  { x: 80, y: 82 },
  { x: 35, y: 74 },
  { x: 65, y: 74 },
  { x: 20, y: 65 },
  { x: 80, y: 65 },
  { x: 50, y: 65 },
  { x: 50, y: 52 },
  { x: 35, y: 42 },
  { x: 30, y: 30 },
  { x: 55, y: 30 },
  { x: 15, y: 18 },
  { x: 85, y: 18 },
  { x: 50, y: 12 },
];

export const POSITION_GROUPS: Record<string, Position[]> = {
  forwards: ["LH", "HK", "TH", "LL", "RL", "BF", "OF", "N8"],
  backs: ["SH", "FH", "IC", "OC", "LW", "RW", "FB"],
};

export const COMPATIBLE_POSITIONS: Record<Position, Position[]> = {
  LH: ["LH", "TH"],
  HK: ["HK"],
  TH: ["TH", "LH"],
  LL: ["LL", "RL"],
  RL: ["RL", "LL"],
  BF: ["BF", "OF"],
  OF: ["OF", "BF"],
  N8: ["N8"],
  SH: ["SH"],
  FH: ["FH"],
  IC: ["IC", "OC"],
  OC: ["OC", "IC"],
  LW: ["LW", "RW"],
  RW: ["RW", "LW"],
  FB: ["FB"],
};

export function buildDraftSlots(): DraftSlot[] {
  return RUGBY_POSITIONS.map((position, index) => ({
    position,
    player: null,
    coordinates: POSITION_COORDINATES[index],
  }));
}

export function getEmptySlots(slots: DraftSlot[]): DraftSlot[] {
  return slots.filter((slot) => slot.player === null);
}

export function getNextEmptySlotIndex(slots: DraftSlot[]): number {
  return slots.findIndex((slot) => slot.player === null);
}

export function getEligiblePlayersForSlot(
  squad: Squad,
  targetPosition: Position,
  nationality?: string,
  excludedPlayerIds?: string[],
): Player[] {
  return squad.players.filter((player) => {
    if (excludedPlayerIds?.includes(player.id)) return false;
    if (nationality && player.nationality !== nationality) return false;
    const compatible = COMPATIBLE_POSITIONS[player.position] ?? [
      player.position,
    ];
    return compatible.includes(targetPosition);
  });
}

export function getEligiblePlayers(
  squad: Squad,
  emptySlots: DraftSlot[],
  nationality?: string,
  excludedPlayerIds?: string[],
): Player[] {
  const neededPositions = emptySlots.map((s) => s.position);
  return squad.players.filter((player) => {
    if (excludedPlayerIds?.includes(player.id)) return false;
    if (nationality && player.nationality !== nationality) return false;
    const compatible = COMPATIBLE_POSITIONS[player.position] ?? [
      player.position,
    ];
    return compatible.some((pos) => neededPositions.includes(pos));
  });
}

export function squadHasEligibleNationalPlayers(
  squad: Squad,
  emptySlots: DraftSlot[],
  nationality: string,
  excludedPlayerIds?: string[],
): boolean {
  return (
    getEligiblePlayers(squad, emptySlots, nationality, excludedPlayerIds)
      .length > 0
  );
}

export function calculateTeamRatings(slots: DraftSlot[]): TeamRatings {
  const drafted = slots.filter((s) => s.player !== null).map((s) => s.player!);

  const getGroupRating = (
    positions: Position[],
    statFn: (player: Player) => number,
  ) => {
    const group = drafted.filter((p) => positions.includes(p.position));
    if (group.length === 0) return 0;
    return Math.round(
      group.reduce((sum, p) => sum + statFn(p), 0) / group.length,
    );
  };

  const forwards = getGroupRating(
    POSITION_GROUPS.forwards,
    (p) => (p.stats.str + p.stats.tck) / 2,
  );
  const backs = getGroupRating(
    POSITION_GROUPS.backs,
    (p) => (p.stats.hnd + p.stats.spd) / 2,
  );
  const overall =
    forwards === 0 && backs === 0
      ? 0
      : Math.round((forwards + backs) / (forwards > 0 && backs > 0 ? 2 : 1));

  return { forwards, backs, overall };
}

export function getClubColour(badge: string): string {
  const colours: Record<string, string> = {
    ENG: "#FFFFFF",
    IRE: "#009A44",
    WAL: "#DC143C",
    SCO: "#003DA5",
    FRA: "#003189",
    ITA: "#0033A0",
    NZL: "#000000",
    AUS: "#FFD200",
    RSA: "#007A4D",
    ARG: "#75ACDF",
    FIJ: "#68BFE5",
    SAM: "#002868",
    TON: "#C10000",
    URU: "#68ACE5",
    GEO: "#DA2128",
    NAM: "#003580",
    JPN: "#BC002D",
    POR: "#006600",
    CHI: "#D52B1E",
    USA: "#B22234",
    LEI: "#007A3D",
    LNS: "#0066CC",
    MUN: "#C8102E",
    ULST: "#E31837",
    ULS: "#E31837",
    CON: "#006633",
    TOU: "#782F40",
    RAC: "#1E4D8C",
    SAR: "#E30613",
    ASM: "#FFD700",
    HAR: "#1B2A4A",
    NOR: "#006747",
    BRI: "#003087",
    GLO: "#006747",
    EXE: "#CC0000",
    NORW: "#FFD700",
    BAY: "#DC052D",
    STO: "#782F40",
    LYO: "#E30613",
    SAL: "#00AEEF",
    LRO: "#FFD200",
    BOR: "#DC052D",
    TVN: "#8B1A1A",
    SFR: "#E91E8C",
    CLE: "#FFD700",
    EDIN: "#003087",
    EDI: "#003087",
    GLAS: "#003087",
    GLA: "#003087",
    CARD: "#003087",
    CAR: "#003087",
    OSP: "#1B2A4A",
    SCAR: "#E31837",
    DRAG: "#FFD700",
    DRA: "#FFD700",
    BAT: "#003B7A",
    DEFAULT: "#4A5568",
  };
  const resolved = resolveModernBadge(badge);
  return colours[resolved] ?? colours[badge] ?? colours.DEFAULT;
}

export function getTextColourForBadge(badge: string): string {
  const resolved = resolveModernBadge(badge);
  const lightKits = ["ENG", "AUS"];
  return lightKits.includes(resolved) || lightKits.includes(badge)
    ? "#000000"
    : "#FFFFFF";
}

export function buildLeagueTable(clubs: string[]): LeagueTableRow[] {
  return clubs.map((club) => ({
    club,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    pointsDifference: 0,
    tries: 0,
    bonusPoints: 0,
    points: 0,
  }));
}

function calculateBonusPoints(
  tries: number,
  pointsFor: number,
  pointsAgainst: number,
  won: boolean,
  drawn: boolean,
): number {
  let bonus = 0;
  if (tries >= 4) bonus += 1;
  if (!won && !drawn && pointsAgainst - pointsFor <= 7) bonus += 1;
  return bonus;
}

export function updateTableWithResult(
  table: LeagueTableRow[],
  result: MatchResult,
): LeagueTableRow[] {
  const homeTries = result.homeTries ?? 0;
  const awayTries = result.awayTries ?? 0;
  const homeWon = result.homeScore > result.awayScore;
  const awayWon = result.awayScore > result.homeScore;
  const drawn = result.homeScore === result.awayScore;

  return table.map((row) => {
    if (row.club === result.homeTeam) {
      const won = homeWon;
      const lost = awayWon;
      return {
        ...row,
        played: row.played + 1,
        won: row.won + (won ? 1 : 0),
        drawn: row.drawn + (drawn ? 1 : 0),
        lost: row.lost + (lost ? 1 : 0),
        pointsFor: row.pointsFor + result.homeScore,
        pointsAgainst: row.pointsAgainst + result.awayScore,
        pointsDifference:
          row.pointsDifference + (result.homeScore - result.awayScore),
        tries: row.tries + homeTries,
        bonusPoints:
          row.bonusPoints +
          calculateBonusPoints(
            homeTries,
            result.homeScore,
            result.awayScore,
            won,
            drawn,
          ),
        points: row.points + (won ? 4 : drawn ? 2 : 0),
      };
    }
    if (row.club === result.awayTeam) {
      const won = awayWon;
      const lost = homeWon;
      return {
        ...row,
        played: row.played + 1,
        won: row.won + (won ? 1 : 0),
        drawn: row.drawn + (drawn ? 1 : 0),
        lost: row.lost + (lost ? 1 : 0),
        pointsFor: row.pointsFor + result.awayScore,
        pointsAgainst: row.pointsAgainst + result.homeScore,
        pointsDifference:
          row.pointsDifference + (result.awayScore - result.homeScore),
        tries: row.tries + awayTries,
        bonusPoints:
          row.bonusPoints +
          calculateBonusPoints(
            awayTries,
            result.awayScore,
            result.homeScore,
            won,
            drawn,
          ),
        points: row.points + (won ? 4 : drawn ? 2 : 0),
      };
    }
    return row;
  });
}

export function getTotalTablePoints(row: LeagueTableRow): number {
  return row.points + row.bonusPoints;
}

export function sortTable(table: LeagueTableRow[]): LeagueTableRow[] {
  return [...table].sort((a, b) => {
    const aTotal = getTotalTablePoints(a);
    const bTotal = getTotalTablePoints(b);
    if (bTotal !== aTotal) return bTotal - aTotal;
    if (b.pointsDifference !== a.pointsDifference)
      return b.pointsDifference - a.pointsDifference;
    return b.pointsFor - a.pointsFor;
  });
}

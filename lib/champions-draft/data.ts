import modernSquadsRaw from "@/data/champions-draft/modern-squads.json";
import historicalSquadsRaw from "@/data/champions-draft/historical-squads.json";
import additionalSquadsRaw from "@/data/champions-draft/additional-wc-squads.json";
import additionalNationsRaw from "@/data/champions-draft/additional-wc-nations.json";
import type {
  Squad,
  League,
  GameMode,
  WCDraftMode,
} from "@/types/champions-draft";

const modernData = modernSquadsRaw as { squads: Squad[] };
const historicalData = historicalSquadsRaw as { squads: Squad[] };
const additionalSquadsData = additionalSquadsRaw as {
  additional_squads: Squad[];
};
const additionalNationsData = additionalNationsRaw as {
  additional_nations: Squad[];
};

function mergeSquadsByClub(primary: Squad[], extra: Squad[]): Squad[] {
  const byClub = new Map<string, Squad>();
  for (const squad of primary) byClub.set(squad.club, squad);
  for (const squad of extra) {
    if (!byClub.has(squad.club)) byClub.set(squad.club, squad);
  }
  return Array.from(byClub.values());
}

const EXCLUDED_CLUBS = ["Dynamo Kyiv", "Shakhtar Donetsk"];

export const ALL_MODERN_SQUADS: Squad[] = (modernData.squads ?? []).filter(
  (s) => !EXCLUDED_CLUBS.includes(s.club),
);

export const ALL_HISTORICAL_SQUADS: Squad[] = historicalData.squads ?? [];

export const ALL_SQUADS: Squad[] = [
  ...ALL_HISTORICAL_SQUADS,
  ...ALL_MODERN_SQUADS,
];

export const LEAGUE_SQUADS: Record<string, Squad[]> = {
  "Premier League": ALL_MODERN_SQUADS.filter(
    (s) => s.league === "Premier League",
  ),
  "La Liga": ALL_MODERN_SQUADS.filter((s) => s.league === "La Liga"),
  Bundesliga: ALL_MODERN_SQUADS.filter((s) => s.league === "Bundesliga"),
  "Serie A": ALL_MODERN_SQUADS.filter((s) => s.league === "Serie A"),
  "Ligue 1": ALL_MODERN_SQUADS.filter((s) => s.league === "Ligue 1"),
};

export const ADDITIONAL_WC_SQUADS: Squad[] =
  additionalSquadsData.additional_squads ?? [];

export const ADDITIONAL_WC_NATIONS: Squad[] =
  additionalNationsData.additional_nations ?? [];

const BASE_WORLD_CUP_NATIONS: Squad[] = ALL_MODERN_SQUADS.filter(
  (s) => s.league === "World Cup",
);

export const WORLD_CUP_NATIONS: Squad[] = mergeSquadsByClub(
  BASE_WORLD_CUP_NATIONS,
  ADDITIONAL_WC_NATIONS,
);

export const WC_NATIONAL_DRAFT_POOL: Squad[] = [
  ...ALL_HISTORICAL_SQUADS,
  ...ADDITIONAL_WC_SQUADS,
];

export const CHAMPIONS_LEAGUE_CLUBS: Squad[] = ALL_MODERN_SQUADS.filter((s) =>
  ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"].includes(
    s.league,
  ),
);

export const DRAFT_POOL: Squad[] = ALL_HISTORICAL_SQUADS;

export const AVAILABLE_LEAGUES = [
  { id: "Premier League", label: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "La Liga", label: "La Liga", flag: "🇪🇸" },
  { id: "Bundesliga", label: "Bundesliga", flag: "🇩🇪" },
  { id: "Serie A", label: "Serie A", flag: "🇮🇹" },
  { id: "Ligue 1", label: "Ligue 1", flag: "🇫🇷" },
];

export const NATION_TO_NATIONALITY: Record<string, string> = {
  France: "French",
  England: "English",
  Brazil: "Brazilian",
  Argentina: "Argentinian",
  Spain: "Spanish",
  Germany: "German",
  Portugal: "Portuguese",
  Italy: "Italian",
  Netherlands: "Dutch",
  Belgium: "Belgian",
  Uruguay: "Uruguayan",
  Croatia: "Croatian",
};

export const NATIONAL_PLAYER_COUNTS: Record<string, number> =
  Object.fromEntries(
    Object.entries(NATION_TO_NATIONALITY).map(([nation, nationality]) => {
      const count = WC_NATIONAL_DRAFT_POOL.flatMap((s) => s.players).filter(
        (p) => p.nationality === nationality,
      ).length;
      return [nation, count];
    }),
  );

export const LIMITED_NATIONAL_POOL_THRESHOLD = 30;

export const AVAILABLE_NATIONS = [
  { id: "France", label: "France", flag: "🇫🇷" },
  { id: "England", label: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "Brazil", label: "Brazil", flag: "🇧🇷" },
  { id: "Argentina", label: "Argentina", flag: "🇦🇷" },
  { id: "Spain", label: "Spain", flag: "🇪🇸" },
  { id: "Germany", label: "Germany", flag: "🇩🇪" },
  { id: "Portugal", label: "Portugal", flag: "🇵🇹" },
  { id: "Italy", label: "Italy", flag: "🇮🇹" },
  { id: "Netherlands", label: "Netherlands", flag: "🇳🇱" },
  { id: "Belgium", label: "Belgium", flag: "🇧🇪" },
  { id: "Uruguay", label: "Uruguay", flag: "🇺🇾" },
  { id: "Croatia", label: "Croatia", flag: "🇭🇷" },
];

export function getNationalityForNation(nationId: string): string | null {
  return NATION_TO_NATIONALITY[nationId] ?? null;
}

export function getDraftPool(
  mode: GameMode | null,
  wcDraftMode: WCDraftMode | null,
): Squad[] {
  if (mode === "world-cup" && wcDraftMode === "national") {
    return WC_NATIONAL_DRAFT_POOL;
  }
  return DRAFT_POOL;
}

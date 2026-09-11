import "server-only";

import type {
  DraftBootstrap,
  DraftLive,
  ElementStatusResponse,
  EntryPicks,
  EntryPublic,
  Fixture,
  FplBootstrap,
  GameState,
  LeagueDetails,
  SetPieceNotes,
  ElementSummary,
  Transaction,
} from "./types";

const DRAFT_BASE = "https://draft.premierleague.com/api";
const FPL_BASE = "https://fantasy.premierleague.com/api";
const USER_AGENT = "RDevStudio-FPL-Draft-Analyser/1.0 (+https://rdevstudio.co.uk)";
const TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 3;

export class FplApiError extends Error {
  constructor(
    message: string,
    readonly endpoint: string,
    readonly status: number | null,
    readonly attempts: number,
  ) {
    super(message);
    this.name = "FplApiError";
  }
}

type MemoEntry = { expires: number; promise: Promise<unknown> };
const memo = new Map<string, MemoEntry>();
const MEMO_TTL_MS = 5_000;

function memoKey(url: string): string {
  return url;
}

function getMemo<T>(key: string): Promise<T> | null {
  const entry = memo.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    memo.delete(key);
    return null;
  }
  return entry.promise as Promise<T>;
}

function setMemo<T>(key: string, promise: Promise<T>): Promise<T> {
  memo.set(key, { expires: Date.now() + MEMO_TTL_MS, promise });
  return promise;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson<T>(base: string, path: string): Promise<T> {
  const url = `${base}${path}`;
  const key = memoKey(url);
  const cached = getMemo<T>(key);
  if (cached) return cached;

  const run = async (): Promise<T> => {
    let lastStatus: number | null = null;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const res = await fetch(url, {
          headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
          next: { revalidate: 0 },
          signal: controller.signal,
        });
        lastStatus = res.status;

        if (res.status >= 400 && res.status < 500) {
          throw new FplApiError(
            `FPL API client error: ${res.status} ${res.statusText}`,
            path,
            res.status,
            attempt,
          );
        }

        if (!res.ok) {
          if (attempt < MAX_ATTEMPTS) {
            await sleep(250 * 2 ** (attempt - 1));
            continue;
          }
          throw new FplApiError(
            `FPL API server error: ${res.status} ${res.statusText}`,
            path,
            res.status,
            attempt,
          );
        }

        return (await res.json()) as T;
      } catch (err) {
        if (err instanceof FplApiError) throw err;

        const isAbort = err instanceof Error && err.name === "AbortError";
        const message = isAbort ? "Request timed out" : "Network error";

        if (attempt < MAX_ATTEMPTS) {
          await sleep(250 * 2 ** (attempt - 1));
          continue;
        }

        throw new FplApiError(
          `${message} fetching ${path}`,
          path,
          lastStatus,
          attempt,
        );
      } finally {
        clearTimeout(timer);
      }
    }

    throw new FplApiError(`Failed to fetch ${path}`, path, lastStatus, MAX_ATTEMPTS);
  };

  return setMemo(key, run());
}

// ── Draft API ────────────────────────────────────────────────────────────────

export function getDraftBootstrap(): Promise<DraftBootstrap> {
  return fetchJson<DraftBootstrap>(DRAFT_BASE, "/bootstrap-static");
}

export function getGameState(): Promise<GameState> {
  return fetchJson<GameState>(DRAFT_BASE, "/game");
}

export function getLeagueDetails(leagueId: number): Promise<LeagueDetails> {
  return fetchJson<LeagueDetails>(DRAFT_BASE, `/league/${leagueId}/details`);
}

export function getElementStatus(leagueId: number): Promise<ElementStatusResponse> {
  return fetchJson<ElementStatusResponse>(DRAFT_BASE, `/league/${leagueId}/element-status`);
}

export function getTransactions(leagueId: number): Promise<Transaction[]> {
  return fetchJson<Transaction[]>(DRAFT_BASE, `/draft/league/${leagueId}/transactions`);
}

export function getEntryPicks(entryId: number, event: number): Promise<EntryPicks> {
  return fetchJson<EntryPicks>(DRAFT_BASE, `/entry/${entryId}/event/${event}`);
}

export function getEntryPublic(entryId: number): Promise<EntryPublic> {
  return fetchJson<EntryPublic>(DRAFT_BASE, `/entry/${entryId}/public`);
}

export function getDraftLive(event: number): Promise<DraftLive> {
  return fetchJson<DraftLive>(DRAFT_BASE, `/event/${event}/live`);
}

// ── Main FPL API ─────────────────────────────────────────────────────────────

export function getFplBootstrap(): Promise<FplBootstrap> {
  return fetchJson<FplBootstrap>(FPL_BASE, "/bootstrap-static/");
}

export function getFixtures(event?: number): Promise<Fixture[]> {
  const path = event != null ? `/fixtures/?event=${event}` : "/fixtures/";
  return fetchJson<Fixture[]>(FPL_BASE, path);
}

export function getElementSummary(playerId: number): Promise<ElementSummary> {
  return fetchJson<ElementSummary>(FPL_BASE, `/element-summary/${playerId}/`);
}

export function getSetPieceNotes(): Promise<SetPieceNotes> {
  return fetchJson<SetPieceNotes>(FPL_BASE, "/team/set-piece-notes/");
}

export type ChangeEvent = {
  playerId: number;
  field: "status" | "news" | "chance_this" | "chance_next";
  from: string | number | null;
  to: string | number | null;
  at: string;
};

export type SnapshotRow = {
  playerId: number;
  at: string;
  status: string | null;
  news: string | null;
  chanceThis: number | null;
  chanceNext: number | null;
};

export function changesBetween(older: SnapshotRow, newer: SnapshotRow): ChangeEvent[] {
  const events: ChangeEvent[] = [];
  if (older.status !== newer.status) {
    events.push({ playerId: newer.playerId, field: "status", from: older.status, to: newer.status, at: newer.at });
  }
  if ((older.news ?? "") !== (newer.news ?? "")) {
    events.push({ playerId: newer.playerId, field: "news", from: older.news, to: newer.news, at: newer.at });
  }
  if (older.chanceThis !== newer.chanceThis) {
    events.push({
      playerId: newer.playerId,
      field: "chance_this",
      from: older.chanceThis,
      to: newer.chanceThis,
      at: newer.at,
    });
  }
  if (older.chanceNext !== newer.chanceNext) {
    events.push({
      playerId: newer.playerId,
      field: "chance_next",
      from: older.chanceNext,
      to: newer.chanceNext,
      at: newer.at,
    });
  }
  return events;
}

const STATUS_LABEL: Record<string, string> = {
  a: "available",
  d: "a doubt",
  i: "injured",
  s: "suspended",
  u: "unavailable",
  n: "out of the squad",
};

export function describeChange(event: ChangeEvent): string {
  if (event.field === "status") {
    if (event.to === "a") return "Cleared to play";
    if (event.to === "d") return "Flagged: doubt";
    if (event.to === "i") return "Flagged: injured";
    if (event.to === "s") return "Flagged: suspended";
    return `Status moved from ${STATUS_LABEL[String(event.from)] ?? event.from ?? "blank"} to ${STATUS_LABEL[String(event.to)] ?? event.to ?? "blank"}`;
  }
  if (event.field === "news") {
    if (!event.to) return "The official news note was cleared";
    return `News: ${event.to}`;
  }
  const which = event.field === "chance_this" ? "this round" : "next round";
  if (event.from == null) return `Chance of playing ${which} set to ${event.to}%`;
  if (event.to == null) return `Chance of playing ${which} was removed`;
  const from = Number(event.from);
  const to = Number(event.to);
  const verb = to > from ? "rose" : "fell";
  return `Chance of playing ${which} ${verb} from ${from}% to ${to}%`;
}

export type DeadlineSquadMember = {
  pickPosition: number;
  availabilityScore: number;
  nextFixture: unknown | null;
};

export function deadlineFlags(squad: DeadlineSquadMember[]): string[] {
  const xi = squad.filter((p) => p.pickPosition <= 11);
  const flags: string[] = [];
  if (xi.length < 11) flags.push("XI is short of 11");
  if (xi.some((p) => p.availabilityScore < 40)) flags.push("a red-flagged starter");
  if (xi.some((p) => p.availabilityScore < 75 && p.availabilityScore >= 40)) flags.push("an amber starter");
  if (xi.some((p) => p.nextFixture == null)) flags.push("someone with no fixture");
  return flags;
}

/** Daily Hobby cron fires around 06:00 UTC. Catch deadlines in the next day
 * without also firing in the last 90 minutes (the in-page notifier covers that). */
export function inDeadlineAlertWindow(deadlineIso: string | null, now = Date.now()): boolean {
  if (!deadlineIso) return false;
  const hours = (new Date(deadlineIso).getTime() - now) / 3_600_000;
  return hours > 1.5 && hours <= 24;
}

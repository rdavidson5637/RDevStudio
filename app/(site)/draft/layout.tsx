import { DraftSubNav } from "@/components/draft/DraftSubNav";
import { DataFreshness } from "@/components/draft/DataFreshness";
import { DeadlineCountdown } from "@/components/draft/DeadlineCountdown";
import { DeadlineWarning } from "@/components/draft/DeadlineWarning";
import { DeadlineNotifier } from "@/components/draft/DeadlineNotifier";
import { deadlineFlags } from "@/lib/draft/deadline";
import { getCurrentEvent, getDataFreshness } from "@/lib/draft/queries";
import { getSquad } from "@/lib/draft/squad";

export default async function DraftLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [event, freshness] = await Promise.all([getCurrentEvent(), getDataFreshness()]);

  let flags: string[] = [];
  if (event) {
    try {
      const entryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
      flags = deadlineFlags(await getSquad(entryId, event.id));
    } catch {
      flags = [];
    }
  }

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-6">
          <p className="shell-label mb-3 text-accent">RDEV STUDIO / DRAFT ANALYSER</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="programme-h1 text-[2.5rem] sm:text-[3.5rem]">DRAFT</h1>
            <div className="flex flex-col gap-1 sm:items-end">
              <span className="shell-label text-secondary">
                {event ? event.name.toUpperCase() : "GAMEWEEK - TBC"}
              </span>
              <DeadlineCountdown deadline={event?.nextDeadlineTime ?? null} />
              <DataFreshness timestamp={freshness} />
            </div>
          </div>
          <DeadlineWarning flags={flags} />
          <DeadlineNotifier deadline={event?.nextDeadlineTime ?? null} flags={flags} />
          <div className="mt-6">
            <DraftSubNav />
          </div>
        </header>

        <div className="py-8">{children}</div>
      </div>
    </div>
  );
}

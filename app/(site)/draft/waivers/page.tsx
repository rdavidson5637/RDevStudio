import { WaiverBoard } from "@/components/analyser/waiver-board";
import { getAnalyser } from "@/lib/analyser/data/load";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Draft waivers",
  description: "Every free agent in Academy FC, ranked on the next three and six gameweeks, with the drop from your squad.",
  path: "/draft/waivers",
});

export default async function Page() {
  let data;
  try {
    data = await getAnalyser();
  } catch {
    return <p className="t-body measure">The sheet is waiting on a sync.</p>;
  }
  return (
    <div className="stack">
      <header>
        <p className="t-label soft">Waiver {data.me.waiver ?? "-"}</p>
        <h1 className="t-title">Free agents in this league</h1>
        <p className="t-body measure soft">
          Available means nobody in Academy FC owns them. Projections are the model on the method page, not the official ep_next. You hold waiver {data.me.waiver ?? "an unknown slot"}.
        </p>
      </header>
      {data.gapPlayers.length > 0 ? (
        <p className="t-small soft">
          Biggest gaps versus FPL's own ep_next: {data.gapPlayers.map((player) => player.name).join(", ")}.
        </p>
      ) : null}
      {data.rising.length > 0 ? (
        <p className="t-small soft">
          Availability up in the last 72 hours: {data.rising.map((player) => player.name).join(", ")}.
        </p>
      ) : null}
      <WaiverBoard players={data.freeAgents} squad={data.me.squad} horizon={data.horizon} />
    </div>
  );
}

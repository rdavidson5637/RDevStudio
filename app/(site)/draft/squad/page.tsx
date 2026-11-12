import { SquadBoard } from "@/components/analyser/squad-board";
import { getAnalyser } from "@/lib/analyser/data/load";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Draft squad",
  description: "Saliba Dooby Doo as a teamsheet, with the best legal XI and the points left on the bench.",
  path: "/draft/squad",
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
        <p className="t-label soft">{data.me.name}</p>
        <h1 className="t-title">The 15, and the side that scores more</h1>
        <p className="t-body measure soft">
          Projected XI {data.me.projected.toFixed(1)}. {data.me.reds} red flags. Bench is ordered by projected points, which is the autosub order.
        </p>
      </header>
      <SquadBoard squad={data.me.squad} deadlinePassed={data.deadlinePassed} />
    </div>
  );
}

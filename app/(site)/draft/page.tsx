import { Desk } from "@/components/analyser/desk";
import { getAnalyser } from "@/lib/analyser/data/load";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Draft desk",
  description: "Academy FC draft desk: the table, flags, the next waiver and your six gameweeks.",
  path: "/draft",
});

export default async function Page() {
  try {
    const data = await getAnalyser();
    return <Desk data={data} />;
  } catch {
    return <p className="t-body measure">The sheet is waiting on a sync. Once the database has players, this page fills in.</p>;
  }
}

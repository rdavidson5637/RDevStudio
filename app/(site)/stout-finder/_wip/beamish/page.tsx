import { StoutFinder } from "@/components/stout-finder/StoutFinder";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Where to get Beamish in Belfast and Antrim",
  description:
    "Pubs in County Antrim and County Down reported to pour Beamish, with last-confirmed dates.",
  path: "/stout-finder/beamish",
});

export default function BeamishPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">STOUT FINDER</p>
          <h1 className="programme-h1">BEAMISH</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Where to get Beamish in Antrim and Down, ranked by how recently
            someone confirmed it.
          </p>
        </header>
        <div className="mt-10">
          <StoutFinder defaultDrinks={["beamish"]} />
        </div>
        <OsmCredit className="mt-12" />
      </div>
    </div>
  );
}

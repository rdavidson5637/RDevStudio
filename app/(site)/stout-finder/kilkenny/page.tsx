import { StoutFinder } from "@/components/stout-finder/StoutFinder";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Where to get Kilkenny in Antrim and Down",
  description:
    "Pubs in County Antrim and County Down reported to pour Kilkenny, with last-confirmed dates.",
  path: "/stout-finder/kilkenny",
});

export default function KilkennyPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">STOUT FINDER</p>
          <h1 className="programme-h1">KILKENNY</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Where to get Kilkenny in Antrim and Down, nearest first. Only pubs
            with a Kilkenny report are listed.
          </p>
        </header>
        <div className="mt-10">
          <StoutFinder defaultDrinks={["kilkenny"]} />
        </div>
        <OsmCredit className="mt-12" />
      </div>
    </div>
  );
}

import { StoutFinder } from "@/components/stout-finder/StoutFinder";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Guinness near you in Antrim and Down",
  description:
    "Guinness as a fallback and a compare tool, not a headline. Filter pubs in Antrim and Down by last-confirmed date.",
  path: "/stout-finder/guinness",
});

export default function GuinnessPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">STOUT FINDER</p>
          <h1 className="programme-h1">GUINNESS</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Most pubs here pour Guinness. Use this when Beamish is not nearby,
            or pair it with another stout in ALL mode.
          </p>
        </header>
        <div className="mt-10">
          <StoutFinder defaultDrinks={["guinness"]} />
        </div>
        <OsmCredit className="mt-12" />
      </div>
    </div>
  );
}

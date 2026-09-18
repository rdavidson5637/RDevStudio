import { StoutFinder } from "@/components/stout-finder/StoutFinder";
import { OsmCredit } from "@/components/stout-finder/OsmCredit";
import { createPageMetadata } from "@/lib/metadata";
import type { Drink } from "@/lib/stout-finder/types";

export function DrinkFinderPage({
  drink,
  title,
  description,
  heading,
  path,
}: {
  drink: Drink;
  title: string;
  description: string;
  heading: string;
  path: string;
}) {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">ANTRIM AND DOWN</p>
          <h1 className="programme-h1">{heading}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
            {description}
          </p>
        </header>
        <div className="mt-10">
          <StoutFinder defaultDrinks={[drink]} />
        </div>
        <OsmCredit className="mt-12" />
      </div>
    </div>
  );
}

export function drinkFinderMetadata(
  title: string,
  description: string,
  path: string,
) {
  return createPageMetadata({ title, description, path });
}

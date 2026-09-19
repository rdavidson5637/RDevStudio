import Link from "next/link";
import { formatLastSeen } from "@/lib/stout-finder/confidence";
import { DRINKS, type Drink } from "@/lib/stout-finder/types";
import type { RecentConfirmation } from "@/lib/stout-finder/queries";

function drinkLabel(drink: Drink): string {
  return DRINKS.find((item) => item.id === drink)?.label ?? drink;
}

export function StoutExplainer({
  pubCount,
  confirmedBeamish,
  recent,
}: {
  pubCount: number;
  confirmedBeamish: number;
  recent: RecentConfirmation[];
}) {
  return (
    <section className="mt-16 space-y-12 border-t border-border pt-12">
      <div>
        <p className="shell-label mb-3 text-accent">HOW IT WORKS</p>
        <h2 className="font-display text-3xl uppercase tracking-tight text-primary">
          Dates, not vibes
        </h2>
        <div className="mt-4 max-w-2xl space-y-3 text-base leading-relaxed text-secondary">
          <p>Reports come from people who drank there, not from a brand list.</p>
          <p>A confirmation from last week beats a report from last year. Kegs get dropped.</p>
          <p>Anyone can confirm a pub in two taps. No account form.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[10px] border border-border bg-raised p-5">
          <p className="shell-label text-accent">PUBS LISTED</p>
          <p className="mt-2 font-display text-4xl uppercase text-primary">{pubCount}</p>
        </div>
        <div className="rounded-[10px] border border-border bg-raised p-5">
          <p className="shell-label text-accent">CONFIRMED BEAMISH</p>
          <p className="mt-2 font-display text-4xl uppercase text-primary">
            {confirmedBeamish}
          </p>
        </div>
      </div>

      {recent.length > 0 ? (
        <div>
          <p className="shell-label mb-3 text-accent">RECENTLY CONFIRMED</p>
          <ul className="divide-y divide-border rounded-[10px] border border-border bg-raised">
            {recent.map((item) => (
              <li key={`${item.slug}-${item.drink}-${item.lastConfirmedAt}`}>
                <Link
                  href={`/stout-finder/${item.slug}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 hover:bg-overlay"
                >
                  <span className="text-primary">
                    {drinkLabel(item.drink)} at {item.name}
                    {item.town ? `, ${item.town}` : ""}
                  </span>
                  <span className="text-xs text-secondary">
                    {formatLastSeen(item.lastConfirmedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

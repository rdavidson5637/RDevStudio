import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { GAMES_CATALOG, type GameCatalogEntry } from "@/lib/games-catalog";

export const metadata = createPageMetadata({
  title: "Games",
  description:
    "Free browser games built by Ryan Davidson. No ads, no sign-up, no mercy.",
  path: "/games",
});

const BENCH = [
  {
    href: "/games/longest-word",
    label: "Longest Word",
    description:
      "Daily 4x4 letter grid. Same sixteen letters for everyone, new set at midnight.",
    soon: false,
  },
] as const;

function GameCard({ game, index }: { game: GameCatalogEntry; index: number }) {
  const imageFirst = index % 2 === 0;

  return (
    <article className="work-card-lift overflow-hidden rounded-[10px] border border-border-strong bg-raised">
      <div className="grid gap-0 lg:grid-cols-2 lg:items-stretch">
        <div
          className={`relative border-border-strong p-5 sm:p-6 ${
            imageFirst
              ? "border-b lg:border-b-0 lg:border-r"
              : "border-b lg:order-2 lg:border-b-0 lg:border-l"
          }`}
        >
          <div className="relative h-56 w-full overflow-hidden rounded-md border border-border bg-base sm:h-72">
            <Image
              src={game.screenshotSrc}
              alt={`${game.title} game preview`}
              fill
              loading={index === 0 ? undefined : "lazy"}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="shell-label mt-3 text-secondary">
            {game.screenshotCaption}
          </p>
        </div>

        <div
          className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${
            imageFirst ? "" : "lg:order-1"
          }`}
        >
          <div
            className="pointer-events-none mb-5 h-1 w-12 bg-accent"
            aria-hidden="true"
          />
          <h2 className="font-display text-3xl uppercase leading-tight tracking-tight text-primary sm:text-4xl">
            {game.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
            {game.description}
          </p>
          <p className="shell-label mt-5 text-accent">{game.meta}</p>
          <Link
            href={game.href}
            className="mt-8 inline-flex w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-[#d22b2b]"
          >
            Play →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function GamesPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">EXTRA TIME</p>
          <h1 className="programme-h1">GAMES</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Free browser games I build for fun. No ads, no sign-up, no mercy.
          </p>
        </header>

        <section className="space-y-10 border-b border-border py-4">
          {GAMES_CATALOG.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </section>

        <section className="border-t border-border pt-10">
          <p className="shell-label mb-2 text-accent">ALSO ON THE BENCH</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {BENCH.map((item) => (
              <li
                key={item.href}
                className="rounded-[10px] border border-border bg-raised p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-primary">{item.label}</p>
                  <span
                    className={`shrink-0 rounded-full border border-border-strong bg-base px-2.5 py-0.5 text-xs font-semibold ${
                      item.soon ? "text-tertiary" : "text-accent"
                    }`}
                  >
                    {item.soon ? "Coming soon" : "Play now"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-3 inline-block text-sm font-semibold text-accent underline-offset-2 hover:underline"
                >
                  {item.soon ? "Have a look →" : "Open →"}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border pt-10">
          <p className="shell-label mb-2 text-accent">PROJECTS</p>
          <p className="max-w-2xl text-base leading-relaxed text-secondary">
            Draft Analyser, Stout Finder, Guitar Lab, and Gig Radar are
            personal builds, not games.
          </p>
          <Link
            href="/projects"
            className="mt-4 inline-flex text-sm font-semibold text-accent underline-offset-2 hover:underline"
          >
            See projects →
          </Link>
        </section>
      </div>
    </div>
  );
}

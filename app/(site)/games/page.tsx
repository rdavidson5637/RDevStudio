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
          {game.attendance != null ? (
            <p className="shell-label mt-2 text-secondary">
              ATTENDANCE — {game.attendance.toLocaleString("en-GB")} PLAYERS
            </p>
          ) : null}
          <Link
            href={game.href}
            className="mt-8 inline-flex w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-base transition-colors hover:bg-[#d22b2b]"
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
          <p className="shell-label mb-2 text-accent">NEXT SIGNING</p>
          <p className="text-base leading-relaxed text-secondary sm:text-lg">
            Something new is in pre-season. Back soon.
          </p>
        </section>
      </div>
    </div>
  );
}

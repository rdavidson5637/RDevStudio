import Link from "next/link";
import { ChampionsDraftCover } from "@/components/covers/ChampionsDraftCover";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-studio items-center gap-10 px-6 md:px-8 lg:grid-cols-2">
        <div>
          <h1 className="display-xl max-w-[16ch] text-balance text-studio-text">
            Websites for businesses and charities in Northern Ireland
          </h1>
          <p className="type-body mt-6 max-w-prose text-studio-muted">
            I&apos;m Ryan, one person in Carrickfergus doing the whole job, from the first chat to launch. The games I make for my mates are on the pitch.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/contact">Get a quote</Button>
            <Button href="#games" variant="secondary">
              Pick a game
            </Button>
          </div>
        </div>
        <Link href="/champions-draft" className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text">
          <ChampionsDraftCover full />
          <p className="mt-3 text-sm text-studio-faint">Champions Draft. Spin squads, draft your XI.</p>
        </Link>
      </div>
    </section>
  );
}

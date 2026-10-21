import Image from "next/image";
import { StoutFinderMock } from "@/components/home/StoutFinderMock";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { STOUT_FINDER } from "@/lib/constants";

const POINTS = [
  {
    title: "Every report is dated",
    body: "A yes inside 90 days means on. Inside a year, probably on. Older than that, it says it has not been seen in a while.",
  },
  {
    title: "Nothing fades by schedule",
    body: "The page works out how stale a report is when you open it, so an old yes is never shown as a fresh one.",
  },
  {
    title: "The pubs come from OpenStreetMap",
    body: "Anyone can add a pub that is missing. Sign-in is anonymous, and there are limits on how fast one person can report.",
  },
] as const;

export function StoutFinderHonest() {
  return (
    <Section heading="How Stout Finder stays honest">
      <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <ul className="border-t border-studio-line">
            {POINTS.map((point) => (
              <li key={point.title} className="border-b border-studio-line py-5">
                <h3 className="font-studio-display text-2xl text-studio-text">{point.title}</h3>
                <p className="type-body mt-2 max-w-prose text-studio-muted">{point.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={STOUT_FINDER.href} variant="secondary">
              Try it at stoutfinder.com
            </Button>
          </div>
        </div>
        <div className="rounded-sm bg-studio-surface px-4 py-10 sm:px-10">
          <StoutFinderMock />
        </div>
      </div>
      <figure className="mt-12">
        <div className="overflow-hidden rounded-sm border border-studio-border-strong">
          <Image
            src="/images/stout-finder/pub-1280.png"
            alt="A Stout Finder pub page for Ownie's in Carrickfergus: Beamish and Kilkenny on, last checked 3 days ago, with a map below"
            width={1280}
            height={800}
            sizes="(max-width: 1280px) 100vw, 1136px"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm text-studio-faint">A pub page from the live app.</figcaption>
      </figure>
    </Section>
  );
}

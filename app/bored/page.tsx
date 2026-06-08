import { LongestWord } from "@/components/games/LongestWord";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "I'm Bored",
  description:
    "Quick web games built by RDev Studio. New daily grid every day — find the longest word.",
  path: "/bored",
});

export default function BoredPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-base pt-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgb(245_158_11/0.06)_0%,transparent_55%)]"
          aria-hidden="true"
        />
        <div className="section-padding relative pb-12 sm:pb-16">
          <div className="container-wide mx-auto max-w-4xl">
            <p className="section-label">I&apos;m Bored</p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Games built for when you&apos;ve got five minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl">
              A growing collection of quick daily games. No accounts, no scores,
              just something to do.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-base">
        <div className="container-wide">
          <LongestWord />
        </div>
      </section>
    </>
  );
}

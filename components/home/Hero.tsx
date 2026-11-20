import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DRAFT_CTAS, DRAFT_HERO } from "@/lib/content/redesign-draft";
import coldBrewHero from "@/public/work/rvs-cold-brew-hero.webp";

/**
 * Home hero: name-as-monument composition with a one-time load entrance.
 * Brand spans the content width; offer and CTA sit under it;
 * RV's Cold Brew screenshot is the real work proof on the right (stacked below on small screens).
 * Agent-written layout - treat as unverified until Ryan has checked it.
 */
export function Hero() {
  return (
    <section className="hero-enter relative border-b border-studio-line">
      <div className="mx-auto max-w-studio px-6 md:px-8">
        <div className="flex min-h-[min(92svh,54rem)] flex-col justify-end gap-10 pb-12 pt-14 md:gap-12 md:pb-16 md:pt-16 lg:min-h-[min(90svh,58rem)] lg:justify-between lg:pb-20 lg:pt-10">
          <p
            className="hero-enter-item display-xl max-w-full text-studio-text"
            style={{ ["--hero-enter-delay" as string]: "0ms" }}
            aria-hidden="true"
          >
            RDev Studio
          </p>

          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <div>
              <h1
                className="hero-enter-item display-lg max-w-[16ch] text-balance text-studio-text"
                style={{ ["--hero-enter-delay" as string]: "90ms" }}
              >
                {DRAFT_HERO.h1}
              </h1>
              <p
                className="hero-enter-item type-body mt-5 max-w-prose text-studio-muted md:mt-6"
                style={{ ["--hero-enter-delay" as string]: "160ms" }}
              >
                {DRAFT_HERO.support}
              </p>
              <div
                className="hero-enter-item mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
                style={{ ["--hero-enter-delay" as string]: "220ms" }}
              >
                <Button href="/contact">{DRAFT_CTAS.primary}</Button>
                <Link
                  href="/work"
                  className="inline-flex min-h-11 items-center text-base font-medium text-studio-text underline decoration-studio-border-strong underline-offset-4 transition-colors hover:text-studio-accent hover:decoration-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
                >
                  {DRAFT_CTAS.secondary}
                </Link>
              </div>
            </div>

            <figure className="hero-enter-item hero-enter-lcp overflow-hidden border border-studio-border bg-studio-surface">
              <Link
                href="/work/rvs-cold-brew"
                aria-label="RV's Cold Brew case study"
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              >
                <div className="flex items-center justify-between border-b border-studio-line px-4 py-2.5 text-xs text-studio-muted">
                  <span>rvscoldbrew.vercel.app</span>
                  <span>Belfast client build</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-studio-surface-2">
                  <Image
                    src={coldBrewHero}
                    placeholder="blur"
                    alt="RV's Cold Brew website showing cold brew and Okumidori matcha at Unit 11, Great Northern Mall, Belfast"
                    fill
                    priority
                    fetchPriority="high"
                    quality={70}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 540px"
                    className="object-cover object-top"
                  />
                </div>
              </Link>
              <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-studio-line px-4 py-3 text-sm">
                <span className="font-bold text-studio-text">RV&apos;s Cold Brew</span>
                <span className="text-studio-faint">
                  Live site - Square is linked and the last details are being finished
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

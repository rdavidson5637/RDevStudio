import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DRAFT_CTAS, DRAFT_HERO } from "@/lib/content/redesign-draft";

export function Hero() {
  return (
    <section className="border-b border-studio-line py-14 md:py-24 lg:py-28">
      <div className="mx-auto max-w-studio px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h1 className="display-xl max-w-[16ch] text-balance text-studio-text">
              {DRAFT_HERO.h1}
            </h1>
            <p className="type-body mt-6 max-w-prose text-studio-muted">
              {DRAFT_HERO.support}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/contact">{DRAFT_CTAS.primary}</Button>
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center text-base font-medium text-studio-text underline decoration-studio-border-strong underline-offset-4 transition-colors hover:text-studio-accent hover:decoration-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              >
                {DRAFT_CTAS.secondary}
              </Link>
            </div>
            <p className="mt-6 text-sm text-studio-muted">
              <Link
                href="/services/charities"
                className="inline-flex min-h-11 items-center underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              >
                {DRAFT_CTAS.charity}
              </Link>
            </p>
          </div>

          <figure className="overflow-hidden border border-studio-border bg-studio-surface">
            <Link
              href="/work/rvs-cold-brew"
              className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
            >
              <div className="flex items-center justify-between border-b border-studio-line px-4 py-2.5 text-xs text-studio-muted">
                <span>rvscoldbrew.vercel.app</span>
                <span>Belfast client build</span>
              </div>
              <div className="relative aspect-[16/10] w-full bg-studio-surface-2">
                <Image
                  src="/work/rvs-cold-brew-desktop.webp"
                  alt="RV's Cold Brew website showing cold brew and Okumidori matcha at Unit 11, Great Northern Mall, Belfast"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
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
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { AVAILABILITY } from "@/lib/constants";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

const SCOREBOARD = [
  { label: "Sites from", value: "£650" },
  { label: "Live in", value: "A week" },
  { label: "Reply in", value: "1 day" },
  { label: "Based", value: "Carrick" },
] as const;

/**
 * The hero shows the offer in plain words on the left and real client work on
 * the right. To lead with Paintball Wales, drop a 1440x900 screenshot of the
 * live site at public/images/work/paintball-wales-site.jpg and swap it into
 * the browser frame below.
 */
export function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-base pb-20 pt-28 md:pb-28 md:pt-32">
      <div className="container-wide relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr,1fr] lg:gap-12">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-raised px-3 py-1">
              <span
                className="h-2 w-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="shell-label text-primary">{AVAILABILITY}</span>
            </p>

            <h1 className="programme-h1 mb-6 text-balance md:text-7xl">
              <span className="hero-line block [animation-delay:0ms]">
                Websites for
              </span>
              <span className="hero-line block [animation-delay:60ms]">
                NI businesses
              </span>
              <span className="hero-line block [animation-delay:120ms]">
                and charities.
              </span>
            </h1>

            <p className="lead-text mb-8 max-w-xl">
              £650 for a five-page site, live in about a week. Designed and
              built by me, Ryan, in Carrickfergus. You deal with one person from
              the first message to launch day, and you own the result.
            </p>

            <dl
              className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4"
              aria-label="Studio scoreboard"
            >
              {SCOREBOARD.map((item) => (
                <div key={item.label} className="bg-base px-4 py-3">
                  <dt className="shell-label text-secondary">{item.label}</dt>
                  <dd className="mt-1 whitespace-nowrap font-display text-2xl uppercase text-primary xl:text-3xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <WhatsAppLink />
              <Link
                href="/work"
                className="px-2 text-sm font-semibold text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
              >
                See the work
              </Link>
            </div>
          </div>

          <HeroWork />
        </div>
      </div>
    </section>
  );
}

function HeroWork() {
  return (
    <div className="relative mx-auto w-full max-w-xl pb-24 sm:pb-28 lg:max-w-none">
      <Link
        href="/work/rvs-cold-brew"
        className="group block overflow-hidden rounded-[10px] border border-border-strong bg-raised transition-colors hover:border-accent"
      >
        <div className="flex items-center gap-1.5 border-b border-border bg-overlay px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" aria-hidden="true" />
          <span className="ml-3 truncate font-mono text-[11px] text-secondary">
            RV&apos;s Cold Brew - live site
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src="/images/work/rvs-coldbrew-hero.jpg"
            alt="RV's Cold Brew homepage, a site I built for a Belfast cold brew and matcha counter"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover object-top"
          />
        </div>
      </Link>

      <Link
        href="/work/paintball-wales"
        className="group absolute bottom-0 left-4 w-[42%] overflow-hidden rounded-[10px] border border-border-strong bg-raised shadow-[0_12px_32px_-12px_rgb(22_21_15/0.35)] transition-colors hover:border-accent sm:-left-6"
      >
        <div className="relative aspect-[4/3]">
          <Image
            src="/images/work/paintball-wales-stag.jpg"
            alt="A group kitted out at Paintball Wales, whose site I rebuilt"
            fill
            sizes="(max-width: 1024px) 50vw, 290px"
            className="object-cover"
          />
        </div>
        <p className="border-t border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
          Paintball Wales - site rebuild
        </p>
      </Link>

      <p className="absolute bottom-3 right-0 max-w-[40%] text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-secondary">
        Real clients.
        <br />
        No templates.
      </p>
    </div>
  );
}

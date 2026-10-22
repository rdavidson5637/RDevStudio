import { Button } from "@/components/ui/Button";
import {
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
  WHATSAPP_URL,
} from "@/lib/constants";

const ROWS = [
  { name: "Website", price: PRICE_WEBSITE_GBP, note: "from" },
  { name: "Care plan", price: PRICE_CARE_PLAN_GBP, note: "a month", detail: "Hosting, security updates, small changes" },
  { name: "Social media", price: PRICE_SOCIAL_GBP, note: "a month, from" },
  { name: "Content", price: PRICE_CONTENT_GBP, note: "a project, from" },
] as const;

export function OfferBand() {
  return (
    <section id="offer" className="studio-ochre scroll-mt-20 py-16 md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-studio gap-12 px-6 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="display-lg max-w-[14ch] text-balance text-studio-text">
            Websites for businesses and charities in Northern Ireland
          </h2>
          <p className="type-body mt-5 max-w-prose text-studio-muted">
            I&apos;m Ryan, one person in Carrickfergus doing the whole job, from the first chat to launch.
          </p>
          <ul className="type-body mt-6 max-w-prose space-y-2 text-studio-text">
            <li>Half up front, half when it goes live.</li>
            <li>The domain, the content and the code are yours.</li>
            <li>Registered charities get every package free. Say you&apos;re registered when you get in touch.</li>
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/contact">Get a quote</Button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-border-strong underline-offset-4 hover:decoration-studio-text"
            >
              WhatsApp me
            </a>
          </div>
        </div>
        <ul className="self-center border-t-2 border-studio-line-strong">
          {ROWS.map((row) => (
            <li key={row.name} className="flex items-end justify-between gap-4 border-b border-studio-line-strong py-5">
              <div>
                <p className="text-lg font-bold text-studio-text">{row.name}</p>
                {"detail" in row ? <p className="mt-1 max-w-xs text-sm text-studio-muted">{row.detail}</p> : null}
              </div>
              <p className="shrink-0 text-right">
                <span className="font-studio-display text-5xl leading-none text-studio-text">£{row.price}</span>
                <span className="mt-1 block text-sm text-studio-muted">{row.note}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

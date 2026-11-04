import Link from "next/link";
import { Scoreboard } from "@/components/pricing/Scoreboard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  CONTENT_CREATION_FEATURES,
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
  PRICING_FEATURES,
  PROCESS_STEPS,
  SOCIAL_MEDIA_FEATURES,
  WHATSAPP_URL,
} from "@/lib/constants";
import { DRAFT_CTAS } from "@/lib/content/redesign-draft";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Websites and services for NI local businesses",
  description:
    "Fixed-price websites from £650, optional £30/mo care plan, social media from £150/mo, and content from £200/project for Northern Ireland small businesses.",
  path: "/services/businesses",
});

export default function LocalBusinessesServicesPage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Section className="border-b border-studio-line">
        <p className="text-sm font-bold text-studio-muted">
          <Link
            href="/services"
            className="underline decoration-studio-line underline-offset-4 hover:text-studio-text"
          >
            Services
          </Link>{" "}
          / Local businesses
        </p>
        <h1 className="display-lg mt-4 max-w-[16ch] text-balance text-studio-text">
          Websites for Northern Ireland small businesses
        </h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Trades firms, coffee counters, restaurants, salons, and independent shops. You get a site built for a phone first, straight prices agreed before work starts, and direct contact with me in Carrickfergus.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="font-studio-display text-3xl text-studio-text">
              Plain terms, no lock-in
            </h2>
            <ul className="mt-4 border-t border-studio-line">
              <li className="border-b border-studio-line py-3.5 text-studio-muted">
                <strong className="text-studio-text">50% upfront, 50% at launch.</strong> You get a written scope and fixed price before paying a penny.
              </li>
              <li className="border-b border-studio-line py-3.5 text-studio-muted">
                <strong className="text-studio-text">You own the lot.</strong> Domain name, text, photos, and code belong to your business outright.
              </li>
              <li className="border-b border-studio-line py-3.5 text-studio-muted">
                <strong className="text-studio-text">No compulsory monthly fee.</strong> Small sites sit on Vercel&apos;s free tier. The £{PRICE_CARE_PLAN_GBP}/month care plan is completely optional.
              </li>
              <li className="border-b border-studio-line py-3.5 text-studio-muted">
                <strong className="text-studio-text">One person accountable.</strong> I design it, build it, and check it on a real phone before launch.
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button href="/contact">{DRAFT_CTAS.primary}</Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
              >
                {DRAFT_CTAS.lowCommitment}
              </a>
            </div>
          </div>

          <div>
            <Scoreboard />
          </div>
        </div>
      </Section>

      <Section
        heading="Packages for small businesses"
        intro="Pick one or combine them. Everything is quoted in writing first."
        className="border-b border-studio-line"
      >
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <article className="border border-studio-border bg-studio-surface p-6">
            <h3 className="font-studio-display text-2xl text-studio-text">
              Standard website build
            </h3>
            <p className="mt-2 font-studio-display text-4xl text-studio-text">
              from £{PRICE_WEBSITE_GBP}
            </p>
            <p className="mt-1 text-sm text-studio-muted">One-off build</p>
            <ul className="mt-5 border-t border-studio-line text-sm">
              {PRICING_FEATURES.map((item) => (
                <li key={item} className="border-b border-studio-line py-2.5 text-studio-muted">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-studio-border bg-studio-surface p-6">
            <h3 className="font-studio-display text-2xl text-studio-text">
              Social media management
            </h3>
            <p className="mt-2 font-studio-display text-4xl text-studio-text">
              from £{PRICE_SOCIAL_GBP}/mo
            </p>
            <p className="mt-1 text-sm text-studio-muted">Monthly calendar and scheduling</p>
            <ul className="mt-5 border-t border-studio-line text-sm">
              {SOCIAL_MEDIA_FEATURES.map((item) => (
                <li key={item} className="border-b border-studio-line py-2.5 text-studio-muted">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-studio-border bg-studio-surface p-6">
            <h3 className="font-studio-display text-2xl text-studio-text">
              Content creation
            </h3>
            <p className="mt-2 font-studio-display text-4xl text-studio-text">
              from £{PRICE_CONTENT_GBP}/project
            </p>
            <p className="mt-1 text-sm text-studio-muted">One-off batch, no retainer</p>
            <ul className="mt-5 border-t border-studio-line text-sm">
              {CONTENT_CREATION_FEATURES.map((item) => (
                <li key={item} className="border-b border-studio-line py-2.5 text-studio-muted">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        heading="How a build runs"
        intro="Most five-page sites take about a week once your text and photos are in."
        className="border-b border-studio-line"
      >
        <ol className="mt-8 border-t border-studio-line">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.number}
              className="grid gap-2 border-b border-studio-line py-5 sm:grid-cols-[4rem_11rem_1fr] sm:items-baseline sm:gap-6"
            >
              <span className="font-studio-display text-2xl text-studio-text">{step.number}</span>
              <h3 className="font-studio-display text-2xl text-studio-text">{step.title}</h3>
              <p className="type-body text-studio-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        heading="See examples of local business sites"
        intro="Check the live client site for RV's Cold Brew in Belfast, or browse the three concept builds for a trades firm, a restaurant, and a hair salon."
      >
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">{DRAFT_CTAS.primary}</Button>
          <Link
            href="/work/rvs-cold-brew"
            className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          >
            RV&apos;s Cold Brew case study
          </Link>
          <Link
            href="/work/concept-builds"
            className="inline-flex min-h-11 items-center text-base text-studio-muted underline decoration-studio-line underline-offset-4 hover:text-studio-text"
          >
            Local business concept builds
          </Link>
        </div>
      </Section>
    </div>
  );
}

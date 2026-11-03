import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  CONTENT_CREATION_FEATURES,
  PRICING_FEATURES,
  SOCIAL_MEDIA_FEATURES,
  WHATSAPP_URL,
} from "@/lib/constants";
import { DRAFT_CTAS } from "@/lib/content/redesign-draft";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Free packages for registered charities and animal rescues",
  description:
    "Registered charities in Northern Ireland get the same website, social media, and content packages free. Animal rescues and community groups welcome.",
  path: "/services/charities",
});

export default function CharitiesServicesPage() {
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
          / Rescues and charities
        </p>
        <h1 className="display-lg mt-4 max-w-[16ch] text-balance text-studio-text">
          Free packages for registered charities
        </h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          Registered charities get the exact same website, social media, and content packages as paying clients at no fee. You own your domain, your content, and your code.
        </p>
        <p className="type-body mt-4 max-w-prose text-studio-muted">
          Other animal rescues or community groups that are not yet registered: get in touch anyway and we will talk through what you need. No price is set in advance.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">{DRAFT_CTAS.charity}</Button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          >
            {DRAFT_CTAS.lowCommitment}
          </a>
        </div>
      </Section>

      <Section
        heading="Work built for Assisi Animal Sanctuary"
        intro="My dog Rudi came from Assisi Animal Sanctuary, and my MSc dissertation at Queen's University Belfast started by asking what their staff actually needed."
        className="border-b border-studio-line"
      >
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <article className="flex flex-col justify-between border border-studio-border bg-studio-surface p-6 md:p-8">
            <div>
              <p className="text-sm font-bold text-studio-muted">Ready for live use</p>
              <h3 className="mt-2 font-studio-display text-3xl text-studio-text">
                ShelterLink volunteer platform
              </h3>
              <p className="type-body mt-3 text-studio-muted">
                Volunteer registration, shift scheduling, role allocation, CSV exports, and an admin dashboard built for Assisi Animal Sanctuary. Plain Node.js, Express, MySQL, and PicoCSS so there is nothing fragile to maintain.
              </p>
            </div>
            <div className="mt-6 border-t border-studio-line pt-4">
              <Link
                href="/work/shelterlink"
                className="inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
              >
                Read the ShelterLink case study
              </Link>
            </div>
          </article>

          <article className="flex flex-col justify-between border border-studio-border bg-studio-surface p-6 md:p-8">
            <div>
              <p className="text-sm font-bold text-studio-muted">Built - awaiting sign-off</p>
              <h3 className="mt-2 font-studio-display text-3xl text-studio-text">
                Assisi website and brand rebuild
              </h3>
              <p className="type-body mt-3 text-studio-muted">
                A rebuilt website and visual identity for Assisi Animal Sanctuary in Belfast, designed so adopters, donors, and supporters can find what they need on a phone without hunting through menus. Built and awaiting their feedback.
              </p>
            </div>
            <div className="mt-6 border-t border-studio-line pt-4">
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center text-sm font-bold text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
              >
                See on the work page
              </Link>
            </div>
          </article>
        </div>
      </Section>

      <Section
        heading="What a registered charity gets for £0"
        intro="Same scope, same care, same ownership as a standard client job."
        className="border-b border-studio-line"
      >
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <article className="border border-studio-border bg-studio-surface p-6">
            <h3 className="font-studio-display text-2xl text-studio-text">Website build</h3>
            <p className="mt-2 font-studio-display text-4xl text-studio-text">£0</p>
            <p className="mt-1 text-sm text-studio-muted">Registered charities (standard £650)</p>
            <ul className="mt-5 border-t border-studio-line text-sm">
              {PRICING_FEATURES.map((item) => (
                <li key={item} className="border-b border-studio-line py-2.5 text-studio-muted">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-studio-border bg-studio-surface p-6">
            <h3 className="font-studio-display text-2xl text-studio-text">Social media</h3>
            <p className="mt-2 font-studio-display text-4xl text-studio-text">£0</p>
            <p className="mt-1 text-sm text-studio-muted">Registered charities (standard £150/mo)</p>
            <ul className="mt-5 border-t border-studio-line text-sm">
              {SOCIAL_MEDIA_FEATURES.map((item) => (
                <li key={item} className="border-b border-studio-line py-2.5 text-studio-muted">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-studio-border bg-studio-surface p-6">
            <h3 className="font-studio-display text-2xl text-studio-text">Content batch</h3>
            <p className="mt-2 font-studio-display text-4xl text-studio-text">£0</p>
            <p className="mt-1 text-sm text-studio-muted">Registered charities (standard £200/project)</p>
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
        heading="Tell me about your rescue or charity"
        intro="Mention your charity registration number (or tell me about your rescue if you are not registered) when you get in touch."
      >
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">Get in touch</Button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          >
            {DRAFT_CTAS.lowCommitment}
          </a>
        </div>
      </Section>
    </div>
  );
}

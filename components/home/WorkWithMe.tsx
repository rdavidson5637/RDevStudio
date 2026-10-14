import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  CONTENT_CREATION_FEATURES,
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
  PRICING_FEATURES,
  SOCIAL_MEDIA_FEATURES,
  WHATSAPP_URL,
} from "@/lib/constants";

const PACKAGES = [
  {
    title: "Websites",
    price: `£${PRICE_WEBSITE_GBP}`,
    from: true,
    note: "one-off",
    copy: "A site that says who you are, what you do, and how to get in touch. Phone first. No template.",
    href: "/services#websites",
    bullets: PRICING_FEATURES.slice(0, 4),
    anchor: true,
  },
  {
    title: "Social media",
    price: `£${PRICE_SOCIAL_GBP}`,
    from: true,
    note: "/mo",
    copy: "A plan, captions and graphics so you are not making it up every Monday.",
    href: "/services#social",
    bullets: SOCIAL_MEDIA_FEATURES.slice(0, 4),
    anchor: false,
  },
  {
    title: "Content",
    price: `£${PRICE_CONTENT_GBP}`,
    from: true,
    note: "a project",
    copy: "A batch of posts or a one-off set. Written to sound like you, not like an agency.",
    href: "/services#content",
    bullets: CONTENT_CREATION_FEATURES.slice(0, 4),
    anchor: false,
  },
  {
    title: "Care plan",
    price: `£${PRICE_CARE_PLAN_GBP}`,
    from: false,
    note: "/month, optional",
    copy: "Hosting, security updates and small changes, so the site stays up and stays current.",
    href: "/services",
    bullets: [] as readonly string[],
    anchor: false,
  },
] as const;

export function WorkWithMe() {
  return (
    <Section id="work-with-me" eyebrow="WORK WITH ME" heading="Straight prices. One person, start to finish.">
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PACKAGES.map((item, index) => (
          <Reveal key={item.title} delay={index * 60}>
            <a
              href={item.href}
              className={`card relative flex h-full flex-col p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text ${
                item.anchor ? "border-studio-accent" : ""
              }`}
            >
              {item.anchor ? <p className="type-label text-studio-accent">Start here</p> : null}
              <h3 className="mt-2 font-studio-display text-2xl text-studio-text">{item.title}</h3>
              <p className="mt-4 text-studio-text">
                {item.from ? <span className="mr-1 text-sm text-studio-muted">from</span> : null}
                <span className="font-studio-display text-4xl">{item.price}</span>
                <span className="ml-1 text-sm text-studio-muted">{item.note}</span>
              </p>
              <p className="type-body mt-3 text-studio-muted">{item.copy}</p>
              {item.bullets.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-studio-text">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 border-l-2 border-studio-accent bg-studio-surface px-5 py-4">
        <p className="type-body max-w-2xl text-studio-muted">
          Registered charities get the same packages free - website, social and content. Say you are registered when you get in touch.
        </p>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {["50% upfront", "50% at launch", "You own the domain, content and code", "No lock-in"].map((term) => (
          <li key={term} className="rounded-full border border-studio-line px-3 py-2 font-studio-mono text-xs text-studio-muted">
            {term}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button href="/contact">Start a project</Button>
        <Button href={WHATSAPP_URL} variant="secondary">
          Message on WhatsApp
        </Button>
      </div>
    </Section>
  );
}

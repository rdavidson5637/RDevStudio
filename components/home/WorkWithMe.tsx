import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PACKAGES = [
  {
    title: "Websites",
    price: "from £650",
    note: "one-off",
    copy: "A site that says who you are, what you do, and how to get in touch. Phone first. No template.",
    href: "/services#websites",
    lead: true,
  },
  {
    title: "Social media",
    price: "from £150/mo",
    note: "",
    copy: "A plan, captions and graphics so you are not making it up every Monday.",
    href: "/services#social",
    lead: false,
  },
  {
    title: "Content",
    price: "from £200",
    note: "a project",
    copy: "A batch of posts or a one-off set. Written to sound like you, not like an agency.",
    href: "/services#content",
    lead: false,
  },
] as const;

const TERMS = [
  "50% upfront, 50% at launch",
  "You own the domain, content and code",
  "No lock-in",
] as const;

export function WorkWithMe() {
  return (
    <section id="work-with-me" className="bg-bg py-14 text-studio-text md:py-20">
      <Container>
        <SectionHeader
          tone="studio"
          label="Work with me"
          heading="Straight prices. One person, start to finish."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PACKAGES.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} className="h-full">
              <Link
                href={item.href}
                className={`studio-card group relative flex h-full flex-col overflow-hidden rounded-studio border bg-studio-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:border-amber/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber ${
                  item.lead ? "border-amber/40" : "border-studio-border"
                }`}
              >
                {item.lead ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-amber"
                  />
                ) : null}
                <span className="type-label text-amber">{item.lead ? "Start here" : " "}</span>
                <span className="mt-3 font-studio-display text-3xl text-studio-text transition-colors duration-200 group-hover:text-amber">
                  {item.title}
                </span>
                <span className="type-body mt-3 text-studio-muted">{item.copy}</span>
                <span className="mt-auto pt-8">
                  <span className="font-studio-display text-3xl text-studio-text">{item.price}</span>
                  {item.note ? (
                    <span className="type-label mt-1 block text-studio-muted">{item.note}</span>
                  ) : null}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5">
          <Link
            href="/services"
            className="studio-card group flex flex-col gap-4 rounded-studio border border-studio-border bg-studio-surface p-6 transition duration-200 hover:border-amber/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber md:flex-row md:items-center md:justify-between md:gap-10"
          >
            <span className="max-w-xl">
              <span className="type-label text-studio-muted">Optional</span>
              <span className="mt-2 block font-studio-display text-2xl text-studio-text transition-colors duration-200 group-hover:text-amber">
                Care plan
              </span>
              <span className="type-body mt-2 block text-studio-muted">
                Hosting, security updates and small changes, so the site stays up and stays current.
              </span>
            </span>
            <span className="font-studio-display text-3xl text-studio-text">£30/month</span>
          </Link>
        </Reveal>

        <Reveal className="mt-5">
          <div className="flex items-start gap-3 rounded-studio border border-amber/30 bg-amber-soft p-5">
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber"
            />
            <p className="type-body text-studio-text">
              Registered charities get the same packages free - website, social and content. Say you are registered when you get in touch.
            </p>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-3 border-t border-studio-border pt-8 sm:grid-cols-3">
          {TERMS.map((term) => (
            <li key={term} className="type-label text-studio-muted">
              {term}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">Start a project</Button>
          <Button href="https://wa.me/447378420418" variant="secondary">
            Message on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}

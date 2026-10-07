import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
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
    price: "from £200/project",
    note: "",
    copy: "A batch of posts or a one-off set. Written to sound like you, not like an agency.",
    href: "/services#content",
    lead: false,
  },
] as const;

const TERMS = ["50% upfront, 50% at launch", "You own the domain, content and code", "No lock-in"] as const;

export function WorkWithMe() {
  return (
    <section id="work-with-me" className="bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <SectionHeader
          tone="studio"
          label="Work with me"
          heading="Straight prices. One person, start to finish."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PACKAGES.map((item) => (
            <Card
              key={item.title}
              className={`flex h-full flex-col ${item.lead ? "border-t-2 border-t-amber" : ""}`}
            >
              <p className={`type-label ${item.lead ? "text-amber" : "invisible"}`} aria-hidden={item.lead ? undefined : true}>
                Start here
              </p>
              <h3 className="type-h3 mt-3 text-studio-text">{item.title}</h3>
              <p className="mt-3 font-studio-display text-3xl text-studio-text">
                {item.price}{" "}
                {item.note ? <span className="type-label text-studio-muted">{item.note}</span> : null}
              </p>
              <p className="type-body mt-4 flex-1 text-studio-muted">{item.copy}</p>
              <a
                href={item.href}
                className="mt-6 inline-flex min-h-11 items-center text-sm text-studio-text underline-offset-4 hover:text-amber hover:underline"
              >
                See what is included
              </a>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="type-label text-studio-muted">Care plan</p>
              <p className="mt-2 font-studio-display text-3xl text-studio-text">£30/month</p>
              <p className="type-body mt-3 max-w-xl text-studio-muted">
                Hosting, security updates and small changes, so the site stays up and stays current. Optional.
              </p>
            </div>
            <a href="/services" className="inline-flex min-h-11 items-center text-sm text-studio-text underline-offset-4 hover:text-amber hover:underline">
              Read the care plan
            </a>
          </div>
        </Card>

        <p className="type-body mt-6 border border-studio-border bg-studio-amber-soft px-5 py-4 text-studio-text">
          Registered charities get the same packages free - website, social and content. Say you are registered when you get in touch.
        </p>

        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {TERMS.map((term) => (
            <li key={term} className="type-label text-studio-muted">
              {term}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact">Start a project</Button>
          <Button href="https://wa.me/447378420418" variant="secondary">
            Message on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}

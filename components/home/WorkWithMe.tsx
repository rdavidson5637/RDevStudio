import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PACKAGES = [
  {
    title: "Websites",
    price: "from £650",
    note: "one-off",
    copy: "A site that says who you are, what you do, and how to get in touch. Phone first. No template.",
    href: "/services#websites",
  },
  {
    title: "Social media",
    price: "from £150/mo",
    note: "",
    copy: "A plan, captions and graphics so you are not making it up every Monday.",
    href: "/services#social",
  },
  {
    title: "Content",
    price: "from £200",
    note: "a project",
    copy: "A batch of posts or a one-off set. Written to sound like you, not like an agency.",
    href: "/services#content",
  },
  {
    title: "Care plan",
    price: "£30/month",
    note: "optional",
    copy: "Hosting, security updates and small changes, so the site stays up and stays current.",
    href: "/services",
  },
] as const;

export function WorkWithMe() {
  return (
    <section id="work-with-me" className="bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <SectionHeader
          tone="studio"
          label="Work with me"
          heading="Straight prices. One person, start to finish."
        />
        <ul className="mt-10 border-t border-studio-border">
          {PACKAGES.map((item) => (
            <li key={item.title} className="border-b border-studio-border">
              <a
                href={item.href}
                className="group grid gap-2 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber md:grid-cols-[1fr_11rem] md:items-baseline md:gap-10"
              >
                <span>
                  <span className="block font-studio-display text-3xl text-studio-text transition-colors duration-200 group-hover:text-amber">
                    {item.title}
                  </span>
                  <span className="type-body mt-2 block max-w-xl text-studio-muted">{item.copy}</span>
                </span>
                <span className="font-studio-display text-2xl text-studio-text md:text-right">
                  {item.price}
                  {item.note ? (
                    <span className="type-label mt-1 block text-studio-muted md:text-right">{item.note}</span>
                  ) : null}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="type-body mt-8 max-w-2xl text-studio-muted">
          Registered charities get the same packages free - website, social and content. Say you are registered when you get in touch.
        </p>
        <p className="type-body mt-3 max-w-2xl text-studio-muted">
          50% upfront, 50% at launch. You own the domain, content and code. No lock-in.
        </p>
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

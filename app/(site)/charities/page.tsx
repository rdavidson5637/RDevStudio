import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Free websites for registered charities",
  description:
    "Registered charities in Northern Ireland get a website, social media and content from RDev Studio at no charge. What is covered and how to ask.",
  path: "/charities",
});

const COVERED = [
  {
    title: "Website",
    text: "The same website package everyone else pays for. Up to five pages, built for a phone first, with a contact form that lands in your inbox.",
  },
  {
    title: "Social media",
    text: "A monthly content calendar, captions in your voice, simple graphics in your colours, and posts scheduled to the accounts you already have.",
  },
  {
    title: "Content",
    text: "One-off batches of posts or a small campaign set, delivered ready for you to publish.",
  },
] as const;

const NEEDED = [
  "That you are a registered charity. Tell me when you get in touch.",
  "A person at the charity who can answer questions and approve things.",
  "Your text, photos and contact details. If you are stuck, I will draft the copy and tell you what still needs a photo.",
] as const;

export default function CharitiesPage() {
  return (
    <div className="bg-studio-bg px-6 py-16 font-studio-sans text-studio-text md:px-8 md:py-24 lg:py-32">
      <article className="mx-auto max-w-studio">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Charities" }]}
          className="mb-8"
        />

        <header className="border-b border-studio-line pb-10">
          <h1 className="display-lg text-studio-text">Free for registered charities</h1>
          <p className="type-body mt-5 max-w-prose text-studio-muted">
            If you are a registered charity in Northern Ireland, you get the website, social media
            and content packages at no charge. No catch in the small print. Same work, same
            process, same person doing it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact">Get in touch</Button>
            <Button href={WHATSAPP_URL} variant="outline">
              WhatsApp me
            </Button>
          </div>
        </header>

        <section className="border-b border-studio-line py-12">
          <h2 className="type-h2 text-studio-text">What is covered</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {COVERED.map((item) => (
              <li key={item.title} className="card p-5">
                <h3 className="font-studio-display text-2xl text-studio-text">{item.title}</h3>
                <p className="type-body mt-2 text-studio-muted">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="type-body mt-6 max-w-prose text-studio-muted">
            The usual limits apply. An online shop or card payments is a separate conversation, and
            so are pages beyond five. I say so before I build anything.
          </p>
        </section>

        <section className="border-b border-studio-line py-12">
          <h2 className="type-h2 text-studio-text">What I need from you</h2>
          <ul className="mt-6 max-w-prose space-y-3 type-body text-studio-text">
            {NEEDED.map((line) => (
              <li key={line} className="border-l-2 border-studio-line-strong pl-4">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-studio-line py-12">
          <h2 className="type-h2 text-studio-text">Work with a sanctuary</h2>
          <div className="mt-4 max-w-prose space-y-4 type-body text-studio-text">
            <p>
              I built ShelterLink, a volunteer rota and admin system, for Assisi Animal Sanctuary.
              It is ready for live use. I have also built a new site and brand for Assisi. It is
              finished and waiting on sign-off, so it is not live yet.
            </p>
            <p>
              My own dog, Rudi, came from Assisi. That is not a sales line. It is just where he is
              from.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Button href="/work/shelterlink" variant="secondary">
              Read the ShelterLink case study
            </Button>
          </div>
        </section>

        <section className="py-12">
          <h2 className="type-h2 text-studio-text">Other rescues and community groups</h2>
          <p className="type-body mt-4 max-w-prose text-studio-text">
            If you are not a registered charity, get in touch anyway. There is no set price for
            rescues, so we talk about what you need first.
          </p>
          <p className="type-body mt-4 max-w-prose text-studio-muted">
            Or email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline underline-offset-4 hover:text-studio-accent"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </article>
    </div>
  );
}

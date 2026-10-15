import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CHARITY_NOTE, CONTACT_EMAIL, GITHUB_URL, WHATSAPP_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Projects for NI businesses and charities, plus the odd collaboration. Based in Carrickfergus.",
  path: "/contact",
});

const LINKEDIN_URL = "https://www.linkedin.com/in/ryan-davidson-462bb221b";

export default function ContactPage() {
  return (
    <div className="bg-bg text-studio-text">
      <Container className="py-20 md:py-28">
        <h1 className="display-lg max-w-3xl text-balance">Start a project</h1>
        <p className="type-body mt-5 max-w-xl text-studio-muted">
          Need a site, help with posting, or something that does not fit a package. Form or email. I read both. I usually reply within one working day.
        </p>
        <p className="type-body mt-4 max-w-xl text-studio-muted">{CHARITY_NOTE}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
          <div className="bg-studio-surface p-6 md:p-8">
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-11 items-center font-studio-display text-2xl text-studio-text underline-offset-4 hover:text-studio-accent hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <Button href={WHATSAPP_URL} variant="secondary">
              WhatsApp
            </Button>
            <p className="type-body text-studio-muted">I usually reply within one working day.</p>
            <p className="type-body text-studio-muted">{CHARITY_NOTE}</p>
            <div className="flex gap-4">
              <a href={LINKEDIN_URL} className="inline-flex min-h-11 items-center text-sm text-studio-muted hover:text-studio-accent" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={GITHUB_URL} className="inline-flex min-h-11 items-center text-sm text-studio-muted hover:text-studio-accent" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
            <p className="type-body text-studio-muted">Based in Carrickfergus. Working anywhere.</p>
            <p className="type-body text-studio-muted">
              I only use your name and email to reply to this enquiry. I do not pass them on.
            </p>
          </aside>
        </div>
      </Container>
    </div>
  );
}

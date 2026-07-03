import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Freelance projects, job opportunities, or a rematch on Champions Draft - all welcome.",
  path: "/contact",
});

const LINKEDIN_URL = "https://www.linkedin.com/in/ryan-davidson-462bb221b";

export default function ContactPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">FULL TIME</p>
          <h1 className="programme-h1">GET IN TOUCH</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
            Freelance projects, job opportunities, or a rematch on Champions
            Draft - all welcome.
          </p>
        </header>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.35fr,1fr] lg:items-start">
          <div className="rounded-[10px] border border-border bg-raised p-6 sm:p-8">
            <ContactForm />
          </div>

          <aside className="lg:pt-2">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-2xl font-semibold leading-tight text-primary transition-colors hover:text-accent sm:text-3xl"
            >
              {CONTACT_EMAIL}
            </a>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href={LINKEDIN_URL}
                className="shell-label transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <span
                className="shell-label text-border-strong"
                aria-hidden="true"
              >
                ·
              </span>
              <a
                href={GITHUB_URL}
                className="shell-label transition-colors hover:text-accent"
              >
                GitHub
              </a>
            </div>

            <p className="mt-7 text-sm leading-relaxed text-secondary">
              Based in Carrickfergus — working anywhere.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

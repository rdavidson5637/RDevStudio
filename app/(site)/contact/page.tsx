import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  CHARITY_NOTE,
  CONTACT_EMAIL,
  GITHUB_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { LINKEDIN_URL } from "@/lib/seo";
import { createPageMetadata } from "@/lib/metadata";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Start a website, social media or content project with RDev Studio. Form, email or WhatsApp. Replies within one working day. Based in Carrickfergus.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">FULL TIME</p>
          <h1 className="programme-h1">GET IN TOUCH</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            Need a site, help with posting, or something that does not fit a
            package. Form, email, or WhatsApp - whichever is easiest. I reply
            within one working day, usually sooner.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            {CHARITY_NOTE}
          </p>
        </header>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.35fr,1fr] lg:items-start">
          <div className="rounded-[10px] border border-border bg-raised p-6 sm:p-8">
            <ContactForm />
          </div>

          <aside className="space-y-8 lg:pt-2">
            <div>
              <p className="shell-label mb-3 text-accent">Quickest</p>
              <WhatsAppLink label={`WhatsApp ${WHATSAPP_DISPLAY}`} />
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                Messages, voice notes and photos of the old site all welcome.
              </p>
            </div>

            <div>
              <p className="shell-label mb-3 text-accent">Email</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="block break-words text-2xl font-semibold leading-tight text-primary transition-colors hover:text-accent sm:text-3xl"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="border-t border-border pt-6">
              <p className="shell-label mb-3 text-accent">What happens next</p>
              <ol className="space-y-2 text-sm leading-relaxed text-primary">
                <li>1. I reply with a couple of questions, or a price and a date.</li>
                <li>2. A short call if it helps. No pitch deck.</li>
                <li>3. You pay half to book the build in, and I start.</li>
              </ol>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <a href={LINKEDIN_URL} className="shell-label transition-colors hover:text-accent">
                LinkedIn
              </a>
              <span className="shell-label text-border-strong" aria-hidden="true">
                ·
              </span>
              <a href={GITHUB_URL} className="shell-label transition-colors hover:text-accent">
                GitHub
              </a>
            </div>

            <p className="text-sm leading-relaxed text-primary">
              Based in Carrickfergus. Working with businesses and charities
              across Northern Ireland.
            </p>
            <p className="text-sm leading-relaxed text-secondary">
              I only use your name and email to reply to this enquiry. I do not
              pass them on. The details are in the{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">
                privacy notice
              </Link>
              .
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}

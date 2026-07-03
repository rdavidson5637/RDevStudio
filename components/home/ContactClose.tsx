import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

export function ContactClose() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="section-label">Get in touch</p>
            <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl">
              Have a project
              <br />
              in mind?
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <p className="max-w-md text-sm leading-relaxed text-secondary lg:text-right">
              Open to freelance work and collaborations. No pitch decks — just a
              conversation.
            </p>
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-secondary transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

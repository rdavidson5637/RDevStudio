import Link from "next/link";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/constants";

export function ContactClose() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${encodeURIComponent("Hi, I'd like to talk about a project.")}`;

  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="label-caps">Get in touch</p>
            <h2 className="heading-display mt-3 text-4xl sm:text-5xl lg:text-6xl">
              Have a project
              <br />
              in mind?
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <p className="max-w-md text-sm leading-relaxed text-secondary lg:text-right">
              Based in Carrickfergus, working with businesses across Northern
              Ireland and beyond. No pitch decks — just a conversation.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                WhatsApp
              </a>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-tertiary transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

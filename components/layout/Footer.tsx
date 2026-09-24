import Link from "next/link";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  SECONDARY_NAV_HUBS,
  SECONDARY_NAV_LINKS,
  SHELL_NAV_LINKS,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/constants";
import { INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/seo";

const CURRENT_YEAR = new Date().getFullYear();

const SERVICE_LINKS = [
  { href: "/services/websites", label: "Websites" },
  { href: "/services/social-media", label: "Social media" },
  { href: "/services/content", label: "Content" },
  { href: "/web-design-carrickfergus", label: "Web design Carrickfergus" },
  { href: "/web-design-belfast", label: "Web design Belfast" },
] as const;

const EMPLOYER_LINKS = [
  { href: "/hire", label: "CV" },
  { href: "/build/pub-quiz", label: "How Pub Quiz is built" },
  { href: "/build/champions-draft", label: "How Champions Draft is built" },
  { href: "/build/draft-analyser", label: "How the Draft Analyser is built" },
] as const;

const linkClass = "shell-label text-primary transition-colors hover:text-accent";

export function Footer() {
  return (
    <footer className="border-t border-border bg-base" role="contentinfo">
      <div className="container-wide px-6 pb-8 pt-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-primary">
              RDev Studio - designed and built in Carrickfergus. No template, no
              page builder, occasional dog supervision.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary transition-colors hover:text-accent"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary transition-colors hover:text-accent"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
            <p className="shell-label text-secondary">
              © {CURRENT_YEAR} Ryan Davidson
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {SHELL_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className={linkClass}>
              Contact
            </Link>
            <p className="shell-label mt-4 text-accent">Services</p>
            {SERVICE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3" aria-label="Games and tools">
            <p className="shell-label text-accent">Also on the site</p>
            {SECONDARY_NAV_HUBS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <div className="h-1" aria-hidden="true" />
            {SECONDARY_NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3" aria-label="For employers">
            <p className="shell-label text-accent">For employers</p>
            {EMPLOYER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <div className="h-1" aria-hidden="true" />
            <a
              href={GITHUB_URL}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href={INSTAGRAM_URL}
              className={linkClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
          </nav>
        </div>

        <div className="programme-rule mt-10" />
        <p className="shell-label pt-6 text-center text-accent">
          FULL TIME - thanks for reading the programme.
        </p>
      </div>
    </footer>
  );
}

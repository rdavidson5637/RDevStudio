import Link from "next/link";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/constants";

const LINKEDIN_URL = "https://www.linkedin.com/in/ryan-davidson-462bb221b";
const WHATSAPP_URL = "https://wa.me/447378420418";

const COLUMNS = [
  {
    title: "Studio",
    links: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/contact", label: "CV on request" },
    ],
  },
  {
    title: "Play",
    links: [
      { href: "/games", label: "Games" },
      { href: "/champions-draft", label: "Champions Draft" },
      { href: "/rugby-draft", label: "Rugby Draft" },
      { href: "/pub-quiz", label: "Pub Quiz" },
      { href: "/games/longest-word", label: "Longest Word" },
    ],
  },
  {
    title: "Projects",
    links: [
      { href: "/draft", label: "Draft Analyser" },
      { href: "/wardrobe-ai", label: "Wardrobe AI" },
      { href: "https://stoutfinder.com", label: "Stout Finder" },
      { href: "/guitar-lab", label: "Guitar Lab" },
      { href: "/gig-radar", label: "Gig Radar" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-studio-border bg-bg text-studio-text" role="contentinfo">
      <div className="mx-auto max-w-studio px-6 py-16 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="type-label text-studio-muted">{column.title}</p>
              <ul className="mt-4">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-sm text-studio-muted transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="type-label text-studio-muted">Contact</p>
            <ul className="mt-4 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex min-h-11 items-center text-studio-muted transition-colors hover:text-studio-text"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  className="inline-flex min-h-11 items-center text-studio-muted transition-colors hover:text-studio-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  className="inline-flex min-h-11 items-center text-studio-muted transition-colors hover:text-studio-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  className="inline-flex min-h-11 items-center text-studio-muted transition-colors hover:text-studio-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-studio-border pt-6">
          <p className="max-w-xl text-sm leading-relaxed text-studio-muted">
            RDev Studio - designed and built in Carrickfergus. No template, no page builder, occasional dog supervision.
          </p>
          <p className="type-label mt-4 text-studio-muted">© 2026 Ryan Davidson</p>
        </div>
      </div>
    </footer>
  );
}

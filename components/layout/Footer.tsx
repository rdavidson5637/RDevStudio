import Link from "next/link";
import { CONTACT_EMAIL, GITHUB_URL, WHATSAPP_URL } from "@/lib/constants";

const LINKEDIN_URL = "https://www.linkedin.com/in/ryan-davidson-462bb221b";

const COLUMNS = [
  {
    title: "Studio",
    links: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/hire", label: "Hiring? The long version" },
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

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 min-w-11 items-center text-sm text-studio-muted transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-studio-border bg-bg text-studio-text" role="contentinfo">
      <div className="mx-auto max-w-studio px-6 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="type-label text-studio-muted">{column.title}</p>
              <ul className="mt-4">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <FooterLink href={link.href} label={link.label} />
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
                  className="inline-flex min-h-11 items-center text-studio-muted transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  className="inline-flex min-h-11 items-center text-studio-muted transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-studio-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-label text-studio-muted">© 2026 Ryan Davidson</p>
          <p className="text-sm text-studio-muted">Carrickfergus, Northern Ireland</p>
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL}
              className="inline-flex h-11 w-11 items-center justify-center text-studio-muted transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.78.12 3.08.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
              </svg>
            </a>
            <a
              href={LINKEDIN_URL}
              className="inline-flex h-11 w-11 items-center justify-center text-studio-muted transition-colors hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

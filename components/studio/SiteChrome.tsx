import Link from "next/link";
import { STUDIO_WHATSAPP_URL } from "@/components/studio/content";
import { WhatsAppIcon } from "@/components/studio/icons";
import { SiteDesktopNav, SiteMobileNav } from "@/components/studio/SiteNav";
import { WarmMotionController } from "@/components/studio/WarmMotionController";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LAB_NAV_LINKS,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";

/**
 * Site header, main and footer for every (site) page and the 404 page.
 * Styles live in app/(site)/studio.css, which the caller imports.
 */
const FOOTER_STUDIO_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/services/charities", label: "Charities" },
  { href: "/services/businesses", label: "Local businesses" },
  { href: "/about", label: "About" },
  { href: "/hire", label: "CV" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteShell({
  children,
  before,
}: Readonly<{
  children: React.ReactNode;
  before?: React.ReactNode;
}>) {
  return (
    <div className="mb-root studio-page">
      {before}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--mb-radius)] focus:bg-[var(--mb-accent)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[var(--mb-on-accent)]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--mb-line)] bg-[var(--mb-bg)]">
        <div className="mb-shell flex max-w-6xl items-center justify-between gap-2 py-3 sm:gap-3">
          <Link
            href="/"
            aria-label={`${SITE_NAME} - Home`}
            className="inline-flex min-h-[44px] min-w-0 shrink flex-col justify-center leading-tight text-[var(--mb-ink)] transition-colors hover:text-[var(--mb-link)]"
          >
            <span className="mb-wordmark sm:whitespace-nowrap">{SITE_NAME}</span>
            <span className="mb-caption whitespace-nowrap">Carrickfergus, NI</span>
          </Link>

          <SiteDesktopNav />

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Ryan on WhatsApp"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[var(--mb-muted)] transition-colors hover:text-[var(--mb-ink)]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
            </a>
            <Link href="/contact" className="mb-btn-primary px-3 sm:px-4">
              Get a quote
            </Link>
          </div>
        </div>

        <SiteMobileNav />
        <WarmMotionController />
      </header>

      {/* tabIndex -1 lets the skip link move focus here, not just scroll. */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>

      <footer
        className="mb-on-light border-t border-[var(--mb-line)] bg-[var(--mb-light)]"
        role="contentinfo"
      >
        <div className="mb-shell max-w-6xl space-y-8 py-10 sm:py-12">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:items-end md:gap-12">
            <div className="space-y-1.5">
              <p className="mb-wordmark text-[var(--mb-ink)]">{SITE_NAME}</p>
              <p className="mb-prose max-w-md">
                Websites, social and content for Northern Ireland businesses and charities. One person, based in Carrickfergus.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mb-text-link md:justify-self-end"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="grid gap-6 border-t border-[var(--mb-line)] pt-4 md:grid-cols-2 md:gap-12">
            <nav aria-label="Studio">
              <p className="mb-kicker-muted">Studio</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-0">
                {FOOTER_STUDIO_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="mb-jump-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            <nav aria-label="Games and tools">
              <p className="mb-kicker-muted">Games and tools</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-0">
                {LAB_NAV_LINKS.map((link) =>
                  "external" in link && link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-jump-link"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className="mb-jump-link">
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </nav>
          </div>

          <div className="flex flex-col gap-2 border-t border-[var(--mb-line)] pt-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
            <p className="mb-caption">
              &copy; 2026 Ryan Davidson / Carrickfergus, Northern Ireland
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-0">
              <a
                href={STUDIO_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-jump-link"
              >
                WhatsApp
              </a>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-jump-link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-jump-link"
              >
                GitHub
              </a>
              <Link href="/privacy" className="mb-jump-link">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

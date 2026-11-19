import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import { STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import { CastleMark, WhatsAppIcon } from "@/components/mock-b/CoastalDoodles";
import "./mock-b.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mb-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mb-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Websites & digital products from Carrickfergus`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "RDev Studio designs and builds websites, web apps, and Google Business Profile support for Northern Ireland small businesses and charities.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MockBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`mock-b-root ${fraunces.variable} ${plusJakartaSans.variable}`}
      data-mock="b-warm"
    >
      <a
        href="#mock-b-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#211d18] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#fffdf9]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--mb-line)] bg-[var(--mb-cream)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/mock-b"
            className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full pr-2 text-[var(--mb-ink)] transition-opacity hover:opacity-85"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--mb-line-strong)] bg-[var(--mb-butter)] text-[var(--mb-ink)]"
              aria-hidden="true"
            >
              <CastleMark className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="mb-display text-lg font-semibold tracking-tight">
                {SITE_NAME}
              </span>
              <span className="text-[11px] font-medium text-[var(--mb-ink-soft)]">
                Carrickfergus, NI
              </span>
            </span>
          </Link>

          <nav aria-label="Studio navigation" className="hidden items-center gap-1 md:flex">
            <Link
              href="/mock-b#work"
              className="inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-semibold text-[var(--mb-ink-soft)] transition-colors hover:bg-[var(--mb-cream-deep)] hover:text-[var(--mb-ink)]"
            >
              Work
            </Link>
            <Link
              href="/mock-b/work"
              className="inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-semibold text-[var(--mb-ink-soft)] transition-colors hover:bg-[var(--mb-cream-deep)] hover:text-[var(--mb-ink)]"
            >
              Showcase
            </Link>
            <Link
              href="/mock-b#services"
              className="inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-semibold text-[var(--mb-ink-soft)] transition-colors hover:bg-[var(--mb-cream-deep)] hover:text-[var(--mb-ink)]"
            >
              Services
            </Link>
            <Link
              href="/mock-b#about"
              className="inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-semibold text-[var(--mb-ink-soft)] transition-colors hover:bg-[var(--mb-cream-deep)] hover:text-[var(--mb-ink)]"
            >
              Studio
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message RDev Studio on WhatsApp"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full border border-[var(--mb-seaglass)] bg-[var(--mb-seaglass-soft)] px-3 text-sm font-semibold text-[var(--mb-seaglass-ink)] transition-colors hover:bg-[var(--mb-seaglass)] hover:text-[var(--mb-paper)] sm:px-4"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Link
              href="/mock-b#quote"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--mb-terracotta)] px-4 text-sm font-semibold text-[var(--mb-paper)] transition-colors hover:bg-[var(--mb-terracotta-hover)]"
            >
              Get a quote
            </Link>
          </div>
        </div>

        {/* Compact mobile jump nav */}
        <nav
          aria-label="Mobile section navigation"
          className="flex items-center justify-center gap-1 border-t border-[var(--mb-line)] bg-[var(--mb-paper)]/85 px-3 py-1 md:hidden"
        >
          <Link
            href="/mock-b#work"
            className="inline-flex min-h-[44px] items-center rounded-full px-3 text-xs font-semibold text-[var(--mb-ink-soft)] hover:text-[var(--mb-ink)]"
          >
            Work
          </Link>
          <Link
            href="/mock-b/work"
            className="inline-flex min-h-[44px] items-center rounded-full px-3 text-xs font-semibold text-[var(--mb-ink-soft)] hover:text-[var(--mb-ink)]"
          >
            Showcase
          </Link>
          <Link
            href="/mock-b#services"
            className="inline-flex min-h-[44px] items-center rounded-full px-3 text-xs font-semibold text-[var(--mb-ink-soft)] hover:text-[var(--mb-ink)]"
          >
            Services
          </Link>
          <Link
            href="/mock-b#about"
            className="inline-flex min-h-[44px] items-center rounded-full px-3 text-xs font-semibold text-[var(--mb-ink-soft)] hover:text-[var(--mb-ink)]"
          >
            Studio
          </Link>
        </nav>
      </header>

      <main id="mock-b-main">{children}</main>

      <footer className="border-t border-[var(--mb-line)] bg-[var(--mb-cream-deep)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p className="mb-display text-lg font-semibold text-[var(--mb-ink)]">
              {SITE_NAME}
            </p>
            <p className="text-sm text-[var(--mb-ink-soft)]">
              Websites, web apps, and local web support from Carrickfergus, Northern Ireland.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <Link
              href="/mock-b#quote"
              className="inline-flex min-h-[44px] items-center rounded-full px-3 text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
            >
              Quote form
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full px-3 text-[var(--mb-seaglass-ink)] underline decoration-[var(--mb-seaglass)]/40 underline-offset-4 hover:text-[var(--mb-seaglass)]"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-[44px] items-center rounded-full px-3 text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
            >
              {CONTACT_EMAIL}
            </a>
            <Link
              href="/mock-b/work"
              className="inline-flex min-h-[44px] items-center rounded-full px-3 text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-terracotta)]"
            >
              All work
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

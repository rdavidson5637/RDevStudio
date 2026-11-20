import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import { STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import { WhatsAppIcon } from "@/components/mock-b/icons";
import { MockBDesktopNav, MockBMobileNav } from "@/components/mock-b/MockBNav";
import { WarmMotionController } from "@/components/mock-b/WarmMotionController";
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
    default: "Websites & digital products from Carrickfergus",
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-[var(--color-ink)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[var(--color-text-inverse)]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-paper)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/mock-b"
            className="inline-flex min-h-[44px] shrink-0 flex-col justify-center leading-tight text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
          >
            <span className="mb-display whitespace-nowrap text-base font-semibold tracking-tight sm:text-lg">
              {SITE_NAME}
            </span>
            <span className="whitespace-nowrap text-[11px] font-medium text-[var(--color-muted)]">
              Carrickfergus, NI
            </span>
          </Link>

          <MockBDesktopNav />

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message RDev Studio on WhatsApp"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-transparent px-3 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-bg-overlay)] sm:px-3.5"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Link
              href="/mock-b/contact"
              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] bg-[var(--color-accent)] px-3.5 text-xs font-semibold text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-accent-hover)] sm:px-4 sm:text-sm"
            >
              Get a quote
            </Link>
          </div>
        </div>

        {/* Compact mobile jump nav */}
        <MockBMobileNav />
        <WarmMotionController />
      </header>

      <main id="mock-b-main">{children}</main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-overlay)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p className="mb-display text-lg font-semibold text-[var(--color-ink)]">
              {SITE_NAME}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              Websites, web apps, and local web support from Carrickfergus, Northern Ireland.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium md:justify-end">
            <Link
              href="/mock-b/contact"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-accent)]"
            >
              Contact &amp; quote
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--color-accent)] underline decoration-[var(--color-border-accent)] underline-offset-4 hover:text-[var(--color-accent-hover)]"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-accent)]"
            >
              {CONTACT_EMAIL}
            </a>
            <Link
              href="/mock-b/services"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-accent)]"
            >
              Services
            </Link>
            <Link
              href="/mock-b/work"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-accent)]"
            >
              All work
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

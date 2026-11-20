import type { Metadata } from "next";
import Link from "next/link";
import { Atkinson_Hyperlegible, Big_Shoulders } from "next/font/google";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";
import { STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import { WhatsAppIcon } from "@/components/mock-b/icons";
import { MockBDesktopNav, MockBMobileNav } from "@/components/mock-b/MockBNav";
import { WarmMotionController } from "@/components/mock-b/WarmMotionController";
import "./mock-b.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-mb-display",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`mock-b-root ${bigShoulders.variable} ${atkinson.variable}`}
      data-mock="b-warm"
    >
      <a
        href="#mock-b-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--mb-radius)] focus:bg-[var(--mb-accent)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[var(--mb-on-accent)]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--mb-line)] bg-[var(--mb-bg)]">
        <div className="mb-shell flex max-w-6xl items-center justify-between gap-2 py-3 sm:gap-3">
          <Link
            href="/mock-b"
            className="inline-flex min-h-[44px] min-w-0 shrink flex-col justify-center leading-tight text-[var(--mb-ink)] transition-colors hover:text-[var(--mb-link)]"
          >
            <span className="mb-display text-lg tracking-tight sm:whitespace-nowrap sm:text-xl">
              {SITE_NAME}
            </span>
            <span className="mb-caption whitespace-nowrap">
              Carrickfergus, NI
            </span>
          </Link>

          <MockBDesktopNav />

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message RDev Studio on WhatsApp"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--mb-radius)] border border-[var(--mb-line-strong)] text-[var(--mb-ink)] transition-colors hover:border-[var(--mb-ink)] hover:bg-[var(--mb-raised)]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[var(--mb-icon)]" />
            </a>
            <Link
              href="/mock-b/contact"
              className="mb-btn-primary px-3 text-xs sm:px-4 sm:text-sm"
            >
              Get a quote
            </Link>
          </div>
        </div>

        <MockBMobileNav />
        <WarmMotionController />
      </header>

      <main id="mock-b-main">{children}</main>

      <footer className="mb-on-light border-t border-[var(--mb-line)] bg-[var(--mb-light)]">
        <div className="mb-shell flex max-w-6xl flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p className="mb-h3 text-[var(--mb-ink)]">
              {SITE_NAME}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-[var(--mb-muted)]">
              Websites, web apps, and local web support from Carrickfergus, Northern Ireland.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-x-1 gap-y-1 text-sm font-bold md:justify-end">
            <Link
              href="/mock-b/contact"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
            >
              Contact &amp; quote
            </Link>
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--mb-link)] underline decoration-[var(--mb-border-accent)] underline-offset-4 hover:text-[var(--mb-link-hover)]"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
            >
              {CONTACT_EMAIL}
            </a>
            <Link
              href="/mock-b/services"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
            >
              Services
            </Link>
            <Link
              href="/mock-b/work"
              className="inline-flex min-h-[44px] items-center px-2.5 text-[var(--mb-ink)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-link)]"
            >
              All work
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

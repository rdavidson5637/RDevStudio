import Link from "next/link";
import {
  CONTACT_EMAIL,
  NAV_LINKS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-raised">
      <div className="container-wide px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-primary">{SITE_NAME}</p>
            <p className="mt-1 text-sm text-secondary">{SITE_TAGLINE}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
              aria-label="Footer navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-xs font-semibold uppercase tracking-widest text-secondary transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <span className="hidden h-3 w-px bg-border-strong lg:block" aria-hidden="true" />

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-secondary transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>

            <span className="hidden h-3 w-px bg-border-strong lg:block" aria-hidden="true" />

            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-tertiary transition-colors hover:text-accent"
                  aria-label={social.label}
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <p className="shrink-0 font-display text-xs uppercase tracking-widest text-tertiary">
            Built by {SITE_NAME} · &copy; {year}
          </p>
        </div>

        <a
          href={SITE_URL}
          className="sr-only"
        >
          {SITE_URL.replace("https://", "")}
        </a>
      </div>
    </footer>
  );
}

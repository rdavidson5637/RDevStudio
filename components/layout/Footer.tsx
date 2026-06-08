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
    <footer className="bg-raised">
      <div className="mb-12 h-px w-full bg-white/10" />

      <div className="container-wide px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-sm">
            <p className="font-display text-lg font-bold text-primary">{SITE_NAME}</p>
            <p className="lead-text mt-2 text-sm">{SITE_TAGLINE}</p>
          </div>

          <div className="flex flex-col gap-6">
            <nav
              className="flex flex-wrap items-center gap-x-6 gap-y-2"
              aria-label="Footer navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-secondary transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-accent transition-colors hover:text-accent-hover"
              >
                {CONTACT_EMAIL}
              </a>

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
          </div>

          <p className="text-xs text-secondary lg:text-right">
            &copy; {year} {SITE_NAME}
          </p>
        </div>

        <a href={SITE_URL} className="sr-only">
          {SITE_URL.replace("https://", "")}
        </a>
      </div>
    </footer>
  );
}

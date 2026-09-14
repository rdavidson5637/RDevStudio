import Link from "next/link";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  SECONDARY_NAV_LINKS,
  SHELL_NAV_LINKS,
} from "@/lib/constants";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-base" role="contentinfo">
      <div className="container-wide px-6 pb-8 pt-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-primary">
              RDev Studio — designed and built in Carrickfergus. No template, no
              page builder, occasional dog supervision.
            </p>
            <p className="shell-label text-secondary">
              © {CURRENT_YEAR} Ryan Davidson
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {SHELL_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shell-label text-primary transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <p className="shell-label mt-4 text-accent">Also on the site</p>
            {SECONDARY_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shell-label text-primary transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/hire"
              className="shell-label text-primary transition-colors hover:text-accent"
            >
              CV
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-sm" aria-label="Contact and social links">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary transition-colors hover:text-accent"
              aria-label={`Email Ryan at ${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-davidson-462bb221b"
              className="text-primary transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ryan Davidson on LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              className="text-primary transition-colors hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ryan Davidson on GitHub (opens in new tab)"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="programme-rule mt-10" />
        <p className="shell-label pt-6 text-center text-accent">
          FULL TIME — thanks for reading the programme.
        </p>
      </div>
    </footer>
  );
}

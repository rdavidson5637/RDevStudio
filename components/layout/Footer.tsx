import Link from "next/link";
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  SHELL_NAV_LINKS,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-base">
      <div className="container-wide px-6 pb-8 pt-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-secondary">
              RDev Studio - designed and built in Carrickfergus. No template, no
              page builder, occasional dog supervision.
            </p>
            <Link
              href="/contact"
              className="shell-label transition-colors hover:text-accent"
            >
              FULL TIME
            </Link>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {SHELL_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shell-label transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-secondary transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-davidson-462bb221b"
              className="text-secondary transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              className="text-secondary transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="programme-rule mt-10" />
        <p className="shell-label pt-6 text-center">
          FULL TIME - thanks for reading the programme.
        </p>
      </div>
    </footer>
  );
}

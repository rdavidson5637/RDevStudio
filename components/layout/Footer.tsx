import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="container-narrow section-padding !py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <Logo variant="light" />
            <p className="max-w-xs text-center text-sm leading-relaxed text-slate-muted sm:text-left">
              Modern websites for local businesses across Northern Ireland.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-medium text-white transition-colors hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav
            className="flex flex-col items-center gap-3 sm:items-start"
            aria-label="Footer navigation"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-muted">
              Pages
            </p>
            <Link href="/" className="text-sm transition-colors hover:text-accent">
              Home
            </Link>
            <Link href="/services" className="text-sm transition-colors hover:text-accent">
              Services
            </Link>
            <Link href="/work" className="text-sm transition-colors hover:text-accent">
              Work
            </Link>
            <Link href="/contact" className="text-sm transition-colors hover:text-accent">
              Contact
            </Link>
          </nav>

          <div className="flex flex-col items-center gap-3 sm:items-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-muted">
              Location
            </p>
            <p className="text-sm text-slate-muted">
              Carrickfergus, Northern Ireland
            </p>
            <Link
              href="/contact"
              className="btn-primary mt-2 text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-muted">
          <p>
            &copy; {year} RDev Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

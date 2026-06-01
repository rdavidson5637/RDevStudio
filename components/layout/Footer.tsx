import Link from "next/link";
import { EMAIL } from "@/lib/constants";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-navy text-white">
      <div className="container-narrow section-padding !py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <Logo variant="light" />
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-slate-muted transition-colors hover:text-white"
            >
              {EMAIL}
            </a>
          </div>

          <nav
            className="flex flex-wrap justify-center gap-6 text-sm text-slate-muted"
            aria-label="Footer navigation"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link
              href="/services"
              className="transition-colors hover:text-white"
            >
              Services
            </Link>
            <Link href="/work" className="transition-colors hover:text-white">
              Work
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-slate-muted">
          <p>
            &copy; {year} RDev Studio. Carrickfergus, Northern Ireland. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

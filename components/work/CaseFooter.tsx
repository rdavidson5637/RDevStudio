import Link from "next/link";
import { Button } from "@/components/ui/Button";

type CaseFooterProps = {
  next?: { href: string; label: string };
};

const linkClass =
  "inline-flex min-h-11 items-center font-studio-sans text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 transition-colors hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text";

export function CaseFooter({ next }: CaseFooterProps) {
  return (
    <footer className="py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/work" className={linkClass}>
            <span aria-hidden="true">&larr;&nbsp;</span>All work
          </Link>
          {next ? (
            <Link href={next.href} className={linkClass}>
              Next: {next.label}
              <span aria-hidden="true">&nbsp;&rarr;</span>
            </Link>
          ) : null}
        </div>
        <Button href="/contact">Get a fixed quote</Button>
      </div>
    </footer>
  );
}

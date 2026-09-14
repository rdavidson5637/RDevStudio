import Link from "next/link";

export function HomeContact() {
  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-6">
        <p className="shell-label mb-3 text-accent">Full time</p>
        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-primary sm:text-lg">
            Need a site, help with posting, or something that does not fit a
            package. Send a note and I will come back with next steps.
          </p>
          <Link href="/contact" className="btn-primary shrink-0">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}

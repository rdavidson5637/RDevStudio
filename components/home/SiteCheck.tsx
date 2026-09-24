import Link from "next/link";

/** Free Website Grader as the low-commitment first step. */
export function SiteCheck() {
  return (
    <section className="border-t border-border bg-base py-14 sm:py-16">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[10px] border border-border-accent bg-raised p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="shell-label mb-2 text-accent">Already got a site?</p>
            <p className="text-lg font-semibold leading-snug text-primary sm:text-xl">
              Check it for free. Speed, phone layout, and the basics Google looks
              for, scored in under a minute.
            </p>
          </div>
          <Link href="/toolkit/website-grader" className="btn-primary shrink-0">
            Check my site
          </Link>
        </div>
      </div>
    </section>
  );
}

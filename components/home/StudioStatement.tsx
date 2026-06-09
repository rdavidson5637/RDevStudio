import { STUDIO_STATEMENT } from "@/lib/constants";

export function StudioStatement() {
  return (
    <section className="section-padding border-t border-border">
      <div className="container-wide">
        <blockquote className="mx-auto max-w-5xl">
          <p className="text-balance font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-primary sm:text-4xl lg:text-5xl xl:text-6xl">
            <span className="text-accent">&ldquo;</span>
            {STUDIO_STATEMENT}
            <span className="text-accent">&rdquo;</span>
          </p>
          <footer className="mt-10 flex items-center gap-4">
            <div className="editorial-rule flex-1" />
            <cite className="font-display text-xs font-semibold uppercase tracking-widest text-secondary not-italic">
              RDev Studio
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

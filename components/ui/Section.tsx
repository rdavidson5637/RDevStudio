import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function Section({ id, eyebrow, heading, intro, children, className = "", compact = false }: SectionProps) {
  const pad = compact ? "py-8 md:py-12 lg:py-16" : "py-16 md:py-24 lg:py-32";
  return (
    <section id={id} className={`${pad} ${className}`}>
      <div className="mx-auto max-w-studio px-6 md:px-8">
        {eyebrow ? <p className="eyebrow text-studio-muted">{eyebrow}</p> : null}
        {heading ? <h2 className="display-lg mt-3 text-balance text-studio-text">{heading}</h2> : null}
        {intro ? <p className="type-body mt-4 max-w-2xl text-studio-muted">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

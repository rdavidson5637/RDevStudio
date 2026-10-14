import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  heading?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({ id, heading, intro, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-studio px-6 md:px-8">
        {heading ? <h2 className="display-lg text-balance text-studio-text">{heading}</h2> : null}
        {intro ? <p className="type-body mt-4 max-w-2xl text-studio-muted">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

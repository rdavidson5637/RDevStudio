type Props = {
  kicker?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionHeading({ kicker, children, className }: Props) {
  return (
    <div className={`mb-4 ${className ?? ""}`}>
      {kicker ? <p className="shell-label mb-1 text-accent">{kicker}</p> : null}
      <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
        {children}
      </h2>
    </div>
  );
}

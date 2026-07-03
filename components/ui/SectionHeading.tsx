type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="heading-display text-3xl sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-secondary">{subtitle}</p>}
    </div>
  );
}

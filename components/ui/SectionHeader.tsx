type SectionHeaderProps = {
  label: string;
  title?: string;
  className?: string;
};

export function SectionHeader({ label, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <p className="label-caps">{label}</p>
      {title && <h2 className="section-heading mt-3">{title}</h2>}
    </div>
  );
}

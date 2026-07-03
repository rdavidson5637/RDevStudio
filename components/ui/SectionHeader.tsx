type SectionHeaderProps = {
  label?: string;
  title?: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {label && <p className="section-label">{label}</p>}
      {title && <h2 className="section-heading">{title}</h2>}
    </div>
  );
}

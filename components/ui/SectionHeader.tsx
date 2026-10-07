import Link from "next/link";

type SectionHeaderProps = {
  label?: string;
  title?: string;
  heading?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  tone?: "programme" | "studio";
};

export function SectionHeader({
  label,
  title,
  heading,
  href,
  linkLabel,
  className = "",
  tone = "programme",
}: SectionHeaderProps) {
  if (tone === "studio") {
    const text = heading ?? title;
    return (
      <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-3 ${className}`}>
        <div className="max-w-2xl">
          {label ? <p className="type-label text-studio-muted">{label}</p> : null}
          {text ? (
            <h2 className="display-lg mt-3 text-balance text-studio-text">{text}</h2>
          ) : null}
        </div>
        {href && linkLabel ? (
          <Link
            href={href}
            className="type-label text-studio-muted underline-offset-4 transition-colors hover:text-amber hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
          >
            {linkLabel}
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <p className="section-label">{label}</p>}
      {title && <h2 className="section-heading">{title}</h2>}
    </div>
  );
}

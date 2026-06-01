type PageHeaderProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

export function PageHeader({
  title,
  subtitle,
  centered = true,
}: PageHeaderProps) {
  return (
    <div
      className={`mb-12 lg:mb-16 ${centered ? "mx-auto max-w-3xl text-center" : ""}`}
    >
      <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-text sm:text-xl">{subtitle}</p>
      )}
    </div>
  );
}

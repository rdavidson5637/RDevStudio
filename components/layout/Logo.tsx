import Link from "next/link";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className = "", variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-navy";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-2 ${className}`}
      aria-label="RDev Studio — Home"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        R
      </span>
      <span className={`text-lg font-bold tracking-tight ${textColor}`}>
        RDev <span className="font-semibold text-accent">Studio</span>
      </span>
    </Link>
  );
}

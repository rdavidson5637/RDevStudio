import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-amber text-bg hover:shadow-amber-glow",
  secondary:
    "border border-studio-border-strong bg-studio-surface text-studio-text hover:border-amber",
  ghost: "bg-transparent text-studio-muted hover:text-amber",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type LinkProps = Common & {
  href: string;
  target?: string;
  rel?: string;
};

function classes(variant: Variant, size: Size, className?: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-studio font-studio-sans font-medium transition-shadow duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps | LinkProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = classes(variant, size, props.className);

  if ("href" in props && typeof props.href === "string") {
    const external = props.href.startsWith("http");
    return (
      <Link
        href={props.href}
        className={className}
        target={props.target ?? (external ? "_blank" : undefined)}
        rel={props.rel ?? (external ? "noopener noreferrer" : undefined)}
      >
        {props.children}
      </Link>
    );
  }

  const { children, type = "button", ...buttonProps } = props as ButtonProps;
  delete buttonProps.variant;
  delete buttonProps.size;
  delete buttonProps.className;

  return (
    <button type={type} className={className} {...buttonProps}>
      {children}
    </button>
  );
}

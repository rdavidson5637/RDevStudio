import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "rounded-sm bg-studio-accent text-studio-on-accent hover:bg-studio-accent-hover",
  secondary:
    "bg-transparent text-studio-text underline decoration-studio-border-strong underline-offset-4 hover:text-studio-accent hover:decoration-studio-accent",
  outline:
    "rounded-sm border border-studio-border-strong bg-transparent text-studio-text hover:border-studio-text",
  ghost: "bg-transparent text-studio-muted hover:text-studio-accent",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11",
  md: "min-h-12",
};

// Text-style variants sit flush with the copy around them, so they get no side padding.
const padding: Record<Variant, Record<Size, string>> = {
  primary: { sm: "px-4", md: "px-5" },
  outline: { sm: "px-4", md: "px-5" },
  secondary: { sm: "px-0", md: "px-0" },
  ghost: { sm: "px-0", md: "px-0" },
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
  onClick?: () => void;
};

function classes(variant: Variant, size: Size, className?: string) {
  return [
    "inline-flex items-center justify-center gap-2 font-studio-sans transition-[color,background-color,border-color,transform] duration-200 active:translate-y-px motion-reduce:transition-none motion-reduce:active:translate-y-0",
    variant === "primary" ? "text-xl font-bold" : size === "sm" ? "text-sm font-medium" : "text-base font-medium",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text",
    variants[variant],
    sizes[size],
    padding[variant][size],
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
        onClick={props.onClick}
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

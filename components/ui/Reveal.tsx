import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
};

export function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

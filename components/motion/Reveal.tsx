import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  immediate?: boolean;
};

export function Reveal({ children, as: Tag = "div", className = "" }: RevealProps) {
  return <Tag className={className}>{children}</Tag>;
}

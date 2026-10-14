import type { ElementType, ReactNode } from "react";

type StaggerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  immediate?: boolean;
};

export function Stagger({ children, as: Tag = "div", className = "" }: StaggerProps) {
  return <Tag className={className}>{children}</Tag>;
}

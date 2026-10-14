import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article";
};

const paddingClass = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function Card({
  children,
  className = "",
  padding = "md",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`rounded bg-studio-surface transition-colors duration-200 hover:bg-studio-surface-2 ${paddingClass[padding]} ${className}`}
    >
      {children}
    </Tag>
  );
}

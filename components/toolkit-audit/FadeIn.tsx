import type { CSSProperties, ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section" | "header" | "article" | "p";
};

export function FadeIn({
  children,
  className = "",
  delayMs = 0,
  as: Tag = "div",
}: FadeInProps) {
  const style: CSSProperties = { animationDelay: `${delayMs}ms` };

  return (
    <Tag
      className={`animate-fade-in opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

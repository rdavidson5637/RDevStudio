"use client";

import { Children, isValidElement, type ElementType, type ReactNode } from "react";
import { Reveal } from "./Reveal";

type StaggerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

export function Stagger({ children, as: Tag = "div", className = "" }: StaggerProps) {
  return (
    <Tag className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        return (
          <Reveal key={child.key ?? index} delay={index * 60} className="min-w-0">
            {child}
          </Reveal>
        );
      })}
    </Tag>
  );
}

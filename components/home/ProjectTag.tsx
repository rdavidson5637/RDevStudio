import type { ProjectCategory } from "@/lib/constants";

type ProjectTagProps = {
  category: ProjectCategory;
};

export function ProjectTag({ category }: ProjectTagProps) {
  const isClient = category === "Client Work";

  return (
    <span
      className={
        isClient
          ? "inline-block bg-accent px-2 py-0.5 text-xs font-medium text-on-accent"
          : "inline-block border border-border-strong px-2 py-0.5 text-xs font-medium text-secondary"
      }
    >
      {category}
    </span>
  );
}

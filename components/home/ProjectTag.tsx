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
          ? "inline-block border border-accent bg-accent-subtle px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-widest text-accent"
          : "inline-block border border-border-strong bg-base/50 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-widest text-secondary"
      }
    >
      {category}
    </span>
  );
}

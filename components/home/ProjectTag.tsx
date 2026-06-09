import type { ProjectCategory } from "@/lib/constants";

type ProjectTagProps = {
  category: ProjectCategory;
};

export function ProjectTag({ category }: ProjectTagProps) {
  return (
    <span className="inline-block rounded-full border border-border-strong bg-base px-2 py-0.5 text-xs font-semibold text-primary">
      {category}
    </span>
  );
}

import type { ProjectCategory } from "@/lib/constants";

type ProjectTagProps = {
  category: ProjectCategory;
};

export function ProjectTag({ category }: ProjectTagProps) {
  return (
    <span className="inline-block rounded-full border border-white/30 px-2 py-0.5 text-xs font-medium text-primary/90">
      {category}
    </span>
  );
}

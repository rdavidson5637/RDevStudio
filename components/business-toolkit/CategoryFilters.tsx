import type { ToolCategory } from "@/types/business-toolkit";
import { TOOL_CATEGORIES } from "@/lib/business-toolkit/catalog";

type CategoryFiltersProps = {
  activeCategory: ToolCategory | "all";
  onChange: (category: ToolCategory | "all") => void;
};

export function CategoryFilters({
  activeCategory,
  onChange,
}: CategoryFiltersProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter tools by category"
    >
      {TOOL_CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            aria-pressed={isActive}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base ${
              isActive
                ? "border-accent bg-accent text-on-accent"
                : "border-border-strong bg-raised text-primary hover:border-accent hover:text-accent"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

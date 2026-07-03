import type { InteractiveToolCategory } from "@/types/interactive-tools";
import { INTERACTIVE_CATEGORIES } from "@/lib/interactive-tools/catalog";

type InteractiveCategoryFiltersProps = {
  activeCategory: InteractiveToolCategory | "all";
  onChange: (category: InteractiveToolCategory | "all") => void;
};

export function InteractiveCategoryFilters({
  activeCategory,
  onChange,
}: InteractiveCategoryFiltersProps) {
  return (
    <div
      className="flex animate-fade-in flex-wrap gap-2 opacity-0"
      style={{ animationDelay: "80ms" }}
      role="group"
      aria-label="Filter interactive tools by category"
    >
      {INTERACTIVE_CATEGORIES.map((category) => {
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

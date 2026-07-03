type ToolkitSearchProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
};

export function ToolkitSearch({
  value,
  onChange,
  resultCount,
}: ToolkitSearchProps) {
  return (
    <div className="relative">
      <label htmlFor="toolkit-search" className="sr-only">
        Search business tools
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          className="h-5 w-5 text-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input
        id="toolkit-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tools by name or keyword…"
        className="w-full rounded-md border border-border-strong bg-raised py-3 pl-12 pr-4 text-base text-primary placeholder:text-tertiary transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
        autoComplete="off"
      />
      <p className="mt-2 shell-label text-secondary" aria-live="polite">
        {resultCount} tool{resultCount === 1 ? "" : "s"} found
      </p>
    </div>
  );
}

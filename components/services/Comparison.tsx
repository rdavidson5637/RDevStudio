import { COMPARISON } from "@/lib/services";

/** DIY builder vs typical agency vs RDev. The RDev column is highlighted. */
export function Comparison() {
  const ours = COMPARISON.columns.length - 1;

  return (
    <div
      className="overflow-x-auto rounded-[10px] border border-border bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      role="region"
      aria-label="Comparison table, scrolls sideways on small screens"
      tabIndex={0}
    >
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">
          How RDev Studio compares with a DIY site builder and a typical agency
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-[22%] p-4">
              <span className="sr-only">Question</span>
            </th>
            {COMPARISON.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={`p-4 shell-label ${
                  index === ours ? "bg-accent-light text-accent" : "text-secondary"
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-b-0">
              <th scope="row" className="p-4 font-semibold text-primary">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td
                  key={value}
                  className={`p-4 leading-relaxed ${
                    index === ours
                      ? "bg-accent-light font-semibold text-primary"
                      : "text-secondary"
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

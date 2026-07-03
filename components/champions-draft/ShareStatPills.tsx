interface Pill {
  label: string;
  highlight?: boolean;
}

interface Props {
  pills: Pill[];
  className?: string;
}

export default function ShareStatPills({ pills, className = "" }: Props) {
  return (
    <div className={`flex flex-wrap gap-1.5 justify-center ${className}`}>
      {pills.map((pill) => (
        <span
          key={pill.label}
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full tabular-nums ${
            pill.highlight
              ? "bg-white/12 text-white"
              : "bg-white/5 text-white/65"
          }`}
        >
          {pill.label}
        </span>
      ))}
    </div>
  );
}

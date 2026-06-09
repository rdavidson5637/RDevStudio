type LogoSize = "sm" | "md" | "lg" | "xl";

const SIZE_CLASSES: Record<LogoSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
};

const BRAND_AMBER = "#F59E0B";

type LogoMarkProps = {
  size?: LogoSize;
};

export function LogoMark({ size = "md" }: LogoMarkProps) {
  return (
    <span
      className={`inline-block font-sans font-bold leading-none ${SIZE_CLASSES[size]}`}
      style={{ color: BRAND_AMBER }}
      aria-hidden="true"
    >
      [
    </span>
  );
}

type LogoProps = {
  size?: LogoSize;
  dark?: boolean;
};

export default function Logo({ size = "md", dark = false }: LogoProps) {
  const wordmarkColor = dark ? "#ffffff" : "#111827";

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap font-sans leading-none ${SIZE_CLASSES[size]}`}
    >
      <span
        className="mr-1 inline-block font-bold leading-none"
        style={{ color: BRAND_AMBER, fontSize: "1.125em" }}
        aria-hidden="true"
      >
        [
      </span>
      <span className="font-bold" style={{ color: wordmarkColor, fontWeight: 700 }}>
        RDev
      </span>
      <span style={{ color: wordmarkColor, fontWeight: 300 }}> Studio</span>
    </span>
  );
}

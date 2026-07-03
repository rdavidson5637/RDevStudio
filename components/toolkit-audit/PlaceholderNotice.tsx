import { FadeIn } from "./FadeIn";

type PlaceholderNoticeProps = {
  message?: string;
  delayMs?: number;
};

export function PlaceholderNotice({
  message = "Sample data shown for preview - backend analysis is not connected yet.",
  delayMs = 520,
}: PlaceholderNoticeProps) {
  return (
    <FadeIn
      delayMs={delayMs}
      className="mt-8 rounded-md border border-border-accent bg-accent/5 px-4 py-3 text-sm text-secondary"
    >
      <p role="status">{message}</p>
    </FadeIn>
  );
}

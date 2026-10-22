import { WHATSAPP_URL } from "@/lib/constants";

type FormSuccessProps = {
  onReset?: () => void;
};

export function FormSuccess({ onReset }: FormSuccessProps) {
  return (
    <div
      className="rounded-studio border border-studio-border bg-studio-surface p-8 text-left"
      role="status"
      aria-live="polite"
    >
      <p className="text-base font-semibold text-studio-text">Sent. I&apos;ll reply by email.</p>
      <p className="mt-3 text-base leading-relaxed text-studio-muted">
        WhatsApp is the faster route.{" "}
        <a
          href={WHATSAPP_URL}
          className="text-studio-text underline underline-offset-4 hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-studio-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          Message me there
        </a>
        .
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 min-h-11 text-sm font-medium text-studio-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-studio-text"
        >
          Send another
        </button>
      )}
    </div>
  );
}

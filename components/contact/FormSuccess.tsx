type FormSuccessProps = {
  onReset?: () => void;
};

export function FormSuccess({ onReset }: FormSuccessProps) {
  return (
    <div
      className="animate-fade-in border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-emerald-500/30">
        <svg
          className="h-7 w-7 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="heading-display text-xl">Message sent!</h2>
      <p className="mt-2 text-secondary">
        Thanks for getting in touch. I&apos;ll get back to you within 24 hours.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-medium text-accent transition-colors hover:text-primary"
        >
          Send another message
        </button>
      )}
    </div>
  );
}

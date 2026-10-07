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
      <p className="text-base font-semibold text-studio-text">
        Sent. I usually reply within a day.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 min-h-11 text-sm font-medium text-amber underline-offset-4 hover:underline"
        >
          Send another
        </button>
      )}
    </div>
  );
}

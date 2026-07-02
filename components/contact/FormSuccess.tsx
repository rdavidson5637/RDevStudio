type FormSuccessProps = {
  onReset?: () => void;
};

export function FormSuccess({ onReset }: FormSuccessProps) {
  return (
    <div
      className="rounded-lg border border-border bg-raised p-8 text-left"
      role="status"
      aria-live="polite"
    >
      <p className="text-base font-semibold text-primary">
        Sent. I usually reply within a day.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-sm font-medium text-accent transition-colors hover:text-primary"
        >
          Send another
        </button>
      )}
    </div>
  );
}

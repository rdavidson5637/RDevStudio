type AuditErrorPanelProps = {
  message: string;
  onRetry: () => void;
  retryLabel?: string;
};

export function AuditErrorPanel({
  message,
  onRetry,
  retryLabel = "Try again",
}: AuditErrorPanelProps) {
  return (
    <div className="py-10 text-center" role="alert">
      <p className="text-secondary">{message}</p>
      <button type="button" onClick={onRetry} className="btn-secondary mt-6">
        {retryLabel}
      </button>
    </div>
  );
}

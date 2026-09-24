import { WHATSAPP_URL } from "@/lib/constants";

type WhatsAppLinkProps = {
  variant?: "button" | "text" | "compact";
  label?: string;
  className?: string;
};

function ChatIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.3A8.4 8.4 0 1 1 21 11.5Z" />
    </svg>
  );
}

/**
 * Opens a WhatsApp chat with a short pre-filled first line. NI small-business
 * owners tend to prefer it to email, so it sits beside every "Start a project".
 */
export function WhatsAppLink({
  variant = "button",
  label = "WhatsApp me",
  className = "",
}: WhatsAppLinkProps) {
  const base =
    "inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base";

  const styles = {
    button: `btn-secondary ${base}`,
    text: `${base} rounded-sm text-sm font-semibold text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent`,
    compact: `${base} rounded-md border border-border-strong px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent`,
  } as const;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles[variant]} ${className}`}
      aria-label={`${label} (opens WhatsApp)`}
    >
      <ChatIcon />
      {label}
    </a>
  );
}

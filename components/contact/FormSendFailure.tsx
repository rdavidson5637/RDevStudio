import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/constants";

const linkClassName =
  "underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

export function FormSendFailure({ className }: { className?: string }) {
  return (
    <p className={className}>
      That didn&apos;t send. Email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
        {CONTACT_EMAIL}
      </a>{" "}
      or{" "}
      <a href={WHATSAPP_URL} className={linkClassName} target="_blank" rel="noopener noreferrer">
        message me on WhatsApp
      </a>.
    </p>
  );
}

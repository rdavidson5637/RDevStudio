import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/constants";

export function DirectContactOptions() {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-widest text-white/40">
        Or reach out directly
      </p>
      <div className="mb-8 flex flex-wrap gap-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <span>WhatsApp us</span>
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <span>{CONTACT_EMAIL}</span>
        </a>
      </div>
    </div>
  );
}

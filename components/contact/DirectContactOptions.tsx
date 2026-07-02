import { CONTACT_EMAIL } from "@/lib/constants";

export function DirectContactOptions() {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-widest text-tertiary">
        Or reach out directly
      </p>
      <div className="mb-8 flex flex-wrap gap-4">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm text-primary transition-colors hover:border-accent hover:text-accent"
        >
          <span>{CONTACT_EMAIL}</span>
        </a>
      </div>
    </div>
  );
}

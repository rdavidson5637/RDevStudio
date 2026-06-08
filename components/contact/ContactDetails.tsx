import { CONTACT_EMAIL } from "@/lib/constants";

export function ContactDetails() {
  return (
    <aside className="card-hover border border-border bg-raised p-8">
      <h2 className="heading-display text-lg">Contact details</h2>
      <ul className="mt-6 space-y-6">
        <li>
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-tertiary">
            Email
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 block text-accent transition-colors hover:text-primary"
          >
            {CONTACT_EMAIL}
          </a>
        </li>
        <li>
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-tertiary">
            Location
          </p>
          <p className="mt-1 text-secondary">
            Based in Carrickfergus, Northern Ireland
          </p>
        </li>
        <li>
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-tertiary">
            Response time
          </p>
          <p className="mt-1 text-secondary">Usually replies within 24 hours</p>
        </li>
      </ul>

      <div className="mt-8 border border-border bg-base p-6">
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-tertiary">
          Quick tip
        </p>
        <p className="mt-2 text-sm text-secondary">
          Include your business type and what you need — website, social, or
          content — it helps us reply with useful info straight away.
        </p>
      </div>
    </aside>
  );
}

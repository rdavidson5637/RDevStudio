import { CONTACT_EMAIL } from "@/lib/constants";

export function ContactDetails() {
  return (
    <aside className="rounded-xl border border-border bg-raised p-8">
      <h2 className="heading-display text-lg">Details</h2>
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
            Based in
          </p>
          <p className="mt-1 text-secondary">Carrickfergus, Northern Ireland</p>
        </li>
        <li>
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-tertiary">
            Response time
          </p>
          <p className="mt-1 text-secondary">Usually within 24 hours</p>
        </li>
      </ul>

      <div className="mt-8 rounded-lg border border-border bg-base p-6">
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-tertiary">
          Freelance work
        </p>
        <p className="lead-text mt-2 text-sm">
          I build websites and small web apps for businesses and side projects.
          No agency — just me, start to finish.
        </p>
      </div>
    </aside>
  );
}

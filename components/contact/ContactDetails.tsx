import { CONTACT_EMAIL } from "@/lib/constants";

export function ContactDetails() {
  return (
    <aside className="card-hover rounded-2xl border border-slate-200 bg-slate-50 p-8">
      <h2 className="text-lg font-bold text-navy">Contact details</h2>
      <ul className="mt-6 space-y-6">
        <li>
          <p className="text-sm font-medium text-slate-muted">Email</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 block text-accent transition-colors hover:text-blue-600"
          >
            {CONTACT_EMAIL}
          </a>
        </li>
        <li>
          <p className="text-sm font-medium text-slate-muted">Location</p>
          <p className="mt-1 text-navy">
            Based in Carrickfergus, Northern Ireland
          </p>
        </li>
        <li>
          <p className="text-sm font-medium text-slate-muted">Response time</p>
          <p className="mt-1 text-navy">Usually replies within 24 hours</p>
        </li>
      </ul>

      <div className="mt-8 rounded-xl bg-navy p-6 text-white">
        <p className="text-sm font-medium text-slate-muted">Quick tip</p>
        <p className="mt-2 text-sm">
          Include your business type and whether you need a new site or a
          refresh — it helps us reply with useful info straight away.
        </p>
      </div>
    </aside>
  );
}

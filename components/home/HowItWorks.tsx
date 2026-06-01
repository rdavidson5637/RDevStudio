import { HOW_IT_WORKS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section className="section-padding bg-slate-50/80">
      <div className="container-narrow">
        <SectionHeading
          title="How it works"
          subtitle="From first call to live website in three simple steps."
        />

        <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
          {HOW_IT_WORKS.map((item) => (
            <li
              key={item.step}
              className="card-hover relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card"
            >
              <span
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-blue-600 text-xl font-bold text-white shadow-md shadow-accent/25"
                aria-hidden="true"
              >
                {item.step}
              </span>
              <h3 className="text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

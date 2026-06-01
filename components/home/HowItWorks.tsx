import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-narrow">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            How it works
          </h2>
          <p className="mt-3 text-slate-text">
            From first call to live website in three simple steps.
          </p>
        </div>

        <ol className="grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <li
              key={item.step}
              className="card-hover relative rounded-2xl border border-slate-200 bg-white p-8 shadow-card"
            >
              <span
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white"
                aria-hidden="true"
              >
                {item.step}
              </span>
              <h3 className="text-xl font-bold text-navy">{item.title}</h3>
              <p className="mt-3 text-slate-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

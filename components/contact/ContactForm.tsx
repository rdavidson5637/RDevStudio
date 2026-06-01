"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div
        className="animate-fade-in rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-navy">Message sent!</h2>
        <p className="mt-2 text-slate-text">
          Thanks for getting in touch. We&apos;ll get back to you within 24
          hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-accent transition-colors hover:text-blue-600"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="business"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Business Name
        </label>
        <input
          type="text"
          id="business"
          name="business"
          autoComplete="organization"
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Your business name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
          Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="you@business.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          className="w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="07xxx xxxxxx"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Tell us about your business and what you need..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

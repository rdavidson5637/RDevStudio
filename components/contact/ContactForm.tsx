"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_FORM_ID = "mgoqjqve";

const inputClassName =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-navy transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClassName = "mb-1.5 block text-sm font-medium text-navy";

function SuccessMessage({ onReset }: { onReset: () => void }) {
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
        onClick={onReset}
        className="mt-6 text-sm font-medium text-accent transition-colors hover:text-blue-600"
      >
        Send another message
      </button>
    </div>
  );
}

function ContactFormFields({ onReset }: { onReset: () => void }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return <SuccessMessage onReset={onReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClassName}>
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className={inputClassName}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="business" className={labelClassName}>
          Business Name
        </label>
        <input
          type="text"
          id="business"
          name="business"
          autoComplete="organization"
          className={inputClassName}
          placeholder="Your business name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClassName}>
          Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className={inputClassName}
          placeholder="you@business.com"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="mt-1.5 text-sm text-red-600"
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClassName}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          className={inputClassName}
          placeholder="07xxx xxxxxx"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClassName} resize-y`}
          placeholder="Tell us about your business and what you need..."
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="mt-1.5 text-sm text-red-600"
        />
      </div>

      <ValidationError
        errors={state.errors}
        className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
      />

      <button
        type="submit"
        disabled={state.submitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);

  return (
    <ContactFormFields
      key={formKey}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}

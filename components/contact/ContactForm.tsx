"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FormSuccess } from "@/components/contact/FormSuccess";
import {
  inputClassName,
  labelClassName,
  submitButtonClassName,
} from "@/components/contact/form-styles";
import { FORMSPREE_FORM_ID } from "@/lib/constants";

function ContactFormFields({ onReset }: { onReset: () => void }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return <FormSuccess onReset={onReset} />;
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
          className="mt-1.5 text-sm text-red-400"
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
          className="mt-1.5 text-sm text-red-400"
        />
      </div>

      <ValidationError
        errors={state.errors}
        className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
      />

      <button
        type="submit"
        disabled={state.submitting}
        className={submitButtonClassName}
      >
        {state.submitting ? "Sending..." : "Send message"}
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

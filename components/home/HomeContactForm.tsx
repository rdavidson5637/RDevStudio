"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FormSuccess } from "@/components/contact/FormSuccess";
import {
  inputClassName,
  labelClassName,
  selectClassName,
} from "@/components/contact/form-styles";
import {
  CONTACT_SERVICE_OPTIONS,
  FORMSPREE_FORM_ID,
} from "@/lib/constants";

function HomeContactFormFields({ onReset }: { onReset: () => void }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return <FormSuccess onReset={onReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="home-name" className={labelClassName}>
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="home-name"
          name="name"
          required
          autoComplete="name"
          className={inputClassName}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="home-business" className={labelClassName}>
          Business name
        </label>
        <input
          type="text"
          id="home-business"
          name="business"
          autoComplete="organization"
          className={inputClassName}
          placeholder="Your business name"
        />
      </div>

      <div>
        <label htmlFor="home-email" className={labelClassName}>
          Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="home-email"
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
        <label htmlFor="home-service" className={labelClassName}>
          What do you need? <span className="text-accent">*</span>
        </label>
        <select
          id="home-service"
          name="service"
          required
          defaultValue=""
          className={selectClassName}
        >
          <option value="" disabled>
            Select a service
          </option>
          {CONTACT_SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ValidationError
          prefix="Service"
          field="service"
          errors={state.errors}
          className="mt-1.5 text-sm text-red-400"
        />
      </div>

      <div>
        <label htmlFor="home-message" className={labelClassName}>
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="home-message"
          name="message"
          required
          rows={5}
          className={`${inputClassName} resize-y`}
          placeholder="Tell me a bit about your business and what you're looking for..."
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
        className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state.submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

export function HomeContactForm() {
  const [formKey, setFormKey] = useState(0);

  return (
    <HomeContactFormFields
      key={formKey}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}

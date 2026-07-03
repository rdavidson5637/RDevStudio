"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FormSuccess } from "@/components/contact/FormSuccess";
import {
  inputClassName,
  labelClassName,
  selectClassName,
  submitButtonClassName,
} from "@/components/contact/form-styles";
import { FORMSPREE_FORM_ID } from "@/lib/constants";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function ContactFormFields({ onReset }: { onReset: () => void }) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit =
    name.trim().length > 0 &&
    isValidEmail(email.trim()) &&
    message.trim().length > 0 &&
    !state.submitting;

  if (state.succeeded) {
    return <FormSuccess onReset={onReset} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className={labelClassName}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClassName}
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="mt-1.5 text-sm text-[#d22b2b]"
        />
      </div>

      <div>
        <label htmlFor="enquiryType" className={labelClassName}>
          What is it?
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          defaultValue=""
          className={selectClassName}
        >
          <option value="" disabled>
            Choose one
          </option>
          <option value="Freelance project">Freelance project</option>
          <option value="Job opportunity">Job opportunity</option>
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Tell me about it
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${inputClassName} resize-y`}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="mt-1.5 text-sm text-[#d22b2b]"
        />
      </div>

      {state.errors ? (
        <p className="text-sm leading-relaxed text-[#d22b2b]">
          That didn&apos;t send. Try again, or just email me directly — address
          is right there.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit}
        className={submitButtonClassName}
      >
        {state.submitting ? "Sending..." : "Send it"}
      </button>
    </form>
  );
}

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);

  return (
    <ContactFormFields key={formKey} onReset={() => setFormKey((k) => k + 1)} />
  );
}

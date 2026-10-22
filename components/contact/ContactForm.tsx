"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { FormSendFailure } from "@/components/contact/FormSendFailure";
import { FormSuccess } from "@/components/contact/FormSuccess";
import {
  inputClassName,
  labelClassName,
  selectClassName,
  submitButtonClassName,
} from "@/components/contact/form-styles";
import { useFormFailureReport } from "@/components/contact/useFormFailureReport";
import { reportFormError } from "@/components/contact/report-form-error";
import { CONTACT_SERVICE_OPTIONS, FORMSPREE_FORM_ID } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type FieldErrors = {
  name?: string;
  email?: string;
  enquiryType?: string;
  message?: string;
};

function ContactFormFields({ onReset }: { onReset: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useFormFailureReport("contact", null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Add your name.";
    if (!isValidEmail(email.trim())) next.email = "That email does not look right.";
    if (!enquiryType) next.enquiryType = "Choose what this is about.";
    if (!message.trim()) next.message = "Add a message.";
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const gotcha = String(new FormData(event.currentTarget).get("_gotcha") ?? "");
    if (gotcha.trim()) {
      setStatus("success");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      const firstInvalid = (["name", "email", "enquiryType", "message"] as const).find((field) => nextErrors[field]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    if (!FORMSPREE_FORM_ID) {
      setStatus("error");
      reportFormError("contact", "formspree");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          enquiryType,
          message: message.trim(),
          _gotcha: "",
          _subject: `New enquiry from ${new URL(SITE_URL).host}: ${enquiryType}`,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        reportFormError("contact", "formspree");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      reportFormError("contact", "formspree");
    }
  }

  if (status === "success") {
    return <FormSuccess onReset={onReset} />;
  }

  return (
    <form
      onSubmit={onSubmit}
      method="post"
      action={FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : undefined}
      className="space-y-5"
      noValidate
    >
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Leave this blank</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={(event) => setName(event.target.value)}
          className={inputClassName}
        />
        {errors.name ? (
          <p id="name-error" className="mt-1.5 text-sm text-studio-accent" aria-live="polite">
            {errors.name}
          </p>
        ) : null}
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
          spellCheck={false}
          value={email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClassName}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-sm text-studio-accent" aria-live="polite">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="enquiryType" className={labelClassName}>
          What is it?
        </label>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          value={enquiryType}
          aria-invalid={errors.enquiryType ? true : undefined}
          aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}
          onChange={(event) => setEnquiryType(event.target.value)}
          className={selectClassName}
        >
          <option value="" disabled>
            Choose one
          </option>
          {CONTACT_SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.enquiryType ? (
          <p id="enquiryType-error" className="mt-1.5 text-sm text-studio-accent" aria-live="polite">
            {errors.enquiryType}
          </p>
        ) : null}
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
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => setMessage(event.target.value)}
          className={`${inputClassName} resize-y`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-studio-accent" aria-live="polite">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div role="alert" aria-live="polite">
          <FormSendFailure className="text-sm leading-relaxed text-studio-accent" />
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {status === "sending" ? "Sending…" : ""}
      </p>
      <button type="submit" disabled={status === "sending"} className={submitButtonClassName}>
        {status === "sending" ? "Sending…" : "Send it"}
      </button>
      <p className="text-sm leading-relaxed text-studio-muted">
        <Link
          href="/privacy"
          className="text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
        >
          How I use what you send
        </Link>
      </p>
    </form>
  );
}

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);

  return <ContactFormFields key={formKey} onReset={() => setFormKey((key) => key + 1)} />;
}

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, FORMSPREE_FORM_ID } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
import { reportFormError } from "@/components/contact/report-form-error";
import { useFormFailureReport } from "@/components/contact/useFormFailureReport";
import { QUOTE_TOPICS, STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";

// TODO: Confirm NEXT_PUBLIC_FORMSPREE_ID is set in Vercel before using this form in production.

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type FieldErrors = {
  name?: string;
  email?: string;
  enquiryType?: string;
  message?: string;
};

function WarmQuoteFormFields({ onReset }: { onReset: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useFormFailureReport("contact", null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!isValidEmail(email.trim())) next.email = "That email address does not look right.";
    if (!enquiryType) next.enquiryType = "Pick what we can help with.";
    if (!message.trim()) next.message = "Tell us a little about your project.";
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
          _subject: `New quote enquiry from ${new URL(SITE_URL).host}: ${enquiryType}`,
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
    return (
      <div
        className="rounded-3xl border-2 border-[var(--mb-seaglass)] bg-[var(--mb-seaglass-soft)] p-6 text-left sm:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="mb-display text-2xl font-semibold text-[var(--mb-ink)]">
          Thanks, we have your note.
        </p>
        <p className="mt-3 text-base leading-relaxed text-[var(--mb-ink-soft)]">
          RDev Studio will reply by email with next steps and a clear quote. Want a faster back-and-forth?{" "}
          <a
            href={STUDIO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--mb-seaglass-ink)] underline underline-offset-4 hover:text-[var(--mb-ink)]"
          >
            Message us on WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mb-btn-soft mt-6"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const inputBase =
    "mt-2 block w-full min-h-[46px] rounded-2xl border-[1.5px] border-[var(--mb-line-strong)] bg-[var(--mb-cream)] px-4 py-3 text-base text-[var(--mb-ink)] placeholder:text-[var(--mb-ink-faint)] transition-colors focus:border-[var(--mb-terracotta)] focus:bg-[var(--mb-paper)] focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot field */}
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="mb-_gotcha">Leave this blank</label>
        <input id="mb-_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mb-name" className="block text-sm font-semibold text-[var(--mb-ink)]">
            Your name
          </label>
          <input
            type="text"
            id="mb-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Alex from Harbour Coffee"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "mb-name-error" : undefined}
            onChange={(event) => {
              setName(event.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={inputBase}
          />
          {errors.name ? (
            <p id="mb-name-error" className="mt-1.5 text-sm font-semibold text-[var(--mb-terracotta-ink)]" aria-live="polite">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="mb-email" className="block text-sm font-semibold text-[var(--mb-ink)]">
            Email address
          </label>
          <input
            type="email"
            id="mb-email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.co.uk"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "mb-email-error" : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={inputBase}
          />
          {errors.email ? (
            <p id="mb-email-error" className="mt-1.5 text-sm font-semibold text-[var(--mb-terracotta-ink)]" aria-live="polite">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="mb-enquiryType" className="block text-sm font-semibold text-[var(--mb-ink)]">
          What are we building together?
        </label>
        <select
          id="mb-enquiryType"
          name="enquiryType"
          required
          value={enquiryType}
          aria-invalid={errors.enquiryType ? true : undefined}
          aria-describedby={errors.enquiryType ? "mb-enquiryType-error" : undefined}
          onChange={(event) => {
            setEnquiryType(event.target.value);
            if (errors.enquiryType) setErrors((prev) => ({ ...prev, enquiryType: undefined }));
          }}
          className={inputBase}
        >
          <option value="" disabled>
            Choose a project type
          </option>
          {QUOTE_TOPICS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.enquiryType ? (
          <p id="mb-enquiryType-error" className="mt-1.5 text-sm font-semibold text-[var(--mb-terracotta-ink)]" aria-live="polite">
            {errors.enquiryType}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="mb-message" className="block text-sm font-semibold text-[var(--mb-ink)]">
          Tell us about it
        </label>
        <textarea
          id="mb-message"
          name="message"
          required
          rows={4}
          placeholder="What does your business or charity do, what do you need, and are you working to a date?"
          value={message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "mb-message-error" : undefined}
          onChange={(event) => {
            setMessage(event.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          className={`${inputBase} resize-y`}
        />
        {errors.message ? (
          <p id="mb-message-error" className="mt-1.5 text-sm font-semibold text-[var(--mb-terracotta-ink)]" aria-live="polite">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-2xl border border-[var(--mb-terracotta)]/40 bg-[var(--mb-terracotta-soft)] p-4 text-sm font-medium leading-relaxed text-[var(--mb-terracotta-ink)]"
        >
          That form could not send right now. Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-bold underline underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          or{" "}
          <a
            href={STUDIO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline underline-offset-2"
          >
            message RDev Studio on WhatsApp
          </a>
          .
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {status === "sending" ? "Sending your enquiry..." : ""}
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="mb-btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-65"
        >
          {status === "sending" ? "Sending..." : "Send quote request"}
        </button>

        <Link
          href="/privacy"
          className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--mb-ink-soft)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-ink)]"
        >
          How we handle your message
        </Link>
      </div>
    </form>
  );
}

export function WarmQuoteForm() {
  const [formKey, setFormKey] = useState(0);
  return <WarmQuoteFormFields key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

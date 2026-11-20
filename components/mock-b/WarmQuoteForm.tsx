"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, FORMSPREE_FORM_ID } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
import { reportFormError } from "@/components/contact/report-form-error";
import { useFormFailureReport } from "@/components/contact/useFormFailureReport";
import { QUOTE_TOPICS, STUDIO_WHATSAPP_URL } from "@/components/mock-b/data";
import { WhatsAppIcon } from "@/components/mock-b/icons";

// TODO: Confirm NEXT_PUBLIC_FORMSPREE_ID is set in Vercel before using this form in production.

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type FieldName = "name" | "email" | "enquiryType" | "message";

type FieldErrors = Partial<Record<FieldName, string>>;

function validateSingleField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim();
  if (field === "name") {
    return trimmed ? undefined : "Please add your name.";
  }
  if (field === "email") {
    if (!trimmed) return "Please add your email address.";
    return isValidEmail(trimmed) ? undefined : "That email address does not look right.";
  }
  if (field === "enquiryType") {
    return value ? undefined : "Pick what we can help with.";
  }
  if (field === "message") {
    return trimmed ? undefined : "Tell us a little about your project.";
  }
  return undefined;
}

type WarmQuoteFormProps = {
  idPrefix?: string;
  initialTopic?: string;
};

function WarmQuoteFormFields({
  idPrefix = "mb",
  initialTopic = "",
  onReset,
}: {
  idPrefix: string;
  initialTopic: string;
  onReset: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState(() =>
    QUOTE_TOPICS.includes(initialTopic as (typeof QUOTE_TOPICS)[number]) ? initialTopic : "",
  );
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [validationNotice, setValidationNotice] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const enquiryTypeRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useFormFailureReport("contact", null);

  // Support optional ?topic=... pre-selection from /mock-b/services links while keeping routes static.
  useEffect(() => {
    if (initialTopic) return;
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get("topic");
    if (topicParam && QUOTE_TOPICS.includes(topicParam as (typeof QUOTE_TOPICS)[number])) {
      setEnquiryType(topicParam);
    }
  }, [initialTopic]);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  function validateAll(): FieldErrors {
    const next: FieldErrors = {};
    const nameErr = validateSingleField("name", name);
    const emailErr = validateSingleField("email", email);
    const topicErr = validateSingleField("enquiryType", enquiryType);
    const msgErr = validateSingleField("message", message);
    if (nameErr) next.name = nameErr;
    if (emailErr) next.email = emailErr;
    if (topicErr) next.enquiryType = topicErr;
    if (msgErr) next.message = msgErr;
    return next;
  }

  function handleBlur(field: FieldName, value: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateSingleField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  }

  function focusFirstInvalid(nextErrors: FieldErrors) {
    if (nextErrors.name) {
      nameRef.current?.focus();
    } else if (nextErrors.email) {
      emailRef.current?.focus();
    } else if (nextErrors.enquiryType) {
      enquiryTypeRef.current?.focus();
    } else if (nextErrors.message) {
      messageRef.current?.focus();
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const gotcha = String(new FormData(event.currentTarget).get("_gotcha") ?? "");
    if (gotcha.trim()) {
      setStatus("success");
      return;
    }

    const nextErrors = validateAll();
    setTouched({ name: true, email: true, enquiryType: true, message: true });
    setErrors(nextErrors);

    const errorCount = Object.keys(nextErrors).length;
    if (errorCount > 0) {
      setStatus("idle");
      setValidationNotice(
        errorCount === 1
          ? "Please check the highlighted field below before sending."
          : `Please check the ${errorCount} highlighted fields below before sending.`,
      );
      focusFirstInvalid(nextErrors);
      return;
    }

    setValidationNotice("");

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
        ref={successRef}
        tabIndex={-1}
        className="rounded-[var(--mb-radius)] border border-[var(--mb-border-accent)] bg-[var(--mb-accent-subtle)] p-6 text-left outline-none sm:p-7"
        role="status"
        aria-live="polite"
      >
        <p className="mb-kicker">
          Enquiry sent
        </p>
        <p className="mb-display mt-2 text-2xl font-semibold text-[var(--mb-ink)] sm:text-3xl">
          Thanks, we have your note.
        </p>
        <p className="mt-3 text-base leading-relaxed text-[var(--mb-muted)]">
          RDev Studio will reply by email with clear next steps and a tailored quote. Want a quicker back-and-forth?
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={STUDIO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-btn-primary w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            Message on WhatsApp
          </a>
          <button
            type="button"
            onClick={onReset}
            className="mb-btn-secondary w-full sm:w-auto"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const inputBase =
    "mb-input mt-1.5 block w-full min-h-[44px] rounded-[var(--mb-radius)] border bg-[var(--mb-surface)] px-3.5 py-2.5 text-base text-[var(--mb-ink)] placeholder:text-[var(--mb-tertiary)] transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const inputNormal =
    "border-[var(--mb-line-strong)] focus:border-[var(--mb-accent)]";
  const inputInvalid =
    "border-[var(--mb-ochre)] bg-[var(--mb-surface)] focus:border-[var(--mb-ochre)]";

  const isSending = status === "sending";
  const nameId = `${idPrefix}-name`;
  const emailId = `${idPrefix}-email`;
  const topicId = `${idPrefix}-enquiryType`;
  const messageId = `${idPrefix}-message`;
  const messageHintId = `${idPrefix}-message-hint`;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
      noValidate
      aria-busy={isSending || undefined}
    >
      {/* Honeypot field */}
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-_gotcha`}>Leave this blank</label>
        <input
          id={`${idPrefix}-_gotcha`}
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Live validation summary when submit catches missing/invalid fields */}
      {validationNotice ? (
        <div
          role="alert"
          aria-live="polite"
          className="mb-alert rounded-[var(--mb-radius)] border border-[var(--mb-ochre-ink)] bg-[var(--mb-ochre)] px-4 py-3 text-sm font-semibold text-[var(--mb-ink)]"
        >
          {validationNotice}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className="block text-sm font-semibold text-[var(--mb-ink)]">
            Your name
          </label>
          <input
            ref={nameRef}
            type="text"
            id={nameId}
            name="name"
            required
            disabled={isSending}
            autoComplete="name"
            placeholder="Alex from Harbour Coffee"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            onBlur={() => handleBlur("name", name)}
            onChange={(event) => {
              const nextValue = event.target.value;
              setName(nextValue);
              if (touched.name || errors.name) {
                setErrors((prev) => ({
                  ...prev,
                  name: validateSingleField("name", nextValue),
                }));
              }
            }}
            className={`${inputBase} ${errors.name ? inputInvalid : inputNormal}`}
          />
          {errors.name ? (
            <p
              id={`${nameId}-error`}
              className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink)]"
              aria-live="polite"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--mb-radius-sm)] bg-[var(--mb-ochre)] text-[11px] font-bold text-[var(--mb-on-accent)]"
              >
                !
              </span>
              <span>{errors.name}</span>
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={emailId} className="block text-sm font-semibold text-[var(--mb-ink)]">
            Email address
          </label>
          <input
            ref={emailRef}
            type="email"
            id={emailId}
            name="email"
            required
            disabled={isSending}
            autoComplete="email"
            placeholder="you@example.co.uk"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            onBlur={() => handleBlur("email", email)}
            onChange={(event) => {
              const nextValue = event.target.value;
              setEmail(nextValue);
              if (touched.email || errors.email) {
                setErrors((prev) => ({
                  ...prev,
                  email: validateSingleField("email", nextValue),
                }));
              }
            }}
            className={`${inputBase} ${errors.email ? inputInvalid : inputNormal}`}
          />
          {errors.email ? (
            <p
              id={`${emailId}-error`}
              className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink)]"
              aria-live="polite"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--mb-radius-sm)] bg-[var(--mb-ochre)] text-[11px] font-bold text-[var(--mb-on-accent)]"
              >
                !
              </span>
              <span>{errors.email}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={topicId} className="block text-sm font-semibold text-[var(--mb-ink)]">
          What are we building together?
        </label>
        <select
          ref={enquiryTypeRef}
          id={topicId}
          name="enquiryType"
          required
          disabled={isSending}
          value={enquiryType}
          aria-invalid={errors.enquiryType ? true : undefined}
          aria-describedby={errors.enquiryType ? `${topicId}-error` : undefined}
          onBlur={() => handleBlur("enquiryType", enquiryType)}
          onChange={(event) => {
            const nextValue = event.target.value;
            setEnquiryType(nextValue);
            if (touched.enquiryType || errors.enquiryType) {
              setErrors((prev) => ({
                ...prev,
                enquiryType: validateSingleField("enquiryType", nextValue),
              }));
            }
          }}
          className={`${inputBase} ${errors.enquiryType ? inputInvalid : inputNormal}`}
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
          <p
            id={`${topicId}-error`}
            className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink)]"
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--mb-radius-sm)] bg-[var(--mb-ochre)] text-[11px] font-bold text-[var(--mb-on-accent)]"
            >
              !
            </span>
            <span>{errors.enquiryType}</span>
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={messageId} className="block text-sm font-semibold text-[var(--mb-ink)]">
          Tell us about it
        </label>
        <p id={messageHintId} className="mt-1 text-xs leading-relaxed text-[var(--mb-muted)]">
          A few plain-English lines is plenty: what you do, what you need, and whether you are a registered charity.
        </p>
        <textarea
          ref={messageRef}
          id={messageId}
          name="message"
          required
          disabled={isSending}
          rows={4}
          placeholder="What does your business or charity do, what do you need, and are you working to a date?"
          value={message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? `${messageHintId} ${messageId}-error` : messageHintId
          }
          onBlur={() => handleBlur("message", message)}
          onChange={(event) => {
            const nextValue = event.target.value;
            setMessage(nextValue);
            if (touched.message || errors.message) {
              setErrors((prev) => ({
                ...prev,
                message: validateSingleField("message", nextValue),
              }));
            }
          }}
          className={`${inputBase} resize-y ${errors.message ? inputInvalid : inputNormal}`}
        />
        {errors.message ? (
          <p
            id={`${messageId}-error`}
            className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[var(--mb-ink)]"
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--mb-radius-sm)] bg-[var(--mb-ochre)] text-[11px] font-bold text-[var(--mb-on-accent)]"
            >
              !
            </span>
            <span>{errors.message}</span>
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          aria-live="polite"
          className="mb-alert rounded-[var(--mb-radius)] border border-[var(--mb-ochre-ink)] bg-[var(--mb-ochre)] p-4 text-sm leading-relaxed text-[var(--mb-ink)]"
        >
          <p className="font-bold">The form could not send right now.</p>
          <p className="mt-1 font-medium text-[var(--mb-muted)]">
            No need to start over - reach RDev Studio directly by email at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-[var(--mb-link)] underline underline-offset-2 hover:text-[var(--mb-link-hover)]"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            or{" "}
            <a
              href={STUDIO_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--mb-link)] underline underline-offset-2 hover:text-[var(--mb-link-hover)]"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {isSending ? "Sending your quote request..." : ""}
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={isSending}
          className="mb-btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-65"
        >
          {isSending ? (
            <>
              <span
                aria-hidden="true"
                className="mb-spinner h-4 w-4 rounded-full border-2"
              />
              Sending...
            </>
          ) : (
            "Send quote request"
          )}
        </button>

        <Link
          href="/privacy"
          className="inline-flex min-h-[44px] items-center text-sm font-medium text-[var(--mb-muted)] underline decoration-[var(--mb-line-strong)] underline-offset-4 hover:text-[var(--mb-ink)]"
        >
          How we handle your message
        </Link>
      </div>
    </form>
  );
}

export function WarmQuoteForm({ idPrefix = "mb", initialTopic = "" }: WarmQuoteFormProps) {
  const [formKey, setFormKey] = useState(0);
  return (
    <WarmQuoteFormFields
      key={formKey}
      idPrefix={idPrefix}
      initialTopic={initialTopic}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}

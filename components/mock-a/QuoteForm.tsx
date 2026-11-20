"use client";

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import Link from "next/link";
import { FormSendFailure } from "@/components/contact/FormSendFailure";
import { reportFormError } from "@/components/contact/report-form-error";
import { FORMSPREE_FORM_ID } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
import { MOCK_A_ENQUIRY_OPTIONS } from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

/**
 * Mock A quote form. Same mechanism as components/contact/ContactForm.tsx:
 * posts JSON to Formspree using FORMSPREE_FORM_ID (NEXT_PUBLIC_FORMSPREE_ID).
 * When the id is empty it shows the same email/WhatsApp fallback and reports the failure.
 * TODO(Ryan): confirm NEXT_PUBLIC_FORMSPREE_ID is set for Preview deployments in Vercel,
 * otherwise this form will always show the fallback on the preview URL.
 */

type Field = "name" | "email" | "enquiryType" | "message";
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: readonly Field[] = ["name", "email", "enquiryType", "message"];
const FIELD_LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  enquiryType: "What do you need?",
  message: "The project",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** One rule per field, shared by blur checks and the submit check. */
function validateField(field: Field, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      return value ? undefined : "Add your name.";
    case "email":
      if (!value) return "Add an email so the studio can reply.";
      return isValidEmail(value) ? undefined : "That email does not look right. Check for a missing @ or dot.";
    case "enquiryType":
      return value ? undefined : "Choose what this is about.";
    case "message":
      return value ? undefined : "Add a line or two about the project.";
  }
}

function isField(name: string): name is Field {
  return (FIELD_ORDER as readonly string[]).includes(name);
}

export function QuoteForm({
  idPrefix = "q",
  defaultEnquiry = "",
  headingLevel = 3,
}: {
  idPrefix?: string;
  /** Preselects "What do you need?" (must match one of MOCK_A_ENQUIRY_OPTIONS). */
  defaultEnquiry?: string;
  headingLevel?: 2 | 3;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formKey, setFormKey] = useState(0);
  const successRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  const id = (name: string) => `${idPrefix}-${name}`;
  const SuccessHeading = headingLevel === 2 ? "h2" : "h3";

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  /** Check a field once the visitor leaves it, so errors never appear mid-typing. */
  function onBlur(event: FocusEvent<HTMLFormElement>) {
    const target = event.target as unknown as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (!isField(target.name)) return;
    // Do not shout at an empty field the visitor only tabbed through.
    if (!target.value.trim() && !errors[target.name]) return;
    const message = validateField(target.name, target.value);
    setErrors((prev) => ({ ...prev, [target.name]: message }));
  }

  /** Clear a field's error as soon as it becomes valid. */
  function onInput(event: FormEvent<HTMLFormElement>) {
    const target = event.target as unknown as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    if (!isField(target.name) || !errors[target.name]) return;
    if (!validateField(target.name, target.value)) {
      setErrors((prev) => ({ ...prev, [target.name]: undefined }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (value("_gotcha")) {
      setStatus("success");
      return;
    }

    const next: Errors = {};
    for (const field of FIELD_ORDER) {
      const message = validateField(field, value(field));
      if (message) next[field] = message;
    }
    setErrors(next);

    const invalid = FIELD_ORDER.filter((field) => next[field]);
    if (invalid.length > 0) {
      setStatus("idle");
      setSummary(
        `${invalid.length === 1 ? "One field needs" : `${invalid.length} fields need`} fixing: ${invalid
          .map((field) => FIELD_LABELS[field])
          .join(", ")}.`,
      );
      document.getElementById(id(invalid[0]))?.focus();
      return;
    }
    setSummary("");

    if (!FORMSPREE_FORM_ID) {
      // Same graceful fallback as the live ContactForm: show email and WhatsApp instead.
      setStatus("error");
      reportFormError("contact", "formspree");
      requestAnimationFrame(() => alertRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          email: value("email"),
          organisation: value("organisation"),
          enquiryType: value("enquiryType"),
          message: value("message"),
          _gotcha: "",
          _subject: `New quote request from ${new URL(SITE_URL).host} (mock A): ${value("enquiryType")}`,
        }),
      });
      if (!response.ok) {
        setStatus("error");
        reportFormError("contact", "formspree");
        requestAnimationFrame(() => alertRef.current?.focus());
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      reportFormError("contact", "formspree");
      requestAnimationFrame(() => alertRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className={s.success} role="status">
        <SuccessHeading ref={successRef} tabIndex={-1}>
          Sent. Thanks.
        </SuccessHeading>
        <p className={s.small}>The studio will reply by email.</p>
        <button
          type="button"
          className={`${s.btn} ${s.btnGhost}`}
          onClick={() => {
            setErrors({});
            setSummary("");
            setStatus("idle");
            setFormKey((k) => k + 1);
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const describe = (key: keyof Errors) => (errors[key] ? id(`${key}-error`) : undefined);

  return (
    <form
      key={formKey}
      className={s.form}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onInput={onInput}
      noValidate
      aria-busy={status === "sending" || undefined}
    >
      <p className={`${s.small} ${s.formHint}`}>All fields are required unless marked optional.</p>

      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor={id("gotcha")}>Leave this blank</label>
        <input id={id("gotcha")} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={s.formRow}>
        <div className={s.field}>
          <label htmlFor={id("name")} className={s.label}>
            Name
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={s.input}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
          />
          <p id={id("name-error")} className={s.error} aria-live="polite">
            {errors.name ?? ""}
          </p>
        </div>

        <div className={s.field}>
          <label htmlFor={id("email")} className={s.label}>
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            className={s.input}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
          />
          <p id={id("email-error")} className={s.error} aria-live="polite">
            {errors.email ?? ""}
          </p>
        </div>
      </div>

      <div className={s.formRow}>
        <div className={s.field}>
          <label htmlFor={id("organisation")} className={s.label}>
            Business or charity <span className={s.small}>(optional)</span>
          </label>
          <input
            id={id("organisation")}
            name="organisation"
            type="text"
            autoComplete="organization"
            className={s.input}
          />
        </div>

        <div className={s.field}>
          <label htmlFor={id("enquiryType")} className={s.label}>
            What do you need?
          </label>
          <select
            id={id("enquiryType")}
            name="enquiryType"
            required
            defaultValue={defaultEnquiry}
            className={s.select}
            aria-invalid={errors.enquiryType ? true : undefined}
            aria-describedby={describe("enquiryType")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {MOCK_A_ENQUIRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p id={id("enquiryType-error")} className={s.error} aria-live="polite">
            {errors.enquiryType ?? ""}
          </p>
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor={id("message")} className={s.label}>
          The project
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          required
          className={s.textarea}
          placeholder="What it is, who it is for, and when you need it."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message")}
        />
        <p id={id("message-error")} className={s.error} aria-live="polite">
            {errors.message ?? ""}
          </p>
      </div>

      {summary ? (
        <p className={s.errorSummary} role="alert">
          {summary}
        </p>
      ) : null}

      {status === "error" ? (
        <div className={s.alert} role="alert" ref={alertRef} tabIndex={-1}>
          <FormSendFailure />
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {status === "sending" ? "Sending your request." : ""}
      </p>

      <div className={s.formFoot}>
        <button
          type="submit"
          className={`${s.btn} ${s.btnLime} ${s.btnLg}`}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send for a quote"}
          <span className={s.btnArrow} aria-hidden="true">
            &rarr;
          </span>
        </button>
        <Link href="/privacy" className={`${s.inlineLink} ${s.small}`}>
          How what you send is used
        </Link>
      </div>
    </form>
  );
}

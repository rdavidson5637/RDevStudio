"use client";

import { useState, type FormEvent } from "react";
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

type Errors = Partial<Record<"name" | "email" | "enquiryType" | "message", string>>;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function QuoteForm({ idPrefix = "q" }: { idPrefix?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formKey, setFormKey] = useState(0);

  const id = (name: string) => `${idPrefix}-${name}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (value("_gotcha")) {
      setStatus("success");
      return;
    }

    const next: Errors = {};
    if (!value("name")) next.name = "Add your name.";
    if (!isValidEmail(value("email"))) next.email = "That email does not look right.";
    if (!value("enquiryType")) next.enquiryType = "Choose what this is about.";
    if (!value("message")) next.message = "Add a line or two about the project.";
    setErrors(next);

    const firstError = Object.keys(next)[0];
    if (firstError) {
      setStatus("idle");
      document.getElementById(id(firstError))?.focus();
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
      <div className={s.success} role="status">
        <h3>Sent. Thanks.</h3>
        <p className={s.small}>The studio will reply by email.</p>
        <button
          type="button"
          className={`${s.btn} ${s.btnGhost}`}
          onClick={() => {
            setErrors({});
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
    <form key={formKey} className={s.form} onSubmit={onSubmit} noValidate>
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
          {errors.name ? (
            <p id={id("name-error")} className={s.error}>
              {errors.name}
            </p>
          ) : null}
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
          {errors.email ? (
            <p id={id("email-error")} className={s.error}>
              {errors.email}
            </p>
          ) : null}
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
            defaultValue=""
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
          {errors.enquiryType ? (
            <p id={id("enquiryType-error")} className={s.error}>
              {errors.enquiryType}
            </p>
          ) : null}
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
        {errors.message ? (
          <p id={id("message-error")} className={s.error}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <div className={s.alert} role="alert">
          <FormSendFailure />
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {status === "sending" ? "Sending" : ""}
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

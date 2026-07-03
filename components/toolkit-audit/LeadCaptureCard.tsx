"use client";

import { useState } from "react";
import { FORMSPREE_FORM_ID } from "@/lib/constants";

const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : "";

type LeadCaptureCardProps = {
  /** Which tool the lead came from, e.g. "Website Grader". */
  toolName: string;
  /** Short summary of what they just ran, e.g. "example.com scored 62/100". */
  context?: string;
  /** Optional custom heading / blurb. */
  heading?: string;
  blurb?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Drop this under an audit result to turn an anonymous tool user into a lead.
 * Posts to the existing Formspree form, tagged with the tool + context so the
 * enquiry lands with useful detail. Reuses the site's design tokens.
 */
export function LeadCaptureCard({
  toolName,
  context,
  heading = "Want the full report and the fixes?",
  blurb = "Pop in your email and I'll send the detailed breakdown, plus the quick wins that would make the biggest difference. No spam.",
}: LeadCaptureCardProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const honeypot = (
      event.currentTarget.elements.namedItem("company") as HTMLInputElement | null
    )?.value;
    if (honeypot) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }
    setError(null);

    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          tool: toolName,
          context: context ?? "",
          _subject: `New lead from ${toolName}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[10px] border border-accent/40 bg-raised p-6 text-center"
      >
        <p className="font-display text-xl text-primary">Sent - check your inbox soon.</p>
        <p className="mt-2 text-sm text-secondary">
          I&apos;ll be in touch with the full {toolName} breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-border-strong bg-raised p-6">
      <p className="shell-label text-accent">Free report</p>
      <h3 className="mt-2 font-display text-2xl text-primary">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{blurb}</p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row" noValidate>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <label htmlFor="lead-email" className="sr-only">
          Email address
        </label>
        <input
          id="lead-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourbusiness.co.uk"
          className="flex-1 rounded-md border border-border-strong bg-base px-4 py-3 text-primary placeholder:text-secondary/60 focus:border-accent focus:outline-none"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "lead-error" : undefined}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary whitespace-nowrap disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Email me the report"}
        </button>
      </form>

      {error && (
        <p id="lead-error" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
      {status === "error" && !error && (
        <p className="mt-2 text-sm text-red-400">
          Something went wrong. Please try again or use the contact page.
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const NEWSLETTER_FORM_ID = "xanyzkvo";

export function Newsletter() {
  const [state, handleSubmit] = useForm(NEWSLETTER_FORM_ID);
  const [email, setEmail] = useState("");

  if (state.succeeded) {
    return (
      <section className="section-padding border-t border-border bg-raised">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="shell-label mb-3 text-accent">SUBSCRIBED</p>
            <p className="text-lg font-semibold text-primary">
              You&apos;re on the list. I&apos;ll be in touch when there&apos;s something worth sharing.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding border-t border-border bg-raised">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="shell-label mb-3 text-accent">STAY UPDATED</p>
          <h2 className="font-display text-2xl font-bold text-primary sm:text-3xl">
            Get notified about new projects
          </h2>
          <p className="mt-4 text-secondary">
            Occasional updates on new tools, games, and experiments. No spam, unsubscribe anytime.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border-strong bg-base px-4 py-3 text-primary placeholder:text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:w-72"
            />
            <button
              type="submit"
              disabled={state.submitting || !email.trim()}
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-on-accent transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.submitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="mt-2 text-sm text-[#d22b2b]"
          />

          <p className="mt-6 text-xs text-tertiary">
            Join 50+ subscribers. Your email is safe with me.
          </p>
        </div>
      </div>
    </section>
  );
}

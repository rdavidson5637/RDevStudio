"use client";

import { FormEvent, useState } from "react";
import { submitButtonClassName } from "@/components/contact/form-styles";

const inputClassName =
  "w-full flex-grow rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-primary placeholder:text-tertiary transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-[480px]:min-w-0";

export function ComingSoonNewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="mt-6 text-center text-primary" role="status">
        You&apos;re on the list. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex w-full flex-col gap-3 min-[480px]:flex-row"
    >
      <label htmlFor="coming-soon-email" className="sr-only">
        Email address
      </label>
      <input
        id="coming-soon-email"
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className={inputClassName}
      />
      <button type="submit" className={`${submitButtonClassName} shrink-0`}>
        Join Waitlist
      </button>
    </form>
  );
}

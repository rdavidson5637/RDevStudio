"use client";

import { useCallback, useId, useState } from "react";
import {
  DEFAULT_EXAMPLE_URLS,
  validateWebsiteUrl,
} from "@/lib/toolkit-audit/utils";
import { FadeIn } from "./FadeIn";

type UrlAuditFormProps = {
  onSubmit: (url: string) => void;
  disabled?: boolean;
  initialUrl?: string;
  submitLabel?: string;
  hint?: string;
  examples?: readonly { label: string; url: string }[];
};

export function UrlAuditForm({
  onSubmit,
  disabled = false,
  initialUrl = "",
  submitLabel = "Analyse site",
  hint = "We'll run a full audit and summarise the results.",
  examples = DEFAULT_EXAMPLE_URLS,
}: UrlAuditFormProps) {
  const inputId = useId();
  const errorId = useId();
  const hintId = useId();
  const [value, setValue] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback((nextValue: string) => {
    const result = validateWebsiteUrl(nextValue);
    if (!result.valid) {
      setError(result.message);
      return null;
    }
    setError(null);
    return result.normalizedUrl;
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    const normalized = validate(value);
    if (normalized) onSubmit(normalized);
  };

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    if (touched) validate(nextValue);
  };

  const handleExampleSelect = (url: string) => {
    setValue(url);
    setTouched(true);
    setError(null);
  };

  const describedBy = error ? errorId : hintId;

  return (
    <div className="space-y-6">
      <FadeIn
        as="div"
        delayMs={60}
        className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6"
      >
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor={inputId} className="shell-label text-accent">
            Website URL
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <div className="min-w-0 flex-1">
              <input
                id={inputId}
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="https://yoursite.com"
                value={value}
                disabled={disabled}
                onChange={(event) => handleChange(event.target.value)}
                onBlur={() => {
                  setTouched(true);
                  validate(value);
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={`w-full rounded-md border bg-base px-4 py-3 text-base text-primary placeholder:text-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60 ${
                  error
                    ? "border-destructive focus:border-destructive"
                    : "border-border-strong focus:border-accent"
                }`}
              />
              {error ? (
                <p
                  id={errorId}
                  className="mt-2 text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </p>
              ) : (
                <p id={hintId} className="mt-2 text-sm text-tertiary">
                  {hint}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={disabled || !value.trim()}
              className="btn-primary shrink-0 sm:min-w-[9rem]"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </FadeIn>

      <FadeIn delayMs={120}>
        <p className="shell-label mb-3 text-secondary">Try an example</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example.url}
              type="button"
              disabled={disabled}
              onClick={() => handleExampleSelect(example.url)}
              className="rounded-md border border-border-strong bg-base px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-base disabled:cursor-not-allowed disabled:opacity-50"
            >
              {example.label}
            </button>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

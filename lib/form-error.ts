export const FORM_ERROR_FORMS = ["contact", "home-contact", "newsletter", "game-bug"] as const;
export const FORM_ERROR_KINDS = ["network", "formspree", "csp"] as const;

export type FormErrorForm = (typeof FORM_ERROR_FORMS)[number];
export type FormErrorKind = (typeof FORM_ERROR_KINDS)[number];

const FORMSPREE_CODES = new Set([
  "BLOCKED",
  "EMPTY",
  "FILES_TOO_BIG",
  "FORM_NOT_FOUND",
  "INACTIVE",
  "NO_FILE_UPLOADS",
  "PROJECT_NOT_FOUND",
  "TOO_MANY_FILES",
]);

const NETWORK_MESSAGE =
  /failed to fetch|networkerror|load failed|network request failed|unknown error while posting to formspree/i;

type FormLevelError = { code: string; message: string };

/** Form-level Formspree failures only. Field validation returns null. */
export function classifyFormErrors(errors: readonly FormLevelError[]): "network" | "formspree" | null {
  if (errors.length === 0) return null;
  if (errors.some((error) => FORMSPREE_CODES.has(error.code))) return "formspree";
  if (errors.every((error) => error.code === "UNSPECIFIED" && NETWORK_MESSAGE.test(error.message))) {
    return "network";
  }
  return "formspree";
}

export function isFormErrorForm(value: unknown): value is FormErrorForm {
  return typeof value === "string" && (FORM_ERROR_FORMS as readonly string[]).includes(value);
}

export function isFormErrorKind(value: unknown): value is FormErrorKind {
  return typeof value === "string" && (FORM_ERROR_KINDS as readonly string[]).includes(value);
}

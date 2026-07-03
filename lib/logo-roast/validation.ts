import type { ImageValidationResult } from "@/types/logo-roast";
import { ACCEPTED_IMAGE_TYPES, MAX_LOGO_FILE_BYTES } from "./constants";

export function validateLogoFile(
  file: File | null | undefined,
): ImageValidationResult {
  if (!file) {
    return { valid: false, message: "Choose an image file to roast." };
  }

  if (
    !ACCEPTED_IMAGE_TYPES.includes(
      file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
    )
  ) {
    return {
      valid: false,
      message:
        "Use PNG, JPG, WebP, or SVG — other formats aren’t supported yet.",
    };
  }

  if (file.size > MAX_LOGO_FILE_BYTES) {
    return {
      valid: false,
      message: "File is too large. Maximum size is 5 MB.",
    };
  }

  return { valid: true, file };
}

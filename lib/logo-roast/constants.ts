export const LOGO_ROAST_STEPS = [
  { id: "upload", label: "Processing image" },
  { id: "brand", label: "Reviewing brand impact" },
  { id: "type", label: "Analysing typography" },
  { id: "colour", label: "Evaluating colour choices" },
  { id: "scale", label: "Testing scalability" },
  { id: "roast", label: "Writing the roast" },
] as const;

export const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
] as const;

export const ACCEPTED_IMAGE_EXTENSIONS = ".png,.jpg,.jpeg,.webp,.svg";

export const MAX_LOGO_FILE_BYTES = 5 * 1024 * 1024;

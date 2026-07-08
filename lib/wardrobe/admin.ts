// Admin gate. Mutating routes require the admin token in the x-admin-token header.
import "server-only";

export function isAdmin(req: Request): boolean {
  const token = process.env.WARDROBE_ADMIN_TOKEN;
  if (!token || token === "change-me-to-a-long-random-string") return false;
  const provided = req.headers.get("x-admin-token");
  return Boolean(provided) && provided === token;
}

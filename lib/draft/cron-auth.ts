export function unauthorized(authHeader: string | null): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return authHeader !== `Bearer ${secret}`;
}

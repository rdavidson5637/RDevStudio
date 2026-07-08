import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/wardrobe/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/wardrobe/admin/check - lets the client reveal the admin UI if the token is valid.
export async function GET(req: Request) {
  return NextResponse.json({ admin: isAdmin(req) });
}

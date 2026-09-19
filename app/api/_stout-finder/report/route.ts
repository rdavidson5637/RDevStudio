import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isDrink } from "@/lib/stout-finder/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign-in required." }, { status: 401 });
  }

  let body: {
    pubId?: string;
    drink?: string;
    available?: boolean;
    note?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.pubId || !UUID_RE.test(body.pubId)) {
    return NextResponse.json({ error: "Invalid pub." }, { status: 400 });
  }
  if (!body.drink || !isDrink(body.drink)) {
    return NextResponse.json({ error: "Unknown drink." }, { status: 400 });
  }
  if (typeof body.available !== "boolean") {
    return NextResponse.json({ error: "available must be true or false." }, { status: 400 });
  }

  const note =
    typeof body.note === "string" && body.note.trim().length > 0
      ? body.note.trim().slice(0, 280)
      : null;

  const { error } = await supabase.from("reports").insert({
    pub_id: body.pubId,
    drink: body.drink,
    available: body.available,
    note,
    reporter_id: user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You already reported this today." },
        { status: 409 },
      );
    }
    if (error.message.includes("Rate limit exceeded")) {
      return NextResponse.json(
        { error: "Rate limit exceeded, try again later." },
        { status: 429 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

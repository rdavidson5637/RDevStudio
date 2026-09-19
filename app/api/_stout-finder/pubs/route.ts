import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getNearbyPubs } from "@/lib/stout-finder/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function kebab(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function namesSimilar(a: string, b: string): boolean {
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/^the\s+/, "")
      .replace(/[^a-z0-9]+/g, "");
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return false;
  return left === right || left.includes(right) || right.includes(left);
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign-in required." }, { status: 401 });
  }

  let body: {
    name?: string;
    town?: string;
    county?: string;
    address?: string;
    postcode?: string;
    lat?: number;
    lng?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const town = body.town?.trim() ?? "";
  const county = body.county?.trim();
  const lat = Number(body.lat);
  const lng = Number(body.lng);

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (town.length < 2) {
    return NextResponse.json({ error: "Town is required." }, { status: 400 });
  }
  if (county !== "Antrim" && county !== "Down") {
    return NextResponse.json({ error: "County must be Antrim or Down." }, { status: 400 });
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "Drop a pin on the map." }, { status: 400 });
  }

  const nearby = await getNearbyPubs({
    lat,
    lng,
    radiusM: 100,
    drinks: null,
    minConfidence: "any",
    limit: 20,
  });
  const duplicate = nearby.find((pub) => namesSimilar(pub.name, name));
  if (duplicate) {
    return NextResponse.json(
      {
        error: "did_you_mean",
        pub: {
          slug: duplicate.slug,
          name: duplicate.name,
          town: duplicate.town,
        },
      },
      { status: 409 },
    );
  }

  const hash = createHash("sha1")
    .update(`${name}:${lat.toFixed(5)}:${lng.toFixed(5)}`)
    .digest("hex")
    .slice(0, 6);
  const slug = `${kebab(name) || "pub"}-${kebab(town)}-${hash}`;

  const { error } = await supabase.from("pubs").insert({
    slug,
    name,
    town,
    county,
    address: body.address?.trim() || null,
    postcode: body.postcode?.trim() || null,
    lat,
    lng,
    source: "user",
    status: "pending",
    submitted_by: user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A pub with that name is already pending." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Submitted for review. It will not appear on the map until it is approved.",
  });
}

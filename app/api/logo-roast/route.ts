import { NextResponse } from "next/server";
import { extractJsonObject, parseRoastPayload } from "@/lib/logo-roast/parse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

const NOT_CONNECTED =
  "Logo roast is not connected yet. Email ryan@rdevstudio.co.uk and send the file.";

function sameSite(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin" || fetchSite === "same-site") return true;
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: NOT_CONNECTED }, { status: 503 });
  }

  if (!sameSite(request)) {
    return NextResponse.json({ error: "Send the logo from the roast page." }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Send the logo as a file." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file to roast." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Use a PNG, JPG, WebP, or GIF." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large. Maximum size is 4 MB." }, { status: 400 });
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

  let response: Response;
  try {
    response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1200,
        system:
          "You critique one logo from the image. Reply with JSON only, no markdown. " +
          "Use plain sentences and hyphens, never em dashes. " +
          "Do not invent a business name, a sector, or any result you cannot see in the mark. " +
          "Scores are integers from 0 to 100. " +
          "Keys: overall {score, summary, highlights, issues} and categories, an array of " +
          "{id, score, summary, highlights, issues}. " +
          "Category ids, all required: brand, typography, colour, scalability, memorability, accessibility. " +
          "highlights and issues are short string arrays. summary is one or two sentences.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: file.type, data: base64 },
              },
              { type: "text", text: "Roast this logo. JSON only." },
            ],
          },
        ],
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "The roast service did not respond. Try again, or email ryan@rdevstudio.co.uk." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "The roast service did not respond. Try again, or email ryan@rdevstudio.co.uk." },
      { status: 502 },
    );
  }

  const data = (await response.json()) as {
    content?: { type: string; text?: string }[];
  };
  const text = data.content?.find((block) => block.type === "text")?.text ?? "";

  try {
    const parsed = parseRoastPayload(extractJsonObject(text), file.name);
    if (!parsed) {
      return NextResponse.json(
        { error: "The roast came back incomplete. Try again." },
        { status: 502 },
      );
    }
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { error: "The roast came back incomplete. Try again." },
      { status: 502 },
    );
  }
}

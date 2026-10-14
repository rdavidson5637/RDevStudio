import { afterEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "@/app/api/form-error/route";

function post(body: unknown, ip: string) {
  return POST(
    new Request("http://localhost/api/form-error", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify(body),
    }),
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("POST /api/form-error", () => {
  it("returns 204 for a valid body", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await post({ form: "contact", kind: "csp" }, "198.51.100.1");
    expect(response.status).toBe(204);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]?.join(" ")).toBe("[form-error] contact csp");
  });

  it("returns 400 for an unknown form", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await post({ form: "signup", kind: "csp" }, "198.51.100.2");
    expect(response.status).toBe(400);
    expect(spy).not.toHaveBeenCalled();
  });

  it("ignores extra fields and never logs them", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await post(
      {
        form: "home-contact",
        kind: "formspree",
        email: "secret@example.com",
        name: "Ryan",
        message: "please build a site",
      },
      "198.51.100.3",
    );
    expect(response.status).toBe(204);
    const logged = spy.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(logged).toBe("[form-error] home-contact formspree");
    expect(logged).not.toContain("secret@example.com");
    expect(logged).not.toContain("please build a site");
  });

  it("returns 429 on the 11th call in an hour", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const ip = "198.51.100.4";
    for (let call = 0; call < 10; call += 1) {
      const response = await post({ form: "newsletter", kind: "network" }, ip);
      expect(response.status).toBe(204);
    }
    const blocked = await post({ form: "newsletter", kind: "network" }, ip);
    expect(blocked.status).toBe(429);
  });
});

describe("GET /api/form-error", () => {
  it("returns 405", async () => {
    const response = await GET();
    expect(response.status).toBe(405);
  });
});

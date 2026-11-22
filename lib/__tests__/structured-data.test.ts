import { describe, expect, it } from "vitest";
import { buildStructuredDataGraph } from "@/lib/structured-data";

type Node = {
  "@type": string;
  "@id": string;
  [key: string]: unknown;
};

function nodesOf(graph: ReturnType<typeof buildStructuredDataGraph>): Node[] {
  return graph["@graph"] as Node[];
}

function byType(nodes: Node[], type: string): Node {
  const node = nodes.find((item) => item["@type"] === type);
  if (!node) {
    throw new Error(`missing ${type}`);
  }
  return node;
}

function referencedIds(value: unknown, acc: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) referencedIds(item, acc);
    return acc;
  }

  if (!value || typeof value !== "object") {
    return acc;
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length === 1 && keys[0] === "@id" && typeof record["@id"] === "string") {
    acc.push(record["@id"]);
    return acc;
  }

  for (const child of Object.values(record)) referencedIds(child, acc);
  return acc;
}

describe("structured data graph", () => {
  const graph = buildStructuredDataGraph();
  const nodes = nodesOf(graph);

  it("includes Person, WebSite and ProfessionalService", () => {
    expect(graph["@context"]).toBe("https://schema.org");
    expect(nodes.map((node) => node["@type"])).toEqual([
      "Person",
      "WebSite",
      "ProfessionalService",
    ]);
  });

  it("resolves every @id link inside the graph", () => {
    const ids = new Set(nodes.map((node) => node["@id"]));
    expect(ids.size).toBe(nodes.length);

    const website = byType(nodes, "WebSite");
    const business = byType(nodes, "ProfessionalService");
    const person = byType(nodes, "Person");

    expect((website.publisher as { "@id": string })["@id"]).toBe(business["@id"]);
    expect((business.founder as { "@id": string })["@id"]).toBe(person["@id"]);

    for (const id of referencedIds(graph)) {
      expect(ids.has(id)).toBe(true);
    }
  });

  it("lists each service offer without publishing a price", () => {
    const business = byType(nodes, "ProfessionalService");
    const offers = business.makesOffer as {
      "@type": string;
      itemOffered: { "@type": string; name: string };
      priceSpecification?: unknown;
    }[];

    expect(offers.map((offer) => offer.itemOffered.name)).toEqual([
      "Website build",
      "Care plan",
      "Social media",
      "Content",
    ]);
    for (const offer of offers) {
      expect(offer["@type"]).toBe("Offer");
      expect(offer.itemOffered["@type"]).toBe("Service");
      expect(offer.priceSpecification).toBeUndefined();
    }
  });
});

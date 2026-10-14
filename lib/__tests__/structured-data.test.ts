import { describe, expect, it } from "vitest";
import {
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
} from "@/lib/constants";
import { buildStructuredDataGraph } from "@/lib/structured-data";

type Node = {
  "@type": string;
  "@id": string;
  [key: string]: unknown;
};

type PriceSpec = {
  "@type": string;
  price?: number;
  minPrice?: number;
  priceCurrency?: string;
  unitCode?: string;
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

function offerAmount(spec: PriceSpec): number | undefined {
  return spec.price ?? spec.minPrice;
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

  it("prices each offer from the public constants", () => {
    const business = byType(nodes, "ProfessionalService");
    const offers = business.makesOffer as {
      name: string;
      priceSpecification: PriceSpec;
    }[];

    const amount = (name: string) => {
      const offer = offers.find((item) => item.name === name);
      if (!offer) throw new Error(`missing offer ${name}`);
      return offer;
    };

    const website = amount("Website build");
    const care = amount("Care plan");
    const social = amount("Social media");
    const content = amount("Content");

    expect(offerAmount(website.priceSpecification)).toBe(PRICE_WEBSITE_GBP);
    expect(website.priceSpecification.priceCurrency).toBe("GBP");

    expect(care.priceSpecification["@type"]).toBe("UnitPriceSpecification");
    expect(care.priceSpecification.unitCode).toBe("MON");
    expect(offerAmount(care.priceSpecification)).toBe(PRICE_CARE_PLAN_GBP);
    expect(care.priceSpecification.priceCurrency).toBe("GBP");

    expect(offerAmount(social.priceSpecification)).toBe(PRICE_SOCIAL_GBP);
    expect(social.priceSpecification.priceCurrency).toBe("GBP");
    expect(social.priceSpecification.unitCode).toBe("MON");

    expect(offerAmount(content.priceSpecification)).toBe(PRICE_CONTENT_GBP);
    expect(content.priceSpecification.priceCurrency).toBe("GBP");
  });
});

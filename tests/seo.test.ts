import { describe, expect, it } from "vitest";
import { ptBR } from "@/lib/i18n/pt-BR";
import { buildJsonLd, buildMetadata } from "@/lib/seo";

describe("SEO", () => {
  it("mantém a description em até 155 caracteres", () => {
    expect(ptBR.meta.description.length).toBeLessThanOrEqual(155);
  });

  it("usa o template de título da marca", () => {
    expect(buildMetadata(ptBR).title).toMatchObject({ template: "%s · Pier" });
  });

  it("descreve o app como SoftwareApplication gratuito nos três sistemas", () => {
    const app = buildJsonLd(ptBR)["@graph"][0];
    expect(app).toMatchObject({
      "@type": "SoftwareApplication",
      operatingSystem: "macOS, Windows, Linux",
      applicationCategory: "UtilitiesApplication",
      offers: { price: 0 },
    });
  });
});

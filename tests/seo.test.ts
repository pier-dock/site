import { describe, expect, it } from "vitest";
import { getDictionary, localePath, locales } from "@/lib/i18n";
import { buildJsonLd, buildMetadata, languages, ogImagePath } from "@/lib/seo";

describe.each(locales)("SEO em %s", (locale) => {
  const t = getDictionary(locale);

  it("mantém a description em até 155 caracteres", () => {
    expect(t.meta.description.length).toBeLessThanOrEqual(155);
  });

  it("usa o template de título da marca e o canonical do idioma", () => {
    const meta = buildMetadata(t, locale);
    expect(meta.title).toMatchObject({ template: "%s · Pier" });
    expect(meta.alternates?.canonical).toBe(localePath[locale]);
  });

  it("descreve o app como SoftwareApplication gratuito nos três sistemas", () => {
    const app = buildJsonLd(t, locale, "1.4.0")["@graph"][0];
    expect(app).toMatchObject({
      "@type": "SoftwareApplication",
      operatingSystem: "macOS, Windows, Linux",
      applicationCategory: "UtilitiesApplication",
      offers: { price: 0 },
      inLanguage: t.lang,
      softwareVersion: "1.4.0",
    });
    expect(app?.screenshot).toContain(ogImagePath(locale));
  });
});

describe("hreflang", () => {
  it("serve o inglês na raiz e o português em /pt-br", () => {
    expect(languages).toEqual({ en: "/", "pt-BR": "/pt-br", "x-default": "/" });
  });
});

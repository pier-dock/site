import type { Metadata, Viewport } from "next";
import { brand } from "./brand";
import type { Dictionary } from "./i18n/pt-BR";
import { authors, githubRepo, links, siteUrl, version } from "./site";

/** Rotas por idioma. O `en` entra aqui quando a página em inglês existir. */
export const languages = { "pt-BR": "/", "x-default": "/" } as const;

export function buildMetadata(t: Dictionary): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: "%s · Pier" },
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: authors.map((a) => ({ name: a.name })),
    creator: authors.map((a) => a.name).join(", "),
    applicationName: "Pier",
    category: "technology",
    alternates: { canonical: "/", languages },
    openGraph: {
      type: "website",
      url: "/",
      siteName: "Pier",
      locale: t.ogLocale,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: brand.page,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export function buildJsonLd(t: Dictionary) {
  const org = `${siteUrl}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Pier",
        description: t.meta.description,
        url: siteUrl,
        operatingSystem: "macOS, Windows, Linux",
        applicationCategory: "UtilitiesApplication",
        softwareVersion: version,
        downloadUrl: links.latestRelease,
        license: `https://github.com/${githubRepo}/blob/main/LICENSE`,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "BRL" },
        screenshot: `${siteUrl}/opengraph-image`,
        image: `${siteUrl}/opengraph-image`,
        inLanguage: t.locale,
        author: authors.map((a) => ({ "@type": "Person", name: a.name })),
        publisher: { "@id": org },
      },
      {
        "@type": "Organization",
        "@id": org,
        name: "Pier",
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        sameAs: [links.repo],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Pier",
        url: siteUrl,
        inLanguage: t.locale,
        publisher: { "@id": org },
      },
    ],
  };
}

import type { Metadata, Viewport } from "next";
import { brand } from "./brand";
import { localePath, locales, type Dictionary, type Locale } from "./i18n";
import { authors, githubRepo, links, siteUrl, version } from "./site";

/** hreflang → caminho. O x-default aponta para o inglês, servido na raiz. */
export const languages: Record<string, string> = {
  en: localePath.en,
  "pt-BR": localePath["pt-br"],
  "x-default": localePath.en,
};

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

/** URL da imagem gerada por `app/[lang]/opengraph-image.tsx` (id fixo em generateImageMetadata). */
export const ogImagePath = (locale: Locale) => `/${locale}/opengraph-image/card`;

export function buildMetadata(t: Dictionary, locale: Locale): Metadata {
  const path = localePath[locale];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: "%s · Pier" },
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: authors.map((a) => ({ name: a.name })),
    creator: authors.map((a) => a.name).join(", "),
    applicationName: "Pier",
    category: "technology",
    alternates: { canonical: path, languages },
    openGraph: {
      type: "website",
      url: path,
      siteName: "Pier",
      locale: t.ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => (l === "en" ? "en_US" : "pt_BR")),
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

export function buildJsonLd(t: Dictionary, locale: Locale) {
  const org = `${siteUrl}/#organization`;
  const page = absoluteUrl(localePath[locale]);
  const image = absoluteUrl(ogImagePath(locale));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Pier",
        description: t.meta.description,
        url: page,
        operatingSystem: "macOS, Windows, Linux",
        applicationCategory: "UtilitiesApplication",
        softwareVersion: version,
        downloadUrl: links.latestRelease,
        license: `https://github.com/${githubRepo}/blob/main/LICENSE`,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: t.currency },
        screenshot: image,
        image,
        inLanguage: t.lang,
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
        url: `${siteUrl}/`,
        inLanguage: t.lang,
        publisher: { "@id": org },
      },
    ],
  };
}

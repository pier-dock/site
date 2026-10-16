import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n";
import { absoluteUrl, languages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = {
    languages: Object.fromEntries(
      Object.entries(languages).map(([lang, path]) => [lang, absoluteUrl(path)]),
    ),
  };
  return locales.map((locale) => ({
    url: absoluteUrl(localePath[locale]),
    changeFrequency: "weekly",
    priority: locale === "en" ? 1 : 0.9,
    alternates,
  }));
}

import type { MetadataRoute } from "next";
import { languages } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languages).map(([lang, path]) => [lang, `${siteUrl}${path}`]),
        ),
      },
    },
  ];
}

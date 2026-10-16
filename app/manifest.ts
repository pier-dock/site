import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { getDictionary, defaultLocale } from "@/lib/i18n";

const t = getDictionary(defaultLocale);

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pier",
    short_name: "Pier",
    description: t.meta.description,
    lang: t.lang,
    start_url: "/",
    display: "standalone",
    background_color: brand.page,
    theme_color: brand.page,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

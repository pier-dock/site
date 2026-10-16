import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { ptBR } from "@/lib/i18n/pt-BR";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pier",
    short_name: "Pier",
    description: ptBR.meta.description,
    lang: ptBR.locale,
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

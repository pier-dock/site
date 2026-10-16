import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // O inglês é o idioma principal e mora na raiz; /en existe só como rota interna.
  async rewrites() {
    return [{ source: "/", destination: "/en" }];
  },
  async redirects() {
    return [{ source: "/en", destination: "/", permanent: true }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

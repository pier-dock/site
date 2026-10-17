import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Libera o dev server para outros aparelhos da rede local (celular, outro PC); sem isso o
  // Next bloqueia o JS de dev e a página não hidrata.
  allowedDevOrigins: ["192.168.*.*"],
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

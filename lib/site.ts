function trimSlash(url: string) {
  return url.replace(/\/+$/, "");
}

// Na Vercel, sem NEXT_PUBLIC_SITE_URL, vale o domínio de produção do projeto (o .vercel.app
// ou o domínio próprio, quando houver). Os previews também apontam para ele no canonical.
const vercelProduction = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = trimSlash(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelProduction ? `https://${vercelProduction}` : "http://localhost:3000"),
);
export const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || "pier-dock/pier-dock";
/** Só vale quando o GitHub não responde; a versão de verdade vem de `getLatestVersion`. */
export const fallbackVersion = (process.env.NEXT_PUBLIC_VERSION || "0.3.0").replace(/^v/, "");

export const authors = [{ name: "Nathan Ferreira" }, { name: "Matheus Basilio" }] as const;

const repoUrl = `https://github.com/${githubRepo}`;

export const links = {
  repo: repoUrl,
  releases: `${repoUrl}/releases`,
  latestRelease: `${repoUrl}/releases/latest`,
  issues: `${repoUrl}/issues/new`,
} as const;

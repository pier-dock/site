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
export const version = (process.env.NEXT_PUBLIC_VERSION || "0.2.0").replace(/^v/, "");

export const authors = [{ name: "Nathan Ferreira" }, { name: "Matheus Basilio" }] as const;
export function formatAuthors(lang: string) {
  return new Intl.ListFormat(lang, { type: "conjunction" }).format(authors.map((a) => a.name));
}

const repoUrl = `https://github.com/${githubRepo}`;

export const links = {
  repo: repoUrl,
  releases: `${repoUrl}/releases`,
  latestRelease: `${repoUrl}/releases/latest`,
  issues: `${repoUrl}/issues/new`,
  docs: {
    features: `${repoUrl}#features`,
    usage: `${repoUrl}#usage`,
    github: `${repoUrl}#github-widgets`,
    widgets: `${repoUrl}#weather-and-calendar-widgets`,
  },
} as const;

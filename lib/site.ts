function trimSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
export const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || "pier-dock/pier-dock";
export const version = (process.env.NEXT_PUBLIC_VERSION || "0.2.0").replace(/^v/, "");

export const siteHost = new URL(siteUrl).host;

export const authors = [{ name: "Nathan Ferreira" }, { name: "Matheus Basilio" }] as const;
export const authorNames = authors.map((a) => a.name).join(" e ");

const repoUrl = `https://github.com/${githubRepo}`;

export const links = {
  repo: repoUrl,
  releases: `${repoUrl}/releases`,
  latestRelease: `${repoUrl}/releases/latest`,
  issues: `${repoUrl}/issues/new`,
  widgetsDocs: `${repoUrl}#weather-and-calendar-widgets`,
} as const;

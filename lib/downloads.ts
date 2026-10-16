import type { Dictionary } from "./i18n";
import type { OS } from "./os";
import { githubRepo, siteHost, version } from "./site";

export type DownloadLink = { label: string; url: string };

export type Download = {
  label: string;
  button: string;
  file: string;
  /** Linha curta que acompanha o nome do arquivo no hero. */
  fileNote: string;
  req: string;
  via: string;
  cmd: string;
  url: string;
  alts: DownloadLink[];
};

type DownloadConfig = { repo: string; version: string; host: string; t: Dictionary["downloads"] };

export function assetUrl(repo: string, file: string) {
  return `https://github.com/${repo}/releases/latest/download/${file}`;
}

export function buildDownloads({
  repo,
  version: v,
  host,
  t,
}: DownloadConfig): Record<OS, Download> {
  const files = {
    dmg: `Pier_${v}_universal.dmg`,
    exe: `Pier_${v}_x64-setup.exe`,
    appImage: `Pier_${v}_amd64.AppImage`,
    deb: `Pier_${v}_amd64.deb`,
  };
  const release = { label: t.allReleases, url: `https://github.com/${repo}/releases` };

  return {
    mac: {
      label: "macOS",
      button: t.mac.button,
      file: files.dmg,
      fileNote: t.mac.fileNote,
      req: t.mac.req,
      via: "Homebrew",
      cmd: "brew install --cask pier",
      url: assetUrl(repo, files.dmg),
      alts: [release],
    },
    win: {
      label: "Windows",
      button: t.win.button,
      file: files.exe,
      fileNote: t.win.fileNote,
      req: t.win.req,
      via: "winget",
      cmd: "winget install Pier.Pier",
      url: assetUrl(repo, files.exe),
      alts: [release],
    },
    linux: {
      label: "Linux",
      button: t.linux.button,
      file: files.appImage,
      fileNote: t.linux.fileNote,
      req: t.linux.req,
      via: "script",
      cmd: `curl -fsSL https://${host}/install.sh | sh`,
      url: assetUrl(repo, files.appImage),
      alts: [{ label: t.debPackage, url: assetUrl(repo, files.deb) }, release],
    },
  };
}

export function getDownloads(t: Dictionary["downloads"]) {
  return buildDownloads({ repo: githubRepo, version, host: siteHost, t });
}

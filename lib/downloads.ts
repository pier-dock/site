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

type DownloadConfig = { repo: string; version: string; host: string };

export function assetUrl(repo: string, file: string) {
  return `https://github.com/${repo}/releases/latest/download/${file}`;
}

export function buildDownloads({ repo, version: v, host }: DownloadConfig): Record<OS, Download> {
  const files = {
    dmg: `Pier_${v}_universal.dmg`,
    exe: `Pier_${v}_x64-setup.exe`,
    appImage: `Pier_${v}_amd64.AppImage`,
    deb: `Pier_${v}_amd64.deb`,
  };
  const release = { label: "Todas as versões", url: `https://github.com/${repo}/releases` };

  return {
    mac: {
      label: "macOS",
      button: "Baixar para macOS",
      file: files.dmg,
      fileNote: "Apple Silicon e Intel",
      req: "macOS 12 ou mais recente",
      via: "Homebrew",
      cmd: "brew install --cask pier",
      url: assetUrl(repo, files.dmg),
      alts: [release],
    },
    win: {
      label: "Windows",
      button: "Baixar para Windows",
      file: files.exe,
      fileNote: "x64",
      req: "Windows 10 ou 11",
      via: "winget",
      cmd: "winget install Pier.Pier",
      url: assetUrl(repo, files.exe),
      alts: [release],
    },
    linux: {
      label: "Linux",
      button: "Baixar para Linux",
      file: files.appImage,
      fileNote: "x86_64",
      req: "GNOME 45 a 49",
      via: "script",
      cmd: `curl -fsSL https://${host}/install.sh | sh`,
      url: assetUrl(repo, files.appImage),
      alts: [{ label: "Pacote .deb", url: assetUrl(repo, files.deb) }, release],
    },
  };
}

export const downloads = buildDownloads({ repo: githubRepo, version, host: siteHost });

import type { Dictionary } from "./i18n";
import type { OS } from "./os";
import { githubRepo } from "./site";

/** `newTab` só para páginas: arquivo baixa sem sair do site, e em aba nova abriria uma aba vazia. */
export type DownloadLink = { label: string; url: string; newTab?: boolean };

export type Download = {
  label: string;
  button: string;
  file: string;
  /** Linha curta que acompanha o nome do arquivo no hero. */
  fileNote: string;
  req: string;
  url: string;
  alts: DownloadLink[];
};

type DownloadConfig = { repo: string; version: string; t: Dictionary["downloads"] };

// Aponta para a tag, não para /latest: o nome do arquivo leva a versão, então se o cache ainda
// guardar a anterior logo após uma release, /latest/download/<arquivo antigo> daria 404.
export function assetUrl(repo: string, version: string, file: string) {
  return `https://github.com/${repo}/releases/download/v${version}/${file}`;
}

export function buildDownloads({ repo, version: v, t }: DownloadConfig): Record<OS, Download> {
  const files = {
    dmg: `Pier_${v}_universal.dmg`,
    exe: `Pier_${v}_x64-setup.exe`,
    appImage: `Pier_${v}_amd64.AppImage`,
    deb: `Pier_${v}_amd64.deb`,
  };
  const release = {
    label: t.allReleases,
    url: `https://github.com/${repo}/releases`,
    newTab: true,
  };

  return {
    mac: {
      label: "macOS",
      button: t.mac.button,
      file: files.dmg,
      fileNote: t.mac.fileNote,
      req: t.mac.req,
      url: assetUrl(repo, v, files.dmg),
      alts: [release],
    },
    win: {
      label: "Windows",
      button: t.win.button,
      file: files.exe,
      fileNote: t.win.fileNote,
      req: t.win.req,
      url: assetUrl(repo, v, files.exe),
      alts: [release],
    },
    linux: {
      label: "Linux",
      button: t.linux.button,
      file: files.appImage,
      fileNote: t.linux.fileNote,
      req: t.linux.req,
      url: assetUrl(repo, v, files.appImage),
      alts: [{ label: t.debPackage, url: assetUrl(repo, v, files.deb) }, release],
    },
  };
}

export function getDownloads(t: Dictionary["downloads"], version: string) {
  return buildDownloads({ repo: githubRepo, version, t });
}

import { describe, expect, it } from "vitest";
import { buildDownloads } from "@/lib/downloads";
import { getDictionary, locales } from "@/lib/i18n";
import { osList } from "@/lib/os";

const config = { repo: "acme/pier", version: "1.4.0" };
const downloads = buildDownloads({ ...config, t: getDictionary("en").downloads });

describe("buildDownloads", () => {
  it("monta as URLs da última release com repo e versão", () => {
    expect(downloads.mac.url).toBe(
      "https://github.com/acme/pier/releases/latest/download/Pier_1.4.0_universal.dmg",
    );
    expect(downloads.win.url).toBe(
      "https://github.com/acme/pier/releases/latest/download/Pier_1.4.0_x64-setup.exe",
    );
    expect(downloads.linux.url).toBe(
      "https://github.com/acme/pier/releases/latest/download/Pier_1.4.0_amd64.AppImage",
    );
  });

  it.each(osList)("preenche todos os campos de %s", (os) => {
    const d = downloads[os];
    for (const value of [d.label, d.button, d.file, d.fileNote, d.req, d.url]) {
      expect(value).not.toBe("");
    }
    expect(d.url.endsWith(d.file)).toBe(true);
    expect(d.alts.length).toBeGreaterThan(0);
  });

  it.each(locales)("traduz os botões em %s", (locale) => {
    const d = buildDownloads({ ...config, t: getDictionary(locale).downloads });
    expect(d.mac.button).toBe(getDictionary(locale).downloads.mac.button);
    expect(d.mac.url).toBe(downloads.mac.url);
  });
});

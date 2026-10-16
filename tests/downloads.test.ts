import { describe, expect, it } from "vitest";
import { buildDownloads } from "@/lib/downloads";
import { osList } from "@/lib/os";

const downloads = buildDownloads({ repo: "acme/pier", version: "1.4.0", host: "pier.dev" });

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

  it("usa o domínio do site no script de instalação", () => {
    expect(downloads.linux.cmd).toBe("curl -fsSL https://pier.dev/install.sh | sh");
  });

  it.each(osList)("preenche todos os campos de %s", (os) => {
    const d = downloads[os];
    for (const value of [d.label, d.button, d.file, d.fileNote, d.req, d.via, d.cmd, d.url]) {
      expect(value).not.toBe("");
    }
    expect(d.url.endsWith(d.file)).toBe(true);
    expect(d.alts.length).toBeGreaterThan(0);
  });
});

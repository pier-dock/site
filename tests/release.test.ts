import { describe, expect, it } from "vitest";
import { versionFromTagUrl } from "@/lib/release";

describe("versionFromTagUrl", () => {
  it("tira a versão da URL da tag, sem o v", () => {
    expect(versionFromTagUrl("https://github.com/acme/pier/releases/tag/v0.4.0")).toBe("0.4.0");
    expect(versionFromTagUrl("https://github.com/acme/pier/releases/tag/1.2.3-beta.1")).toBe(
      "1.2.3-beta.1",
    );
  });

  it("devolve null quando não há redirect para uma tag", () => {
    expect(versionFromTagUrl(null)).toBeNull();
    expect(versionFromTagUrl("https://github.com/acme/pier/releases")).toBeNull();
  });
});

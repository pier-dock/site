import { describe, expect, it } from "vitest";
import { osList } from "@/lib/os";
import { shortcutKeys } from "@/lib/shortcuts";

describe("atalhos por sistema", () => {
  it("tem os modificadores de todo sistema", () => {
    expect(Object.keys(shortcutKeys).sort()).toEqual([...osList].sort());
  });

  it("usa Control e Option no Mac e Ctrl e Alt no resto", () => {
    expect(shortcutKeys.mac.words).toBe("Control Option");
    expect(shortcutKeys.win.words).toBe("Ctrl Alt");
    expect(shortcutKeys.linux.words).toBe("Ctrl Alt");
  });
});

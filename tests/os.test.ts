import { describe, expect, it } from "vitest";
import { detectPlatform } from "@/lib/os";

const UA = {
  macChrome:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  macSafari:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15",
  macFirefox:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:143.0) Gecko/20100101 Firefox/143.0",
  winChrome:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  winEdge:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0",
  winFirefox: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0",
  linuxFirefox: "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
  ubuntuFirefox: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
  linuxChrome:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  chromeOS:
    "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  androidPhone:
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36",
  androidTablet:
    "Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  iPhone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1",
  iPadLegacy:
    "Mozilla/5.0 (iPad; CPU OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
  iPadOS:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15",
};

describe("detectPlatform", () => {
  it.each([
    ["macOS Chrome", UA.macChrome],
    ["macOS Safari", UA.macSafari],
    ["macOS Firefox", UA.macFirefox],
  ])("detecta %s como mac", (_, userAgent) => {
    expect(detectPlatform({ userAgent })).toEqual({ os: "mac", isMobile: false });
  });

  it.each([
    ["Windows Chrome", UA.winChrome],
    ["Windows Edge", UA.winEdge],
    ["Windows Firefox", UA.winFirefox],
  ])("detecta %s como win", (_, userAgent) => {
    expect(detectPlatform({ userAgent })).toEqual({ os: "win", isMobile: false });
  });

  it.each([
    ["Linux Firefox", UA.linuxFirefox],
    ["Ubuntu Firefox", UA.ubuntuFirefox],
    ["Linux Chrome", UA.linuxChrome],
    ["ChromeOS", UA.chromeOS],
  ])("detecta %s como linux", (_, userAgent) => {
    expect(detectPlatform({ userAgent })).toEqual({ os: "linux", isMobile: false });
  });

  it.each([
    ["Android (celular)", UA.androidPhone],
    ["Android (tablet)", UA.androidTablet],
    ["iPhone", UA.iPhone],
    ["iPad antigo", UA.iPadLegacy],
  ])("marca %s como mobile", (_, userAgent) => {
    expect(detectPlatform({ userAgent }).isMobile).toBe(true);
  });

  it("marca iPadOS como mobile pelo suporte a toque", () => {
    expect(detectPlatform({ userAgent: UA.iPadOS, maxTouchPoints: 5 }).isMobile).toBe(true);
    expect(detectPlatform({ userAgent: UA.iPadOS, maxTouchPoints: 0 }).isMobile).toBe(false);
  });

  it("prioriza os client hints sobre o user agent", () => {
    // O Chrome reduz o UA no Windows 11 para "Windows NT 10.0", mas os hints são confiáveis.
    expect(detectPlatform({ userAgent: UA.linuxChrome, uaPlatform: "Windows" }).os).toBe("win");
    expect(detectPlatform({ userAgent: UA.winChrome, uaPlatform: "macOS" }).os).toBe("mac");
    expect(detectPlatform({ userAgent: UA.winChrome, uaPlatform: "Linux" }).os).toBe("linux");
    expect(detectPlatform({ userAgent: UA.chromeOS, uaPlatform: "Chrome OS" }).os).toBe("linux");
    expect(detectPlatform({ userAgent: UA.androidPhone, uaPlatform: "Android" }).isMobile).toBe(
      true,
    );
  });

  it("ignora o hint Unknown e usa o user agent", () => {
    expect(detectPlatform({ userAgent: UA.winChrome, uaPlatform: "Unknown" }).os).toBe("win");
  });

  it("cai no padrão mac quando não reconhece nada", () => {
    expect(detectPlatform({ userAgent: "" })).toEqual({ os: "mac", isMobile: false });
    expect(detectPlatform({ userAgent: "curl/8.7.1" })).toEqual({ os: "mac", isMobile: false });
  });
});

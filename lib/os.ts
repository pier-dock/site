export type OS = "mac" | "win" | "linux";

export const osList: readonly OS[] = ["mac", "win", "linux"];

export type PlatformInput = {
  userAgent: string;
  /** `navigator.userAgentData.platform` (client hints), quando o navegador expõe. */
  uaPlatform?: string;
  maxTouchPoints?: number;
};

export type Platform = { os: OS; isMobile: boolean };

export const defaultPlatform: Platform = { os: "mac", isMobile: false };

export function detectPlatform({
  userAgent,
  uaPlatform = "",
  maxTouchPoints = 0,
}: PlatformInput): Platform {
  const rawHint = uaPlatform.toLowerCase();
  const hint = rawHint === "unknown" ? "" : rawHint;
  const ua = userAgent.toLowerCase();

  if (hint === "android" || hint === "ios" || /android|iphone|ipad|ipod/.test(ua)) {
    return { os: "mac", isMobile: true };
  }

  // O Safari do iPadOS se apresenta como um Mac; só o suporte a toque denuncia o tablet.
  if (/macintosh/.test(ua) && maxTouchPoints > 1) {
    return { os: "mac", isMobile: true };
  }

  const source = hint || ua;
  if (/win/.test(source)) return { os: "win", isMobile: false };
  if (/mac/.test(source)) return { os: "mac", isMobile: false };
  if (/linux|x11|cros|chrome os|chromium os/.test(source)) return { os: "linux", isMobile: false };

  return defaultPlatform;
}

"use client";

import { createContext, use, useMemo, useState, useSyncExternalStore } from "react";
import { defaultPlatform, detectPlatform, type OS, type Platform } from "@/lib/os";

type NavigatorWithHints = Navigator & { userAgentData?: { platform?: string } };

let cached: Platform | null = null;

function readPlatform(): Platform {
  if (!cached) {
    const nav = navigator as NavigatorWithHints;
    cached = detectPlatform({
      userAgent: nav.userAgent,
      uaPlatform: nav.userAgentData?.platform,
      maxTouchPoints: nav.maxTouchPoints,
    });
  }
  return cached;
}

const subscribe = () => () => {};
const serverPlatform = () => defaultPlatform;

type OSContextValue = {
  os: OS;
  detected: OS;
  isMobile: boolean;
  setOs: (os: OS) => void;
};

const OSContext = createContext<OSContextValue | null>(null);

export function OSProvider({ children }: { children: React.ReactNode }) {
  // O HTML estático sai com o padrão "mac"; na hidratação o React troca pelo valor do navegador.
  const platform = useSyncExternalStore(subscribe, readPlatform, serverPlatform);
  const [picked, setOs] = useState<OS | null>(null);

  const value = useMemo(
    () => ({
      os: picked ?? platform.os,
      detected: platform.os,
      isMobile: platform.isMobile,
      setOs,
    }),
    [picked, platform],
  );

  return <OSContext value={value}>{children}</OSContext>;
}

export function useOS() {
  const ctx = use(OSContext);
  if (!ctx) throw new Error("useOS precisa estar dentro de <OSProvider>");
  return ctx;
}

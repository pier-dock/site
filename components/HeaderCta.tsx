"use client";

import type { OS } from "@/lib/os";
import { AppleIcon, LinuxIcon, WindowsIcon } from "./icons";
import { useOS } from "./OSProvider";

const osIcon: Record<OS, typeof AppleIcon> = { mac: AppleIcon, win: WindowsIcon, linux: LinuxIcon };

export function HeaderCta({ label }: { label: string }) {
  const { os, isMobile, downloads } = useOS();
  const OsIcon = osIcon[os];

  // No celular não há instalador: o botão leva à seção de download. O ícone some só por CSS
  // abaixo do sm, para a largura não mudar quando a hidratação descobre que é celular.
  return (
    <a
      href={isMobile ? "#download" : downloads[os].url}
      aria-label={isMobile ? undefined : downloads[os].button}
      className="flex h-9 items-center gap-2 rounded-[10px] bg-fg px-5 text-sm font-semibold text-fg-inverse shadow-nav-cta transition-opacity hover:opacity-90"
    >
      <OsIcon size={15} className="max-sm:hidden" />
      {label}
    </a>
  );
}

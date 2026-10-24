"use client";

import Image from "next/image";
import braveIcon from "@/assets/apps/brave.svg";
import spotifyIcon from "@/assets/apps/spotify.svg";
import vscodeIcon from "@/assets/apps/vscode.svg";
import { fill } from "@/lib/i18n";
import { shortcutKeys } from "@/lib/shortcuts";
import { useOS } from "./OSProvider";

const shortcuts = [
  { name: "Visual Studio Code", icon: vscodeIcon, key: 1, delay: "delay-0" },
  { name: "Spotify", icon: spotifyIcon, key: 2, delay: "delay-75" },
  { name: "Brave Browser", icon: braveIcon, key: 3, delay: "delay-150" },
];

type ShortcutsContentProps = { body: string; bodyClassName: string };

export function ShortcutsContent({ body, bodyClassName }: ShortcutsContentProps) {
  const { os } = useOS();
  const keys = shortcutKeys[os];

  return (
    <>
      <p className={bodyClassName}>{fill(body, { keys: keys.words })}</p>
      <ul className="relative m-0 mt-auto flex list-none flex-col gap-2 p-0">
        {shortcuts.map((s) => (
          <li key={s.key} className="flex items-center gap-2.5 text-sm">
            <Image
              src={s.icon}
              alt=""
              width={26}
              height={26}
              className={`size-[26px] rounded-[7px] transition-transform duration-300 ease-out group-hover:[transform:translateY(-3px)_scale(1.12)] ${s.delay}`}
            />
            <span className="flex-1">{s.name}</span>
            <kbd
              className={`rounded bg-white/8 px-1.5 py-0.5 font-mono text-[11px] text-fg-2 transition-colors duration-300 group-hover:bg-white/14 group-hover:text-fg ${s.delay}`}
            >
              {keys.keycaps} {s.key}
            </kbd>
          </li>
        ))}
      </ul>
    </>
  );
}

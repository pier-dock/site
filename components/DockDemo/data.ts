import type { StaticImageData } from "next/image";
import braveIcon from "@/assets/apps/brave.svg";
import spotifyIcon from "@/assets/apps/spotify.svg";
import terminalIcon from "@/assets/apps/terminal.svg";
import vscodeIcon from "@/assets/apps/vscode.svg";
import { githubRepo } from "@/lib/site";

export type AppId = "vscode" | "spotify" | "terminal" | "brave";

export type DemoApp = { id: AppId; name: string; icon: StaticImageData; key: number };

export const apps: DemoApp[] = [
  { id: "vscode", name: "Visual Studio Code", icon: vscodeIcon, key: 1 },
  { id: "spotify", name: "Spotify", icon: spotifyIcon, key: 2 },
  { id: "terminal", name: "Terminal", icon: terminalIcon, key: 3 },
  { id: "brave", name: "Brave Browser", icon: braveIcon, key: 4 },
];

export type WindowTheme = {
  title: string;
  bg: string;
  bar: string;
  fg: string;
  dots: string;
  border: string;
};

export const windows: Record<AppId, WindowTheme> = {
  vscode: {
    title: "Dock.tsx — pier",
    bg: "bg-code-bg",
    bar: "bg-code-bar",
    fg: "text-fg-2",
    dots: "bg-win-dots-dark",
    border: "border-line-12",
  },
  spotify: {
    title: "Spotify",
    bg: "bg-vinyl",
    bar: "bg-spotify-bar",
    fg: "text-spotify-sub",
    dots: "bg-win-dots-dark",
    border: "border-white/10",
  },
  terminal: {
    title: "Terminal — zsh",
    bg: "bg-term-bg",
    bar: "bg-graphite",
    fg: "text-fg-2",
    dots: "bg-win-dots-dark",
    border: "border-line-14",
  },
  brave: {
    title: "Brave",
    bg: "bg-white",
    bar: "bg-win-chrome",
    fg: "text-win-ink",
    dots: "bg-win-dots",
    border: "border-black/10",
  },
};

export const editorFiles = [
  { name: "▾ src", depth: 0 },
  { name: "Dock.tsx", depth: 1, active: true },
  { name: "Glass.tsx", depth: 1 },
  { name: "widgets.ts", depth: 1 },
  { name: "package.json", depth: 0 },
];

export type Track = { name: string; duration: number };

/** In Rainbows, na ordem do disco. Durações em segundos. */
export const tracks: Track[] = [
  { name: "15 Step", duration: 237 },
  { name: "Bodysnatchers", duration: 242 },
  { name: "Nude", duration: 255 },
  { name: "Weird Fishes/Arpeggi", duration: 318 },
  { name: "All I Need", duration: 228 },
  { name: "Faust Arp", duration: 129 },
  { name: "Reckoner", duration: 290 },
  { name: "House of Cards", duration: 328 },
  { name: "Jigsaw Falling into Place", duration: 248 },
  { name: "Videotape", duration: 279 },
];

export const reviews = [
  { title: "Blur nativo no KDE Wayland", meta: `${githubRepo} · há 2 h` },
  { title: "Widget de Agenda: botão Entrar", meta: `${githubRepo} · há 5 h` },
  { title: "Corrige atalho Ctrl+Alt no Windows", meta: `${githubRepo} · ontem` },
];

export const pendingReviews = 12;
export const contributions = "2.142";
export const battery = 79;

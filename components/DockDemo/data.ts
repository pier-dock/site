import type { StaticImageData } from "next/image";
import braveIcon from "@/assets/apps/brave.svg";
import spotifyIcon from "@/assets/apps/spotify.svg";
import terminalIcon from "@/assets/apps/terminal.svg";
import vscodeIcon from "@/assets/apps/vscode.svg";

export type AppId = "vscode" | "spotify" | "terminal" | "brave";

export type DemoApp = { id: AppId; name: string; icon: StaticImageData; key: number };

export const apps: DemoApp[] = [
  { id: "vscode", name: "Visual Studio Code", icon: vscodeIcon, key: 1 },
  { id: "spotify", name: "Spotify", icon: spotifyIcon, key: 2 },
  { id: "terminal", name: "Terminal", icon: terminalIcon, key: 3 },
  { id: "brave", name: "Brave Browser", icon: braveIcon, key: 4 },
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

export const pendingReviews = 12;
export const battery = 79;

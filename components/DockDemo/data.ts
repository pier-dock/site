import { githubRepo } from "@/lib/site";

export type AppId = "finder" | "spotify" | "terminal" | "brave";

export type DemoApp = { id: AppId; name: string; initials: string; color: string; key: number };

export const apps: DemoApp[] = [
  { id: "finder", name: "Finder", initials: "Fi", color: "bg-app-finder", key: 1 },
  { id: "spotify", name: "Spotify", initials: "Sp", color: "bg-app-spotify", key: 2 },
  { id: "terminal", name: "Terminal", initials: ">_", color: "bg-app-terminal", key: 3 },
  { id: "brave", name: "Brave Browser", initials: "Br", color: "bg-app-brave", key: 4 },
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
  finder: {
    title: "Finder — Documentos",
    bg: "bg-win-paper",
    bar: "bg-win-bar",
    fg: "text-win-ink",
    dots: "bg-win-dots",
    border: "border-black/10",
  },
  spotify: {
    title: "Spotify",
    bg: "bg-vinyl",
    bar: "bg-spotify-bar",
    fg: "text-spotify-sub",
    dots: "bg-app-terminal",
    border: "border-white/10",
  },
  terminal: {
    title: "Terminal — zsh",
    bg: "bg-term-bg",
    bar: "bg-graphite",
    fg: "text-fg-2",
    dots: "bg-app-terminal",
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

export const folders = [
  "Projetos",
  "Design",
  "Fotos",
  "Música",
  "Notas",
  "Faturas",
  "Livros",
  "Viagem",
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

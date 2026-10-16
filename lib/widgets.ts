import type { StaticImageData } from "next/image";
import spotifyIcon from "@/assets/apps/spotify.svg";
import type { Dictionary } from "./i18n";
import { links } from "./site";

export type WidgetIcon = "music" | "timer" | "calendar" | "sun" | "pullRequest" | "pulse";

type WidgetBase = {
  name: string;
  description: string;
  icon: WidgetIcon;
  /** Ícone do app no lugar do símbolo, quando o widget representa um app específico. */
  logo?: StaticImageData;
  /** Cor do ícone no chip do cabeçalho (classe de texto). */
  accent: string;
  /** Utilitário de `globals.css` com o fundo, o brilho radial e a borda do card. */
  theme: string;
  /** Resumo lido por leitores de tela no lugar da ilustração. */
  visualLabel: string;
  /** Para onde o card leva: a documentação do widget no README do app. */
  docs: string;
};

export type MediaData = {
  track: string;
  artist: string;
  album: string;
  position: string;
  duration: string;
  progress: number;
};

export type PomodoroData = {
  remaining: string;
  phase: string;
  pause: string;
  progress: number;
  sessions: number;
  done: number;
};

export type AgendaEvent = { time: string; title: string; dot: string };
export type AgendaData = {
  nowLabel: string;
  join: string;
  now: { range: string; title: string; endsIn: string };
  next: AgendaEvent[];
};

export type WeatherIcon = "cloud" | "rain" | "moon";
export type WeatherData = {
  temp: string;
  summary: string;
  alert: string;
  hours: { time: string; temp: string; icon: WeatherIcon; tone: string }[];
};

export type GitHubData = {
  total: string;
  caption: string;
  prsLabel: string;
  reviewsLabel: string;
  prs: number;
  reviews: number;
};

export type SystemData = {
  cpuLabel: string;
  cpu: number;
  cpuSeries: number[];
  memoryLabel: string;
  memory: string;
  memoryPct: number;
  networkLabel: string;
  network: string;
};

export type Widget = WidgetBase &
  (
    | { id: "media"; data: MediaData }
    | { id: "pomodoro"; data: PomodoroData }
    | { id: "agenda"; data: AgendaData }
    | { id: "weather"; data: WeatherData }
    | { id: "github"; data: GitHubData }
    | { id: "system"; data: SystemData }
  );

export type WidgetId = Widget["id"];

function series(n: number, seed: number, base: number, amp: number) {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    const r = Math.abs(Math.sin((i + 1) * seed) * 43758.5453) % 1;
    v = Math.max(5, Math.min(95, v + (r - 0.5) * amp));
    out.push(v);
  }
  return out;
}

const cpuSeries = series(30, 12.9898, 30, 18);

const weatherHours: { icon: WeatherIcon; tone: string; temp: string }[] = [
  { icon: "cloud", tone: "text-fg", temp: "24°" },
  { icon: "rain", tone: "text-weather-rain", temp: "23°" },
  { icon: "rain", tone: "text-weather-rain", temp: "22°" },
  { icon: "cloud", tone: "text-fg", temp: "21°" },
  { icon: "moon", tone: "text-fg-2", temp: "20°" },
];

const agendaNext = [
  { time: "17:30", dot: "bg-coral" },
  { time: "19:00", dot: "bg-green" },
  { time: "09:30", dot: "bg-agenda-accent" },
];

/** Os textos vêm do dicionário do idioma; números, cores e ícones ficam aqui. */
export function getWidgets(t: Dictionary["widgets"]["items"]): Widget[] {
  const { media, pomodoro, agenda, weather, github, system } = t;
  return [
    {
      id: "media",
      name: media.name,
      description: media.description,
      icon: "music",
      logo: spotifyIcon,
      accent: "text-media-accent",
      theme: "widget-media",
      visualLabel: media.visualLabel,
      docs: links.docs.features,
      data: {
        track: "Weird Fishes/Arpeggi",
        artist: "Radiohead",
        album: "In Rainbows",
        position: "2:13",
        duration: "5:18",
        progress: 42,
      },
    },
    {
      id: "pomodoro",
      name: pomodoro.name,
      description: pomodoro.description,
      icon: "timer",
      accent: "text-coral-soft",
      theme: "widget-pomodoro",
      visualLabel: pomodoro.visualLabel,
      docs: links.docs.widgets,
      data: {
        remaining: "18:42",
        phase: pomodoro.phase,
        pause: pomodoro.pause,
        progress: 0.748,
        sessions: 4,
        done: 2,
      },
    },
    {
      id: "agenda",
      name: agenda.name,
      description: agenda.description,
      icon: "calendar",
      accent: "text-agenda-accent",
      theme: "widget-agenda",
      visualLabel: agenda.visualLabel,
      docs: links.docs.widgets,
      data: {
        nowLabel: agenda.now,
        join: agenda.join,
        now: { range: "16:00 – 16:30", title: agenda.nowTitle, endsIn: agenda.endsIn },
        next: agendaNext.map((e, i) => ({ ...e, title: agenda.next[i] ?? "" })),
      },
    },
    {
      id: "weather",
      name: weather.name,
      description: weather.description,
      icon: "sun",
      accent: "text-weather-sun",
      theme: "widget-weather",
      visualLabel: weather.visualLabel,
      docs: links.docs.widgets,
      data: {
        temp: "24°",
        summary: weather.summary,
        alert: weather.alert,
        hours: weatherHours.map((h, i) => ({ ...h, time: weather.hours[i] ?? "" })),
      },
    },
    {
      id: "github",
      name: github.name,
      description: github.description,
      icon: "pullRequest",
      accent: "text-fg",
      theme: "widget-github",
      visualLabel: github.visualLabel,
      docs: links.docs.github,
      data: {
        total: github.total,
        caption: github.caption,
        prsLabel: github.prs,
        reviewsLabel: github.reviews,
        prs: 0,
        reviews: 12,
      },
    },
    {
      id: "system",
      name: system.name,
      description: system.description,
      icon: "pulse",
      accent: "text-lilac",
      theme: "widget-system",
      visualLabel: system.visualLabel,
      docs: links.docs.features,
      data: {
        cpuLabel: system.cpu,
        cpu: 34,
        cpuSeries,
        memoryLabel: system.memory,
        memory: system.memoryValue,
        memoryPct: 68,
        networkLabel: system.network,
        network: system.networkValue,
      },
    },
  ];
}

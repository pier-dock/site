export type WidgetIcon = "music" | "timer" | "calendar" | "sun" | "pullRequest" | "pulse";

type WidgetBase = {
  name: string;
  description: string;
  icon: WidgetIcon;
  /** Cor do ícone no chip do cabeçalho (classe de texto). */
  accent: string;
  /** Utilitário de `globals.css` com o fundo, o brilho radial e a borda do card. */
  theme: string;
  /** Resumo lido por leitores de tela no lugar da ilustração. */
  visualLabel: string;
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
  progress: number;
  sessions: number;
  done: number;
};

export type AgendaEvent = { time: string; title: string; dot: string };
export type AgendaData = {
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

export type GitHubData = { total: string; caption: string; prs: number; reviews: number };

export type SystemData = {
  cpu: number;
  cpuSeries: number[];
  memory: string;
  memoryPct: number;
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

export const widgets: Widget[] = [
  {
    id: "media",
    name: "Mídia",
    description:
      "Veja o que está tocando e controle Spotify, Apple Music ou qualquer player direto da dock.",
    icon: "music",
    accent: "text-media-accent",
    theme: "widget-media",
    visualLabel: "Tocando Weird Fishes/Arpeggi, de Radiohead, em 2:13 de 5:18.",
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
    name: "Pomodoro",
    description: "Ciclos de foco e pausa com o anel sempre à vista. Liga o Não perturbe sozinho.",
    icon: "timer",
    accent: "text-coral-soft",
    theme: "widget-pomodoro",
    visualLabel: "Foco: faltam 18 minutos e 42 segundos, sessão 2 de 4.",
    data: { remaining: "18:42", phase: "Foco · 2 de 4", progress: 0.748, sessions: 4, done: 2 },
  },
  {
    id: "agenda",
    name: "Agenda",
    description: "O próximo compromisso com contagem regressiva e Entrar na chamada em um clique.",
    icon: "calendar",
    accent: "text-agenda-accent",
    theme: "widget-agenda",
    visualLabel:
      "Agora: Daily do time, das 16:00 às 16:30, termina em 18 minutos. Depois: Revisão de design às 17:30.",
    data: {
      now: { range: "16:00 – 16:30", title: "Daily do time", endsIn: "Termina em 18 min" },
      next: [
        { time: "17:30", title: "Revisão de design", dot: "bg-coral" },
        { time: "19:00", title: "Academia", dot: "bg-green" },
        { time: "09:30", title: "Amanhã · Planejamento", dot: "bg-agenda-accent" },
      ],
    },
  },
  {
    id: "weather",
    name: "Clima",
    description: "Temperatura agora, próximas horas e um aviso quando a chuva estiver chegando.",
    icon: "sun",
    accent: "text-weather-sun",
    theme: "widget-weather",
    visualLabel: "24 graus, parcialmente nublado. Chuva às 16h.",
    data: {
      temp: "24°",
      summary: "Parcialmente nublado",
      alert: "Chuva às 16h · leve um guarda-chuva",
      hours: [
        { time: "15h", temp: "24°", icon: "cloud", tone: "text-fg" },
        { time: "16h", temp: "23°", icon: "rain", tone: "text-weather-rain" },
        { time: "17h", temp: "22°", icon: "rain", tone: "text-weather-rain" },
        { time: "18h", temp: "21°", icon: "cloud", tone: "text-fg" },
        { time: "19h", temp: "20°", icon: "moon", tone: "text-fg-2" },
      ],
    },
  },
  {
    id: "github",
    name: "GitHub",
    description: "Suas contribuições do ano, PRs abertos e revisões que estão esperando por você.",
    icon: "pullRequest",
    accent: "text-fg",
    theme: "widget-github",
    visualLabel: "2.142 contribuições em 2026, nenhum PR aberto e 12 revisões pendentes.",
    data: { total: "2.142", caption: "contribuições em 2026", prs: 0, reviews: 12 },
  },
  {
    id: "system",
    name: "Uso do sistema",
    description: "CPU, memória e rede em tempo real, e quais apps estão pesando na máquina.",
    icon: "pulse",
    accent: "text-lilac",
    theme: "widget-system",
    visualLabel: "CPU em 34%, memória com 10,9 de 16 GB, rede baixando 2,4 MB/s.",
    data: {
      cpu: 34,
      cpuSeries: series(30, 12.9898, 30, 18),
      memory: "10,9 de 16 GB",
      memoryPct: 68,
      network: "↓ 2,4 MB/s · ↑ 180 KB/s",
    },
  },
];

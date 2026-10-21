import type { MarqueeRow, WidgetCategory } from "@/components/WidgetsShowcase";

/** Categoria do filtro de cada tile da galeria, pela mesma chave de `widgets.tiles`. */
export const categories: Record<string, WidgetCategory> = {
  media: "productivity",
  mediaSmall: "productivity",
  weather: "productivity",
  weatherSmall: "productivity",
  pomodoro: "productivity",
  pomodoroSmall: "productivity",
  calendar: "productivity",
  calendarSmall: "productivity",
  usage: "system",
  usageSmall: "system",
  network: "system",
  volume: "system",
  bluetooth: "system",
  battery: "system",
  clock: "system",
  showDesktop: "system",
  tray: "system",
  review: "github",
  mine: "github",
  contrib: "github",
  contribSmall: "github",
  commits: "github",
  aiUsage: "ai",
  aiUsageSmall: "ai",
  claudeAgents: "ai",
};

/** Fileira do mobile para cada tile; o que não está aqui fica na dos compactos (1). */
export const rows: Record<string, MarqueeRow> = {
  media: 0,
  weather: 0,
  pomodoro: 0,
  calendar: 0,
  usage: 0,
  aiUsage: 0,
  network: 2,
  volume: 2,
  bluetooth: 2,
  battery: 2,
  clock: 2,
  showDesktop: 2,
  tray: 2,
};

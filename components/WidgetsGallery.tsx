import type { Dictionary } from "@/lib/i18n";
import { AiUsageSmallTile, AiUsageTile } from "./widgets/AiUsageTile";
import { CalendarSmallTile, CalendarTile } from "./widgets/CalendarTile";
import { ClaudeAgentsTile } from "./widgets/ClaudeAgentsTile";
import { Clock } from "./DockDemo/Clock";
import {
  BatteryTile,
  BluetoothTile,
  NetworkTile,
  ShowDesktopTile,
  TrayTile,
  VolumeTile,
} from "./widgets/IconTiles";
import {
  CommitsTile,
  ContribSmallTile,
  ContribTile,
  MineTile,
  ReviewTile,
} from "./widgets/GithubTiles";
import { MediaSmallTile, MediaTile } from "./widgets/MediaTile";
import { PomodoroSmallTile, PomodoroTile } from "./widgets/PomodoroTile";
import { UsageSmallTile, UsageTile } from "./widgets/UsageTile";
import { Tile } from "./widgets/Tile";
import { WidgetsShowcase, type MarqueeRow, type WidgetCategory } from "./WidgetsShowcase";
import { WeatherSmallTile, WeatherTile } from "./widgets/WeatherTile";

const categories: Record<string, WidgetCategory> = {
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

const rows: Record<string, MarqueeRow> = {
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

type WidgetsGalleryProps = { t: Dictionary["widgets"]; demo: Dictionary["demo"] };

export function WidgetsGallery({ t, demo }: WidgetsGalleryProps) {
  const tiles = [
    { key: "media", name: t.names.media, label: t.tiles.media, node: <MediaTile /> },
    { key: "review", name: t.names.review, label: t.tiles.review, node: <ReviewTile /> },
    { key: "mediaSmall", name: t.names.media, label: t.tiles.mediaSmall, node: <MediaSmallTile /> },
    {
      key: "contrib",
      name: t.names.contrib,
      label: t.tiles.contrib,
      node: <ContribTile total={demo.contribTotal} thisYear={demo.contribThisYear} />,
    },
    { key: "mine", name: t.names.mine, label: t.tiles.mine, node: <MineTile /> },
    {
      key: "contribSmall",
      name: t.names.contrib,
      label: t.tiles.contribSmall,
      node: <ContribSmallTile />,
    },
    {
      key: "weather",
      name: t.names.weather,
      label: t.tiles.weather,
      node: <WeatherTile copy={t.weather} />,
    },
    {
      key: "weatherSmall",
      name: t.names.weather,
      label: t.tiles.weatherSmall,
      node: <WeatherSmallTile />,
    },
    {
      key: "pomodoro",
      name: t.names.pomodoro,
      label: t.tiles.pomodoro,
      node: <PomodoroTile phase={t.pomodoro.phase} />,
    },
    {
      key: "pomodoroSmall",
      name: t.names.pomodoro,
      label: t.tiles.pomodoroSmall,
      node: <PomodoroSmallTile />,
    },
    { key: "usage", name: t.names.usage, label: t.tiles.usage, node: <UsageTile /> },
    { key: "usageSmall", name: t.names.usage, label: t.tiles.usageSmall, node: <UsageSmallTile /> },
    {
      key: "calendar",
      name: t.names.calendar,
      label: t.tiles.calendar,
      node: <CalendarTile copy={t.calendar} />,
    },
    {
      key: "calendarSmall",
      name: t.names.calendar,
      label: t.tiles.calendarSmall,
      node: <CalendarSmallTile copy={t.calendar} />,
    },
    {
      key: "aiUsage",
      name: t.names.aiUsage,
      label: t.tiles.aiUsage,
      node: <AiUsageTile caption={t.aiUsage.caption} />,
    },
    {
      key: "aiUsageSmall",
      name: t.names.aiUsage,
      label: t.tiles.aiUsageSmall,
      node: <AiUsageSmallTile />,
    },
    {
      key: "claudeAgents",
      name: t.names.claudeAgents,
      label: t.tiles.claudeAgents,
      node: <ClaudeAgentsTile />,
    },
    { key: "network", name: t.names.network, label: t.tiles.network, node: <NetworkTile /> },
    { key: "volume", name: t.names.volume, label: t.tiles.volume, node: <VolumeTile /> },
    {
      key: "bluetooth",
      name: t.names.bluetooth,
      label: t.tiles.bluetooth,
      node: <BluetoothTile />,
    },
    { key: "battery", name: t.names.battery, label: t.tiles.battery, node: <BatteryTile /> },
    { key: "clock", name: t.names.clock, label: t.tiles.clock, node: <Clock t={demo} /> },
    {
      key: "showDesktop",
      name: t.names.showDesktop,
      label: t.tiles.showDesktop,
      node: <ShowDesktopTile />,
    },
    { key: "tray", name: t.names.tray, label: t.tiles.tray, node: <TrayTile /> },
    { key: "commits", name: t.names.commits, label: t.tiles.commits, node: <CommitsTile /> },
  ];

  return (
    <section
      id="widgets"
      aria-labelledby="widgets-title"
      className="relative overflow-clip border-t border-line-8 pt-20 sm:pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 260px at 50% 58%, color-mix(in srgb, var(--color-coral) 46%, transparent), transparent 100%)",
        }}
      />
      <WidgetsShowcase
        title={t.title}
        subtitle={t.subtitle}
        filters={t.filters}
        items={tiles.map((tile) => ({
          key: tile.key,
          category: categories[tile.key] ?? "productivity",
          row: rows[tile.key] ?? 1,
          node: (
            <Tile name={tile.name} label={tile.label}>
              {tile.node}
            </Tile>
          ),
        }))}
      />
    </section>
  );
}

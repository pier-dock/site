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
import { WeatherSmallTile, WeatherTile } from "./widgets/WeatherTile";

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
      className="relative overflow-clip border-t border-line-8 pt-28"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex max-w-[560px] reveal-blur flex-col gap-1.5">
          <h2
            id="widgets-title"
            className="m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-semibold tracking-[-0.02em]"
          >
            {t.title}
          </h2>
          <p className="m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-medium tracking-[-0.02em] text-fg-4">
            {t.subtitle}
          </p>
        </div>

        <div className="relative mt-16">
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-16 p-0 pb-24">
            {tiles.map((tile, i) => (
              <li key={tile.key}>
                <Tile name={tile.name} label={tile.label} index={i % 3}>
                  {tile.node}
                </Tile>
              </li>
            ))}
          </ul>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent from-20% to-page to-92%"
          />
        </div>
      </div>
    </section>
  );
}

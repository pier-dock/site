import type { Dictionary } from "@/lib/i18n";
import { ContribSmallTile, ContribTile, MineTile, ReviewTile } from "./widgets/GithubTiles";
import { MediaSmallTile, MediaTile } from "./widgets/MediaTile";
import { PomodoroSmallTile, PomodoroTile } from "./widgets/PomodoroTile";
import { Tile } from "./widgets/Tile";
import { WeatherSmallTile, WeatherTile } from "./widgets/WeatherTile";

type WidgetsGalleryProps = { t: Dictionary["widgets"]; demo: Dictionary["demo"] };

export function WidgetsGallery({ t, demo }: WidgetsGalleryProps) {
  const tiles = [
    { key: "media", label: t.tiles.media, node: <MediaTile /> },
    { key: "review", label: t.tiles.review, node: <ReviewTile /> },
    { key: "mediaSmall", label: t.tiles.mediaSmall, node: <MediaSmallTile /> },
    {
      key: "contrib",
      label: t.tiles.contrib,
      node: <ContribTile total={demo.contribTotal} thisYear={demo.contribThisYear} />,
    },
    { key: "mine", label: t.tiles.mine, node: <MineTile /> },
    { key: "contribSmall", label: t.tiles.contribSmall, node: <ContribSmallTile /> },
    { key: "weather", label: t.tiles.weather, node: <WeatherTile copy={t.weather} /> },
    { key: "weatherSmall", label: t.tiles.weatherSmall, node: <WeatherSmallTile /> },
    { key: "pomodoro", label: t.tiles.pomodoro, node: <PomodoroTile phase={t.pomodoro.phase} /> },
    { key: "pomodoroSmall", label: t.tiles.pomodoroSmall, node: <PomodoroSmallTile /> },
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

        <ul className="m-0 mt-16 flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-16 fade-bottom p-0 pb-56">
          {tiles.map((tile, i) => (
            <li key={tile.key}>
              <Tile label={tile.label} index={i % 3}>
                {tile.node}
              </Tile>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

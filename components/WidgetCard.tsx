import type { Widget, WidgetIcon } from "@/lib/widgets";
import {
  CalendarIcon,
  ChevronRightIcon,
  MusicIcon,
  PullRequestIcon,
  PulseIcon,
  SunIcon,
  TimerIcon,
} from "./icons";
import { AgendaVisual } from "./widgets/AgendaVisual";
import { GitHubVisual } from "./widgets/GitHubVisual";
import { MediaVisual } from "./widgets/MediaVisual";
import { PomodoroVisual } from "./widgets/PomodoroVisual";
import { SystemVisual } from "./widgets/SystemVisual";
import { WeatherVisual } from "./widgets/WeatherVisual";

const icons: Record<WidgetIcon, typeof MusicIcon> = {
  music: MusicIcon,
  timer: TimerIcon,
  calendar: CalendarIcon,
  sun: SunIcon,
  pullRequest: PullRequestIcon,
  pulse: PulseIcon,
};

function Visual({ widget }: { widget: Widget }) {
  switch (widget.id) {
    case "media":
      return <MediaVisual data={widget.data} />;
    case "pomodoro":
      return <PomodoroVisual data={widget.data} />;
    case "agenda":
      return <AgendaVisual data={widget.data} />;
    case "weather":
      return <WeatherVisual data={widget.data} />;
    case "github":
      return <GitHubVisual data={widget.data} />;
    case "system":
      return <SystemVisual data={widget.data} />;
  }
}

type WidgetCardProps = { widget: Widget; moreLabel: string; moreHref: string };

export function WidgetCard({ widget, moreLabel, moreHref }: WidgetCardProps) {
  const Icon = icons[widget.icon];
  const titleId = `widget-${widget.id}`;
  return (
    <article
      aria-labelledby={titleId}
      className={`widget-card ${widget.theme} flex h-[540px] flex-[0_0_340px] snap-start flex-col gap-4 overflow-hidden rounded-2xl p-[22px]`}
    >
      <header className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-md border border-line-14 bg-black/35 shadow-chip">
          <Icon size={20} className={widget.accent} />
        </span>
        <h3 id={titleId} className="m-0 flex-1 text-[17px] font-medium">
          {widget.name}
        </h3>
        <a
          href={moreHref}
          aria-label={`${moreLabel} ${widget.name}`}
          className="flex size-9 items-center justify-center rounded-[9px] border border-line-14 bg-black/25 text-fg transition-colors hover:bg-black/40"
        >
          <ChevronRightIcon size={14} />
        </a>
      </header>
      <p className="m-0 text-[15px] leading-[1.55] text-fg-card">{widget.description}</p>
      <div aria-hidden="true" className="h-px bg-white/10" />
      <div role="img" aria-label={widget.visualLabel} className="flex flex-1 flex-col">
        <Visual widget={widget} />
      </div>
    </article>
  );
}

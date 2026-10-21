import type { Dictionary } from "@/lib/i18n";
import { VideoIcon } from "../icons";

type CalendarCopy = Dictionary["widgets"]["calendar"];

export function CalendarTile({ copy }: { copy: CalendarCopy }) {
  return (
    <div aria-hidden="true" className="flex h-12 items-center gap-2.5 pr-2.5 pl-3">
      <span className="size-[7px] shrink-0 rounded-full bg-blue" />
      <span className="flex w-24 flex-col gap-px">
        <span className="truncate text-xs font-medium">{copy.title}</span>
        <span className="text-[11px] text-fg-dock">{copy.countdown}</span>
      </span>
      <span className="flex h-[26px] items-center gap-1 rounded-full bg-fg px-2.5 text-[11px] font-semibold text-fg-inverse">
        <VideoIcon size={12} />
        {copy.join}
      </span>
    </div>
  );
}

export function CalendarSmallTile({ copy }: { copy: CalendarCopy }) {
  return (
    <div aria-hidden="true" className="flex size-12 flex-col items-center justify-center gap-px">
      <span className="flex items-center gap-1 text-[8px] font-semibold tracking-[0.08em] text-fg-dock">
        <span className="size-[5px] rounded-full bg-blue" />
        {copy.eyebrow}
      </span>
      <span className="text-[15px] font-semibold tabular-nums">18</span>
      <span className="text-[9px] text-fg-dock">{copy.unit}</span>
    </div>
  );
}

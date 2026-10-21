import { SunIcon } from "../icons";

type WeatherCopy = { condition: string; alert: string };

export function WeatherTile({ copy }: { copy: WeatherCopy }) {
  return (
    <div aria-hidden="true" className="flex h-12 w-44 items-center gap-2.5 px-2.5">
      <SunIcon size={24} className="shrink-0 text-weather-sun" />
      <span className="text-[18px] font-semibold tabular-nums">24°</span>
      <span className="flex min-w-0 flex-col gap-px">
        <span className="truncate text-xs">{copy.condition}</span>
        <span className="truncate text-[11px] text-amber">{copy.alert}</span>
      </span>
    </div>
  );
}

export function WeatherSmallTile() {
  return (
    <div aria-hidden="true" className="flex size-12 flex-col items-center justify-center gap-0.5">
      <SunIcon size={22} className="text-weather-sun" />
      <span className="text-[13px] font-semibold tabular-nums">24°</span>
    </div>
  );
}

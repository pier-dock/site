import type { WeatherData, WeatherIcon } from "@/lib/widgets";

const hourIcons: Record<WeatherIcon, string> = {
  cloud: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
  rain: "M20 16.6A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25 M8 19v2 M12 21v2 M16 19v2",
  moon: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
};

export function WeatherVisual({ data }: { data: WeatherData }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-[22px]">
      <div className="flex items-center gap-4">
        <svg
          aria-hidden="true"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M12 2v2 M4.93 4.93l1.41 1.41 M20 12h2 M19.07 4.93l-1.41 1.41 M15.95 12.65a4 4 0 0 0-5.93-4.13"
            className="stroke-weather-sun"
          />
          <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" className="stroke-fg" />
        </svg>
        <span className="flex flex-col gap-0.5">
          <span className="text-[60px] leading-none font-semibold tracking-[-0.05em]">
            {data.temp}
          </span>
          <span className="text-sm text-weather-sub">{data.summary}</span>
        </span>
      </div>
      <div className="rounded-md border border-weather-alert-edge bg-weather-alert-bg px-3 py-2.5 text-[13px] text-weather-alert">
        {data.alert}
      </div>
      <div className="grid grid-cols-5 rounded-[14px] bg-white/5 px-1.5 py-3.5">
        {data.hours.map((h) => (
          <div key={h.time} className="flex flex-col items-center gap-2">
            <span className="text-xs text-weather-sub">{h.time}</span>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={h.tone}
            >
              <path d={hourIcons[h.icon]} />
            </svg>
            <span className="text-sm font-medium">{h.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

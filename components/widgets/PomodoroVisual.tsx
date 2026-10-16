import type { PomodoroData } from "@/lib/widgets";
import { PlayPauseIcon } from "../icons";

const R = 90;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function PomodoroVisual({ data }: { data: PomodoroData }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[18px]">
      <div className="relative flex size-[200px] flex-col items-center justify-center">
        <svg
          aria-hidden="true"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute inset-0 -rotate-90"
        >
          <circle cx="100" cy="100" r={R} fill="none" strokeWidth="8" className="stroke-white/10" />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - data.progress)}
            className="stroke-coral drop-shadow-ring"
          />
        </svg>
        <span className="relative text-[46px] font-semibold tracking-[-0.03em] tabular-nums">
          {data.remaining}
        </span>
        <span className="relative text-[13px] text-pomo-sub">{data.phase}</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: data.sessions }, (_, i) => (
          <span
            key={i}
            className={`h-1 w-[22px] rounded-[2px] ${i < data.done ? "bg-coral" : "bg-white/20"}`}
          />
        ))}
      </div>
      <span className="flex h-11 items-center gap-2 rounded-full bg-fg px-[22px] text-sm font-semibold text-pomo-3">
        <PlayPauseIcon playing size={13} />
        {data.pause}
      </span>
    </div>
  );
}

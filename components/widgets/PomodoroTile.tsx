import { PlayPauseIcon, SkipForwardIcon } from "../icons";

type RingProps = { size: number; stroke: number; progress: number; children: React.ReactNode };

function Ring({ size, stroke, progress, children }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg aria-hidden="true" width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          className="stroke-coral"
        />
      </svg>
      {children}
    </span>
  );
}

export function PomodoroTile({ phase }: { phase: string }) {
  return (
    <div aria-hidden="true" className="flex h-12 w-44 items-center gap-2.5 px-2.5">
      <Ring size={34} stroke={2.5} progress={0.748}>
        <PlayPauseIcon playing size={12} className="relative text-fg" />
      </Ring>
      <span className="flex min-w-0 flex-1 flex-col gap-px">
        <span className="text-base font-semibold tabular-nums">18:42</span>
        <span className="truncate text-[11px] text-fg-dock">{phase}</span>
      </span>
      <SkipForwardIcon size={14} className="shrink-0 text-fg" />
    </div>
  );
}

export function PomodoroSmallTile() {
  return (
    <div aria-hidden="true" className="flex size-12 items-center justify-center">
      <Ring size={40} stroke={3} progress={0.748}>
        <span className="relative text-[13px] font-semibold tabular-nums">
          18<span className="text-[9px]">m</span>
        </span>
      </Ring>
    </div>
  );
}

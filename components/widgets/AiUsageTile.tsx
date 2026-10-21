import { SparklesIcon } from "../icons";

type RingProps = { size: number; stroke: number; children: React.ReactNode };

const PCT = 0.62;

function Ring({ size, stroke, children }: RingProps) {
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
          strokeDashoffset={c * (1 - PCT)}
          className="stroke-green"
        />
      </svg>
      {children}
    </span>
  );
}

export function AiUsageTile({ caption }: { caption: string }) {
  return (
    <div aria-hidden="true" className="flex h-12 w-44 items-center gap-2.5 px-2.5">
      <Ring size={34} stroke={2.5}>
        <SparklesIcon size={13} className="relative text-green" />
      </Ring>
      <span className="flex min-w-0 flex-col gap-px">
        <span className="text-base font-semibold tabular-nums">62%</span>
        <span className="truncate text-[11px] text-fg-dock">{caption}</span>
      </span>
    </div>
  );
}

export function AiUsageSmallTile() {
  return (
    <div aria-hidden="true" className="flex size-12 items-center justify-center">
      <Ring size={40} stroke={3}>
        <span className="relative flex flex-col items-center gap-px">
          <SparklesIcon size={10} className="text-green" />
          <span className="text-[11px] leading-none font-semibold tabular-nums">62%</span>
        </span>
      </Ring>
    </div>
  );
}

import type { SystemData } from "@/lib/widgets";

const W = 296;
const H = 96;

function points(values: number[]) {
  return values
    .map(
      (v, i) =>
        `${((i / (values.length - 1)) * W).toFixed(1)},${(1 + (1 - v / 100) * (H - 2)).toFixed(1)}`,
    )
    .join(" ");
}

export function SystemVisual({ data }: { data: SystemData }) {
  const line = points(data.cpuSeries);
  return (
    <div className="flex flex-1 flex-col justify-center gap-[18px]">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-system-sub">{data.cpuLabel}</span>
        <span className="text-[40px] font-semibold tracking-[-0.03em]">{data.cpu}%</span>
      </div>
      <svg aria-hidden="true" width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="max-w-full">
        <polygon points={`0,${H} ${line} ${W},${H}`} className="fill-system-fill" opacity="0.25" />
        <polyline
          points={line}
          fill="none"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-lilac"
        />
      </svg>
      <div className="flex flex-col gap-1.5">
        <span className="flex justify-between text-[13px]">
          <span>{data.memoryLabel}</span>
          <span className="text-system-sub">{data.memory}</span>
        </span>
        <span className="flex h-1.5 rounded-[3px] bg-white/12">
          <span className="h-1.5 rounded-[3px] bg-lilac" style={{ width: `${data.memoryPct}%` }} />
        </span>
      </div>
      <span className="flex justify-between text-[13px]">
        <span>{data.networkLabel}</span>
        <span className="text-system-sub">{data.network}</span>
      </span>
    </div>
  );
}

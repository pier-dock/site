const cpu = [30, 34, 28, 40, 52, 44, 36, 31, 38, 46, 41, 34];
const ram = [64, 65, 65, 66, 66, 67, 67, 67, 68, 68, 68, 68];

type SparkProps = { values: number[]; width: number; height: number; className: string };

function Spark({ values, width, height, className }: SparkProps) {
  const line = values
    .map(
      (v, i) =>
        `${((i / (values.length - 1)) * width).toFixed(1)},${(1 + (1 - v / 100) * (height - 2)).toFixed(1)}`,
    )
    .join(" ");
  return (
    <svg aria-hidden="true" width={width} height={height} className={className}>
      <polygon
        points={`0,${height} ${line} ${width},${height}`}
        fill="currentColor"
        opacity="0.18"
      />
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Column({
  label,
  value,
  values,
  tone,
}: {
  label: string;
  value: string;
  values: number[];
  tone: string;
}) {
  return (
    <span className={`flex flex-col gap-0.5 ${tone}`}>
      <span className="flex items-baseline gap-1.5">
        <span className="text-[9px] font-semibold tracking-[0.08em] text-fg-dock">{label}</span>
        <span className="text-[13px] font-semibold text-fg tabular-nums">{value}</span>
      </span>
      <Spark values={values} width={70} height={14} className="block" />
    </span>
  );
}

export function UsageTile() {
  return (
    <div aria-hidden="true" className="flex h-12 items-center gap-4 px-2.5">
      <Column label="CPU" value="34%" values={cpu} tone="text-blue" />
      <Column label="RAM" value="68%" values={ram} tone="text-lilac" />
    </div>
  );
}

export function UsageSmallTile() {
  return (
    <div
      aria-hidden="true"
      className="flex size-12 flex-col items-center justify-center gap-1 text-blue"
    >
      <span className="text-[9px] font-semibold tracking-[0.08em] text-fg-dock">CPU</span>
      <span className="text-[13px] font-semibold text-fg tabular-nums">34%</span>
      <Spark values={cpu} width={34} height={9} className="block" />
    </div>
  );
}

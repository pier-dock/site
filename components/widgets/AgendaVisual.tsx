import type { AgendaData } from "@/lib/widgets";
import { VideoIcon } from "../icons";

export function AgendaVisual({ data }: { data: AgendaData }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-2.5">
      <div className="flex flex-col gap-2 rounded-[14px] border border-agenda-now-edge bg-agenda-now p-4">
        <span className="flex justify-between text-[11px] font-semibold tracking-[0.06em] text-agenda-sub uppercase">
          <span>{data.nowLabel}</span>
          <span className="tabular-nums">{data.now.range}</span>
        </span>
        <span className="text-lg font-semibold">{data.now.title}</span>
        <span className="flex items-center justify-between gap-2">
          <span className="text-[13px] text-agenda-sub">{data.now.endsIn}</span>
          <span className="flex h-[34px] items-center gap-1.5 rounded-[9px] bg-fg px-3.5 text-[13px] font-semibold text-agenda-3">
            <VideoIcon size={13} />
            {data.join}
          </span>
        </span>
      </div>
      {data.next.map((e) => (
        <div
          key={e.time + e.title}
          className="flex h-[50px] items-center gap-3 rounded-md bg-white/5 px-3.5"
        >
          <span className="w-[42px] text-[13px] text-agenda-sub tabular-nums">{e.time}</span>
          <span className={`size-[7px] rounded-full ${e.dot}`} />
          <span className="text-sm">{e.title}</span>
        </div>
      ))}
    </div>
  );
}

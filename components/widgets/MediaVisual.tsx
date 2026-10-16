import type { MediaData } from "@/lib/widgets";
import { AlbumArt } from "../AlbumArt";
import { PlayIcon, SkipBackIcon, SkipForwardIcon } from "../icons";

const coverLabel = "text-[11px] font-semibold tracking-[0.12em] text-fg uppercase";

export function MediaVisual({ data }: { data: MediaData }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3.5">
      <AlbumArt
        className="size-[184px] justify-between rounded-[6px] p-3.5 shadow-cover"
        stripe="h-1 rounded-[2px]"
        gap="gap-1"
        top={<span className={coverLabel}>{data.artist}</span>}
        bottom={<span className={coverLabel}>{data.album}</span>}
      />
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="text-base font-semibold">{data.track}</span>
        <span className="text-[13px] text-media-sub">
          {data.artist} · {data.album}
        </span>
      </div>
      <div className="flex w-[220px] flex-col gap-1">
        <span className="flex h-[3px] rounded-[2px] bg-white/18">
          <span className="h-[3px] rounded-[2px] bg-fg" style={{ width: `${data.progress}%` }} />
        </span>
        <span className="flex justify-between font-mono text-[10.5px] text-media-sub">
          <span>{data.position}</span>
          <span>{data.duration}</span>
        </span>
      </div>
      <div className="flex items-center gap-[22px] text-fg">
        <span className="flex size-11 items-center justify-center">
          <SkipBackIcon size={22} />
        </span>
        <span className="flex size-[52px] items-center justify-center rounded-full bg-fg text-media-3">
          <PlayIcon size={20} />
        </span>
        <span className="flex size-11 items-center justify-center">
          <SkipForwardIcon size={22} />
        </span>
      </div>
    </div>
  );
}

import { AlbumArt } from "../AlbumArt";
import { PlayPauseIcon, SkipForwardIcon } from "../icons";

export function MediaTile() {
  return (
    <div aria-hidden="true" className="flex h-12 items-center gap-2.5 px-2">
      <AlbumArt
        className="size-[34px] justify-center rounded-[7px] p-[5px]"
        stripe="h-0.5"
        gap="gap-0.5"
      />
      <span className="flex w-[132px] flex-col gap-0.5">
        <span className="truncate text-[13px] font-medium">Weird Fishes/Arpeggi</span>
        <span className="text-xs text-fg-dock">Radiohead</span>
        <span className="mt-0.5 flex h-0.5 rounded-[1px] bg-white/12">
          <span className="h-0.5 w-[42%] rounded-[1px] bg-fg" />
        </span>
      </span>
      <span className="flex size-8 items-center justify-center text-fg">
        <PlayPauseIcon playing size={15} />
      </span>
      <span className="flex size-8 items-center justify-center text-fg">
        <SkipForwardIcon size={15} />
      </span>
    </div>
  );
}

export function MediaSmallTile() {
  return (
    <div aria-hidden="true" className="relative flex size-12 items-center justify-center">
      <AlbumArt className="size-9 justify-center rounded-lg p-[5px]" stripe="h-0.5" gap="gap-0.5" />
      <span className="absolute inset-1.5 flex items-center justify-center rounded-lg bg-black/45 text-fg">
        <PlayPauseIcon playing={false} size={15} />
      </span>
    </div>
  );
}

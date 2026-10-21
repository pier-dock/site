import { VolumeIcon, WifiIcon } from "../icons";

export function NetworkTile() {
  return (
    <div aria-hidden="true" className="flex size-[34px] items-center justify-center text-fg">
      <WifiIcon size={17} />
    </div>
  );
}

export function VolumeTile() {
  return (
    <div aria-hidden="true" className="flex size-[34px] items-center justify-center text-fg">
      <VolumeIcon level={70} size={17} />
    </div>
  );
}

import {
  BatteryIcon,
  BluetoothIcon,
  ChevronUpIcon,
  MonitorIcon,
  VolumeIcon,
  WifiIcon,
} from "../icons";

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

export function BluetoothTile() {
  return (
    <div
      aria-hidden="true"
      className="relative flex size-[34px] items-center justify-center text-fg"
    >
      <BluetoothIcon size={17} />
      <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-coral" />
    </div>
  );
}

export function BatteryTile() {
  return (
    <div
      aria-hidden="true"
      className="flex h-[34px] items-center gap-1.5 px-1.5 text-[13px] text-fg"
    >
      <BatteryIcon size={20} />
      <span>79%</span>
    </div>
  );
}

export function ShowDesktopTile() {
  return (
    <div aria-hidden="true" className="flex size-[34px] items-center justify-center text-fg">
      <MonitorIcon size={17} />
    </div>
  );
}

export function TrayTile() {
  return (
    <div aria-hidden="true" className="flex size-[34px] items-center justify-center text-fg">
      <ChevronUpIcon size={17} />
    </div>
  );
}

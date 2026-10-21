import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Icon({
  size = 18,
  strokeWidth = 2,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon strokeWidth={2.4} {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </Icon>
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </Icon>
  );
}

export function WindowsIcon(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <rect x="2" y="2" width="9.5" height="9.5" rx="0.5" />
      <rect x="12.5" y="2" width="9.5" height="9.5" rx="0.5" />
      <rect x="2" y="12.5" width="9.5" height="9.5" rx="0.5" />
      <rect x="12.5" y="12.5" width="9.5" height="9.5" rx="0.5" />
    </Icon>
  );
}

/** Pinguim do Linux. A barriga, os olhos e o bico usam a cor do botão claro onde ele aparece. */
export function LinuxIcon(props: IconProps) {
  return (
    <Icon fill="currentColor" stroke="none" {...props}>
      <circle cx="12" cy="7" r="4.8" />
      <ellipse cx="12" cy="15" rx="6.6" ry="7.2" />
      <path d="M4.6 21.4c1.4-1.3 3.6-1.3 4.8.5-1.6 1-3.6.9-4.8-.5zm14.8 0c-1.4-1.3-3.6-1.3-4.8.5 1.6 1 3.6.9 4.8-.5z" />
      <g className="fill-fg">
        <ellipse cx="12" cy="16" rx="3.8" ry="4.9" />
        <circle cx="10.3" cy="6.4" r="1.15" />
        <circle cx="13.7" cy="6.4" r="1.15" />
        <path d="M10.4 8.6h3.2L12 10.4z" />
      </g>
    </Icon>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon strokeWidth={2.4} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </Icon>
  );
}

export function PullRequestIcon(props: IconProps) {
  return (
    <Icon strokeWidth={1.8} {...props}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" x2="6" y1="9" y2="21" />
    </Icon>
  );
}

export function ReviewIcon(props: IconProps) {
  return (
    <Icon strokeWidth={1.8} {...props}>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M11 18H8a2 2 0 0 1-2-2V9" />
    </Icon>
  );
}

export function MusicIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Icon>
  );
}

export function TimerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M10 2h4" />
    </Icon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4 M8 2v4 M3 10h18" />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M6.3 17.7l-1.4 1.4 M19.1 4.9l-1.4 1.4" />
    </Icon>
  );
}

export function PulseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 12h4l3-8 4 16 3-8h4" />
    </Icon>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" />
    </Icon>
  );
}

export function BluetoothIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m7 7 10 10-5 5V2l5 5L7 17" />
    </Icon>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </Icon>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m18 15-6-6-6 6" />
    </Icon>
  );
}

export function VideoIcon(props: IconProps) {
  return (
    <Icon strokeWidth={2.4} {...props}>
      <path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </Icon>
  );
}

export function WifiIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.86a10 10 0 0 1 14 0" />
      <path d="M8.5 16.43a5 5 0 0 1 7 0" />
    </Icon>
  );
}

export function BatteryIcon({ size = 17, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={(size * 20) / 17}
      height={size}
      viewBox="0 0 26 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="7" width="19" height="10" rx="2.5" />
      <line x1="24" x2="24" y1="11" y2="13" />
      <rect x="4.5" y="9.5" width="11" height="5" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function VolumeIcon({ level, ...props }: IconProps & { level: number }) {
  const waves =
    level === 0
      ? "M22 9l-6 6 M16 9l6 6"
      : level < 50
        ? "M15.54 8.46a5 5 0 0 1 0 7.07"
        : "M15.54 8.46a5 5 0 0 1 0 7.07 M19.07 4.93a10 10 0 0 1 0 14.14";
  return (
    <Icon {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d={waves} />
    </Icon>
  );
}

export function PlayPauseIcon({ playing, size = 15, ...props }: IconProps & { playing: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <path d={playing ? "M4 2.5h3v11H4z M9 2.5h3v11H9z" : "M5 2.5l9 5.5-9 5.5z"} />
    </svg>
  );
}

export function SkipBackIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M5 5h2.5v14H5z M20 5v14L9 12z" />
    </svg>
  );
}

export function SkipForwardIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M16.5 5H19v14h-2.5z M4 5v14l11-7z" />
    </svg>
  );
}

export function PlayIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

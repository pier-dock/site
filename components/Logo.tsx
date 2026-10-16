type LogoMarkProps = { size?: number; className?: string; dot?: boolean };

export function LogoMark({ size = 26, className, dot = true }: LogoMarkProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64" className={className}>
      <rect x="6" y="38" width="52" height="14" rx="7" className="fill-fg" opacity="0.35" />
      <rect x="12" y="24" width="11" height="11" rx="3.5" className="fill-fg" />
      <rect x="26.5" y="15" width="11" height="20" rx="3.5" className="fill-coral" />
      <rect x="41" y="24" width="11" height="11" rx="3.5" className="fill-fg" />
      {dot && <circle cx="32" cy="45" r="2.2" className="fill-coral" />}
    </svg>
  );
}

export function AppIcon({ size = 88 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="15" className="fill-graphite" />
      <rect
        x="0.5"
        y="0.5"
        width="63"
        height="63"
        rx="14.5"
        fill="none"
        className="stroke-line-14"
      />
      <g transform="translate(10 10) scale(0.6875)">
        <rect x="6" y="38" width="52" height="14" rx="7" className="fill-fg" opacity="0.32" />
        <rect x="12" y="24" width="11" height="11" rx="3.5" className="fill-fg" />
        <rect x="26.5" y="15" width="11" height="20" rx="3.5" className="fill-coral" />
        <rect x="41" y="24" width="11" height="11" rx="3.5" className="fill-fg" />
        <circle cx="32" cy="45" r="2.2" className="fill-coral" />
      </g>
    </svg>
  );
}

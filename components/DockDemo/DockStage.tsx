type DockStageProps = { badge: string; label: string; children?: React.ReactNode };

export function DockStage({ badge, label, children }: DockStageProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className="relative mx-auto mt-16 h-[480px] max-w-[1100px] overflow-hidden rounded-t-3xl border border-b-0 border-line-12 bg-stage"
    >
      <p className="absolute top-3.5 left-4 z-[1] m-0 flex h-7 items-center gap-2 rounded-[14px] border border-line-10 bg-white/6 px-3 text-xs text-fg-2">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-green" />
        {badge}
      </p>
      {children}
    </div>
  );
}

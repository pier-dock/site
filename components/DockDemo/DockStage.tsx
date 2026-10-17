type DockStageProps = { badge: string; label: string; children?: React.ReactNode };

export function DockStage({ badge, label, children }: DockStageProps) {
  return (
    <div
      role="region"
      aria-label={label}
      data-intro-stage
      className="relative mx-auto mt-12 h-[380px] max-w-[1100px] origin-bottom stage-rise sm:mt-16 sm:h-[480px]"
    >
      {/* O fundo do palco é uma camada própria para poder surgir depois da dock na intro. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 intro-late rounded-t-3xl border border-b-0 border-line-12 bg-stage"
      />
      <p className="absolute top-3.5 left-4 z-[1] m-0 flex h-7 intro-late items-center gap-2 rounded-[14px] border border-line-10 bg-white/6 px-3 text-xs text-fg-2">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-green" />
        {badge}
      </p>
      {children}
    </div>
  );
}

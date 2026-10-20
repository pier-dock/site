type DockStageProps = { label: string; children?: React.ReactNode };

export function DockStage({ label, children }: DockStageProps) {
  return (
    <div
      role="region"
      aria-label={label}
      className="relative mx-auto mt-2 h-[250px] w-full max-w-[1100px] shrink-0"
    >
      {children}
    </div>
  );
}

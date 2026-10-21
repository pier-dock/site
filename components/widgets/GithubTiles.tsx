import { ContributionGrid } from "../ContributionGrid";
import { CommitIcon, PullRequestIcon, ReviewIcon } from "../icons";

export function ReviewTile() {
  return (
    <div aria-hidden="true" className="flex h-11 items-center gap-[7px] px-2.5">
      <ReviewIcon size={18} />
      <span className="rounded-[6px] bg-coral px-1.5 py-px text-xs font-semibold text-coral-ink">
        12
      </span>
    </div>
  );
}

export function MineTile() {
  return (
    <div aria-hidden="true" className="flex h-11 items-center gap-[7px] px-2.5">
      <span className="relative flex">
        <PullRequestIcon size={18} />
        <span className="absolute -top-0.5 -right-0.5 size-[7px] rounded-full bg-green" />
      </span>
      <span className="text-[13px] font-medium text-fg-dock">0</span>
    </div>
  );
}

export function ContribTile({ total, thisYear }: { total: string; thisYear: string }) {
  return (
    <div aria-hidden="true" className="flex h-12 items-center gap-2.5 px-2.5">
      <span className="flex flex-col gap-px">
        <span className="text-[15px] font-semibold">{total}</span>
        <span className="text-[11px] text-fg-dock">{thisYear}</span>
      </span>
      <ContributionGrid count={98} cell={4} gap={1.5} radius={1} />
    </div>
  );
}

export function ContribSmallTile() {
  return (
    <div aria-hidden="true" className="flex h-12 items-center px-2.5">
      <ContributionGrid count={98} cell={4} gap={1.5} radius={1} />
    </div>
  );
}

export function CommitsTile() {
  return (
    <div aria-hidden="true" className="flex h-11 items-center gap-[7px] px-2.5">
      <CommitIcon size={18} />
      <span className="text-[13px] font-medium text-fg-dock">7</span>
    </div>
  );
}

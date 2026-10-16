import type { GitHubData } from "@/lib/widgets";
import { ContributionGrid } from "../ContributionGrid";

export function GitHubVisual({ data }: { data: GitHubData }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-[52px] leading-none font-semibold tracking-[-0.04em]">
          {data.total}
        </span>
        <span className="text-sm text-fg-3">{data.caption}</span>
      </div>
      <ContributionGrid count={126} cell={13} gap={3} radius={3} />
      <div className="flex gap-2">
        <span className="flex h-11 flex-1 items-center justify-between rounded-[11px] bg-white/6 px-3 text-[13px]">
          <span className="text-fg-2">PRs abertos</span>
          <span className="font-semibold">{data.prs}</span>
        </span>
        <span className="flex h-11 flex-1 items-center justify-between rounded-[11px] bg-white/6 px-3 text-[13px]">
          <span className="text-fg-2">Revisões</span>
          <span className="rounded-[6px] bg-coral px-[7px] py-px font-semibold text-coral-ink">
            {data.reviews}
          </span>
        </span>
      </div>
    </div>
  );
}

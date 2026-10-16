import { contributionPaths, type GridGeometry } from "@/lib/contributions";

const fills = ["fill-gh-0", "fill-gh-1", "fill-gh-2", "fill-gh-3", "fill-gh-4"];

type ContributionGridProps = GridGeometry & { label?: string; className?: string };

export function ContributionGrid({ label, className, ...geometry }: ContributionGridProps) {
  const { width, height, paths } = contributionPaths(geometry);
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="block max-w-none"
        {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      >
        {paths.map((d, level) => d && <path key={level} d={d} className={fills[level]} />)}
      </svg>
    </div>
  );
}

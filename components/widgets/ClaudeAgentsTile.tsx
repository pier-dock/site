import { ClawdIcon } from "../Clawd";

export function ClaudeAgentsTile() {
  return (
    <div aria-hidden="true" className="relative flex size-[34px] items-center justify-center">
      <ClawdIcon size={18} className="clawd-wobble text-coral" />
      <span className="absolute right-1 bottom-1 flex gap-[2px]">
        <span className="size-[5px] animate-pulse rounded-full bg-coral" />
        <span className="size-[5px] animate-pulse rounded-full bg-coral [animation-delay:300ms]" />
      </span>
    </div>
  );
}

"use client";

import { CheckIcon, CopyIcon } from "./icons";
import { useCopy } from "./useCopy";

type CopyButtonProps = {
  text: string;
  label: string;
  idleText: string;
  doneText: string;
};

export function CopyButton({ text, label, idleText, doneText }: CopyButtonProps) {
  const { copied, copy } = useCopy();
  return (
    <>
      <button
        type="button"
        onClick={() => copy(text)}
        aria-label={label}
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-sm bg-white/8 px-3 text-[13px] font-medium text-fg transition-colors hover:bg-white/12"
      >
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
        {copied ? doneText : idleText}
      </button>
      <span role="status" className="sr-only">
        {copied ? doneText : ""}
      </span>
    </>
  );
}

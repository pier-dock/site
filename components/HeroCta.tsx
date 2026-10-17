"use client";

import type { Dictionary } from "@/lib/i18n";
import { osList } from "@/lib/os";
import { links } from "@/lib/site";
import { CheckIcon, CodeIcon, DownloadIcon, LinkIcon } from "./icons";
import { genieSlice } from "./genie";
import { useOS } from "./OSProvider";
import { useCopy } from "./useCopy";

const primary =
  "flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[13px] bg-coral px-[22px] text-base font-semibold text-coral-ink shadow-cta transition-[filter] hover:brightness-110 sm:w-auto";
const secondary =
  "flex h-[52px] w-full items-center justify-center gap-2.5 rounded-[13px] border border-line-14 bg-white/7 px-5 text-base font-medium text-fg transition-colors hover:bg-white/10 sm:w-auto";
const meta =
  "genie-slice m-0 flex min-h-5 flex-wrap justify-center gap-1.5 self-stretch text-[13px] text-fg-3";

export function HeroCta({ t }: { t: Dictionary["hero"] }) {
  const { os, isMobile, setOs, downloads } = useOS();
  const { copied, copy } = useCopy();
  const d = downloads[os];
  const others = osList.filter((o) => o !== os);

  return (
    <div className="mt-2 flex flex-col items-center gap-3.5 self-stretch">
      <div
        {...genieSlice(4)}
        className="mx-auto flex w-full max-w-sm genie-slice flex-wrap justify-center gap-3 sm:max-w-none"
      >
        {isMobile ? (
          <button
            type="button"
            className={primary}
            onClick={() => copy(window.location.href.split("#")[0] ?? window.location.href)}
          >
            {copied ? <CheckIcon size={18} /> : <LinkIcon size={18} />}
            <span aria-live="polite">{copied ? t.mobileCopied : t.mobileSend}</span>
          </button>
        ) : (
          <a href="#download" className={primary}>
            <DownloadIcon size={18} />
            {d.button}
          </a>
        )}
        <a href={links.repo} target="_blank" rel="noopener" className={secondary}>
          <CodeIcon size={18} />
          {t.github}
        </a>
      </div>
      {isMobile ? (
        <>
          <p {...genieSlice(5)} className={meta}>
            <strong className="font-semibold text-fg">{t.mobileTitle}</strong>
          </p>
          <p {...genieSlice(6)} className={meta}>
            {t.mobileNote}
          </p>
        </>
      ) : (
        <>
          <p {...genieSlice(5)} className={meta}>
            {d.file} · {d.fileNote} · {t.free}
          </p>
          <p {...genieSlice(6)} className={meta}>
            {t.alsoFor}
            {others.map((o, i) => (
              <button
                key={o}
                type="button"
                onClick={() => setOs(o)}
                className="text-fg underline decoration-white/30 underline-offset-[3px] hover:decoration-fg"
              >
                {downloads[o].label}
                {i < others.length - 1 ? "," : ""}
              </button>
            ))}
          </p>
        </>
      )}
    </div>
  );
}

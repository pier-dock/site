"use client";

import type { Dictionary } from "@/lib/i18n";
import { osList } from "@/lib/os";
import { CheckIcon, DownloadIcon, LinkIcon } from "./icons";
import { introOrder } from "./intro";
import { useOS } from "./OSProvider";
import { useCopy } from "./useCopy";

const ctaButton =
  "flex h-12 items-center justify-center gap-2.5 rounded-md bg-fg px-5 text-[15px] font-semibold text-fg-inverse shadow-cta transition-opacity hover:opacity-90";
const meta =
  "intro-rise m-0 flex min-h-5 flex-wrap justify-center gap-1.5 self-stretch text-[13px] text-fg-faint";

export function HeroCta({ t }: { t: Dictionary["hero"] }) {
  const { os, isMobile, setOs, downloads } = useOS();
  const { copied, copy } = useCopy();
  const others = osList.filter((o) => o !== os);

  return (
    <div className="mt-4 flex flex-col items-center gap-3.5 self-stretch">
      <div {...introOrder(2)} className="flex intro-rise justify-center">
        {isMobile ? (
          <button
            type="button"
            className={ctaButton}
            onClick={() => copy(window.location.href.split("#")[0] ?? window.location.href)}
          >
            {copied ? <CheckIcon size={17} /> : <LinkIcon size={17} />}
            <span aria-live="polite">{copied ? t.mobileCopied : t.mobileSend}</span>
          </button>
        ) : (
          <a href={downloads[os].url} className={ctaButton}>
            <DownloadIcon size={17} />
            {downloads[os].button}
          </a>
        )}
      </div>
      {isMobile ? (
        <p {...introOrder(3)} className="m-0 intro-rise text-[13px] text-balance text-fg-faint">
          <strong className="font-medium text-fg-link">{t.mobileTitle}</strong> · {t.mobileNote}
        </p>
      ) : (
        <p {...introOrder(3)} className={meta}>
          {t.free} · {t.alsoFor}
          {others.map((o, i) => (
            <button
              key={o}
              type="button"
              onClick={() => setOs(o)}
              className="text-fg-link underline decoration-white/25 underline-offset-[3px] hover:decoration-fg-link"
            >
              {downloads[o].label}
              {i < others.length - 1 ? "," : ""}
            </button>
          ))}
        </p>
      )}
    </div>
  );
}

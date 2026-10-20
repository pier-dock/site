"use client";

import { useRef } from "react";
import type { Dictionary } from "@/lib/i18n";
import { osList, type OS } from "@/lib/os";
import { DownloadIcon } from "./icons";
import { useOS } from "./OSProvider";

const tabId = (os: OS) => `download-tab-${os}`;
const panelId = "download-panel";

export function DownloadPanel({ t }: { t: Dictionary["download"] }) {
  const { os, setOs, downloads } = useOS();
  const tabs = useRef<Partial<Record<OS, HTMLButtonElement | null>>>({});
  const d = downloads[os];

  function onKeyDown(e: React.KeyboardEvent) {
    const i = osList.indexOf(os);
    const next =
      e.key === "ArrowRight"
        ? osList[(i + 1) % osList.length]
        : e.key === "ArrowLeft"
          ? osList[(i - 1 + osList.length) % osList.length]
          : e.key === "Home"
            ? osList[0]
            : e.key === "End"
              ? osList[osList.length - 1]
              : undefined;
    if (!next) return;
    e.preventDefault();
    setOs(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="flex w-full max-w-[640px] flex-col items-center gap-5">
      <div
        role="tablist"
        aria-label={t.tabsLabel}
        onKeyDown={onKeyDown}
        className="flex reveal-blur rounded-md border border-line-8 bg-white/4 p-1 reveal-step-1"
      >
        {osList.map((o) => {
          const selected = o === os;
          return (
            <button
              key={o}
              ref={(el) => {
                tabs.current[o] = el;
              }}
              type="button"
              role="tab"
              id={tabId(o)}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setOs(o)}
              className={`rounded-[9px] px-[18px] py-2 text-sm font-medium transition-colors ${
                selected ? "bg-white/14 text-fg" : "text-fg-3 hover:text-fg"
              }`}
            >
              {downloads[o].label}
            </button>
          );
        })}
      </div>

      <article
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(os)}
        className="flex w-full min-w-0 reveal-slide flex-col gap-[18px] rounded-lg border border-coral/40 p-6 text-left download-card"
      >
        <div className="flex items-center gap-2.5">
          <h3 className="m-0 text-lg font-semibold tracking-[-0.02em]">{d.label}</h3>
          <a
            href={d.url}
            aria-label={d.button}
            className="ml-auto flex h-[34px] items-center gap-1.5 rounded-[9px] bg-fg px-3 text-[13px] font-semibold text-fg-inverse transition-opacity hover:opacity-90"
          >
            <DownloadIcon size={13} />
            {t.downloadShort}
          </a>
        </div>

        <p className="m-0 flex flex-col gap-1 text-[13px]">
          <span className="text-fg-2">
            {d.file} · {d.fileNote}
          </span>
          <span className="text-fg-faint">{d.req}</span>
        </p>

        <ul aria-label={t.alts} className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {d.alts.map((a) => (
            <li key={a.url}>
              <a
                href={a.url}
                {...(a.newTab && { target: "_blank", rel: "noopener" })}
                className="flex h-[26px] items-center rounded-[7px] border border-line-8 px-[9px] text-xs text-fg-3 transition-colors hover:text-fg"
              >
                {a.label}
              </a>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}

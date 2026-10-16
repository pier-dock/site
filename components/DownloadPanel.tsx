"use client";

import { useRef } from "react";
import { downloads } from "@/lib/downloads";
import type { Dictionary } from "@/lib/i18n/pt-BR";
import { osList, type OS } from "@/lib/os";
import { CopyButton } from "./CopyButton";
import { DownloadIcon } from "./icons";
import { useOS } from "./OSProvider";

const tabId = (os: OS) => `download-tab-${os}`;
const panelId = "download-panel";

export function DownloadPanel({ t }: { t: Dictionary["download"] }) {
  const { os, detected, setOs } = useOS();
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
    <>
      <p className="m-0 text-[17px] text-fg-2">
        {t.detectedBefore}{" "}
        <strong className="font-semibold text-fg">{downloads[detected].label}</strong>
        {t.detectedAfter}
      </p>

      <div
        role="tablist"
        aria-label={t.tabsLabel}
        onKeyDown={onKeyDown}
        className="flex rounded-md border border-line-10 bg-white/6 p-1"
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
              className={`rounded-[9px] px-5 py-[9px] text-sm font-medium transition-colors ${
                selected ? "bg-white/14 text-fg" : "text-fg-3 hover:text-fg"
              }`}
            >
              {downloads[o].label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(os)}
        className="flex w-full max-w-[640px] flex-col gap-5 rounded-xl p-7 text-left glass-panel"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-[1_1_240px] flex-col gap-1">
            <h3 className="m-0 text-lg font-semibold">
              {t.pierFor} {d.label}
            </h3>
            <p className="m-0 text-[13px] text-fg-3">
              {d.file} · {d.req}
            </p>
          </div>
          <a
            href={d.url}
            className="flex h-12 items-center gap-2.5 rounded-md bg-coral px-5 text-[15px] font-semibold text-coral-ink shadow-cta-flat transition-[filter] hover:brightness-110"
          >
            <DownloadIcon size={17} />
            {d.button}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <p className="m-0 text-[13px] text-fg-3">
            {t.terminal} ({d.via})
          </p>
          <div className="flex h-12 items-center gap-2.5 rounded-md border border-line-10 bg-ink pr-1.5 pl-4">
            <span aria-hidden="true" className="font-mono text-[13px] text-coral-soft">
              $
            </span>
            <code className="flex-1 scrollbar-none overflow-x-auto font-mono text-[13px] whitespace-nowrap text-fg">
              {d.cmd}
            </code>
            <CopyButton
              key={os}
              text={d.cmd}
              label={t.copyLabel}
              idleText={t.copy}
              doneText={t.copied}
            />
          </div>
        </div>

        <ul aria-label={t.alts} className="m-0 flex list-none flex-wrap gap-2 p-0">
          {d.alts.map((a) => (
            <li key={a.url}>
              <a
                href={a.url}
                className="flex h-[30px] items-center rounded-sm border border-line-10 bg-white/5 px-2.5 text-xs text-fg-soft transition-colors hover:text-fg"
              >
                {a.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

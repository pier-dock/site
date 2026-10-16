"use client";

import type { Dictionary } from "@/lib/i18n";
import { githubRepo } from "@/lib/site";
import { AlbumArt } from "../AlbumArt";
import { editorFiles, windows, type AppId } from "./data";

type AppWindowProps = {
  app: AppId;
  trackName: string;
  playState: string;
  command: string;
  terminal: Dictionary["demo"]["terminal"];
};

export function AppWindow({ app, trackName, playState, command, terminal }: AppWindowProps) {
  const w = windows[app];
  return (
    <div
      aria-hidden="true"
      className={`absolute top-14 left-1/2 flex h-[250px] w-[min(600px,86%)] -translate-x-1/2 flex-col overflow-hidden rounded-md border shadow-window ${w.bg} ${w.border}`}
    >
      <div className={`relative flex h-[34px] shrink-0 items-center gap-1.5 px-3 ${w.bar}`}>
        <span className={`size-2.5 rounded-full ${w.dots}`} />
        <span className={`size-2.5 rounded-full ${w.dots}`} />
        <span className={`size-2.5 rounded-full ${w.dots}`} />
        <span
          className={`pointer-events-none absolute inset-x-0 text-center text-xs font-medium ${w.fg}`}
        >
          {w.title}
        </span>
      </div>

      {app === "vscode" && (
        <div className="flex flex-1 font-mono text-xs">
          <div className="flex w-[150px] flex-col gap-1 border-r border-code-divider bg-code-side py-2.5 text-fg-3">
            <span className="px-3 text-[10px] tracking-[0.08em] text-code-side-head">PIER</span>
            {editorFiles.map((f) => (
              <span
                key={f.name}
                className={`py-0.5 pr-3 ${f.depth ? "pl-6" : "pl-3"} ${f.active ? "bg-code-select text-fg" : ""}`}
              >
                {f.name}
              </span>
            ))}
          </div>
          <div className="flex-1 overflow-hidden px-3.5 py-3 leading-[1.75] whitespace-pre text-code-text">
            <div>
              <span className="text-code-keyword">export function</span>{" "}
              <span className="text-code-fn">Dock</span>() {"{"}
            </div>
            <div>
              {"  "}
              <span className="text-code-keyword">return</span> (
            </div>
            <div>
              {"    <"}
              <span className="text-code-type">Glass</span>{" "}
              <span className="text-code-prop">blur</span>={"{"}
              <span className="text-code-num">28</span>
              {"}"} <span className="text-code-prop">opacity</span>={"{"}
              <span className="text-code-num">0.4</span>
              {"}>"}
            </div>
            <div>
              {"      <"}
              <span className="text-code-type">Apps</span> /&gt;
            </div>
            <div>
              {"      <"}
              <span className="text-code-type">Widgets</span>{" "}
              <span className="text-code-prop">items</span>={"{"}
              <span className="text-code-prop">widgets</span>
              {"} />"}
            </div>
            <div>
              {"    </"}
              <span className="text-code-type">Glass</span>&gt;
            </div>
            <div>{"  );"}</div>
            <div>{"}"}</div>
          </div>
        </div>
      )}

      {app === "spotify" && (
        <div className="flex flex-1 items-center gap-5 bg-linear-to-b from-spotify-glow to-vinyl p-[22px]">
          <AlbumArt
            className="size-[140px] justify-center rounded-[4px] p-4 shadow-cover-sm"
            stripe="h-1 rounded-[2px]"
            gap="gap-1"
          />
          <span className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[0.08em] text-spotify-sub uppercase">
              {playState}
            </span>
            <span className="text-[26px] font-bold tracking-[-0.03em] text-white">{trackName}</span>
            <span className="text-sm text-spotify-sub">Radiohead · In Rainbows</span>
          </span>
        </div>
      )}

      {app === "terminal" && (
        <div className="flex-1 p-4 font-mono text-[13px] leading-[1.7] text-fg-soft">
          <div>
            <span className="text-green">~</span> $ {command}
          </div>
          <div className="text-fg-muted">{terminal.downloading}</div>
          <div className="text-fg-muted">{terminal.installing}</div>
          <div>{terminal.done}</div>
          <div>
            <span className="text-green">~</span> ${" "}
            <span className="inline-block h-[15px] w-2 bg-fg-soft align-[-2px]" />
          </div>
        </div>
      )}

      {app === "brave" && (
        <div className="flex flex-1 flex-col">
          <div className="flex h-9 items-center bg-win-urlbar px-3">
            <span className="flex h-6 flex-1 items-center rounded-xl bg-white px-3 text-xs text-win-ink-2">
              github.com/{githubRepo}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 bg-white p-[18px]">
            <span className="h-3.5 w-[40%] rounded-[7px] bg-fg-soft" />
            <span className="h-[9px] w-[85%] rounded-[5px] bg-win-sidebar" />
            <span className="h-[9px] w-[70%] rounded-[5px] bg-win-sidebar" />
            <span className="h-[9px] w-[78%] rounded-[5px] bg-win-sidebar" />
          </div>
        </div>
      )}
    </div>
  );
}

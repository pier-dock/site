"use client";

import { githubRepo } from "@/lib/site";
import { AlbumArt } from "../AlbumArt";
import { folders, windows, type AppId } from "./data";

type AppWindowProps = { app: AppId; trackName: string; playState: string; command: string };

export function AppWindow({ app, trackName, playState, command }: AppWindowProps) {
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

      {app === "finder" && (
        <div className="flex flex-1">
          <div className="flex w-[130px] flex-col gap-2 bg-win-sidebar p-3 text-xs text-win-ink-2">
            <span>Recentes</span>
            <span>Aplicativos</span>
            <span>Documentos</span>
            <span>Downloads</span>
          </div>
          <div className="grid flex-1 grid-cols-4 content-start gap-4 p-[18px]">
            {folders.map((f) => (
              <span key={f} className="flex flex-col items-center gap-1.5 text-[11px] text-win-ink">
                <span className="h-9 w-[46px] rounded-[6px] bg-win-folder" />
                {f}
              </span>
            ))}
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
          <div className="text-fg-muted">==&gt; Baixando Pier…</div>
          <div className="text-fg-muted">==&gt; Instalando Pier</div>
          <div>Pier instalado com sucesso.</div>
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

"use client";

import { useEffect, useState } from "react";
import { downloads } from "@/lib/downloads";
import { AlbumArt } from "../AlbumArt";
import { ContributionGrid } from "../ContributionGrid";
import {
  BatteryIcon,
  PlayPauseIcon,
  PullRequestIcon,
  ReviewIcon,
  SkipForwardIcon,
  VolumeIcon,
  WifiIcon,
} from "../icons";
import { useOS } from "../OSProvider";
import { AppWindow } from "./AppWindow";
import { Clock } from "./Clock";
import { apps, battery, contributions, pendingReviews } from "./data";
import {
  ContribPopover,
  MediaPopover,
  PrsPopover,
  ReviewsPopover,
  VolumePopover,
  popoverDomId,
  type PopoverId,
} from "./Popovers";
import { usePlayer } from "./usePlayer";

const triggerId = (id: PopoverId) => `dock-trigger-${id}`;

const divider = <span aria-hidden="true" className="mx-1.5 h-7 w-px shrink-0 bg-white/12" />;

export default function DockDemo() {
  const { os } = useOS();
  const player = usePlayer();
  const [focused, setFocused] = useState(3);
  const [minimized, setMinimized] = useState<boolean[]>(() => apps.map(() => false));
  const [hover, setHover] = useState(-1);
  const [pop, setPop] = useState<PopoverId | null>(null);
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    if (!pop) return;
    const current = pop;

    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setPop(null);
      document.getElementById(triggerId(current))?.focus();
    }
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      const inside =
        document.getElementById(popoverDomId(current))?.contains(target) ||
        document.getElementById(triggerId(current))?.contains(target);
      if (!inside) setPop(null);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [pop]);

  function toggle(id: PopoverId) {
    setPop((p) => (p === id ? null : id));
  }

  function clickApp(i: number) {
    setPop(null);
    setMinimized((m) => m.map((v, j) => (j === i ? focused === i : v)));
    setFocused(focused === i ? -1 : i);
  }

  function popTrigger(id: PopoverId) {
    return {
      id: triggerId(id),
      type: "button" as const,
      "aria-expanded": pop === id,
      "aria-controls": pop === id ? popoverDomId(id) : undefined,
      "aria-haspopup": "dialog" as const,
      onClick: () => toggle(id),
    };
  }

  const active = (id: PopoverId) => (pop === id ? "bg-white/10" : "hover:bg-white/6");
  const focusedApp = apps[focused];

  return (
    <>
      {focusedApp && (
        <AppWindow
          app={focusedApp.id}
          trackName={player.track.name}
          playState={player.playing ? "Tocando agora" : "Pausado"}
          command={downloads[os].cmd}
        />
      )}

      {pop === "media" && <MediaPopover player={player} />}
      {pop === "prs" && <PrsPopover />}
      {pop === "reviews" && <ReviewsPopover />}
      {pop === "contrib" && <ContribPopover />}
      {pop === "vol" && <VolumePopover volume={volume} onChange={setVolume} />}

      <div className="absolute inset-x-0 bottom-7 flex justify-center-safe overflow-x-auto px-4 pt-16">
        <div
          role="group"
          aria-label="Dock de demonstração"
          className="flex h-16 shrink-0 items-center gap-1 rounded-xl px-2 whitespace-nowrap glass-dock"
        >
          {apps.map((a, i) => {
            const isFocused = focused === i;
            const state = isFocused ? " (em foco)" : minimized[i] ? " (minimizado)" : "";
            return (
              <span key={a.id} className="relative flex">
                {hover === i && (
                  <span
                    role="tooltip"
                    id={`dock-tip-${a.id}`}
                    className="pointer-events-none absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-sm border border-line-12 bg-tooltip py-1.5 pr-2 pl-2.5 text-xs font-medium shadow-tooltip"
                  >
                    {a.name}
                    <kbd className="rounded bg-white/10 px-[5px] py-0.5 font-mono text-[10.5px] text-fg-2">
                      Ctrl Alt {a.key}
                    </kbd>
                  </span>
                )}
                <button
                  type="button"
                  aria-label={a.name + state}
                  aria-describedby={hover === i ? `dock-tip-${a.id}` : undefined}
                  onClick={() => clickApp(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(-1)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(-1)}
                  className={`flex h-14 w-12 flex-col items-center justify-center gap-[5px] rounded-md ${
                    isFocused ? "bg-white/8" : ""
                  }`}
                >
                  <span
                    // As iniciais fazem o papel do logo do app; via ::before elas ficam fora da
                    // árvore de texto, e o nome do botão continua só o aria-label.
                    data-initials={a.initials}
                    className={`flex size-10 items-center justify-center rounded-[10px] text-sm font-semibold text-white transition-transform duration-150 ease-out before:content-[attr(data-initials)] ${a.color} ${
                      hover === i ? "motion-safe:-translate-y-1.5 motion-safe:scale-[1.12]" : ""
                    }`}
                  />
                  <span
                    className={`h-1 rounded-[2px] transition-[width] duration-150 ${
                      isFocused ? "w-3.5 bg-coral" : "w-1 bg-white/55"
                    }`}
                  />
                </button>
              </span>
            );
          })}
          {divider}

          <button
            {...popTrigger("media")}
            className={`flex h-12 items-center gap-2.5 rounded-md px-2 text-left ${active("media")}`}
          >
            <span className="sr-only">Abrir player: </span>
            <AlbumArt
              className="size-[34px] justify-center rounded-[7px] p-[5px]"
              stripe="h-0.5"
              gap="gap-0.5"
            />
            <span className="flex w-[132px] flex-col gap-0.5">
              <span className="truncate text-[13px] font-medium">{player.track.name} </span>
              <span className="text-xs text-fg-dock">Radiohead</span>
              <span className="mt-0.5 flex h-0.5 rounded-[1px] bg-white/12">
                <span
                  className="h-0.5 rounded-[1px] bg-fg"
                  style={{ width: `${player.progress}%` }}
                />
              </span>
            </span>
          </button>
          <button
            type="button"
            aria-label={player.playing ? "Pausar" : "Tocar"}
            onClick={player.toggle}
            className="flex size-8 items-center justify-center rounded-sm text-fg hover:bg-white/6"
          >
            <PlayPauseIcon playing={player.playing} size={15} />
          </button>
          <button
            type="button"
            aria-label="Próxima faixa"
            onClick={player.next}
            className="flex size-8 items-center justify-center rounded-sm text-fg hover:bg-white/6"
          >
            <SkipForwardIcon size={15} />
          </button>
          {divider}

          <button
            {...popTrigger("prs")}
            aria-label="Seus pull requests, 0 abertos"
            className={`flex h-11 items-center gap-[7px] rounded-[10px] px-2.5 text-fg ${active("prs")}`}
          >
            <PullRequestIcon size={18} />
            <span className="text-[13px] font-medium text-fg-dock">0</span>
          </button>
          <button
            {...popTrigger("reviews")}
            aria-label={`Revisões pendentes, ${pendingReviews}`}
            className={`flex h-11 items-center gap-[7px] rounded-[10px] px-2.5 text-fg ${active("reviews")}`}
          >
            <ReviewIcon size={18} />
            <span className="rounded-[6px] bg-coral px-1.5 py-px text-xs font-semibold text-coral-ink">
              {pendingReviews}
            </span>
          </button>
          <button
            {...popTrigger("contrib")}
            className={`flex h-12 items-center gap-2.5 rounded-[10px] px-2.5 text-left ${active("contrib")}`}
          >
            <span className="sr-only">Contribuições: </span>
            <span className="flex flex-col gap-px">
              <span className="text-[15px] font-semibold">{contributions} </span>
              <span className="text-[11px] text-fg-dock">neste ano</span>
            </span>
            <ContributionGrid count={98} cell={4} gap={1.5} radius={1} />
          </button>
          {divider}

          <span
            role="img"
            aria-label="Wi-Fi conectado"
            className="flex size-8 items-center justify-center text-fg"
          >
            <WifiIcon size={17} />
          </span>
          <button
            {...popTrigger("vol")}
            aria-label={`Volume ${volume}%`}
            className={`flex size-8 items-center justify-center rounded-sm text-fg ${active("vol")}`}
          >
            <VolumeIcon level={volume} size={17} />
          </button>
          <span
            role="img"
            aria-label={`Bateria em ${battery}%`}
            className="flex h-8 items-center gap-1.5 px-1.5 text-[13px] text-fg"
          >
            <BatteryIcon size={17} />
            <span aria-hidden="true">{battery}%</span>
          </span>
          <Clock />
        </div>
      </div>
    </>
  );
}

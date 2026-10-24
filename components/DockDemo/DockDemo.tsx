"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fill, type Dictionary } from "@/lib/i18n";
import { shortcutKeys } from "@/lib/shortcuts";
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
import { introHover } from "../intro";
import { useOS } from "../OSProvider";
import { Clock } from "./Clock";
import { apps, battery, pendingReviews } from "./data";
import {
  ContribPopover,
  MediaPopover,
  PrsPopover,
  ReviewsPopover,
  VolumePopover,
  popoverDomId,
  type PopoverId,
} from "./Popovers";
import { useDockSound } from "./useDockSound";
import { usePlayer } from "./usePlayer";

const triggerId = (id: PopoverId) => `dock-trigger-${id}`;

const divider = <span aria-hidden="true" className="mx-1.5 h-7 w-px shrink-0 bg-white/12" />;

// No celular a dock mostra só os apps e a capa do player; o resto aparece a partir do sm.
const desktopOnly = "hidden sm:contents";

// O hover da intro passa primeiro pelos apps e segue pelos widgets, na ordem da dock.
const widget = (n: number) => introHover(apps.length + n);

// Item da dock sob o ponteiro: o botão de um app ou widget, ou um indicador (Wi-Fi, bateria, relógio).
function dockItem(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest("button") ?? target.closest("[data-intro-item]");
}

export default function DockDemo({ t }: { t: Dictionary["demo"] }) {
  const player = usePlayer();
  const { keycaps } = shortcutKeys[useOS().os];
  const [focused, setFocused] = useState(3);
  const [minimized, setMinimized] = useState<boolean[]>(() => apps.map(() => false));
  const [hover, setHover] = useState(-1);
  const [pop, setPop] = useState<PopoverId | null>(null);
  const [volume, setVolume] = useState(60);
  const playKey = useDockSound(volume);

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

  return (
    <>
      {pop === "media" && <MediaPopover player={player} t={t} />}
      {pop === "prs" && <PrsPopover t={t} />}
      {pop === "reviews" && <ReviewsPopover t={t} />}
      {pop === "contrib" && <ContribPopover t={t} />}
      {pop === "vol" && <VolumePopover volume={volume} onChange={setVolume} t={t} />}

      {/*
        O overflow-x-auto também corta na vertical: o pb dá espaço para a sombra da dock
        (20px + 50px de blur) e o -bottom compensa, deixando a dock a 28px da base da área.
      */}
      <div className="absolute inset-x-0 -bottom-12 flex intro-dock justify-center-safe overflow-x-auto px-2 pt-16 pb-[76px] sm:px-4">
        <div
          role="group"
          aria-label={t.dockLabel}
          data-intro-dock
          onMouseOver={(e) => {
            const item = dockItem(e.target);
            if (item && item !== dockItem(e.relatedTarget)) playKey();
          }}
          className="flex h-14 shrink-0 items-center gap-1 rounded-xl px-1.5 whitespace-nowrap glass-dock sm:h-16 sm:px-2"
        >
          {apps.map((a, i) => {
            const isFocused = focused === i;
            const state = isFocused ? t.focused : minimized[i] ? t.minimized : "";
            return (
              <span key={a.id} className="relative flex">
                {hover === i && (
                  <span
                    role="tooltip"
                    id={`dock-tip-${a.id}`}
                    className="pointer-events-none absolute bottom-16 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-sm border border-line-12 bg-tooltip py-1.5 pr-2 pl-2.5 text-xs font-medium shadow-tooltip sm:flex"
                  >
                    {a.name}
                    <kbd className="rounded bg-white/10 px-[5px] py-0.5 font-mono text-[10.5px] text-fg-2">
                      {keycaps} {a.key}
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
                  className={`flex h-12 w-10 flex-col items-center justify-center gap-1 rounded-md sm:h-14 sm:w-12 sm:gap-[5px] ${
                    isFocused ? "bg-white/8" : ""
                  }`}
                >
                  <Image
                    {...introHover(i)}
                    src={a.icon}
                    alt=""
                    width={44}
                    height={44}
                    loading="eager"
                    className={`intro-hover size-9 rounded-[9px] shadow-app-icon transition-transform duration-150 ease-out [--hover-lift:-6px] [--hover-scale:1.12] sm:size-11 sm:rounded-[11px] ${
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
            {...widget(0)}
            className={`intro-hover flex h-12 items-center gap-2.5 rounded-md px-1.5 text-left sm:px-2 ${active("media")}`}
          >
            <span className="sr-only">{t.openPlayer}</span>
            <AlbumArt
              className="size-[34px] justify-center rounded-[7px] p-[5px]"
              stripe="h-0.5"
              gap="gap-0.5"
            />
            <span className="hidden w-[132px] flex-col gap-0.5 sm:flex">
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
          <span className={desktopOnly}>
            <button
              type="button"
              aria-label={player.playing ? t.pause : t.play}
              onClick={player.toggle}
              {...widget(1)}
              className="intro-hover flex size-8 items-center justify-center rounded-sm text-fg hover:bg-white/6"
            >
              <PlayPauseIcon playing={player.playing} size={15} />
            </button>
            <button
              type="button"
              aria-label={t.next}
              onClick={player.next}
              {...widget(2)}
              className="intro-hover flex size-8 items-center justify-center rounded-sm text-fg hover:bg-white/6"
            >
              <SkipForwardIcon size={15} />
            </button>
            {divider}

            <button
              {...popTrigger("prs")}
              {...widget(3)}
              aria-label={t.prsTrigger}
              className={`intro-hover flex h-11 items-center gap-[7px] rounded-[10px] px-2.5 text-fg ${active("prs")}`}
            >
              <PullRequestIcon size={18} />
              <span className="text-[13px] font-medium text-fg-dock">0</span>
            </button>
            <button
              {...popTrigger("reviews")}
              {...widget(4)}
              aria-label={fill(t.reviewsTrigger, { n: pendingReviews })}
              className={`intro-hover flex h-11 items-center gap-[7px] rounded-[10px] px-2.5 text-fg ${active("reviews")}`}
            >
              <ReviewIcon size={18} />
              <span className="rounded-[6px] bg-coral px-1.5 py-px text-xs font-semibold text-coral-ink">
                {pendingReviews}
              </span>
            </button>
            <button
              {...popTrigger("contrib")}
              {...widget(5)}
              className={`intro-hover flex h-12 items-center gap-2.5 rounded-[10px] px-2.5 text-left ${active("contrib")}`}
            >
              <span className="sr-only">{t.contribPrefix}</span>
              <span className="flex flex-col gap-px">
                <span className="text-[15px] font-semibold">{t.contribTotal} </span>
                <span className="text-[11px] text-fg-dock">{t.contribThisYear}</span>
              </span>
              <ContributionGrid count={98} cell={4} gap={1.5} radius={1} />
            </button>
            {divider}

            <span
              role="img"
              aria-label={t.wifi}
              {...widget(6)}
              className="intro-hover flex size-8 items-center justify-center text-fg"
            >
              <WifiIcon size={17} />
            </span>
            <button
              {...popTrigger("vol")}
              {...widget(7)}
              aria-label={fill(t.volumeLabel, { n: volume })}
              className={`intro-hover flex size-8 items-center justify-center rounded-sm text-fg ${active("vol")}`}
            >
              <VolumeIcon level={volume} size={17} />
            </button>
            <span
              role="img"
              aria-label={fill(t.battery, { n: battery })}
              {...widget(8)}
              className="intro-hover flex h-8 items-center gap-1.5 px-1.5 text-[13px] text-fg"
            >
              <BatteryIcon size={17} />
              <span aria-hidden="true">{battery}%</span>
            </span>
            <span {...widget(9)} className="intro-hover flex">
              <Clock t={t} />
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

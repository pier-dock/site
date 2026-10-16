"use client";

import { AlbumArt } from "../AlbumArt";
import { ContributionGrid } from "../ContributionGrid";
import { PlayPauseIcon, PullRequestIcon, SkipBackIcon, SkipForwardIcon } from "../icons";
import { contributions, pendingReviews, reviews } from "./data";
import { Popover } from "./Popover";
import type { Player } from "./usePlayer";

export type PopoverId = "media" | "prs" | "reviews" | "contrib" | "vol";

export const popoverDomId = (id: PopoverId) => `dock-pop-${id}`;
const titleId = (id: PopoverId) => `dock-pop-${id}-title`;

const header = "flex justify-between border-b border-line-8 px-4 py-3.5";

export function MediaPopover({ player }: { player: Player }) {
  return (
    <Popover id={popoverDomId("media")} labelledBy={titleId("media")} width="w-[min(340px,92%)]">
      <div className="flex items-center gap-3.5 p-4">
        <AlbumArt
          className="size-20 justify-center rounded-sm p-2.5"
          stripe="h-[3px] rounded-[2px]"
          gap="gap-[3px]"
        />
        <span className="flex min-w-0 flex-col gap-[3px]">
          <span className="text-[11px] tracking-[0.06em] text-fg-2 uppercase">
            {player.playing ? "Tocando agora" : "Pausado"} · Spotify
          </span>
          <span id={titleId("media")} className="text-base font-semibold">
            {player.track.name}
          </span>
          <span className="text-[13px] text-fg-2">Radiohead · In Rainbows</span>
        </span>
      </div>
      <div className="flex flex-col gap-[5px] px-4">
        <span
          role="progressbar"
          aria-label="Progresso da faixa"
          aria-valuemin={0}
          aria-valuemax={player.track.duration}
          aria-valuenow={player.pos}
          aria-valuetext={`${player.position} de ${player.duration}`}
          className="flex h-1 rounded-[2px] bg-white/12"
        >
          <span className="h-1 rounded-[2px] bg-fg" style={{ width: `${player.progress}%` }} />
        </span>
        <span className="flex justify-between font-mono text-[11px] text-fg-2">
          <span>{player.position}</span>
          <span>{player.duration}</span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-3.5 pt-1.5 pb-4 text-fg">
        <button
          type="button"
          aria-label="Faixa anterior"
          onClick={player.prev}
          className="flex size-11 items-center justify-center rounded-[10px] hover:bg-white/8"
        >
          <SkipBackIcon size={18} />
        </button>
        <button
          type="button"
          aria-label={player.playing ? "Pausar" : "Tocar"}
          onClick={player.toggle}
          className="flex size-12 items-center justify-center rounded-full bg-fg text-ink"
        >
          <PlayPauseIcon playing={player.playing} size={18} />
        </button>
        <button
          type="button"
          aria-label="Próxima faixa"
          onClick={player.next}
          className="flex size-11 items-center justify-center rounded-[10px] hover:bg-white/8"
        >
          <SkipForwardIcon size={18} />
        </button>
      </div>
    </Popover>
  );
}

export function PrsPopover() {
  return (
    <Popover id={popoverDomId("prs")} labelledBy={titleId("prs")} width="w-[min(380px,92%)]">
      <div className={`${header} items-baseline`}>
        <span id={titleId("prs")} className="text-sm font-semibold">
          Seus pull requests
        </span>
        <span className="text-xs text-fg-2">0 abertos</span>
      </div>
      <div className="flex flex-col items-center gap-2 px-4 py-9">
        <span className="flex size-11 items-center justify-center rounded-md bg-white/6 text-fg-2">
          <PullRequestIcon size={20} />
        </span>
        <span className="text-sm font-medium">Nenhum pull request aberto</span>
        <span className="text-[13px] text-fg-3">Tudo limpo por aqui.</span>
      </div>
    </Popover>
  );
}

export function ReviewsPopover() {
  return (
    <Popover
      id={popoverDomId("reviews")}
      labelledBy={titleId("reviews")}
      width="w-[min(400px,92%)]"
    >
      <div className={`${header} items-center`}>
        <span id={titleId("reviews")} className="text-sm font-semibold">
          Aguardando sua revisão
        </span>
        <span className="rounded-[6px] bg-coral px-[7px] py-px text-xs font-semibold text-coral-ink">
          {pendingReviews}
        </span>
      </div>
      <ul className="m-0 list-none p-1.5">
        {reviews.map((r, i) => (
          <li
            key={r.title}
            className={`flex flex-col gap-[3px] rounded-[9px] p-2.5 ${i === 0 ? "bg-white/7" : ""}`}
          >
            <span className="text-[13px] font-medium">{r.title}</span>
            <span className="text-xs text-fg-3">{r.meta}</span>
          </li>
        ))}
      </ul>
      <div className="flex h-[38px] items-center border-t border-line-8 px-4 text-xs text-fg-2">
        + {pendingReviews - reviews.length} no GitHub
      </div>
    </Popover>
  );
}

export function ContribPopover() {
  return (
    <Popover
      id={popoverDomId("contrib")}
      labelledBy={titleId("contrib")}
      width="w-[min(520px,92%)]"
      className="flex flex-col gap-3 p-4"
    >
      <span className="flex flex-col gap-0.5">
        <span id={titleId("contrib")} className="text-[11px] tracking-[0.06em] text-fg-2 uppercase">
          Contribuições em 2026
        </span>
        <span className="text-3xl font-semibold tracking-[-0.03em]">{contributions}</span>
      </span>
      <ContributionGrid
        count={364}
        cell={7}
        gap={2}
        radius={1.5}
        label="Mapa de contribuições do ano"
      />
    </Popover>
  );
}

type VolumePopoverProps = { volume: number; onChange: (v: number) => void };

export function VolumePopover({ volume, onChange }: VolumePopoverProps) {
  return (
    <Popover
      id={popoverDomId("vol")}
      labelledBy={titleId("vol")}
      width="w-[min(280px,92%)]"
      className="flex flex-col gap-2.5 p-4"
    >
      <span className="flex justify-between text-sm">
        <label id={titleId("vol")} htmlFor="dock-volume" className="font-semibold">
          Volume
        </label>
        <span className="text-fg-2 tabular-nums">{volume}%</span>
      </span>
      <input
        id="dock-volume"
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-fg"
      />
      <span className="text-xs text-fg-3">Saída: alto-falantes</span>
    </Popover>
  );
}

import type { Dictionary } from "@/lib/i18n/pt-BR";
import { DockStage } from "./DockDemo/DockStage";
import { HeroCta } from "./HeroCta";
import { Wallpaper } from "./Wallpaper";

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="topo" aria-labelledby="titulo" className="relative overflow-hidden px-6 pt-24">
      <Wallpaper />
      <div className="relative mx-auto flex max-w-[960px] flex-col items-center gap-6 text-center">
        <a
          href="#widgets"
          className="inline-flex h-8 items-center gap-2 rounded-2xl border border-line-12 bg-white/6 pr-1.5 pl-3 text-[13px] text-fg-soft transition-colors hover:bg-white/9"
        >
          {t.badge}
          <span className="flex h-[22px] items-center rounded-[11px] bg-coral/16 px-2 text-coral-pale">
            {t.badgeCta}
          </span>
        </a>
        <h1
          id="titulo"
          className="m-0 text-[clamp(44px,7.4vw,92px)] leading-[0.98] font-bold tracking-[-0.055em] text-balance"
        >
          {t.titleTop}
          <br />
          {t.titleBottom}
        </h1>
        <p className="m-0 max-w-[640px] text-[clamp(17px,2vw,20px)] leading-normal text-fg-2">
          {t.subtitle}
        </p>
        <HeroCta t={t} />
      </div>
      <DockStage badge={t.demoBadge} label={t.demoLabel} />
    </section>
  );
}

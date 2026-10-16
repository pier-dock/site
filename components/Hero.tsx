import type { Dictionary } from "@/lib/i18n";
import { DockDemoLazy } from "./DockDemo/DockDemoLazy";
import { DockStage } from "./DockDemo/DockStage";
import { genieSlice } from "./genie";
import { HeroCta } from "./HeroCta";
import { IntroScript } from "./IntroScript";
import { Wallpaper } from "./Wallpaper";

type HeroProps = { t: Dictionary["hero"]; demo: Dictionary["demo"] };

export function Hero({ t, demo }: HeroProps) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-clip px-6 pt-24">
      <Wallpaper />
      <div
        id="hero-intro"
        className="relative mx-auto flex max-w-[960px] flex-col items-center gap-6 text-center"
      >
        <a
          href="#widgets"
          {...genieSlice(0)}
          className="inline-flex h-8 genie-slice items-center gap-2 rounded-full border border-line-12 bg-white/6 pr-1.5 pl-3 text-[13px] text-fg-soft transition-colors hover:bg-white/9"
        >
          {t.badge}
          <span className="flex h-[22px] items-center rounded-[11px] bg-coral/16 px-2 text-coral-pale">
            {t.badgeCta}
          </span>
        </a>
        <h1
          id="hero-title"
          className="m-0 text-[clamp(44px,7.4vw,92px)] leading-[0.98] font-bold tracking-[-0.055em] text-balance"
        >
          <span {...genieSlice(1)} className="block genie-slice">
            {t.titleTop}
          </span>
          <span {...genieSlice(2)} className="block genie-slice">
            {t.titleBottom}
          </span>
        </h1>
        <p
          {...genieSlice(3)}
          className="m-0 max-w-[640px] genie-slice text-[clamp(17px,2vw,20px)] leading-normal text-fg-2"
        >
          {t.subtitle}
        </p>
        <HeroCta t={t} />
      </div>
      <DockStage badge={t.demoBadge} label={t.demoLabel}>
        <DockDemoLazy t={demo} />
      </DockStage>
      <IntroScript />
    </section>
  );
}

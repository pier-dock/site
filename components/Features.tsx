import Image from "next/image";
import braveIcon from "@/assets/apps/brave.svg";
import spotifyIcon from "@/assets/apps/spotify.svg";
import vscodeIcon from "@/assets/apps/vscode.svg";
import type { Dictionary } from "@/lib/i18n";
import { ClawdIcon, ClawdWalker } from "./Clawd";
import { ContributionGrid } from "./ContributionGrid";
import { apps } from "./DockDemo/data";
import { BatteryIcon, VolumeIcon, WifiIcon } from "./icons";

const cardBody = "relative m-0 text-[15px] leading-[1.55] text-fg-2";

const shortcuts = [
  { name: "Visual Studio Code", icon: vscodeIcon, key: 1, delay: "delay-0" },
  { name: "Spotify", icon: spotifyIcon, key: 2, delay: "delay-75" },
  { name: "Brave Browser", icon: braveIcon, key: 3, delay: "delay-150" },
];

const platforms = [
  { name: "macOS", delay: "delay-0" },
  { name: "Windows", delay: "delay-75" },
  { name: "Linux", delay: "delay-150" },
];

type FeatureCardProps = {
  id: string;
  title: string;
  className: string;
  /** Sem corte: para enfeites que passam da borda, como o Clawd andando em cima do card. */
  clip?: boolean;
  children: React.ReactNode;
};

function FeatureCard({ id, title, className, clip = true, children }: FeatureCardProps) {
  const titleId = `feature-${id}`;
  return (
    <article
      className={`group relative flex flex-col gap-3 ${clip ? "overflow-hidden" : ""} rounded-xl border border-line-8 bg-surface p-8 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:[transform:translateY(-4px)] hover:border-line-16 hover:bg-surface-hover hover:shadow-card-hover ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(70%_60%_at_50%_0%,var(--color-line-10),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <h3 id={titleId} className="relative m-0 text-[22px] font-semibold tracking-[-0.02em]">
        {title}
      </h3>
      {children}
    </article>
  );
}

export function Features({ t }: { t: Dictionary["features"] }) {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="border-t border-line-8 px-6 py-28"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
        <div className="flex max-w-[640px] reveal flex-col gap-3.5">
          <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-coral-soft uppercase">
            {t.eyebrow}
          </p>
          <h2
            id="features-title"
            className="m-0 text-[clamp(32px,4.4vw,52px)] leading-[1.04] font-bold tracking-[-0.045em]"
          >
            {t.title}
          </h2>
        </div>

        {/*
          O Clawd do card Claude Buddy sobe ~25px acima da borda. A partir do lg o card fica na 1ª
          linha, sob o título da seção; antes disso ele pode cair sob outro card, então as linhas
          ficam mais afastadas para o Clawd não encostar.
        */}
        <div className="flex flex-wrap gap-x-4 gap-y-8 lg:gap-y-4">
          <FeatureCard
            id="github"
            title={t.github.title}
            className="min-h-[300px] flex-[2_1_586px] reveal"
          >
            <p className={`${cardBody} max-w-[420px]`}>{t.github.body}</p>
            <ContributionGrid
              count={364}
              cell={11}
              gap={3}
              radius={2.5}
              label={t.github.mapLabel}
              className="relative mt-auto transition-[filter] duration-500 group-hover:brightness-150 group-hover:saturate-150"
            />
          </FeatureCard>

          <FeatureCard
            id="claude"
            title={t.claude.title}
            clip={false}
            className="min-h-[300px] flex-[1_1_360px] reveal reveal-step-1"
          >
            <ClawdWalker
              size={32}
              sprite={24}
              className="inset-x-6 top-0 [--clawd-duration:14s] sm:[--clawd-duration:26s] lg:[--clawd-duration:46s]"
            />
            <p className={`${cardBody} max-w-[460px]`}>{t.claude.body}</p>
            <div aria-hidden="true" className="relative mt-auto flex justify-center pt-12">
              <div className="relative flex h-14 items-center gap-1 rounded-xl px-2 glass-dock sm:h-16">
                {apps.map((a, i) => (
                  <span
                    key={a.id}
                    className="flex h-12 w-10 flex-col items-center justify-center gap-1 sm:h-14 sm:w-12"
                  >
                    <Image
                      src={a.icon}
                      alt=""
                      width={44}
                      height={44}
                      className="size-9 rounded-[9px] shadow-app-icon sm:size-11 sm:rounded-[11px]"
                    />
                    <span
                      className={`h-1 rounded-[2px] ${i === 0 ? "w-3.5 bg-coral" : "w-1 bg-white/55"}`}
                    />
                  </span>
                ))}
                <span className="mx-1.5 h-7 w-px shrink-0 bg-white/12" />
                <span className="relative flex size-10 items-center justify-center rounded-[10px] bg-white/6 text-clawd sm:size-11">
                  <ClawdIcon size={18} className="clawd-wobble" />
                  <span className="absolute right-1 bottom-1 size-[5px] animate-pulse rounded-full bg-clawd" />
                </span>
                <span className="hidden items-center gap-2.5 px-2.5 text-fg xl:flex">
                  <WifiIcon size={17} />
                  <VolumeIcon level={60} size={17} />
                  <BatteryIcon size={17} />
                </span>
                <ClawdWalker
                  size={26}
                  sprite={18}
                  className="inset-x-2.5 top-0 [--clawd-duration:10s] sm:[--clawd-duration:15s]"
                />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            id="glass"
            title={t.glass.title}
            className="min-h-[280px] flex-[1_1_300px] reveal"
          >
            <div
              aria-hidden="true"
              className="absolute -right-[60px] -bottom-20 size-[260px] rounded-full bg-wall-blue opacity-90 blur-[60px] transition-transform duration-700 ease-out group-hover:[transform:translate(-90px,-30px)]"
            />
            <div
              aria-hidden="true"
              className="absolute right-20 -bottom-10 size-[200px] rounded-full bg-wall-rose opacity-90 blur-[50px] transition-transform duration-700 ease-out group-hover:[transform:translate(110px,-20px)]"
            />
            <p className={cardBody}>{t.glass.body}</p>
            <div
              aria-hidden="true"
              className="relative mt-auto h-14 rounded-[16px] border border-line-18 bg-glass/40 shadow-glass-sample backdrop-blur-[24px] backdrop-saturate-[1.8] transition-transform duration-500 group-hover:[transform:translateY(-6px)]"
            />
          </FeatureCard>

          <FeatureCard
            id="shortcuts"
            title={t.shortcuts.title}
            className="min-h-[280px] flex-[1_1_300px] reveal reveal-step-1"
          >
            <p className={cardBody}>{t.shortcuts.body}</p>
            <ul className="relative m-0 mt-auto flex list-none flex-col gap-2 p-0">
              {shortcuts.map((s) => (
                <li key={s.key} className="flex items-center gap-2.5 text-sm">
                  <Image
                    src={s.icon}
                    alt=""
                    width={26}
                    height={26}
                    className={`size-[26px] rounded-[7px] transition-transform duration-300 ease-out group-hover:[transform:translateY(-3px)_scale(1.12)] ${s.delay}`}
                  />
                  <span className="flex-1">{s.name}</span>
                  <kbd
                    className={`rounded bg-white/8 px-1.5 py-0.5 font-mono text-[11px] text-fg-2 transition-colors duration-300 group-hover:bg-white/14 group-hover:text-fg ${s.delay}`}
                  >
                    Ctrl Alt {s.key}
                  </kbd>
                </li>
              ))}
            </ul>
          </FeatureCard>

          <FeatureCard
            id="platforms"
            title={t.platforms.title}
            className="min-h-[280px] flex-[1_1_300px] reveal reveal-step-2"
          >
            <p className={cardBody}>{t.platforms.body}</p>
            <ul className="relative m-0 mt-auto flex list-none flex-wrap gap-2 p-0">
              {platforms.map((p) => (
                <li
                  key={p.name}
                  className={`flex h-8 items-center rounded-sm border border-line-10 bg-white/7 px-3 text-[13px] transition-colors duration-300 group-hover:border-line-18 group-hover:bg-white/12 ${p.delay}`}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

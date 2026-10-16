import Image from "next/image";
import braveIcon from "@/assets/apps/brave.svg";
import spotifyIcon from "@/assets/apps/spotify.svg";
import vscodeIcon from "@/assets/apps/vscode.svg";
import type { Dictionary } from "@/lib/i18n/pt-BR";
import { ContributionGrid } from "./ContributionGrid";

const card =
  "relative flex flex-col gap-3 overflow-hidden rounded-xl border border-line-8 bg-surface p-8";
const cardTitle = "relative m-0 text-[22px] font-semibold tracking-[-0.02em]";
const cardBody = "relative m-0 text-[15px] leading-[1.55] text-fg-2";

const shortcuts = [
  { name: "Visual Studio Code", icon: vscodeIcon, key: 1 },
  { name: "Spotify", icon: spotifyIcon, key: 2 },
  { name: "Brave Browser", icon: braveIcon, key: 3 },
];

export function Features({ t }: { t: Dictionary["features"] }) {
  return (
    <section
      id="recursos"
      aria-labelledby="recursos-titulo"
      className="border-t border-line-8 px-6 py-28"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
        <div className="flex max-w-[640px] flex-col gap-3.5">
          <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-coral-soft uppercase">
            {t.eyebrow}
          </p>
          <h2
            id="recursos-titulo"
            className="m-0 text-[clamp(32px,4.4vw,52px)] leading-[1.04] font-bold tracking-[-0.045em]"
          >
            {t.title}
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          <article className={`${card} min-h-[300px] flex-[2_1_586px]`}>
            <h3 className={cardTitle}>{t.github.title}</h3>
            <p className={`${cardBody} max-w-[420px]`}>{t.github.body}</p>
            <ContributionGrid
              count={364}
              cell={11}
              gap={3}
              radius={2.5}
              label={t.github.mapLabel}
              className="mt-auto"
            />
          </article>

          <article className={`${card} min-h-[300px] flex-[1_1_386px]`}>
            <div
              aria-hidden="true"
              className="absolute -right-[60px] -bottom-20 size-[260px] rounded-full bg-wall-blue opacity-90 blur-[60px]"
            />
            <div
              aria-hidden="true"
              className="absolute right-20 -bottom-10 size-[200px] rounded-full bg-wall-rose opacity-90 blur-[50px]"
            />
            <h3 className={cardTitle}>{t.glass.title}</h3>
            <p className={cardBody}>{t.glass.body}</p>
            <div
              aria-hidden="true"
              className="relative mt-auto h-14 rounded-[16px] border border-line-18 bg-glass/40 shadow-glass-sample backdrop-blur-[24px] backdrop-saturate-[1.8]"
            />
          </article>

          <article className={`${card} min-h-[280px] flex-[1_1_386px]`}>
            <h3 className={cardTitle}>{t.shortcuts.title}</h3>
            <p className={cardBody}>{t.shortcuts.body}</p>
            <ul className="m-0 mt-auto flex list-none flex-col gap-2 p-0">
              {shortcuts.map((s) => (
                <li key={s.key} className="flex items-center gap-2.5 text-sm">
                  <Image
                    src={s.icon}
                    alt=""
                    width={26}
                    height={26}
                    className="size-[26px] rounded-[7px]"
                  />
                  <span className="flex-1">{s.name}</span>
                  <kbd className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[11px] text-fg-2">
                    Ctrl Alt {s.key}
                  </kbd>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${card} min-h-[280px] flex-[1_1_386px]`}>
            <h3 className={cardTitle}>{t.platforms.title}</h3>
            <p className={cardBody}>{t.platforms.body}</p>
            <ul className="m-0 mt-auto flex list-none flex-wrap gap-2 p-0">
              {["macOS", "Windows", "Linux"].map((os) => (
                <li
                  key={os}
                  className="flex h-8 items-center rounded-sm border border-line-10 bg-white/7 px-3 text-[13px]"
                >
                  {os}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

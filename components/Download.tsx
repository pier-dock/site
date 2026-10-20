import type { Dictionary } from "@/lib/i18n";
import { links } from "@/lib/site";
import { DownloadPanel } from "./DownloadPanel";
import { AppIcon } from "./Logo";

const footLink =
  "text-fg-link underline decoration-white/25 underline-offset-[3px] hover:decoration-fg-link";

export function Download({ t }: { t: Dictionary["download"] }) {
  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="relative overflow-clip border-t border-line-8 px-6 pt-[120px] pb-28"
    >
      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="relative mb-3 size-[104px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -mt-[150px] -ml-[180px] size-[360px] bloom rounded-full icon-glow"
            />
            <div className="relative dock-drop drop-shadow-[0_18px_30px_rgb(0_0_0/0.6)]">
              <AppIcon size={104} />
            </div>
          </div>
          <h2
            id="download-title"
            className="m-0 reveal-blur text-[clamp(36px,5vw,60px)] leading-[1.02] font-semibold tracking-[-0.045em] text-white reveal-step-1"
          >
            {t.title}
          </h2>
          <p className="m-0 reveal-blur text-[clamp(16px,1.6vw,18px)] text-fg-sub reveal-step-2">
            {t.subtitle}
          </p>
        </div>

        <DownloadPanel t={t} />

        <p className="m-0 reveal-slide text-[13px] text-fg-faint">
          {t.openSource}{" "}
          <a href={links.repo} target="_blank" rel="noopener" className={footLink}>
            {t.github}
          </a>{" "}
          ·{" "}
          <a href={links.latestRelease} target="_blank" rel="noopener" className={footLink}>
            {t.releaseNotes}
          </a>
        </p>
      </div>
    </section>
  );
}

import type { Dictionary } from "@/lib/i18n";
import { DownloadPanel } from "./DownloadPanel";
import { AppIcon } from "./Logo";

export function Download({ t }: { t: Dictionary["download"] }) {
  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="relative overflow-hidden border-t border-line-8 px-6 py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] left-1/2 -ml-[350px] h-[500px] w-[700px] rounded-full bg-wall-rose opacity-55 blur-[160px]"
      />
      <div className="relative mx-auto flex max-w-[880px] flex-col items-center gap-7 text-center">
        <div className="reveal">
          <AppIcon size={88} />
        </div>
        <h2
          id="download-title"
          className="m-0 reveal text-[clamp(36px,5vw,60px)] leading-[1.02] font-bold tracking-[-0.05em] reveal-step-1"
        >
          {t.title}
        </h2>
        <DownloadPanel t={t} />
      </div>
    </section>
  );
}

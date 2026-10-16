import type { Dictionary } from "@/lib/i18n/pt-BR";
import { DownloadPanel } from "./DownloadPanel";
import { AppIcon } from "./Logo";

export function Download({ t }: { t: Dictionary["download"] }) {
  return (
    <section
      id="download"
      aria-labelledby="download-titulo"
      className="relative overflow-hidden border-t border-line-8 px-6 py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] left-1/2 -ml-[350px] h-[500px] w-[700px] rounded-full bg-wall-rose opacity-55 blur-[160px]"
      />
      <div className="relative mx-auto flex max-w-[880px] flex-col items-center gap-7 text-center">
        <AppIcon size={88} />
        <h2
          id="download-titulo"
          className="m-0 text-[clamp(36px,5vw,60px)] leading-[1.02] font-bold tracking-[-0.05em]"
        >
          {t.title}
        </h2>
        <DownloadPanel t={t} />
      </div>
    </section>
  );
}

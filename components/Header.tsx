import type { Dictionary } from "@/lib/i18n/pt-BR";
import { links } from "@/lib/site";
import { DownloadIcon } from "./icons";
import { LogoMark } from "./Logo";

const navLink = "text-fg-2 transition-colors hover:text-fg";

export function Header({ t }: { t: Dictionary["nav"] }) {
  return (
    <header className="sticky top-0 z-20 glass-bar">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-6">
        <a
          href="#topo"
          aria-label={t.home}
          className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.04em] text-fg"
        >
          <LogoMark size={26} />
          pier
        </a>
        <nav aria-label={t.label} className="flex flex-1 justify-end sm:justify-start">
          <ul className="hidden gap-[22px] text-sm sm:flex">
            <li>
              <a href="#recursos" className={navLink}>
                {t.features}
              </a>
            </li>
            <li>
              <a href="#widgets" className={navLink}>
                {t.widgets}
              </a>
            </li>
            <li>
              <a href="#download" className={navLink}>
                {t.download}
              </a>
            </li>
            <li>
              <a href={links.repo} aria-label={t.githubLabel} className={navLink}>
                {t.github}
              </a>
            </li>
          </ul>
        </nav>
        <a
          href="#download"
          className="flex h-9 items-center gap-2 rounded-[9px] bg-fg px-3.5 text-[13px] font-semibold text-ink transition-opacity hover:opacity-90"
        >
          <DownloadIcon size={14} />
          {t.cta}
        </a>
      </div>
    </header>
  );
}

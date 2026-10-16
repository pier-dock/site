import { localeInfo, localePath, locales, type Dictionary, type Locale } from "@/lib/i18n";
import { links } from "@/lib/site";
import { DownloadIcon } from "./icons";
import { LogoMark } from "./Logo";

const navLink = "text-fg-2 transition-colors hover:text-fg";

type HeaderProps = { t: Dictionary["nav"]; locale: Locale };

export function Header({ t, locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 intro-header glass-bar">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-6">
        <a
          href="#top"
          aria-label={t.home}
          className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.04em] text-fg"
        >
          <LogoMark size={26} />
          pier
        </a>
        <nav aria-label={t.label} className="flex flex-1 justify-end sm:justify-start">
          <ul className="hidden gap-[22px] text-sm sm:flex">
            <li>
              <a href="#features" className={navLink}>
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
        <div className="flex items-center gap-3">
          <ul
            aria-label={t.language}
            className="m-0 flex h-9 list-none items-center rounded-[9px] border border-line-10 bg-white/5 p-0.5 text-xs font-semibold"
          >
            {locales.map((l) => {
              const info = localeInfo[l];
              const base = "flex h-full items-center rounded-[7px] px-2.5";
              return (
                <li key={l} className="h-full">
                  {l === locale ? (
                    <span aria-current="page" className={`${base} bg-white/12 text-fg`}>
                      {info.short}
                    </span>
                  ) : (
                    <a
                      href={localePath[l]}
                      hrefLang={info.htmlLang}
                      lang={info.htmlLang}
                      title={info.switchLabel}
                      className={`${base} text-fg-3 transition-colors hover:text-fg`}
                    >
                      {info.short}
                      <span className="sr-only"> · {info.switchLabel}</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          <a
            href="#download"
            className="flex h-9 items-center gap-2 rounded-[9px] bg-fg px-3.5 text-[13px] font-semibold text-ink transition-opacity hover:opacity-90"
          >
            <DownloadIcon size={14} />
            {t.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

import { localeInfo, localePath, locales, type Dictionary, type Locale } from "@/lib/i18n";
import { links } from "@/lib/site";
import { HeaderCta } from "./HeaderCta";
import { LogoMark } from "./Logo";

const navLink =
  "flex h-9 items-center rounded-[9px] px-3 text-fg-3 transition-colors hover:bg-white/6 hover:text-fg";

type HeaderProps = { t: Dictionary["nav"]; locale: Locale };

export function Header({ t, locale }: HeaderProps) {
  return (
    <header className="pointer-events-none sticky top-4 z-20 mt-4 flex intro-header justify-center px-4">
      <div className="pointer-events-auto flex h-14 w-full max-w-[760px] items-center gap-2 rounded-[16px] pr-2 pl-3.5 glass-nav">
        <a
          href="#top"
          aria-label={t.home}
          className="flex h-10 items-center gap-2 pr-1.5 text-[17px] font-bold tracking-[-0.04em] text-fg"
        >
          <LogoMark size={24} />
          pier
        </a>
        <nav aria-label={t.label} className="hidden flex-1 justify-center sm:flex">
          <ul className="m-0 flex list-none gap-0.5 p-0 text-sm">
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
              <a
                href={links.repo}
                target="_blank"
                rel="noopener"
                aria-label={t.githubLabel}
                className={navLink}
              >
                {t.github}
              </a>
            </li>
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ul
            aria-label={t.language}
            className="m-0 flex h-7 list-none items-center rounded-[8px] border border-line-10 bg-white/5 p-0.5 text-[11px] font-semibold"
          >
            {locales.map((l) => {
              const info = localeInfo[l];
              const base = "flex h-full items-center rounded-[6px] px-2";
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
          <HeaderCta label={t.cta} />
        </div>
      </div>
    </header>
  );
}

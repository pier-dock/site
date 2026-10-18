import type { Dictionary } from "@/lib/i18n";
import { links } from "@/lib/site";
import { LogoMark } from "./Logo";

const footerLink = "text-fg-2 transition-colors hover:text-fg";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-line-8 px-6 py-10">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-6 text-[13px] text-fg-3">
        <span className="flex items-center gap-2 text-base font-bold tracking-[-0.04em] text-fg">
          <LogoMark size={20} dot={false} />
          pier
        </span>
        <p className="flex-1">
          {t.madeBy}
        </p>
        <nav aria-label={t.label}>
          <ul className="flex flex-wrap gap-6">
            <li>
              <a
                href={links.repo}
                target="_blank"
                rel="noopener"
                aria-label={t.githubLabel}
                className={footerLink}
              >
                {t.github}
              </a>
            </li>
            <li>
              <a
                href={links.releases}
                target="_blank"
                rel="noopener"
                aria-label={t.releasesLabel}
                className={footerLink}
              >
                {t.releases}
              </a>
            </li>
            <li>
              <a href={links.issues} target="_blank" rel="noopener" className={footerLink}>
                {t.issues}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

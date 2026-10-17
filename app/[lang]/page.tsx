import { notFound } from "next/navigation";
import { Download } from "@/components/Download";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { OSProvider } from "@/components/OSProvider";
import { WidgetsCarousel } from "@/components/WidgetsCarousel";
import { getDownloads } from "@/lib/downloads";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getLatestVersion } from "@/lib/release";
import { buildJsonLd } from "@/lib/seo";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const version = await getLatestVersion();

  return (
    <>
      <a
        href="#content"
        className="sr-only z-50 rounded-md bg-fg px-4 py-2 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.skip}
      </a>
      <Header t={t.nav} locale={lang} />
      <main id="content" className="overflow-x-clip">
        <OSProvider downloads={getDownloads(t.downloads, version)}>
          <Hero t={t.hero} demo={t.demo} />
          <Features t={t.features} />
          <WidgetsCarousel t={t.widgets} />
          <Download t={t.download} />
        </OSProvider>
      </main>
      <Footer t={t.footer} lang={t.lang} />
      <JsonLd data={buildJsonLd(t, lang, version)} />
    </>
  );
}

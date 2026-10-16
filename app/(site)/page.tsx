import { Download } from "@/components/Download";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OSProvider } from "@/components/OSProvider";
import { WidgetsCarousel } from "@/components/WidgetsCarousel";
import { ptBR as t } from "@/lib/i18n/pt-BR";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-md bg-fg px-4 py-2 text-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.skip}
      </a>
      <Header t={t.nav} />
      <main id="conteudo" className="overflow-x-clip">
        <OSProvider>
          <Hero t={t.hero} />
          <Features t={t.features} />
          <WidgetsCarousel t={t.widgets} />
          <Download t={t.download} />
        </OSProvider>
      </main>
      <Footer t={t.footer} />
    </>
  );
}

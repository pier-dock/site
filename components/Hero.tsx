import type { Dictionary } from "@/lib/i18n";
import { DockDemoLazy } from "./DockDemo/DockDemoLazy";
import { DockStage } from "./DockDemo/DockStage";
import { HeroCta } from "./HeroCta";
import { introOrder } from "./intro";
import { IntroScript } from "./IntroScript";

type HeroProps = { t: Dictionary["hero"]; demo: Dictionary["demo"] };

/*
 * A seção ocupa o resto da primeira tela (descontando os 72px do menu: 16 de margem + 56 da
 * barra), com a dock presa embaixo e o texto centralizado no espaço que sobra. Em telas baixas,
 * o respiro do topo e o título encolhem com a altura (svh); se ainda faltar espaço, quem
 * encolhe é o bloco de texto (min-h-0), nunca a área da dock.
 */
export function Hero({ t, demo }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex h-[calc(100svh-72px)] flex-col overflow-clip px-6 pt-[clamp(24px,calc(20svh-80px),88px)]"
    >
      {/*
        Meio sol preso à base da seção, que é a base da área da dock. Ocupa a largura toda (as
        elipses passam de 1100px) e é mais alto que a área, para não ser cortado reto em cima.
        Fica atrás do texto (z-[2]); os popovers da dock passam por cima dele.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[560px] intro-late overflow-hidden"
      >
        <div className="absolute bottom-[-660px] left-1/2 -ml-[750px] h-[1040px] w-[1500px] sun-halo" />
        <div className="absolute bottom-[-560px] left-1/2 -ml-[610px] h-[850px] w-[1220px] sun-core" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-page to-page/0" />
      </div>
      <div
        id="hero-intro"
        className="relative z-[2] mx-auto my-auto flex min-h-0 max-w-[880px] flex-col items-center gap-5 text-center"
      >
        <h1
          id="hero-title"
          {...introOrder(0)}
          className="m-0 intro-title text-[length:min(clamp(44px,6.6vw,80px),max(36px,9svh))] leading-[1.02] font-semibold tracking-[-0.045em] text-balance"
        >
          {/* Inline e com box-decoration-clone: quando quebra no celular, cada linha ganha o degradê inteiro. */}
          <span className="bg-linear-to-b from-white to-fg-muted box-decoration-clone bg-clip-text text-transparent">
            {t.titleTop}
          </span>
        </h1>
        <p
          {...introOrder(1)}
          className="m-0 max-w-[520px] intro-rise text-[clamp(17px,1.8vw,20px)] leading-normal text-fg-sub"
        >
          {t.subtitle}
        </p>
        <HeroCta t={t} />
      </div>
      <DockStage label={t.demoLabel}>
        <DockDemoLazy t={demo} />
      </DockStage>
      <IntroScript />
    </section>
  );
}

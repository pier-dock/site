/**
 * Roda antes da primeira pintura. Leva a página para a hero (a recarga não restaura a rolagem,
 * para a intro sempre ser vista), grava quanto a dock sobe para ficar no meio da tela
 * (--intro-dy) e quantos itens dela estão visíveis (--intro-n), que define quando o título aparece.
 * Também trava a rolagem até a última animação terminar (mesma conta de --intro-reveal em
 * globals.css: 700ms + n * 100ms + 400ms, mais 1700ms até o fim da dock e dos textos). Link com
 * âncora (#widgets) é respeitado: não volta ao topo nem trava.
 */
const script = `(function(){try{var d=document.querySelector("[data-intro-dock]");if(!d)return;var hash=!!location.hash;if(!hash){history.scrollRestoration="manual";scrollTo(0,0)}var b=d.getBoundingClientRect(),n=0,r=document.documentElement.style;d.querySelectorAll("[data-intro-item]").forEach(function(e){if(e.getClientRects().length)n++});r.setProperty("--intro-dy",innerHeight/2-b.top-b.height/2+"px");r.setProperty("--intro-n",n);if(!hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var h=document.documentElement;h.classList.add("intro-lock");setTimeout(function(){h.classList.remove("intro-lock")},700+n*100+400+1700)}}catch(e){}})()`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

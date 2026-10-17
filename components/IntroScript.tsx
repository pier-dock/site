/**
 * Roda antes da primeira pintura. Grava quanto a dock sobe para ficar no meio da tela
 * (--intro-dy, dividido pela escala do palco, porque o translate acontece dentro dele) e
 * quantos itens dela estão visíveis (--intro-n), que define quando o título aparece.
 */
const script = `(function(){try{var d=document.querySelector("[data-intro-dock]"),s=document.querySelector("[data-intro-stage]");if(!d||!s)return;var b=d.getBoundingClientRect(),k=s.getBoundingClientRect().width/s.offsetWidth||1,n=0,r=document.documentElement.style;d.querySelectorAll("[data-intro-item]").forEach(function(e){if(e.getClientRects().length)n++});r.setProperty("--intro-dy",(innerHeight/2-b.top-b.height/2)/k+"px");r.setProperty("--intro-n",n)}catch(e){}})()`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

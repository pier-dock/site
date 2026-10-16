/**
 * Roda antes da primeira pintura. Escolhe onde a dock aparece (logo abaixo do conteúdo
 * do hero, sem sair da tela), grava quanto ela sobe (--intro-dy, dividido pela escala do
 * palco, porque o translate acontece dentro dele) e, para cada fatia do hero, a distância
 * até a dock (--oy-N). Usa offsetTop porque as fatias já estão encolhidas pela intro e
 * getBoundingClientRect viria com a escala aplicada.
 */
const script = `(function(){try{var h=document.getElementById("hero-intro"),d=document.querySelector("[data-intro-dock]"),s=document.querySelector("[data-intro-stage]");if(!h||!d||!s)return;var t=h.getBoundingClientRect().top,b=d.getBoundingClientRect(),c=b.top+b.height/2,m=d.offsetHeight/2,k=s.getBoundingClientRect().width/s.offsetWidth||1,y=Math.min(t+h.offsetHeight+24+m,innerHeight-m-20),r=document.documentElement.style;r.setProperty("--intro-dy",(y-c)/k+"px");h.querySelectorAll("[data-genie]").forEach(function(e){var p=e.offsetParent||h;r.setProperty("--oy-"+e.getAttribute("data-genie"),y-p.getBoundingClientRect().top-e.offsetTop+"px")})}catch(e){}})()`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

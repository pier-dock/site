/**
 * Roda antes da primeira pintura. Mede o hero por offsetTop/offsetHeight porque a própria
 * intro já está aplicada e getBoundingClientRect viria encolhido. Escolhe onde a dock aparece (logo abaixo do conteúdo
 * do hero, sem sair da tela), grava quanto ela sobe (--intro-dy, dividido pela escala do
 * palco, porque o translate acontece dentro dele) e de onde o hero escorre (--genie-oy),
 * e dispara a deformação do filtro #genie.
 */
const script = `(function(){try{var h=document.getElementById("hero-intro"),d=document.querySelector("[data-intro-dock]"),s=document.querySelector("[data-intro-stage]");if(!h||!d||!s)return;var t=h.offsetParent.getBoundingClientRect().top+h.offsetTop,u=t+h.offsetHeight,b=d.getBoundingClientRect(),c=b.top+b.height/2,m=d.offsetHeight/2,k=s.getBoundingClientRect().width/s.offsetWidth||1,y=Math.min(u+24+m,innerHeight-m-20),r=document.documentElement.style;r.setProperty("--intro-dy",(y-c)/k+"px");r.setProperty("--genie-oy",y-t+"px");if(matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 768px) and (pointer: fine)").matches){var g=document.getElementById("genie-anim");g&&g.beginElement&&g.beginElement()}}catch(e){}})()`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

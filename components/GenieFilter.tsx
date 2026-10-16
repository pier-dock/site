/*
 * Mapa de deslocamento do efeito gênio: o vermelho vai de 0 a 255 na horizontal e é
 * diluído para o neutro (128) de cima para baixo, então o filtro puxa cada linha para o
 * centro com mais força perto da base, que é onde fica a dock. A região do filtro é só a
 * caixa do elemento: fora dela o mapa vale 0 e o filtro desenharia cópias deslocadas.
 */
const map = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 1 1' preserveAspectRatio='none'><defs><linearGradient id='h'><stop offset='0' stop-color='rgb(0,128,0)'/><stop offset='1' stop-color='rgb(255,128,0)'/></linearGradient><linearGradient id='v' x2='0' y2='1'><stop offset='0' stop-color='rgb(128,128,0)'/><stop offset='0.4' stop-color='rgb(128,128,0)' stop-opacity='0.92'/><stop offset='0.75' stop-color='rgb(128,128,0)' stop-opacity='0.5'/><stop offset='1' stop-color='rgb(128,128,0)' stop-opacity='0'/></linearGradient></defs><rect width='1' height='1' fill='url(#h)'/><rect width='1' height='1' fill='url(#v)'/></svg>`;

export function GenieFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter
        id="genie"
        x="0"
        y="0"
        width="1"
        height="1"
        primitiveUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={`data:image/svg+xml,${encodeURIComponent(map)}`}
          x="0"
          y="0"
          width="1"
          height="1"
          preserveAspectRatio="none"
          result="map"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale="0"
          xChannelSelector="R"
          yChannelSelector="G"
        >
          {/* Disparada pelo IntroScript junto com a animação CSS do hero. */}
          <animate
            id="genie-anim"
            attributeName="scale"
            values="3.6;3.6;0;0"
            keyTimes="0;0.16;0.92;1"
            dur="1.2s"
            begin="indefinite"
            fill="freeze"
          />
        </feDisplacementMap>
      </filter>
    </svg>
  );
}

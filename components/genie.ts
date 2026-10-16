import type { CSSProperties } from "react";

/**
 * Props de uma fatia da intro gênio. O índice ordena as fatias de cima para baixo; o
 * script da intro grava --oy-N no <html> com a distância de cada fatia até a dock.
 */
export function genieSlice(index: number) {
  return {
    "data-genie": index,
    style: { "--gi": index, "--oy": `var(--oy-${index})` } as CSSProperties,
  };
}

import type { CSSProperties } from "react";

/** Posição do elemento na cascata da intro: vira --i, que as classes `intro-*` usam no atraso. */
export function introOrder(index: number) {
  return { style: { "--i": index } as CSSProperties };
}

/** Item da dock que o "hover" da intro percorre. O script da intro conta quantos estão visíveis. */
export function introHover(index: number) {
  return { "data-intro-item": "", ...introOrder(index) };
}

"use client";

import { useRef } from "react";

type DragCarouselProps = {
  label: string;
  className: string;
  children: React.ReactNode;
};

// Quanto o arraste "projeta" para frente ao soltar, em ms de velocidade: um gesto rápido pula cards.
const flingMs = 220;

/**
 * Snap de cada card: a distância até o primeiro, que já começa alinhado ao gutter. Usa offsetLeft
 * porque ignora o translate das animações de entrada.
 */
function snapPoints(el: HTMLElement) {
  const cards = [...el.children] as HTMLElement[];
  const first = cards[0]?.offsetLeft ?? 0;
  const max = el.scrollWidth - el.clientWidth;
  return [...new Set(cards.map((c) => Math.min(c.offsetLeft - first, max)))];
}

function nearest(points: number[], x: number) {
  return points.reduce((best, p) => (Math.abs(p - x) < Math.abs(best - x) ? p : best), 0);
}

function scrollTo(el: HTMLElement, left: number) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
}

/**
 * Com mouse, a rolagem lateral nativa fica desligada (classes `mouse:` no CSS) e o carrossel anda
 * por arraste ou pelas setas, sempre encaixando num card. No toque segue a rolagem nativa com snap.
 */
export function DragCarousel({ label, className, children }: DragCarouselProps) {
  const drag = useRef<{ id: number; x: number; left: number; t: number; v: number } | null>(null);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch" || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      left: e.currentTarget.scrollLeft,
      t: e.timeStamp,
      v: 0,
    };
    e.currentTarget.dataset.dragging = "";
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const el = e.currentTarget;
    const prev = el.scrollLeft;
    el.scrollLeft = d.left - (e.clientX - d.x);
    const dt = e.timeStamp - d.t;
    if (dt > 0) d.v = (el.scrollLeft - prev) / dt;
    d.t = e.timeStamp;
  }

  function onPointerEnd(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    const el = e.currentTarget;
    delete el.dataset.dragging;
    // Parado antes de soltar não conta como arremesso.
    const v = e.timeStamp - d.t > 80 ? 0 : d.v;
    scrollTo(el, nearest(snapPoints(el), el.scrollLeft + v * flingMs));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const points = snapPoints(el);
    const at = el.scrollLeft;
    let target: number | undefined;
    if (e.key === "ArrowRight") target = points.find((p) => p > at + 1);
    else if (e.key === "ArrowLeft") target = points.findLast((p) => p < at - 1);
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = points.at(-1);
    else return;
    e.preventDefault();
    if (target !== undefined) scrollTo(el, target);
  }

  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
      // O arraste nativo das imagens dos cards roubaria o gesto.
      onDragStart={(e) => e.preventDefault()}
      className={className}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PullRequestIcon, PulseIcon, SparklesIcon, TimerIcon } from "./icons";

export type WidgetCategory = "productivity" | "system" | "github" | "ai";

/** Fileira do mobile: 0 largos, 1 compactos, 2 só ícone. */
export type MarqueeRow = 0 | 1 | 2;

export type ShowcaseItem = {
  key: string;
  category: WidgetCategory;
  row: MarqueeRow;
  node: React.ReactNode;
};

type ShowcaseProps = {
  title: string;
  subtitle: string;
  filters: Record<WidgetCategory | "label", string>;
  items: ShowcaseItem[];
};

const categories: { id: WidgetCategory; Icon: typeof TimerIcon }[] = [
  { id: "productivity", Icon: TimerIcon },
  { id: "system", Icon: PulseIcon },
  { id: "github", Icon: PullRequestIcon },
  { id: "ai", Icon: SparklesIcon },
];

const LEAVE_MS = 180;
const MOVE_MS = 520;

// Velocidade da deriva em px/s; negativo anda para a esquerda.
const rows: { id: MarqueeRow; speed: number }[] = [
  { id: 0, speed: -22 },
  { id: 1, speed: 28 },
  { id: 2, speed: -18 },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fileira infinita: o grupo de widgets aparece duas vezes (a cópia é só visual) e a posição dá a
 * volta a cada largura de grupo, então nunca chega ao fim. Anda sozinha e se arrasta com o dedo,
 * continuando com a inércia do arrasto.
 */
function MarqueeRow({ items, speed }: { items: ShowcaseItem[]; speed: number }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let x = 0;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let last = performance.now();
    let frame = 0;

    const wrap = (value: number) => {
      const width = (el.firstElementChild as HTMLElement).offsetWidth;
      if (!width) return value;
      return (((value % width) + width) % width) - width;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!dragging) {
        x += (reduced ? 0 : speed) * dt + velocity * dt;
        velocity *= Math.pow(0.04, dt);
        if (Math.abs(velocity) < 1) velocity = 0;
      }
      x = wrap(x);
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      x += dx;
      velocity = dx * 60;
    };
    const up = () => {
      dragging = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [speed]);

  return (
    <div data-enter className="overflow-hidden">
      <div
        ref={track}
        className="flex w-max cursor-grab touch-pan-y select-none **:[[role=img]]:shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]!"
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy > 0 || undefined} className="flex shrink-0 gap-3 pr-3">
            {items.map((item) => (
              <div key={item.key} className="shrink-0">
                {item.node}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * No mobile, sem filtro, os widgets viram fileiras infinitas, como a dock. A sombra do vidro é
 * achatada: o overflow da fileira a cortaria em faixas escuras entre as fileiras.
 */
function MarqueeRows({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="-mx-6 mt-10 flex flex-col gap-3 pb-12 sm:hidden">
      {rows.map((row) => (
        <MarqueeRow key={row.id} speed={row.speed} items={items.filter((i) => i.row === row.id)} />
      ))}
    </div>
  );
}

export function WidgetsShowcase({ title, subtitle, filters, items }: ShowcaseProps) {
  // `active` é o botão pressionado; `applied` é o filtro já aplicado à lista, que só muda depois
  // de os widgets que saem terminarem a saída.
  const [active, setActive] = useState<WidgetCategory | null>(null);
  const [applied, setApplied] = useState<WidgetCategory | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const elements = useRef(new Map<string, HTMLLIElement>());
  const before = useRef<Map<string, DOMRect> | null>(null);
  const leaving = useRef<Animation[]>([]);
  const busy = useRef(false);

  const isShown = (item: ShowcaseItem, filter: WidgetCategory | null) =>
    filter === null || item.category === filter;

  function select(category: WidgetCategory) {
    if (busy.current) return;
    const next = active === category ? null : category;
    setActive(next);

    if (prefersReducedMotion()) {
      setApplied(next);
      return;
    }

    busy.current = true;
    const positions = new Map<string, DOMRect>();
    leaving.current = [];
    for (const item of items) {
      const el = elements.current.get(item.key);
      if (!el || el.offsetParent === null || !isShown(item, applied)) continue;
      if (isShown(item, next)) {
        positions.set(item.key, el.getBoundingClientRect());
      } else {
        leaving.current.push(
          el.animate(
            [
              { opacity: 1, transform: "scale(1)" },
              { opacity: 0, transform: "scale(0.6)" },
            ],
            { duration: LEAVE_MS, easing: "ease-in", fill: "forwards" },
          ),
        );
      }
    }
    before.current = positions;
    setTimeout(() => setApplied(next), LEAVE_MS);
  }

  // Técnica FLIP: depois que a lista muda, os widgets que ficaram deslizam da posição antiga
  // para a nova e os que entram surgem crescendo.
  useLayoutEffect(() => {
    const positions = before.current;
    if (!positions) return;
    before.current = null;
    for (const animation of leaving.current) animation.cancel();
    leaving.current = [];

    let entering = 0;
    for (const item of items) {
      const el = elements.current.get(item.key);
      if (!el || !isShown(item, applied)) continue;
      const from = positions.get(item.key);
      if (from) {
        const to = el.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (dx || dy) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
            { duration: MOVE_MS, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
          );
        }
      } else {
        el.animate(
          [
            { opacity: 0, transform: "scale(0.6)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          {
            duration: MOVE_MS,
            delay: 120 + entering++ * 35,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
            fill: "backwards",
          },
        );
      }
    }
    setTimeout(() => (busy.current = false), MOVE_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applied]);

  // Entrada única ao chegar na seção: os widgets sobem em cascata. Um observador (e não uma
  // animação ligada à rolagem) evita que ela reinicie quando um filtro devolve itens do display:none.
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const targets = [...el.querySelectorAll<HTMLElement>("[data-enter]")].filter(
          (t) => t.offsetParent !== null,
        );
        targets.forEach((t, i) =>
          t.animate(
            [
              { opacity: 0, transform: "translateY(32px) scale(0.94)" },
              { opacity: 1, transform: "translateY(0) scale(1)" },
            ],
            {
              duration: 700,
              delay: Math.min(i * 45, 900),
              easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
              fill: "backwards",
            },
          ),
        );
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className="relative mx-auto max-w-[1200px] px-6">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
        <div className="flex max-w-[560px] reveal-blur flex-col gap-1.5">
          <h2
            id="widgets-title"
            className="m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-semibold tracking-[-0.02em]"
          >
            {title}
          </h2>
          <p className="m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-medium tracking-[-0.02em] text-fg-4">
            {subtitle}
          </p>
        </div>

        <div
          role="group"
          aria-label={filters.label}
          className="-mx-6 flex w-[calc(100%+3rem)] [scrollbar-width:none] gap-2 overflow-x-auto px-6 sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {categories.map(({ id, Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={active === id}
              onClick={() => select(id)}
              className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium text-fg-2 glass-dock transition-colors duration-150 hover:bg-white/10 hover:text-fg aria-pressed:border-white/30 aria-pressed:bg-white/15 aria-pressed:text-fg max-sm:shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]!"
            >
              <Icon size={16} />
              {filters[id]}
            </button>
          ))}
        </div>
      </div>

      {applied === null && <MarqueeRows items={items} />}

      <ul
        className={`m-0 mt-10 ${applied === null ? "hidden sm:flex" : "flex"} list-none flex-wrap content-center items-center justify-center gap-3 p-0 pb-12 sm:mt-16 sm:gap-6 sm:pb-24 lg:min-h-[480px]`}
      >
        {items.map((item) => (
          <li
            key={item.key}
            data-enter
            hidden={!isShown(item, applied)}
            ref={(el) => {
              if (el) elements.current.set(item.key, el);
              else elements.current.delete(item.key);
            }}
          >
            {item.node}
          </li>
        ))}
      </ul>
    </div>
  );
}

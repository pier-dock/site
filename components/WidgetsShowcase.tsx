"use client";

import { useLayoutEffect, useRef, useState } from "react";
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

const rows: { id: MarqueeRow; duration: number }[] = [
  { id: 0, duration: 40 },
  { id: 1, duration: 55 },
  { id: 2, duration: 30 },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * No mobile, sem filtro, os widgets viram fileiras que vão e voltam sozinhas, como a dock. Cada
 * widget aparece uma vez só. A sombra do vidro é achatada: o overflow da fileira a cortaria em
 * faixas escuras entre as fileiras.
 */
function MarqueeRows({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="-mx-6 mt-10 flex flex-col gap-3 pb-12 sm:hidden">
      {rows.map((row) => (
        <div key={row.id} className="[scrollbar-width:none] overflow-x-auto">
          <div
            className="marquee-track flex w-max gap-3 px-6 **:[[role=img]]:shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]!"
            data-reverse={row.id === 1 ? "" : undefined}
            style={{ "--marquee-duration": `${row.duration}s` } as React.CSSProperties}
          >
            {items
              .filter((item) => item.row === row.id)
              .map((item) => (
                <div key={item.key} className="shrink-0">
                  {item.node}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WidgetsShowcase({ title, subtitle, filters, items }: ShowcaseProps) {
  // `active` é o botão pressionado; `applied` é o filtro já aplicado à lista, que só muda depois
  // de os widgets que saem terminarem a saída.
  const [active, setActive] = useState<WidgetCategory | null>(null);
  const [applied, setApplied] = useState<WidgetCategory | null>(null);
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

  return (
    <div className="relative mx-auto max-w-[1200px] px-6">
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

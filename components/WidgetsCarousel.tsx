import type { Dictionary } from "@/lib/i18n";
import { getWidgets } from "@/lib/widgets";
import { WidgetCard } from "./WidgetCard";

const gutter = "px-[max(24px,calc((100%-1152px)/2))] scroll-px-[max(24px,calc((100%-1152px)/2))]";

export function WidgetsCarousel({ t }: { t: Dictionary["widgets"] }) {
  return (
    <section
      id="widgets"
      aria-labelledby="widgets-title"
      className="relative overflow-clip border-t border-line-8 pt-28 pb-10"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex max-w-[560px] reveal-blur flex-col gap-1.5">
          <h2
            id="widgets-title"
            className="m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-semibold tracking-[-0.02em]"
          >
            {t.title}
          </h2>
          <p className="m-0 text-[clamp(22px,2.4vw,28px)] leading-[1.2] font-medium tracking-[-0.02em] text-fg-4">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* tabIndex deixa o carrossel focável: as setas do teclado rolam e o snap encaixa no card. */}
      <div
        role="region"
        aria-label={t.carouselLabel}
        tabIndex={0}
        className={`mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden pt-10 pb-24 carousel-timeline ${gutter}`}
      >
        {getWidgets(t.items).map((w, i) => (
          <WidgetCard key={w.id} widget={w} moreLabel={t.more} index={i} />
        ))}
      </div>
    </section>
  );
}

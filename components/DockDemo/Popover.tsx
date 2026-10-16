"use client";

import { useEffect, useRef } from "react";

type PopoverProps = {
  id: string;
  labelledBy: string;
  width: string;
  className?: string;
  children: React.ReactNode;
};

const focusable = 'button, input, a[href], [tabindex]:not([tabindex="-1"])';

export function Popover({ id, labelledBy, width, className = "", children }: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    (el.querySelector<HTMLElement>(focusable) ?? el).focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      role="dialog"
      aria-labelledby={labelledBy}
      tabIndex={-1}
      data-popover
      className={`absolute bottom-28 left-1/2 z-[3] -translate-x-1/2 overflow-hidden rounded-lg glass-pop outline-none ${width} ${className}`}
    >
      {children}
    </div>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/lib/i18n";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

function snapshot() {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return `${time}|${now.getDay()}|${now.getDate()}|${now.getMonth()}`;
}

// A hora é do visitante: o HTML estático sai com "--:--" e o navegador preenche na hidratação.
const serverSnapshot = () => null;

export function Clock({ t }: { t: Dictionary["demo"] }) {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  let time = "--:--";
  let date = " ";
  if (value) {
    const [hhmm, weekday, day, month] = value.split("|");
    const wd = t.weekdays[Number(weekday)];
    const mo = t.months[Number(month)];
    time = hhmm ?? time;
    date = t.dateOrder === "month-day" ? `${wd}, ${mo} ${day}` : `${wd}, ${day} ${mo}`;
  }
  return (
    <span className="flex w-[74px] flex-col items-end gap-px pr-2.5 pl-2">
      <time className="text-[15px] font-semibold tabular-nums">{time}</time>
      <span className="text-[11px] whitespace-nowrap text-fg-dock">{date}</span>
    </span>
  );
}

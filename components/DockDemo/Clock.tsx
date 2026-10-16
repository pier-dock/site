"use client";

import { useSyncExternalStore } from "react";

const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

function snapshot() {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return `${time}|${weekdays[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
}

// A hora é do visitante: o HTML estático sai com "--:--" e o navegador preenche na hidratação.
const serverSnapshot = () => null;

export function Clock() {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [time, date] = value ? value.split("|") : ["--:--", " "];
  return (
    <span className="flex w-[74px] flex-col items-end gap-px pr-2.5 pl-2">
      <time className="text-[15px] font-semibold tabular-nums">{time}</time>
      <span className="text-[11px] whitespace-nowrap text-fg-dock">{date}</span>
    </span>
  );
}

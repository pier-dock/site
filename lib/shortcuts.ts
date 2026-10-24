import type { OS } from "./os";

type ShortcutKeys = {
  /** Os modificadores por extenso, para o texto corrido. */
  words: string;
  /** Os mesmos modificadores como aparecem na tecla. */
  keycaps: string;
};

// No Mac o atalho da dock é Control+Option+N; no Windows e no Linux, Ctrl+Alt+N.
export const shortcutKeys: Record<OS, ShortcutKeys> = {
  mac: { words: "Control Option", keycaps: "⌃ ⌥" },
  win: { words: "Ctrl Alt", keycaps: "Ctrl Alt" },
  linux: { words: "Ctrl Alt", keycaps: "Ctrl Alt" },
};

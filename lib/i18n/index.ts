import { en, type Dictionary } from "./en";
import { ptBR } from "./pt-BR";

export type { Dictionary };

export const locales = ["en", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dictionary> = { en, "pt-br": ptBR };

/** Caminho público de cada idioma. O inglês é servido na raiz (ver rewrites no next.config). */
export const localePath: Record<Locale, string> = { en: "/", "pt-br": "/pt-br" };

/** Rótulos do seletor: cada idioma se apresenta na própria língua. */
export const localeInfo: Record<Locale, { short: string; htmlLang: string; switchLabel: string }> =
  {
    en: { short: "EN", htmlLang: "en", switchLabel: "View in English" },
    "pt-br": { short: "PT", htmlLang: "pt-BR", switchLabel: "Ver em português" },
  };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Troca `{chave}` pelos valores: `fill("Volume {n}%", { n: 60 })`. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

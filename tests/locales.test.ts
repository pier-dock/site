import { describe, expect, it } from "vitest";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  localeInfo,
  localePath,
  locales,
} from "@/lib/i18n";
import { languages } from "@/lib/seo";

describe("registro de idiomas", () => {
  it("reconhece só os idiomas que existem", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt-br")).toBe(true);
    // As rotas são em minúsculas: "pt-BR" não é um segmento válido.
    expect(isLocale("pt-BR")).toBe(false);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });

  it("o idioma padrão está na lista e é servido na raiz", () => {
    expect(locales).toContain(defaultLocale);
    expect(localePath[defaultLocale]).toBe("/");
  });

  it("todo idioma tem caminho, rótulo do seletor e dicionário", () => {
    for (const locale of locales) {
      expect(localePath[locale], locale).toMatch(/^\//);
      expect(localeInfo[locale].short, locale).not.toBe("");
      expect(localeInfo[locale].switchLabel, locale).not.toBe("");
      expect(getDictionary(locale), locale).toBeDefined();
    }
  });

  it("caminhos, siglas e hreflang não se repetem entre idiomas", () => {
    const unique = (values: string[]) => new Set(values).size === values.length;
    expect(unique(locales.map((l) => localePath[l]))).toBe(true);
    expect(unique(locales.map((l) => localeInfo[l].short))).toBe(true);
    expect(unique(locales.map((l) => localeInfo[l].htmlLang))).toBe(true);
  });

  it("o hreflang do SEO cobre todos os idiomas, apontando para o caminho de cada um", () => {
    for (const locale of locales) {
      expect(languages[localeInfo[locale].htmlLang], locale).toBe(localePath[locale]);
    }
  });
});

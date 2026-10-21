import { describe, expect, it } from "vitest";
import { categories, rows } from "@/lib/gallery";
import { getDictionary } from "@/lib/i18n";

const keys = Object.keys(categories);

describe("galeria de widgets", () => {
  for (const lang of ["en", "pt-br"] as const) {
    const { widgets } = getDictionary(lang);

    it(`${lang}: todo tile tem descrição e nome para o tooltip`, () => {
      for (const key of keys) {
        expect(widgets.tiles, key).toHaveProperty(key);
        // O tile compacto usa o nome do widget: mediaSmall -> media.
        expect(widgets.names, key).toHaveProperty(key.replace(/Small$/, ""));
      }
    });

    it(`${lang}: não sobra descrição ou nome sem tile`, () => {
      expect(Object.keys(widgets.tiles).sort()).toEqual([...keys].sort());
      const names = new Set(keys.map((k) => k.replace(/Small$/, "")));
      expect(Object.keys(widgets.names).sort()).toEqual([...names].sort());
    });

    it(`${lang}: cada categoria do filtro tem rótulo`, () => {
      for (const category of new Set(Object.values(categories))) {
        expect(widgets.filters, category).toHaveProperty(category);
      }
    });
  }

  it("as quatro categorias têm pelo menos um tile", () => {
    expect(new Set(Object.values(categories))).toEqual(
      new Set(["productivity", "system", "github", "ai"]),
    );
  });

  it("só dá fileira a tiles que existem, e as três fileiras do mobile têm tiles", () => {
    for (const key of Object.keys(rows)) expect(categories, key).toHaveProperty(key);
    const used = new Set(keys.map((k) => rows[k] ?? 1));
    expect(used).toEqual(new Set([0, 1, 2]));
  });
});

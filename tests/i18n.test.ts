import { describe, expect, it } from "vitest";
import { fill, getDictionary } from "@/lib/i18n";

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]));
  }
  return typeof value;
}

describe("dicionários", () => {
  it("pt-BR tem as mesmas chaves e listas do mesmo tamanho que o inglês", () => {
    expect(shape(getDictionary("pt-br"))).toEqual(shape(getDictionary("en")));
  });

  it("não deixa texto vazio", () => {
    const strings = JSON.stringify(getDictionary("pt-br")).match(/""/g);
    expect(strings).toBeNull();
  });
});

describe("fill", () => {
  it("troca as chaves e preserva as que não recebeu", () => {
    expect(fill("Volume {n}%", { n: 60 })).toBe("Volume 60%");
    expect(fill("{a} de {b}", { a: "1:00" })).toBe("1:00 de {b}");
  });
});

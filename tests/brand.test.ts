import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { brand } from "@/lib/brand";

const css = readFileSync("app/globals.css", "utf8");

function token(name: string) {
  const match = css.match(new RegExp(`--color-${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`token --color-${name} não existe em globals.css`);
  return match[1]!.trim();
}

// "#FF6363" e "#ff6363" são a mesma cor; "rgba(255,255,255,0.07)" e "rgb(255 255 255 / 0.07)" também.
function normalize(color: string) {
  if (color.startsWith("#")) return color.toLowerCase();
  return (color.match(/[\d.]+/g) ?? []).map(Number).join(",");
}

describe("brand espelha os tokens do CSS", () => {
  const pairs: [string, string][] = [
    ["page", brand.page],
    ["graphite", brand.graphite],
    ["fg", brand.fg],
    ["fg-2", brand.fg2],
    ["coral", brand.coral],
    ["wall-rose", brand.wallRose],
    ["wall-blue", brand.wallBlue],
    ["wall-teal", brand.wallTeal],
    ...brand.gh.map((value, i): [string, string] => [`gh-${i}`, value]),
  ];

  for (const [name, value] of pairs) {
    it(`--color-${name}`, () => {
      expect(normalize(value)).toBe(normalize(token(name)));
    });
  }
});

import { describe, expect, it } from "vitest";
import { contributionLevels, contributionPaths } from "@/lib/contributions";

describe("contributionLevels", () => {
  it("gera o mesmo mapa a cada chamada, para servidor e cliente não divergirem", () => {
    expect(contributionLevels(98)).toEqual(contributionLevels(98));
  });

  it("devolve um nível de 0 a 4 por célula", () => {
    const levels = contributionLevels(98);
    expect(levels).toHaveLength(98);
    for (const level of levels) expect([0, 1, 2, 3, 4]).toContain(level);
  });

  it("usa todos os níveis, e o vazio é o mais comum", () => {
    const levels = contributionLevels(98);
    const counts = [0, 1, 2, 3, 4].map((l) => levels.filter((x) => x === l).length);
    expect(counts.every((c) => c > 0)).toBe(true);
    expect(Math.max(...counts)).toBe(counts[0]);
  });
});

describe("contributionPaths", () => {
  const geometry = { count: 98, cell: 4, gap: 1.5, radius: 1 };

  it("mede 14 semanas de 7 dias, com o espaço entre as células", () => {
    const { width, height } = contributionPaths(geometry);
    expect(width).toBe(14 * 4 + 13 * 1.5);
    expect(height).toBe(7 * 4 + 6 * 1.5);
  });

  it("agrupa as células em 5 paths, um por nível, sem perder nenhuma", () => {
    const { paths } = contributionPaths(geometry);
    expect(paths).toHaveLength(5);
    const cells = paths.reduce((sum, d) => sum + (d.match(/M/g)?.length ?? 0), 0);
    expect(cells).toBe(98);
  });

  it("conta a coluna que sobra quando o total não fecha uma semana", () => {
    const { width } = contributionPaths({ ...geometry, count: 15 });
    expect(width).toBe(3 * 4 + 2 * 1.5);
  });
});

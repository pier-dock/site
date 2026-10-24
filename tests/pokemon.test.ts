import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buddyPokemon } from "@/lib/pokemon";

describe("pokémon do card de buddies", () => {
  it("não repete ids", () => {
    const ids = buddyPokemon.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("tem um sprite em assets/pokemon para cada id", () => {
    for (const { id } of buddyPokemon) {
      const file = fileURLToPath(new URL(`../assets/pokemon/${id}.png`, import.meta.url));
      expect(existsSync(file), String(id)).toBe(true);
    }
  });
});

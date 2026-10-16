export type Level = 0 | 1 | 2 | 3 | 4;

/** Pseudoaleatório determinístico: server e client geram o mesmo mapa, sem erro de hidratação. */
export function contributionLevels(count: number): Level[] {
  return Array.from({ length: count }, (_, i) => {
    const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    return v < 0.35 ? 0 : v < 0.6 ? 1 : v < 0.8 ? 2 : v < 0.93 ? 3 : 4;
  });
}

function roundedRect(x: number, y: number, s: number, r: number) {
  const e = s - 2 * r;
  return `M${x + r} ${y}h${e}a${r} ${r} 0 0 1 ${r} ${r}v${e}a${r} ${r} 0 0 1 -${r} ${r}h-${e}a${r} ${r} 0 0 1 -${r} -${r}v-${e}a${r} ${r} 0 0 1 ${r} -${r}z`;
}

export type GridGeometry = { count: number; cell: number; gap: number; radius: number };

/**
 * Agrupa as células por nível num path só, preenchidas em coluna como no GitHub
 * (7 linhas por semana). São 5 nós no DOM em vez de centenas.
 */
export function contributionPaths({ count, cell, gap, radius }: GridGeometry) {
  const levels = contributionLevels(count);
  const paths: string[][] = [[], [], [], [], []];
  levels.forEach((level, i) => {
    const x = Math.floor(i / 7) * (cell + gap);
    const y = (i % 7) * (cell + gap);
    paths[level]!.push(roundedRect(x, y, cell, radius));
  });
  const cols = Math.ceil(count / 7);
  return {
    width: cols * cell + (cols - 1) * gap,
    height: 7 * cell + 6 * gap,
    paths: paths.map((p) => p.join("")),
  };
}

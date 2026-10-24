import type { CSSProperties } from "react";

// Mesmo desenho do `ClaudeMascotIcon` da dock (pixel-art em viewBox 400).
const clawdPath =
  "M 12,152 L 12,214 L 13,215 L 14,214 L 71,214 L 72,215 L 72,343 L 106,343 L 107,342 L 107,278 L 106,277 L 107,276 L 135,276 L 136,277 L 136,343 L 169,343 L 169,277 L 170,276 L 230,276 L 231,277 L 231,343 L 263,343 L 263,277 L 264,276 L 293,276 L 294,277 L 294,343 L 330,343 L 330,215 L 331,214 L 389,214 L 389,152 L 331,152 L 330,151 L 330,91 L 72,91 L 72,151 L 71,152 Z M 260,119 L 261,118 L 294,118 L 295,119 L 295,151 L 294,152 L 261,152 L 260,151 Z M 106,119 L 107,118 L 140,118 L 141,119 L 141,151 L 140,152 L 107,152 L 106,151 Z";

// Os pés do desenho terminam em y=343 de 400: sobram 57/400 do sprite abaixo deles.
const feetGap = 57 / 400;

type ClawdIconProps = { size: number; className?: string };

export function ClawdIcon({ size, className }: ClawdIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 400 400" className={className}>
      <path d={clawdPath} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

type WalkerProps = {
  /** Lado da caixa que anda; o sprite fica centralizado nela. */
  size: number;
  /** Quanto a caixa desce além da borda para os pés do sprite tocarem nela. */
  overlap: number;
  /**
   * Posição da trilha no pai: ela fica sobre a borda de cima, com a largura do passeio. Também
   * leva a duração de uma ida e volta (--clawd-duration), que muda por breakpoint para manter a
   * velocidade perto da da dock (~46px/s) com qualquer largura de trilha.
   */
  className?: string;
  children: React.ReactNode;
};

/**
 * Anda de ponta a ponta sobre a borda de cima do pai, como o `ClawdPet` da dock: vira de lado
 * nas pontas. Só CSS: a ida e volta usa a largura da trilha (unidades cqw), então funciona em
 * qualquer tamanho.
 */
export function Walker({ size, overlap, className = "", children }: WalkerProps) {
  const vars = { "--clawd-size": `${size}px` } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`clawd-track pointer-events-none absolute h-0 ${className}`}
      style={vars}
    >
      <div
        className="absolute left-0 flex clawd-walk items-center justify-center text-clawd"
        style={{ width: size, height: size, bottom: -overlap }}
      >
        {children}
      </div>
    </div>
  );
}

type ClawdWalkerProps = Pick<WalkerProps, "size" | "className"> & { sprite: number };

export function ClawdWalker({ size, sprite, className }: ClawdWalkerProps) {
  const overlap = (size - sprite) / 2 + sprite * feetGap;

  return (
    <Walker size={size} overlap={overlap} className={className}>
      <ClawdIcon size={sprite} className="clawd-wobble" />
    </Walker>
  );
}

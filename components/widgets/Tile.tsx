type TileProps = {
  label: string;
  /** Posição na galeria: escalona a entrada ao rolar. */
  index: number;
  children: React.ReactNode;
};

/** O widget como na dock: vidro, raio e tamanhos reais, só que ampliado. */
export function Tile({ label, index, children }: TileProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ "--reveal-step": index } as React.CSSProperties}
      className="flex [zoom:1.4] reveal items-center rounded-xl p-1.5 glass-dock sm:[zoom:1.6]"
    >
      {children}
    </div>
  );
}

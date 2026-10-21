type TileProps = {
  /** Nome curto mostrado no tooltip, como na dock. */
  name: string;
  label: string;
  children: React.ReactNode;
};

/**
 * O widget como na dock: vidro, raio e tamanhos reais, só que ampliado. No hover acende e
 * mostra o tooltip com o nome.
 */
export function Tile({ name, label, children }: TileProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className="group relative flex [zoom:1.4] cursor-pointer items-center rounded-xl p-1.5 glass-dock sm:[zoom:1.6]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-sm border border-line-12 bg-tooltip px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-fg opacity-0 shadow-tooltip transition-opacity duration-150 mouse:flex mouse:group-hover:opacity-100"
      >
        {name}
      </span>
      <div className="rounded-md transition-colors duration-150 mouse:group-hover:bg-white/7">
        {children}
      </div>
    </div>
  );
}

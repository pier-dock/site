type TileProps = {
  /** Nome curto mostrado no tooltip, como na dock. */
  name: string;
  label: string;
  children: React.ReactNode;
};

/**
 * O widget como na dock: vidro, raio e tamanhos reais, só que ampliado. No hover sobe de leve,
 * acende e mostra o tooltip com o nome; ao clicar afunda um pouco.
 */
export function Tile({ name, label, children }: TileProps) {
  return (
    <div className="group relative flex [zoom:1.1] cursor-pointer items-center rounded-xl p-1.5 glass-dock transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:[zoom:1.6] mouse:hover:-translate-y-1 mouse:hover:scale-[1.04] mouse:active:scale-[0.98] mouse:active:duration-100">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 translate-y-1.5 scale-95 rounded-sm border border-line-12 bg-tooltip px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-fg opacity-0 shadow-tooltip transition-[opacity,translate,scale] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] mouse:flex mouse:group-hover:translate-y-0 mouse:group-hover:scale-100 mouse:group-hover:opacity-100 mouse:group-hover:delay-75"
      >
        {name}
      </span>
      {/* Texto de verdade no lugar do aria-label: leitores de tela e buscadores leem a descrição. */}
      <p className="sr-only">{label}</p>
      <div
        aria-hidden="true"
        className="rounded-md transition-colors duration-300 ease-out mouse:group-hover:bg-white/7"
      >
        {children}
      </div>
    </div>
  );
}

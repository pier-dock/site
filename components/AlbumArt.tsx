const stripes = [
  "w-[70%] bg-rainbow-1",
  "w-[55%] bg-rainbow-2",
  "w-[80%] bg-rainbow-3",
  "w-[45%] bg-rainbow-4",
  "w-[62%] bg-rainbow-5",
];

type AlbumArtProps = {
  className: string;
  stripe: string;
  gap: string;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
};

/** Placeholder da capa do In Rainbows até termos a licença da imagem. */
export function AlbumArt({ className, stripe, gap, top, bottom }: AlbumArtProps) {
  return (
    <span aria-hidden="true" className={`flex shrink-0 flex-col bg-vinyl ${className}`}>
      {top}
      <span className={`flex flex-col ${gap}`}>
        {stripes.map((s) => (
          <span key={s} className={`${stripe} ${s}`} />
        ))}
      </span>
      {bottom}
    </span>
  );
}

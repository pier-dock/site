export function Wallpaper() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 drift">
      <div className="absolute top-[260px] left-1/2 -ml-[760px] size-[720px] intro-bloom rounded-full bg-wall-rose opacity-75 blur-[140px]" />
      <div className="absolute top-[320px] left-1/2 -ml-[80px] size-[760px] intro-bloom rounded-full bg-wall-blue opacity-75 blur-[150px]" />
      <div className="absolute top-[160px] left-1/2 -ml-[210px] size-[420px] intro-bloom rounded-full bg-wall-teal opacity-60 blur-[120px]" />
    </div>
  );
}

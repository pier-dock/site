import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";
import { contributionLevels } from "@/lib/contributions";
import { ptBR } from "@/lib/i18n/pt-BR";

export const alt = ptBR.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");

function Mark({ size: s }: { size: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 64 64">
      <rect x="6" y="38" width="52" height="14" rx="7" fill={brand.fg} opacity="0.35" />
      <rect x="12" y="24" width="11" height="11" rx="3.5" fill={brand.fg} />
      <rect x="26.5" y="15" width="11" height="20" rx="3.5" fill={brand.coral} />
      <rect x="41" y="24" width="11" height="11" rx="3.5" fill={brand.fg} />
      <circle cx="32" cy="45" r="2.2" fill={brand.coral} />
    </svg>
  );
}

const [bold, medium] = await Promise.all([
  readFile(join(fontDir, "Geist-Bold.ttf")),
  readFile(join(fontDir, "Geist-Medium.ttf")),
]);
const cells = contributionLevels(49);

const iconDir = join(process.cwd(), "assets/apps");
const appIcons = await Promise.all(
  ["vscode", "spotify", "terminal", "brave"].map(async (name) => {
    const data = await readFile(join(iconDir, `${name}.svg`));
    return `data:image/svg+xml;base64,${data.toString("base64")}`;
  }),
);

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        background: brand.page,
        color: brand.fg,
        fontFamily: "Geist",
        // O Satori não aplica filter: blur(); gradientes radiais fazem o papel do papel de parede.
        backgroundImage: `radial-gradient(circle at 18% 78%, ${brand.wallRose} 0%, transparent 46%), radial-gradient(circle at 82% 88%, ${brand.wallBlue} 0%, transparent 50%), radial-gradient(circle at 50% 40%, ${brand.wallTeal}99 0%, transparent 38%)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 64 }}>
        <Mark size={44} />
        <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em" }}>pier</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 40,
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: "-0.055em",
          lineHeight: 1,
        }}
      >
        <span>Sua dock, do seu jeito.</span>
        <span>Em qualquer sistema.</span>
      </div>
      <span style={{ marginTop: 26, fontSize: 26, fontWeight: 500, color: brand.fg2 }}>
        Gratuito para macOS, Windows e Linux
      </span>

      <div
        style={{
          position: "absolute",
          bottom: 52,
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 96,
          padding: "0 16px",
          borderRadius: 30,
          background: "rgba(28,28,34,0.55)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.22), 0 30px 60px rgba(0,0,0,0.5)",
        }}
      >
        {appIcons.map((src, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "0 2px",
            }}
          >
            <img src={src} width={62} height={62} style={{ borderRadius: 15 }} alt="" />
            <div
              style={{
                width: i === 3 ? 18 : 6,
                height: 5,
                borderRadius: 3,
                background: i === 3 ? brand.coral : "rgba(255,255,255,0.55)",
              }}
            />
          </div>
        ))}
        <div
          style={{ width: 1.5, height: 44, margin: "0 8px", background: "rgba(255,255,255,0.16)" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginRight: 12 }}>
          <span style={{ fontSize: 24, fontWeight: 700 }}>2.142</span>
          <span style={{ fontSize: 16, fontWeight: 500, color: brand.fg2 }}>neste ano</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            height: 62,
            width: 62,
            gap: 2,
          }}
        >
          {cells.map((level, i) => (
            <div
              key={i}
              style={{ width: 7, height: 7, borderRadius: 2, background: brand.gh[level] }}
            />
          ))}
        </div>
        <div
          style={{ width: 1.5, height: 44, margin: "0 8px", background: "rgba(255,255,255,0.16)" }}
        />
        <span style={{ fontSize: 26, fontWeight: 700, marginRight: 8 }}>16:00</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}

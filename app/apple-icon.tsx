import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brand.graphite,
      }}
    >
      <svg width="132" height="132" viewBox="0 0 64 64">
        <rect x="6" y="38" width="52" height="14" rx="7" fill={brand.fg} opacity="0.35" />
        <rect x="12" y="24" width="11" height="11" rx="3.5" fill={brand.fg} />
        <rect x="26.5" y="15" width="11" height="20" rx="3.5" fill={brand.coral} />
        <rect x="41" y="24" width="11" height="11" rx="3.5" fill={brand.fg} />
        <circle cx="32" cy="45" r="2.2" fill={brand.coral} />
      </svg>
    </div>,
    size,
  );
}

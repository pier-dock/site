import { Geist, Geist_Mono } from "next/font/google";
import { ptBR } from "@/lib/i18n/pt-BR";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export const ensureStatic = "navigation";

export const metadata = buildMetadata(ptBR);

export { viewport } from "@/lib/seo";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

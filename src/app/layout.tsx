import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valle Paraíso Bilingüe · Taller 1 — Panel de recursos",
  description:
    "Documentación oficial, equipo y bancos de recursos del Taller 1 del programa Valle Paraíso Bilingüe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/sections/back-to-top";
import { SITE } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Valle Paraíso Bilingüe · Laboratorio Digital para Docentes",
    template: "%s · Valle Paraíso Bilingüe",
  },
  description: SITE.descripcion,
  applicationName: "Valle Paraíso Bilingüe",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE.url,
    siteName: "Valle Paraíso Bilingüe",
    title: "Valle Paraíso Bilingüe · Laboratorio Digital para Docentes",
    description: SITE.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: "Valle Paraíso Bilingüe · Laboratorio Digital para Docentes",
    description: SITE.descripcion,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1D3060",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Valle Paraíso Bilingüe · Laboratorio Digital para Docentes",
  url: SITE.url,
  inLanguage: "es-CO",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/buscar?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <SiteHeader />
        <main id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Great_Vibes, Poppins } from "next/font/google";
import { PageHeader } from "@/components/shared/page-header";
import { GeneradorCertificado } from "@/components/certificado/generador";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });

export const metadata: Metadata = {
  title: "Generar certificado",
  description: "Descarga tu certificado de participación en el taller Recursos digitales para la enseñanza y el aprendizaje del inglés.",
  alternates: { canonical: "/certificado" },
};

export default function CertificadoPage() {
  return (
    <>
      <PageHeader eyebrow="Taller 1 · 18 de septiembre de 2026" title="Certificado de participación">
        Si participaste en el taller &ldquo;Recursos digitales para la enseñanza y el aprendizaje del inglés&rdquo;,
        escribe tu nombre completo y tu número de cédula para generar y descargar tu certificado.
      </PageHeader>
      {/* Precarga de las fuentes que usa el certificado */}
      <span aria-hidden className={`${greatVibes.className} pointer-events-none absolute opacity-0`}>.</span>
      <span aria-hidden className={`${poppins.className} pointer-events-none absolute font-semibold opacity-0`}>.</span>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <GeneradorCertificado fuenteNombre={greatVibes.style.fontFamily} fuenteTexto={poppins.style.fontFamily} />
      </div>
    </>
  );
}

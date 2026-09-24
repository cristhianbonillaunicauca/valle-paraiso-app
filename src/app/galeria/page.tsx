import type { Metadata } from "next";
import { FolderOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Galeria } from "@/components/galeria/galeria";
import { CARPETA_AUDIOVISUAL, GALERIA } from "@/content/galeria";

export const metadata: Metadata = {
  title: "El Taller en imágenes",
  description: "Memoria fotográfica y audiovisual del Taller 1 de Valle Paraíso Bilingüe: registro, plenaria, salas prácticas y cierre.",
  alternates: { canonical: "/galeria" },
};

export default function GaleriaPage() {
  return (
    <>
      <PageHeader eyebrow="Memoria audiovisual · Taller 1" title="El Taller en imágenes">
        Llegamos, nos encontramos, aprendimos, experimentamos con tecnología y cerramos juntos una jornada de formación.
        Una selección curada de la memoria audiovisual del 18 de septiembre de 2026.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <nav aria-label="Momentos del taller" className="scrollbar-none -mx-4 mb-10 flex gap-2 overflow-x-auto px-4">
          {GALERIA.map((m, i) => (
            <a key={m.id} href={`#${m.id}`} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line-strong bg-card px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
              <span className="font-mono text-xs text-teal-ink">{String(i + 1).padStart(2, "0")}</span> {m.titulo}
            </a>
          ))}
        </nav>
        <Galeria />
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card p-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-navy">Archivo audiovisual completo</p>
            <p className="text-sm text-muted">Todas las fotografías y videos del Taller 1 en Google Drive.</p>
          </div>
          <a href={CARPETA_AUDIOVISUAL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-semibold text-white hover:bg-navy-deep">
            <FolderOpen size={18} aria-hidden /> Abrir carpeta
          </a>
        </div>
      </div>
    </>
  );
}

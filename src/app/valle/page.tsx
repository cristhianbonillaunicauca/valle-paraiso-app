import type { Metadata } from "next";
import { MunicipiosGrid } from "@/components/valle/municipios-grid";
import { PageHeader } from "@/components/shared/page-header";
import { DATOS_MUNICIPIOS, MUNICIPIOS, TOTAL_INSTITUCIONES } from "@/content/municipios";

export const metadata: Metadata = {
  title: "Valle Paraíso en Acción",
  description: "Municipios e instituciones educativas del Valle del Cauca que participaron en el Taller 1 del programa Valle Paraíso Bilingüe.",
  alternates: { canonical: "/valle" },
};

export default function VallePage() {
  const participantes = Object.keys(DATOS_MUNICIPIOS).length;
  const cifras = [
    { valor: 374, etiqueta: "docentes asistentes" },
    { valor: participantes, etiqueta: `de ${MUNICIPIOS.length} municipios del Valle` },
    { valor: TOTAL_INSTITUCIONES, etiqueta: "instituciones educativas" },
  ];
  return (
    <>
      <PageHeader eyebrow="Territorio" title="Valle Paraíso en Acción">
        Docentes de {participantes} municipios del Valle del Cauca participaron en el Taller 1. Explora cada municipio
        para conocer sus instituciones educativas participantes.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <dl className="mb-10 grid gap-3 sm:grid-cols-3">
          {cifras.map((c) => (
            <div key={c.etiqueta} className="flex flex-col rounded-2xl border border-line bg-card p-5">
              <dt className="order-2 text-sm text-muted">{c.etiqueta}</dt>
              <dd className="font-display text-4xl font-semibold text-navy">{c.valor}</dd>
            </div>
          ))}
        </dl>
        <MunicipiosGrid />
        <p className="mt-8 text-xs text-muted">
          Fuente: base de inscritos del Taller 1. El conteo por municipio corresponde a docentes inscritos sin
          retiro registrado.
        </p>
      </div>
    </>
  );
}

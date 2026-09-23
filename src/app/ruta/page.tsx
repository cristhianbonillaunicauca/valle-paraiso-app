import type { Metadata } from "next";
import { Ruta } from "@/components/ruta/ruta";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Tu Ruta de Innovación Docente",
  description: "Siete pasos para integrar la IA y las TIC en tu clase de inglés, con insignias por cada logro.",
  alternates: { canonical: "/ruta" },
};

export default function RutaPage() {
  return (
    <>
      <PageHeader eyebrow="Ruta de innovación" title="Tu Ruta de Innovación Docente">
        Marca cada paso cuando lo completes. Algunos se marcan solos, por ejemplo al copiar tu primer prompt o al
        explorar las herramientas de IA.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <Ruta />
      </div>
    </>
  );
}

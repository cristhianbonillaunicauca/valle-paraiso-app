import type { Metadata } from "next";
import { MunicipiosGrid } from "@/components/valle/municipios-grid";
import { PageHeader } from "@/components/shared/page-header";
import { MUNICIPIOS } from "@/content/municipios";

export const metadata: Metadata = {
  title: "Valle Paraíso en Acción",
  description: "Participación del programa Valle Paraíso Bilingüe en los municipios del Valle del Cauca.",
  alternates: { canonical: "/valle" },
};

export default function VallePage() {
  return (
    <>
      <PageHeader eyebrow="Territorio" title="Valle Paraíso en Acción">
        Los {MUNICIPIOS.length} municipios del Valle del Cauca. Los datos de participación por municipio se
        publicarán a medida que la coordinación del programa los verifique.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <MunicipiosGrid />
      </div>
    </>
  );
}

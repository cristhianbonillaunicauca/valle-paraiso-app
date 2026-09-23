import type { Metadata } from "next";
import { Guardados } from "@/components/guardados/guardados";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Mis recursos guardados",
  description: "Herramientas, prompts, tutoriales y documentos que guardaste en el Laboratorio Digital.",
  robots: { index: false },
};

export default function GuardadosPage() {
  return (
    <>
      <PageHeader eyebrow="Mi espacio" title="Mis recursos guardados">
        Tu colección personal. Se guarda en este navegador, sin registro.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <Guardados />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/shared/page-header";
import { PromptGenerator } from "@/components/prompts/generator";
import { PromptBank } from "@/components/prompts/prompt-bank";
import { getSiteDataSafe } from "@/lib/queries";
import { getFileUrl } from "@/lib/storage";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Generador de Prompts Educativos",
  description:
    "Genera prompts completos para crear actividades de inglés con IA según nivel MCER, grado, habilidad, tema y duración. Incluye el banco de 100 prompts del Taller 1.",
  alternates: { canonical: "/prompts" },
};

type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function PromptsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const data = await getSiteDataSafe();
  const banco = data?.bancos.find((b) => b.titulo.toLowerCase().includes("prompt"));

  return (
    <>
      <PageHeader eyebrow="Crear con IA" title="Generador de Prompts Educativos">
        Elige nivel, grado, habilidad y tema: obtienes un prompt completo, listo para pegar en tu asistente de
        IA. O parte de uno de los 100 prompts del Taller 1 y adáptalo a tu grupo.
      </PageHeader>

      <section id="generador" aria-label="Generador" className="scroll-mt-20 py-10 md:py-14">
        <div className="mx-auto max-w-[1180px] px-4 md:px-5">
          <PromptGenerator
            key={one(sp.adaptar) ?? "nuevo"}
            initial={{ adaptar: one(sp.adaptar), habilidad: one(sp.habilidad), producto: one(sp.producto), actividad: one(sp.actividad), nivel: one(sp.nivel) }}
          />
        </div>
      </section>

      <section id="banco" aria-labelledby="banco-title" className="scroll-mt-20 border-t border-line bg-paper-deep py-12 md:py-16">
        <div className="mx-auto max-w-[1180px] px-4 md:px-5">
          <SectionHeading id="banco-title" eyebrow="Banco del Taller 1" title="100 prompts contextualizados al Valle del Cauca">
            Organizados por sala y subgrupo temático. Reemplaza lo que está entre corchetes con los datos de tu
            grupo y revisa siempre el resultado: el criterio pedagógico del docente tiene la última palabra.
          </SectionHeading>
          <PromptBank
            initial={{ sala: one(sp.sala), habilidad: one(sp.habilidad), q: one(sp.q), nivel: one(sp.nivel) }}
            downloadHref={banco ? getFileUrl(banco.archivo_path) : null}
            bancoId={banco?.id}
          />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Explorer, type ExplorerInitial } from "@/components/explorar/explorer";
import { PageHeader } from "@/components/shared/page-header";
import { HERRAMIENTAS } from "@/content/herramientas";
import { PROMPTS } from "@/content/prompts";

export const metadata: Metadata = {
  title: "Explorador de Recursos Docentes",
  description: `Filtra ${HERRAMIENTAS.length} herramientas digitales y ${PROMPTS.length} prompts de IA por nivel MCER, habilidad, producto, conectividad y precio.`,
  alternates: { canonical: "/explorar" },
};

export default async function ExplorarPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const initial: ExplorerInitial = Object.fromEntries(
    Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  );
  return (
    <>
      <PageHeader eyebrow="Explorar recursos" title="Explorador de Recursos Docentes">
        {HERRAMIENTAS.length} herramientas verificadas y {PROMPTS.length} prompts listos para usar. Combina
        filtros y encuentra lo que necesitas para tu próxima clase.
      </PageHeader>
      <Explorer initial={initial} />
    </>
  );
}

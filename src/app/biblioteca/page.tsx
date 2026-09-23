import type { Metadata } from "next";
import { getConteosDescargas, getSiteDataSafe } from "@/lib/queries";
import { buildLibrary } from "@/lib/library";
import { Library } from "@/components/biblioteca/library";
import { DownloadsChart } from "@/components/sections/downloads-chart";
import { PageHeader, SectionHeading } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Biblioteca Docente",
  description: "Guías, bancos de prompts, plantillas, recursos TIC, presentaciones y evidencias del Taller 1, con búsqueda, filtros y vista previa.",
  alternates: { canonical: "/biblioteca" },
};

export default async function BibliotecaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const [data, counts] = await Promise.all([getSiteDataSafe(), getConteosDescargas()]);
  const items = data ? buildLibrary(data) : [];
  const cat = Array.isArray(sp.cat) ? sp.cat[0] : sp.cat;

  const chartResources = data
    ? [
        ...data.documentos.map((d) => ({ tipo: "documento" as const, id: d.id, nombre: d.titulo })),
        ...data.bancos.map((b) => ({ tipo: "banco" as const, id: b.id, nombre: b.titulo })),
      ]
    : [];

  return (
    <>
      <PageHeader eyebrow="Descargar" title="Biblioteca Docente">
        Todos los materiales del Taller 1 en un solo lugar: guías, bancos de prompts, plantillas, recursos TIC,
        presentaciones y evidencias. Busca, filtra y revisa antes de descargar.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        {items.length === 0 ? (
          <EmptyState title="No pudimos cargar la biblioteca">Intenta de nuevo en unos minutos.</EmptyState>
        ) : (
          <Library items={items} counts={counts} initialCat={cat} />
        )}

        {chartResources.length > 0 && (
          <section aria-labelledby="descargas-title" className="mt-16">
            <SectionHeading id="descargas-title" eyebrow="Comunidad" title="Lo más descargado por los docentes" className="mb-6 max-w-2xl">
              Conteo real de descargas registradas en el sitio.
            </SectionHeading>
            <DownloadsChart resources={chartResources} initialCounts={counts} />
          </section>
        )}
      </div>
    </>
  );
}

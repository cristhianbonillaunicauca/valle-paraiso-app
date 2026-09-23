import type { Metadata } from "next";
import { getSiteDataSafe } from "@/lib/queries";
import { buildLibrary } from "@/lib/library";
import { SearchResults } from "@/components/buscar/results";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Buscar", robots: { index: false } };

export default async function BuscarPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q) ?? "";
  const data = await getSiteDataSafe();
  const library = data ? buildLibrary(data).map(({ key, titulo, categoria, tipo, href, disponible }) => ({ key, titulo, categoria, tipo, href, disponible })) : [];
  return (
    <>
      <PageHeader eyebrow="Búsqueda" title="Buscar en el Laboratorio" />
      <div className="mx-auto max-w-[900px] px-4 py-10 md:px-5">
        <SearchResults key={q} initialQ={q} library={library} />
      </div>
    </>
  );
}

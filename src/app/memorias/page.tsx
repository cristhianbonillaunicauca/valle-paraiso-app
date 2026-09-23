import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { getSiteDataSafe } from "@/lib/queries";
import { MemoriasSection } from "@/components/sections/memorias-section";
import { PageHeader, SectionHeading } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Memorias del programa",
  description: "Material de la jornada, bancos de recursos, productos y evidencias del Taller 1 del programa Valle Paraíso Bilingüe.",
  alternates: { canonical: "/memorias" },
};

export default async function MemoriasPage() {
  const data = await getSiteDataSafe();
  return (
    <>
      <PageHeader eyebrow="Memorias" title="Memorias del programa">
        El registro institucional del Taller 1: presentaciones, guías, bancos, evidencias e informes.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <SectionHeading eyebrow="A. Memorias del programa" title="Material y evidencias del Taller 1" className="mb-6 max-w-2xl" />
        {data && data.memorias.tabs.length > 0 ? (
          <MemoriasSection intro={data.memorias.intro} tabs={data.memorias.tabs} />
        ) : (
          <EmptyState title="Las memorias no están disponibles en este momento">Intenta de nuevo en unos minutos.</EmptyState>
        )}

        <section aria-labelledby="memorias-b" className="mt-14 rounded-3xl bg-navy-deep p-6 text-white md:p-10">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal">B. Experiencias docentes</p>
          <h2 id="memorias-b" className="mb-3 flex items-center gap-3 text-[clamp(22px,2.8vw,30px)] font-semibold text-white">
            <Users aria-hidden /> Lo que los docentes crean en el aula
          </h2>
          <p className="mb-6 max-w-2xl text-white/80">
            Podcasts, videos, presentaciones, actividades y proyectos creados por los docentes participantes,
            publicados con su autorización.
          </p>
          <Link href="/experiencias" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-navy hover:bg-paper">
            Ver experiencias docentes <ArrowRight size={17} aria-hidden />
          </Link>
        </section>
      </div>
    </>
  );
}

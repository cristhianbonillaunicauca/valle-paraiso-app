import type { Metadata } from "next";
import Link from "next/link";
import { Lightbulb, Send } from "lucide-react";
import { EXPERIENCIAS, FORMULARIO_EXPERIENCIAS_URL } from "@/content/experiencias";
import { HERRAMIENTAS } from "@/content/herramientas";
import { salaById } from "@/content/salas";
import { inkHex } from "@/lib/colors";
import { ExperienciasGallery } from "@/components/experiencias/gallery";
import { PageHeader, SectionHeading } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata: Metadata = {
  title: "Experiencias de nuestros docentes",
  description: "Recursos, podcasts, videos y proyectos creados por docentes del programa Valle Paraíso Bilingüe.",
  alternates: { canonical: "/experiencias" },
};

export default async function ExperienciasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const salaId = Array.isArray(sp.sala) ? sp.sala[0] : sp.sala;
  const sala = salaById(salaId);
  const ejemplos = HERRAMIENTAS.filter((h) => (sala ? h.sala === sala.id : h.sala !== null)).slice(0, sala ? 12 : 9);

  return (
    <>
      <PageHeader eyebrow="Compartir" title="Experiencias de nuestros docentes">
        Un espacio para inspirarse con lo que otros docentes del Valle del Cauca crean y llevan al aula.
      </PageHeader>
      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        {EXPERIENCIAS.length > 0 ? (
          <ExperienciasGallery experiencias={EXPERIENCIAS} />
        ) : (
          <EmptyState title="Las primeras experiencias se publicarán pronto" icon={<Lightbulb size={22} />}>
            Estamos recopilando los productos creados por los docentes participantes. Solo publicamos trabajos
            reales, con la autorización de sus autores.
          </EmptyState>
        )}

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-card p-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-navy">¿Creaste un recurso con lo aprendido?</p>
            <p className="text-sm text-muted">Compártelo para que inspire a otros docentes del programa.</p>
          </div>
          {FORMULARIO_EXPERIENCIAS_URL ? (
            <a href={FORMULARIO_EXPERIENCIAS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-teal-ink px-6 font-semibold text-white" style={{ color: "#fff" }}>
              <Send size={16} aria-hidden /> Compartir mi experiencia
            </a>
          ) : (
            <span className="rounded-full border border-dashed border-line-strong px-4 py-2 font-mono text-xs text-muted">
              [Formulario de postulación pendiente]
            </span>
          )}
        </div>

        <section aria-labelledby="ejemplos-title" className="mt-14">
          <SectionHeading id="ejemplos-title" eyebrow="Mientras tanto" title={sala ? `Ideas de aplicación en clase: ${sala.titulo}` : "Ideas de aplicación en clase"} className="mb-6 max-w-2xl">
            Ejemplos de uso tomados del Banco de herramientas digitales del Taller 1.
          </SectionHeading>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ejemplos.map((h) => {
              const s = salaById(h.sala);
              return (
                <li key={h.id} className="rounded-2xl border border-line bg-card p-5">
                  <p className="mb-1 font-mono text-[11px] font-semibold" style={{ color: inkHex(s?.color) }}>{h.categoria}</p>
                  <p className="mb-2 font-semibold text-navy">{h.nombre}</p>
                  <p className="text-sm leading-relaxed text-ink">{h.aplicacion}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Link href={sala ? `/explorar?sala=${sala.id}` : "/explorar"} className="font-semibold text-teal-ink hover:underline">
              Ver todas las herramientas{sala ? ` de ${sala.titulo}` : ""} →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

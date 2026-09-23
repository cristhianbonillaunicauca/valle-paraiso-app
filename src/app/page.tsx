import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteDataSafe, getTotalDescargas } from "@/lib/queries";
import { resolveLink } from "@/lib/links";
import { resolveIndicadores } from "@/lib/impacto";
import { getFileUrl } from "@/lib/storage";
import { HeroLab } from "@/components/home/hero-lab";
import { CrearHoy } from "@/components/home/crear-hoy";
import { AccesosRapidos } from "@/components/home/accesos-rapidos";
import { Destacados } from "@/components/home/destacados";
import { Timeline, type TimelineRecurso } from "@/components/home/timeline";
import { Impacto } from "@/components/home/impacto";
import { RutaTeaser } from "@/components/home/ruta-teaser";
import { PhotoCarousel } from "@/components/sections/photo-carousel";
import { EquipoSection } from "@/components/sections/equipo-section";
import { SectionHeading } from "@/components/shared/page-header";

// ISR: el contenido de Supabase se refresca cada 60 s sin renderizar en cada visita.
export const revalidate = 60;

export default async function Home() {
  const [data, totalDescargas] = await Promise.all([getSiteDataSafe(), getTotalDescargas()]);
  const indicadores = resolveIndicadores(totalDescargas);

  const memoriaItems = data?.memorias.tabs.flatMap((t) => t.groups.flatMap((g) => g.items)) ?? [];
  const recursosDe = (pred: (nombre: string) => boolean): TimelineRecurso[] =>
    memoriaItems
      .filter((it) => it.link && pred(it.nombre.toLowerCase()))
      .map((it) => ({ titulo: it.nombre, href: resolveLink(it.link)! }));

  const plenariaRecursos = recursosDe((n) => n.includes("plenaria"));
  const guia = data?.documentos[0];
  const plantillas = data?.bancos.find((b) => b.titulo.toLowerCase().includes("plantilla"));
  const salaRecursos: TimelineRecurso[] = [
    ...(guia ? [{ titulo: guia.titulo, href: getFileUrl(guia.archivo_path) }] : []),
    ...(plantillas ? [{ titulo: plantillas.titulo, href: getFileUrl(plantillas.archivo_path) }] : []),
    ...recursosDe((n) => n.includes("salas")),
  ];

  return (
    <>
      <HeroLab />
      <CrearHoy />
      <AccesosRapidos />
      <Destacados />

      <section id="agenda" aria-labelledby="agenda-title" className="scroll-mt-20 border-t border-line bg-paper-deep py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading id="agenda-title" eyebrow="Taller 1 de 5" title="Así fue la jornada del Taller 1" className="mb-6">
              Toca cada momento del día para ver su objetivo, quién lo orienta y los materiales asociados.
            </SectionHeading>
            {data && data.programa.parrafos.length > 0 && (
              <div className="space-y-4 text-[15px] leading-relaxed text-ink/90">
                {data.programa.parrafos.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            )}
            <div className="mt-8">
              <PhotoCarousel />
            </div>
          </div>
          <div>
            <Timeline
              cronograma={data?.cronograma ?? []}
              equipo={data?.equipo ?? []}
              plenariaRecursos={plenariaRecursos}
              salaRecursos={salaRecursos}
            />
          </div>
        </div>
      </section>

      <section id="impacto" aria-labelledby="impacto-title" className="scroll-mt-20 bg-navy-deep py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal">Impacto del programa</p>
          <h2 id="impacto-title" className="mb-3 text-[clamp(24px,3vw,34px)] font-semibold text-white">Un ecosistema en crecimiento</h2>
          <p className="mb-10 max-w-2xl text-white/75">
            Cifras verificadas del programa. Los indicadores marcados como pendientes se publicarán cuando la
            coordinación los confirme.
          </p>
          <Impacto indicadores={indicadores} />
        </div>
      </section>

      <section aria-label="Ruta de innovación docente" className="py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <RutaTeaser />
        </div>
      </section>

      {data && <EquipoSection equipo={data.equipo} />}

      <section aria-labelledby="cta-final" className="pb-20">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-teal-ink p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2 id="cta-final" className="mb-2 text-[clamp(22px,2.8vw,30px)] font-semibold text-white">¿Listo para crear tu próximo recurso?</h2>
              <p className="text-white/85">Encuentra una herramienta, obtén un prompt y llévalo a tu aula hoy.</p>
            </div>
            <Link href="/explorar" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-semibold text-navy hover:bg-paper">
              Explorar recursos <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

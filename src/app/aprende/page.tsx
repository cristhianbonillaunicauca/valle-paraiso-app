import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Gauge, Wrench } from "lucide-react";
import { TUTORIALES } from "@/content/tutoriales";
import { herramientaById } from "@/content/herramientas";
import { promptById } from "@/content/prompts";
import { salaById } from "@/content/salas";
import { inkHex } from "@/lib/colors";
import { PageHeader } from "@/components/shared/page-header";
import { SaveButton } from "@/components/shared/save-button";

export const metadata: Metadata = {
  title: "Aprende en pocos minutos",
  description: "Microtutoriales paso a paso para crear infografías, podcasts, quizzes, presentaciones interactivas, rúbricas y mejores prompts con IA.",
  alternates: { canonical: "/aprende" },
};

export default function AprendePage() {
  return (
    <>
      <PageHeader eyebrow="Microaprendizaje" title="Aprende en pocos minutos">
        Guías cortas y prácticas: léelas en menos de cinco minutos y pasa de inmediato a crear tu recurso.
      </PageHeader>

      <div className="mx-auto max-w-[1180px] px-4 py-10 md:px-5 md:py-14">
        <nav aria-label="Tutoriales" className="mb-10">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TUTORIALES.map((t) => {
              const sala = salaById(t.sala);
              return (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-4">
                    <span className="mb-2 h-1 w-10 rounded-full" style={{ background: inkHex(sala?.color ?? "navy") }} aria-hidden />
                    <span className="mb-2 font-semibold leading-snug text-navy">{t.titulo}</span>
                    <span className="mt-auto flex items-center gap-3 font-mono text-[11px] text-muted">
                      <span className="inline-flex items-center gap-1"><Clock size={12} aria-hidden /> {t.minutos} min</span>
                      <span>{t.dificultad}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-6">
          {TUTORIALES.map((t) => {
            const sala = salaById(t.sala);
            const ink = inkHex(sala?.color ?? "navy");
            const tools = t.herramientas.map(herramientaById).filter((h): h is NonNullable<typeof h> => !!h);
            const prompt = promptById(t.promptId);
            const gen = new URLSearchParams(t.generador).toString();
            return (
              <article key={t.id} id={t.id} className="reveal scroll-mt-24 rounded-3xl border border-line bg-card p-6 md:p-8" aria-labelledby={`${t.id}-title`}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 font-mono text-[12px] text-muted">
                    <span className="inline-flex items-center gap-1 rounded-full bg-paper-deep px-3 py-1"><Clock size={13} aria-hidden /> Lectura de {t.minutos} min</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-paper-deep px-3 py-1"><Gauge size={13} aria-hidden /> {t.dificultad}</span>
                    {sala && <span className="rounded-full px-3 py-1 font-semibold" style={{ background: `${ink}14`, color: ink }}>{sala.titulo}</span>}
                  </div>
                  <SaveButton item={{ kind: "tutorial", id: t.id, titulo: t.titulo, href: `/aprende#${t.id}` }} />
                </div>
                <h2 id={`${t.id}-title`} className="mb-2 text-[clamp(22px,2.6vw,28px)] font-semibold text-navy">{t.titulo}</h2>
                <p className="mb-6 text-muted">{t.resumen}</p>

                <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                  <ol className="space-y-3">
                    {t.pasos.map((p, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-xs font-bold text-white" style={{ background: ink }} aria-hidden>{i + 1}</span>
                        <span className="pt-0.5 text-[15px] leading-relaxed text-ink">{p}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="space-y-4">
                    <div className="rounded-2xl bg-paper-deep p-4 text-sm leading-relaxed">
                      <p className="mb-1 font-semibold text-navy">Consejo</p>
                      <p className="text-ink">{t.consejo}</p>
                    </div>
                    {tools.length > 0 && (
                      <div>
                        <p className="mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-navy"><Wrench size={14} aria-hidden /> Herramientas</p>
                        <ul className="flex flex-wrap gap-2">
                          {tools.map((h) => (
                            <li key={h.id}>
                              <a href={h.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center rounded-full border border-line-strong px-3 text-[13px] font-semibold text-navy hover:bg-paper-deep">
                                {h.nombre}<span className="sr-only"> (abre en una pestaña nueva)</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-teal/30 bg-teal/[0.06] p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold text-navy">Ahora inténtalo tú</p>
                    {prompt && <p className="text-sm text-muted">Parte del prompt {prompt.numero} del banco, «{prompt.titulo}», o genera uno a tu medida.</p>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/prompts?adaptar=${t.promptId}#generador`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-teal-ink px-5 text-sm font-semibold text-white" style={{ color: "#fff" }}>
                      Adaptar el prompt <ArrowRight size={15} aria-hidden />
                    </Link>
                    <Link href={`/prompts${gen ? `?${gen}` : ""}#generador`} className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-card px-5 text-sm font-semibold text-navy hover:bg-paper-deep">
                      Generar uno nuevo
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Próximamente: videos cortos para cada tutorial. La estructura del sitio ya está lista para enlazarlos.
        </p>
      </div>
    </>
  );
}

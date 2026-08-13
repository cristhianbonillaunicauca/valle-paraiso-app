import type { CronogramaRow, PilarRow, ProgramaRow } from "@/lib/database.types";
import { Reveal } from "@/components/reveal";
import { CronogramaChart } from "@/components/sections/cronograma-chart";

export function ProgramaSection({
  programa,
  pilares,
  cronograma,
}: {
  programa: ProgramaRow;
  pilares: PilarRow[];
  cronograma: CronogramaRow[];
}) {
  return (
    <section id="programa" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal">
              Sobre el programa
            </div>
            <h2 className="mb-5 text-[clamp(24px,3vw,32px)] font-semibold text-navy">
              Innovación educativa con enfoque territorial
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-ink/90">
              {programa.parrafos.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {pilares.map((p) => (
                <div key={p.id} className="rounded-2xl border border-line bg-card p-5">
                  <b className="block font-display text-2xl text-navy">{p.titulo}</b>
                  <span className="text-sm text-muted">{p.descripcion}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {cronograma.length > 0 && (
          <Reveal delay={0.15} className="mt-14">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl text-navy">Cronograma visual del taller</h3>
              <span className="font-mono text-xs text-muted">duración estimada por bloque</span>
            </div>
            <CronogramaChart cronograma={cronograma} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

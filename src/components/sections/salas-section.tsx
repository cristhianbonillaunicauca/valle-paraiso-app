import { ArrowRight } from "lucide-react";
import type { SalaRow } from "@/lib/database.types";
import { colorHex } from "@/lib/colors";
import { Reveal } from "@/components/reveal";

export function SalasSection({ salas }: { salas: SalaRow[] }) {
  return (
    <section id="salas" className="bg-paper-deep py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <Reveal className="mb-12 max-w-2xl">
          <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-navy">
            Modelo de rotación
          </div>
          <h2 className="mb-3 text-[clamp(24px,3vw,32px)] font-semibold text-navy">
            Las 4 salas prácticas
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Los 360 docentes rotan por las cuatro salas a lo largo del día. Cada una produce un
            recurso educativo bilingüe distinto, con el mismo acompañamiento de 60 minutos.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-stretch gap-3">
            {salas.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                {i > 0 && <ArrowRight className="hidden shrink-0 text-line-strong md:block" size={22} />}
                <div className="w-full min-w-[220px] flex-1 rounded-2xl border border-line bg-card p-6 md:w-56">
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-bold text-white"
                    style={{ background: colorHex(s.color) }}
                  >
                    0{s.numero}
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold" style={{ color: colorHex(s.color) }}>
                    {s.nombre}
                  </h3>
                  <p className="mb-4 text-sm text-muted">{s.resumen}</p>
                  <div className="flex gap-3 font-mono text-[11px] text-muted">
                    <span>60 min</span>
                    <span>~90 docentes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Clapperboard, Gamepad2, ImageIcon, Mic } from "lucide-react";
import { SALAS } from "@/content/salas";
import { HERRAMIENTAS } from "@/content/herramientas";
import { PROMPTS } from "@/content/prompts";
import { COLORS, inkHex } from "@/lib/colors";
import { SectionHeading } from "@/components/shared/page-header";

const ICONS = { "texto-imagen": ImageIcon, audio: Mic, presentaciones: Gamepad2, video: Clapperboard } as const;

export function CrearHoy() {
  return (
    <section id="crear" aria-labelledby="crear-title" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading id="crear-title" eyebrow="Los cuatro laboratorios" title="¿Qué quieres crear hoy?">
          Elige un tipo de recurso. Encontrarás herramientas verificadas, prompts listos para usar y
          ejemplos de aplicación en clase.
        </SectionHeading>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SALAS.map((s) => {
            const Icon = ICONS[s.id];
            const accent = COLORS[s.color];
            const ink = inkHex(s.color);
            const nTools = HERRAMIENTAS.filter((h) => h.sala === s.id).length;
            const nPrompts = PROMPTS.filter((p) => p.sala === s.id).length;
            return (
              <li key={s.id} className="reveal">
                <article className="lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-6">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl text-white transition-transform group-hover:scale-105" style={{ background: ink }} aria-hidden>
                      <Icon size={24} />
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-muted">Sala {s.numero}</span>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-semibold" style={{ color: ink }}>{s.titulo}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{s.descripcion}</p>
                  <p className="mb-5 font-mono text-[11px] text-muted">
                    {nTools} herramientas · {nPrompts} prompts
                  </p>
                  <div className="mt-auto grid gap-2">
                    <Link href={`/explorar?sala=${s.id}`} className="inline-flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-semibold text-white transition-[filter] hover:brightness-110" style={{ background: ink, color: "#fff" }}>
                      Explorar recursos <ArrowRight size={16} aria-hidden />
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/experiencias?sala=${s.id}`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line-strong text-[13px] font-semibold text-navy hover:bg-paper-deep">
                        Ver ejemplos
                      </Link>
                      <Link href={`/prompts?sala=${s.id}#banco`} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line-strong text-[13px] font-semibold text-navy hover:bg-paper-deep">
                        Obtener prompts
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

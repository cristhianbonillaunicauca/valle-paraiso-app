import Link from "next/link";
import { ExternalLink, Star, Wand2 } from "lucide-react";
import { PROMPTS } from "@/content/prompts";
import { HERRAMIENTAS } from "@/content/herramientas";
import { tutorialParaSala } from "@/content/tutoriales";
import { CopyButton } from "@/components/shared/copy-button";
import { SaveButton } from "@/components/shared/save-button";
import { SectionHeading } from "@/components/shared/page-header";

/** Rota el destacado cada día (determinístico, sin aleatoriedad en el render). */
function dayIndex(len: number, salt = 0) {
  const d = new Date();
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  const day = Math.floor((Date.now() - start) / 86_400_000);
  return (day * 7 + salt) % len;
}

export function Destacados() {
  const conContexto = PROMPTS.filter((p) => p.texto.includes("Valle del Cauca") && p.nivel);
  const prompt = conContexto[dayIndex(conContexto.length)];
  const candidatas = HERRAMIENTAS.filter((h) => h.precio !== "Pago" && h.dificultad === "Básica");
  const tool = candidatas[dayIndex(candidatas.length, 3)];
  const tuto = tutorialParaSala(tool.sala);

  return (
    <section aria-labelledby="destacados-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeading id="destacados-title" eyebrow="Se renueva cada día" title="Para empezar hoy" />
        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <article className="reveal flex flex-col rounded-2xl border border-line bg-card p-6 md:p-8" aria-labelledby="prompt-destacado">
            <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-teal-ink">
              <Wand2 size={15} aria-hidden /> Prompt destacado
            </p>
            <h3 id="prompt-destacado" className="mb-1 font-display text-xl font-semibold text-navy">
              {prompt.titulo}
            </h3>
            <p className="mb-4 text-sm text-muted">
              {prompt.bloque} · Nivel {prompt.nivel}
              {prompt.tema ? ` · ${prompt.tema}` : ""}
            </p>
            <blockquote className="mb-6 flex-1 rounded-xl border-l-4 border-teal bg-paper-deep p-4 text-[15px] leading-relaxed text-ink">
              {prompt.texto}
            </blockquote>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={prompt.texto} />
              <Link href={`/prompts?adaptar=${prompt.id}#generador`} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
                Adaptar a mi grupo
              </Link>
              <Link href={`/prompts?sala=${prompt.sala}#banco`} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-teal-ink hover:underline">
                Ver más prompts
              </Link>
            </div>
          </article>

          <article className="reveal flex flex-col rounded-2xl border border-line bg-card p-6 md:p-8" aria-labelledby="tool-destacada">
            <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-orange-ink">
              <Star size={15} aria-hidden /> Herramienta destacada
            </p>
            <h3 id="tool-destacada" className="mb-1 font-display text-xl font-semibold text-navy">{tool.nombre}</h3>
            <p className="mb-4 text-sm text-muted">{tool.categoria}</p>
            <p className="mb-4 text-[15px] leading-relaxed text-ink">{tool.descripcion}</p>
            <dl className="mb-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted">Ideal para</dt>
              <dd className="font-semibold text-ink">{tool.habilidades.slice(0, 2).join(" / ")}</dd>
              <dt className="text-muted">Dificultad</dt>
              <dd className="font-semibold text-ink">{tool.dificultad}</dd>
              <dt className="text-muted">Precio</dt>
              <dd className="font-semibold text-ink">{tool.precio}</dd>
              <dt className="text-muted">Conectividad</dt>
              <dd className="font-semibold text-ink">{tool.conectividad}</dd>
            </dl>
            <p className="mb-6 rounded-xl bg-paper-deep p-4 text-sm leading-relaxed text-ink">
              <strong className="text-navy">Ejemplo educativo: </strong>
              {tool.aplicacion}
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white hover:bg-navy-deep" style={{ color: "#fff" }}>
                Ver herramienta <ExternalLink size={15} aria-hidden />
                <span className="sr-only">(abre en una pestaña nueva)</span>
              </a>
              {tuto && (
                <Link href={`/aprende#${tuto.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
                  Tutorial
                </Link>
              )}
              <SaveButton compact item={{ kind: "herramienta", id: tool.id, titulo: tool.nombre, href: `/explorar?q=${encodeURIComponent(tool.nombre)}` }} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

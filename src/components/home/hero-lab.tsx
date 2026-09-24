import Link from "next/link";
import { ArrowRight, Award, Sparkles } from "lucide-react";

/** Trazos abstractos de cordillera y río: identidad territorial discreta. */
function Territorio() {
  return (
    <svg aria-hidden viewBox="0 0 1200 320" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-navy/[0.07] md:h-56">
      <path d="M0 250 L140 150 L230 205 L360 95 L470 180 L590 110 L700 190 L820 120 L940 200 L1060 140 L1200 210 L1200 320 L0 320Z" fill="currentColor" />
      <path d="M0 290 C 200 250, 330 310, 520 272 S 860 230, 1200 282" fill="none" stroke="var(--teal)" strokeOpacity=".35" strokeWidth="3" />
    </svg>
  );
}

export function HeroLab() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-[radial-gradient(900px_400px_at_85%_-10%,rgba(0,149,138,.10),transparent_70%)]">
      <Territorio />
      <div className="relative mx-auto max-w-[1180px] px-5 pb-16 pt-12 md:pb-24 md:pt-20">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-navy/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-navy">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-ink" aria-hidden />
          Programa de formación docente · Valle del Cauca
        </p>
        <h1 className="max-w-4xl text-[clamp(38px,6vw,68px)] font-semibold leading-[1.02] text-navy">
          Valle Paraíso Bilingüe
          <span className="mt-2 block font-display text-[0.62em] font-medium italic text-teal-ink">
            Laboratorio Digital para Docentes
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Explora, crea, adapta y comparte recursos educativos para la enseñanza del inglés con TIC e
          Inteligencia Artificial.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#crear" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-teal-ink px-7 text-base font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5" style={{ color: "#fff" }}>
            ¿Qué quieres crear hoy? <ArrowRight size={18} aria-hidden />
          </Link>
          <Link href="/prompts#generador" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong bg-card px-7 text-base font-semibold text-navy transition-transform hover:-translate-y-0.5">
            <Sparkles size={18} aria-hidden /> Generar un prompt
          </Link>
          <Link href="/certificado" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong bg-card px-7 text-base font-semibold text-navy transition-transform hover:-translate-y-0.5">
            <Award size={18} aria-hidden /> Generar certificado
          </Link>
        </div>
        <ol className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[12px] font-semibold uppercase tracking-wide text-muted" aria-label="Ruta de trabajo del laboratorio">
          {["Explorar", "Aprender", "Crear", "Adaptar", "Descargar", "Compartir"].map((s, i, arr) => (
            <li key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-line-strong bg-card px-3 py-1 text-navy">{s}</span>
              {i < arr.length - 1 && <span aria-hidden>→</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

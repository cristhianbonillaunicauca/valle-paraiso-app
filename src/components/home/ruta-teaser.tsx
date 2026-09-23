"use client";

import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";
import { useRuta } from "@/lib/progress";
import { PASOS_RUTA } from "@/content/ruta";

export function RutaTeaser() {
  const { done, pct, insignias, hydrated } = useRuta();
  const obtenidas = insignias.filter((i) => i.obtenida).length;
  const siguiente = PASOS_RUTA.find((p) => !done.includes(p.id));

  return (
    <div className="grid items-center gap-8 rounded-3xl border border-line bg-card p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
      <div>
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal-ink">Tu ruta de innovación docente</p>
        <h2 className="mb-3 text-[clamp(24px,3vw,32px)] font-semibold text-navy">Avanza a tu ritmo y gana insignias</h2>
        <p className="mb-6 text-muted">
          Siete pasos, desde explorar la IA hasta compartir tu experiencia. Tu progreso se guarda en este
          navegador, sin necesidad de registrarte.
        </p>
        <Link href="/ruta" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-semibold text-white hover:bg-navy-deep" style={{ color: "#fff" }}>
          {hydrated && done.length > 0 ? "Continuar mi ruta" : "Empezar la ruta"} <ArrowRight size={17} aria-hidden />
        </Link>
      </div>
      <div className="rounded-2xl bg-paper-deep p-5">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-ink">Progreso</span>
          <span className="font-mono text-sm font-semibold text-navy">{hydrated ? pct : 0}%</span>
        </div>
        <div className="mb-4 h-3 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={hydrated ? pct : 0} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso de la ruta">
          <div className="h-full rounded-full bg-teal-ink transition-[width] duration-700" style={{ width: `${hydrated ? pct : 0}%` }} />
        </div>
        <p className="mb-2 flex items-center gap-2 text-sm text-ink">
          <Award size={16} className="text-[#7A5A06]" aria-hidden />
          {hydrated ? obtenidas : 0} de {insignias.length} insignias
        </p>
        {hydrated && siguiente && (
          <p className="text-sm text-muted">
            Siguiente paso: <Link href="/ruta" className="font-semibold text-teal-ink hover:underline">{siguiente.titulo}</Link>
          </p>
        )}
      </div>
    </div>
  );
}

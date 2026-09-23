"use client";

import Link from "next/link";
import { Award, Check, Lock, RotateCcw } from "lucide-react";
import { PASOS_RUTA } from "@/content/ruta";
import { useRuta } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function Ruta() {
  const { done, toggle, reset, pct, insignias, hydrated } = useRuta();
  const shown = hydrated ? pct : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <div className="mb-6 rounded-2xl border border-line bg-card p-5">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-semibold text-ink">Tu progreso</span>
            <span className="font-mono font-semibold text-navy">{shown}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={shown} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso de la ruta">
            <div className="h-full rounded-full bg-teal-ink transition-[width] duration-700" style={{ width: `${shown}%` }} />
          </div>
          <p className="mt-3 text-xs text-muted">Se guarda en este navegador. Si cambias de dispositivo, empezarás de nuevo.</p>
        </div>

        <ol className="space-y-3">
          {PASOS_RUTA.map((p, i) => {
            const ok = hydrated && done.includes(p.id);
            return (
              <li key={p.id} className={cn("rounded-2xl border bg-card p-5 transition-colors", ok ? "border-teal-ink/40" : "border-line")}>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => toggle(p.id)}
                    aria-pressed={ok}
                    aria-label={ok ? `Desmarcar paso ${i + 1}: ${p.titulo}` : `Marcar como completado el paso ${i + 1}: ${p.titulo}`}
                    className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-mono font-bold transition-colors", ok ? "border-teal-ink bg-teal-ink text-white" : "border-line-strong text-muted hover:border-navy")}
                  >
                    {ok ? <Check size={20} aria-hidden /> : i + 1}
                  </button>
                  <div className="flex-1">
                    <h3 className={cn("font-semibold", ok ? "text-teal-ink" : "text-navy")}>{p.titulo}</h3>
                    <p className="mb-3 text-sm text-muted">{p.descripcion}</p>
                    <Link href={p.href} className="text-sm font-semibold text-teal-ink hover:underline">{p.cta} →</Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        {hydrated && done.length > 0 && (
          <button type="button" onClick={() => confirm("¿Reiniciar tu ruta? Se borrará el progreso guardado en este navegador.") && reset()} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted hover:text-navy">
            <RotateCcw size={15} aria-hidden /> Reiniciar ruta
          </button>
        )}
      </div>

      <aside aria-labelledby="insignias-title" className="lg:sticky lg:top-24 lg:self-start">
        <h2 id="insignias-title" className="mb-4 font-display text-xl font-semibold text-navy">Insignias</h2>
        <ul className="grid gap-3">
          {insignias.map((b) => {
            const ok = hydrated && b.obtenida;
            return (
              <li key={b.id} className={cn("flex items-center gap-4 rounded-2xl border p-4", ok ? "border-gold/40 bg-gold/[0.08]" : "border-line bg-card")}>
                <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-full", ok ? "bg-gold text-white" : "bg-paper-deep text-muted")} aria-hidden>
                  {ok ? <Award size={22} /> : <Lock size={18} />}
                </span>
                <div>
                  <p className={cn("font-semibold", ok ? "text-[#6B4F05]" : "text-ink")}>{b.nombre}</p>
                  <p className="text-xs text-muted">{ok ? b.descripcion : `Requiere: ${b.requiere.length === PASOS_RUTA.length ? "todos los pasos" : b.requiere.map((r) => PASOS_RUTA.findIndex((p) => p.id === r) + 1).map((n) => `paso ${n}`).join(", ")}`}</p>
                </div>
                <span className="sr-only">{ok ? "Obtenida" : "Bloqueada"}</span>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

"use client";

import { useState } from "react";
import { MapPin, School, Users, X } from "lucide-react";
import { DATOS_MUNICIPIOS, MUNICIPIOS } from "@/content/municipios";
import { matches } from "@/lib/text";
import { cn } from "@/lib/utils";

export function MunicipiosGrid() {
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [soloParticipantes, setSoloParticipantes] = useState(true);
  const list = MUNICIPIOS.filter((m) => matches(q, m, ...(DATOS_MUNICIPIOS[m]?.instituciones.map((i) => i[0]) ?? [])))
    .filter((m) => !soloParticipantes || DATOS_MUNICIPIOS[m]);
  const d = sel ? DATOS_MUNICIPIOS[sel] : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="mun-q" className="sr-only">Buscar municipio o institución</label>
          <input
            id="mun-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar municipio o institución..."
            className="min-h-12 flex-1 rounded-full border border-line-strong bg-card px-5 text-[15px] outline-none focus:border-navy"
          />
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
            <input type="checkbox" checked={soloParticipantes} onChange={(e) => setSoloParticipantes(e.target.checked)} className="h-5 w-5 accent-[var(--teal-ink)]" />
            Solo municipios participantes
          </label>
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {list.map((m) => {
            const datos = DATOS_MUNICIPIOS[m];
            return (
              <li key={m}>
                <button
                  type="button"
                  aria-pressed={sel === m}
                  onClick={() => setSel(m)}
                  className={cn(
                    "flex min-h-14 w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors",
                    sel === m
                      ? "border-navy bg-navy text-white"
                      : datos
                        ? "border-line bg-card text-ink hover:border-navy/40"
                        : "border-dashed border-line bg-paper-deep text-muted hover:border-navy/30"
                  )}
                >
                  <MapPin size={15} className={cn("shrink-0", datos ? "text-teal-ink" : "opacity-40", sel === m && "text-white")} aria-hidden />
                  <span className="flex-1">
                    {m}
                    {datos && (
                      <span className={cn("block font-mono text-[11px] font-normal", sel === m ? "text-white/80" : "text-muted")}>
                        {datos.docentes} docentes · {datos.instituciones.length} {datos.instituciones.length === 1 ? "institución" : "instituciones"}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {list.length === 0 && <p className="mt-4 text-sm text-muted">No hay coincidencias.</p>}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        {sel ? (
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-navy">{sel}</h3>
              <button type="button" onClick={() => setSel(null)} aria-label="Cerrar detalle" className="grid h-10 w-10 place-items-center rounded-full hover:bg-paper-deep">
                <X size={18} />
              </button>
            </div>
            {d ? (
              <>
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-paper-deep p-3">
                    <Users size={16} className="mb-1 text-teal-ink" aria-hidden />
                    <p className="font-display text-2xl font-semibold text-navy">{d.docentes}</p>
                    <p className="text-xs text-muted">Docentes inscritos</p>
                  </div>
                  <div className="rounded-xl bg-paper-deep p-3">
                    <School size={16} className="mb-1 text-teal-ink" aria-hidden />
                    <p className="font-display text-2xl font-semibold text-navy">{d.instituciones.length}</p>
                    <p className="text-xs text-muted">{d.instituciones.length === 1 ? "Institución" : "Instituciones"}</p>
                  </div>
                </div>
                <h4 className="mb-2 text-sm font-semibold text-navy">Instituciones educativas participantes</h4>
                <ul className="divide-y divide-line rounded-xl border border-line">
                  {d.instituciones.map(([nombre, n]) => (
                    <li key={nombre} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
                      <span className="text-ink">{nombre}</span>
                      <span className="shrink-0 font-mono text-xs text-muted">{n} {n === 1 ? "docente" : "docentes"}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-muted">Este municipio no tuvo docentes inscritos en el Taller 1.</p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line-strong bg-card p-6 text-sm text-muted">
            Selecciona un municipio para ver sus instituciones participantes y el número de docentes.
          </div>
        )}
      </div>
    </div>
  );
}

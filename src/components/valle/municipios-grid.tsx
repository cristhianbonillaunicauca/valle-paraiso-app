"use client";

import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { DATOS_MUNICIPIOS, MUNICIPIOS } from "@/content/municipios";
import { matches } from "@/lib/text";
import { PendingTag } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

export function MunicipiosGrid() {
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const list = MUNICIPIOS.filter((m) => matches(q, m));
  const d = sel ? DATOS_MUNICIPIOS[sel] : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <label htmlFor="mun-q" className="sr-only">Buscar municipio</label>
        <input id="mun-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar municipio..." className="mb-4 min-h-12 w-full rounded-full border border-line-strong bg-card px-5 text-[15px] outline-none focus:border-navy" />
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {list.map((m) => {
            const hasData = !!DATOS_MUNICIPIOS[m];
            return (
              <li key={m}>
                <button
                  type="button"
                  aria-pressed={sel === m}
                  onClick={() => setSel(m)}
                  className={cn(
                    "flex min-h-12 w-full items-center gap-2 rounded-xl border px-3 text-left text-sm font-semibold transition-colors",
                    sel === m ? "border-navy bg-navy text-white" : "border-line bg-card text-ink hover:border-navy/40"
                  )}
                >
                  <MapPin size={15} className={cn("shrink-0", hasData ? "text-teal-ink" : "opacity-40", sel === m && "text-white opacity-100")} aria-hidden />
                  {m}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        {sel ? (
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-navy">{sel}</h3>
              <button type="button" onClick={() => setSel(null)} aria-label="Cerrar detalle" className="grid h-10 w-10 place-items-center rounded-full hover:bg-paper-deep"><X size={18} /></button>
            </div>
            <dl className="space-y-3 text-sm">
              {([["Docentes participantes", d?.docentes], ["Recursos creados", d?.recursos], ["Experiencias destacadas", d?.experiencias]] as const).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3 border-b border-line pb-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold text-ink">{v ?? <PendingTag />}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Fotografías</dt>
                <dd>{d?.fotosUrl ? <a href={d.fotosUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-ink hover:underline">Ver galería</a> : <PendingTag />}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line-strong bg-card p-6 text-sm text-muted">
            Selecciona un municipio para ver sus datos de participación.
          </div>
        )}
      </div>
    </div>
  );
}

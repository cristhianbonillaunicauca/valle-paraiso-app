"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Experiencia } from "@/content/experiencias";
import { EmptyState } from "@/components/shared/empty-state";
import { SaveButton } from "@/components/shared/save-button";

function uniq<T>(xs: T[]) {
  return Array.from(new Set(xs)).sort();
}

export function ExperienciasGallery({ experiencias }: { experiencias: Experiencia[] }) {
  const [f, setF] = useState({ municipio: "", nivel: "", habilidad: "", herramienta: "", producto: "" });
  const opts = useMemo(
    () => ({
      municipio: uniq(experiencias.map((e) => e.municipio)),
      nivel: uniq(experiencias.map((e) => e.nivel)),
      habilidad: uniq(experiencias.flatMap((e) => e.habilidades)),
      herramienta: uniq(experiencias.flatMap((e) => e.herramientas)),
      producto: uniq(experiencias.map((e) => e.producto)),
    }),
    [experiencias]
  );
  const list = experiencias.filter(
    (e) =>
      (!f.municipio || e.municipio === f.municipio) &&
      (!f.nivel || e.nivel === f.nivel) &&
      (!f.habilidad || e.habilidades.includes(f.habilidad as never)) &&
      (!f.herramienta || e.herramientas.includes(f.herramienta)) &&
      (!f.producto || e.producto === f.producto)
  );

  if (experiencias.length === 0) return null;

  const labels: Record<keyof typeof f, string> = { municipio: "Municipio", nivel: "Nivel", habilidad: "Competencia", herramienta: "Herramienta", producto: "Tipo de producto" };

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.keys(f) as (keyof typeof f)[]).map((k) => (
          <div key={k}>
            <label htmlFor={`exp-${k}`} className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">{labels[k]}</label>
            <select id={`exp-${k}`} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className="min-h-11 w-full rounded-xl border border-line-strong bg-card px-3 text-sm">
              <option value="">Todos</option>
              {opts[k].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
      {list.length === 0 ? (
        <EmptyState title="Sin experiencias con esos filtros" />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((e) => (
            <li key={e.id}>
              <article className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <span className="rounded-full bg-paper-deep px-2.5 py-1 font-mono text-[11px] font-semibold text-ink">{e.producto} · {e.nivel}</span>
                  <SaveButton compact item={{ kind: "experiencia", id: e.id, titulo: e.titulo, href: `/experiencias#${e.id}` }} />
                </div>
                <h3 id={e.id} className="mb-1 font-display text-lg font-semibold text-navy">{e.titulo}</h3>
                <p className="mb-3 text-sm text-muted">{e.docente} · {e.municipio}{e.institucion ? ` · ${e.institucion}` : ""}</p>
                <p className="mb-4 text-sm leading-relaxed text-ink">{e.descripcion}</p>
                <p className="mb-4 text-xs text-muted">Herramientas: {e.herramientas.join(", ")}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {e.url && (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white" style={{ color: "#fff" }}>
                      Ver producto <ExternalLink size={14} aria-hidden />
                    </a>
                  )}
                  {e.actividadUrl && (
                    <a href={e.actividadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-semibold text-navy">
                      Ver actividad
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

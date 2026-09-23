"use client";

import { useEffect, useState } from "react";
import { Download, Search } from "lucide-react";
import { PROMPTS, SUBGRUPOS_PROMPTS } from "@/content/prompts";
import { SALAS } from "@/content/salas";
import { HABILIDADES, NIVELES, type Habilidad, type Nivel, type SalaId } from "@/content/taxonomia";
import { matches } from "@/lib/text";
import { inkHex } from "@/lib/colors";
import { FilterGroup } from "@/components/shared/filter-group";
import { EmptyState } from "@/components/shared/empty-state";
import { PromptCard } from "@/components/explorar/prompt-card";
import { cn } from "@/lib/utils";
import { trackDownload } from "@/lib/track-download";

export function PromptBank({ initial, downloadHref, bancoId }: { initial: { sala?: string; habilidad?: string; q?: string; nivel?: string }; downloadHref?: string | null; bancoId?: number }) {
  const [sala, setSala] = useState<SalaId | "">(SALAS.some((s) => s.id === initial.sala) ? (initial.sala as SalaId) : "");
  const [niveles, setNiveles] = useState<Nivel[]>(NIVELES.filter((n) => initial.nivel?.split(",").includes(n)));
  const [habs, setHabs] = useState<Habilidad[]>(HABILIDADES.filter((h) => initial.habilidad?.split(",").includes(h)));
  const [subgrupo, setSubgrupo] = useState("");
  const [q, setQ] = useState(initial.q ?? "");
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLimit(12);
  }, [sala, niveles, habs, subgrupo, q]);

  const subgrupos = SUBGRUPOS_PROMPTS.filter((s) => !sala || s.sala === sala);
  const list = PROMPTS.filter(
        (p) =>
          (!sala || p.sala === sala) &&
          (!subgrupo || p.subgrupo === subgrupo) &&
          (!niveles.length || p.niveles.length === 0 || p.niveles.some((n) => niveles.includes(n))) &&
          (!habs.length || p.habilidades.some((h) => habs.includes(h))) &&
          matches(q, p.titulo, p.tema, p.subgrupo, p.texto, p.nivel)
  );

  return (
    <div>
      <div className="scrollbar-none -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Bloque del banco">
        {[{ id: "" as const, nombre: "Los 100", color: "navy" }, ...SALAS.map((s) => ({ id: s.id, nombre: s.bloquePrompts, color: s.color }))].map((s) => {
          const active = sala === s.id;
          return (
            <button
              key={s.id || "todos"}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setSala(s.id);
                setSubgrupo("");
              }}
              className={cn("min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold", active ? "border-transparent text-white" : "border-line-strong bg-card text-ink hover:border-navy/40")}
              style={active ? { background: inkHex(s.color) } : undefined}
            >
              {s.nombre}
            </button>
          );
        })}
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-[1fr_280px]">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="bank-q" className="sr-only">Buscar en el banco de prompts</label>
          <input id="bank-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca por tema: tourism, coffee, rúbrica, dictado..." className="min-h-12 w-full rounded-full border border-line-strong bg-card pl-11 pr-4 text-[15px] outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="bank-sub" className="sr-only">Subgrupo temático</label>
          <select id="bank-sub" value={subgrupo} onChange={(e) => setSubgrupo(e.target.value)} className="min-h-12 w-full rounded-full border border-line-strong bg-card px-4 text-[15px] outline-none focus:border-navy">
            <option value="">Todos los subgrupos</option>
            {subgrupos.map((s) => (
              <option key={s.subgrupo} value={s.subgrupo}>{s.subgrupo}</option>
            ))}
          </select>
        </div>
      </div>

      <details className="mb-6 rounded-2xl border border-line bg-card p-4 [&_summary::-webkit-details-marker]:hidden" open={niveles.length + habs.length > 0}>
        <summary className="flex min-h-9 cursor-pointer items-center justify-between text-sm font-semibold text-navy">
          Filtrar por nivel y habilidad {niveles.length + habs.length > 0 && `(${niveles.length + habs.length})`}
          <span aria-hidden className="text-muted">▾</span>
        </summary>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FilterGroup label="Nivel MCER" options={NIVELES} value={niveles} onChange={setNiveles} />
          <FilterGroup label="Habilidad" options={HABILIDADES} value={habs} onChange={setHabs} />
        </div>
      </details>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">{list.length} prompts</p>
        {downloadHref && (
          <a href={downloadHref} download onClick={() => bancoId && trackDownload("banco", bancoId)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
            <Download size={16} aria-hidden /> Descargar el banco completo (DOCX)
          </a>
        )}
      </div>

      {list.length === 0 ? (
        <EmptyState title="No hay prompts con esos filtros">Prueba con otro tema o quita algún filtro.</EmptyState>
      ) : (
        <>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.slice(0, limit).map((p) => (
              <li key={p.id}><PromptCard p={p} /></li>
            ))}
          </ul>
          {list.length > limit && (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setLimit((l) => l + 12)} className="min-h-12 rounded-full border border-line-strong bg-card px-6 font-semibold text-navy hover:bg-paper-deep">
                Mostrar más ({list.length - limit} restantes)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

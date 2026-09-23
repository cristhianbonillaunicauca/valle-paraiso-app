"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchStatic, type SearchHit } from "@/lib/search-index";
import { EXPERIENCIAS } from "@/content/experiencias";
import type { LibraryItem } from "@/lib/library";
import { matches } from "@/lib/text";
import { EmptyState } from "@/components/shared/empty-state";

const ORDER = ["Herramientas", "Prompts", "Tutoriales", "Recursos", "Experiencias"] as const;

export function SearchResults({ initialQ, library }: { initialQ: string; library: Pick<LibraryItem, "key" | "titulo" | "categoria" | "tipo" | "href" | "disponible">[] }) {
  const [q, setQ] = useState(initialQ);
  const hits = useMemo<SearchHit[]>(() => {
    if (!q.trim()) return [];
    const recursos = library
      .filter((i) => i.disponible && matches(q, i.titulo, i.categoria))
      .map<SearchHit>((i) => ({ group: "Recursos", id: i.key, titulo: i.titulo, detalle: `${i.categoria} · ${i.tipo}`, href: `/biblioteca?cat=${encodeURIComponent(i.categoria)}` }));
    const exps = EXPERIENCIAS.filter((e) => matches(q, e.titulo, e.descripcion, e.municipio, e.herramientas.join(" "))).map<SearchHit>((e) => ({ group: "Experiencias", id: e.id, titulo: e.titulo, detalle: `${e.docente} · ${e.municipio}`, href: `/experiencias#${e.id}` }));
    return [...searchStatic(q, 50), ...recursos, ...exps];
  }, [q, library]);

  return (
    <div>
      <form role="search" onSubmit={(e) => { e.preventDefault(); const u = new URL(window.location.href); u.searchParams.set("q", q); window.history.replaceState(null, "", u); }} className="relative mb-8">
        <Search size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
        <label htmlFor="buscar-q" className="sr-only">Buscar</label>
        <input id="buscar-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="Busca herramientas, prompts, actividades, tutoriales o recursos..." className="min-h-14 w-full rounded-full border border-line-strong bg-card pl-13 pr-5 text-base outline-none focus:border-navy" style={{ paddingLeft: "3.25rem" }} />
      </form>
      <p className="mb-6 text-sm text-muted" aria-live="polite">{q.trim() ? `${hits.length} resultados` : "Escribe para buscar en todo el sitio."}</p>
      {q.trim() && hits.length === 0 && <EmptyState title="Sin resultados">Prueba con otra palabra, por ejemplo &ldquo;podcast&rdquo;, &ldquo;quiz&rdquo; o &ldquo;A2&rdquo;.</EmptyState>}
      <div className="space-y-10">
        {ORDER.map((g) => {
          const items = hits.filter((h) => h.group === g);
          if (!items.length) return null;
          return (
            <section key={g} aria-labelledby={`r-${g}`}>
              <h2 id={`r-${g}`} className="mb-3 font-display text-xl font-semibold text-navy">{g} <span className="font-mono text-sm text-muted">{items.length}</span></h2>
              <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
                {items.map((h) => (
                  <li key={h.group + h.id}>
                    <Link href={h.href} className="flex flex-col px-5 py-3.5 hover:bg-paper-deep">
                      <span className="font-semibold text-navy">{h.titulo}</span>
                      <span className="text-sm text-muted">{h.detalle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

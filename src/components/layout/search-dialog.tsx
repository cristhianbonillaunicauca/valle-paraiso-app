"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { searchStatic, type SearchGroup } from "@/lib/search-index";

const ORDER: SearchGroup[] = ["Herramientas", "Prompts", "Tutoriales", "Recursos", "Experiencias"];

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      setTimeout(() => inputRef.current?.focus(), 10);
    } else if (!open && d.open) d.close();
  }, [open]);

  const hits = useMemo(() => searchStatic(q, 4), [q]);
  const grouped = ORDER.map((g) => ({ g, items: hits.filter((h) => h.group === g) })).filter((x) => x.items.length);

  const goAll = () => {
    if (!q.trim()) return;
    onClose();
    router.push(`/buscar?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Buscar en el sitio"
      className="m-0 mx-auto mt-[8vh] w-[min(680px,calc(100%-24px))] max-w-none rounded-2xl border border-line bg-card p-0 text-ink shadow-2xl backdrop:bg-navy-deep/50 backdrop:backdrop-blur-sm"
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          goAll();
        }}
        className="flex items-center gap-3 border-b border-line px-4 py-3"
      >
        <Search size={20} className="shrink-0 text-muted" aria-hidden />
        <label htmlFor="global-search" className="sr-only">
          Buscar
        </label>
        <input
          ref={inputRef}
          id="global-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busca herramientas, prompts, actividades, tutoriales o recursos..."
          className="min-h-11 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          autoComplete="off"
        />
        <button type="button" onClick={onClose} aria-label="Cerrar búsqueda" className="grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-paper-deep">
          <X size={20} />
        </button>
      </form>

      <div className="max-h-[60vh] overflow-y-auto p-2">
        {!q.trim() && (
          <div className="p-4 text-sm text-muted">
            <p className="mb-3">Prueba con:</p>
            <div className="flex flex-wrap gap-2">
              {["podcast", "listening A2", "rúbrica", "Canva", "quiz", "pronunciación", "sin internet"].map((s) => (
                <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-line-strong px-3 py-1.5 text-[13px] font-semibold text-navy hover:bg-paper-deep">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {q.trim() && grouped.length === 0 && (
          <p className="p-4 text-sm text-muted">Sin coincidencias rápidas. Presiona Enter para buscar también en la biblioteca.</p>
        )}
        {grouped.map(({ g, items }) => (
          <div key={g} className="mb-2">
            <p className="px-3 pb-1 pt-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-muted">{g}</p>
            <ul>
              {items.map((h) => (
                <li key={`${h.group}-${h.id}`}>
                  <Link href={h.href} onClick={onClose} className="flex flex-col rounded-xl px-3 py-2.5 hover:bg-paper-deep focus-visible:bg-paper-deep">
                    <span className="text-sm font-semibold text-navy">{h.titulo}</span>
                    <span className="text-xs text-muted">{h.detalle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {q.trim() && (
        <div className="border-t border-line p-2">
          <button type="button" onClick={goAll} className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-teal-ink hover:bg-paper-deep">
            Ver todos los resultados para &ldquo;{q.trim()}&rdquo;
            <ArrowRight size={16} aria-hidden />
          </button>
        </div>
      )}
    </dialog>
  );
}

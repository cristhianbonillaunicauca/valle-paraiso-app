"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, ExternalLink, Eye, FileText, FolderOpen, Search, X } from "lucide-react";
import { CATEGORIAS_BIBLIOTECA, type CategoriaBiblioteca, type LibraryItem } from "@/lib/library";
import { drivePreviewUrl, officePreviewUrl } from "@/lib/links";
import { trackDownload } from "@/lib/track-download";
import { matches } from "@/lib/text";
import { SaveButton } from "@/components/shared/save-button";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Orden = "relevancia" | "az" | "descargas";

function previewUrl(it: LibraryItem): string | null {
  if (!it.href || !it.disponible) return null;
  if (it.tracking && /\.(docx|xlsx|pptx)$/i.test(it.href)) return officePreviewUrl(it.href);
  if (it.tracking && /\.pdf$/i.test(it.href)) return it.href;
  if (it.href.includes("drive.google.com/file/")) return drivePreviewUrl(it.href);
  return null;
}

export function Library({ items, counts, initialCat }: { items: LibraryItem[]; counts: Record<string, number> | null; initialCat?: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategoriaBiblioteca | "">(
    (CATEGORIAS_BIBLIOTECA as readonly string[]).includes(initialCat ?? "") ? (initialCat as CategoriaBiblioteca) : ""
  );
  const [tipo, setTipo] = useState("");
  const [orden, setOrden] = useState<Orden>("relevancia");
  const [preview, setPreview] = useState<LibraryItem | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (cat) p.set("cat", cat);
    else p.delete("cat");
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [cat]);

  const tipos = useMemo(() => Array.from(new Set(items.map((i) => i.tipo))).sort(), [items]);
  const countFor = (it: LibraryItem) => (it.tracking && counts ? counts[`${it.tracking.tipo}-${it.tracking.id}`] ?? 0 : null);

  const list = useMemo(() => {
    const filtered = items.filter(
      (i) => (!cat || i.categoria === cat) && (!tipo || i.tipo === tipo) && matches(q, i.titulo, i.descripcion, i.categoria)
    );
    const sorted = [...filtered];
    if (orden === "az") sorted.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
    else if (orden === "descargas") sorted.sort((a, b) => (countFor(b) ?? -1) - (countFor(a) ?? -1));
    else sorted.sort((a, b) => Number(b.disponible) - Number(a.disponible) || a.orden - b.orden);
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, cat, tipo, q, orden, counts]);

  const catCount = (c: CategoriaBiblioteca) => items.filter((i) => i.categoria === c).length;

  return (
    <div>
      <div className="scrollbar-none -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Categoría">
        {(["", ...CATEGORIAS_BIBLIOTECA] as const).map((c) => {
          const n = c ? catCount(c) : items.length;
          if (c && n === 0) return null;
          const active = cat === c;
          return (
            <button key={c || "todas"} type="button" aria-pressed={active} onClick={() => setCat(c)} className={cn("min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold", active ? "border-navy bg-navy text-white" : "border-line-strong bg-card text-ink hover:border-navy/40")}>
              {c || "Todo"} <span className="font-mono text-xs opacity-70">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_200px_220px]">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="lib-q" className="sr-only">Buscar en la biblioteca</label>
          <input id="lib-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar guías, bancos, presentaciones..." className="min-h-12 w-full rounded-full border border-line-strong bg-card pl-11 pr-4 text-[15px] outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="lib-tipo" className="sr-only">Tipo de archivo</label>
          <select id="lib-tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="min-h-12 w-full rounded-full border border-line-strong bg-card px-4 text-[15px] outline-none focus:border-navy">
            <option value="">Todos los formatos</option>
            {tipos.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="lib-orden" className="sr-only">Ordenar por</label>
          <select id="lib-orden" value={orden} onChange={(e) => setOrden(e.target.value as Orden)} className="min-h-12 w-full rounded-full border border-line-strong bg-card px-4 text-[15px] outline-none focus:border-navy">
            <option value="relevancia">Orden: relevancia</option>
            <option value="descargas">Más descargados</option>
            <option value="az">Alfabético (A-Z)</option>
          </select>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted" aria-live="polite">{list.length} recursos</p>

      {list.length === 0 ? (
        <EmptyState title="No hay recursos con esos filtros">Prueba con otra categoría o palabra.</EmptyState>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((it) => {
            const n = countFor(it);
            const pv = previewUrl(it);
            const isFolder = it.tipo === "Carpeta";
            return (
              <li key={it.key}>
                <article className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-5" aria-labelledby={`lib-${it.key}`}>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="neutral">{it.categoria}</Badge>
                      <span className="rounded-md bg-navy/[0.07] px-2 py-0.5 font-mono text-[11px] font-semibold text-navy">{it.tipo}</span>
                    </div>
                    {it.href && it.disponible && (
                      <SaveButton compact item={{ kind: "recurso", id: it.key, titulo: it.titulo, href: it.href }} />
                    )}
                  </div>
                  <h3 id={`lib-${it.key}`} className="mb-2 flex items-start gap-2 font-semibold leading-snug text-navy">
                    {isFolder ? <FolderOpen size={18} className="mt-0.5 shrink-0" aria-hidden /> : <FileText size={18} className="mt-0.5 shrink-0" aria-hidden />}
                    {it.titulo}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{it.descripcion}</p>
                  <p className="mb-4 font-mono text-[11px] text-muted">
                    {it.cantidad && <span>{it.cantidad} · </span>}
                    Taller 1
                    {n !== null && <span> · {n.toLocaleString("es-CO")} descargas</span>}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {!it.href || !it.disponible ? (
                      <Badge variant="neutral">{it.href ? "Próximamente" : "Enlace pendiente"}</Badge>
                    ) : it.tracking ? (
                      <>
                        <a href={it.href} download onClick={() => trackDownload(it.tracking!.tipo, it.tracking!.id)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white hover:bg-navy-deep" style={{ color: "#fff" }}>
                          <Download size={15} aria-hidden /> Descargar<span className="sr-only"> {it.titulo}</span>
                        </a>
                        {pv && (
                          <button type="button" onClick={() => setPreview(it)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
                            <Eye size={15} aria-hidden /> Vista previa
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <a href={it.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white hover:bg-navy-deep" style={{ color: "#fff" }}>
                          {isFolder ? "Abrir carpeta" : "Abrir"} <ExternalLink size={14} aria-hidden /><span className="sr-only"> (abre en una pestaña nueva)</span>
                        </a>
                        {pv && (
                          <button type="button" onClick={() => setPreview(it)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
                            <Eye size={15} aria-hidden /> Vista previa
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {preview && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3" role="dialog" aria-modal="true" aria-labelledby="pv-title">
          <button type="button" className="absolute inset-0 bg-navy-deep/60" aria-label="Cerrar vista previa" onClick={() => setPreview(null)} />
          <div className="animate-fade-up relative flex h-[88dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <h2 id="pv-title" className="truncate font-semibold text-navy">{preview.titulo}</h2>
              <button type="button" autoFocus onClick={() => setPreview(null)} aria-label="Cerrar vista previa" className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-paper-deep">
                <X size={20} />
              </button>
            </div>
            <iframe src={previewUrl(preview)!} title={`Vista previa: ${preview.titulo}`} className="w-full flex-1 border-0" loading="lazy" />
          </div>
        </div>
      )}
    </div>
  );
}

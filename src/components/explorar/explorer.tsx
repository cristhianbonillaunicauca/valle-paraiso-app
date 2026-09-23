"use client";

import { useEffect, useMemo, useState } from "react";
import { Info, Search, SlidersHorizontal, X } from "lucide-react";
import { HERRAMIENTAS } from "@/content/herramientas";
import { PROMPTS } from "@/content/prompts";
import { SALAS } from "@/content/salas";
import {
  CONECTIVIDAD,
  HABILIDADES,
  NIVELES,
  PRECIOS,
  PRODUCTOS,
  TIPOS_HERRAMIENTA,
  type Conectividad,
  type Habilidad,
  type Nivel,
  type Precio,
  type Producto,
  type SalaId,
  type TipoHerramienta,
} from "@/content/taxonomia";
import { matches } from "@/lib/text";
import { inkHex } from "@/lib/colors";
import { FilterGroup } from "@/components/shared/filter-group";
import { EmptyState } from "@/components/shared/empty-state";
import { ToolCard } from "@/components/explorar/tool-card";
import { PromptCard } from "@/components/explorar/prompt-card";
import { useRuta } from "@/lib/progress";
import { cn } from "@/lib/utils";

export interface ExplorerInitial {
  q?: string;
  sala?: string;
  nivel?: string;
  habilidad?: string;
  producto?: string;
  tipo?: string;
  conectividad?: string;
  precio?: string;
  vista?: string;
}

const PAGE = 24;

function listParam<T extends string>(raw: string | undefined, allowed: readonly T[]): T[] {
  if (!raw) return [];
  return raw.split(",").filter((x): x is T => (allowed as readonly string[]).includes(x));
}

export function Explorer({ initial }: { initial: ExplorerInitial }) {
  const [q, setQ] = useState(initial.q ?? "");
  const [sala, setSala] = useState<SalaId | "">(SALAS.some((s) => s.id === initial.sala) ? (initial.sala as SalaId) : "");
  const [niveles, setNiveles] = useState<Nivel[]>(listParam(initial.nivel, NIVELES));
  const [habs, setHabs] = useState<Habilidad[]>(listParam(initial.habilidad, HABILIDADES));
  const [prods, setProds] = useState<Producto[]>(listParam(initial.producto, PRODUCTOS));
  const [tipos, setTipos] = useState<TipoHerramienta[]>(listParam(initial.tipo, TIPOS_HERRAMIENTA));
  const [conex, setConex] = useState<Conectividad[]>(listParam(initial.conectividad, CONECTIVIDAD));
  const [precios, setPrecios] = useState<Precio[]>(listParam(initial.precio, PRECIOS));
  const [vista, setVista] = useState<"herramientas" | "prompts">(initial.vista === "prompts" ? "prompts" : "herramientas");
  const [limit, setLimit] = useState(PAGE);
  const [panel, setPanel] = useState(false);
  const { complete } = useRuta();

  // Mantener la URL sincronizada (enlaces compartibles, botón atrás).
  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (sala) p.set("sala", sala);
    if (niveles.length) p.set("nivel", niveles.join(","));
    if (habs.length) p.set("habilidad", habs.join(","));
    if (prods.length) p.set("producto", prods.join(","));
    if (tipos.length) p.set("tipo", tipos.join(","));
    if (conex.length) p.set("conectividad", conex.join(","));
    if (precios.length) p.set("precio", precios.join(","));
    if (vista === "prompts") p.set("vista", "prompts");
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLimit(PAGE);
  }, [q, sala, niveles, habs, prods, tipos, conex, precios, vista]);

  useEffect(() => {
    if (tipos.includes("Inteligencia Artificial")) complete("explorar-ia");
  }, [tipos, complete]);

  const tools = useMemo(
    () =>
      HERRAMIENTAS.filter(
        (h) =>
          (!sala || h.sala === sala || h.sala === null) &&
          (!habs.length || h.habilidades.some((x) => habs.includes(x)) || h.habilidades.includes("Integrated Skills")) &&
          (!prods.length || h.productos.some((x) => prods.includes(x))) &&
          (!tipos.length || tipos.includes(h.tipo)) &&
          (!conex.length || conex.includes(h.conectividad)) &&
          (!precios.length || precios.includes(h.precio)) &&
          matches(q, h.nombre, h.categoria, h.descripcion, h.aplicacion, h.habilidades.join(" "))
      ).sort((a, b) => (sala ? Number(a.sala === null) - Number(b.sala === null) : 0)),
    [q, sala, habs, prods, tipos, conex, precios]
  );

  const prompts = useMemo(
    () =>
      PROMPTS.filter(
        (p) =>
          (!sala || p.sala === sala) &&
          (!niveles.length || p.niveles.length === 0 || p.niveles.some((n) => niveles.includes(n))) &&
          (!habs.length || p.habilidades.some((x) => habs.includes(x))) &&
          (!prods.length || p.productos.some((x) => prods.includes(x))) &&
          matches(q, p.titulo, p.tema, p.subgrupo, p.bloque, p.nivel, p.texto)
      ),
    [q, sala, niveles, habs, prods]
  );

  const activeCount = niveles.length + habs.length + prods.length + tipos.length + conex.length + precios.length;
  const clearAll = () => {
    setNiveles([]);
    setHabs([]);
    setProds([]);
    setTipos([]);
    setConex([]);
    setPrecios([]);
    setQ("");
    setSala("");
  };

  const list = vista === "herramientas" ? tools : prompts;

  const filters = (
    <div className="grid gap-5">
      <FilterGroup label="Nivel MCER" options={NIVELES} value={niveles} onChange={setNiveles} />
      <FilterGroup label="Habilidad" options={HABILIDADES} value={habs} onChange={setHabs} />
      <FilterGroup label="Producto" options={PRODUCTOS} value={prods} onChange={setProds} />
      <FilterGroup label="Tipo de herramienta" options={TIPOS_HERRAMIENTA} value={tipos} onChange={setTipos} />
      <FilterGroup label="Conectividad" options={CONECTIVIDAD} value={conex} onChange={setConex} />
      <FilterGroup label="Precio" options={PRECIOS} value={precios} onChange={setPrecios} />
      <p className="flex gap-2 rounded-xl bg-paper-deep p-3 text-xs leading-relaxed text-muted">
        <Info size={15} className="mt-0.5 shrink-0" aria-hidden />
        Las herramientas sirven para cualquier nivel: el filtro MCER afina los prompts. Conectividad y
        dificultad son una clasificación orientativa del equipo.
      </p>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 md:px-5 md:py-10">
      {/* Salas como pestañas rápidas */}
      <div className="scrollbar-none -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Filtrar por laboratorio">
        {[{ id: "" as const, nombre: "Todos", color: "navy" as const }, ...SALAS.map((s) => ({ id: s.id, nombre: s.titulo, color: s.color }))].map((s) => {
          const active = sala === s.id;
          return (
            <button
              key={s.id || "todos"}
              type="button"
              aria-pressed={active}
              onClick={() => setSala(s.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors",
                active ? "border-transparent text-white" : "border-line-strong bg-card text-ink hover:border-navy/40"
              )}
              style={active ? { background: inkHex(s.color) } : undefined}
            >
              {s.nombre}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="explorer-q" className="sr-only">Buscar herramientas o prompts</label>
          <input
            id="explorer-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busca por nombre, tema o uso: podcast, flashcards, rúbrica..."
            className="min-h-12 w-full rounded-full border border-line-strong bg-card pl-11 pr-4 text-[15px] outline-none focus:border-navy"
          />
        </div>
        <button
          type="button"
          onClick={() => setPanel(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-card px-5 text-sm font-semibold text-navy lg:hidden"
          aria-controls="panel-filtros"
          aria-expanded={panel}
        >
          <SlidersHorizontal size={17} aria-hidden /> Filtros{activeCount > 0 && ` (${activeCount})`}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filtros: barra lateral en escritorio, panel deslizante en móvil */}
        <aside aria-label="Filtros" className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg text-navy">Filtros</h2>
              {activeCount > 0 && (
                <button type="button" onClick={clearAll} className="text-sm font-semibold text-teal-ink hover:underline">Limpiar</button>
              )}
            </div>
            {filters}
          </div>
        </aside>

        {panel && (
          <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros" id="panel-filtros">
            <button type="button" className="absolute inset-0 bg-navy-deep/50" aria-label="Cerrar filtros" onClick={() => setPanel(false)} />
            <div className="animate-fade-up absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-paper p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg text-navy">Filtros</h2>
                <button type="button" onClick={() => setPanel(false)} aria-label="Cerrar filtros" className="grid h-11 w-11 place-items-center rounded-full hover:bg-paper-deep">
                  <X size={20} />
                </button>
              </div>
              {filters}
              <div className="sticky bottom-0 mt-5 flex gap-2 bg-paper pt-3">
                <button type="button" onClick={clearAll} className="min-h-12 flex-1 rounded-full border border-line-strong font-semibold text-navy">Limpiar</button>
                <button type="button" onClick={() => setPanel(false)} className="min-h-12 flex-1 rounded-full bg-navy font-semibold text-white">
                  Ver {list.length} resultados
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full border border-line-strong bg-card p-1" role="tablist" aria-label="Tipo de resultado">
              {(["herramientas", "prompts"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={vista === v}
                  onClick={() => setVista(v)}
                  className={cn(
                    "min-h-10 rounded-full px-4 text-sm font-semibold capitalize transition-colors",
                    vista === v ? "bg-navy text-white" : "text-ink hover:text-navy"
                  )}
                >
                  {v} <span className="font-mono text-xs opacity-75">{v === "herramientas" ? tools.length : prompts.length}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted" aria-live="polite">
              {list.length} {list.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>

          {list.length === 0 ? (
            <EmptyState title="No encontramos coincidencias">
              Prueba con menos filtros o con otra palabra.{" "}
              <button type="button" onClick={clearAll} className="font-semibold text-teal-ink hover:underline">Limpiar todo</button>
            </EmptyState>
          ) : (
            <>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {vista === "herramientas"
                  ? tools.slice(0, limit).map((h) => (
                      <li key={h.id}><ToolCard h={h} /></li>
                    ))
                  : prompts.slice(0, limit).map((p) => (
                      <li key={p.id}><PromptCard p={p} /></li>
                    ))}
              </ul>
              {list.length > limit && (
                <div className="mt-8 text-center">
                  <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="min-h-12 rounded-full border border-line-strong bg-card px-6 font-semibold text-navy hover:bg-paper-deep">
                    Mostrar más ({list.length - limit} restantes)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { DescargaConteoRow, TipoRecurso } from "@/lib/database.types";

export interface ChartResource {
  tipo: TipoRecurso;
  id: number;
  nombre: string;
}

type Status = "loading" | "success" | "error";

/**
 * "Documentos más descargados". Estados explícitos: esqueleto mientras
 * carga, error con reintento (si tarda más de 8 s o falla), vacío y éxito.
 * Nunca muestra "0 descargas" antes de haber verificado los datos reales.
 * Si el servidor ya trajo los conteos, se muestran de inmediato y luego se
 * actualizan en vivo. Barras en CSS puro: no carga librerías de gráficas.
 */
export function DownloadsChart({ resources, initialCounts }: { resources: ChartResource[]; initialCounts?: Record<string, number> | null }) {
  const [counts, setCounts] = useState<Record<string, number> | null>(initialCounts ?? null);
  const [status, setStatus] = useState<Status>(initialCounts ? "success" : "loading");
  const [live, setLive] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchCounts = useCallback(async () => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus((s) => (s === "loading" ? "error" : s)), 8000);
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from("descargas_conteo").select("*");
      if (error) throw error;
      const rows = (data ?? []) as unknown as DescargaConteoRow[];
      setCounts(Object.fromEntries(rows.map((r) => [`${r.recurso_tipo}-${r.recurso_id}`, r.total])));
      setStatus("success");
    } catch {
      setStatus((s) => (s === "success" ? s : "error"));
    } finally {
      clearTimeout(timeout.current);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCounts();
    let channel: ReturnType<ReturnType<typeof getSupabaseBrowserClient>["channel"]> | null = null;
    try {
      const supabase = getSupabaseBrowserClient();
      channel = supabase
        .channel("descargas-realtime")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "descargas" }, () => fetchCounts())
        .subscribe((s) => setLive(s === "SUBSCRIBED"));
    } catch {
      /* sin realtime: se mantiene el último conteo */
    }
    return () => {
      clearTimeout(timeout.current);
      if (channel) getSupabaseBrowserClient().removeChannel(channel);
    };
  }, [fetchCounts]);

  const data = resources
    .map((r) => ({ key: `${r.tipo}-${r.id}`, nombre: r.nombre, total: counts?.[`${r.tipo}-${r.id}`] ?? 0 }))
    .sort((a, b) => b.total - a.total);
  const max = Math.max(1, ...data.map((d) => d.total));
  const total = data.reduce((s, d) => s + d.total, 0);

  return (
    <div className="rounded-2xl border border-line bg-card p-5 md:p-6" aria-busy={status === "loading"}>
      <div className="mb-4 flex min-h-5 items-center justify-between gap-3">
        {status === "success" && total > 0 && (
          <span className="font-mono text-xs text-muted">{total.toLocaleString("es-CO")} descargas registradas</span>
        )}
        {status === "success" && live && (
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-teal-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-ink" aria-hidden /> en vivo
          </span>
        )}
      </div>

      {status === "loading" && (
        <div className="space-y-3" aria-label="Cargando datos de descargas">
          {resources.slice(0, 6).map((r) => (
            <div key={r.id + r.tipo} className="flex items-center gap-3">
              <div className="skeleton h-3 w-40 shrink-0" />
              <div className="skeleton h-5 flex-1" />
            </div>
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <AlertCircle className="text-muted" aria-hidden />
          <p className="text-sm text-muted">No pudimos cargar las estadísticas en este momento.</p>
          <button type="button" onClick={() => { setStatus("loading"); fetchCounts(); }} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
            <RefreshCw size={15} aria-hidden /> Reintentar
          </button>
        </div>
      )}

      {status === "success" && total === 0 && (
        <p className="py-8 text-center text-sm text-muted">Aún no hay descargas registradas. ¡Sé el primero en descargar un recurso!</p>
      )}

      {status === "success" && total > 0 && (
        <ol className="space-y-3">
          {data.map((d) => (
            <li key={d.key} className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center sm:gap-3">
              <span className="truncate text-sm font-semibold text-ink" title={d.nombre}>{d.nombre}</span>
              <span className="flex items-center gap-2">
                <span className="h-5 rounded-md bg-teal-ink/85 transition-[width] duration-700" style={{ width: `${Math.max(2, (d.total / max) * 100)}%` }} aria-hidden />
                <span className="font-mono text-xs font-semibold text-ink">{d.total.toLocaleString("es-CO")}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

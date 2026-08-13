"use client";

import { useCallback, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { DescargaConteoRow, TipoRecurso } from "@/lib/database.types";
import { colorHex } from "@/lib/colors";

export interface ChartResource {
  tipo: TipoRecurso;
  id: number;
  nombre: string;
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

export function DownloadsChart({ resources }: { resources: ChartResource[] }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);

  const fetchCounts = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase.from("descargas_conteo").select("*");
    // Igual que en lib/queries.ts: con muchas tablas en el esquema, TS
    // degrada el tipo de esta vista a `never[]`; se fuerza el tipo real.
    const rows = (data ?? []) as unknown as DescargaConteoRow[];
    if (!error) {
      const map: Record<string, number> = {};
      for (const row of rows) {
        map[`${row.recurso_tipo}-${row.recurso_id}`] = row.total;
      }
      setCounts(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Patrón estándar de "traer datos al montar": fetchCounts es async y
    // actualiza el estado después del await, no de forma síncrona durante
    // el efecto — es seguro pese a lo que sugiere esta regla nueva.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCounts();
    const supabase = getSupabaseBrowserClient();
    const channel = supabase
      .channel("descargas-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "descargas" },
        () => fetchCounts()
      )
      .subscribe((status) => setLive(status === "SUBSCRIBED"));

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCounts]);

  const data = resources
    .map((r) => ({
      key: `${r.tipo}-${r.id}`,
      nombre: truncate(r.nombre, 26),
      nombreCompleto: r.nombre,
      descargas: counts[`${r.tipo}-${r.id}`] ?? 0,
      color: r.tipo === "documento" ? colorHex("blue") : colorHex("teal"),
    }))
    .sort((a, b) => b.descargas - a.descargas);

  const totalDescargas = data.reduce((sum, d) => sum + d.descargas, 0);

  return (
    <div className="rounded-2xl border border-line bg-card p-5 md:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          {totalDescargas} descarga{totalDescargas === 1 ? "" : "s"} registrada
          {totalDescargas === 1 ? "" : "s"}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: live ? colorHex("teal") : colorHex("neutro") }}
          />
          {live ? "en vivo" : "conectando…"}
        </span>
      </div>

      {loading ? (
        <div className="grid h-[260px] place-items-center text-sm text-muted">Cargando datos…</div>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(260, data.length * 34)}>
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid horizontal={false} stroke="#E1E8EA" />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#5B6478" }}
              axisLine={{ stroke: "#E1E8EA" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="nombre"
              width={190}
              tick={{ fontSize: 12, fill: "#16213D", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(29,48,96,0.06)" }}
              formatter={(value) => [Number(value), "Descargas"]}
              labelFormatter={(_, payload) => payload?.[0]?.payload.nombreCompleto ?? ""}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E1E8EA",
                fontSize: 13,
                fontFamily: "var(--font-body)",
              }}
            />
            <Bar dataKey="descargas" radius={[0, 8, 8, 0]} maxBarSize={22}>
              {data.map((d) => (
                <Cell key={d.key} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

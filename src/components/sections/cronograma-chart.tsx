"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { CronogramaRow } from "@/lib/database.types";
import { colorHex } from "@/lib/colors";

function parseHoraToMinutes(hora: string, previous: number | null): number {
  const [hStr, mStr] = hora.split(":");
  let h = parseInt(hStr ?? "0", 10);
  const m = parseInt(mStr ?? "0", 10);
  if (Number.isNaN(h)) h = 0;
  let minutes = h * 60 + (Number.isNaN(m) ? 0 : m);
  // El cronograma cruza el mediodía (8:00 ... 11:10, 1:10, 2:15...).
  // Si la hora "retrocede" respecto al bloque anterior, asumimos que
  // pasó a la tarde (reloj de 12 horas) y sumamos 12h.
  if (previous !== null && minutes < previous) minutes += 12 * 60;
  return minutes;
}

function formatMinutes(total: number): string {
  const h24 = Math.floor(total / 60) % 24;
  const m = total % 60;
  const period = h24 >= 12 ? "p.m." : "a.m.";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

const DEFAULT_LAST_BLOCK_MINUTES = 45;

export function CronogramaChart({ cronograma }: { cronograma: CronogramaRow[] }) {
  if (cronograma.length === 0) return null;

  // reduce() en vez de una variable `let` mutada dentro de .map(): evita
  // reasignar estado capturado durante el render (regla react-hooks/immutability).
  const points = cronograma.reduce<Array<CronogramaRow & { minutes: number }>>((acc, item) => {
    const previous = acc.length > 0 ? acc[acc.length - 1].minutes : null;
    const minutes = parseHoraToMinutes(item.hora, previous);
    acc.push({ ...item, minutes });
    return acc;
  }, []);

  const data = points.map((p, i) => {
    const next = points[i + 1];
    const duration = next ? next.minutes - p.minutes : DEFAULT_LAST_BLOCK_MINUTES;
    return {
      label: p.label,
      hora: p.hora,
      inicio: p.minutes,
      duracion: duration,
      color: colorHex(p.tipo),
    };
  });

  return (
    <div className="rounded-2xl border border-line bg-card p-5 md:p-6">
      <ResponsiveContainer width="100%" height={Math.max(220, data.length * 44)}>
        <BarChart data={data} layout="vertical" barCategoryGap={10} margin={{ left: 8, right: 24 }}>
          <XAxis
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v: number) => formatMinutes(v)}
            tick={{ fontSize: 11, fill: "#5B6478" }}
            axisLine={{ stroke: "#E1E8EA" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={110}
            tick={{ fontSize: 12, fill: "#16213D", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(29,48,96,0.06)" }}
            formatter={(value) => [`${Number(value)} min`, "Duración"]}
            labelFormatter={(_, payload) =>
              payload?.[0] ? `${payload[0].payload.label} · ${formatMinutes(payload[0].payload.inicio)}` : ""
            }
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #E1E8EA",
              fontSize: 13,
              fontFamily: "var(--font-body)",
            }}
          />
          <Bar dataKey="duracion" radius={[0, 8, 8, 0]} isAnimationActive maxBarSize={26}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

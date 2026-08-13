"use client";

import { motion } from "framer-motion";
import type { CronogramaRow, PilarRow } from "@/lib/database.types";
import { colorHex } from "@/lib/colors";
import { Button } from "@/components/ui/button";

export function Hero({
  pilares,
  cronograma,
}: {
  pilares: PilarRow[];
  cronograma: CronogramaRow[];
}) {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-navy/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-navy">
            Programa Valle Paraíso Bilingüe
          </div>
          <h1 className="text-[clamp(34px,5vw,56px)] font-semibold text-navy">
            Panel de recursos del <em className="font-display italic text-teal">Taller 1</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Documentación oficial, equipo académico y bancos de recursos para la enseñanza del
            inglés con inteligencia artificial en el Valle del Cauca.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <a href="#documentos">Ver documentación ↓</a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#equipo">Conocer al equipo</a>
            </Button>
          </div>

          {pilares.length > 0 && (
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {pilares.slice(0, 3).map((p) => (
                <div key={p.id}>
                  <b className="block font-display text-xl text-navy">{p.titulo}</b>
                  <span className="text-sm text-muted">{p.descripcion}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-line bg-card p-6 shadow-[0_24px_48px_-16px_rgba(14,25,48,.28)]"
        >
          <div className="mb-4 flex items-center gap-2 border-b border-line pb-4 font-mono text-xs font-semibold uppercase tracking-wide text-muted">
            <span className="h-2 w-2 rounded-full bg-teal" />
            Cronograma del día
          </div>
          <div className="flex flex-col">
            {cronograma.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between border-b border-line/70 py-2.5 last:border-0"
              >
                <span className="font-mono text-sm text-muted">{row.hora}</span>
                <span className="text-sm font-semibold text-ink">{row.label}</span>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: colorHex(row.tipo) }}
                />
              </div>
            ))}
            {cronograma.length === 0 && (
              <p className="py-4 text-sm text-muted">Aún no hay cronograma cargado.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

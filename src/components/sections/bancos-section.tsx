"use client";

import { ArrowDown } from "lucide-react";
import type { BancoRow, DocumentoRow } from "@/lib/database.types";
import { getFileUrl } from "@/lib/storage";
import { trackDownload } from "@/lib/track-download";
import { BANCO_ACCENTS, colorHex } from "@/lib/colors";
import { Reveal } from "@/components/reveal";
import { DownloadsChart } from "@/components/sections/downloads-chart";

export function BancosSection({
  bancos,
  documentos,
}: {
  bancos: BancoRow[];
  documentos: DocumentoRow[];
}) {
  const chartResources = [
    ...documentos.map((d) => ({ tipo: "documento" as const, id: d.id, nombre: d.titulo })),
    ...bancos.map((b) => ({ tipo: "banco" as const, id: b.id, nombre: b.titulo })),
  ];

  return (
    <section id="bancos" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <Reveal className="mb-12 max-w-2xl">
          <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal">
            Recursos complementarios
          </div>
          <h2 className="mb-3 text-[clamp(24px,3vw,32px)] font-semibold text-navy">
            Bancos de recursos
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Colecciones de apoyo para diseñar, sin partir de cero, los recursos de cada sala — más
            bancos de referencia para complementar su práctica docente.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bancos.map((b, i) => {
              const accent = colorHex(BANCO_ACCENTS[i % BANCO_ACCENTS.length]);
              return (
                <a
                  key={b.id}
                  href={getFileUrl(b.archivo_path)}
                  download
                  onClick={() => trackDownload("banco", b.id)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(14,25,48,.18)]"
                  style={{
                    backgroundImage: `radial-gradient(320px 160px at 100% 0%, ${accent}2a, transparent 65%)`,
                  }}
                >
                  <div className="mb-3 font-mono text-2xl font-bold" style={{ color: accent }}>
                    {b.cantidad}
                  </div>
                  <h4 className="mb-2 font-display text-lg font-semibold text-navy">{b.titulo}</h4>
                  <p className="mb-4 flex-1 text-sm text-muted">{b.descripcion}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                    Descargar
                    <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>

        {chartResources.length > 0 && (
          <Reveal delay={0.1} className="mt-14">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl text-navy">Documentos más descargados</h3>
              <span className="font-mono text-xs text-muted">se actualiza en vivo</span>
            </div>
            <DownloadsChart resources={chartResources} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

"use client";

import { ArrowDown } from "lucide-react";
import type { DocumentoRow } from "@/lib/database.types";
import { getFileUrl } from "@/lib/storage";
import { trackDownload } from "@/lib/track-download";
import { colorHex } from "@/lib/colors";
import { Reveal } from "@/components/reveal";

const BADGE_COLOR: Record<string, string> = {
  PDF: colorHex("red"),
  PPTX: colorHex("orange"),
  DOCX: colorHex("blue"),
  XLSX: colorHex("teal"),
};

export function DocumentosSection({ documentos }: { documentos: DocumentoRow[] }) {
  if (documentos.length === 0) return null;

  return (
    <section id="documentos" className="bg-paper-deep py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <Reveal className="mb-12 max-w-2xl">
          <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-navy">
            Documentación oficial
          </div>
          <h2 className="mb-3 text-[clamp(24px,3vw,32px)] font-semibold text-navy">
            Descargue los documentos del taller
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">
            La guía oficial del Taller 1 para los docentes participantes, lista para descargar.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {documentos.map((d) => (
              <a
                key={d.id}
                href={getFileUrl(d.archivo_path)}
                download
                onClick={() => trackDownload("documento", d.id)}
                className="group flex items-start gap-4 rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(14,25,48,.18)]"
              >
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono text-[11px] font-bold text-white"
                  style={{ background: BADGE_COLOR[d.tipo] ?? colorHex("navy") }}
                >
                  {d.tipo}
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 font-display text-lg font-semibold text-navy">{d.titulo}</h4>
                  <p className="mb-3 text-sm text-muted">{d.descripcion}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                    Descargar {d.tipo}
                    <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

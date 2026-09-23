"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { CronogramaRow, EquipoRow } from "@/lib/database.types";
import { SALAS } from "@/content/salas";
import { colorHex, inkHex } from "@/lib/colors";
import { cn } from "@/lib/utils";

export interface TimelineRecurso {
  titulo: string;
  href: string;
}

interface Detalle {
  objetivo?: string;
  descripcion: string;
  responsables?: string;
  recursos?: TimelineRecurso[];
  producto?: string;
  salas?: boolean;
}

function detalleDe(
  row: CronogramaRow,
  lead: EquipoRow | undefined,
  plenariaRecursos: TimelineRecurso[],
  salaRecursos: TimelineRecurso[]
): Detalle | null {
  const label = row.label.toLowerCase();
  if (label.includes("plenaria de cierre")) {
    return {
      descripcion: "Socialización de los recursos creados en las salas y cierre de la jornada.",
      responsables: lead ? `${lead.nombre} · ${lead.rol_o_especialidad}` : undefined,
    };
  }
  if (label.includes("plenaria")) {
    return {
      objetivo:
        "Fundamentar el uso de la inteligencia artificial en la enseñanza del inglés, en articulación con el Currículo Sugerido de Inglés, los DBA, las Mallas de Aprendizaje y el MCER.",
      descripcion: "Plenaria de fundamentación para los docentes participantes, antes de la rotación por las cuatro salas prácticas.",
      responsables: lead ? `${lead.nombre} · ${lead.rol_o_especialidad}` : undefined,
      recursos: plenariaRecursos,
    };
  }
  if (label.includes("sala")) {
    return {
      descripcion:
        "Los docentes rotan por las cuatro salas a lo largo del día. En cada sesión de 60 minutos, cada grupo trabaja en una sala distinta con acompañamiento de su tallerista.",
      producto: "Cada docente diseña, con apoyo de inteligencia artificial, un recurso educativo bilingüe listo para su aula.",
      recursos: salaRecursos,
      salas: true,
    };
  }
  if (label.includes("encuesta")) {
    return { descripcion: "Aplicación de la encuesta de satisfacción de la jornada." };
  }
  return null;
}

export function Timeline({
  cronograma,
  equipo,
  plenariaRecursos,
  salaRecursos,
}: {
  cronograma: CronogramaRow[];
  equipo: EquipoRow[];
  plenariaRecursos: TimelineRecurso[];
  salaRecursos: TimelineRecurso[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  const lead = equipo.find((e) => e.rol_tipo === "conferencista");
  const talleristas = equipo.filter((e) => e.rol_tipo === "tallerista");

  if (cronograma.length === 0) {
    return <p className="rounded-2xl border border-line bg-card p-6 text-sm text-muted">El cronograma se publicará próximamente.</p>;
  }

  return (
    <ol className="relative ml-3 border-l-2 border-line md:ml-4">
      {cronograma.map((row) => {
        const det = detalleDe(row, lead, plenariaRecursos, salaRecursos);
        const isOpen = open === row.id;
        const panelId = `${baseId}-${row.id}`;
        const dot = colorHex(row.tipo === "neutro" ? "neutro" : row.tipo);
        return (
          <li key={row.id} className="relative mb-2 pl-6 md:pl-8">
            <span aria-hidden className="absolute -left-[9px] top-4 h-4 w-4 rounded-full border-4 border-paper" style={{ background: dot }} />
            {det ? (
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : row.id)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors",
                  isOpen ? "border-navy/30 bg-card shadow-sm" : "border-transparent hover:border-line hover:bg-card"
                )}
              >
                <span className="w-14 shrink-0 font-mono text-sm font-semibold text-muted">{row.hora}</span>
                <span className="flex-1 font-semibold text-ink">{row.label}</span>
                <ChevronDown size={18} className={cn("shrink-0 text-muted transition-transform", isOpen && "rotate-180")} aria-hidden />
              </button>
            ) : (
              <div className="flex items-center gap-4 px-4 py-3">
                <span className="w-14 shrink-0 font-mono text-sm text-muted">{row.hora}</span>
                <span className="text-muted">{row.label}</span>
              </div>
            )}

            {det && isOpen && (
              <div id={panelId} className="animate-fade-up mt-2 rounded-xl border border-line bg-card p-5 text-sm leading-relaxed">
                {det.objetivo && (
                  <p className="mb-3"><strong className="text-navy">Objetivo: </strong>{det.objetivo}</p>
                )}
                <p className="mb-3 text-ink">{det.descripcion}</p>
                {det.responsables && (
                  <p className="mb-3"><strong className="text-navy">Orienta: </strong>{det.responsables}</p>
                )}
                {det.producto && (
                  <p className="mb-3"><strong className="text-navy">Producto esperado: </strong>{det.producto}</p>
                )}
                {det.salas && (
                  <ul className="mb-3 grid gap-2 sm:grid-cols-2">
                    {SALAS.map((s) => {
                      const t = talleristas.find((x) => x.sala === s.numero);
                      return (
                        <li key={s.id}>
                          <Link href={`/explorar?sala=${s.id}`} className="flex h-full flex-col rounded-lg border border-line p-3 hover:border-navy/40">
                            <span className="font-semibold" style={{ color: inkHex(s.color) }}>Sala {s.numero} · {s.nombre}</span>
                            {t && <span className="text-xs text-muted">{t.nombre}</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {det.recursos && det.recursos.length > 0 && (
                  <div>
                    <p className="mb-1 font-semibold text-navy">Materiales y presentaciones</p>
                    <ul className="space-y-1">
                      {det.recursos.map((r) => (
                        <li key={r.href + r.titulo}>
                          <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-teal-ink hover:underline">
                            {r.titulo}
                            {r.href.startsWith("http") && <ExternalLink size={13} aria-hidden />}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

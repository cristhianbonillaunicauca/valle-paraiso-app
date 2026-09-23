"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, GraduationCap } from "lucide-react";
import type { Herramienta } from "@/content/herramientas";
import { salaById } from "@/content/salas";
import { tutorialParaSala } from "@/content/tutoriales";
import { promptParaHerramienta } from "@/lib/related";
import { inkHex } from "@/lib/colors";
import { CopyButton } from "@/components/shared/copy-button";
import { SaveButton } from "@/components/shared/save-button";
import { cn } from "@/lib/utils";

const CONEX_DOTS: Record<string, number> = { "Sin internet": 0, Baja: 1, Media: 2, Alta: 3 };

export function ToolCard({ h }: { h: Herramienta }) {
  const [open, setOpen] = useState(false);
  const sala = salaById(h.sala);
  const accent = inkHex(sala?.color ?? "navy");
  const tuto = tutorialParaSala(h.sala);
  const prompt = promptParaHerramienta(h);
  const panelId = `ejemplo-${h.id}`;

  return (
    <article className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-5" aria-labelledby={`t-${h.id}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold" style={{ background: `${accent}14`, color: accent }}>
          {h.categoria}
        </span>
        <SaveButton compact item={{ kind: "herramienta", id: h.id, titulo: h.nombre, href: `/explorar?q=${encodeURIComponent(h.nombre)}` }} />
      </div>
      <h3 id={`t-${h.id}`} className="mb-2 font-display text-lg font-semibold text-navy">{h.nombre}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted">{h.descripcion}</p>

      <dl className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px]">
        <div className="col-span-2">
          <dt className="sr-only">Ideal para</dt>
          <dd className="flex flex-wrap gap-1">
            {h.habilidades.map((x) => (
              <span key={x} className="rounded-md bg-paper-deep px-2 py-0.5 font-semibold text-ink">{x}</span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Nivel</dt>
          <dd className="font-semibold text-ink">A1 a C2 (adaptable)</dd>
        </div>
        <div>
          <dt className="text-muted">Dificultad</dt>
          <dd className="font-semibold text-ink">{h.dificultad}</dd>
        </div>
        <div>
          <dt className="text-muted">Precio</dt>
          <dd className="font-semibold text-ink" title={h.licencia}>{h.precio}</dd>
        </div>
        <div>
          <dt className="text-muted">Conectividad</dt>
          <dd className="flex items-center gap-1.5 font-semibold text-ink">
            <span aria-hidden className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <span key={i} className={cn("h-2.5 w-1.5 rounded-sm", i <= CONEX_DOTS[h.conectividad] ? "bg-navy" : "bg-line-strong")} />
              ))}
            </span>
            {h.conectividad}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mb-3 flex min-h-11 items-center justify-between rounded-xl bg-paper-deep px-4 text-left text-sm font-semibold text-navy hover:bg-line/60"
      >
        Ejemplo para clase
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div id={panelId} className="animate-fade-up mb-3 rounded-xl border border-line p-4 text-sm leading-relaxed">
          <p className="mb-3 text-ink">{h.aplicacion}</p>
          <p className="mb-1 font-semibold text-navy">Prompt sugerido del banco ({prompt.numero}. {prompt.titulo})</p>
          <p className="line-clamp-4 text-muted">{prompt.texto}</p>
          <p className="mt-3 text-xs text-muted">Licencia: {h.licencia}</p>
        </div>
      )}

      <div className="mt-auto grid gap-2">
        <a href={h.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white hover:bg-navy-deep" style={{ color: "#fff" }}>
          Ver herramienta <ExternalLink size={15} aria-hidden />
          <span className="sr-only">{h.nombre} (abre en una pestaña nueva)</span>
        </a>
        <div className="grid grid-cols-2 gap-2">
          {tuto && (
            <Link href={`/aprende#${tuto.id}`} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-line-strong px-3 text-[13px] font-semibold text-navy hover:bg-paper-deep">
              <GraduationCap size={15} aria-hidden /> Tutorial
            </Link>
          )}
          <CopyButton text={prompt.texto} variant="ghost" label="Copiar prompt" doneLabel="Copiado" className="text-[13px]" />
        </div>
      </div>
    </article>
  );
}
